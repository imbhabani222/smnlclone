import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import {
  dateFormat,
  datetoFrom,
  dateTime,
  datetoTime,
  datetoTimeNew
} from '../../../../../../libs/common/utils/common';

type Props = {
  doc_id: any;
  setDoc_id: any;
  switchToNextTab?: any;
  url?: string;
};

const CreateGate = (props: any) => {
  const { doc_id, setDoc_id, switchToNextTab = () => {} } = props;
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({ gate_pass: {},products:[] });

  let [searchParams, setSearchParams] = useSearchParams();
  const mainId = searchParams.get('id') || '';
  const grnId = searchParams.get('grn') || '';
  const supId = searchParams.get('supId') || '';

  

  useEffect(() => {
    if (mainId) {
      getFields('Invoice Gate Pass', 'htssuite').then((items) =>
      setformData(items)
    );

      const data = { name: mainId };
      getRecordById(
        'purchase_invoice',
        data,
        'account_management',
        'htsaccount'
      ).then((items) => {
        console.log(items,"itemss");
        const gate :any = items?.gate_pass?.map((gt:any)=>({
          ...gt
        }))
        const product = items?.products?.map((item:any)=>({
          ...item,
          products: item?.products?.name
        }))
        
        
        setformValue({
          ...items,
          products : product,
          gate_pass : {
             ...gate[0],
             gate_pass_date: gate[0]?.gate_pass_date ? "" : datetoFrom(gate[0]?.gate_pass_date),
             gate_pass_time: Object.is(gate[0]?.gate_pass_time,null) ? "" : datetoTimeNew(gate[0]?.gate_pass_time),
             lr_date: gate[0]?.lr_date ? ""  : datetoFrom(gate[0]?.lr_date)
          }
            
        });
      });
    }
    
    
  }, [mainId]);

  console.log(formValue?.gate_pass,"formbhdhd");
  

  const handleFinish = (e: any) => {    
   
      const record = {
        name: mainId,
        data: {
          products: formValue?.products,
          gate_pass:[
           { ...e,
            gate_pass_date: dateFormat(e?.gate_pass_date),
            gate_pass_time: datetoTime(e?.gate_pass_time) || null,
            lr_date: dateFormat(e?.lr_date),}
          ]
          
        },
      };  
      console.log(record,"recordd");
          

      updateRecord(
        'purchase_invoice',
        record,
        'account_management',
        'htsaccount'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/view-purchase-invoice');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
    
  

 

  
  return (
    <div>
      <FormWrapper
        formValue={formValue?.gate_pass}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsaccount"
        dynamicLayout
      />
    </div>
  );
};

export default CreateGate;
