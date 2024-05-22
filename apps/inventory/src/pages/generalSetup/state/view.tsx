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
    getDocTypes('Inventory State',false,'htssuite').then((items) => {
      setcolumns(items);
    });
    getTableData('inventory_state', 'inventory_general_setup',"htsinventory").then((items) => {
     {
        {
          const newItem = items.map((item: any) => {
            if (item.country) {
              item.country =
                item.country.country_name;
            }
            return item;
          });
          setdata(newItem);
        }
      }
      setloading(false);
    });
  }, []);

  return (
    <div>
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-state" />
    </div>
  );
};

export default View;
