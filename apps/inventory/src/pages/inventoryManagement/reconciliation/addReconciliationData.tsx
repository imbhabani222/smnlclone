import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  getFields,
  createRecord,
  getRecordById,
} from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { dateFormat, datetoFrom } from '../../../../../../libs/common/utils/common';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';

type Props = {
  doc_id: string | null;
  setDoc_id: any;
  switchToNextTab?: any;
  url?: string;
  dataOfForm?: any;
};

const Create = (props: Props) => {
  const {
    doc_id,
    setDoc_id,
    switchToNextTab = () => {},
    dataOfForm = {},
  } = props;

  const [formData, setformData] = useState<any>([]);
  const [formValue, setformValue] = useState<any>({});
  let [searchParams] = useSearchParams();

  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Inventory Reconciliation', 'htssuite').then((items: any) => {
      const datas = [...items];
      console.log(datas, '**');
      datas.forEach((item: any) => {
        if (item.datatype === 'Date') {
          item.options = 'past';
        }
      });
      setformData(datas);
    });
    if(term) {
        const data = { name: term };
        getRecordById('inventory_reconciliation', data,'inventory_management','htsinventory').then((items:any)=>{
            setformValue({
              ...items,  
              date: datetoFrom(items?.date)
            })
        })
    }
  }, [term]);

  const handleFinish = (values: any) => {
    const payload = {
      date: dateFormat(values?.date),
      remarks: values?.remarks,
    };
    createRecord(
      'inventory_reconciliation',
      payload,
      'inventory_management',
      'htsinventory'
    ).then((items) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        switchToNextTab('/add-reconciliation-product');
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };

  const formChangeHandler = useCallback(
    (e: any, fieldName: any) => {
      console.log(e, fieldName);
    },
    [formData]
  );
  const onImageUpload = (file: any, e: any, name: any) => {
    // setformValue()
  };
  return (
    <FormWrapper
      formValue={formValue}
      formData={formData}
      handleFinish={handleFinish}
      appname="htsinventory"
      dynamicLayout
      submitButtonLabel="Save & Continue"
      onChange={formChangeHandler}
      handleImageUpload={onImageUpload}
    />
  );
};

export default Create;
