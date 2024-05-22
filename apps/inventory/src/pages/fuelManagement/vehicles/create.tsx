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
import {
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';
type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>({
    grade_name: '',
    active: true,
  });
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });
  const [searchParams, _] = useSearchParams();

  const term = searchParams.get('id');
  useEffect(() => {
    getFields('Vehicles', 'htssuite').then((items) => {
      items.forEach((item: any) => {
        if (item.name === 'purchase_date') {
          item.options = 'past';
        }
      });
      setformData(items);
    });
    if (term) {
      const data = { name: term };
      getRecordById('vehicles', data, 'fuel_management', 'htsinventory').then(
        (items) => {
          setformValue({
            ...items,
            purchase_date: datetoFrom(items?.purchase_date),
            active: items?.active === 1 ? true : false,
          });
        }
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
          purchase_date: dateFormat(e?.purchase_date),
        },
      };

      updateRecord('vehicles', record, 'fuel_management', 'htsinventory').then(
        (items: any) => {
          {
            if (items?.status === 200) {
              isSuccess(items?.message, 'success');
              navigate('/view-vehicles');
            } else {
              isSuccess(items?.message, 'error');
            }
          }
        }
      );
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
        purchase_date: dateFormat(e?.purchase_date),
      };

      createRecord('vehicles', record, 'fuel_management', 'htsinventory').then(
        (items) => {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-vehicles');
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      );
    }
  };

  const formChangeHandler = (val: any, fieldName: any) => {
    if (fieldName === 'own_hire_lease' && val === 'Own') {
      console.log('aitoslkfjd');
      setformValue({
        ...formValue,
        hire_lease_company: null,
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
        dynamicLayout
        onChange={formChangeHandler}
      />
    </div>
  );
};

export default Create;
