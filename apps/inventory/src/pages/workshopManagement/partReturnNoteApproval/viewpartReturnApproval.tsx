import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

const ViewAssetRequest = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);

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
    });
  }, []);

  return (
    <div>
      <Table
        column={columns}
        dataSource={data}
        viewUrl="/create-part-return-note-approve"
        noBlockView="Active"
      />
    </div>
  );
};

export default ViewAssetRequest;
