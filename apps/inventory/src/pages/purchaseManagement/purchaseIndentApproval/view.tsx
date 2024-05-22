import React, { useEffect, useState } from 'react';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

const View = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [loading, setloading] = useState(false);

  const getTableDetails = (filters: any = null) => {
    setloading(true)
    getTableData(
      'inventory_purchase_indent',
      'inventory_purchase_management',
      'htsinventory',
      filters
    ).then((items: any) => {
      const newitems = items?.map((e: any) => ({
        ...e,
        section: e?.section_name,
      }));
      setData(newitems);
      setloading(false);
    });
  };

  useEffect(() => {
    getDocTypes('Inventory Purchase Indent', false, 'htssuite').then(
      (items) => {
        const newData: any = items.filter((item: any) => {
          const reqfields = [
            'name',
            'indent_date',
            'priority',
            'section',
            'creation',
            'pi_status',
            'status',
            'active',
            'upload_doc',
            'action',
          ];
          if (reqfields.includes(item.dataIndex)) {
            return true;
          } else {
            return false;
          }
        });

        const newD = [
          {
            dataIndex: 'name',
            key: 'name',
            title: 'Indent No',
          },
        ];

        const d = [...newD, ...newData];

        setcolumns(d);
      }
    );
    getTableDetails(JSON.stringify({status:"Active"}));
  }, []);

  return (
    <React.Fragment>
      <Spin loading={loading} />
      <SmnlTable 
      column={columns} 
      dataSource={data}  
      viewUrl={'/create-purchase-indent-approval'}
      noBlockView='Active'
      
      />
    </React.Fragment>
  );
};

export default View;
