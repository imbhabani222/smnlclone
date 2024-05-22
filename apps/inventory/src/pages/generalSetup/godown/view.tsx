import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
const View = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getDocTypes('Inventory Godown',false,'htssuite').then((items) => {
      
        let newData = items.filter((item:any)=>{
            const reqfields = [
                'godown_name',
                'location',
                'city',
                'pin_code',
                'mobile_no',
                'active',
                'action',

            ]
            if (reqfields.includes(item.dataIndex)) {
                return true
            } else {
                return false
            }
        })
        setcolumns(newData)
    });
    getTableData('inventory_godown','inventory_general_setup','htsinventory').then((items) => {
      setdata(items)
      setloading(false);
    });
  }, []);

  return (
    <div>
      <Spin loading={loading} />
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-godown"
        
      />
    </div>
  );
};

export default View;


