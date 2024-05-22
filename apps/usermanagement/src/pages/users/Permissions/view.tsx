import React, { useEffect, useState } from 'react';
import {
  getPermissions,
  getPermissionsByRoles,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

const columns = [
  {
    title: 'Name',
    dataIndex: 'role_name',
    key: 'role_name',
  },
  {
    title: 'Status',
    dataIndex: 'disabled',
    key: 'disabled',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];
const ViewPermissions = () => {
  // const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    getPermissions('htssuite').then((items) => console.log(items));
  }, []);

  return (
    <div>
      <Table column={columns} dataSource={data} editUrl="/edit-permissions" />
    </div>
  );
};

export default ViewPermissions;
