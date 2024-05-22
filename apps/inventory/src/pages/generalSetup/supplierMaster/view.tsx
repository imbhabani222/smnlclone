import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import Cookies from 'universal-cookie';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Filter from '../../../../../../libs/common/ui/Filter';

type Props = {};

const View = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');

  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);
  const [paginationData, setPaginationData] = useState<any>({ page_length: pageSize || 10, current_page: 1 });
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    getDocTypes('Inventory Supplier Details', false, 'htssuite').then(
      (items) => {
        const newData = items.filter((item: any) => {
          const reqfields = [
            'supplier_name',
            'ledger_group_name',
            // 'firm_type',
            'status',
            'action',
          ];
          if (reqfields.includes(item.dataIndex)) {
            return true;
          } else {
            return false;
          }
        });
        setcolumns(newData);
      }
    );
    getTableDetails(null, paginationData?.page_length, paginationData?.current_page, null)


    // getTableDataWithPagination(
    //   'inventory_supplier_details',
    //   'inventory_general_setup',
    //   'htsinventory'
    // ).then((items) => {
    //   const dat: any = [];
    //   items.map((e: any) => {
    //     dat.push({
    //       ...e,
    //       ledger_group_name: e?.ledger_group_name?.ledger_group_name,
    //       firm_type: e?.firm_type?.firm_type_name,
    //     });
    //   });
    //   setdata(dat);
    //   setloading(false);
    // });
  }, []);

  const getTableDetails = (filters: any = null, page_length: number, current_page: number, searchParams:any) => {
    setloading(true)
    getTableDataWithPagination(
      'inventory_supplier_details',
      'inventory_general_setup',
      current_page,
      page_length,
      'htsinventory',
      filters,
      searchParams
    ).then((items) => {
      if(items.status === 200) {
        const newItems = items?.data?.map((e: any) => ({
          ...e,
          ledger_group_name: e?.ledger_group_name?.ledger_group_name,
          firm_type: e?.firm_type?.firm_type_name,
        }));
        setdata(newItems);
        setPaginationData({ total_records: items?.total_records, page_length: items?.page_length, current_page: items?.current_page })
        setloading(false);
      }
      else {
        setdata([]);
        setloading(false)
        setPaginationData({ total_records: 0, page_length: pageSize, current_page: 1 })
      }
    });
  };

  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getTableDetails(null, page_length, current_page,searchData);
    setPaginationData({ ...paginationData, current_page, page_length });
  };
  
  const handleChange = (value:any, key:any) => {
    
    getTableDetails(null, paginationData?.page_length, paginationData?.current_page,value);
    setSearchData(value);
  }

  return (
    <div>
      <Spin loading={loading} />
      <Filter
       serachPlaceholder = 'Search by Supplier Name'
       isHideStatus = {true} 
       handleChange={handleChange} 
       hideExportExcel={true}/>
      <Table column={columns}
       dataSource={data} 
       editUrl="/edit-supplier" 
       onChangePagination={onHandleChangePagination}
       totalNumberofRecords={paginationData?.total_records}
       currentPage={paginationData?.current_page}
       
       />
    </div>
  );
};

export default View;
