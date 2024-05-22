import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
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
    getFields('Nature of Claim', 'htssuite').then((items) => {
      const newItems = items.map((item: any) => {
        if (item.name === 'claim_limit') {
          return { ...item, datatype: 'Int' };
        } else {
          return { ...item };
        }
      });
      setformData(newItems);

      const data = setFormData(items);
      setformValue(data);
      setloading(false)
    });
    if (term) {
      setloading(true)
      const data = { name: term };
      getRecordById('nature_of_claim', data, 'master_data', 'htssuite').then(
        (items) =>{
          setformValue({
            ...items,
            active: items?.active === 1 ? true : false,
          })
           setloading(false)
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
          claim_limit: Number(e?.claim_limit),
        },
      };
      updateRecord('nature_of_claim', record, 'master_data', 'htssuite').then(
        (items: any) => {
          setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-nature-of-claims');
          } else {
            if(items?.error?.fieldname){
              isSuccess(`${items?.error?.fieldname.toString()?.replace("_", "")} ${items?.error?.Entry.toLowerCase()}`, 'error');
            }
            else{
              isSuccess(`${items?.message}`, 'error')
            }
          }
        }
      );
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
        claim_limit: Number(e?.claim_limit),
      };
      createRecord('nature_of_claim', record, 'master_data', 'htssuite').then(
        (items) => {
          setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-nature-of-claims');
          } else {
            isSuccess(`${items?.error?.fieldname.toString()?.replace("_", "")} ${items?.error?.Entry.toLowerCase()}`, 'error');
          }
        }
      );
    }
  };

  return (
    <>
      <Spin loading={loading} />
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
      />
    </>
  );
};

export default Create;
