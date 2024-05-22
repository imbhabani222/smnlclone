import React, { useState, useEffect } from 'react';
import {
  getFields,
  getTableData,
} from '../../../../../../../libs/common/api/doctype';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';
import style from './companydetails.module.scss';
import { useNavigate } from 'react-router-dom';
import Spin from '../../../../../../../libs/common/ui/Loader/spinLoader';

type Props = {};

const View = (props: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>([]);
  const [formValue, setFormValue] = useState<any>({});
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    getFields('Company Setup', 'htssuite').then((items:any) => {      
      items?.pop()
      setFormData(items)
    }
      );
    getTableData('company_setup', 'master_data', 'htssuite').then((items) => {
      const data = items[0];
      if (data) {
        setFormValue(data);
        setloading(false);
      } else {
        // setloading(true)
        navigate('/create-company-details');
      }
    });
    // setloading(false)
  }, []);
  const handleFinish = () => {};
  return (
    <div className={style.view}>
      <Spin loading={loading} />
      <FormWrapper
        formData={formData}
        formValue={formValue}
        handleFinish={handleFinish}
        multiple={true}
        mode="view"
        dynamicLayout
      />
    </div>
  );
};

export default View;
