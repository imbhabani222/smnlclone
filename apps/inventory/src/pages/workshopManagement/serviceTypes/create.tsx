import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({ grade_name: '', active: false });
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });
  const [searchParams, _] = useSearchParams();

  const term = searchParams.get('id');
  useEffect(() => {
    getFields('Inventory Service Type Master', 'htssuite').then((items) =>
      setformData(items)
    );
    if (term) {
      const data = { name: term };
      getRecordById(
        'inventory_service_type_master',
        data,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items) => {
        setformValue({
          ...items,
          active: items?.active === 1 ? true : false,
        });
      });
    }
  }, [term]);

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
        },
      };

      updateRecord(
        'inventory_service_type_master',
        record,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items: any) => {
        {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-service-types');
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };

      createRecord(
        'inventory_service_type_master',
        record,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-service-types');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  return (
    <div>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
      />
    </div>
  );
};

export default Create;
