import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import { columns } from './column';
import styles from '../payroll.module.scss';
import {
  getTableData,
  createRecord,
  uploadExcel,
  getTableDataWithPagination,
  getClosingMonthLatest,
} from '../../../../../../libs/common/api/doctype';
import Drawer from '../../../../../../libs/common/context/filtercontext';
import { fields, onExportXl, additonalAllowanceFields } from '../helper/helper';
import { Filter } from '../payrollFilter/payrollFilter';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { getBase64 } from '../../../../../../libs/common/utils/common';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';
import Cookies from 'universal-cookie';
import PayrollForm from '../helper/payrollForm';


type Props = {};

const View = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [loading, setloading] = useState(false);
  const [salaryParameterOptions, setSalaryParameterOptions] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const [paginationData, setPaginationData] = useState<any>({
    page_length:pageSize|| 10,
    current_page: 1,
  });
  const [payrollFormData, setPayrollFormData] = useState<any>([]);

  useEffect(() => {
    getAllowanceType();
    getClosingMonthLatest().then((items: any) => {
      const formOptions = [...additonalAllowanceFields];
      formOptions.forEach((item: any) => {
        if (item.name === 'select_year') {
          item.options = [
            {
              value: String(items?.[0]?.year),
              label: items?.[0]?.year,
            },
          ];
        }
        if (item.name === 'select_month') {
          item.options = [
            {
              value: items?.[0]?.month,
              label: items?.[0]?.month,
            },
          ];
        }
      });
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
  }, []);

 
  

  const getAllowanceType = () => {
    getTableData('salary_parameter_master', 'master_data', 'htssuite').then(
      (item: any) => {
        const data = item.map((options: any) => ({
          label: options.salary_parameter_name,
          value: options.name,
        }));
        setSalaryParameterOptions(data);
      }
    );
  };
  useEffect(() => {
    if (
      selectionObject?.all_type &&
      selectionObject?.select_month &&
      selectionObject?.select_year
    ) {
      getAdditionalAllowanceData(
        JSON.stringify(selectionObject),
        paginationData?.current_page || 1,
        paginationData.page_length || 5
      );
    }
  }, [selectionObject]);

  const getAdditionalAllowanceData = (
    data: any,
    current_page: number,
    page_length: number,
  ) => {
    setloading(true);
    getTableDataWithPagination(
      'additional_allowance',
      'payroll_processing',
      current_page,
      page_length,
      'htssuite',
      data || null
    ).then((items: any) => {
      setTableData(items?.data);
      setPaginationData({
        total_records: items?.total_records,
        page_length: items?.page_length,
        current_page: items?.current_page,
      });
      setloading(false);
    });
  };
  const onHandleClose = () => {
    updateFilter(false);
  };

  const onHandleFilter = () => {
    updateFilter(false);
  };

  const onFilterClick = () => {
    updateFilter(true);
  };

  const onHandleChangeFilter = (data: any, value: any) => {
    console.log(data,value, 'additonal')
    setSelectionObject({ ...selectionObject, [value]: data });
  };



  const onHandleChangeAmount = (
    event: any,
    record: any,
    recordIndex: number
  ) => {
    const table = [...tableData];
    table.forEach((item: any, index: number) => {
      if (index === recordIndex) {
        item.amount = Number(event);
      }
    });
    setTableData([...table]);
  };

  const uploadProps = async (info: any) => {
    const data: any = await getBase64(info.file.originFileObj);
    const splitBase64Data = data.split(',')?.[1];
    const payload = {
      data: {
        base64string: splitBase64Data,
        ...selectionObject,
      },
    };
    if (info.file.status !== 'uploading') {
      setloading(true);
      uploadExcel(
        'additional_allowance.api.additional_allowance_xlsx_import',
        payload,
        'payroll_processing',
        'htssuite'
      ).then((items: any) => {
        if (items.status === 200) {
          isSuccess(items.message, 'success');
          setloading(false);
          getAdditionalAllowanceData(
            JSON.stringify(selectionObject),
            paginationData?.current_page || 1,
            paginationData?.page_length || 5
            
          );
        } else {
          isSuccess(items.message, 'error');
          setloading(false);
        }
      });
    }
  };

  const handleSubmit = (data: any) => {
    const { all_type, select_month, select_year } = selectionObject;
    const payload = {
      all_type,
      select_month,
      select_year,
      amount_data: tableData,
    };
    createRecord(
      'additional_allowance',
      payload,
      'payroll_processing',
      'htssuite'
    ).then((item: any) => {
      isSuccess(item?.message, 'success');
      getAdditionalAllowanceData(
        JSON.stringify({ ...selectionObject }),
        paginationData?.current_page || 1,
        paginationData.page_length || 5
      );
    });
  };

  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    const payload = {
      ...selectionObject,
    };
    getAdditionalAllowanceData(
      JSON.stringify(payload),
      current_page,
      page_length
    );

    setPaginationData({ ...paginationData, current_page, page_length });
  };

  const onExportExcelData = () => {
    const payload = {
      ...selectionObject,
    };
    setloading(true);
    getTableDataWithPagination(
      'additional_allowance',
      'payroll_processing',
      1,
      0,
      'htssuite',
      JSON.stringify(payload)
    ).then((items: any) => {
      onExportXl(items?.data, 'Additional_allowance.xlsx');
      setloading(false);
    });
  };

  console.log(tableData, 'tableData')
  
  return (
    <div>
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
          Additional Allowance
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <div className={styles.button_wrap}>
            {/* <Button className={styles.primary_btn} onClick={onFilterClick}>
              Filter
            </Button> */}
            <Upload
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              showUploadList={false}
              onChange={uploadProps}
            >
              <Button
                disabled={
                  !(
                    selectionObject?.select_year &&
                    selectionObject?.select_month &&
                    selectionObject?.all_type
                  )
                }
                className={styles.secondary_btn}
              >
                Import from Excel
              </Button>
            </Upload>

            <Button
              className={styles.secondary_btn}
              onClick={() => onExportExcelData()}
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
              {/* <SmnlFormDynamicLayout
                sectionData={payrollFormData}
                onChange={onHandleChangeFilter}
                appname="htssuite"
              /> */}
              <PayrollForm
              payrollFormData={payrollFormData}
              handleChange={onHandleChangeFilter}
              formvalue={selectionObject}
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
            column={columns(onHandleChangeAmount)}
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
              disabled={!tableData?.some((data: any) => data.amount !== null && data.amount !== undefined)}
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
