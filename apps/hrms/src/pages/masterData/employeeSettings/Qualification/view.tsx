import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableDataWithPagination,
} from '../../../../../../../libs/common/api/doctype';
import Table from '../../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../../libs/common/ui/Loader/spinLoader';
import Cookies from 'universal-cookie';

const View = (props: any) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });

  useEffect(() => {
    setloading(true);

    getDocTypes('Qualification', false, 'htssuite').then((items) =>
      setcolumns(items)
    );
    getTableResponse(paginationData?.current_page, paginationData?.page_length);
  }, []);
  const getTableResponse = (current_page: number, page_length: number) => {
    getTableDataWithPagination(
      'qualification',
      'master_data',
      current_page,
      page_length,
      'htssuite'
    ).then((items: any) => {
      setdata(items?.data);
      setPaginationData({
        total_records: items?.total_count,
        page_length: items?.page_length,
        current_page: items?.current_page,
      });
      setloading(false);
    });
  };

  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getTableResponse(current_page, page_length);
    setPaginationData({ ...paginationData, current_page, page_length });
  };
  return (
    <div>
      <Spin loading={loading} />
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-qualification"
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        isEditable={false}
      />
    </div>
  );
};

export default View;
