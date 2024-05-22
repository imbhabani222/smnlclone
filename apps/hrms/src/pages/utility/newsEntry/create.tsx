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
import moment from 'moment';
import dayjs from 'dayjs';
import {
  CustomiseData,
  addExtraFields,
} from '../../../../../../libs/common/ui/Form/FormHelper';
import {
  dateFormat,
  datetoFrom,
  setFormData,
} from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import SpinLoader from '../../../../../../libs/common/ui/Loader/spinLoader';
type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    // change below
    grade_name: '',
    active: false,
  });
  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    setloading(true);
    getFields('News Entry', 'htssuite').then((items) => {
      const newData = CustomiseData(items, { addCheckboxColSpan: true });
      let newItems: any = addExtraFields(newData, [
        {
          name: 'email',
          module: 'utilities',
        },
      ]);
      newItems.forEach((item: any) => {
        if (item.datatype === 'Date') {
          item.options = 'future';
        }
      })
      setformData(newItems);
      setloading(false);
      const data: any = setFormData(newItems);
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById('news_entry', data, 'utilities', 'htssuite').then(
        (items) => {
          if (items) {
            const da = {
              ...items,
              grade_name: items?.grade_name,
              active: items?.active === 1 ? true : false,
              date: datetoFrom(items?.date),
            };
            setformValue(da);
          }
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
          date: dateFormat(e?.date),
        },
      };
      updateRecord('news_entry', record, 'utilities', 'htssuite').then(
        (items: any) => {
          setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-news-entry');
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      );
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
        date: dateFormat(e?.date),
      };
      createRecord('news_entry', record, 'utilities', 'htssuite').then(
        (items) => {
          setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-news-entry');
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      );
    }
  };

  return (
    <>
      <SpinLoader loading={loading} />
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
      />
    </>
  );
};

export default Create;
