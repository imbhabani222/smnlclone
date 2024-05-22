import React, { useEffect, useState } from 'react';
import {
  getFields,
  getRecordById,
  createRecord,
  updateRecord,
} from '../../../../../../../libs/common/api/doctype';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';
import Message from '../../../../../../../libs/common/ui/Message/message';
import { CustomiseData } from '../../../../../../../libs/common/ui/Form/FormHelper';

import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  setFormData,
  dependOnData,
  dateFormat,
  datetoFrom,
} from '../../../../../../../libs/common/utils/common';
import SpinLoader from '../../../../../../../libs/common/ui/Loader/spinLoader';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';

type Props = { doc_id: string | null; switchToNextTab?: any; url?: string };

const Create = (props: Props) => {
  const { doc_id, switchToNextTab = () => {} } = props;
  const [formData, setformData] = useState([]);
  const [dependData, setdependData] = useState<any>([]);
  const [formValues, setFormValues] = useState<any>({});
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false)
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    setLoading(true)
    getFields('Other details', 'htssuite').then((items: any) => {
      const newData = CustomiseData(items, { addCheckboxColSpan: true });
      newData.forEach((item: any) => {
        if (item.datatype === 'Date') {
          item.options = 'future';
        }
      });
      setformData(newData);
      setLoading(false)
      const data: any = setFormData(newData);
      !doc_id && setFormValues(data);
    });

    if (doc_id || id) {
      setLoading(true)
      const data = { name: doc_id || id };
      getRecordById(
        'other_details',
        data,
        'employee_management',
        'htssuite'
      ).then((items) => {
        const item = items?.[0];
        setDoc(item?.name);
        setLoading(false)
        if (item?.emp_code) {
          const da = {
            ...item,
            valid_upto: datetoFrom(item?.valid_upto),
            validity_upto: datetoFrom(item?.validity_upto),
            passport_available: item?.passport_available === 1 ? true : false,
            driver_license_available:
              item?.driver_license_available === 1 ? true : false,
          };

          setFormValues(da);
          const dpData: any = [];
          if (da?.passport_available) {
            dpData.push('passport_available');
          }
          if (da?.driver_license_available) {
            dpData.push('driver_license_available');
          }

          setdependData(dpData);
        }
      });
    }
  }, [doc_id || id]);

  const handleFinish = (values: any) => {
    if ((doc_id || id) && doc) {
      setLoading(true)
      const record = {
        doc_id: doc,
        data: {
          emp_code: doc_id || id,
          ...values,
          valid_upto: dateFormat(values?.valid_upto),
          validity_upto: dateFormat(values?.validity_upto),
          passport_available: values?.passport_available ? 1 : 0,
          driver_license_available: values?.driver_license_available ? 1 : 0,
        },
      };
      updateRecord(
        'other_details',
        record,
        'employee_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/family-details');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    } else {
      setLoading(true)
      const record = {
        emp_code: doc_id || id,
        ...values,
        valid_upto: dateFormat(values?.valid_upto),
        validity_upto: dateFormat(values?.validity_upto),
        passport_available: values?.passport_available ? 1 : 0,
        driver_license_available: values?.driver_license_available ? 1 : 0,
      };
      createRecord(
        'other_details',
        record,
        'employee_management',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/family-details');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    }
  };

  const handleChange = (val: any, name: any, e: any) => {
    const data: any = dependOnData(e, dependData);
    setdependData(data);
  };
  const handleCancel = () => {
    navigate('/view-employee-details');
  };
  return (
    <>
    <SpinLoader loading={loading}/>
      <FormWrapper
        formData={formData}
        formValue={formValues}
        handleFinish={handleFinish}
        submitButtonLabel="Save & Continue"
        removeEmployeeCode={true}
        onChange={handleChange}
        dependsData={dependData}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default Create;
