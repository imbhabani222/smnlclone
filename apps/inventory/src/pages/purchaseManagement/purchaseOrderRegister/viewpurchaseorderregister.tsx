import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Filter from '../../../../../../libs/common/ui/Filter';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';


const ViewAssetRequest = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    getDocTypes('Inventory Purchase Order', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqfields = [
          'supplier',
          'po_date',
          'indent_no',
          'suppref_no',
          'net_value',
          'status',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setcolumns(newData);
    });
    getTableData('inventory_purchase_order', 'inventory_purchase_management', 'htsinventory').then(
      (items) => {
        {
          const newItem = items.map((item:any)=>{
            if (item?.supplier) {
              item.supplier = item?.supplier?.supplier_name
            }
            return item
          })
          setdata(newItem);

        }
      }
    );
  }, []);

  const exportXl = () => {
    if (data && data?.length > 0) {
      const its: any = [];
      data.map((e: any) => {
        its.push({
          'Supplier': e?.supplier,
          'PO Date' : e?.po_date,
          'Indent No.' : e?.indent_no,
          'Supp.Ref.No.': e?.suppref_no,
          'Net Value': e?.net_value,
          Status: e?.status,
          
        });
      });

      handleExport(its);
    }
  };

  const handleChange = (e: any) => {
    const filters = e ? `{ "status": "${e}" }` : null;
    getTableData(
      'inventory_purchase_order',
      'inventory_purchase_management',
      'htsinventory',
      filters
    ).then((items) => {
      {
        const newItem = items.map((item:any)=>{
          if (item?.supplier) {
            item.supplier = item?.supplier?.supplier_name
          }
          return item
        })
        setdata(newItem);

      }
    });
  };

  return (
    <div>
    <Filter handleChange={handleChange} exportXl={exportXl} />
     <Table
        column={columns}
        dataSource={data}
      />
    </div>
  );
};

export default ViewAssetRequest;
