import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import moment from 'moment';
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
const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>({
    active: false,
  });
  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Assets Master', 'htssuite').then((items) => {
      let newItems: any = addExtraFields(items, [
        {
          name: 'brand_name',
          module: 'assets_management',
        },
      ]);
      newItems.forEach((item:any) => {
       if(item.datatype === "Date") {
        item.options = "past"
       }
      })
      setformData(newItems);
      const data: any = setFormData(newItems);
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'assets_master',
        data,
        'assets_management',
        'htssuite'
      ).then((items) =>
        setformValue({
          ...items,
          active: items?.active === 1 ? true : false,
          asset_purchase_date: datetoFrom(items?.asset_purchase_date),
          warranty_expire_date: datetoFrom(items?.warranty_expire_date),
        })
      );
    }
  }, [term]);

  useEffect(()=>{

    if(formValue?.unit_cost && formValue?.qty){
      const unit_cost = Number(formValue?.unit_cost);
      const qty = Number(formValue?.qty);
      const total_cost:any = unit_cost * qty;
      setformValue({...formValue, total_cost})
    }
    else {
      setformValue({...formValue, total_cost: 0})

    }

  },[formValue?.unit_cost, formValue?.qty ])

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        doc_id: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
          asset_purchase_date: dateFormat(e?.asset_purchase_date),
          warranty_expire_date: dateFormat(e?.warranty_expire_date),
        },
      };
      updateRecord(
        'assets_master',
        record,
        'assets_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-asset-list');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
        asset_purchase_date: dateFormat(e?.asset_purchase_date),
        warranty_expire_date: dateFormat(e?.warranty_expire_date),
      };
      createRecord(
        'assets_master',
        record,
        'assets_management',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-asset-list');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  const onChange = (value:any, key:any) => {
    if(key === "asset_purchase_date"){
      const formDatas = [...formData]
      formDatas.forEach((item:any)=> {
        if(item.name === "warranty_expire_date") {
           item.options = {
            type: "future",
            value: value
           }
        }
      })
      setformData(formDatas)
    }
    if(key === "warranty_expire_date"){
      const formDatas = [...formData]
      formDatas.forEach((item:any)=> {
        if(item.name === "asset_purchase_date") {
          const today = moment();
          const inputDateMoment = moment(value?.$d);
          const isInputDateGreaterThanToday = inputDateMoment.isAfter(today);
           item.options = {
            type: "past",
            value: isInputDateGreaterThanToday ? moment(new Date()) : value
           }
        }
      })
      setformData(formDatas)
    }
    setformValue({...formValue, [key]: value})
  }
  return (
    <>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htssuite"
        dynamicLayout
        onChange={onChange}
      />
    </>
  );
};

export default Create;
