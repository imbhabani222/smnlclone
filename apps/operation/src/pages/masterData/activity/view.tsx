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
    getDocTypes('Activity Type', false, 'htssuite').then((items) =>
      setcolumns(items)
    );
    // getFields('Movement Type', 'htsoperation').then((items) =>
    //   setcolumns(items)
    // );
    getTableData(
      'activity_type',
      'operations_master_data',
      'htsoperation'
    ).then((items) => {
      
      const newItems=items?.map((item:any)=>{
        return {
          ...item,
          vehicle_type_used:item.vehicle_type_used.reduce((acc:any,cur:any)=>{
            return acc+" , "+cur
          })
        }
      })
      console.log(newItems,"itemss")
      setdata(newItems);
    });
  }, []);

  return (
    <div>
      {/* <Filter /> */}
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-activity-type" />
    </div>
  );
};

export default ViewState;
