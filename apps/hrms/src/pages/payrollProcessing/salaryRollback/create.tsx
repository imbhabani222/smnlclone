import React, { useContext, useEffect, useState } from 'react';
import {
  getTableData,
  getTableDataWithPagination,
  deleteSalaryProcessing,
  getClosingMonthLatest
} from '../../../../../../libs/common/api/doctype';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import InputField from '../../../../../../libs/common/ui/InputField/inputField';
import { Button, Col, Form, Row } from 'antd';
import styles from '../payroll.module.scss';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import { stockAllowance} from "../helper/helper"
import SpinLoader from '../../../../../../libs/common/ui/Loader/spinLoader'
import Cookies from 'universal-cookie';
import EmployeeSearchFilter from '../../payrollProcessing/helper/payrollForm'
 


type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [formData, setFormData] = useState<any>([]);
  const [columnData, setColumnData] = useState<any>([]);
  const [filters, setFilters] = useState<any>({});
  const [doc_id, setDoc_id] = useState<any>(null);
  const [reset, setReset] = useState<any>(false);
  const { filter, updateFilter } = useContext<any>(FilterContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRecords, setSelectedRecord] = useState<any>([]);
  const [loading, setLoader] = useState<boolean>(false)
  const [payrollFormData, setPayrollFormData] = useState<any>([])
  const [paginationData, setPaginationData] = useState<any>({
    page_length:pageSize|| 10,
    current_page: 1,
  });

  const employeeSearchTable:any = [
    {
      label: 'Employee',
    name: 'employee_name',
    datatype: 'TableSelect',
    isReq: false,
    description: {
      linkfield: 'full_name',
      modulename: 'employee_management',
      showActive: 'true',
      // colSpan: '7',
      appname: 'htssuite',
      search: 'employee_management.doctype.personal_details.api.search_personal_details?search=',
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
    }
  ]

  useEffect(() => {
    if((filters?.year && filters?.month) || reset) {
      getRollbackData(
        filters,
        paginationData?.current_page || 1,
        paginationData?.page_length || 5,
       )

    }

  }, [filters, reset]);

  useEffect(()=>{
    getClosingMonthLatest().then((items: any) => {
     const formOptions = [...stockAllowance]
    formOptions.push(...employeeSearchTable)
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
     setPayrollFormData([...formOptions])
    });
  },[])


  const getRollbackData = (data:any, current_page:number, page_length:number) => {
    setLoader(true)
    getTableDataWithPagination(
      'salary_processing',
      'payroll_processing',
      current_page,
      page_length,
      'htssuite',
      JSON.stringify(data)
    ).then((items) => {
      if(items.status === 200){
        setColumnData(items?.data)
        setLoader(false)
        setPaginationData({
          total_records: items?.total_records,
          page_length: items?.page_length,
          current_page: items?.current_page,
        });
      }
      else{
        setLoader(false)
      }
    });
  }

  const Column = [
    {
      title: 'Employee Code',
      dataIndex: 'emp_code',
      key: 'emp_code',
    },
    {
      title: 'Employee Name',
      dataIndex: 'employee_name',
      key: 'employee_name',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    
  ];
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys: React.Key[], data:any) => {
      setSelectedRowKeys(newSelectedKeys);
      setSelectedRecord([...data])
    },
  };
  const handleCellEdit = (si_no: any, key: any, val: any) => {
    setColumnData((pre: any) => {
      return pre?.map((item: any, index: any) => {
        if (si_no === index + 1) {
          return { ...item, [key]: val };
        } else {
          return item;
        }
      });
    });
  };
  const handleFinish = (values: any) => {
    setLoader(true);
      const record = {
         doc_ids : JSON.stringify(selectedRecords?.map((item:any) => item.name))
      };
      deleteSalaryProcessing(
        'salary_processing',
        record,
        'payroll_processing',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          setLoader(false);

          isSuccess(items?.message, 'success');
          setColumnData([])
          setFilters({})
          // getRollbackData(
          //   filters,
          //   paginationData?.current_page,
          //   paginationData?.page_length,
          // );
        } else {
          setLoader(false);
          isSuccess(items?.message, 'error');
        }
      });
  };

  const resetFilters = () => {
    setReset((pre: any) => !pre);
  };
  const handleChange = (val: any, name: any) => {
    let value = val;
    if (name === 'year') {
      value = val;
    }
    setFilters((pre: any) => {
      return { ...pre, [name]: value };
    });
  };
  const onFilterClick = () => {
    updateFilter(true);
  };
  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getRollbackData(filters, current_page, page_length);
    setPaginationData({ ...paginationData, current_page, page_length });
  };

  

  return (
    <div>
      <SpinLoader loading={loading} />

      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
          Processed Salary Rollback
        </Col>
        {/* <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <div className={styles.button_wrap}>
            <Button className={styles.primary_btn} onClick={onFilterClick}>
              Filter
            </Button>
          </div>
        </Col> */}
      </Row>
      <Panel>
        <div className={styles.panel_container}>
          
          <SmnlFormDynamicLayout
            sectionData={payrollFormData}
            onChange={handleChange}
          />
         
          <div>
            <SmnlTable rowId ="si_no" 
            showScroll = {true}
            column={Column}
            dataSource={columnData} 
            height={250}  
            rowSelection={rowSelection}
            onChangePagination={onHandleChangePagination}
            totalNumberofRecords={paginationData?.total_records}
            currentPage={paginationData?.current_page}
            />
          </div>

          <div className={styles.actions}>
            {/* <Button
              className={styles.actions__cancel}
              htmlType="button"
              onClick={resetFilters}
            >
              Cancel
            </Button> */}
            <Button
              className="SNMLForm__actions__submit"
              type="primary"
              onClick={handleFinish}
              disabled= {selectedRecords?.length === 0}
            >
              Delete
            </Button>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default Create;
