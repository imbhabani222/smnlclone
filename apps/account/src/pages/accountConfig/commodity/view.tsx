import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
type Props = {};
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';




const View = (props: Props) => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getDocTypes('Inventory Commodity',false,'htssuite').then((items) => {
      setcolumns(items);
    });
    getTableData('inventory_commodity', 'inventory_account_configuration',"htsaccount").then((items) => {
      setdata(items);
      setloading(false);
    });
  }, []);

  return (
    <>
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-commodity" />
    </>
  );
};

export default View;
