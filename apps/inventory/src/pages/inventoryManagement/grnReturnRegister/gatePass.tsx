import React, { useCallback, useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getDocTypes,
  getTableData,
  getSupplierLocation,
  getPIRecordById,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import Message from '../../../../../../libs/common/ui/Message/message';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import ButtonField from '../../../../../../libs/common/ui/Button/buttonField';
import { Button, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalField from '../../../../../../libs/common/ui/Modal/modal';
import { datetoFrom } from '../../../../../../libs/common/utils/common';
type Props = { doc_id: any; url?: string; switchToNextTab?: any; setDoc_id?:any };

const Create = (props: Props) => {
  const navigate = useNavigate();

  const [formData, setformData] = useState([]);

  const [reload, setReload] = useState(false);
  const [loading, setloading] = useState(true);
  const [searchParams, _] = useSearchParams();
  const [formValue, setformValue] = useState({});
  const [productsDetails, setProductDetails] = useState<any>([]);
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Inventory GRN Return Gate Pass', 'htssuite').then((items) => {
      setloading(false);
      const datas:any = [...items];
      datas.forEach((item:any)=>{
        if(item.datatype === 'Date'){
          item.options ={
            type: 'past'
          }
        }
      })
      console.log(datas, "data")
      setformData(datas);
    });

    if (term) {
      const data = { name: term };
      getRecordById(
        'inventory_grn_return',
        data,
        'inventory_management',
        'htsinventory'
      ).then((items) => {
        if (items?.gate_pass && items?.gate_pass?.length > 0) {
          console.log(items?.gate_pass);
          setformValue({
            ...items?.gate_pass?.[0],
            gate_pass_date: datetoFrom(items?.gate_pass?.[0]?.gate_pass_date),
            lr_date: datetoFrom(items?.gate_pass?.[0]?.lr_date),
          });
        }
        // setformValue({
        //   ...items,
        //   date: datetoFrom(items?.date),
        //   invoice_date: datetoFrom(items?.invoice_date),
        //   active: items?.active === 1 ? true : false,
        // });
      });
    }
  }, [term, reload]);

  const handleFinish = (e: any) => {
    const record = {
      name: term,
      data: {
        gate_pass: [e],
      },
    };
    updateRecord(
      'inventory_grn_return',
      record,
      'inventory_management',
      'htsinventory'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        navigate('/view-grn-return-register');
      } else {
        isSuccess(items?.message, 'error');
      }
      setReload((pre: any) => !pre);
    });
  };

  const formChangeHandler = (value: any, key:any) => {
   if(key === "gate_pass_date"){
    const formDatas = [...formData];
    formData.forEach((item:any)=>{
      if(item.name === 'lr_date'){
        item.options = {
          value : value,
          type : 'past'
        }
      }
    })
    setformData([...formDatas])
   }
  }   
  return (
    <div>
      <Spin loading={loading} />
      <FormWrapper
        multiple={true}
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        reset={true}
        dynamicLayout={true}
        onChange={formChangeHandler}
      />
    </div>
  );
};

export default Create;
