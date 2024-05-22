import React, { useEffect, useState } from 'react';
import {
  getFields,
  getRecordById,
  createRecord,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
import {
  setFormData,
  dateFormat,
  datetoFrom,
  employeeSelectDropDown,
} from '../../../../../../libs/common/utils/common';
import SpinLoader from '../../../../../../libs/common/ui/Loader/spinLoader';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
const Create = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [formData, setformData] = useState<any>([]);
  const [formValues, setFormValues] = useState<any>({});
  const [imageData, setImageData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [empId, setEmpId] = useState<any>({})

  useEffect(() => {
    setLoading(true)
    getFields('Resignation Details', 'htssuite').then((items) => {
      let newItems: any = addExtraFields(items, [
        {
          name: 'email',
          module: 'employee_management',
        },
      ]);
      const updatedItems = newItems.map((item: any) => {
        if (item.name === "employee_name") {
          return employeeSelectDropDown(item);
        }
        if (item.name === 'resignation_date') {
          return { ...item, options: 'past' };
        }
        if (item.name === 'last_working_date') {
          return { ...item, options: 'future' };
        }
        if (item.name === "upload_document") {
          return {
            ...item,
            description :{
              accept:
                'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              fileType: 'Only .pdf',
              type: 'application/pdf',
            }
          }
        }
        return item;
      });

     setLoading(false)
      setformData(updatedItems);
      const data: any = setFormData(newItems);
      !id && setFormValues(data);
    });
    if (id) {
      setLoading(true)
      const data = {
        name: id,
      };
      getRecordById(
        'resignation_details',
        data,
        'employee_management',
        'htssuite'
      ).then((items) => {        
        if (items?.resignation_date) {
          const da = {
            ...items,
            employee_name : items?.full_name,
            resignation_date: datetoFrom(items?.resignation_date),
            last_working_date: datetoFrom(items?.last_working_date),
          };
          setEmpId(items?.employee_name)
          setFormValues(da);
          setLoading(false)
        }
      });
    }
  }, []);

  useEffect(() => {
    if (formValues?.resignation_date) {
      const formDatas = [...formData];
      formDatas.forEach((item: any) => {
        if (item.name === "last_working_date") {
          item.options = {
            type: 'future',
            value: formValues?.resignation_date
          }
        }
      })
      setformData(formDatas)
    }

  }, [formValues])
  
  const handleFinish = (values: any) => {    
    if (id) {
      setLoading(true)
      const record = {
        name: id,
        data: {
          ...values,
          employee_name : empId,
          resignation_date: dateFormat(values?.resignation_date),
          last_working_date: dateFormat(values?.last_working_date),
          upload_document: imageData?.originalfile || formValues?.upload_document,
        },
      };
      updateRecord(
        'resignation_details',
        record,
        'employee_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-resigned-employee');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    } else {
      setLoading(true)
      const record = {
        ...values,
        resignation_date: dateFormat(values?.resignation_date),
        last_working_date: dateFormat(values?.last_working_date),
        upload_document: imageData?.originalfile || null
      };
      createRecord(
        'resignation_details',
        record,
        'employee_management',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-resigned-employee');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    }
  };

  const handleChange = (val: any, key: any) => {
    if (key === "resignation_date") {
      const formDatas = [...formData];
      formDatas.forEach((item: any) => {
        if (item.name === "last_working_date") {
          item.options = {
            type: 'future',
            value: val
          }
        }
      })
    }
    if (key === "last_working_date") {      
      const formDatas = [...formData];
      formDatas.forEach((item: any) => {
        if (item.name === "resignation_date") {

         const currentDate = new Date()          
          if (val > currentDate ) {
            item.options = {
              type: 'past',
              value: currentDate
            }
          }else if (val === null) {
            item.options = {
              type : 'past',
              value : currentDate
            }
          }else{
            item.options = {
              type: 'past',
              value: val
            }
          }
        }
      })
    }
  }

  const onImageUploadChange = (e: any) => {    
    setImageData(e);
  }

  

  return (
    <>
    <SpinLoader loading={loading}/>
      <FormWrapper
        formData={formData}
        formValue={formValues}
        handleFinish={handleFinish}
        removeEmployeeCode={true}
        appname="htssuite"
        dynamicLayout
        onChange={handleChange}
        handleImageUpload={onImageUploadChange}
      />
    </>
  );
};

export default Create;
