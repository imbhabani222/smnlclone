import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../../libs/common/api/doctype';
import Table from '../../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../../libs/common/ui/Loader/spinLoader';
import Cookies from 'universal-cookie';


const ViewDepartment = () => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [paginationData, setPaginationData] = useState<any>({ page_length:pageSize|| 10, current_page: 1 })


  useEffect(() => {
    setloading(true);
    getDocTypes('Department', false, 'htssuite').then((items) =>
    {setloading(false)
      setcolumns(items)}
    );
    getTableResponse(paginationData?.current_page, paginationData?.page_length)
  }, []);

  const getTableResponse = (current_page: number, page_length: number) => {
    setloading(true)
    getTableDataWithPagination('department', 'master_data', current_page, page_length, 'htssuite')
      .then((items: any) => {
        setloading(false)
        setdata(items?.data)
        setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page })

      })
  }

  const onHandleChangePagination = (current_page: number, page_length: number) => {
    getTableResponse(current_page, page_length);
    setPaginationData({ ...paginationData, current_page, page_length })
  }

  return (
    <div>
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-department"
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
      />
    </div>
  );
};

export default ViewDepartment;
