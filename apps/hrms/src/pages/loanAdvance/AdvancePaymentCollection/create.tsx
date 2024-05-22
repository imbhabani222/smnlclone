import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
import moment from 'moment';
import {
  setFormData,
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import dayjs from 'dayjs';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    state_name: '',
    active: false,
    zone: '',
  });

  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Advance Payment Collection', 'htssuite').then((items) => {
      let newItems: any = addExtraFields(items, [
        {
          name: 'email',
          module: 'employee_management',
        },
      ]);
      setformData(newItems);
      const data: any = setFormData(newItems);
      !term && setformValue(data);
    });
    if (term) {
      const data = { doc_id: term };

      // const data = { doc_id: term };
      getRecordById(
        'advance_payment_collection',
        data,
        'loan_&_advance',
        'htssuite'
      ).then((items) =>
        setformValue({
          ...items,
          reference_date: dateFormat(items.reference_date),
        })
      );

      getTableData(
        'advance_payment_collection',
        'loan_&_advance',
        'htssuite',
        data
      ).then((items) =>
        setformValue({
          ...items,
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
          reference_date: dateFormat(e?.reference_date),
          active: e?.active ? 1 : 0,
        },
      };
      updateRecord(
        'advance_payment_collection',
        record,
        'loan_&_advance',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-advance-payment-collection');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
        reference_date: dateFormat(e?.reference_date),
      };
      createRecord(
        'advance_payment_collection',
        record,
        'loan_&_advance',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-advance-payment-collection');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  return (
    <div>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htssuite"
      />
    </div>
  );
};

export default Create;
