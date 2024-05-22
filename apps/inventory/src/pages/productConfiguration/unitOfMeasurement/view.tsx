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
  
    getDocTypes('Inventory Unit of Measurement', false, 'htssuite').then(
      (items) => setcolumns(items)
    );
  
    getTableData(
      'inventory_unit_of_measurement',
      'inventory_product_configuration',
      'htsinventory'
    ).then((items:any) => {
      console.log(items, 'items')
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
        editUrl="/edit-unit-of-measurement"
      />
    </div>
  );
};

export default View;
