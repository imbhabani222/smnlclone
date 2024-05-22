import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

const View = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    getDocTypes('Income Tax Slabs', false, 'htssuite').then((items) =>
      setcolumns(items)
    );
    getTableData('income_tax_slabs', 'payroll_configurations', 'htssuite').then(
      (items) => {
        setdata(items);
      }
    );
  }, []);

  return (
    <>
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-income-tax-slabs"
      />
    </>
  );
};

export default View;
