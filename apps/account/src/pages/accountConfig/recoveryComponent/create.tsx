import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import Message from '../../../../../../libs/common/ui/Message/message';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';


import Spin from '../../../../../../libs/common/ui/Loader/spinLoader'

type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({ active: true });
  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');
  useEffect(() => {
    getFields('Inventory Recovery Components', 'htssuite').then((items) => {
      return setformData(items);
    });
    if (term) {
      const data = { name: term };
      setloading(true)
      getRecordById(
        'inventory_recovery_components',
        data,
        'inventory_account_configuration',
        'htsaccount'
      ).then((items) => {
        setloading(false)
        setformValue(items)}
        );
    }
  }, [term]);

  const handleFinish = (e: any) => {
    setloading(true)
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
          ledger:e.ledger.name
        },
      };

      updateRecord(
        'inventory_recovery_components',
        record,
        'inventory_account_configuration',
        'htsaccount'
      ).then((items: any) => {
        setloading(false)
        if(items.status === 200){
          isSuccess(items?.message, 'success')
          navigate('/view-recovery-component');
         }
         else {
          isSuccess(items?.message, 'error');
         }
       
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };

      createRecord(
        'inventory_recovery_components',
        record,
        'inventory_account_configuration',
        'htsaccount'
      ).then((items) =>{
        setloading(false)
        if(items.status === 200){
          isSuccess(items?.message, 'success')
          navigate('/view-recovery-component');
         }
         else {
          isSuccess(items?.message, 'error');
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
        appname="htsaccount"
        dynamicLayout
      />
    </>
  );
};

export default Create;
