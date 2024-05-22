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
    getDocTypes('Inventory Service Type Master', false, 'htssuite').then((items) => {
      setcolumns(items);
    });
    getTableData('inventory_service_type_master', 'inventory_workshop_management', 'htsinventory').then(
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
        editUrl="/edit-service-types"
      />
    </div>
  );
};

export default ViewAssetRequest;
