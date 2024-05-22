import React, { useContext, useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
// import { Context } from '../../../../../../libs/common/context/context';
import Filter from '../../../../../../libs/common/ui/Filter';
import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
type Props = {};
const ViewLoanAdvance = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  // @ts-ignore
  // const { exportXl, updateExport, exportData } = useContext(Context);

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
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      // new
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

  const exportXl = () => {
    if (data && data?.length > 0) {
      const its: any = [];
      data.map((e: any) => {
        its.push({
          'Employee Name': e?.employee_name?.employee_name,
          'Advance Amount': e?.advance_amount,
          'Application No': e?.application_no,
          'Payment Mode': e?.payment_mode,
          'ECS/Cheque Date': e?.ecscheque_date,
          'Monthly Deuction Amount': e?.monthly_deduction_amount,
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
      'loan_advance_request',
      'loan_&_advance',
      'htssuite',
      filters
    ).then((items) => {
      const newItem = items.map((item: any) => {
        if (item.employee_name) {
          item.employee_name = item.employee_name.employee_name;
        }
        return item;
      });
      setdata(newItem);
    });
  };

  return (
    <div>
      <Filter handleChange={handleChange} exportXl={exportXl} />
      <Table
        column={columns}
        dataSource={data}
        viewUrl="/loan-advnace-approval"
      />
    </div>
  );
};

export default ViewLoanAdvance;
