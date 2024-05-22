import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {
  setFormData,
  dependOnData,
} from '../../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState<any>({
    originalformData: [],
    dependsdata: [],
  });
  const [formValue, setformValue] = useState({
    leavecode: '',
    leavename: '',
    applicableto: '',
    visible: false,
    active: false,
  });
  const [dependData, setdependData] = useState<any>([]);

  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');
  

  useEffect(() => {
    getFields('Leave Type Master', 'htssuite').then((items) => {
      setformData({
        originalformData: items,
        dependsdata: items,
      });
      const data = setFormData(items);
      if (term) {
        setformData((pre: any) => {
          let depdata = [...pre?.dependsdata];
          depdata = depdata?.map((item: any) => {
            if (item?.name === 'leave_code' || item?.name === 'leave_name') {
              return { ...item, disabled: true };
            } else {
              return { ...item };
            }
          });
          return { ...pre, dependsdata: depdata };
        });
      }
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById('leave_type_master', data, 'master_data', 'htssuite').then(
        (items) => {
          setformValue({
            ...items,
            carry_forward: items.carry_forward === 1 ? true : false,
            active: items?.active === 1 ? true : false,
          });
          items?.carry_forward
            ? setdependData(['carry_forward'])
            : setdependData([]);
        }
      );
      //@ts-ignore
    }
  }, [term]);
  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        doc_id: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
          visible: e.visible ? 1 : 0,
        },
      };
      updateRecord('leave_type_master', record, 'master_data', 'htssuite').then(
        (items: any) => {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-leave-type-master');
          } else {
            isSuccess(
              `${items?.error?.fieldname
                .toString()
                ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
              'error'
            );
          }
        }
      );
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };
      createRecord('leave_type_master', record, 'master_data', 'htssuite').then(
        (items) => {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-leave-type-master');
          } else {
            isSuccess(
              `${record?.leave_name
                .toString()
                ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
              'error'
            );
          }
        }
      );
    }
  };

  const handleChange = (val: any, name: any, e: any) => {
    const data: any = dependOnData(e, dependData);
    setdependData(data);
  };
  return (
    <>
      <FormWrapper
        formValue={formValue}
        formData={formData?.dependsdata}
        handleFinish={handleFinish}
        dependsData={dependData}
        dynamicLayout
        onChange={handleChange}
      />
    </>
  );
};

export default Create;
