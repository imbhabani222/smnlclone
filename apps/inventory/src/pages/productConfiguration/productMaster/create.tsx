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
    getFields('Inventory Product Master', 'htssuite').then((items) =>
      setformData(items)
    );
    if (term) {
      const data = { name: term };

      getRecordById(
        'inventory_product_master',
        data,
        'inventory_product_configuration',
        'htsinventory'
      ).then((items) => {
        console.log('formValueformValue', { items, formData });

        setformValue({
          ...items,
          active: items?.active === 1 ? true : false,
          mrp_price: String(items?.mrp_price),
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
          uom: e?.uom?.id,
        },
      };
      updateRecord(
        'inventory_product_master',
        record,
        'inventory_product_configuration',
        'htsinventory'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-product');
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
          }        }
        // setmsg((pre) => {
        //   const message =
        //     items?.status !== 'error' ? { isSuccess: true } : { isError: true };
        //   return {
        //     ...pre,
        //     ...message,
        //     desc: items?.message,
        //   };
        // });
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };
      createRecord(
        'inventory_product_master',
        record,
        'inventory_product_configuration',
        'htsinventory'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-product');
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
          }        }
      });
    }
  };

  // const handleQuit = () => {
  //   setTimeout(() => {
  //     navigate('/view-product');
  //   }, 1000);
  // };

  return (
    <div>
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
