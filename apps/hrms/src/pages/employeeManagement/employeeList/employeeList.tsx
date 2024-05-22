import React, { useState, useEffect } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

type Props = {};

const EmployeeList = (props: Props) => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    getDocTypes('Personal Details', false, 'htssuite').then((items: any) =>
      setcolumns(items)
    );
    getTableData('personal_details', 'employee_management', 'htssuite').then(
      (items: any) => setdata(items)
    );
  }, []);

  return (
    <div>
      <Table
        column={columns}
        dataSource={data}
        editUrl="/add-employee-details"
      />
    </div>
  );
};

export default EmployeeList;
