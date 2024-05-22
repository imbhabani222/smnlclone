import React, { useEffect, useState } from 'react';
import moment from 'moment';
import dayjs from 'dayjs';
import Cookies from 'universal-cookie';
import {
  getDocTypes,
  purchaseMangementGetRecords,
  getPdfData,
  searchApi,
  getTableDataWithPagination
} from '../../../../../../libs/common/api/doctype';
import Filter from '../../../../../../libs/common/ui/Filter';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { validJson } from '../../../../../../libs/common/utils/common';
import handleExport, { handleExportInventory } from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import { dateFormat } from '../../../../../../libs/common/utils/common';
import Modal from '../../../../../../libs/common/ui/Modal/modal';
import { purchaseOrderFilter } from '../helper/helper'
import InventoryFilter from '../../../../../../libs/common/ui/Filter/inventoryFilter';


type Props = {};

const View = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');

  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [nestedcolumns, setNestedcolumns] = useState<any>([]);
  const [filtervalue, setfiltervalue] = useState<any>({from_date: dayjs().format("YYYY-MM-DD"), to_date: dayjs().format("YYYY-MM-DD")});
  const [filePerview, setfilePerview] = useState({
    isOpen: false,
    fileUrl: null,
  });
  const [searchOptions, setSearchOptions] = useState([]);
  const [paginationData, setPaginationData] = useState<any>({ page_length: pageSize || 10, current_page: 1 })
  const [searchParams, setSearchParams] = useState<any>({});
  const [searchProduct, setSearchProduct] = useState<any>({})



  const getTableDetails = (filters: any = null, page_length: number, current_page: number, searchParam:any = null, search_product:any = null) => {
    setloading(true)
    purchaseMangementGetRecords(
      'inventory_purchase_order',
      'inventory_purchase_management',
      current_page,
      page_length,
      'htsinventory',
      filters,
      searchParam,
      search_product,
    ).then((items) => {
      if(items.status === 200) {
        const newItems = items?.data?.map((e: any) => ({
          ...e,
          supplier: e?.supplier_name,
          location: e?.location_name,
          indent_no: validJson(e?.indent_no) || '-',
          // suppliers: e?.supplier,
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

  useEffect(() => {
    getDocTypes('Inventory Purchase Order', false, 'htssuite').then((items) => {
      const newData: any = items.filter((item: any) => {
        const reqfields = [
          'supplier',
          'location',
          // 'indent_no',
          // 'po_date',
          'no_of_days_to_receive_part',
          'status',
          'action',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });

      const newD = [
        {
          dataIndex: 'name',
          key: 'name',
          title: 'Order No',
        },
        {
          dataIndex: 'po_date',
          key: 'po_date',
          title: 'Order Date',
        },
        {
          dataIndex: 'indent_no',
          key: 'indent_no',
          title: 'Indent No.',
          render: (_: any, record: any) => {
            return _?.replace(',', '\n');
          },
        },
      ];
      // newD.push(newData);

      const d = [...newD, ...newData];
      setcolumns(d);
    });
    setloading(true);
    purchaseMangementGetRecords(
      'inventory_purchase_order',
      'inventory_purchase_management',
      paginationData?.current_page,
      paginationData?.page_length,
      'htsinventory',
       JSON.stringify(filtervalue),
       searchParams,
       searchProduct
    ).then((items) => {
      const newItems = items?.data?.map((e: any) => ({
        ...e,
        supplier: e?.supplier_name,
        location: e?.location_name,
        indent_no: validJson(e?.indent_no) || '-',
        // suppliers: e?.supplier,
      }));
      setdata(newItems);
      setPaginationData({ total_records: items?.total_records, page_length: items?.page_length, current_page: items?.current_page })


      setloading(false);
    });
  }, []);

  useEffect(() => {
    getDocTypes('Inventory Order Entries', false, 'htssuite').then((items) => {
      const newData: any = items.filter((item: any) => {
        const reqfields = [
          'part',
          'uom',
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
      const modifiedData = [{ name: 'product_no', title: 'Product Number', dataIndex: 'product_no' }, ...newData]
      setNestedcolumns(modifiedData);
    });
  }, []);

  const expandedRowRender = (e: any) => {
    const prods = e?.products?.map((item: any, idx: any) => ({
      ...item,
      key: idx?.toString(),
      part: item?.part_name,
      uom: item?.uom_name,
      product: item?.part_name,
      product_no: item?.part_no
    }));
    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={nestedcolumns} dataSource={prods} productLink={true} />
      </div>
    );
  };

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
      // }
      // if (type === 'search') {
      //   filters.name = e;
      //   setfiltervalue({
      //     ...filtervalue,
      //     name: e,
      //   });
      // }

      const filterdata = Object.entries(filters).reduce(
        //@ts-ignore
        (a, [k, v]) => (v ? ((a[k] = v), a) : a),
        {}
      );

      getTableDetails(JSON.stringify(filterdata), paginationData?.page_length, paginationData?.current_page, searchParams, searchProduct);
    }
    else if(type === 'date') {
      const filter = {
        ...filtervalue,
        from_date: e?.[0]?.toDate()
        ? moment(e?.[0]?.toDate()).format('YYYY-MM-DD')
        : undefined,

      to_date: e?.[1]?.toDate()
        ? moment(e?.[1]?.toDate()).format('YYYY-MM-DD')
        : undefined,
      }
      getTableDetails(JSON.stringify(filter), paginationData?.page_length, paginationData?.current_page, searchParams, searchProduct);

      setfiltervalue({
        ...filtervalue,
        from_date: e?.[0]?.toDate()
        ? moment(e?.[0]?.toDate()).format('YYYY-MM-DD')
        : undefined,

      to_date: e?.[1]?.toDate()
        ? moment(e?.[1]?.toDate()).format('YYYY-MM-DD')
        : undefined,
      })
    }
    else if(type === 'search') {
      setSearchParams({search:e});
      getTableDetails(JSON.stringify(filtervalue), paginationData?.page_length, paginationData?.current_page, {search:e}, searchProduct);

    }
    else {
      if (e) {
        const endPoint = 'htsinventory.inventory_purchase_management.doctype.inventory_purchase_order.api'
        const payload = `search_product?search=${e}`
        searchApi(payload, endPoint).then((items: any) => {
          const datas = items.map((item: any) => ({
            label: item.name,
            value: item.name
          }))
          setSearchOptions(datas)
        })
      }
      else {
        getTableDetails(JSON.stringify(filtervalue), paginationData?.page_length, paginationData?.current_page, searchParams, searchProduct);
      }

    }
  };

  const exportXl = () => {
    const d: any = []
    data?.map((item: any) => {
      item?.products?.map((i: any) => {
        d.push({ ...item, order_no: item?.name, statuss: item?.status, ...i })
      })
    })



    const mapedData = d?.map((e: any) => ({
      'PO NO': e?.order_no,
      'Indent Date': e?.po_date,
      supplier: e?.supplier,
      location: e?.location,
      status: e?.statuss,
      Product: e?.part?.name,
      uom: e?.uom?.name,
      make: e?.make?.name,
      'Indent Qty': e?.indent_qty,
      'Order Qty': e?.order_qty,
      Rate: e?.rate?.toString(),
      amount: e?.amount.toString(),
      discount: e?.discount.toString(),
      net: e?.net.toString(),
    }))

    const name = 'Purchase Order Register'
    handleExportInventory(mapedData, 'Purchase Order List', name)
    
  };

  const filterOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Active', label: 'Active' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Partial Supplied Order', label: 'Partial Supplied Order' },
    { value: 'Full Supplied Order', label: 'Full Supplied Order' },
    { value: 'Short Close', label: 'Short Close' },
    { value: 'Cancel', label: 'Cancel' },
  ];



  const handlePrintPreview = (e: any) => {
    setloading(true);
    const filters = { name: e?.name };
    getPdfData(
      'inventory_purchase_order',
      filters,
      'inventory_purchase_management',
      'htsinventory'
    ).then((items) => {
      setfilePerview({
        isOpen: true,
        fileUrl: items?.file,
      });
      setloading(false);
    });
  };

  const onHandleSelect = (data: any) => {
    const filterdata = { ...filtervalue, name: data }
    setfiltervalue(filtervalue);
    getTableDetails(JSON.stringify(filterdata), paginationData?.page_length, paginationData?.current_page, searchParams, searchProduct);
  }

  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getTableDetails(JSON.stringify(filtervalue), page_length, current_page, searchParams, searchProduct);
    setPaginationData({ ...paginationData, current_page, page_length });
  };

  const onHandleChangeFilter = (key:any, name:any) => {
    const filterObject = {
      ...filtervalue,
      status: key?.status || undefined,
      supplier: key?.supplier || undefined,
    };
    const searchProductDetails = {
      product: key?.product || undefined
    }
    setfiltervalue(filterObject);
    setSearchProduct(searchProductDetails)
    // setSearchParams(searchParams);
    getTableDetails(JSON.stringify(filterObject), paginationData?.page_length, paginationData?.current_page, searchParams, searchProductDetails)
  }

  return (
    <>
      <Spin loading={loading} />
      <InventoryFilter
       formData= {purchaseOrderFilter}
       onHandleChangeFilter= {onHandleChangeFilter}
       appname='htsinventory'
      //  showAutoComplete={true}
       showSearch ={true}
       autoCompleteSearchOptions = {searchOptions}
       onSelect={onHandleSelect}
       serachPlaceholder="Search by PO no"
       handleChange= {handleChange}
       exportXl={exportXl}
       showExportExcel ={true}
       defaultDate= {[dayjs(), dayjs()]}
      showDateFilter = {true}
       />

{/* 
      <Filter
        handleChange={handleChange}
        exportXl={exportXl}
        filterOptions={filterOptions}
        serachPlaceholder="Search by PO no"
        autoCompleteSearchOptions={searchOptions}
        showAutoComplete={true}
        onSelect={onHandleSelect}
        showDate={true}
        defaultDate= {[dayjs(), dayjs()]}
      /> */}
      <Modal
        isModalOpen={filePerview?.isOpen}
        footer={null}
        width="70%"
        handleCancel={() =>
          setfilePerview({
            ...filePerview,
            isOpen: false,
          })
        }
      >
        <div>
          {filePerview?.fileUrl && (
            <embed
              src={`data:application/pdf;base64,${filePerview?.fileUrl}`}
              style={{ width: '100%', height: '70vh' }}
            />
          )}
        </div>
      </Modal>
      <Table
        column={columns}
        dataSource={data?.map((item: any, idx: any) => ({
          ...item,
          key: idx?.toString(),
        }))}
        editUrl="/purchase-order"
        expandable={{ expandedRowRender }}
        supplierHistory={true}
        printPreview={handlePrintPreview}
        isPrint={true}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        onChangePagination={onHandleChangePagination}
      />
    </>
  );
};

export default View;
