import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Cookies from 'universal-cookie';


type Props = {};

const View = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');

  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);
  const [paginationData, setPaginationData] = useState<any>({ page_length: pageSize || 10, current_page: 1 })


  useEffect(() => {
    getDocTypes('Inventory Product Master', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqfields = [
          'part',
          'part_name',
          // 'uom',
          'part_class',
          'hsn_code',
          'oem_part',
          'mrp_price',
          'rack_no',
          'avaiable_qty',
          // 'reorder_lvl',
          // 'active',
          // 'action',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      const columnsData = [
        ...newData,
        {
          title: "Reorder Level",
          dataIndex: 'reorder_lvl',
          key: 'reorder_lvl'
        }
      ]
      setcolumns(columnsData);
    });
    // getTableData(
    //   'inventory_product_master',
    //   'inventory_product_configuration',
    //   'htsinventory'
    // ).then((items) => {
    //   setdata(items);
    //   setloading(false);
    // });
    getTableDetails(null, paginationData?.page_length, paginationData?.current_page,);

  }, []);

  const getTableDetails = (filters: any = null, page_length: number, current_page: number) => {
    setloading(true)
    getTableDataWithPagination(
      'inventory_product_master',
      'inventory_product_configuration',
      current_page,
      page_length,
      'htsinventory',
      filters
    ).then((items) => {
      if(items.status === 200) {
        const newitems = items?.data?.map((e: any) => ({
          ...e,
          section: e?.section?.name,
        }));
        setPaginationData({ total_records: items?.total_records, page_length: items?.page_length, current_page: items?.current_page })
        setdata(newitems);
        setloading(false);
      }
      else{
        setloading(false)
        setdata([]);
        setPaginationData({ total_records: 0, page_length: pageSize, current_page: 1 })

      }
     
    });
  };

  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getTableDetails(null, page_length, current_page);
    setPaginationData({ ...paginationData, current_page, page_length });
  };


  return (
    <>
      <Spin loading={loading} />
      <Table column={columns} 
       dataSource={data} 
       totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        onChangePagination={onHandleChangePagination}
      
      />
    </>
  );
};

export default View;
