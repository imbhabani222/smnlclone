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
    getDocTypes('Inventory Job Card Part Request', false, 'htssuite').then((items) => {
      let newData = items.filter((item:any)=>{
        const reqFields = [
          "job_card",
          "part_request",
          "date",
          "remarks",
          "status",
        ]
        if (reqFields.includes(item.dataIndex)) {
          return true
        } else {
          return false
        }
      
    });
      setcolumns(newData);
    });
    getTableData('inventory_job_card_part_request', 'inventory_workshop_management', 'htsinventory').then(
      (items) => {
        {
          setdata(items);

        }
      }
    );
  }, []);

  return (
    <div>
      <Table
        column={columns}
        dataSource={data}
      />
    </div>
  );
};

export default ViewAssetRequest;
