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
import { isSuccess } from '../../../../../../libs/common/ui/Message';

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
    getFields('Inventory Godown', 'htssuite').then((items) =>
      setformData(items)
    );
    if (term) {
      const data = { name: term };

      getRecordById(
        'inventory_godown',
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
        'inventory_godown',
        record,
        'inventory_general_setup',
        'htsinventory'
      ).then((items: any) => {
        // setmsg((pre) => {
        //   const message =
        //     items?.status !== 'error' ? { isSuccess: true } : { isError: true };
        //   return {
        //     ...pre,
        //     ...message,
        //     desc: items?.message,
        //   };
        // });
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-godown');
        } else {
          if(items?.error?.fieldName){
            isSuccess(
              `${items?.error?.fieldname
                .toString()
                ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
              'error'
            );
          }
          else {
            isSuccess(
              `${items?.message}`,
              'error'
            );
          }
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };
      createRecord(
        'inventory_godown',
        record,
        'inventory_general_setup',
        'htsinventory'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-godown');
        } else {
          if(items?.error?.fieldName){
            isSuccess(
              `${items?.error?.fieldname
                .toString()
                ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
              'error'
            );
          }
          else {
            isSuccess(
              `${items?.message}`,
              'error'
            );
          }
        }
        // setmsg((pre) => {
        //   const message =
        //     items?.status !== 'error' ? { isSuccess: true } : { isError: true };
        //   return {
        //     ...pre,
        //     ...message,
        //     desc: items?.message,
        //   };
        // })
      });
    }
  };

  // const handleQuit = () => {
  //   setTimeout(() => {
  //     navigate('/view-godown');
  //   }, 1000);
  // };

  return (
    <div>
      {/* <Message
        msg={msg?.desc}
        isSuccess={msg.isSuccess}
        isError={msg.isError}
        isWarning={msg.isWarning}
        handleQuit={handleQuit}
      /> */}
      <FormWrapper
        multiple={true}
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        dynamicLayout
      />
    </div>
  );
};

export default Create;
