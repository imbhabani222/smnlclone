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
  const [nestedcolumns, setNestedcolumns] = useState<any>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getDocTypes('Inventory Part Issue Note', false, 'htssuite').then(
      (items) => {
        let newData = items.filter((item: any) => {
          const reqfields = [
            'issue_date',
            'part_issue_date',
            'job_card_no',
            'vehicle_no',
            'issue_to',
            'section',
            'total_quantity',
            'total_amount_issued',
            'store_location',
            'action',
          ];
          if (reqfields.includes(item.dataIndex)) {
            return true;
          } else {
            return false;
          }
        });
        setcolumns([
          { dataIndex: 'name', key: 'name', title: 'Issue No' },
          ...newData,
        ]);
      }
    );
    getTableData(
      'inventory_part_issue_note',
      'inventory_management',
      'htsinventory'
    ).then((items) => {
      const nItems = items?.map((e: any) => ({
        ...e,
        issue_to: e?.issue_to?.name,
        section: e?.section?.name,
      }));
      setdata(nItems);
      setloading(false);
    });
    getDocTypes('Inventory PIN Entries', false, 'htssuite').then((items) => {
      const newData: any = items.filter((item: any) => {
        const reqfields = [ 'uom', 'required_qty', 'issued_qty'];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      const addNewColumns = [
       
        {
          title: "Product No.",
          key:"part_number",
          dataIndex:'part_number'
        },
        {
          title: "Product",
          key:"part",
          dataIndex:'part'
        }
      ]
      setNestedcolumns([...addNewColumns, ...newData]);
    });
  }, []);

  const expandedRowRender = (e: any) => {
    const prods = e?.products?.map((item: any, idx: any) => ({
      ...item,
      key: idx?.toString(),
      part: item?.part?.name,
      uom: item?.uom?.name,
      part_number: item?.part?.part

    }));
    console.log(prods);
    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={nestedcolumns} dataSource={prods} />
      </div>
    );
  };

  return (
    <div>
      <Spin loading={loading} />
      <Table
        column={columns}
        dataSource={data}
        editUrl="/create-part-issue-note"
        expandable={{ expandedRowRender }}
      />
    </div>
  );
};

export default View;
