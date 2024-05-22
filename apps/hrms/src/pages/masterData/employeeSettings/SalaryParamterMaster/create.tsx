import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { setFormData } from '../../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState<any>([]);
  const [formValue, setformValue] = useState<any>({
    active: false,
  });

  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Salary Parameter Master', 'htssuite').then((items) => {
      let addNewField: any = [];

      const Salary_Value = {
        label: 'Value',
        name: 'Salary_Value',
        datatype: 'Data',
        isReq: true,
        description: {
          type: 'float',
        },
      };
      const Salary_percentage = {
        label: 'Percentage',
        name: 'Salary_percentage',
        
        datatype: 'Int',
        isReq: true,
        hidden: 1,
        description: {
          minValue: 1,
          maxValue: 100,
          type: "percentage"
        },
      };

      addNewField = [
        ...items.slice(0, 5),
        Salary_Value,
        Salary_percentage,
        ...items.slice(5),
      ];

      setformData(addNewField);
      const data = setFormData(items);
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'salary_parameter_master',
        data,
        'master_data',
        'htssuite'
      ).then((items) =>
        setformValue({
          ...items,
          Salary_percentage: items?.percentage_value,
          Salary_Value: items?.percentage_value,
          active: items?.active === 1 ? true : false,
        })
      );
    }
  }, [term]);
  useEffect(() => {
    if (formValue) {
      if (formValue?.type === 'Percentage') {
        const formDatas = [...formData];
        formDatas.forEach((item: any) => {
          if (item.name === 'Salary_Value') {
            item.hidden = 1;
          } else if (item.name === 'Salary_percentage') {
            item.hidden = 0;
          } else if (item.name === 'percentage_of') {
            item.disabled = false;
            item.isReq = true;
          }
        });
        setformData([...formDatas]);
      } else {
        const formDatas = [...formData];
        formDatas.forEach((item: any) => {
          if (item.name === 'Salary_Value') {
            item.hidden = 0;
          } else if (item.name === 'Salary_percentage') {
            item.hidden = 1;
          } else if (item.name === 'percentage_of') {
            item.disabled = true;
          }
        });
        setformData([...formDatas]);
      }
    }
  }, [formValue]);
  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        doc_id: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
          percentage_value:
            e.type === 'Value' ? e.Salary_Value : e.Salary_percentage,
          percentage_of: e.type === 'Value' ? 'None' : e.percentage_of,
        },
      };
      updateRecord(
        'salary_parameter_master',
        record,
        'master_data',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-salary-parameter');
        } else {
          isSuccess(`${items?.error?.fieldname.toString()?.replace("_", "")} ${items?.error?.Entry.toLowerCase()}`, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
        percentage_value:
          e.type === 'Value' ? e.Salary_Value : e.Salary_percentage,
        percentage_of: e.type === 'Value' ? 'None' : e.percentage_of,
      };
      createRecord(
        'salary_parameter_master',
        record,
        'master_data',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-salary-parameter');
        } else {
          isSuccess(`${items?.error?.fieldname.toString()?.replace("_", "")} ${items?.error?.Entry.toLowerCase()}`, 'error');
        }
      });
    }
  };
  const handleChange = (value: any, key: any) => {
    if (key === 'type') {
      setformValue({ ...formValue, [key]: value });
    }
  };
  return (
    <>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        onChange={handleChange}
        dynamicLayout
      />
    </>
  );
};

export default Create;
