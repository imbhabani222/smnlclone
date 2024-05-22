import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

const ViewReimburesmentReport = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    getDocTypes('', false, 'htssuite').then((items) => setcolumns(items));
    getTableData('', '', 'htssuite').then((items) => setdata(items));
  }, []);

  return (
    <>
      <Table column={columns} dataSource={data} />
    </>
  );
};

export default ViewReimburesmentReport;
