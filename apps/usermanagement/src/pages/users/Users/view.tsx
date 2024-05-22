import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getUsers,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

const columns = [
  {
    title: 'User Name',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Status',
    dataIndex: 'enabled',
    key: 'enabled',
  },

  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];
const ViewUsers = () => {
  // const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    getUsers('htssuite').then((items) => {
      setdata(items);
      setloading(false);
    });
  }, []);

  return (
    <div>
      {' '}
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-users" />
    </div>
  );
};

export default ViewUsers;
