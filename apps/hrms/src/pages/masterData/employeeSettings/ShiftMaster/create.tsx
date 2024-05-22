import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {
  setFormData,
  dateTime,
  datetoTime,
} from '../../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    state_name: '',
    active: false,
    zone: '',
  });

  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Shift Master', 'htssuite').then((items) => {
      setformData(items);
      const data = setFormData(items);
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById('shift_master', data, 'master_data', 'htssuite').then(
        (items) =>
          setformValue({
            ...items,
            active: items?.active === 1 ? true : false,
            shift_start_time: dateTime(items?.shift_start_time),
          })
      );
    }
  }, [term]);

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        doc_id: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
          shift_start_time: datetoTime(e?.shift_start_time),
        },
      };

      updateRecord('shift_master', record, 'master_data', 'htssuite').then(
        (items: any) => {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-shift-master');
          } else {
            isSuccess(`${items?.error?.fieldname.toString()?.replace("_", "")} ${items?.error?.Entry.toLowerCase()}`, 'error');
          }
        }
      );
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
        shift_start_time: datetoTime(e?.shift_start_time),
      };
      createRecord('shift_master', record, 'master_data', 'htssuite').then(
        (items) => {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-shift-master');
          } else {
            isSuccess(`${items?.error?.fieldname.toString()?.replace("_", "")} ${items?.error?.Entry.toLowerCase()}`, 'error');
          }
        }
      );
    }
  };

  return (
    <>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        dynamicLayout
      />
    </>
  );
};

export default Create;