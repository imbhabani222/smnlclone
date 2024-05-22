import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import SpinLoader from '../../../../../../libs/common/ui/Loader/spinLoader';
import Cookies from 'universal-cookie';


type Props = {};

const View = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize|| 10, current_page: 1})

  useEffect(() => {
    setloading(true);
    getDocTypes('Public Holiday List', false, 'htssuite').then((items) => {
      setcolumns(items);
    });
    getTableResponse(paginationData?.current_page,paginationData?.page_length)
    setloading(false)
  }, []);

  const getTableResponse = (current_page:number,page_length:number)=>{
    getTableDataWithPagination('public_holiday_list','utilities',current_page,page_length,'htssuite')
    .then((items:any)=>{
      setdata(items?.data)
      setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page })
    })
  }

  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse( current_page, page_length);
    setPaginationData({...paginationData, current_page, page_length })
  }
  

  return (
    <>
      <SpinLoader loading={loading} />
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-public-holidays"
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
      />
    </>
  );
};

export default View;
