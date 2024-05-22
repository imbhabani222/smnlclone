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
    getDocTypes('Inventory Category Master', false, 'htssuite').then(
      (items) => {
        let newData = items.filter((item: any) => {
          const reqfields = ['category_name', 'active', 'action'];
          if (reqfields.includes(item.dataIndex)) {
            return true;
          } else {
            return false;
          }
        });
        setcolumns(newData);
      }
    );
    getTableData(
      'inventory_category_master',
      'inventory_product_configuration',
      'htsinventory'
    ).then((items) => {
      setdata(items);
      setloading(false);
    });
  }, []);

  return (
    <div>
      <Spin loading={loading} />
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-category-master"
      />
    </div>
  );
};

export default View;
