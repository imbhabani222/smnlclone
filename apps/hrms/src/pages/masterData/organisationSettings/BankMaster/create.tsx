import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  // getBankDetails,
} from '../../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { setFormData } from '../../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';
import Spin from '../../../../../../../libs/common/ui/Loader/spinLoader';

const Create = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    state_name: '',
    active: false,
    zone: '',
  });

  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    setloading(true)
    getFields('Bank Master', 'htssuite').then((items) => {
      setformData(items);
      const data = setFormData(items);
      setformValue(data);
      setloading(false)
    });
    if (term) {
      setloading(true)
      const data = { name: term };
      getRecordById('bank_master', data, 'master_data', 'htssuite').then(
        (items) =>{
          setloading(false)
          setformValue({
            ...items,
            active: items?.active === 1 ? true : false,
          })
        }
      );
    }
  }, [term]);

  const handleFinish = (e: any) => {
    setloading(true);
    if (term) {
      const record = {
        doc_id: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
        },
      };
      updateRecord('bank_master', record, 'master_data', 'htssuite').then(
        (items: any) => {
          setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-bank');
          } else {
            isSuccess(`${items?.error?.fieldname.toString()?.replace("_", "")} ${items?.error?.Entry.toLowerCase()}`, 'error');
          }
        }
      );
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };
      createRecord('bank_master', record, 'master_data', 'htssuite').then(
        (items) => {
          setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-bank');
          } else {
            isSuccess(`${items?.error?.fieldname.toString()?.replace("_", "")} ${items?.error?.Entry.toLowerCase()}`, 'error');
          }
        }
      );
    }
  };

  //   const handleChange = (value:any, fieldName:any) => {
  //     let formValueObj = {
  //       ...formValue,
  //       [fieldName]: value
  //     }
  //     if(fieldName === "ifsc_code"){
  //       const query = {
  //         ifsc:value
  //       }
  //       getBankDetails("htssuite", query).then((items:any) => {
  //         const responseObj = { bank_name : items.bank_name, address_line_1: items.address_line_1, city: items.city, state:items.state, mobile:items.mobile }
  //         formValueObj= {...formValueObj, ...responseObj }
  //         setformValue({...formValueObj})
  //       })
  //   }
  // }
  return (
    <>
      <Spin loading={loading} />
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        // onChange={handleChange}
        dynamicLayout
      />
    </>
  );
};

export default Create;
