import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
type Props = {};
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Cookies from 'universal-cookie';


const View = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);
  const [pageData, setPageData] = useState<any>({
    current_page: 1,
    page_length: pageSize || 10,
  });

  const getTableData =(
    current_page:number,page_length:number
  )=>{
  setloading(true)
  getTableDataWithPagination(
    'inventory_recovery_components',
    'inventory_account_configuration',
    current_page,
    page_length,
    'htsaccount',
  ).then((items:any)=>{    
    setdata(items?.data)
    setPageData({
      total_records: items?.total_records,
      page_length: items?.page_length,
      current_page: items?.current_page,
    })
    setloading(false)
  })
  }


  useEffect(() => {
    getDocTypes('Inventory Recovery Components', false, 'htssuite').then(
      (items) => {
        const newItems = items.filter((item: any) => {
          if (item?.dataIndex === 'amount') {
            return false;
          } else {
            return true;
          }
        });
        setcolumns(newItems);
      }
    );
    getTableData(pageData?.current_page,pageData?.page_length)

  }, []);

  const onHandleChangePagination = (current_page:number,page_length:number)=>{
    getTableData(current_page,page_length)
    setPageData({...pageData,current_page,page_length})
   }

  return (
    <div>
      <Spin loading={loading} />
      <Table
        column={columns}
        dataSource={data}
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={pageData?.total_records}
        currentPage={pageData?.current_page}
        editUrl="/edit-recovery-component"
      />
    </div>
  );
};

export default View;
