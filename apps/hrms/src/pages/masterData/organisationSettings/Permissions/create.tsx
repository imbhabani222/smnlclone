/* eslint-disable array-callback-return */
import { useState } from 'react';
import {
  createPermissions,
  getPermissionsByRoles,
  updatePermissions,
  getPermissionsDocTypes,
} from '../../../../../../../libs/common/api/doctype';

import SelectBox from '../../../../../../../libs/common/ui/SelectBox/SelectBox';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import { Checkbox, Row, Col, Table } from 'antd';
import style from './permissions.module.scss';
import SpinLoader from '../../../../../../../libs/common/ui/Loader/spinLoader';
const fileds = [
  {
    datatype: 'Link',
    label: 'Role Name',
    name: 'role_name',
    options: 'role_name',
  },
];

const Create = () => {
  const [formValue, setformValue] = useState({
    role_name: '',
  });
  const [permissionData, setPermissionData] = useState([]);
  const [roleItems, setroleItems] = useState<any>(null);
  const [loading, setLoading] = useState(false)

  const columns = [
    {
      title: 'Page',
      dataIndex: 'doctype',
      key: 'doctype',
    },
    {
      title: 'Create',
      dataIndex: 'create',
      key: 'create',
      render: (text: any, record: any) => (
        <Checkbox
          checked={record?.permissions?.create}
          onChange={(e) => handleCheck(e, 'create', record)}
        />
      ),
    },
    {
      title: 'Update',
      dataIndex: 'write',
      key: 'write',
      render: (text: any, record: any) => (
        <Checkbox
          checked={record?.permissions?.write}
          onChange={(e) => handleCheck(e, 'write', record)}
        />
      ),
    },

    {
      title: 'View',
      dataIndex: 'Read',
      key: 'Read',
      render: (text: any, record: any) => (
        <Checkbox
          checked={record?.permissions?.read}
          onChange={(e) => handleCheck(e, 'read', record)}
        />
      ),
    },
    {
      title: 'Approve',
      dataIndex: 'Amend',
      key: 'Amend',
      render: (text: any, record: any) => (
        <Checkbox
          checked={record?.permissions?.amend}
          onChange={(e) => handleCheck(e, 'amend', record)}
        />
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'Delete',
      key: 'Delete',
      render: (text: any, record: any) => (
        <Checkbox
          checked={record?.permissions?.delete}
          onChange={(e) => handleCheck(e, 'delete', record)}
        />
      ),
    },
  ];

  const getPermissions = (rols: any, role: string) => {
    setLoading(true)
    getPermissionsByRoles(rols, 'htssuite').then((items) => {
      setLoading(false)
      if (items && items?.length <= 0) {
        setroleItems(null);
        getPermissionsDocTypes('htssuite').then((perItems) => {
          const per: any = [];
          perItems?.map((e: any) =>
            per.push({
              role: role,
              permlevel: 0,
              doctype: e,
              permissions: {
                select: 0,
                read: 0,
                write: 0,
                create: 0,
                delete: 0,
                submit: 0,
                cancel: 0,
                amend: 0,
                report: 0,
                export: 0,
                import: 0,
                set_user_permissions: 0,
                share: 0,
                print: 0,
                email: 0,
              },
            })
          );

          setPermissionData(per);
        });
      } else {
        setLoading(false)
        setroleItems(items);
        const data = {
          app_name: 'htssuite',
        };

        getPermissionsDocTypes('htssuite').then((perItems) => {
          const per: any = [];
          perItems?.map((e: any) => {
            const type = items.find((x: any) => x.doctype_name === e);

            if (type) {
              per.push({
                role: role,
                permlevel: 0,
                doctype: e,
                permissions: {
                  select: type?.select || 0,
                  read: type?.read || 0,
                  write: type?.write || 0,
                  create: type?.create || 0,
                  delete: type?.delete || 0,
                  submit: type?.submit || 0,
                  cancel: type?.cancel || 0,
                  amend: type?.amend || 0,
                  report: type?.report || 0,
                  export: type?.export || 0,
                  import: type?.import || 0,
                  set_user_permissions: type?.set_user_permissions || 0,
                  share: type?.share || 0,
                  print: type?.print || 0,
                  email: type?.email || 0,
                },
              });
            } else {
              per.push({
                role: role,
                permlevel: 0,
                doctype: e,
                permissions: {
                  select: 0,
                  read: 0,
                  write: 0,
                  create: 0,
                  delete: 0,
                  submit: 0,
                  cancel: 0,
                  amend: 0,
                  report: 0,
                  export: 0,
                  import: 0,
                  set_user_permissions: 0,
                  share: 0,
                  print: 0,
                  email: 0,
                },
              });
            }
          });
          setPermissionData(per);
        });
      }
    });
  };

  const handleChange = (role: any) => {
    const rols = {
      role_name: role,
    };

    getPermissions(rols, role);
  };

  const handleCheck = (e: any, k: string, i: any) => {
    const records = {
      data: {
        ...i,
        permissions: {
          ...i?.permissions,
          [k]: e.target.checked ? 1 : 0,
        },
      },
    };
    const pers: any = [];
    permissionData?.map((d: any) => {
      if (d?.doctype === i?.doctype) {
        pers.push({
          ...i,
          permissions: {
            ...i?.permissions,
            [k]: e.target.checked ? 1 : 0,
          },
        });
      } else {
        pers.push({
          ...d,
        });
      }
    });

    setPermissionData(pers);
    const roletype = roleItems
      ? roleItems.find((e: any) => e.doctype_name === i?.doctype)
      : '';

    if (roletype && roletype?.doctype_name) {
      const records = {
        data: {
          ...i,
          permissions: {
            [k]: e.target.checked ? 1 : 0,
          },
        },
      };
      updatePermissions(records, 'htssuite').then((items) => {
        if (items?.status === 200) {
          isSuccess('Successfully added', 'success');

          const rols = {
            role_name: i?.role,
          };
          getPermissions(rols, i?.role);
        }
      });
    } else {
      createPermissions(records, 'htssuite').then((items) => {
        if (items?.status === 200) {
          isSuccess('Successfully added', 'success');
          const rols = {
            role_name: i?.role,
          };
          getPermissions(rols, i?.role);
        }
      });
    }
  };

  return (
    <div className={style.permission}>
      <div
        className={style.content}
        style={{ position: 'relative', height: '100%' }}
      >
        <Row>
          <Col lg={12}>
            <div style={{ marginBottom: '10px' }}>Select Roles</div>
            <SelectBox
              fieldData={fileds?.[0]}
              handleChange={handleChange}
              appname="htssuite"
            />
          </Col>
        </Row>
        <div style={{ marginTop: '20px' }}>
          <SpinLoader loading={loading}/>
          {permissionData && permissionData?.length > 0 ? (
            <Table columns={columns} dataSource={permissionData} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Create;
