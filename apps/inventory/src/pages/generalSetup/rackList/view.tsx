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
    getDocTypes('Rack List', false, 'htssuite').then((items) => {
      // let newData = items.filter((item: any) => {
      //   const reqfields = [
      //     'supplier',
      //     'location_name',
      //     'city',
      //     'gst_no',
      //     'pan_no',
      //     'active',
      //     'action',
      //   ];
      //   if (reqfields.includes(item.dataIndex)) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // });

      setcolumns(items);
    });
    getTableData(
      'rack_list',
      'inventory_product_configuration',
      'htsinventory'
    ).then((items) => {
      const dat: any = [];
      items.map((e: any) => {
        dat.push({
          ...e,
          supplier: e?.supplier?.supplier_name,
          state: e?.state?.state_name,
        });
      });
      setdata(dat);
      setloading(false);
    });
  }, []);

  return (
    <div>
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-racks" />
    </div>
  );
};

export default View;
