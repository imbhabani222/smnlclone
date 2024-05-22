import React, { useContext, useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import { Row, Col } from 'antd';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
// import { Context } from '../../../../../../libs/common/context/context';
import Filter from '../../../../../../libs/common/ui/Filter';
import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';

type Props = {};

const View = (props: Props) => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    getDocTypes('Reimbursement Request', false, 'htssuite').then((items) => {
      const its: any = [];
      items.map((e: any) => {
        if (
          e?.key === 'request_date' ||
          e?.key === 'claim_from_date' ||
          e?.key === 'claim_to_date' ||
          e?.key === 'bill_Date' ||
          e?.key === 'bill_date' ||
          e?.key === 'vehicle_type' ||
          e?.key === 'amount' ||
          e?.key === 'billable' ||
          e?.key === 'status'
        ) {
          its.push({
            ...e,
          });
        }
      });
      setcolumns(its);
    });
    getTableData(
      'reimbursement_request',
      'expense_&_reimbursement',
      'htssuite'
    ).then((items) => {
      setdata(items);
    });
  }, []);

  const exportXl = () => {
    if (data && data?.length > 0) {
      const its: any = [];
      data.map((e: any) => {
        its.push({
          'Request Date': e?.request_date,
          'Claim From Data': e?.claim_from_date,
          'Claim To Date': e?.claim_to_date,
          'Bill Date': e?.bill_Date,
          'Vehicle Type': e?.vehicle_type,
          Amount: e?.amount,
          Billable: e?.billable,
          Status: e?.status,
        });
      });
      handleExport(its);
    } else {
      isSuccess("Don't have data to export", 'error');
    }
  };

  const handleChange = (e: any) => {
    const filters = `{ "status": "${e}" }`;
    getTableData(
      'reimbursement_request',
      'expense_&_reimbursement',
      'htssuite',
      filters
    ).then((items) => {
      setdata(items);
    });
  };

  return (
    <div style={{ overflow: 'auto' }}>
      <Filter handleChange={handleChange} exportXl={exportXl} />
      <Table
        column={columns}
        dataSource={data}
        viewUrl="/expense-request-approval"
      />
    </div>
  );
};

export default View;
