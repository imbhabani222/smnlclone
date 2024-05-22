import React, { useEffect, useState } from 'react';
import {
  getFields,
  createUsers,
  getUsersById,
  updateUsers,
  getEmployeeById,
  getAllModules,
  blockModuleToUser,
  getBlockedModulesFormUser,
} from '../../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';

const fileds = [
  {
    datatype: 'Data',
    label: 'Username',
    name: 'username',
    options: undefined,
    isReq: true,
  },
  {
    datatype: 'Link',
    label: 'Employee',
    name: 'employee_name',
    options: 'personal_details',
    description: { linkfield: 'full_name', modulename: 'employee_management' },
    isReq: true,
  },
  // {
  //   datatype: 'Data',
  //   label: 'First Name',
  //   name: 'first_name',
  //   isReq: true,
  //   options: undefined,
  // },
  // {
  //   datatype: 'Data',
  //   label: 'Last Name',
  //   name: 'last_name',
  //   isReq: true,
  //   options: undefined,
  // },
  {
    datatype: 'Data',
    label: 'User Id',
    name: 'user_id',
    options: undefined,
    isReq: true,
  },
  {
    datatype: 'Password',
    label: 'Password',
    name: 'password',
    options: undefined,
    isReq: true,
    description: { type: 'password', minlength: '8' },
  },
  {
    datatype: 'Link',
    label: 'Role',
    name: 'role_name',
    options: 'role_name',
    isReq: true,
  },
  {
    datatype: 'Column Break',
    label: '',
    name: '',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Active',
    name: 'active',
    options: undefined,
  },
  {
    datatype: 'Column Break',
    label: 'Allow Module',
    name: '',
    options: undefined,
  },
];

const editFields = [
  {
    datatype: 'Data',
    label: 'Username',
    name: 'username',
    options: undefined,
  },
  {
    datatype: 'Link',
    label: 'Employee',
    name: 'employee_name',
    options: 'personal_details',
    description: { linkfield: 'full_name', modulename: 'employee_management' },
    disabled: true,
  },
  // {
  //   datatype: 'Data',
  //   label: 'First Name',
  //   name: 'first_name',
  //   isReq: true,
  //   options: undefined,
  // },
  // {
  //   datatype: 'Data',
  //   label: 'Last Name',
  //   name: 'last_name',
  //   isReq: true,
  //   options: undefined,
  // },
  {
    datatype: 'Data',
    label: 'User Id',
    name: 'user_id',
    options: undefined,
  },
  {
    datatype: 'Link',
    label: 'Role',
    name: 'role_name',
    options: 'role_name',
    disabled: true,
  },
  {
    datatype: 'Column Break',
    label: '',
    name: '',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Active',
    name: 'active',
    options: undefined,
  },
  {
    datatype: 'Column Break',
    label: 'Allow Module',
    name: '',
    options: undefined,
  },
];
const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState(fileds);
  const [formValue, setformValue] = useState<any>({
    user_id: '',
    active: true,
    username: '',
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
      // @ts-ignore
      setformData(editFields);
      const data = { name: term, appname: 'hrms' };
      getAllModules('htssuite').then((items) => {
        const newFormData: any = [];
        items.map((e: any) => {
          newFormData.push({
            datatype: 'Check',
            label: e,
            name: e,
            options: undefined,
          });
        });
        const fData = [...editFields, ...newFormData];
        setformData(fData);

        getBlockedModulesFormUser(term, 'htssuite').then((e: any) => {
          if (e && e?.length > 0) {
            const newformValues: any = {};
            items.map((d: any) => {
              const fd = e?.find((i: any) => i === d);
              if (fd) {
                newformValues[d] = 0;
              } else {
                newformValues[d] = true;
              }
            });

            getUsersById(data, 'htssuite').then((items) => {
              const forms = {
                role_name: items?.roles?.[0]?.role,
                user_id: items?.userid,
                active: items?.enabled === 1,
                username: items?.username,
                ...newformValues,
              };
              setformValue(forms);
            });
          } else {
            const newformValues: any = {};
            items.map((d: any) => {
              const fd = e?.find((i: any) => i === d);
              if (fd) {
                newformValues[d] = 0;
              } else {
                newformValues[d] = true;
              }
            });

            getUsersById(data, 'htssuite').then((items) => {
              const forms = {
                ...items,
                role_name: items?.roles?.[0]?.role,
                user_id: items?.userid,

                active: items?.enabled === 1,
                username: items?.username,
                ...newformValues,
              };
              setformValue(forms);
            });
          }
        });
      });
    } else {
      getAllModules('htssuite').then((items) => {
        const newFormData: any = [];
        items.map((e: any) => {
          newFormData.push({
            datatype: 'Check',
            label: e,
            name: e,
            options: undefined,
          });
        });

        const fData = [...formData, ...newFormData];
        setformData(fData);
      });
    }
  }, [term]);

  const handleFinish = (e: any) => {
    const data = {
      name: e?.employee_name,
    };
    if (term) {
      const record = {
        doc: {
          username: e?.username,
          first_name: e?.first_name,
          last_name: e?.last_name,
          password: e?.password,
          email: e?.email,
          role: e?.role_name,
          userid: e?.user_id,
        },
      };
      updateUsers(record, 'htssuite').then((items: any) => {
        {
          isSuccess('Successfully added', 'success');
          navigate('/view-users');
        }
      });
    } else {
      getEmployeeById(data, 'htssuite').then((empId) => {
        if (empId) {
          const record = {
            doc: {
              username: e?.username,
              first_name: empId?.first_name,
              last_name: empId?.last_name,
              password: e?.password,
              email: empId?.email,
              role: e?.role_name,
              userid: e?.user_id,
              user_belongs_to: JSON.stringify(['hrms']),
            },
          };

          const allowModule: any = [];
          Object.entries(e).map(([key, value], i) =>
            value === undefined ? allowModule.push(key) : null
          );

          createUsers(record, 'htssuite').then((items) => {
            console.log(items);
            if (items?.status === 200) {
              const allowData = {
                data: {
                  userid: items?.data?.id,
                  modules: allowModule,
                },
              };
              blockModuleToUser(allowData, 'htssuite').then((moduledata) => {
                console.log(moduledata);
                isSuccess('Successfully added', 'success');
                navigate('/view-users');
              });
            } else {
              isSuccess(`${items?.error?.fieldname.toString()?.replace("_", "")} ${items?.error?.Entry.toLowerCase()}`, 'error');
            }
          });
        }
      });
    }
  };

  console.log(formData);
  return (
    <>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htssuite"
        dynamicLayout
      />
    </>
  );
};

export default Create;
