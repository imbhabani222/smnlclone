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
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);

  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({ active: true });
  let [searchParams, setSearchParams] = useSearchParams();
  let term = '';
  for (const entry of searchParams.entries()) {
    if (entry?.[0] === 'id') {
      term = entry[1];
    } else {
      term = `${term}&${entry[0]}`;
    }
  }
  // const term = searchParams.get('id');
  useEffect(() => {
    getFields('Inventory Ledger Group', 'htssuite').then((items) => {
      setloading(false);
      setformData(items);
    });
    if (term) {
      const data = { name: term };
      setloading(true);
      getRecordById(
        'inventory_ledger_group',
        data,
        'inventory_account_configuration',
        'htsaccount'
      ).then((items) => {
        setloading(false);
        setformValue(items);
      });
    }
  }, [term]);

  const handleFinish = (e: any) => {
    setloading(true);
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
        },
      };

      updateRecord(
        'inventory_ledger_group',
        record,
        'inventory_account_configuration',
        'htsaccount'
      ).then((items: any) => {
        setloading(false);
        if (items.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-ledger-group');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };

      createRecord(
        'inventory_ledger_group',
        record,
        'inventory_account_configuration',
        'htsaccount'
      ).then((items) => {
        setloading(false);
        if (items.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-ledger-group');
        } else {
          if(items.includes("already exists")){
            isSuccess( `Ledger Group "${record.ledger_group_name}" already exists` , 'error');
          }else{
            isSuccess(items?.message, 'error');
          }
        }
      });
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
