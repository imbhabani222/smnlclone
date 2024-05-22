import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  searchApi
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Filter from '../../../../../../libs/common/ui/Filter';

import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import { dateFormat } from '../../../../../../libs/common/utils/common';

type Props = {};

const View = (props: Props) => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [filtervalue, setfiltervalue] = useState({
    status: null,
    grn_no: null,
  });
  const [searchOptions,setSearchOptions] = useState<any>([])

  const getTableDetails = (filters: any = null) => {
    setloading(true)
    getTableData(
      'inventory_grn_return',
      'inventory_management',
      'htsinventory',
      filters
    ).then((items) => {
      setdata(items);
      setloading(false);
    });
  };

  useEffect(() => {
    getDocTypes('Inventory GRN Return', false, 'htssuite').then((items) =>{
      const newData = items.filter((item: any) => {
        const reqfields = [
          'supplier',
          'date',
          'grn_no',
          'invoice',
          'invoice_date',
          'narration',
          'total_value',
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
    setloading(true);
    getTableData(
      'inventory_grn_return',
      'inventory_management',
      'htsinventory'
    ).then((items) => {
      setdata(items);
      setloading(false);
    });
  }, []);

  const handleChange = (e: any, type: string) => {
    const filters: any = {
      ...filtervalue,
    };
    if (type === 'status') {
      filters.status = e;
      setfiltervalue({
        ...filtervalue,
        status: e,
      });
    
    // if (type === 'search') {
    //   filters.grn_no = e;
    //   setfiltervalue({
    //     ...filtervalue,
    //     grn_no: e,
    //   });
    // }

    const filterdata = Object.entries(filters).reduce(
      //@ts-ignore
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {}
    );

    getTableDetails(JSON.stringify(filterdata));
  }
  else {
    if(e){
      const endPoint = 'htsinventory.inventory_management.doctype.inventory_grn_return.api'
      const payload = `search_product?search=${e}`
      searchApi(payload, endPoint).then((items:any)=>{
        const datas = items.map((item:any)=>({
          label: item.grn_no,
          value: item.grn_no
        }))
        setSearchOptions(datas)    
        }) 
    }
    else{
      getTableDetails()
    }

  }
  };

  const exportXl = () => {
    if (data && data?.length > 0) {
      const its: any = [];
      console.log(data);
      data.map((e: any) => {
        its.push({
          'Grn NO': e?.name,
          supplier: e?.supplier?.name,
          'Grn Date': e?.grn_date,
          'Po No': e?.po_no,
          'Invoice No': e?.invoice_no,
          'Invoice Date': e?.invoice_date,
          Narrtion: e?.narration,
          status: e?.status,
          creation: dateFormat(e?.creation),
        });
        // if (e?.products && e?.products?.length > 0) {
        //   e?.products?.map((item: any) => {
        //     its.push({
        //       Product: item?.part?.name,
        //       uom: item?.uom,
        //       make: item?.make,
        //       'Order Qty': item?.order_qty,
        //       Rate: item?.rate,
        //       amount: item?.amount,
        //       discount: item?.discount,
        //       net: item?.net,
        //     });
        //   });
        // }
      });
      const name = 'grn_return_list';

      handleExport(its, name);
    } else {
      // isSuccess("Don't have data to export", 'error');
    }
  };

  const filterOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Full Unbilled Order', label: 'Full Unbilled Order' },
    { value: 'Partial Unbilled Order', label: 'Partial Unbilled Order' },
    { value: 'Full Billed Order', label: 'Full Billed Order' },
  ];

  const onHandleSelect = (data:any) => {
    const filterdata = {grn_no:data }
    getTableDetails(JSON.stringify(filterdata));
  }

  return (
    <>
      <Spin loading={loading} />
      <Filter
        handleChange={handleChange}
        exportXl={exportXl}
        filterOptions={filterOptions}
        serachPlaceholder="Search by GRN no"
        isHideStatus={true}
        autoCompleteSearchOptions= {searchOptions}
        showAutoComplete={true}
        onSelect= {onHandleSelect}
      />
      <Table
        column={columns}
        dataSource={data}
        editUrl="/add-new-alt-grn-return"
      />
    </>
  );
};

export default View;
