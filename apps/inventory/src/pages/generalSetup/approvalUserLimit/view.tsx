import { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable'
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
const ApprovalUserLimit = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getDocTypes('Inventory Approval User Limit', false, 'htssuite').then((items) => {
      let newdata = items.filter((item: any) => {
        const reqfields = [
          'amount_limit',
          'transaction',
          'login_user',
          'active',
          'action',

        ];
        if(reqfields.includes(item.dataIndex)){
          return true;
        }
        else {
          return false
        }

      })
      
      setcolumns(newdata)
    });
    getTableData('inventory_approval_user_limit', 'inventory_general_setup', 'htsinventory').then((items) =>{
      setdata(items)
      setloading(false);
    }
      
    );
  }, []);
  return (
    <div>
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-inventory-approval-user-limit" />
    </div>
  );
};

export default ApprovalUserLimit;
