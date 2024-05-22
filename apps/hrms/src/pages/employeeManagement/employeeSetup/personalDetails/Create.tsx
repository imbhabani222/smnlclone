import React, { useEffect, useState } from 'react';
import {
  getFields,
  getRecordById,
  createRecord,
  updateRecord,
} from '../../../../../../../libs/common/api/doctype';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';
import { useNavigate, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import {
  setFormData,
  dateFormat,
  datetoFrom,
} from '../../../../../../../libs/common/utils/common';
import SpinLoader from '../../../../../../../libs/common/ui/Loader/spinLoader';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import { CustomiseData } from '../../../../../../../libs/common/ui/Form/FormHelper';

type Props = {
  doc_id: string | null;
  setDoc_id: any;
  switchToNextTab?: any;
  url?: string;
};

const Create = (props: Props) => {
  const { doc_id, setDoc_id, switchToNextTab = () => {} } = props;
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false)
  const id = searchParams.get('id');
  const [imageData, setimageData] = useState<any>({});
  const [formData, setformData] = useState([]);
  const [formValues, setFormValues] = useState<any>({});

  useEffect(() => {
    setLoading(true)
    getFields('Personal Details', 'htssuite').then((items) => {
      let newData = CustomiseData(
        items.filter((i: any) => i.name !== 'full_name'),
        { addCheckboxColSpan: true }
      );
      newData.forEach((item: any) => {
        if(item.name === "employee_id") {
           item.hidden = id ? 0 : 1
        }
        if (item.name === 'date_of_birth') {
          item.options = 'employee_dob';
        } else if (item.name === 'employee_id') {
          item.readonly = true;
        } else if (item.name === 'wedding_date') {
          item.options = 'past';
          item.disabled = true;
        } else if (item.name === 'spouse_name') {
          item.disabled = true;
        } else if (item?.name === 'upload_photo') {          
          item.description = {
            accept: 'image/jpeg',
            fileType: 'Only .jpeg',
            type: 'image/jpeg',
          };
          
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
        'personal_details',
        data,
        'employee_management',
        'htssuite'
      ).then((items) => {
        const da = {
          ...items,
          date_of_birth: datetoFrom(items?.date_of_birth),
          wedding_date: datetoFrom(items?.wedding_date),
          employee_id: items?.name,
        };
        setFormValues(da);
        setLoading(false)
      });
    }
  }, [doc_id, id]);
  const handleFinish = (values: any) => {
    if (doc_id || id) {
      setLoading(true)
      const record = {
        doc_id: doc_id || id,
        data: {
          ...values,
          wedding_date: dateFormat(values?.wedding_date),
          date_of_birth: dateFormat(values?.date_of_birth),
          upload_photo: imageData?.originalfile || null,
          employee_id: undefined
        },
      };
      updateRecord(
        'personal_details',
        record,
        'employee_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/official-details');
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
        wedding_date: dateFormat(values?.wedding_date),
        date_of_birth: dateFormat(values?.date_of_birth),
        upload_photo: imageData?.originalfile || null,
      };
      createRecord(
        'personal_details',
        record,
        'employee_management',
        'htssuite'
      ).then((items) => {
        setDoc_id(items?.data?.id);
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/official-details');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    }
  };
  const handleImageUpload = (e: {}) => {
    setimageData(e);
  };

  useEffect(() => {
    const data = [...formData];
    const { maritial_status } = formValues;
    if (maritial_status === 'Married') {
      data.forEach((item: any) => {
        if (item.name === 'spouse_name') {
          item.disabled = false;
        }
        if (item.name === 'wedding_date') {
          item.disabled = false;
          item.options = {
            type: 'enable_only_two_custom_date',
            startDate: formValues?.date_of_birth,
            endDate: moment(new Date()),
          };
        }
      });
    } else {
      data.forEach((item: any) => {
        if (item.name === 'spouse_name') {
          item.disabled = true;
        }
        if (item.name === 'wedding_date') {
          item.disabled = true;
        }
      });
      setFormValues({
        ...formValues,
        spouse_name: undefined,
        wedding_date: undefined,
      });
    }
    setformData(data);
  }, [formValues?.maritial_status]);

  const handleChange = (value: any, key: any) => {
    setFormValues({ ...formValues, [key]: value });
  };

  return (
    <>
    <SpinLoader loading={loading}/>
      <FormWrapper
        formData={formData}
        formValue={formValues}
        handleFinish={handleFinish}
        submitButtonLabel="Save & Continue"
        handleImageUpload={handleImageUpload}
        appname="htssuite"
        dynamicLayout
        onChange={handleChange}
      />
    </>
  );
};

export default Create;
