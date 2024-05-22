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
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import styles from '../leave.module.scss';
import { employeeSelectDropDown } from '../../../../../../libs/common/utils/common';

type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>([]);
  const [formValues, setFormValues] = useState<any>({});
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
    getFields('Leave Request', 'htssuite').then((fieldNames: any) => {
      let addNewField: any = [];
      fieldNames.forEach((element: any) => {
        if (element.name === 'from_date' || element.name === 'to_date') {
          element.options = {
            type: 'enable_only_two_custom_date',
            startDate: moment().subtract(2, 'months'),
            endDate: moment().add(2, 'months')
          }
        }
      });
      const leaveBalanceField = {
        label: 'Balance',
        name: 'balance',
        datatype: 'Data',
        isReq: false,
        hidden: 0,
        readonly: true,
        // description: {
        //   type: 'encashBalance',
        // },
      };
      if (!mode) {
        addNewField = [
          ...fieldNames.slice(0, 2),
          leaveBalanceField,
          ...fieldNames.slice(2),
        ];
      } else {
        addNewField = [...fieldNames];
      }
      const updatedFields = addNewField?.map((item: any) => {
        if (item.name === 'employee_name') {
          if (mode) {
            return {
              ...item,
              datatype : 'Select',
              options : [],
              disabled : mode ? true : false
            }
          }else{
            return employeeSelectDropDown(item);

          }
        }

        
        // if (item?.name === 'leave_type') {
        //   return {
        //     ...item,
        //     datatype: 'Select',
        //     options: [],
        //     disabled: mode ? true : false,
        //   };
        // } else {
          if (mode) {
            if (item.name === 'remarks') {
              return { ...item, hidden: 0 };
            } else {
              return { ...item, disabled: true };
            }
          }
        // }
        if(mode){
          if (item.name === "supporting_document") {
            return {...item, disabled : true}
          }
        } 
        return item;
      });

      setFormData(updatedFields);
      setLoading(false)
    });
  }, [mode]);

  useEffect(() => {
    if (term) {
      const query = { name: term };
      getRecordById(
        'leave_request',
        query,
        'leave_management',
        'htssuite'
      ).then((items) => {
        setLeaveRecord(items);

        setFormValues({
          ...items,

          from_date: moment(items.from_date),
          to_date: moment(items.to_date),
        });
      });
    }
  }, [term]);

  

  useEffect(() => {
    if (
      formValues.from_date &&
      formValues.to_date &&
      formValues.from_option &&
      formValues.to_option &&
      !mode
    ) {
      const params = {
        empid: formValues?.employee_name || formValues?.employee_name?.name,
        from_date: moment(formValues.from_date?.$d).format('DD-MM-YYYY'),
        to_date: moment(formValues.to_date?.$d).format('DD-MM-YYYY'),
        from_option: formValues?.from_option,
        to_option: formValues?.to_option,
        leave_id: formValues?.leave_type || formValues?.leave_type?.name,
      };
      setLoading(true);
      getLeaveCountAndBalance(params, 'get_leaves_count', 'htssuite').then(
        (response: any) => {
          setFormValues({ ...formValues, no_of_days: response?.data?.count });
          setLoading(false);
        }
      );
    }

    if (formValues.employee_name && !mode) {      
      const params = {
        emp_code: formValues.employee_name,
      };
      setLoading(true);
      getLeaveCountAndBalance(params, 'get_leave_balance', 'htssuite').then(
        (response: any) => {
          if (response?.status === 200) {
            setLeaveBalanceResponse(response?.data);
            const leaveTypeOptions = response?.data?.map((item: any) => ({
              label: item.leave_name,
              value: item.name,
            }));
            const updateLeaveType = [...formData];
            updateLeaveType?.forEach((item) => {
              if (item?.name === 'leave_type') {
                item.datatype = 'Select';
                item.options = leaveTypeOptions;
              }
            });
            setFormData([...updateLeaveType]);
            setLoading(false);
          } else {
            isSuccess(response?.message, 'error');
            setLoading(false);
          }
        }
      );
    }
  }, [
    formValues?.from_option,
    formValues?.from_date,
    formValues?.to_date,
    formValues?.to_option,
    formValues?.employee_name,
  ]);

  useEffect(() => {
    if (formValues?.leave_type && !mode) {
      const leaveBalance = leaveBalanceResponse?.find((item: any) =>
        item.name === formValues?.leave_type
      )?.balance;      
      // if (leaveBalance === 0) {
      //   isSuccess("You don't have leave balance", 'error');
      //   setDisabledButton(true);
      // } else {
      //   setDisabledButton(false);
      // }
      // setFormValues({ ...formValues, balance: leaveBalance });
            setFormValues({ ...formValues, balance: 'N/A' });

    }
  }, [formValues?.leave_type]);

  

  useEffect(() => {
    if (!formValues?.no_of_days <= formValues.balance) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [formValues?.no_of_days]);

  // useEffect(() => {
  //   const datas = [...formData];
  //   datas.forEach((item) => {
  //     if (item.name === 'to_date') {
  //       item.options = { type: 'future', value: formValues?.from_date };
  //     }
  //   });
  //   setFormData([...datas]);
  // }, [formValues?.from_date]);

  const handleFinish = (e: any) => {
    const values = { ...e };

    const {
      employee_name,
      from_date,
      from_option,
      leave_type,
      no_of_days,
      reason,
      to_date,
      to_option,
      balance,
    } = values;
    const { base64Data, extension } = imageData;

    if (!mode) {
      const values = { ...e.remarks };
      if (balance === 'N/A') {
        const payload = {
          leave_type,
          from_date,
          to_date,
          no_of_days: Number(no_of_days),
          from_option,
          to_option,
          status: null,
          supporting_document: imageData?.originalfile || null,
          remarks: null,
          requested_date: null,
          employee_name,
          reason,
          approved_rejected_cancelled_by: null,
          approved_rejected_cancelled_date: null,
          requested_to: null,
          extention: extension,
          balance: Number(balance),
        };
          setLoading(true)
        createRecord(
          'leave_request',
          payload,
          'leave_management',
          'htssuite'
        ).then((items: any) => {
          if (items?.status === 200) {

            isSuccess(items?.message, 'success');
            navigate('/leave-request');
            setLoading(false)
            
          } else {
            isSuccess(items?.message, 'error');
            setLoading(false)
          }
        });
      } else if (balance >= no_of_days) {
        const payload = {
          leave_type,
          from_date,
          to_date,
          no_of_days: Number(no_of_days),
          from_option,
          to_option,
          status: null,
          supporting_document: imageData?.originalfile || null,
          remarks: null,
          requested_date: null,
          employee_name,
          reason,
          approved_rejected_cancelled_by: null,
          approved_rejected_cancelled_date: null,
          requested_to: null,
          extention: extension,
          balance: Number(balance),
        };
        setLoading(true)
        createRecord(
          'leave_request',
          payload,
          'leave_management',
          'htssuite'
        ).then((items: any) => {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/leave-request');
            setLoading(false)
          } else {
            isSuccess(items?.message, 'error');
            setLoading(false)
          }
        });
      } else {
        isSuccess('Your leave balance is less', 'error');
      }
    } else {
      const values = e?.approval_remarks?.remarks;
      const {
        supporting_document,
        employee_name,
        requested_date,
        name,
        reason,
        approved_rejected_cancelled_by,
        approved_rejected_cancelled_date,
        requested_to,
      } = leaveRecord;
      
      const payload = {
        doc_id: term,
        data: {
          status: e.status ?? 'Approved',
          remarks: values,
          approved_rejected_cancelled_by: mode === "view" ?  approved_rejected_cancelled_by : null,
          approved_rejected_cancelled_date:mode=== "view" ? moment().format('YYYY-MM-DD'): null,
        },
      };      
        setLoading(true)
      updateRecord(
        'leave_request',
        payload,
        'leave_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/leave-request');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    }
  };

  

  // const getImageValue = (value: any, extension: any) => {
  //   const { originalfile } = value;
  //   setImageData({ base64Data: originalfile, extension });
  // };

  const getImageValue = (e:any)=>{    
    setImageData(e)
  }

  

  const getFormValues = (values: any, name: any) => {
    
    const data = { ...formValues, [name]: values };
    setFormValues(data);
    if (name === 'employee_name' && !values) {
      const resultObject = Object.fromEntries(
        Object.keys(formValues).map((key) => [key, undefined])
      );
      setFormValues(resultObject);
    }

    if (name === 'from_date') {
      const balance = formValues?.balance === 'N/A' ? 365 : formValues?.balance;
      // const formDatas = [...formData]      
      setFormData((pre: any) => {
        return pre?.map((item: any, index: any) => {
          if (item.name === 'to_date') {
            return {
              ...item,
              options: {
                type: 'enable_only_two_custom_date',
                startDate: moment(values?.$d,'YYYY-MM-DD')?.subtract(0,'days').format("YYYY-MM_DD"),
                endDate: moment(values?.$d,'YYYY-MM-DD')?.add(2, 'months').format('YYYY-MM-DD') ,
              },
            };
          } else {
            return item;
          }
        });
      });
      setFormValues({...formValues, from_date: values, to_date: undefined})
    }
    if (name === 'to_date') {
      setFormData((pre: any) => {
        return pre?.map((item: any, index: any) => {
          if (item.name === 'from_date') {
            return {
              ...item,
              options: {
                type: 'past',
                value: values,
              },
            };
          } else {
            return item;
          }
        });
      });
    }


  };
  return (
    <>
      <Spin loading={loading} />

      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
          {mode === 'view'
            ? 'Leave Approvals & Rejections'
            : 'Create Leave Request'}
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
            handleFinish={handleFinish}
            appname="htssuite"
            onChange={getFormValues}
            handleImageUpload={getImageValue}
            dynamicLayout
            disabledButton={disabledButton}
            isReject={mode === 'view' ? true : false}
            submitButtonLabel={mode !== 'view' ? 'Submit' : 'Approve'}
          />
        </div>
      </Panel>
    </>
  );
};

export default Create;
