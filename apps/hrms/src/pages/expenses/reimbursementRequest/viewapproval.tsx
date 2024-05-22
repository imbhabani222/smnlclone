import React, { useContext, useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import { Row, Col } from 'antd';
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
    getDocTypes('Reimbursement Request', false, 'htssuite').then((items) => {
      const its: any = [];
      items.map((e: any) => {
        if (
          e?.key === 'request_date' ||
          e?.key === 'claim_from_date' ||
          e?.key === 'claim_to_date' ||
          e?.key === 'bill_Date' ||
          e?.key === 'bill_date' ||
          e?.key === 'vehicle_type' ||
          e?.key === 'amount' ||
          e?.key === 'billable' ||
          e?.key === 'status' ||
          e?.key === 'action'
        ) {
          its.push({
            ...e,
          });
        }
      });
      setcolumns(its);
    });
    getTableResponse(paginationData?.current_page,paginationData?.page_length)
  }, []);

  const getTableResponse = (current_page:number,page_length:number)=>{
    getTableDataWithPagination('reimbursement_request','expense_&_reimbursement',current_page,page_length,'htssuite')
    .then((items:any)=>{
      setdata(items?.data)
      setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page })
    })
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

  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse(current_page, page_length);
    setPaginationData({...paginationData, current_page, page_length })
  }

  return (
    <div style={{ overflow: 'auto' }}>
      <Table
        column={columns}
        dataSource={data}
        viewUrl="/expense-request-approval"
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
      />
    </div>
  );
};

export default View;
