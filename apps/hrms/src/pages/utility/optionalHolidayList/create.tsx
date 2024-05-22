import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import moment from 'moment';
import dayjs from 'dayjs';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    // change below
    grade_name: '',
    active: false,
  });
  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Optional Holidays', 'htssuite').then((items) => {
      let newItems: any = addExtraFields(items, [
        {
          name: 'email',
          module: 'utilities',
        },
      ]);
      setformData(newItems);
      const data: any = setFormData(newItems);
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById('optional_holidays', data, 'utilities', 'htssuite').then(
        (items) => {
          const item = items?.[0];

          if (item?.name) {
            const da = {
              ...item,
              date: dayjs(item?.date, 'YYYY/MM/DD'),
            };
            setformValue(da);
          }
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
          date: moment(e?.date).format('YYYY-MM-DD'),
        },
      };
      updateRecord('optional_holidays', record, 'utilities', 'htssuite').then(
        (items: any) => {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-optional-holidays');
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      );
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
        date: moment(e?.date).format('YYYY-MM-DD'),
      };
      createRecord('optional_holidays', record, 'utilities', 'htssuite').then(
        (items) => {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-optional-holidays');
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      );
    }
  };

  return (
    <div>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
      />
    </div>
  );
};

export default Create;
