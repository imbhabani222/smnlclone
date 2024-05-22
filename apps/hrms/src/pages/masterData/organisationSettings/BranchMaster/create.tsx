import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { setFormData } from '../../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';
import SpinLoader from '../../../../../../../libs/common/ui/Loader/spinLoader';


const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    active: false,
    zone: '',
  });
  const [loading, setLoading] = useState(false)
  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    setLoading(true)
    getFields('Branch Master', 'htssuite').then((items) => {
      setformData(items);
      const data = setFormData(items);
      setformValue(data);
      setLoading(false)
    });
    if (term) {
      setLoading(true)
      const data = { name: term };
      getRecordById('branch_master', data, 'master_data', 'htssuite').then(
        (items) =>{
          setformValue({
            ...items,
            active: items?.active === 1 ? true : false,
          })
          setLoading(false)
        }
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
          state_name: e?.state_name?.name,
        },
      };
      updateRecord('branch_master', record, 'master_data', 'htssuite').then(
        (items: any) => {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-branch-master');
          } else {
            isSuccess(
              `${items?.error?.fieldname
                .toString()
                ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
              'error'
            );
          }
        }
      );
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };
      createRecord('branch_master', record, 'master_data', 'htssuite').then(
        (items) => {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-branch-master');
          } else {
            isSuccess(
              `${items?.error?.fieldname
                .toString()
                ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
              'error'
            );
          }
        }
      );
    }
  };

  return (
    <>
    <SpinLoader loading={loading}/>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htssuite"
        dynamicLayout
      />
    </>
  );
};

export default Create;
