import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { setFormData } from '../../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import { useSearchParams } from 'react-router-dom';
import Spin from '../../../../../../../libs/common/ui/Loader/spinLoader';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';

const Create = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>({
    state_name: '',
    active: false,
  });

  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    setloading(true)
    getFields('States', 'htssuite').then((items) => {
      setloading(false)
      setformData(items);
      const data = setFormData(items);
      !term && setformValue(data);
    });
    if (term) {
      setloading(true)
      const data = { name: term };
      getRecordById('states', data, 'master_data', 'htssuite').then((items) =>
      {setloading(false)
        setformValue({
          state_name: items?.state_name,
          active: items?.active === 1 ? true : false,
          zone: items?.zone,
        })}
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
          state_name: e.state_name.trim(),
          active: e?.active ? 1 : 0,
        },
      };
      updateRecord('states', record, 'master_data', 'htssuite').then(
        (items: any) => {
          setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-state');
          } else {
            isSuccess(`${items?.error?.fieldname} ${items?.error?.Entry}`, 'error');
          }
        }
      );
    } else {
      const record = {
        ...e,
        state_name: e.state_name.trim(),
        active: e?.active ? 1 : 0,
      };
      createRecord('states', record, 'master_data', 'htssuite').then(
        (items) => {
          setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-state');
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
