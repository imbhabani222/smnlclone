import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

const ViewAdvancePaymentCollection = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    getDocTypes('Advance Payment Collection', true, 'htssuite').then((items) =>
      setcolumns(items)
    );
    getTableData(
      'advance_payment_collection',
      'loan_&_advance',
      'htssuite'
    ).then((items) => {
      const newItem = items.map((item: any) => {
        if (item.employee_name) {
          item.employee_name = item.employee_name.employee_name;
        }
        return item;
      });
      setdata(newItem);
    });
  }, []);

  return (
    <div>
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-advance-payment-collection"
      />
    </div>
  );
};

export default ViewAdvancePaymentCollection;
