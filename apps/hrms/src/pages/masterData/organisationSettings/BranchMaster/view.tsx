import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableDataWithPagination,
} from '../../../../../../../libs/common/api/doctype';
import Table from '../../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../../libs/common/ui/Loader/spinLoader';
import Cookies from 'universal-cookie';


const ViewBranchMaster = () => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize|| 10, current_page: 1})


  useEffect(() => {
    setloading(true);
    getDocTypes('Branch Master', false, 'htssuite').then((items) => {
      let newdata = items.filter((item: any) => {
        const reqfields = [
          'branch_name',
          'address_line_1',
          'city',
          'state_name',
          'pan',
          'tan',
          'active',
          'action',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      newdata = newdata.map((item: any) => {
        if (item.dataIndex === 'branch_name') {
          return { ...item, title: 'Branch Name' };
        }
        if (item.dataIndex === 'address_line_1') {
          return { ...item, title: 'Address' };
        }
        return { ...item, title: item.title };
      });
      setcolumns(newdata);
      setloading(false)
    });
    getTableResponse(paginationData?.current_page,paginationData?.page_length)

  }, []);

  const getTableResponse = (current_page:number,page_length:number)=>{
   setloading(true)
    getTableDataWithPagination('branch_master','master_data',current_page,page_length,'htssuite')
    .then((items:any)=>{
      const dat: any = [];
      items?.data.map((e: any) => {
        dat.push({
          ...e,
          state_name:
            e?.state_name?.[0]?.state_name || e?.state_name?.state_name,
        });
      });
      setdata(dat);
      setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page })
      setloading(false)
    })
  }

  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse(current_page, page_length);
    setPaginationData({...paginationData, current_page, page_length })
  }

  return (
    <div>
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-branch-master"
      onChangePagination={onHandleChangePagination}
      totalNumberofRecords={paginationData?.total_records}
      currentPage={paginationData?.current_page}
      />
    </div>
  );
};

export default ViewBranchMaster;
