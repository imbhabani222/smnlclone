import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getTableData,
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
  const [formValue, setformValue] = useState({});

  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('General Configuration', 'htssuite').then((items: any) => {
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
    getTableData(
      'general_configuration',
      'payroll_configurations',
      'htssuite'
    ).then((items) => {
      const data = items?.[0];
      setformValue({
        ...data,
        leave_encashment: data?.leave_encashment?.leave_encashment,
        active: data?.active === 1 ? true : false,
      });
    });
  }, []);

  const handleFinish = (e: any) => {
    const record = {
      ...e,
      active: e?.active ? 1 : 0,
    };
    createRecord(
      'general_configuration',
      record,
      'payroll_configurations',
      'htssuite'
    ).then((items) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };

  return (
    <div>
      <FormWrapper
        multiple={true}
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htssuite"
        dynamicLayout={true}
      />
    </div>
  );
};

export default Create;
