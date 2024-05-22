import React, { useContext, useEffect, useState } from 'react';
import {
  createRecords,
  getSalaryProcessing,
  getClosingMonthLatest,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import { Button, Col, Row } from 'antd';
import styles from '../payroll.module.scss';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import { stockAllowance, fieldsData } from '../helper/helper';
import PayrollForm from '../helper/payrollForm';
import SpinLoader from '../../../../../../libs/common/ui/Loader/spinLoader';
import { amountFormater } from '../../../../../../libs/common/utils/common';
import ModalField from '../../../../../../libs/common/ui/Modal/modal';

type Props = {};



const Create = (props: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>([]);
  const [columnData, setColumnData] = useState<any>([]);
  const [filteredEmp, setFilteredEmp] = useState<any>([])
  const [filters, setFilters] = useState<any>({});
  const [selectedRecords, setSelectedRecord] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [formValue, setformValue] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [payrollFormData, setPayrollFormData] = useState<any>([]);
  // useEffect(() => {

  // }, [filters, reset]);

  

  useEffect(() => {
    setLoader(true)
    getClosingMonthLatest().then((items: any) => {
      const formOptions = [...stockAllowance];
      formOptions.forEach((item: any) => {
        if (item.name === 'year') {
          item.options = [
            {
              value: String(items?.[0]?.year),
              label: items?.[0]?.year,
            },
          ];
        }
        if (item.name === 'month') {
          item.options = [
            {
              value: items?.[0]?.month,
              label: items?.[0]?.month,
            },
          ];
        }
      });
      setPayrollFormData([...formOptions]);
      setLoader(false)
    });
  }, []);

  const getSalaryProcessingData = (value: any) => {
    setLoader(true);
    getSalaryProcessing(
      'salary_processing',
      'payroll_processing',
      'htssuite',

      value ? JSON.stringify(value) : null
    ).then((items:any) => {
      setColumnData(items);
      setFilteredEmp(items)
      setLoader(false);
    });
  };

  const Column = [
    {
    title : 'Employee ID',
    dataIndex : 'employee_name',
    key : 'employee_name'
    },
    {
      title: 'Employee Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Total Deductions',
      dataIndex: 'total_deductions',
      key: 'total_deductions',
      render: (_: any, record: any) =>
        amountFormater.format(record?.total_deductions),
    },
    {
      title: 'Total Earnings',
      dataIndex: 'total_earnings',
      key: 'total_earnings',
      render: (_: any, record: any) =>
        amountFormater.format(record?.total_earnings),
    },
    {
      title: 'Net Salary',
      dataIndex: 'net_salary',
      key: 'net_salary',
      render: (_: any, record: any) =>
        amountFormater.format(record?.net_salary),
    },
    {
      title: 'Action',
      dataIndex: 'view',
      key: 'view',
      render: (_: any, record: any) => (
        <p
          style={{ cursor: 'pointer', color: '#272083' }}
          onClick={() => onGetRecord(record)}
        >
          View
        </p>
      ),
    },
  ];

  const onGetRecord = (data: any) => {
    const form_data = fieldsData(data);
    setModalOpen(true);
    const { formData, payslip_data } = form_data;
    setFormData(formData);
    setformValue(payslip_data);
  };
  const rowSelection = {
    selectedRowKeys,
    onchange: (newSelectedKeys: any, data: any) => {
      setSelectedRecord([...data]);
      setSelectedRowKeys(newSelectedKeys);
    },
  };

  const handleFinish = (values: any) => {
    setLoader(true);
    const record = {
      salaries: [...columnData],
    };
    createRecords(
      'salary_processing',
      record,
      'payroll_processing',
      'htssuite'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        setColumnData([]);
        setFilters({});
        // getSalaryProcessingData(filters)
        setLoader(false);
      } else {
        isSuccess(items?.message, 'error');
        setLoader(false);
      }
    });
  };

  const employeeSearch=(value:any,key:any)=>{
    const filteredEmployee = columnData?.filter((emp:any)=> emp?.employee_name === value)    
    if (filteredEmployee?.length > 0) {            
      setColumnData(filteredEmployee)
    }else{            
      setColumnData(filteredEmp)
    }
  }

  const handleChange = (val: any, name: any) => {    
    setFilters({ ...filters, [name]: val });
  };

  const onSubmit = (values: any) => {
    getSalaryProcessingData(values);
  };
  const modalCancel = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
          Salary Processing
        </Col>
      </Row>
      <Panel>
        <SpinLoader loading={loader} />
        <ModalField
          title="Salary Details"
          isModalOpen={modalOpen}
          handleOk={modalCancel}
          handleCancel={modalCancel}
          width="70%"
        >
          <PayrollForm
            payrollFormData={formData}
            formvalue={formValue}
            handleChange={handleChange}
            
          />
        </ModalField>
        <div className={styles.panel_container}>
          <PayrollForm
            employeeSearch={employeeSearch}
            handleSubmit={onSubmit}
            payrollFormData={payrollFormData}
            handleChange={handleChange}
            formvalue={filters}
            btnname="Process Now"
            disabled={filters?.year ? (filters?.month ? false : true) : true}
          />
          <div>
            <SmnlTable
              rowId="si_no"
              column={Column}
              dataSource={columnData}
              height={250}
              // rowSelection={rowSelection}

              // expandable = {{expandedRowRender}}
            />
          </div>

          <div className={styles.actions}>
            <Button
              className="SNMLForm__actions__submit"
              type="primary"
              disabled={columnData?.length === 0}
              onClick={handleFinish}
            >
              Submit
            </Button>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default Create;
