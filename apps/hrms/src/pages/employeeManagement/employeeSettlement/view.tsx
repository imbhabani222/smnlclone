import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../.././../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

type Props = {};

const View = (props: Props) => {
  const [columns, setcolumns] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    getDocTypes('Final Settlement ', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqfields = [
          'emp_id',
          'employee_name',
          'last_working_day',
          'no_of_years_worked',
          'net_payable',
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
    getTableData('final_settlement', 'employee_management', 'htssuite').then(
      (items) => {
        const data = items.map((item:any) =>({
          ...item,
          full_name: item.employee_name
        }))
        setTableData(data);
        setloading(false);
      }
    );
  }, []);
  return (
    <div>
      <Spin loading={loading} />
      <Table column={columns} dataSource={tableData}
        editUrl="/edit-settlement"

      />
    </div>
  );
};

export default View;
