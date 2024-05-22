import React, { useState, useEffect } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Table from "../../../../../../libs/common/ui/Table/SmnlTable"
import Cookies from 'universal-cookie';


const View = () => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<any>([]);
  const [columns, setcolumns] = useState<any>([])
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize|| 10, current_page: 1})

  useEffect(() => {
    setLoading(true);
    getDocTypes('Designation Wise Salary Parameter', false, 'htssuite').then((items:any)=>{
      setcolumns(items)
    })
   getTableResponse({active:1},paginationData?.current_page,paginationData?.page_length,null)
  }, []);

  const getTableResponse = (e:any,current_page:number,page_length:number,search:any)=>{
    setLoading(false)
    getTableDataWithPagination('designation_wise_salary_parameter','payroll_configurations',current_page,page_length,'htssuite',JSON.stringify(e),search)
    .then((items:any)=>{      
      const getData = items?.data.map((item:any)=>{
        return{
          ...item,
          grade : item.grade.value,
          salary_parameters : item.salary_parameters.reduce((acc:any,cur:any)=>{
            return `${acc},  ${cur}`
          })
        }
      })
      setTableData(getData)
      setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page})
      setLoading(false)
    })

  }

  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse({active:1}, current_page, page_length, null);
    setPaginationData({...paginationData, current_page, page_length })
  }

console.log(paginationData,"pagination");


  return (
    <React.Fragment>
      <Spin loading={loading} />
      <Table
      column={columns}
      dataSource={tableData}
      editUrl='/create-designation-wise-salary-parameters'
      onChangePagination={onHandleChangePagination}
      totalNumberofRecords={paginationData?.total_records}
      currentPage={paginationData?.current_page}
      />
    </React.Fragment>
  );
};

export default View;
