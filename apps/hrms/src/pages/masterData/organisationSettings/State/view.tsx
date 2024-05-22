import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../../libs/common/api/doctype';
import Filter from '../../../../../../../libs/common/ui/Filter';
import Table from '../../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../../libs/common/ui/Loader/spinLoader';
import Cookies from 'universal-cookie';


const ViewState = (props: any) => {
  const [columns, setcolumns] = useState<any>([]);
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [paginationData, setPaginationData] = useState<any>({page_length: pageSize|| 10, current_page: 1})


  useEffect(() => {
    setloading(true);
    getDocTypes('States', false, 'htssuite').then((items) => {
      setcolumns(items);
      setloading(false)
    });
   getTableResponse(paginationData?.current_page,paginationData?.page_length)
  }, []);

  const getTableResponse = (current_page:number,page_length:number)=>{
    setloading(true)
    getTableDataWithPagination('states','master_data',current_page,page_length,'htssuite')
    .then((items:any)=>{
      setloading(false)
      setdata(items?.data)
      setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page })

    })
  }

  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse(current_page, page_length);
    setPaginationData({...paginationData, current_page, page_length })
  }

  return (
    <div>
      {/* <Filter /> */}
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-state" 
      onChangePagination={onHandleChangePagination}
      totalNumberofRecords={paginationData?.total_records}
      currentPage={paginationData?.current_page}
      />
    </div>
  );
};

export default ViewState;
