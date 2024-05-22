import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  purchaseMangementGetRecords,
  getPdfData,
  searchApi,
  getTableData,
  getTableDataWithPagination
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Modal from '../../../../../../libs/common/ui/Modal/modal';
import Filter from '../../../../../../libs/common/ui/Filter';
import moment from 'moment';
import dayjs from 'dayjs';
import handleExport, { handleExportInventory } from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import { dateFormat } from '../../../../../../libs/common/utils/common';
import Cookies from 'universal-cookie';
import InventoryFilter from '../../../../../../libs/common/ui/Filter/inventoryFilter';
import { purchaseIndentFilter } from '../helper/helper';



type Props = {};

const Views = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');

  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [nestedcolumns, setNestedcolumns] = useState([]);
  const [filtervalue, setfiltervalue] = useState<any>({from_date: dayjs().format("YYYY-MM-DD"), to_date: dayjs().format("YYYY-MM-DD")});
  const [filePerview, setfilePerview] = useState({
    isOpen: false,
    fileUrl: null,
  });
  const [searchOptions, setSearchOptions] = useState([])
  const [paginationData, setPaginationData] = useState<any>({ page_length: pageSize || 10, current_page: 1 })
  const [sectionFilter, setSectionFilter] = useState<any>([]);
  const [searchParams, setSearchParams] = useState<any>({});
  const [searchProduct, setSearchProduct] = useState<any>({})
  const getTableDetails = (filters: any = null, page_length: number, current_page: number, searchParam:any = null, search_product:any = null) => {
    setloading(true)
    purchaseMangementGetRecords(
      'inventory_purchase_indent',
      'inventory_purchase_management',
      current_page,
      page_length,
      'htsinventory',
      filters,
      searchParam,
      search_product
    ).then((items) => {
      if (items.status === 200) {
        const newitems = items?.data?.map((e: any) => ({
          ...e,
          section: e?.section_name,
        }));
        setPaginationData({
          total_records: items?.total_records,
          page_length: items?.page_length,
          current_page: items?.current_page,
        });
        setdata(newitems);
        setloading(false);
      } else {
        setloading(false);
        setdata([]);
        setPaginationData({
          total_records: 0,
          page_length: pageSize,
          current_page: 1,
        });
      }
    });
  };
  useEffect(() => {
    getDocTypes('Inventory Purchase Indent', false, 'htssuite').then(
      (items) => {
        const newData: any = items.filter((item: any) => {
          const reqfields = [
            'name',
            'indent_date',
            'priority',
            'section',
            'creation',
            'purpose',
            'pi_status',
            'status',
            'active',
            'upload_doc',
            'action',
          ];
          if (reqfields.includes(item.dataIndex)) {
            return true;
          } else {
            return false;
          }
        });
        const priorityIndex = newData.findIndex((item: any) => item.key === "priority");
        const priorityItem = newData.splice(priorityIndex, 1)[0];
        newData.splice(1, 0, priorityItem);
        const newD = [
          {
            dataIndex: 'name',
            key: 'name',
            title: 'Indent No',
          },
        ];

        const d = [...newD, ...newData];

        setcolumns(d);
      }
    );
    
     getTableData('inventory_section', 'inventory_general_setup', 'htsinventory', JSON.stringify({active:1})).then((items:any)=>{
      const data = [...items];
      setSectionFilter(data?.map((item) => ({
        label: item?.section_name,
        value: item.name
      })))
     })
    getTableDetails(JSON.stringify(filtervalue), paginationData?.page_length, paginationData?.current_page, searchParams, searchProduct);
  }, []);

  useEffect(() => {
    getDocTypes('Inventory Indent Entries', false, 'htssuite').then((items) => {
      const newData: any = items.filter((item: any) => {
        const reqfields = [
          'uom',
          'available_qty',
          'make',
          // 'reorder_level',
          'indent_qty',
          // 'rate',
          // 'pending_indent_qty',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      const addColumns = [
        {
          title: "Part Name",
          key: "part_name",
          dataIndex: 'part_name'
        },
        {
          title: "OEM",
          key: "oem_part",
          dataIndex: 'oem_part'
        }
      ]
      const addColumnsLast = [
        {
          title: "Order qty",
          key: "qty",
          dataIndex: 'qty' 
        },{
          title: "Pending Indent Qty",
          key: "pending_indent_qty",
          dataIndex: 'pending_indent_qty'
        },
        {
          title: "Rate",
          key: "rate",
          dataIndex: 'rate'
        },
        {
          title: "Amount",
          key: "amount",
          dataIndex: 'amount',
          render: (_:any, record:any) => {
            const { rate, indent_qty } = record || {}; 
            const amount = Number(rate) * Number(indent_qty); 
            return amount.toFixed(2); 
          }
        }
        
      ]
      const modifiedData: any = [{ name: 'part_no', title: 'Part No', dataIndex: 'part_no' }, ...addColumns, ...newData, ...addColumnsLast]
      setNestedcolumns(modifiedData);
    });
  }, []);

  const expandedRowRender = (e: any) => {
    if (e?.products && e?.products?.length > 0) {
      const prods = e?.products?.map((item: any, idx: any) => ({
        ...item,
        key: idx?.toString(),
        oem: item?.part?.name?.oem_part,
        part: item?.part?.name?.part_name,
        product_no: item?.part?.name?.part,
      }));

      return (
        <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
          <Table column={nestedcolumns} dataSource={prods} />
        </div>
      );
    } else {
      return null;
    }
  };

  const handleChange = (e: any, type: string) => {
    const filters: any = {
      ...filtervalue,
    };
    if (type === 'status' || type === 'section') {
      filters[type] = e;
      setfiltervalue({
        ...filtervalue,
        [type]: e,
      });

     

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
    else if(type === 'search'){
      setSearchParams({search:e});
      getTableDetails(JSON.stringify(filtervalue), paginationData?.page_length, paginationData?.current_page, {search:e}, searchProduct);
    }
    else {
      if (e) {
        const endPoint = 'htsinventory.inventory_purchase_management.doctype.inventory_purchase_indent.api'
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
    let d: any = []
    data?.map((item: any) => {
      item?.products?.map((i: any) => {
        d.push({ ...item, indent_no: item?.name, statuss: item?.status, ...i, product_status: i?.status });
      });
    });

    const mapedData = d?.map((e: any) => ({
      'Indent No': e?.indent_no,
      'Indent Date': e?.indent_date,
      Priority: e?.priority,
      section: e?.section,
      'Indent Purpose': e?.purpose,
      'Indent Remarks': e?.approval_remarks,
      'Approved Name': e?.approved_by_rejected_by_cancelled_by,
      'Approved Date': e?.approved_date_rejected_date_cancelled_date,
      status: e?.statuss,
      "Product Code": e?.part?.name?.part,
      "OEM Part No": e?.part?.name?.oem_part,
      "Product Name": e?.part?.name?.part_name,
      uom: e?.uom,
      Quantity: e?.qty,
      Rate: e?.rate,
      Amount: 1000
    }));

    const name = 'Purchase Indent Register';
    handleExportInventory(mapedData, 'Purchase Indent List', name);
   
  };

  const filterOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Active', label: 'Active' },
    { value: 'Partial Indent', label: 'Partial Indent' },
    { value: 'Closed', label: 'Closed' },
    { value: 'Approved', label: 'Approved' },

  ];

  const handlePrintPreview = (e: any) => {
    setloading(true);
    const filters = { name: e?.name };
    getPdfData(
      'inventory_purchase_indent',
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
    const filterdata = { name: data, ...filtervalue}
    setfiltervalue(filterdata);
    getTableDetails(JSON.stringify(filterdata), paginationData?.page_length, paginationData?.current_page,searchParams,searchProduct);

  }
  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getTableDetails(filtervalue, page_length, current_page, searchParams, searchProduct);
    setPaginationData({ ...paginationData, current_page, page_length });
  };

  const onHandleChangeFilter = (key:any, name:any) => {
    const filterObject = {
      ...filtervalue,
      status: key?.status || undefined,
      section: key?.section || undefined,
    };
    const searchProductDetails = {
      product: key?.product || undefined
    }
    setfiltervalue(filterObject);
  setSearchProduct(searchProductDetails);
    getTableDetails(JSON.stringify(filterObject), paginationData?.page_length, paginationData?.current_page, searchParams, searchProductDetails)
  }

  return (
    <div>
      <Spin loading={loading} />
      <InventoryFilter
      formData= {purchaseIndentFilter}
      onHandleChangeFilter= {onHandleChangeFilter}
      appname='htsinventory'
      // showAutoComplete={true}
      showSearch = {true}
      autoCompleteSearchOptions = {searchOptions}
      onSelect={onHandleSelect}
      serachPlaceholder="Search by Indent no"
      handleChange= {handleChange}
      exportXl={exportXl}
      showExportExcel ={true}
      showDateFilter = {true}
      defaultDate= {[dayjs(), dayjs()]}

       />
       {/* <Filter
        handleChange={handleChange}
        exportXl={exportXl}
        filterOptions={filterOptions}
        serachPlaceholder="Search by Indent no"
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
        dataSource={data.map((_item: any, idx: any) => ({
          ..._item,
          key: idx?.toString(),
        }))}
        editUrl="/purchase-indent"
        expandable={{ expandedRowRender }}
        // blockEdit={['pending', 'Active']}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        onChangePagination={onHandleChangePagination}
        isPrint={true}
        printPreview={handlePrintPreview}
      />
    </div>
  );
};

export default Views;
