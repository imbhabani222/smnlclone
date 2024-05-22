import React, { useEffect, useState } from 'react';
import {
  getFields,
  getRecordById,
  createRecord,
  updateRecord,
} from '../../../../../../../libs/common/api/doctype';
import { Form } from 'antd';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';
import Message from '../../../../../../../libs/common/ui/Message/message';
import { CustomiseData } from '../../../../../../../libs/common/ui/Form/FormHelper';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setFormData } from '../../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import SpinLoader from '../../../../../../../libs/common/ui/Loader/spinLoader';

type Props = { doc_id: string | null; switchToNextTab?: any; url?: string };

const Create = (props: Props) => {
  const { doc_id, switchToNextTab = () => {} } = props;
  const [form] = Form.useForm();
  const [formData, setformData] = useState([]);
  const [formValues, setFormValues] = useState<any>({});
  const [sameAddress, setsameAddress] = useState(true);
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    getFields('Address details', 'htssuite').then((items: any) => {
      const newData = CustomiseData(items, { addCheckboxColSpan: true });
      setformData(newData);
      setLoading(false)
      const data: any = setFormData(newData);
      (!doc_id || !id) && setFormValues(data);
    });
    if (doc_id || id) {
      setLoading(true)
      const data = { name: doc_id || id };
      getRecordById(
        'address_details',
        data,
        'employee_management',
        'htssuite'
      ).then((items) => {
        setDoc(items?.[0]?.name);
        setFormValues(items?.[0]);
        setLoading(false)
      });
    }
  }, [doc_id || id]);

  const handleFinish = (values: any) => {
    if ((doc_id || id) && doc) {
      setLoading(true)
      const record = {
        doc_id: doc,
        data: {
          ...values,
          emp_code: doc_id || id,
        },
      };
      updateRecord(
        'address_details',
        record,
        'employee_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/document-details');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    } else {
      setLoading(true)
      const record = {
        ...values,
        emp_code: doc_id || id,
      };
      createRecord(
        'address_details',
        record,
        'employee_management',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/document-details');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    }
  };
  // const handleQuit = () => {
  //   setTimeout(() => {
  //     switchToNextTab('/document-details');
  //   }, 1000);
  // };

  const handleChange = (e: any) => {
    setsameAddress(e?.target?.checked);
  };

  // const handleFormValue = (e: any, i: boolean) => {
  //   console.log(e);
  //   if (i) {
  //     const sameValues = e.getFieldsValue([
  //       'permanent_address_line_1',
  //       'permanent_address_line_2',
  //       'permanent_city',
  //       'permanent_state',
  //       'permanent_country',
  //       'permanent_pin_code',
  //     ]);
  //     e.setFieldsValue({
  //       address_line_1: sameValues?.permanent_address_line_1,
  //       address_line_2: sameValues?.permanent_address_line_2,
  //       city: sameValues?.permanent_city,
  //       state: sameValues?.permanent_state,
  //       country: sameValues?.permanent_country,
  //       pin_code: sameValues?.permanent_pin_code,
  //     });
  //   } else {
  //     e.setFieldsValue({
  //       address_line_1: null,
  //       address_line_2: null,
  //       city: null,
  //       state: null,
  //       country: null,
  //       pin_code: null,
  //     });
  //   }
  // };
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
        multiple={true}
        removeEmployeeCode={true}
        // onChange={handleChange}
        sameAddress={sameAddress}
        dynamicLayout
        handleCancel={handleCancel}
        // handleFormValue={handleFormValue}
      />
    </>
  );
};

export default Create;
