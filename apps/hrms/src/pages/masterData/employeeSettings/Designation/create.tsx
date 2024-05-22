import { useEffect, useState } from 'react';
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

const Create = (props: any) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    designation_name: '',
    active: false,
  });
  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Designation', 'htssuite').then((items) => {
      setformData(items);
      const data = setFormData(items);
      setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById('designation', data, 'master_data', 'htssuite').then(
        (items: any) =>
          setformValue({
            designation_name: items?.designation_name,
            active: items?.active === 1 ? true : false,
          })
      );
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
      updateRecord('designation', record, 'master_data', 'htssuite').then(
        (items: any) => {
          setloading(false);
          {
            if (items?.status === 200) {
              isSuccess(items?.message, 'success');
              navigate('/view-designation');
            } else {
              isSuccess(
                `${items?.error?.fieldname
                  .toString()
                  ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
                'error'
              );
            }
          }
        }
      );
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };
      createRecord('designation', record, 'master_data', 'htssuite').then(
        (items) => {
          setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-designation');
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
      />
    </>
  );
};

export default Create;
