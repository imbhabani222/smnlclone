import { useEffect, useState } from 'react';
import {
  getFields,
  createRoles,
  getRolesById,
  updateRecord,
} from '../../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';

import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';

const fileds = [
  {
    datatype: 'Data',
    label: 'Role Name',
    name: 'role_name',
    options: undefined,
    isReq: true,
    description: {
      type: 'charandintegerandspace',
      min: '2',
    },
  },
];
const Create = () => {
  const navigate = useNavigate();
  // const [formData, setformData] = useState(fileds);
  const [formValue, setformValue] = useState({
    role_name: '',
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
    if (term) {
      const data = { name: term };
      getRolesById(data, 'htssuite').then((items) =>
        setformValue({
          role_name: items?.role_name,
        })
      );
    }
  }, [term]);

  const handleFinish = (e: any) => {
    if (term) {
    } else {
      const record = {
        ...e,
        desk_access: true,
      };
      createRoles(record, 'htssuite').then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-roles');
        } else {
          isSuccess(`${items?.error?.fieldname.toString()?.replace("_", "")} ${items?.error?.Entry.toLowerCase()}`, 'error');
        }
      });
    }
  };

  return (
    <>
      <FormWrapper
        formValue={formValue}
        formData={fileds}
        handleFinish={handleFinish}
      />
    </>
  );
};

export default Create;
