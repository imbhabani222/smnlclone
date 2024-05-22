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
    getDocTypes('Inventory Product Used For',false,'htssuite').then((items) =>{
        setcolumns(items)
    });
    getTableData('inventory_product_used_for','inventory_product_configuration','htsinventory').then((items) => {
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
        editUrl="/edit-product-used-for"
        
      />
    </div>
  );
};

export default View;
