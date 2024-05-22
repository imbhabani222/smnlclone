import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import Message from '../../../../../../libs/common/ui/Message/message';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    state_name: '',
    active: true,
    zone: '',
  });
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });

  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Inventory Section', 'htssuite').then((items) =>
      setformData(items)
    );
    if (term) {
      const data = { name: term };

      getRecordById(
        'inventory_section',
        data,
        'inventory_general_setup',
        'htsinventory'
      ).then((items) => {
        setformValue({
          ...items,
          active: items?.active === 1 ? true : false,
        });
      });
    }
  }, [term]);

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
        },
      };
      updateRecord(
        'inventory_section',
        record,
        'inventory_general_setup',
        'htsinventory'
      ).then((items: any) => {
        setmsg((pre) => {
          const message =
            items?.status !== 'error' ? { isSuccess: true } : { isError: true };
          return {
            ...pre,
            ...message,
            desc: items?.message,
          };
        });
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };
      createRecord(
        'inventory_section',
        record,
        'inventory_general_setup',
        'htsinventory'
      ).then((items) =>
        setmsg((pre) => {
          const message =
            items?.status !== 'error' ? { isSuccess: true } : { isError: true };
          return {
            ...pre,
            ...message,
            desc: items?.message,
          };
        })
      );
    }
  };

  const handleQuit = () => {
    setTimeout(() => {
      navigate('/view-section');
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
      <FormWrapper
        multiple={true}
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
      />
    </div>
  );
};

export default Create;
