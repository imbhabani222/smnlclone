import React, { useState, useEffect } from 'react';
import { createRecord, getFields, getRecordById, updateRecord } from '../../../../../../libs/common/api/doctype';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import moment from 'moment';
import SpinLoader from '../../../../../../libs/common/ui/Loader/spinLoader';
import dayjs from 'dayjs';

type Props = {}

const Create = (props: Props) => {

    const navigate = useNavigate();
    const [formData, setformData] = useState([]);
    const [formValue, setformValue] = useState<any>({});
    let [searchParams, setSearchParams] = useSearchParams();
    const [uploadDocument, setUploadDocument] = useState<any>({});
    const [loading, setLoading] = useState(false)

    const term = searchParams.get('id');
    
    useEffect(()=>{
      setLoading(true)
       getFields('Employee Violations', 'htssuite').then((items:any) => {
       const newItems = items       
        newItems.forEach((item: any) => {
            if (item.datatype === 'Date') {
              item.options = 'past';
            }
            if (item?.name === 'upload_pdf') {
              item.description ={
                accept:
                  'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                fileType: 'Only .pdf',
                type: 'application/pdf',
              }
            }
            if (item?.name === "employee_name") {
              item.datatype = 'TableSelect',
              item.columns = [
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
              ]
            }
          })
          setformData(newItems)
          setLoading(false)
       })
       if(term) {
        setLoading(true)
        const data = {name:term};
        getRecordById('employee_violations', data, 'employee_management', 'htssuite').then((items)=>{
            setformValue({
                ...items,
                date: dayjs(items.date, 'YYYY/MM/DD')
            })
            setLoading(false)
        })
       }
    },[term])
  
    const handleFinish = (values: any) => {
      setLoading(true)
        const payload = {
         ...values,
         date: moment(values?.date).format("YYYY-MM-DD"),
         upload_pdf: uploadDocument?.originalfile || null
        }
        if (term) {
          const updatePayload = {
            doc_id: term,
            data: {
              employee_name: values?.employee_name?.name,
              date: values.date,
              violation_type: values?.violation_type,
              description: values?.description,
              upload_pdf: uploadDocument?.originalfile || formValue?.upload_pdf,
            },
          };
          updateRecord(
            'employee_violations',
            updatePayload,
            'employee_management',
            'htssuite'
          ).then((items: any) => {
            if (items?.status === 200) {
              isSuccess(items?.message, 'success');
              navigate('/view-violation');
              setLoading(false)
            } else {
              isSuccess(items?.message, 'error');
              setLoading(false)
            }
          });
        } else {
          createRecord(
            'employee_violations',
            payload,
            'employee_management',
            'htssuite'
          ).then((items: any) => {
            if (items?.status === 200) {
              isSuccess(items?.message, 'success');
              navigate('/view-violation');
              setLoading(false)
            } else {
              isSuccess(items?.message, 'error');
              setLoading(false)
            }
          });
        }
   
    }
    const onImageUpload = (e:any) => {
    setUploadDocument(e);
    }

    return (
        <>
        <SpinLoader loading={loading}/>
        <FormWrapper
         formValue={formValue}
         formData={formData}
         handleFinish={handleFinish}
         handleImageUpload={onImageUpload}
         appname="htssuite"
         dynamicLayout
         />
        </>
    )

}

export default Create