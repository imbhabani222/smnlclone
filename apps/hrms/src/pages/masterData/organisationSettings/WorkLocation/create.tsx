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
import Spin from '../../../../../../../libs/common/ui/Loader/spinLoader';

const Create = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    active: false,
    zone: '',
  });
  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    setloading(true)
    getFields('Work Location', 'htssuite').then((items) => {
      setloading(false)
      setformData(items);
      const data = setFormData(items);
      setformValue(data);
    });
    if (term) {
      setloading(true)
      const data = { name: term };
      getRecordById('work_location', data, 'master_data', 'htssuite').then(
        (items) =>{
          setloading(false)
          setformValue({
            ...items,
            active: items?.active === 1 ? true : false,
          })
        }
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
          active: e?.active ? 1 : 0,
          state_name: e?.state_name?.name,
          branch_name: e?.branch_name?.name,
          salary_processing_start_date: Number(e?.salary_processing_start_date),
        },
      };
      updateRecord('work_location', record, 'master_data', 'htssuite').then(
        (items: any) => {
          setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-work-location');
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
        salary_processing_start_date: Number(e?.salary_processing_start_date),
      };
      createRecord('work_location', record, 'master_data', 'htssuite').then(
        (items) => {
          setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-work-location');
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
      <Spin loading={loading} />
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
