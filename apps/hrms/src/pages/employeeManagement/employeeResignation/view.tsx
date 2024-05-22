import React, { useContext, useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { Context } from '../../../../../../libs/common/context/context';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Cookies from 'universal-cookie';


type Props = {};
const ViewGrade = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [paginationData, setPaginationData] = useState<any>({ page_length:pageSize|| 10, current_page: 1 })


  // @ts-ignore
  const { exportXl, updateExport, exportData } = useContext(Context);

  useEffect(() => {
    setloading(true);
    getDocTypes('Resignation Details ', false, 'htssuite').then((items:any) =>{
   const filterFields = items.filter((item:any)=>{    
    const reqfields = ['reason_for_resignation','remarks','upload_document','active']
    if (reqfields.includes(item?.dataIndex)) {
      return false
    }else{
      return true
    }
   })   
   setcolumns(filterFields)
   setloading(false)
    }
    );
    getTableResponse(paginationData?.current_page, paginationData?.page_length)
  }, []);

  

  const getTableResponse = (current_page: number, page_length: number) => {
    setloading(true)
    getTableDataWithPagination('resignation_details', 'employee_management', current_page, page_length, 'htssuite')
      .then((items: any) => {
        setdata(items?.data)
        setPaginationData({ total_records: items?.total_count, page_length: items?.page_length, current_page: items?.current_page })
        setloading(false)
      })
  }

  const onHandleChangePagination = (current_page: number, page_length: number) => {
    getTableResponse(current_page, page_length);
    setPaginationData({ ...paginationData, current_page, page_length })
  }

  useEffect(() => {
    if (exportXl && data && data?.length > 0) {
      exportData(data);
      updateExport(false);
    } else {
      // isSuccess("Don't have data to export", 'error');
      updateExport(false);
    }
  }, [exportXl]);
  return (
    <div>
      <Spin loading={loading} />
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-resigned-employee"
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
      />
    </div>
  );
};

export default ViewGrade;
