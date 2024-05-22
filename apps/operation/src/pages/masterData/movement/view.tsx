import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getFields,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Filter from '../../../../../../libs/common/ui/Filter';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

const ViewState = (props: any) => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    // setloading(true);
    getDocTypes('Movement Type', false, 'htssuite').then((items) =>
      setcolumns(items)
    );
    // getFields('Movement Type', 'hts').then((items) =>
    //   setcolumns(items)
    // );
    getTableData(
      'movement_type',
      'operations_master_data',
      'htsoperation'
    ).then((items) => {
      setdata(items);
      //setloading(false);
    });
  }, []);

  return (
    <div>
      {/* <Filter /> */}
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-movements" />
    </div>
  );
};

export default ViewState;
