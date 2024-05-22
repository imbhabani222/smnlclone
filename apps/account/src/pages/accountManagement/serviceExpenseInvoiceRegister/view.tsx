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
    getDocTypes('Service Expense Invoice', false, 'htssuite').then((items) => {
        let newData = items.filter((item:any)=>{
            const reqFields = [
              "ledger",
              "inv_date",
              "ledger_ac",
              "invoice_type",
              "invoice_value",
              
    
            ]
            if (reqFields.includes(item.dataIndex)) {
              return true
            } else {
              return false
            }
          
        });
    setcolumns(newData)
  })
    getTableData('service_expense_invoice', 'account_management', 'htsaccount').then(
      (items) => {
        setdata(items);
        setloading(false)
        })
  }, []);

  return (
    <div>
        <Spin loading={loading}/>
      <Table
        column={columns}
        dataSource={data}
      />
    </div>
  );
};

export default View;
