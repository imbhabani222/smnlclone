/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({ active: true });
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });
  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');
  useEffect(() => {
    getFields('Inventory State', 'htssuite').then((items) => {
      return setformData(items);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'inventory_state',
        data,
        'inventory_general_setup',
        'htsinventory'
      ).then((items) => setformValue(items));
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
        'inventory_state',
        record,
        'inventory_general_setup',
        'htsinventory'
      ).then((items: any) => {
        {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-state');
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
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };

      createRecord(
        'inventory_state',
        record,
        'inventory_general_setup',
        'htsinventory'
      ).then((items) => {
        console.log(items, 'items')
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-state');
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
    }
  };

  // const inputFieldChange = (value: any, name: any) => {
  //   const updatedFormValue = { ...formValue, [name]: value } as Record<
  //     string,
  //     any
  //   >;
  //   console.log(formValue, 'value');
  //   const stateName = updatedFormValue['state_name'];

  //   const tinNumber = updatedFormValue['tin_no_start_no'];

  //   if (stateName && tinNumber) {
  //     const gstName = tinNumber + '-' + stateName;

  //     updatedFormValue['gst_name'] = gstName;

  //     setformValue(updatedFormValue);
  //   } else {
  //     setformValue(updatedFormValue);
  //   }
  // };

  return (
    <div>
      <FormWrapper
        // onChange={inputFieldChange}
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
