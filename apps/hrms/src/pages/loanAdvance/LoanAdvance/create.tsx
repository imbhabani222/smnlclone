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
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
import {
  setFormData,
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
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
    getFields('Loan Advance Request', 'htssuite').then((items) => {
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
      getRecordById(
        'loan_advance_request',
        data,
        'loan_&_advance',
        'htssuite'
      ).then((items) =>
        setformValue({
          ...items,
          state_name: items?.state_name,
          active: items?.active === 1 ? true : false,
          zone: items?.zone,
          request_date: datetoFrom(items.request_date),
          ecscheque_date: datetoFrom(items.ecscheque_date),
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
          ecscheque_date: dateFormat(e?.ecscheque_date),
        },
      };
      updateRecord(
        'loan_advance_request',
        record,
        'loan_&_advance',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-loan-advance');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
        request_date: dateFormat(new Date()),
        ecscheque_date: dateFormat(e?.ecscheque_date),
      };
      createRecord(
        'loan_advance_request',
        record,
        'loan_&_advance',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-loan-advance');
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
        dynamicLayout
      />
    </div>
  );
};

export default Create;
