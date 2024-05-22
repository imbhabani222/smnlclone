import { Form, Row, Col, Button } from 'antd';
import FormFields from '../../../../../../libs/common/ui/Form/FormFields';
import styles from '../payroll.module.scss';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
type Props = {
  handleSubmit?: any;
  payrollFormData: any;
  handleChange: any;
  formvalue?: any;
  btnname?: string;
  disabled?:any;
 employeeSearch?: any
};


const formData =  {
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

}

const PayrollForm = (props: Props) => {
  const { handleSubmit, payrollFormData, handleChange, formvalue,employeeSearch, btnname,disabled=true } =
    props;
  const [form] = Form.useForm();
  const location = useLocation()
 

 
  
  useEffect(() => {
    if (formvalue) {
      form.setFieldsValue({
        ...formvalue,
      });
    }
  }, [formvalue]);
  return (
    <Form onFinish={handleSubmit} form={form}>
      <Row gutter={10}>
        {payrollFormData.map((field: any, index: number) => (
          <Col span={field?.description?.colSpan || 6}>
            <FormFields
              key={index}
              fieldData={field}
              mode={field?.mode}
              appname={'htssuite'}
              onChange={handleChange}
            />
          </Col>
        ))}
        {btnname && (
          <Col span={location?.pathname === "/salary-processing"  ? 4:6} className={styles.payroll_btn_col}>
            <div
              style={{
                display: 'flex',
                height: '40px',
                alignItems: 'center',
                margin: '10px 0 0 30px',
              }}
            >
              <Button
                className={styles.action_text}
                htmlType="submit"
                type="primary"
                disabled={
                  disabled
                }
                // type="text"
              >
                {btnname}
              </Button>
            </div>
          </Col>
        )}

        {(location?.pathname === "/salary-processing" && employeeSearch )&& <Col span={6}> 
          <FormFields
              // key={index}
              fieldData={formData}
              // mode={field?.mode}
              appname={'htssuite'}
              onChange={employeeSearch}
            /></Col>}
      </Row>
    </Form>
  );
};

export default PayrollForm;
