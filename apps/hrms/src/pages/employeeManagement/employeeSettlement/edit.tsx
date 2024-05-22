import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  getFields,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import SpinLoader from '../../../../../../libs/common/ui/Loader/spinLoader';
type Props = {};
const Edit = (props: Props) => {
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [netPayable, setNetPayable ] = useState()
  const [loading, setLoading] = useState(false)
  const id = searchParams.get('id');

  useEffect(() => {
    setLoading(true)
    getFields('Final Settlement', 'htssuite').then((items) => {
      setformData(items);
      setLoading(false)
    });
    if(id){
      setLoading(true)
      const data = {
        name: id
      }
      getRecordById('final_settlement', data, 'employee_management', 'htssuite').then((items) =>{
        setformValue(items)
        setNetPayable(items?.net_payable)
        setLoading(false)
      })
    }
  }, []);

  const handleFinish = (values: any) => {
    setLoading(true)
    const payload = {
      doc_id: id,
      data: {
        ...values
      }
    }
    updateRecord('final_settlement', payload, 'employee_management', 'htssuite').then((items:any) => {
      if(items?.status === 200) {
        isSuccess(items?.message, 'success');
        navigate('/view-settlement')
        setLoading(false)
      }
      else{
        isSuccess(items?.message, 'error')
        setLoading(false)
      }
    })
  };
  
  const handleChange = (value:any, key:any) => {
    if(key === "bonus"){
    const sumofNetPayable =  Number(netPayable) + Number(value || 0);
    setformValue({...formValue, bonus: value, net_payable: sumofNetPayable})
    }
  }


  return (
    <>
    <SpinLoader loading={loading}/>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htssuite"
        dynamicLayout
        onChange={handleChange}
      />
    </>
  );
};
export default Edit;
