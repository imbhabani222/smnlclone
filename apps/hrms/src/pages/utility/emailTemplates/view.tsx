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
    getDocTypes('Mail Templates', 'htssuite').then((items) => {
      setcolumns(items);
    });
    getTableData('mail_templates', 'utilities', 'htssuite').then((items) => {
      setdata(items);
    });
  }, []);

  return (
    <div>
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-mail-templates"
      />
    </div>
  );
};

export default View;
