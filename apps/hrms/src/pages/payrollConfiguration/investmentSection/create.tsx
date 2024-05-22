import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import Message from '../../../../../../libs/common/ui/Message/message';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { setFormData } from '../../../../../../libs/common/utils/common';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState<any>([]);
  const [formValue, setformValue] = useState<any>({
    state_name: '',
    active: false,
    zone: '',
  });
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });

  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Investment Section', 'htssuite').then((items: any) => {
      let newData = [...items];
      newData.forEach((item) => {
        if (item.label === 'Exemption Percentage') {
          item.hidden = 1;
        }
      });
      setformData(newData);
      const data = setFormData(items);
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };

      getRecordById(
        'investment_section',
        data,
        'payroll_configurations',
        'htssuite'
      ).then((items) => {
        setformValue({
          ...items,
          active: items?.active === 1 ? true : false,
        });
      });
    }
  }, [term]);

  useEffect(() => {
    if (formValue) {
      if (formValue?.exemption_type === 'Percentage') {
        const formDatas = [...formData];
        formDatas.forEach((item: any) => {
          if (item.name === 'exemption_value') {
            item.hidden = 1;
          }
          if (item.name === 'exemption_percentage') {
            item.hidden = 0;
          }
        });
        setformData([...formDatas]);
      } else {
        const formDatas = [...formData];
        formDatas.forEach((item: any) => {
          if (item.name === 'exemption_value') {
            item.hidden = 0;
          }
          if (item.name === 'exemption_percentage') {
            item.hidden = 1;
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
          exemption_value:
            e?.exemption_type === 'Value' ? e.exemption_value : '-',
          exemption_percentage:
            e?.exemption_type === 'Percentage' ? e.exemption_percentage : '-',
          active: e?.active ? 1 : 0,
        },
      };
      updateRecord(
        'investment_section',
        record,
        'payroll_configurations',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-investment-section');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        exemption_value:
          e?.exemption_type === 'Value' ? e.exemption_value : '-',
        exemption_percentage:
          e?.exemption_type === 'Percentage' ? e.exemption_percentage : '-',
        active: e?.active ? 1 : 0,
      };
      createRecord(
        'investment_section',
        record,
        'payroll_configurations',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-investment-section');
        } else {
          isSuccess(items?._server_messages || items?.message, 'error');
        }
      });
    }
  };

  const handleChange = (value: any, key: any) => {
    if (key === 'exemption_type' && value === 'Percentage') {
      const formDatas = [...formData];
      formDatas.forEach((item: any) => {
        if (item.name === 'exemption_value') {
          item.hidden = 1;
        }
        if (item.name === 'exemption_percentage') {
          item.hidden = 0;
        }
      });
      setformData([...formDatas]);
    } else if (key === 'exemption_type' && value === 'Value') {
      const formDatas = [...formData];
      formDatas.forEach((item: any) => {
        if (item.name === 'exemption_value') {
          item.hidden = 0;
        }
        if (item.name === 'exemption_percentage') {
          item.hidden = 1;
        }
      });
      setformData([...formDatas]);
    }
  };
  return (
    <>
      <FormWrapper
        multiple={true}
        formValue={formValue}
        formData={formData}
        onChange={handleChange}
        handleFinish={handleFinish}
        dynamicLayout={true}
      />
    </>
  );
};

export default Create;
