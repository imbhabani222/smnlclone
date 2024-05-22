import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Cookies from 'universal-cookie';


const ViewAssetRequest = () => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [paginationData, setPaginationData] = useState<any>({ page_length:pageSize|| 10, current_page: 1 })


  useEffect(() => {
    getDocTypes('Asset Request', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqfields = [
          'asset_name',
          'date_needed',
          'no_of_qty_required',
          'action',
          'status',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setcolumns(newData);
    });
   getTableResponse(paginationData?.current_page,paginationData?.page_length)
  }, []);

  const getTableResponse = (current_page: number, page_length: number) => {

    getTableDataWithPagination('asset_request', 'assets_management', current_page, page_length, 'htssuite')
      .then((items: any) => {
        const dat: any = [];
        items?.data.map((e: any) => {
          dat.push({
            ...e,
            asset_name: e?.asset_name?.asset_name,
            email: e?.requested_by?.name,
          });
        });
        setdata(dat);
        setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page })
      })

  }
  
  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse(current_page, page_length);
    setPaginationData({...paginationData, current_page, page_length })
  }
  

  return (
    <>
      <Table column={columns} dataSource={data} editUrl="/edit-asset-request"
      onChangePagination={onHandleChangePagination}
      totalNumberofRecords={paginationData?.total_records}
      currentPage={paginationData?.current_page}
      
      />
    </>
  );
};

export default ViewAssetRequest;
