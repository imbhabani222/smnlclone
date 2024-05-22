import React, { useContext, useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { Context } from '../../../../../../libs/common/context/context';
type Props = {};
const ViewLoanAdvance = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  // @ts-ignore
  const { exportXl, updateExport, exportData } = useContext(Context);

  useEffect(() => {
    getDocTypes('Loan Advance Request', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqfields = [
          'employee_code',
          'employee_name',
          'payment_mode',
          'advance_amount',
          'monthly_deduction_amount',
          'status',
          'action',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setcolumns(newData);
    });
    getTableData('loan_advance_request', 'loan_&_advance', 'htssuite').then(
      (items) => {
        const newItem = items.map((item: any) => {
          if (item.employee_name) {
            item.employee_name = item.employee_name.employee_name;
          }
          return item;
        });
        setdata(newItem);
      }
    );
  }, []);
  useEffect(() => {
    if (exportXl && data && data?.length > 0) {
      exportData(data);
      updateExport(false);
    } else {
      // isSuccess("Don't have data to export", 'error');
      updateExport(false);
    }
  }, [exportXl]);

  return (
    <div>
      <Table
        column={columns}
        dataSource={data}
        viewUrl="/loan-advnace-approval"
      />
    </div>
  );
};

export default ViewLoanAdvance;
