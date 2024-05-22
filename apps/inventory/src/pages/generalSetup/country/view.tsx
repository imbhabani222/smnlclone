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
    getDocTypes('Inventory Country', false, 'htssuite').then((items) => {
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
      'inventory_country',
      'inventory_general_setup',
      'htsinventory'
    ).then((items) => {
      setdata(items);
      setloading(false);
    });
  }, []);

  return (
    <div>
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-country" />
    </div>
  );
};

export default View;
