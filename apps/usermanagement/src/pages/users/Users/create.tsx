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
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';

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
  //   label: 'User Id',
  //   name: 'user_id',
  //   options: undefined,
  //   isReq: true,
  // },
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
    datatype: 'Break',
    label: 'Allow Apps',
    name: '',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'HRMS',
    name: 'hrms',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Inventory',
    name: 'inventory',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Accounts',
    name: 'accounts',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Opeartion',
    name: 'operation',
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
  //   label: 'User Id',
  //   name: 'user_id',
  //   options: undefined,
  // },
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
    datatype: 'Break',
    label: 'Allow Apps',
    name: '',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'HRMS',
    name: 'hrms',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Inventory',
    name: 'inventory',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Accounts',
    name: 'accounts',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Opeartion',
    name: 'operation',
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
      const data = { name: term };

      // getAllModules('htssuite').then((items) => {
      //   const newFormData: any = [];
      //   items.map((e: any) => {
      //     newFormData.push({
      //       datatype: 'Check',
      //       label: e,
      //       name: e,
      //       options: undefined,
      //     });
      //   });
      //   const fData = [...editFields, ...newFormData];
      //   setformData(fData);

      //   getBlockedModulesFormUser(term, 'htssuite').then((e: any) => {
      //     if (e && e?.length > 0) {
      //       const newformValues: any = {};
      //       items.map((d: any) => {
      //         const fd = e?.find((i: any) => i === d);
      //         if (fd) {
      //           newformValues[d] = 0;
      //         } else {
      //           newformValues[d] = true;
      //         }
      //       });

      getUsersById(data, 'htssuite').then((items) => {
        const allowModule: any = [];
        console.log(items);
        const apps = items?.user_belongs_to;
        console.log(apps[0]);
        // Object.entries(apps).map(([key, value], i) =>
        //   (key === 'hrms' ||
        //     key === 'inventory' ||
        //     key === 'accounts' ||
        //     key === 'operation') &&
        //   value === true
        //     ? allowModule.push(key)
        //     : null
        // );
        // console.log(apps);
        const forms = {
          role_name: items?.roles?.[0]?.role,
          user_id: items?.userid,
          active: items?.enabled === 1,
          username: items?.username,
          employee_name: items?.name,
          email: items?.name,
          first_name: items?.first_name,
          last_name: items?.last_name,
          hrms: items?.user_belongs_to?.includes('hrms'),
          inventory: items?.user_belongs_to?.includes('inventory'),
          accounts: items?.user_belongs_to?.includes('accounts'),
          operation: items?.user_belongs_to?.includes('operation'),
        };

        setformValue(forms);
      });
      //     } else {
      //       const newformValues: any = {};
      //       items.map((d: any) => {
      //         const fd = e?.find((i: any) => i === d);
      //         if (fd) {
      //           newformValues[d] = 0;
      //         } else {
      //           newformValues[d] = true;
      //         }
      //       });

      //       getUsersById(data, 'htssuite').then((items) => {
      //         const forms = {
      //           ...items,
      //           role_name: items?.roles?.[0]?.role,
      //           user_id: items?.userid,

      //           active: items?.enabled === 1,
      //           username: items?.username,
      //           ...newformValues,
      //         };
      //         setformValue(forms);
      //       });
      //     }
      //   });
      // });
    } else {
      // getAllModules('htssuite').then((items) => {
      //   const newFormData: any = [];
      //   items.map((e: any) => {
      //     newFormData.push({
      //       datatype: 'Check',
      //       label: e,
      //       name: e,
      //       options: undefined,
      //     });
      //   });
      //   const fData = [...formData, ...newFormData];
      //   setformData(fData);
      // });
    }
  }, [term]);

  const handleFinish = (e: any) => {
    const data = {
      name: e?.employee_name,
    };
    console.log(e, formValue);

    if (term) {
      const allowModule: any = [];
      Object.entries(e).map(([key, value], i) =>
        (key === 'hrms' ||
          key === 'inventory' ||
          key === 'accounts' ||
          key === 'operation') &&
        value === true
          ? allowModule.push(key)
          : null
      );
      const record = {
        doc: {
          username: e?.username,
          password: e?.password,
          email: e?.employee_name,
          role: e?.role_name,
          userid: e?.employee_name,
          first_name: formValue?.first_name,
          last_name: formValue?.last_name,
          user_belongs_to: JSON.stringify(allowModule),
        },
      };
      updateUsers(record, 'htssuite').then((items: any) => {
        if (items?.status === 200) {
          isSuccess('Successfully added', 'success');
          navigate('/view-users');
        } else {
          isSuccess(
            `${items?.error?.fieldname
              .toString()
              ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
            'error'
          );
        }
      });
    } else {
      getEmployeeById(data, 'htssuite').then((empId) => {
        if (empId) {
          const allowModule: any = [];
          Object.entries(e).map(([key, value], i) =>
            (key === 'hrms' ||
              key === 'inventory' ||
              key === 'accounts' ||
              key === 'operation') &&
            value === true
              ? allowModule.push(key)
              : null
          );

          const record = {
            doc: {
              username: e?.username,
              first_name: empId?.first_name,
              last_name: empId?.last_name,
              password: e?.password,
              email: empId?.email,
              role: e?.role_name,
              userid: empId?.email,
              user_belongs_to: JSON.stringify(allowModule),
            },
          };

          createUsers(record, 'htssuite').then((items) => {
            console.log(items);

            if (items?.status === 200) {
              isSuccess('Successfully added', 'success');
              navigate('/view-users');
              // const allowData = {
              //   data: {
              //     userid: items?.data?.id,
              //     modules: allowModule,
              //   },
              // };
              // blockModuleToUser(allowData, 'htssuite').then((moduledata) => {
              //   console.log(moduledata);
              //   isSuccess('Successfully added', 'success');
              //   navigate('/view-users');
              // });
            } else {
              const it = JSON.parse(items);
              const message = JSON.parse(it?.[0])?.message;

              isSuccess(
                message ||
                  `${items?.error?.fieldname
                    .toString()
                    ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
                'error'
              );
            }
          });
        }
      });
    }
  };

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
