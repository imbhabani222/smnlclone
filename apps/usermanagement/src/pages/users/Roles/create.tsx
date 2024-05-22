import { useEffect, useState } from 'react';
import {
  getFields,
  createRoles,
  getRolesById,
  updateRecord,
  createRecord,
  getRecordById,
  updateRoles,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { isSuccess } from '../../../../../../libs/common/ui/Message';

import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';

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
  {
    datatype: 'Break',
    label: 'Allow HRMS Modules',
    name: '',
    options: undefined,
    description: {
      colSpan: 24,
    },
  },
  {
    datatype: 'Check',
    label: 'Master Data',
    name: 'hrmsmasterdata',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Employee Management',
    name: 'hrmsemployeemanagement',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Leave Management',
    name: 'hrmsleavemanagement',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Payroll Configurations',
    name: 'hrmspayrollconfigurations',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Payroll Processing',
    name: 'hrmspayrollprocessing',
    options: undefined,
  },

  {
    datatype: 'Check',
    label: 'Expense',
    name: 'hrmsexpense',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Assets Management',
    name: 'hrmsassetsmanagement',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Travel Requisition',
    name: 'hrmstravelrequisition',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Utility',
    name: 'hrmsutility',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'MIS Reports',
    name: 'hrmsmisreports',
    options: undefined,
  },
  {
    datatype: 'Break',
    label: 'Allow Inventory Modules',
    name: '',
    options: undefined,
    description: {
      colSpan: 24,
    },
  },
  {
    datatype: 'Check',
    label: 'General Setup',
    name: 'inventorygeneralsetup',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Product Configuration',
    name: 'inventoryproductconfiguration',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Purchase Management',
    name: 'inventorypurchasemanagement',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Inventory Management',
    name: 'inventoryinventorymanagement',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Workshop Management',
    name: 'inventoryworkshopmanagement',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Fuel Management',
    name: 'inventoryfuelmanagement',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'MIS Report',
    name: 'inventorymisreport',
    options: undefined,
  },
  {
    datatype: 'Break',
    label: 'Allow Account Modules',
    name: '',
    options: undefined,
    description: {
      colSpan: 24,
    },
  },
  {
    datatype: 'Check',
    label: 'Account Configuration',
    name: 'accountaccountconfiguration',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Account Voucher',
    name: 'accountaccountvoucher',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Account Management',
    name: 'accountaccountmanagement',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Account Report',
    name: 'accountaccountreport',
    options: undefined,
  },
  {
    datatype: 'Break',
    label: 'Allow Operation Modules',
    name: '',
    options: undefined,
    description: {
      colSpan: 24,
    },
  },
  {
    datatype: 'Check',
    label: 'Master Data',
    name: 'opeartionmasterdata',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Tasks',
    name: 'opeartiontasks',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Driver Allocation',
    name: 'opeartiondriverallocation',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Task Progress',
    name: 'opeartiontaskprogress',
    options: undefined,
  },
  {
    datatype: 'Check',
    label: 'Reports',
    name: 'opeartionreports',
    options: undefined,
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
      getRolesById(data, 'htssuite').then((items) => {
        const datar = { roleid: term };
        getRecordById('modules', datar, 'master_data', 'htssuite').then(
          (item) => {
            const allowmodules: any = {};
            item.modules?.[0]?.hrms?.map((e: any) => {
              allowmodules[e] = true;
            });

            item.modules?.[0]?.inventory?.map((e: any) => {
              allowmodules[e] = true;
            });

            item.modules?.[0]?.account?.map((e: any) => {
              allowmodules[e] = true;
            });

            item.modules?.[0]?.opeartion?.map((e: any) => {
              allowmodules[e] = true;
            });

            setformValue({
              role_name: items?.role_name,
              ...allowmodules,
            });
          }
        );
      });
    }
  }, [term]);

  const handleFinish = (e: any) => {
    if (term) {
      const hrmsModules: any = [];
      const inventoryModules: any = [];
      const accountModules: any = [];
      const operationModules: any = [];

      // const record = {
      //   doc_id: term,
      //   ...e,
      // };

      Object.keys(e).map((item, i) => {
        console.log(e, item, i);
        if (e[item] === true && item.includes('hrms')) {
          hrmsModules.push(item);
        } else if (e[item] === true && item.includes('inventory')) {
          inventoryModules.push(item);
        } else if (e[item] === true && item.includes('account')) {
          accountModules.push(item);
        } else if (e[item] === true && item.includes('opeartion')) {
          operationModules.push(item);
        }
      });
      const data = {
        roleid: term,
        data: {
          modules: [
            {
              hrms: hrmsModules,
              inventory: inventoryModules,
              account: accountModules,
              opeartion: operationModules,
            },
          ],
        },
      };
      updateRecord('modules', data, 'master_data', 'htssuite').then(
        (items: any) => {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-roles');
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
        desk_access: true,
      };

      const allowModules: any = [];

      Object.keys(record).map((item, i) => {
        if (record[item] === true) {
          allowModules.push(item);
        }
      });
      console.log(allowModules, 'sklfjsdk');

      createRoles(record, 'htssuite').then((items) => {
        console.log(items);
        if (items?.status === 200) {
          console.log(items?.data?.id);
          const data = {
            role_id: items?.data?.id,
            modules: [
              {
                hrms: allowModules,
              },
            ],
          };
          createRecord('modules', data, 'master_data', 'htssuite').then(
            (items) => {
              console.log(items);
              if (items?.status === 200) {
                isSuccess(items?.message, 'success');
                navigate('/view-roles');
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

          isSuccess(items?.message, 'success');
          navigate('/view-roles');
        } else {
          isSuccess(
            `${items?.error?.fieldname
              .toString()
              ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
            'error'
          );
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
        dynamicLayout
      />
    </>
  );
};

export default Create;
