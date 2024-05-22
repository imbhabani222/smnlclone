import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState<any>([]);
  const [formValue, setformValue] = useState<any>({
    state_name: '',
    active: false,
    zone: '',
  });

  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Employee Category', 'htssuite').then((items:any) => {      
      setformData(items);
      const data:any = setformData(items);
      // if (!term) {        
        // setformValue(data);
      // }
    });
    if (term) {
      const data = { name: term };

      getRecordById('employee_category', data, 'master_data', 'htssuite').then(
        (items) => {
          setformValue({
            ...items,
            active: items?.active === 1 ? true : false,
          });
        }
      );
    }
  }, [term]);



  useEffect(()=>{
    const trueValues = Object?.keys(formData).filter(key => formData[key] === true ||  formData[key] ===  1).filter(item => item !== "active");    
    const formDatas= [...formData]
    if(trueValues.length >= 2) {
      formDatas.forEach((item:any) =>{
        if(trueValues.includes(item.name) === false && item.datatype === "Check" && item.label !=="Active"){
          item.disabled = true
        }
      })
      setformData(formDatas)
    }
    else {
      formDatas.forEach((item:any) =>{
        if(trueValues.includes(item.name) === false && item.datatype === "Check" && item.label !== "Active"){
          item.disabled = false
        }
      })
      setformData(formDatas)
    } 
  },[formValue])
  
  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        doc_id: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
        },
      };
      updateRecord('employee_category', record, 'master_data', 'htssuite').then(
        (items: any) => {
          {
            if (items?.status === 200) {
              isSuccess(items?.message, 'success');
              navigate('/view-employee-week-off-category');
            } else {
              isSuccess(`${items?.error?.fieldname.toString()?.replace("_", "")} ${items?.error?.Entry.toLowerCase()}`, 'error');
            }
          }
        }
      );
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };
      createRecord('employee_category', record, 'master_data', 'htssuite').then(
        (items) => {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-employee-week-off-category');
          } else {
            isSuccess(`${items?.error?.fieldname.toString()?.replace("_", "")} ${items?.error?.Entry.toLowerCase()}`, 'error');
          }
        }
      );
    }
  };
  const getFormValues = (value:any, key:any,) => {
    setformValue({...formValue, [key]: value })
  }
  return (
    <>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        onChange={getFormValues}
      />
    </>
  );
};

export default Create;
