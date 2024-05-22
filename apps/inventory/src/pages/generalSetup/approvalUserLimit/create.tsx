import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype'; 
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    grade_name: '',
    active: false,
  });

  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Inventory Approval User Limit', 'htssuite').then((items) => {
      setformData(items);
      const data = setFormData(items);
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById('inventory_approval_user_limit', data, 'inventory_general_setup', 'htsinventory').then((items) =>
        setformValue({
         ...items,
          active: items?.active === 1 ? true : false,
        })
      );
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
      updateRecord('inventory_approval_user_limit', record, 'inventory_general_setup', 'htsinventory').then(
        (items: any) => {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-inventory-approval-user-limit');
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      );
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };
      createRecord('inventory_approval_user_limit', record, 'inventory_general_setup', 'htsinventory').then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-inventory-approval-user-limit');
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
        multiple={true}
      />
    </div>
  );
};

export default Create;
