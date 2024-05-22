import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams } from 'react-router-dom';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';

const Create = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>({
    state_name: '',
    active: false,
  });

  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    // http://127.0.0.1:8000/api/method/htsoperation.operations_master_data.doctype.movement_type.api.get_records

    getFields('Activity Type', 'htssuite').then((items) => {
      
      const formDatas = items.map((item:any)=>{
        if(item.name === "vehicle_type_used"){
          return {
            ...item,
            "datatype": "Link",
            "default":"",
            "options": "Vehicle Types",
          }
        }else{
          return item
        }
      })
      console.log(formDatas,"formsds")
      setformData(formDatas);
      const data = setFormData(formDatas);
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'activity_type',
        data,
        'operations_master_data',
        'htsoperation'
      ).then((items) =>
        {
          console.log(items,"abc")
          setformValue({
         ...items,
          active: items?.active === 1 ? true : false,
         
        })}
      );
    }
  }, [term]);

  const handleFinish = (e: any) => {
    //setloading(true);

    if (term) {
      const record = {
        // doc_id: term,
        name:term,
        data: {
          ...e,
          // state_name: e.state_name.trim(),
          active: e?.active ? 1 : 0,
        },
      };
      updateRecord(
        'activity_type',
        record,
        'operations_master_data',
        'htsoperation'
      ).then((items: any) => {
        // setloading(false);
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-activity-type');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
      };
      createRecord(
        'activity_type',
        record,
        'operations_master_data',
        'htsoperation'
      ).then((items) => {
        // setloading(false);
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-activity-type');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  return (
    <>
      <Spin loading={loading} />
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
      />
    </>
  );
};

export default Create;
