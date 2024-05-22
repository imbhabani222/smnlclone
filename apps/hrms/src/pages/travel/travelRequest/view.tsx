import React, { useContext, useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { Context } from '../../../../../../libs/common/context/context';
import Cookies from 'universal-cookie';


type Props = {};

const View = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize|| 10, current_page: 1})
  // @ts-ignore
  const { exportXl, updateExport, exportData } = useContext(Context);

  useEffect(() => {
    getDocTypes('Travel Request', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqfields = [
          'name',
          'travel_request_date',
          'travel_requested_for',
          'estimated_cost',
          'status',
          'action',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      // new
      setcolumns(newData);

      // setcolumns(items);
    });
    getTableResponse(paginationData?.current_page,paginationData?.page_length)

  }, []);
  useEffect(() => {
    if (exportXl && data && data?.length > 0) {
      exportData(data);
      updateExport(false);
    } else {
      // isSuccess("Don't have data to export", 'error');
      updateExport(false);
    }
  }, [exportXl]);

  const getTableResponse = (current_page:number,page_length: number)=>{
    getTableDataWithPagination('travel_request','travel_requisition',current_page,page_length,'htssuite')
    .then((items:any)=>{
      const getData = items?.data.map((item:any)=>{
        if (item.travel_requested_for) {
          item.travel_requested_for = item.travel_requested_for_name;
        }

        return item;
      })
      setdata(getData)
      setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page})
    })
  }

  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse( current_page, page_length);
    setPaginationData({...paginationData, current_page, page_length })
  }

  return (
    <div>
      <Table column={columns} dataSource={data} editUrl="/edit-travel" 
      onChangePagination={onHandleChangePagination}
      totalNumberofRecords={paginationData?.total_records}
      currentPage={paginationData?.current_page} />
    </div>
  );
};

export default View;
