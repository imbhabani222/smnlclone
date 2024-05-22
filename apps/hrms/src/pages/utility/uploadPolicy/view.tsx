import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

type Props = {};

const View = (props: Props) => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    getDocTypes('Employee Notice Letter', 'htssuite').then((items) => {
      setcolumns(items);
    });
    getTableData('employee_notice_letter', 'utilities', 'htssuite').then(
      (items) => {
        setdata(items);
      }
    );
  }, []);

  return (
    <div>
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-employee-NoticeLetter"
      />
    </div>
  );
};

export default View;
