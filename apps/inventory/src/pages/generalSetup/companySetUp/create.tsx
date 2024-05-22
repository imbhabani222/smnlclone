import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    state_name: '',
    active: false,
    zone: '',
  });
  const [companyData, setCompanyData] = useState<any>([]);

  const [searchParams, _] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Inventory Company Details', 'htssuite').then((items) => {
      setformData(items);
      const data = setFormData(items);
      setformValue(data);
    });
    getTableData(
      'inventory_company_details',
      'inventory_general_setup',
      'htsinventory'
    ).then((items) => {
      console.log('hessssss', items);
      const data = items[0];
      if (data) {
        setCompanyData({
          ...items[0],
          state_name: items[0]?.state_name?.name,
          country_name: items[0]?.country_name?.name,
          billing_state: items[0]?.billing_state?.name,
          state_name_id: items[0]?.state_name?.id,
          country_name_id: items[0]?.country_name?.id,
          billing_state_id: items[0]?.billing_state?.id,
        });
      } else {
        navigate('/create-company');
      }
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'inventory_company_details',
        data,
        'inventory_general_setup',
        'htsinventory'
      ).then((items) =>
        setformValue({
          ...items,
          active: items?.active === 1 ? true : false,
        })
      );
    }
  }, [term]);

  const handleFinish = (e: any) => {
    if (companyData?.name) {
      const record = {
        name: companyData?.name,
        data: {
          ...e,
          state_name: companyData?.state_name_id,
          country_name: companyData?.country_name_id,
          billing_state: companyData?.billing_state_id,
          active: e?.active ? 1 : 0,
        },
      };
      updateRecord(
        'inventory_company_details',
        record,
        'inventory_general_setup',
        'htsinventory'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-company');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };
      createRecord(
        'inventory_company_details',
        record,
        'inventory_general_setup',
        'htsinventory'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-company');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };
  return (
    <div>
      <FormWrapper
        formValue={companyData}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        mode={location.pathname === '/view-company' ? 'view' : ''}
        dynamicLayout
      />
    </div>
  );
};

export default Create;
