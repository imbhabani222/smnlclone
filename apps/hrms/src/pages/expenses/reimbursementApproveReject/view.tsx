import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

const ViewReimburesment = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    getDocTypes('Reimbursement Request', false, 'htssuite').then((items) => {
      setcolumns(items);
    });
    getTableData(
      'reimbursement_request',
      'expense_&_reimbursement',
      'htssuite'
    ).then((items) => {
      setdata(items);
    });
  }, []);

  return (
    <>
      <Table column={columns} dataSource={data} />
    </>
  );
};

export default ViewReimburesment;
