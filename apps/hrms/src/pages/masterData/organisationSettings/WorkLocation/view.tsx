import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../../libs/common/api/doctype';
import Table from '../../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../../libs/common/ui/Loader/spinLoader';
import Cookies from 'universal-cookie';


const ViewWorkLocation = () => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize || 10, current_page: 1})


  useEffect(() => {
    setloading(true);
    getDocTypes('Work Location', false, 'htssuite').then((items) => {
      setloading(false)
      let newData = items.filter((item: any) => {
        const reqfields = [
          'location_code',
          'location_name',
          'location_flag',
          'state_name',
          'branch_name',
          'active',
          'action',
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

  const getTableResponse = (current_page:number,page_length:number)=>{
    setloading(true)
    getTableDataWithPagination('work_location','master_data',current_page,page_length,'htssuite')
    .then((items:any)=>{
      setloading(false)
      const dat: any = [];
      items?.data.map((e: any) => {
        dat.push({
          ...e,
          state_name: e?.state_name?.state_name,
          branch_name: e?.branch_name?.branch_name,
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
    <div>
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-work-location"
      onChangePagination={onHandleChangePagination}
      totalNumberofRecords={paginationData?.total_records}
      currentPage={paginationData?.current_page}
      />
    </div>
  );
};

export default ViewWorkLocation;
