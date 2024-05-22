import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, Col, Form, Row } from 'antd';
import {
  createRecord,
  getFields,
  getTableData,
  updateRecord,
  getRecordById,
  getLeaveCountAndBalance,
} from '../../../../../../libs/common/api/doctype';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import Message from '../../../../../../libs/common/ui/Message/message';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CustomiseData,
  removeEmployeCodeFields,
} from '../../../../../../libs/common/ui/Form/FormHelper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { datetoFrom, employeeSelectDropDown } from '../../../../../../libs/common/utils/common';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import styles from '../leave.module.scss';
import dayjs from 'dayjs';


type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>([]);
  const [formValues, setFormValues] = useState<any>({requested_date : dayjs()});
  const [leaveBalanceResponse, setLeaveBalanceResponse] = useState<any>([]);
  const [imageData, setImageData] = useState<any>({});
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const [leaveRecord, setLeaveRecord] = useState<any>();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const mode: any = searchParams.get('mode');
  const term = searchParams.get('id');

  useEffect(() => {
    setLoading(true)
    getFields('Leave Encashment Request', 'htssuite').then(
      (fieldNames: any) => {
        const items = fieldNames.filter(
          (e: any) =>
            e.name !== 'approved_rejected_by_cancelled_by' &&
            e.name !== 'approved_rejected_date_cancelled_date' &&
            e.name !== 'requested_to' &&
            e.name !== 'status'&& 
            e.name !== 'balance'
        );
        let addNewField: any = [];
        const leaveBalanceField = {
          label: 'Paid Leave Balance',
          name: 'balance',
          datatype: 'Data',
          isReq: false,
          hidden: 0,
          readonly: true,
        };
        if (!mode) {
          addNewField = [
            ...items.slice(0, 2),
            leaveBalanceField,
            ...items.slice(2),
          ];
        } else {
          addNewField = [...items];
        }
        const updatedFields = addNewField?.map((item: any) => {
          if (item.name === 'employee_name') {
            if (mode) {
              return {
                ...item,
                datatype : 'Select',
                options : [],
                disabled : mode? true : false
              }
            }else if (term) {
              return {
                ...item,
                datatype : 'Select',
                options : [],
                disabled :true
              }
            }else{
              return employeeSelectDropDown(item);
  
            }
           
          }
          if (item.name === 'requested_date') {
              item.disabled= true
          }
          if (mode === 'view' && item.name !== 'remarks') {
            return { ...item, disabled: true };
          } else if (mode !== 'view' && (item.name === 'remarks' || item.name === 'amount')) {
            return { ...item, hidden: 1 };
          }
          return item;
        });

        
        setFormData(updatedFields)
        
        setLoading(false)
      }
    );
  }, [mode]);
  

  useEffect(() => {
    if (term) {
      setLoading(true)
      const query = { name: term };
      getRecordById(
        'leave_encashment_request',
        query,
        'leave_management',
        'htssuite'
      ).then((items:any) => {
        setLeaveRecord(items); 
        setFormValues({
          ...items,
          // employee_name : items?.employee_name?.value,
          requested_date: datetoFrom(items.requested_date),
        });
        setLoading(false)
      });
    } 
    // else {
    //   const currentDate = moment().format('YYYY/MM/DD');
    //   setFormValues({
    //     requested_date: datetoFrom(currentDate),
    //   });
    // }
  }, [term]);

  
  useEffect(() => {
    if (!mode && formValues?.employee_name && !term) {
      const params = {
        employee_name: formValues?.employee_name,
      };
      getLeaveCountAndBalance(params, 'encash_leave_balance', 'htssuite').then(
        (response: any) => {
          if (response?.data?.[0]?.balance && response?.data?.[0]?.disable) {
            setFormData((pre: any) => {
              return pre.map((item: any) => {
                if (item.name === 'no_of_days') {
                  return { ...item, disabled: false };
                }
                return { ...item };
              });
            });
            setFormValues({
              ...formValues,
              balance: String(response?.data?.[0]?.balance),
              no_of_days: String(
                response?.data?.[0]?.balance - response?.data?.[0]?.yearly
              ),
            });
          } else if (response?.message) {
            setFormData((pre: any) => {
              return pre.map((item: any) => {
                if (item.name === 'no_of_days') {
                  return { ...item, disabled: true };
                }
                return { ...item };
              });
            });
            setFormValues({
              ...formValues,
              balance: '-',
              no_of_days: '-',
            });
            isSuccess(response?.message, 'error');
          } else {
            setFormData((pre: any) => {
              return pre.map((item: any) => {
                if (item.name === 'no_of_days') {
                  return { ...item, disabled: true };
                }
                return { ...item };
              });
            });
            setFormValues({
              ...formValues,
              balance: String(response?.data?.[0]?.balance || 0),
              no_of_days: '-',
            });
            isSuccess('Not eligible for Leave Encashment', 'error');
          }
        }
      );
    }
  }, [formValues?.employee_name]);

  
  
  // useEffect(() => {
  //   if (formValues?.leave_type && !mode) {
  //     const leaveBalance = leaveBalanceResponse?.find((item: any) =>
  //       item.name.includes(formValues?.leave_type)
  //     )?.balance;
  //     if (leaveBalance === 0) {
  //       isSuccess("You don't have leave balance", 'error');
  //       setDisabledButton(true);
  //     } else {
  //       setDisabledButton(false);
  //     }
  //     setFormValues({ ...formValues, balance: String(leaveBalance) });
  //   }
  // }, [formValues?.leave_type]);

  const handleFinish = (values: any) => {
    const { base64Data, extension } = imageData;
    if (
      parseFloat(values?.balance || 0) -
        parseFloat(values?.no_of_days || 0) +
        15 <
      0
    ) {
      isSuccess(
        'No of Encashment Days should be less than balance-yearly eligable leave',
        'error'
      );
      return;
    }
    if (parseFloat(values?.no_of_days) < 15) {
      isSuccess('No of Days should not be lessthan 15','error')
      return
    }else if (parseFloat(values?.no_of_days)> parseFloat(values?.balance)) {
      isSuccess("No of Days should not be greater than paid leave balance", "error")
      return
    }
    if (!term) {
      const payload = {
        ...values,
        upload_document : imageData?.base64Data
      };
      
      setLoading(true)
      createRecord(
        'leave_encashment_request',
        payload,
        'leave_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/leave-encashment');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    } else {
      const payload = {
        doc_id: term,
        data: {
          ...values,
          employee_name: formValues?.employee_name?.name,
          upload_document : imageData?.base64Data || formValues?.upload_document
  

        },
      };  
          
      setLoading(true)
      updateRecord(
        'leave_encashment_request',
        payload,
        'leave_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/leave-encashment');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    }
  };
  const handleApprove = (values: any) => {
    
    if (term) {
      const record = {
        doc_id: term,
        data: {
          no_of_days: formValues?.no_of_days,
          ...values,
          employee_name:
            values?.employee_name?.name || formValues?.employee_name?.name,
          status : values?.status === "Rejected" ? "Rejected" : "Approved"
        },
      };
      
      updateRecord(
        'leave_encashment_request',
        record,
        'leave_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/leave-encashment');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };
  const getImageValue = (value: any, extension: any) => {
    const { originalfile } = value;
    setImageData({ base64Data: originalfile, extension });
  };

  const getFormValues = (values: any, name: any) => {
    const data = { ...formValues, [name]: values };
    setFormValues(data);
  };

  



  return (
    <>
      <Spin loading={loading} />
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
          Leave Encashment
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
          <FormWrapper
            formData={formData}
            formValue={formValues}
            handleFinish={mode === 'view' ? handleApprove : handleFinish}
            appname="htssuite"
            onChange={getFormValues}
            handleImageUpload={getImageValue}
            dynamicLayout
            disabledButton={disabledButton}
            isReject={mode === 'view' ? true : false}
            cancelButtonLabel={mode == 'view' ? 'Cancel' : 'Clear'}
            submitButtonLabel={mode === 'view' ? 'Approve' : 'Submit'}
            // onGetFormValue={getFormValues}
          />
        </div>
      </Panel>
    </>
  );
};

export default Create;
