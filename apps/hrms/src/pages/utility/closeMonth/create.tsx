import React, { useEffect, useState } from 'react';
import {
  SaveClosingMonthLatest,
  getClosingMonthLatest,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { setFormData } from 'libs/common/utils/common';
type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();

  const [formValue, setformValue] = useState({});
  const [formData, setformData] = useState<any>([
    {
      label: 'Year',
      name: 'year',
      datatype: 'Select',
      isReq: true,
      //  disabled: true,
      //  description: {"linkfield": "branch_name", "modulename": "master_data"},
      //  options: 'Branch Master',
      // colSpan: 6,
    },
    {
      label: 'Month',
      name: 'month',
      datatype: 'Select',
      isReq: true,
      //  disabled: true,
      //  description: {"linkfield": "branch_name", "modulename": "master_data"},
      //  options: 'Branch Master',
      // colSpan: 6,
    },
  ]);
  const [resetOptions, setresetOptions] = useState<any>(true);
  useEffect(() => {
    getClosingMonthLatest().then((items: any) => {
      // setformValue(items[0]);
      setformData((pre: any) => {
        return pre.map((i: any) => {
          if (i?.name === 'year') {
            return {
              ...i,
              options: [{ label: items?.[0]?.year, value: items?.[0]?.year }],
            };
          }
          if (i?.name === 'month') {
            return {
              ...i,
              options: [{ label: items?.[0]?.month, value: items?.[0]?.month }],
            };
          }
        });
      });
    });
  }, [resetOptions]);

  const handleFinish = (e: any) => {
    const record = {
      ...e,
    };
    SaveClosingMonthLatest(record).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        navigate('/close-month');
        setresetOptions((pre: any) => !pre);
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };
  return (
    <>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        submitButtonLabel="Close Month"
        reset={true}
      />
    </>
  );
};

export default Create;
