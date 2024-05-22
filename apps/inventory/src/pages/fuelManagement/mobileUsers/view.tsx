import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

type Props = {};

const View = (props: Props) => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => { 
    getDocTypes('Mobile Users', false, 'htssuite').then((items) => {
      //   let newData = items.filter((item:any)=>{
      //     const reqfields = [
      //         'godown_name',
      //         'location',
      //         'address_1',
      //         'address_2',
      //         'city',
      //         'pin_code',
      //         'mobile_no',
      //         'phone_no',
      //         'active',
      //         'action'
      //     ]
      //     if (reqfields.includes(item.dataIndex)) {
      //         return true
      //     } else {
      //         return false
      //     }
      // })
      setcolumns(items);
    });

    getTableData(
      'mobile_users',
      'fuel_management',
      'htsinventory'
    ).then((items) => {
      setdata(items);
      setloading(false);
    });
  }, []);

  return (
    <div>
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-mobile-users" />
    </div>
  );
};

export default View;
