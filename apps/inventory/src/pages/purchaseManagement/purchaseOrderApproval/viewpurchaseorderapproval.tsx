import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

import { validJson } from '../../../../../../libs/common/utils/common';

const ViewAssetRequest = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [nestedcolumns, setNestedcolumns] = useState<any>([]);

  useEffect(() => {
    getDocTypes('Inventory Purchase Order', false, 'htssuite').then((items) => {
      const newData = items.filter((item: any) => {
        const reqfields = [
          'supplier',
          'po_date',
          'indent_no',
          'suppref_no',
          'net_value',
          'status',
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
          title: 'PO No',
        },
      ];
      // newD.push(newData);

      const d = [...newD, ...newData];

      setcolumns(d);

      // setcolumns(newData);
    });
    const filters = { status: ['in', ['Active']] };

    getTableData(
      'inventory_purchase_order',
      'inventory_purchase_management',
      'htsinventory',
      JSON.stringify(filters)
    ).then((items) => {
      {
        const newItems = items?.map((e: any) => ({
          ...e,
          supplier: e?.supplier?.name,
          supplier_id : e?.supplier?.id,
          location: e?.location?.name,
          indent_no: validJson(e?.indent_no) || '-',
        }));
        setdata(newItems);
        // console.log(newItems);
        // setdata(items);
      }
    });
  }, []);

  useEffect(() => {
    getDocTypes('Inventory Order Entries', false, 'htssuite').then((items) => {
      const newData: any = items.filter((item: any) => {
        const reqfields = [
          'part',
          'uom',
          'indent_qty',
          'order_qty',
          'rate',
          'amount',
          'discount',
          'tax',
          'net',
          'pending_indent_qty',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setNestedcolumns(newData);
    });
  }, []);

  const expandedRowRender = (e: any) => {
    const prods = e?.products?.map((item: any, idx: any) => ({
      ...item,
      key: idx?.toString(),
      part: item?.part?.name,
      uom: item?.uom?.name,
      product: item?.part,
    }));
    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={nestedcolumns} dataSource={prods} productLink={true} />
      </div>
    );
  };

  return (
    <div>
      <Table
        column={columns}
        dataSource={data?.map((item: any) => ({
          ...item,
        }))}
        viewUrl="/create-purchase-order-approval"
        noBlockView={'Active'}
        expandable={{ expandedRowRender }}
        supplierHistory={true}
      />
    </div>
  );
};

export default ViewAssetRequest;
