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
import moment from 'moment';
import dayjs from 'dayjs';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';

type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({ grade_name: '', active: true });
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });
  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');
  useEffect(() => {
    getFields('Inventory Category Master', 'htssuite').then((items) =>
      setformData(items)
    );
    if (term) {
      const data = { name: term };
      getRecordById(
        'inventory_category_master',
        data,
        'inventory_product_configuration',
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
        'inventory_category_master',
        record,
        'inventory_product_configuration',
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
          navigate('/view-category');
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
        'inventory_category_master',
        record,
        'inventory_product_configuration',
        'htsinventory'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-category');
        } else {
          isSuccess(items?.message, 'error');
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
  const  onImageUpload = (file:any, exs:any, name:any) => {
    setformValue({...formValue, [name]:file?.originalfile || null})
   }
  // const handleQuit = () => {
  //   setTimeout(() => {
  //     navigate('/view-category');
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
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        handleImageUpload={onImageUpload}
      />
    </div>
  );
};

export default Create;