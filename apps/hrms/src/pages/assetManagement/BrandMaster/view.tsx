import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Cookies from 'universal-cookie';


const ViewBrandMaster = () => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize|| 10, current_page: 1})


  useEffect(() => {
    getDocTypes('Brand Master', false, 'htssuite').then((items) =>
      setcolumns(items)
    );
    getTableResponse({active:1},paginationData?.current_page,paginationData?.page_length,null)
  }, []);

  const getTableResponse=(e:any,current_page:number,page_length:number,search:any)=>{
    getTableDataWithPagination('brand_master','assets_management',current_page,page_length,'htssuite',JSON.stringify(e),search)
    .then((items:any)=>{
      const getData = items?.data.map((item:any)=>({
        ...item
  
      }))
      setdata(getData)
      setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page})
    })

  }

  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse({active:1}, current_page, page_length, null);
    setPaginationData({...paginationData, current_page, page_length })
  }

  return (
    <>
      <Table column={columns} dataSource={data} editUrl="/edit-brand-master" 
      onChangePagination={onHandleChangePagination}
      totalNumberofRecords={paginationData?.total_records}
      currentPage={paginationData?.current_page}
      />
    </>
  );
};

export default ViewBrandMaster;
