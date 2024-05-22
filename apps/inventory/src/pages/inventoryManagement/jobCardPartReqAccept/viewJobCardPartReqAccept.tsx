import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

const ViewAssetRequest = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [nestedcolumns, setNestedcolumns] = useState<any>([]);

  useEffect(() => {
    getDocTypes('Inventory Job Card Part Request', false, 'htssuite').then(
      (items) => {
        let newData = items.filter((item: any) => {
          const reqFields = [
            'job_card',
            'part_request',
            'date',
            'remarks',
            'status',
            'action',
          ];
          if (reqFields.includes(item.dataIndex)) {
            return true;
          } else {
            return false;
          }
        });
        const d = {
          dataIndex: 'name',
          key: 'name',
          title: 'Request No.',
        };

        const newItems = [d, ...newData];

        setcolumns(newItems);
      }
    );

    const fiters = JSON.stringify({
      status: ['in', ['Approved', 'Accepted', 'Rejected']],
    });
    getTableData(
      'inventory_job_card_part_request',
      'inventory_workshop_management',
      'htsinventory',
      fiters
    ).then((items) => {
      setdata(items);
    });
    getDocTypes('Inventory PIN Entries', false, 'htssuite').then((items) => {
      const newData: any = items.filter((item: any) => {
        const reqfields = ['part', 'uom', 'required_qty'];
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
    }));

    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={nestedcolumns} dataSource={prods} />
      </div>
    );
  };

  return (
    <div>
      <Table
        column={columns}
        dataSource={data}
        viewUrl="/job-card-part-request-accept"
        noBlockView="Approved"
        expandable={{ expandedRowRender }}
      />
    </div>
  );
};

export default ViewAssetRequest;
