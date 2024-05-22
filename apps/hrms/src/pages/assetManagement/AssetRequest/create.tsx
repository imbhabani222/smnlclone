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
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';

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
    status: 'Requested',
  });

  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Asset Request', 'htssuite').then((items) => {
      let newItems: any = addExtraFields(items, [
        {
          name: 'email',
          module: 'employee_management',
        },
        {
          name: 'asset_name',
          module: 'assets_management',
        },
      ]);
      newItems.forEach((item:any)=>{
        if(item.name === "request_date") {
          item.default = dayjs()
          item.disabled = true
        }
        if(item.name === "date_needed"){
          item.options = "future"
        }
      })
      setformData(newItems);
      const data: any = setFormData(newItems);
      !term && setformValue(data);
    });
    if (term) {
      const data = { doc_id: term };
      getRecordById(
        'asset_request',
        data,
        'assets_management',
        'htssuite'
      ).then((items) =>
        setformValue({
          ...items,
          request_date: datetoFrom(items?.request_date),
          date_needed: datetoFrom(items?.date_needed),
          active: items?.active === 1 ? true : false,
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
          request_date: dateFormat(e?.request_date),
          date_needed: dateFormat(e?.date_needed),
        },
      };
      updateRecord(
        'asset_request',
        record,
        'assets_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-asset-request');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
        request_date: dateFormat(e?.request_date),
        date_needed: dateFormat(e?.date_needed),
      };
      createRecord(
        'asset_request',
        record,
        'assets_management',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-asset-request');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  return (
    <>
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
