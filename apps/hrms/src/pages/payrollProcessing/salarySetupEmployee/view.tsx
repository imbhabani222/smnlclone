import React, { useState, useEffect } from 'react';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import {
  columns,
  employeePayMasterFields,
  SalaryCalcuation,
} from '../helper/helper';
import {
  getTableDatasAndId,
  createRecord,
  updateRecords,
} from '../../../../../../libs/common/api/doctype';
import { Row, Col, Button } from 'antd';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import styles from '../payroll.module.scss';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import PayrollForm from '../helper/payrollForm';

type Props = {};

const View = (props: Props) => {
  const [tableData, setTableData] = useState<any>([]);
  const [isLoading, setloading] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();
  const [editRecord, setEditRecord] = useState(null);
  const [formData, setFormData] = useState<any>(employeePayMasterFields);
  const [disableBtn, setDisableBtn] = useState<boolean>(false);

  useEffect(() => {
    if (formValue?.name) {
      getTableDatasAndId(
        'salary_setup_for_employee',
        'payroll_processing',
        'htssuite',
        JSON.stringify({
          employee_name: formValue?.name,
        })
      ).then((item: any) => {
        console.log(item, 'item');
        if (item.status === 200) {
          if (item?.id) {
            setTableData(item.data?.salary_details);
            setEditRecord(item.id);
            setFormValue({ ...formValue, CTC: item.data?.ctc, apply_new_regime: item?.data?.apply_new_regime === 0 ? false : true });
          } else {
            setTableData(item.data);
            setEditRecord(null);
            setFormValue({ ...formValue, CTC: 0 });
          }
          setDisableBtn(false)
        } else {
          isSuccess(item?.message, 'error');
          setDisableBtn(true);
        }
      });
    } else {
      setTableData([]);
      setEditRecord(null);
    }
  }, [formValue?.name]);

  useEffect(() => {
    if (formValue?.CTC) {
      if (String(formValue?.CTC)?.length > 4) {
        const salaryObj = {
          ctc: formValue?.CTC,
          tableData: [...tableData],
        };
        const response = SalaryCalcuation(salaryObj);
        setTableData(response);
      }
    }
  }, [formValue?.CTC]);

  const onHandleChangeFilter = (value: any, key: any) => {
    setFormValue({ ...formValue, [key]: value });
  };
  const handleSubmit = () => {
    if (editRecord) {
      const payload = {
        doc_id: editRecord,
        data: {
          employee_name: formValue?.name,
          ctc: tableData?.reduce(
            (total: any, item: any) => total + Number(item.monthly_amount),
            0
          ),
          apply_new_regime: formValue?.apply_new_regime === false ? 0 : 1,
          salary_details: [...tableData],
        },
      };
      updateRecords(
        'salary_setup_for_employee',
        payload,
        'payroll_processing',
        'htssuite'
      ).then((item: any) => {
        if (item.status === 200) {
          isSuccess(item?.message, 'success');
        } else {
          isSuccess(item?.message, 'error');
        }
      });
    } else {
      const payload = {
        employee_name: formValue?.name,
        apply_new_regime: formValue?.apply_new_regime === false ? 0 : 1,
        ctc: tableData?.reduce(
          (total: any, item: any) => total + Number(item.monthly_amount),
          0
        ),
        salary_details: tableData.map((item: any) => ({
          name: item.name,
          salary_parameter_name: item.salary_parameter_name,
          addition_deduction: item.addition_deduction,
          monthly_yearly: item.monthly_yearly,
          monthly_amount: Number(item.monthly_amount),
          yearly_amount: Number(item.yearly_amount),
        })),
      };
      createRecord(
        'salary_setup_for_employee',
        payload,
        'payroll_processing',
        'htssuite'
      ).then((items) => {
        if (items.status === 200) {
          isSuccess(items?.message, 'success');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  const handleChangeAmount = (value: any, record: any, key: string) => {
    const salaryObj = {
      ctc: formValue.CTC,
      key,
      value,
      currentRecord: record,
      tableData,
    };
    if (value >= record?.percentage_value) {
      const responseData = SalaryCalcuation(salaryObj);
      setTableData(responseData);
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
      isSuccess(
        `Basic should not be less than ${record?.percentage_value}`,
        'error'
      );
    }
  };
  const onSubmit = (data: any) => {
    // getTableDatasAndId(
    //   'salary_setup_for_employee',
    //   'payroll_processing',
    //   'htssuite',
    //   JSON.stringify({ employee_name : data?.name })
    // ).then((item: any) => {
    //   if(item?.id) {
    //     setTableData(item.data?.salary_details);
    //     setEditRecord(item.id);
    //     const data = [...formData];
    //     data.forEach((dataItem:any) => {
    //       if(dataItem.name === "CTC") {
    //         dataItem.default = item.data.ctc
    //       }
    //     })
    //     setFormData([...data])
    //   }
    //   else {
    //     setTableData(item.data);
    //     setEditRecord(null);
    //   }
    // });
  };

  const onGettableSummaryData = (datas:any) => {
  
      
    if(datas?.length > 0){
      
      const summaryDatas = [
        {
          data: "",
          index: 0
        },
        {
          data: "",
          index: 1
        },
        {
          data: "",
          index: 2
        },
        {
          data: "Total Earning (Rs.)",
          index: 3
        },
        {
          data: Number(datas?.reduce((acc:any, val:any) => acc + Number(val?.monthly_amount ||0) ,0)),
          index: 4
        },
        {
          data: Number(datas?.reduce((acc:any, val:any) => acc + Number(val?.yearly_amount ||0) ,0)),
          index: 5
        },
      ]
      return summaryDatas;

    }
    return []
  }

  return (
    <React.Fragment>
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
          Employee Salary Pay Master
        </Col>
      </Row>
      <Panel>
        <div className={styles.panel_container}>
          <Spin loading={isLoading} />
          <PayrollForm
            handleSubmit={onSubmit}
            payrollFormData={employeePayMasterFields}
            handleChange={onHandleChangeFilter}
            formvalue={formValue}
          />
          <SmnlTable
            height={250}
            column={[...columns(handleChangeAmount)]}
            dataSource={[...tableData]}
            showScroll={true}
            tableSummary ={
              onGettableSummaryData(tableData)
            }
          />
          {/* <Row justify={'space-between'}>
            <Col
              offset={8}
              span={3}
              style={{ padding: '10px 15px', fontWeight: 'bold' }}
            >
              Total Earning (Rs.)
            </Col>
            <Col span={2} style={{ padding: '10px 5px', fontWeight: 'bold' }}>
              {tableData?.length > 0 &&
                tableData?.reduce(
                  (total: any, item: any) =>
                    total + Number(item.monthly_amount),
                  0
                )}
            </Col>
            <Col span={2} style={{ padding: '10px 5px', fontWeight: 'bold' }}>
              {tableData?.length > 0 &&
                tableData?.reduce(
                  (total: any, item: any) => total + Number(item.yearly_amount),
                  0
                )}
            </Col>
          </Row> */}
          <div className={styles.actions}>
            {/* <Button className={styles.actions__cancel} onClick={() => setFormValue({})}>Clear</Button> */}
            <Button
              className="actions__submit"
              type="primary"
              disabled={!formValue?.CTC || disableBtn}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </Panel>
    </React.Fragment>
  );
};

export default View;
