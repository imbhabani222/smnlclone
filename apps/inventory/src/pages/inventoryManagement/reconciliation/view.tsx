import React, { useEffect, useState } from "react";
import SmnlTable from "../../../../../../libs/common/ui/Table/SmnlTable";
import Spin from "../../../../../../libs/common/ui/Loader/spinLoader";
import { getTableData, getDocTypes } from "../../../../../../libs/common/api/doctype";


const View = () => {
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState<any>([])
    const [data, setdata] = useState<any>([])
    const [nestedcolumns, setNestedcolumns] = useState([]);

    useEffect(()=>{
        setLoading(true)
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
              title: 'Reconciliation No',
              dataIndex: 'name',
              key: 'name',
            },
            ...newData,
          ];
          setColumns(data);
      })  
      getTableData(
        'inventory_reconciliation',
        'inventory_management',
        'htsinventory',
        null
      ).then((items) => {
        const newitems = items?.map((e: any) => ({
          ...e,
        }));
        setdata(newitems);
        setLoading(false);
      });
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
        });        const modifiedData:any = [ ...newData ]

        setNestedcolumns(modifiedData);
      });
    },[])

    const expandedRowRender = (e: any) => {
        if (e?.products && e?.products?.length > 0) {
          const prods = e?.products?.map((item: any, idx: any) => ({
            ...item,
            key: idx?.toString(),
            part: item?.part?.name,
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
             editUrl={'/reconciliation-data'}
             expandable={{expandedRowRender}}
             />
        </React.Fragment>
    )

}

export default View;