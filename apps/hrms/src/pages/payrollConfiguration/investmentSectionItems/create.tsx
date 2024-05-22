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
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    state_name: '',
    active: false,
    zone: '',
  });
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });

  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Investment Section Items', 'htssuite').then((items: any) => {
      let newItems = addExtraFields(items, [
        {
          name: 'section_name',
          module: 'payroll_configurations',
        },
      ]);
      //@ts-ignore
      setformData(newItems);
      const data = setFormData(items);
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'investment_section_items',
        data,
        'payroll_configurations',
        'htssuite'
      ).then((items) => {
        setformValue({
          ...items,
          active: items?.active === 1 ? true : false,
        });
      });
    }
  }, [term]);

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        doc_id: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
        },
      };
      updateRecord(
        'investment_section_items',
        record,
        'payroll_configurations',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-investment-section-items');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };
      createRecord(
        'investment_section_items',
        record,
        'payroll_configurations',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-investment-section-items');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  return (
    <>
      <FormWrapper
        multiple={true}
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htssuite"
      />
    </>
  );
};

export default Create;
