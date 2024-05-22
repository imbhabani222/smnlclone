import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

const ViewAssetList = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    const d = true;
    getDocTypes('Assets Master', d, 'htssuite').then((items) => {
      setcolumns(items);
    });
    getTableData('assets_master', 'assets_management', 'htssuite').then(
      (items) => {
        const dat: any = [];
        items.map((e: any) => {
          dat.push({
            ...e,
            brand_name: e?.brand_name?.brand_name,
            department_name: e?.department_name.department_name,
            location_name: e?.location_name?.location_name,
          });
        });
        setdata(dat);
      }
    );
  }, []);

  return (
    <>
      <Table column={columns} dataSource={data} editUrl="" />
    </>
  );
};

export default ViewAssetList;
