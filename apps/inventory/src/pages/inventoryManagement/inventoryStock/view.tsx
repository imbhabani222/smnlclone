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
  const [nestedcolumns, setNestedcolumns] = useState<any>([]);
  const [loading, setloading] = useState(true);
  const [paginationData, setPaginationData] = useState<any>({ page_length: pageSize || 10, current_page: 1 })


  useEffect(() => {
    getDocTypes('Inventory Product Master', false, 'htssuite').then((items) => {
      const newData: any = items.filter((item: any) => {
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
          'qty',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setcolumns(newData);
    });
    // getTableData(
    //   'inventory_stock',
    //   'inventory_management',
    //   'htsinventory'
    // ).then((items) => {
    //   // const newitems = items?.map((e: any) => {
    //   //   return {
    //   //     ...e,
    //   //     po_no: JSON.parse(e?.po_no)?.toString(),
    //   //   };
    //   // });
    //   // console.log(newitems);
    //   setdata(items);
    //   setloading(false);
    // });
    getTableDetails(null, paginationData?.page_length, paginationData?.current_page)
    getDocTypes('Inventory Stock', false, 'htssuite').then((items) => {
      const newData: any = items.filter((item: any) => {
        const reqfields = [
          'name',
          // 'inward_qty',
          'indent_qty',
          'order_qty',
          'rate',
          'amount',
          'discount',
          'tax',
          'net',
          'pending_indent_qty',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      const newItems = [
        { dataIndex: 'name', key: 'name', title: 'Batch No' },
        { dataIndex: 'inward_qty', key: 'inward_qty', title: 'Inward Qty' },
        {dataIndex: 'returned_qty', key:'returned_qty', title: "Returned Qty"},
        {dataIndex: 'issued_qty', key:'issued_qty', title: "Issued Qty"},
        ...newData,
      ];
      console.log(newData, "newDAta")
      setNestedcolumns(newItems);
    });
  }, []);


  const getTableDetails = (filters: any = null, page_length: number, current_page: number) => {
    setloading(true)
    getTableDataWithPagination(
      'inventory_stock',
      'inventory_management',
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

  const expandedRowRender = (e: any) => {
    const prods = e?.stock_data?.map((item: any, idx: any) => ({
      ...item,
      key: idx?.toString(),
    }));

    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={nestedcolumns} dataSource={prods} />
      </div>
    );
  };

  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getTableDetails(null, page_length, current_page);
    setPaginationData({ ...paginationData, current_page, page_length });
  };
  
  return (
    <div>
      <Spin loading={loading} />
      <Table
        column={columns}
        dataSource={data}
        editUrl="/good-received-note"
        blockEdit={'Full Unbilled Order'}
        expandable={{ expandedRowRender }}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        onChangePagination={onHandleChangePagination}
      />
    </div>
  );
};

export default View;
