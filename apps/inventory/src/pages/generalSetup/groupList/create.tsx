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
    getFields('Group List', 'htssuite').then((items) => setformData(items));
    if (term) {
      const data = { name: term };
      getRecordById(
        'group_list',
        data,
        'inventory_product_configuration',
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
        'group_list',
        record,
        'inventory_product_configuration',
        'htsinventory'
      ).then((items: any) => {
        {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-groups');
          } else {
            if(items?.error?.fieldName){
              isSuccess(
                `${items?.error?.fieldname
                  .toString()
                  ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
                'error'
              );
            }
            else {
              isSuccess(
                `${items?.message}`,
                'error'
              );
            }
          }
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };

      createRecord(
        'group_list',
        record,
        'inventory_product_configuration',
        'htsinventory'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-groups');
        } else {
          if(items?.error?.fieldName){
            isSuccess(
              `${items?.error?.fieldname
                .toString()
                ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
              'error'
            );
          }
          else {
            isSuccess(
              `${items?.message}`,
              'error'
            );
          }
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
