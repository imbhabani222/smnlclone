import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getRoles,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

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
];
const ViewRoles = () => {
  // const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    getRoles('htssuite').then((items) => {
      setdata(items);
      setloading(false);
    });
  }, []);

  return (
    <div>
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-roles" />
    </div>
  );
};

export default ViewRoles;
