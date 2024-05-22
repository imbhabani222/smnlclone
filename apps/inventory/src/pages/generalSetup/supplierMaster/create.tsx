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
  const [searchParams, _] = useSearchParams();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({ grade_name: '', active: true });
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });

  const term = searchParams.get('id');
  useEffect(() => {
    getFields('Inventory Supplier Details', 'htssuite').then((items) => {
      return setformData(items);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'inventory_supplier_details',
        data,
        'inventory_general_setup',
        'htsinventory'
      ).then((items) => setformValue(items));
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
        'inventory_supplier_details',
        record,
        'inventory_general_setup',
        'htsinventory'
      ).then((items: any) => {
        setloading(false);
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-supplier-list');
        } else {
          isSuccess(
            `${items?.error?.fieldname} ${items?.error?.Entry}`,
            'error'
          );
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };


      createRecord(
        'inventory_supplier_details',
        record,
        'inventory_general_setup',
        'htsinventory'
      ).then((items) => {
        setloading(false);
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-supplier-list');
        } else {
          isSuccess(
            `${items?.error?.fieldname
              .toString()
              ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
            'error'
          );
        }
      });
    }
  };

const  onImageUpload = (file:any,exs:any, name:any) => {
   setformValue({...formValue, [name]:file?.originalfile || null})
  }
  const handleQuit = () => {
    setTimeout(() => {
      navigate('/view-supplier-list');
    }, 1000);
  };
  return (
    <div>
      <Message
        msg={msg?.desc}
        isSuccess={msg.isSuccess}
        isError={msg.isError}
        isWarning={msg.isWarning}
        handleQuit={handleQuit}
      />
      <Spin loading={loading} />
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        dynamicLayout
        handleImageUpload={onImageUpload}
      />
    </div>
  );
};

export default Create;
