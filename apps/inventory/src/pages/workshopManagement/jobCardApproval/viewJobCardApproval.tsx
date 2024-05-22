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
    getDocTypes('Inventory Job Card Creation', false, 'htssuite').then((items) => {
      let newData = items.filter((item:any)=>{
        const reqFields = [
          "used_for",
          "priority",
          "date",
          "exp_delivery_date",
          "service_type",
          "vehicle_type",
          "complaint",
          "remarks",
          "status",
          "action"

        ]
        if (reqFields.includes(item.dataIndex)) {
          return true
        } else {
          return false
        }
      })
      setcolumns(newData);
    });
    getTableData('inventory_job_card_creation', 'inventory_workshop_management', 'htsinventory').then(
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
        viewUrl="/create-job-card-approval"
      />
    </div>
  );
};

export default ViewAssetRequest;
