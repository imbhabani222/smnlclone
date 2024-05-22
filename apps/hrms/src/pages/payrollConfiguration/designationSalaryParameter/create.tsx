import React, { useState, useEffect } from 'react';
import {
  createRecord,
  getFields,
  getRecordById,
  //   getTableData,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useNavigate, useSearchParams } from 'react-router-dom';

const View = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [formValue, setFormValue] = useState<any>({});
  const [updateId, setUpdateId] = useState<any>({});

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const term = searchParams.get('id');

  useEffect(() => {
    setLoading(true);
    getFields('Designation Wise Salary Parameter', 'htssuite').then((field) => {
      const formFields: any = [...field];
      formFields.forEach((item: any) => {
        if (item.name === 'salary_parameters') {
          item.datatype = 'Link';
          item.options = 'salary_parameter_master';
          // item.options = [...options];
        }
      });
      setFormData(formFields);
    });
    if (term) {
      const params = { name: term };
      getRecordById(
        'designation_wise_salary_parameter',
        params,
        'payroll_configurations',
        'htssuite'
      ).then((items) => {
        setFormValue({
          ...items,
        });
      });
    }
    setLoading(false)
  }, []);

  const handleChange = (value: any, key: any) => {
    if (key !== 'salary_parameters') {
      setFormValue({ ...formValue, [key]: value });
    }
  };

  const handleFinish = (values: any) => {
    if (term) {
      const updatePayload = {
        doc_id: term,
        data: {
          designation: values?.designation?.name || values?.designation,
          grade: values?.grade?.name || values?.grade,
          salary_parameters: values?.salary_parameters,
        },
      };
      updateRecord(
        'designation_wise_salary_parameter',
        updatePayload,
        'payroll_configurations',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          navigate('/view-designation-wise-salary-parameters');
          isSuccess(items?.message, 'success');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      createRecord(
        'designation_wise_salary_parameter',
        values,
        'payroll_configurations',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          navigate('/view-designation-wise-salary-parameters');

          isSuccess(items?.message, 'success');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  return (
    <React.Fragment>
      <Spin loading={loading} />
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        onChange={handleChange}
        appname="htssuite"
        dynamicLayout
        cancelButtonLabel="Clear"
      />
    </React.Fragment>
  );
};

export default View;
