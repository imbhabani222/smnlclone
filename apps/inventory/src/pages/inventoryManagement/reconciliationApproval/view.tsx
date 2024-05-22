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
  const [nestedcolumns, setNestedcolumns] = useState([]);

  const getTableDetails = (filters: any = null) => {
    setloading(true)
    getTableData(
      'inventory_reconciliation',
      'inventory_management',
      'htsinventory',
      filters
    ).then((items) => {
      const newitems = items?.map((e: any) => ({
        ...e,
      }));
      setData(newitems);
      setloading(false);
    });
  };

  useEffect(() => {
    getDocTypes('Inventory Reconciliation', false, 'htssuite').then((items:any)=>{
      let newData = items.filter((item: any) => {
          const reqfields = [
            'date',
            'remarks',
            'status',
            'action',
          ];
          if (reqfields.includes(item.dataIndex)) {
            return true;
          } else {
            return false;
          }
        });
        const data = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          ...newData,
        ];
        setcolumns(data);
    })
    getDocTypes('Reconciliation Products', false, 'htssuite').then((items) => {
      const newData: any = items.filter((item: any) => {
        const reqfields = [
          'part',
          'uom',
          'available_qty',
          'required_qty',
          'price',
          'net_amount',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      const modifiedData:any = [ ...newData ]
      setNestedcolumns(modifiedData);
    });
    getTableDetails(JSON.stringify({status:"Pending"}));
  }, []);

  const expandedRowRender = (e: any) => {
    if (e?.products && e?.products?.length > 0) {
      const prods = e?.products?.map((item: any, idx: any) => ({
        ...item,
        key: idx?.toString(),
        part: item?.part?.name
      }));

      return (
        <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
          <SmnlTable column={nestedcolumns} dataSource={prods} />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <Spin loading={loading} />
      <SmnlTable 
      column={columns} 
      dataSource={data}  
      viewUrl={'/create-reconciliation-approval'}
      noBlockView='Active'
      expandable={{expandedRowRender}}

      />
    </React.Fragment>
  );
};

export default View;
