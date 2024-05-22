import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
import {
  setFormData,
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import SpinLoader from '../../../../../../libs/common/ui/Loader/spinLoader';
import moment from 'moment';
import dayjs from 'dayjs';
type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>({});
  let [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false)
  const term = searchParams.get('id');

  useEffect(() => {
    setLoading(true)
    getFields('Employee Notice Letter', 'htssuite').then((items) => {
      let newItems: any = addExtraFields(items, [
        {
          name: 'email',
          module: 'employee_management',
        },
      ]);

      newItems.forEach((item: any) => {
        if (item.datatype === 'Date') {
          item.options = 'past';
        }
      });
      setformData(newItems);
      setLoading(false)
      const data: any = setFormData(newItems);
      !term && setformValue(data);
    });
    if (term) {
      setLoading(true)
      const data = { name: term };
      getRecordById(
        'employee_notice_letter',
        data,
        'employee_management',
        'htssuite'
      ).then((items:any) => {
        
        if (items?.name) {
          const da = {
            ...items,
            absent_date: dayjs(items?.absent_date),
            first_letter_date: dayjs(items?.first_letter_date),
            second_letter_date: dayjs(items?.second_letter_date)
          };
          setformValue(da);
          setLoading(false)
        }
      });
    }
  }, [term]);

  useEffect(()=>{
     if (term&&formData) {      
      if (formValue?.first_letter_date) {
        const formDatas = [...formData]
        formDatas.forEach((item:any)=>{
          if (
            item.name === 'second_letter_date' ||
            item.name === 'third_letter_date'
          ) {
            item.options = {
              type: 'enable_only_two_custom_date',
              startDate: formValue?.first_letter_date,
              endDate: formValue?.second_letter_date
            };
          }
        })
        setformValue(formDatas)
      }

       if (formValue?.second_letter_date) {
        const formDatas = [...formData]
        formDatas.forEach((item:any)=>{
          if (item.name === 'first_letter_date') {
            item.options = {
              type: 'past',
              value: formValue?.second_letter_date
            };
          }
        })
      setformData(formDatas)

      }
     }
  
    },[term&& formData])

  const handleFinish = (e: any) => {
    setLoading(true)
      const record = {
        doc_id: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
          absent_date: dateFormat(e?.absent_date),
          second_letter_date: dateFormat(e?.second_letter_date?.d),
          first_letter_date: dateFormat(e?.first_letter_date?.$d),
        },
      };
      updateRecord(
        'employee_notice_letter',
        record,
        'employee_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-notice-letter');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    
  };
  const handleChange = (val: any, key: any) => {
    console.log(val, "val")
    if (key === 'first_letter_date') {
      const formDatas = [...formData];
      formDatas.forEach((item: any) => {
        if (
          item.name === 'second_letter_date' ||
          item.name === 'third_letter_date'
        ) {
          item.options = {
            type: 'enable_only_two_custom_date',
            startDate: val,
            endDate: moment(new Date())
          };
        }
      });
    } else if (key === 'second_letter_date') {
      const formDatas = [...formData];
      formDatas.forEach((item: any) => {
        if (item.name === 'first_letter_date') {
          item.options = {
            type: 'past',
            value: val,
          };
        }
      });
    }
  };
  return (
    <>
    <SpinLoader loading={loading}/>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htssuite"
        dynamicLayout
        onChange={handleChange}
      />
    </>
  );
};

export default Create;
