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
    getDocTypes('Department Type', false, 'htssuite').then((items) =>{
    console.log("columns",items)
      setcolumns(items)
    }
    );
    // getFields('Movement Type', 'htsoperation').then((items) =>
    //   setcolumns(items)
    // );
    getTableData(
      'department_type',
      'operations_master_data',
      'htsoperation'
    ).then((items) => {
      console.log("items", items)
      setdata(items);
      //setloading(false);
    });
  }, []);

  return (
    <div>
      {/* <Filter /> */}
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-department" />
    </div>
  );
};

export default ViewState;
