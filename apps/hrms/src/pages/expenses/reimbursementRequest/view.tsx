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
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { Filter } from '../../leaveManagement/helper/helper';
import Cookies from 'universal-cookie';


type Props = {};

const View = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setLoading] = useState(false)
  const [filterData, setFilerData] = useState<any>({});
  const [employeeNames, setEmployeeName] = useState<any>([]);
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize || 10, current_page: 1})
  // @ts-ignore
  const { exportXl, updateExport, exportData } = useContext(Context);

  useEffect(() => {
    getDocTypes('Reimbursement Request', false, 'htssuite').then((items) => {
      const its: any = [];
      items.map((e: any) => {
        if (
          e?.key === 'request_date' ||
          e?.key === 'employee'||
          e?.key === 'claim_from_date' ||
          e?.key === 'claim_to_date' ||
          e?.key === 'bill_Date' ||
          e?.key === 'bill_date' ||
          e?.key === 'claim_name' ||
          e?.key === 'amount' ||
          e?.key === 'bill_available' ||
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
    getTableResponse(filterData,paginationData?.current_page,paginationData?.page_length,null)
    getEmployeeName(null);

  }, []);

const getTableResponse=(e:any,current_page:number,page_length:number,search:any)=>{  
  setLoading(true)
  getTableDataWithPagination('reimbursement_request','expense_&_reimbursement',current_page,page_length,'htssuite',JSON.stringify(e),search)
  .then((items:any)=>{
    items?.data.forEach((element: any) => {
      element.employee = element?.employee?.employee_name,
      element.claim_name = element?.claim_name?.claim_name;
    });
    setdata(items?.data);
    setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page})
    setLoading(false)
  })

}

const getEmployeeName = (e: any) => {
  getTableData('personal_details', 'employee_management', 'htssuite', e).then(
    (item) => {
      setEmployeeName(
        item.map((data: any) => ({ label: data.full_name, value: data.name }))
      );
    }
  );
};

  useEffect(() => {
    if (exportXl && data && data?.length > 0) {
      exportData(data);
      updateExport(false);
    } else {
      // isSuccess("Don't have data to export", 'error');
      updateExport(false);
    }
  }, [exportXl]);

  const getFilterData = (e: any) => {    
    const filterObject = { ...filterData };
    const filter = e
      ? { ...filterObject, status: e }
      : { employee: filterObject.employee };
    setFilerData(filter);
  };

  const getHandleChangeCategory = (e: any) => {    
    const filterObject = { ...filterData };
    const filter = e
      ? { ...filterObject, employee: e }
      : { status: filterObject.status };
    setFilerData(filter);
  };

  useEffect(() => {
    if (filterData?.status || filterData.employee) {      
      getTableResponse(filterData,paginationData?.current_page,paginationData?.page_length,null);
    } else {
      getTableResponse(filterData,paginationData?.current_page,paginationData?.page_length,null);
    }
  }, [filterData]);

  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse(filterData,current_page, page_length,null);
    setPaginationData({...paginationData, current_page, page_length })
  }

  return (
    <div style={{ overflow: 'auto' }}>
      <Filter
       handlestatusChange={getFilterData}
       handleCategoryChange={getHandleChangeCategory}
       employeeNameList={employeeNames}
      />
      {/* <div style={{marginTop:"20px"}}> */}
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-expense-request"
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
      />
      </div>
    // </div>
  );
};

export default View;
