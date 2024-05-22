import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Upload } from 'antd';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import { columns } from './column';
import styles from '../payroll.module.scss';
import Drawer from '../../../../../../libs/common/ui/Drawer/drawer';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import { fields, onExportXl, stockAllowance } from '../helper/helper';
import { getTableData, getTableDataWithPagination, createRecord, uploadExcel, getClosingMonthLatest } from '../../../../../../libs/common/api/doctype';
import Spin from "../../../../../../libs/common/ui/Loader/spinLoader"
import { Filter } from '../payrollFilter/payrollFilter';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';
import { getBase64 } from '../../../../../../libs/common/utils/common';
import Cookies from 'universal-cookie';


type Props = {};

const View = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [loading, setloading] = useState(false);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize|| 10, current_page: 1})
  const [payrollFormData, setPayrollFormData] = useState<any>([])



  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);

 
  const onHandleClose = () => {
    updateFilter(false);
  };

  useEffect(()=>{
    getClosingMonthLatest().then((items: any) => {
     const formOptions = [...stockAllowance]
     formOptions.forEach((item:any)=>{
      if(item.name === "year"){
        item.options = [
          {
            value: String(items?.[0]?.year),
            label: items?.[0]?.year
          }
        ]
      }
      if(item.name === "month"){
        item.options = [
          {
            value: items?.[0]?.month,
            label: items?.[0]?.month
          }
        ]
      }
     })
     setPayrollFormData([
      ...formOptions,
       {
        label: 'Employee',
        name: 'emp_code',
        datatype: 'TableSelect',
        isReq: false,
        description: {
          linkfield: 'full_name',
          modulename: 'employee_management',
          showActive: 'true',
          appname: 'htssuite',
          search: 'api.search_employees?search=',
        },
        options: 'Personal Details',
        hidden: 0,
        readonly: false,
        columns: [
          {
            title: 'Employee Code',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Employee Name',
            dataIndex: 'full_name',
            key: 'full_name',
          },
        ],
        searchIndexes: [],
        callOnChange:true
    
      },
     ]);
    });
  },[])

  useEffect(()=>{
    if (selectionObject?.year && selectionObject?.month) {
      const payload = {
       ...selectionObject
      }
      getStockAllowancesData(JSON.stringify(payload), paginationData?.current_page || 1, paginationData?.page_length || 5)
    }

  },[selectionObject])

  const getStockAllowancesData =(data:any, currentPage: number, pageLength: number) => {
    setloading(true);
    getTableDataWithPagination(
      'stock_allowances',
      'payroll_processing',
      currentPage,
      pageLength,
      'htssuite',
      data || null
    ).then((items: any) => {
      setTableData(items?.data);
      setPaginationData({total_records:items?.total_records,page_length:items?.page_length, current_page: items?.current_page })
      setloading(false);
    });
  }

  const onHandleFilter = () => {
    updateFilter(false);
  };

  const onFilterClick =() => {
    updateFilter(true)
  }

  const handleChange = (event: any, record: any, recordIndex:number) => {
    const table = [...tableData]
    table.forEach((item: any, index: number) => {
      if(index === recordIndex){
        item.no_of_days = Number(event)
      }
    })
    setTableData([...table])  
  };

  const handleSubmit = () => {
    const  { year, month } = selectionObject
    const payload: any = {
      select_month: month,
      select_year: year,
      no_of_days_data: tableData
    };
    createRecord('stock_allowances', payload, 'payroll_processing', 'htssuite').then((item:any)=> {
      isSuccess(item?.message, 'success');
      getStockAllowancesData(JSON.stringify({...selectionObject}), paginationData?.current_page, paginationData?.page_length)
    })
  };


  const onHandleChangeFilter = (data: any, value: any) => {
    setSelectionObject({ ...selectionObject, [value]: data });
  };

  const uploadProps = async (info: any) => {
    const data: any  = await getBase64(info.file.originFileObj);
    const splitBase64Data = data.split(",")?.[1]
    const payload = {
     data: {
     base64string: splitBase64Data,
     select_month: selectionObject?.month,
     select_year: selectionObject?.year
     }
    }
    
    if(info.file.status !== "uploading") {
      setloading(true);
      uploadExcel(
        'stock_allowances.api.stock_allowance_xlsx_import',
        payload,
        'payroll_processing',
        'htssuite'
      ).then((items: any) => {
        if (items.status === 200) {
          isSuccess(items.message, 'success');
          setloading(false);
          getStockAllowancesData(JSON.stringify({...selectionObject}), paginationData?.current_page || 1, paginationData?.page_length || 5);
        } else {
          isSuccess(items.message, 'error');
          setloading(false);

        }
      });
  }
 };
 const onHandleChangePagination = (current_page:number, page_length:number) => {
  const payload = {
    ...selectionObject
  }
  getStockAllowancesData(JSON.stringify(payload), current_page, page_length);
  
  setPaginationData({...paginationData, current_page, page_length })
} 
const onExportExcelData = () => {
  const payload = {
    ...selectionObject
  }
  setloading(true)
  getTableDataWithPagination(
    'stock_allowances',
    'payroll_processing',
    1,
    0,
    'htssuite',
    JSON.stringify(payload)
  ).then((items: any) => {
    onExportXl(items?.data, 'Stock_Allowance.xlsx')
    setloading(false);
  });
}



return (
  <div>
    <Row className={styles.subHeader_row}>
      <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
        Stock Allowance
      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
        <div className={styles.button_wrap}>
          <Upload
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            showUploadList={false}
            onChange={uploadProps}
          >
            <Button
              disabled={!(selectionObject?.year && selectionObject?.month)}
              className={styles.secondary_btn}
            >
              Import from Excel
            </Button>
          </Upload>
          <Button
            onClick={() => onExportExcelData()}
            className={styles.secondary_btn}
          >
            Export to Excel
          </Button>
        </div>
      </Col>
    </Row>
    <Panel>
      <div className={styles.panel_container}>
        <Spin loading={loading} />
        <Row>
          <Col span={24}>
            <SmnlFormDynamicLayout
              sectionData={payrollFormData}
              onChange={onHandleChangeFilter}
            />
          </Col>
        </Row>
        <Drawer
          handleClose={onHandleClose}
          open={filter}
          appname="htssuite"
          fields={fields}
          handleFilter={onHandleFilter}
        />
        <SmnlTable
          height={250}
          column={columns(handleChange)}
          dataSource={tableData}
          onChangePagination={onHandleChangePagination}
          totalNumberofRecords={paginationData?.total_records}
          currentPage={paginationData?.current_page}
        />
        <div className={styles.actions}>
          <Button className={styles.actions__cancel}>Cancel</Button>
          <Button
            className="actions__submit"
            type="primary"
            onClick={handleSubmit}
            disabled={!tableData?.some((data: any) => data.no_of_days)}
          >
            Submit
          </Button>
        </div>
      </div>
    </Panel>
  </div>
);
};

export default View;
