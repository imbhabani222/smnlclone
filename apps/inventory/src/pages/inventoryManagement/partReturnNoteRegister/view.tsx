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
    getDocTypes('Workshop Part Return Note', false, 'htssuite').then(
      (items) => {
        let newData = items.filter((item: any) => {
          const reqFields = [
            'from',
            'request_no',
            'return_date',
            'return_by',
            'section',
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
        setcolumns(newData);
      }
    );
    getTableData(
      'workshop_part_return_note',
      'inventory_workshop_management',
      'htsinventory'
    ).then((items) => {
      setdata(items);
      setloading(false);
    });
  }, []);

  return (
    <div>
      <Spin loading={loading} />
      <Table
        column={columns}
        dataSource={data}
        viewUrl="/part-return-note-accept"
        noBlockView="Approved"
      />
    </div>
  );
};

export default View;
