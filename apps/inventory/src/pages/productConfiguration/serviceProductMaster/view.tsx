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
    getDocTypes('Inventory Service Product Master', false, 'htssuite').then(
      (items) => {
        let newData = items.filter((item: any) => {
          const reqfields = [
            'product_no',
            'product_name',
            'oem_part_no',
            'uom',
            'product_type',
            'part_class',
            'hsn_code',
            'active',
            'action',
          ];
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
      'inventory_service_product_master',
      'inventory_product_configuration',
      'htsinventory'
    ).then((items) => {
      const dat: any = [];
      items.map((e: any) => {
        dat.push({
          ...e,
          uom: e?.uom?.uom_name,
        });
      });
      setdata(dat);
      setloading(false);
    });
  }, []);

  return (
    <div>
      <Spin loading={loading} />
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-service-product-master"
      />
    </div>
  );
};

export default View;
