import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

const ViewLoanAdvance = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    getDocTypes('Loan Advance', 'htssuite').then((items) => setcolumns(items));
    getTableData('loan_advance', 'loan_&_advance', 'htssuite').then((items) =>
      setdata(items)
    );
  }, []);

  return (
    <div>
      <Table column={columns} dataSource={data} editUrl="/edit-LoanAdvance" />
    </div>
  );
};

export default ViewLoanAdvance;
