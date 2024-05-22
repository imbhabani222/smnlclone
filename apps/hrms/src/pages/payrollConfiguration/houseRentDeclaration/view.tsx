import React, { useState, useEffect } from 'react';
import {
  getDocTypes,
  getTableData,
  getFields,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { amountFormater, employeeSelectDropDown } from '../../../../../../libs/common/utils/common';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Cookies from 'universal-cookie';


type Props = {};

const View = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [formData, setFormData] = useState<any>([]);
  const [formValue, setFormValues] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize|| 10, current_page: 1})

  useEffect(() => {
    setLoading(true);
    getDocTypes('House Rent Declaration', false, 'htssuite').then(
      (items: any) => setcolumns(items)
    );

    getFields('House Rent Declaration', 'htssuite').then((fields: any) => {      
      const filterFields = fields.filter((item: any) => {
        const reqfields = ['employee_name', 'financial_year'];
        if (reqfields.includes(item.name)) {
          return true;
        } else {
          return false;
        }
      });
      const updatedFields = filterFields?.map((item: any) => {
        if (item.name === 'employee_name') {
          return employeeSelectDropDown(item);
        }
        return item;
      })
      setFormData(updatedFields);
    });
    getHouseRentTableData(formValue,paginationData?.current_page,paginationData?.page_length,null);
    setLoading(false);
  }, []);

  const getHouseRentTableData = (e: any,current_page:number,page_length:number,search:any) => {
    getTableDataWithPagination(
      'house_rent_declaration',
      'employee_management',
      current_page,
      page_length,
      'htssuite',
      JSON.stringify(e),
      search
    ).then((items: any) => {
      const records: any = [...items?.data];
      items?.data.forEach((record: any) => {
        record.house_rent_paid = amountFormater.format(record.house_rent_paid);

        record.employee_name = record.employee_name.employee_name;
      });
      setdata(records);
      setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page })
      
    });
  };

  

  useEffect(() => {    
    if (formValue?.employee_name || formValue?.financial_year) {      
      getHouseRentTableData(formValue,paginationData?.current_page,paginationData?.page_length,null);
    } else {
      getHouseRentTableData(formValue,paginationData?.current_page,paginationData?.page_length,null);
    }
  }, [formValue]);

  const handleChange = (value: any, key: any) => {        
    setFormValues({ ...formValue, [key]: value });
  };

  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getHouseRentTableData(formValue, current_page, page_length, null);
    setPaginationData({...paginationData, current_page, page_length })
  }

  return (
    <>
      <Spin loading={loading} />
      <SmnlFormDynamicLayout
        sectionData={formData}
        onChange={handleChange}
        appname="htssuite"
      />
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-house-rent-declaration"
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
      />
    </>
  );
};

export default View;
