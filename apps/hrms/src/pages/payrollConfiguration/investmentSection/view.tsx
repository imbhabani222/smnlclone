import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { amountFormater } from '../../../../../../libs/common/utils/common';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Cookies from 'universal-cookie';


const View = () => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize|| 10, current_page: 1})

  useEffect(() => {
    setLoading(true);
    const newData = [
      {
        dataIndex: 'section_name',
        key: 'section_name',
        title: 'Section Name',
      },
      {
        dataIndex: 'exemption_type',
        key: 'exemption_type',
        title: 'Exemption Type',
      },
      {
        title: 'Exemption Value/Percentage',
        dataIndex: 'exemption',
        key: 'exemption',
      },
      {
        title: 'Status',
        dataIndex: 'active',
        key: 'active',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
      },
    ];
    setcolumns(newData);
    getTableResponse({active:1},paginationData?.current_page,paginationData?.page_length,null)
     
  }, []);

const getTableResponse= (e:any,current_page: number,page_length:number,search:any)=>{
  setLoading(true)
  getTableDataWithPagination('investment_section','payroll_configurations',current_page,page_length,"htssuite",JSON.stringify(e),search)
  .then((items:any)=>{
    const getData = items?.data.map((item:any)=>({
      ...item

    }))
    setdata(getData)
    setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page})
    setLoading(false)
  })
}

  const getExemption = (item: any) => {
    let exemption = '';
    if (item?.exemption_type === 'Value') {
      exemption = amountFormater.format(item.exemption_value);
    } else if (item?.exemption_type === 'Percentage') {
      exemption = `${item?.exemption_percentage} %`;
    }
    return exemption;
  };
  const processedData = data.map((item: any) => ({
    ...item,
    exemption_value: amountFormater.format(item.exemption_value),
    section_name: item.section_name,
    exemption: getExemption(item),
  }));

  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse({active:1}, current_page, page_length, null);
    setPaginationData({...paginationData, current_page, page_length })
  }

  return (
    <>
      <Spin loading={loading} />
      <Table
        column={columns}
        dataSource={processedData}
        editUrl="/create-investment-section"
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
      />
    </>
  );
};

export default View;
