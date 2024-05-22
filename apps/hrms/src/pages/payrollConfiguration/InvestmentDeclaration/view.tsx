import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getFields,
  getTableDataWithPagination
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { amountFormater } from '../../../../../../libs/common/utils/common';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';
import Cookies from 'universal-cookie';


const View = () => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [formValue, setFormValues] = useState<any>({});
  const [formData, setFormData] = useState<any>([]);
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize|| 10, current_page: 1})


  useEffect(() => {
    setLoading(true)
    getDocTypes('Investment Declaration', false, 'htssuite').then((items) =>{
      const filterColumn = items.filter((item: any) => {
        const reqfields = ['employee_name', 'select_year', 'section_name', 'section_item', 'amount', 'action'];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setcolumns(filterColumn)
    }
    
    );
    getFields('Investment Declaration', 'htssuite').then((fields: any) => {
      const filterFields = fields.filter((item: any) => item.name === "select_year");
      filterFields.forEach((item:any)=> item.isReq =false)
      setFormData(filterFields);
    });
    getInvestmentData(formValue,paginationData?.current_page,paginationData?.page_length,null)
    setLoading(false)
  }, []);

  const getInvestmentData = (e:any,current_page:number,page_length:number,search:any) => {
    getTableDataWithPagination(
      'investment_declaration',
      'employee_management',
      current_page,
      page_length,
      'htssuite',
      JSON.stringify(e),
      search
    ).then((items) => {
      const tableData = [...items?.data];
      items?.data.forEach((item: any) => {
       item.employee_name = item.employee_name.employee_name;
       item.section_name = item.section_name.value;
       item.section_item = item.section_item.value;
       item.amount = amountFormater.format(item.amount);
      })
      setdata(tableData)});
  }

  useEffect(()=>{
    if(formValue?.select_year){
      getInvestmentData(formValue,paginationData?.current_page,paginationData?.page_length,null)
    }
    else{
      getInvestmentData(formValue,paginationData?.current_page,paginationData?.page_length,null)
    }

  },[formValue])
  
  const handleChange = (value: any, key: any) => {
    setFormValues({ ...formValue, [key]: value });
  };

  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getInvestmentData(formValue, current_page, page_length, null);
    setPaginationData({...paginationData, current_page, page_length })
  }

  return (
    <div>
      <Spin loading = {loading} />
      <SmnlFormDynamicLayout 
       sectionData={formData}
       onChange={handleChange}
       appname="htssuite"
       />
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-investment-declaration"
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
      />
    </div>
  );
};

export default View;
