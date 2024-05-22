import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableDataWithPagination,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import InventoryFilter from '../../../../../../libs/common/ui/Filter/inventoryFilter';
import { ProductFilter} from '../helper/helper';

const View = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);
  const [paginationData, setPaginationData] = useState<any>({
    page_length: 5,
    current_page: 1,
  });
  const [filterValue, setfilterValue] = useState<any>({});
  const [searchParams, setSearchParams] = useState<any>(null);

  const tableData = (e: any, current_page: number, page_length: number, search:any) => {
    getTableDataWithPagination(
      'inventory_product_master',
      'inventory_product_configuration',
      current_page,
      page_length,
      'htsinventory',
      e,
      search,
    ).then((items: any) => {
      const dat: any = [];
      const datas = items.data;
      datas.map((e: any) => {
        dat.push({
          ...e,
          uom: e?.uom?.uom_name,
          make: e?.make?.make_name,
          category: e?.category?.category_name,
          used_for: e?.used_for?.product_used_name,
          godown: e?.godown?.godown_name,
        });
      });
      setdata(dat);
      setPaginationData({
        total_records: items?.total_records,
        page_length: items?.page_length,
        current_page: items?.current_page,
      });
      // if (items?.data && items?.data?.length <= 0) {
      //   updateDisbutton(true);
      // } else {
      //   updateDisbutton(false);
      // }
      setloading(false);
    });
  };

  useEffect(() => {
    getDocTypes('Inventory Product Master', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqfields = [
          'part',
          'part_name',
          'uom',
          'hsn_code',
          'oem_part',
          'make',
          'category',
          'used_for',
          'mrp_price',
          'godown',
          'action',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setcolumns(newData);
    });
    tableData(null, paginationData?.current_page, paginationData?.page_length, searchParams);
    // getTableData(
    //   'inventory_product_master',
    //   'inventory_product_configuration',
    //   'htsinventory'
    // ).then((items) => {
    //   const dat: any = [];
    //   items.map((e: any) => {
    //     dat.push({
    //       ...e,
    //       uom: e?.uom?.uom_name,
    //       make: e?.make?.make_name,
    //       category: e?.category?.category_name,
    //       used_for: e?.used_for?.product_used_name,
    //       godown: e?.godown?.godown_name,
    //     });
    //   });
    //   setdata(dat);
    //   setloading(false);
    // });
  }, []);

  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    tableData(JSON.stringify(filterValue), current_page, page_length, searchParams);
    setPaginationData({ ...paginationData, current_page, page_length });
  };

  const onHandleChangeFilter = (data:any, name:any) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value !== '' ? value : undefined])
    );
    
    const filterObject = {
      ...filterValue,
      ...filteredData
    }
    setfilterValue(filterObject)
    tableData(JSON.stringify(filterObject), paginationData?.current_page, paginationData?.page_length, searchParams);

  }

  const onHandleChange = (key:any) => {
    setSearchParams(key)
    tableData(JSON.stringify(filterValue), paginationData?.current_page, paginationData?.page_length, key);

  }
  return (
    <div>
      <Spin loading={loading} />
      <InventoryFilter
      formData = {ProductFilter}
      onHandleChangeFilter= {onHandleChangeFilter}
      appname='htsinventory'
      serachPlaceholder="Search by Product Name, Product No."
      showSearch={true}
      handleChange={onHandleChange}
      />

      <Table
        column={columns}
        dataSource={data}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        onChangePagination={onHandleChangePagination}
        editUrl="/edit-product-master"
      />
    </div>
  );
};

export default View;
