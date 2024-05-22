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
import moment from 'moment';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    active: false,
  });

  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Brand Master', 'htssuite').then((items) => {
      // let newItems: any = addExtraFields(items, [
      //   {
      //     name: "email",
      //     module: "employee_management",
      //   },
      // ]);
      setformData(items);
      const data: any = setFormData(items);
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById('brand_master', data, 'assets_management', 'htssuite').then(
        (items) =>
          setformValue({
            ...items,
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
        },
      };
      updateRecord(
        'brand_master',
        record,
        'assets_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-brand-master');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
        request_date: moment(e?.request_date).format('YYYY-MM-DD'),
        ecscheque_date: moment(e?.ecscheque_date).format('YYYY-MM-DD'),
      };
      createRecord(
        'brand_master',
        record,
        'assets_management',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-brand-master');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  const  onImageUpload = (file:any, exs:any, name:any) => {
    setformValue({...formValue, [name]:file?.originalfile || null})
   }

  return (
    <>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        handleImageUpload={onImageUpload}
        appname="htsinventory"
      />
    </>
  );
};

export default Create;
