import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  searchApi,
  getPdfData,
  getTableDataWithPagination
} from '../../../../../../libs/common/api/doctype';
import Cookies from 'universal-cookie';

import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { validJson } from '../../../../../../libs/common/utils/common';
import Filter from '../../../../../../libs/common/ui/Filter';
import Modal from '../../../../../../libs/common/ui/Modal/modal'
import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import { dateFormat } from '../../../../../../libs/common/utils/common';

type Props = {};

const View = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');

  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [nestedcolumns, setNestedcolumns] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [filtervalue, setfiltervalue] = useState({
    status: null,
    name: null,
  });
  const [filePerview, setfilePerview] = useState({
    isOpen: false,
    fileUrl: null,
  });
  const [searchOptions, setSearchOptions] = useState<any>([])
  const [paginationData, setPaginationData] = useState<any>({ page_length: pageSize || 10, current_page: 1 })

  const getTableDetails = (filters: any = null, page_length: number, current_page: number) => {
    setloading(true);

    getTableDataWithPagination(
      'inventory_good_received_note',
      'inventory_management',
      current_page,
      page_length,
      'htsinventory',
      filters
    ).then((items) => {
      if(items.status === 200) {
        const newItems = items?.data?.map((e: any) => ({
          ...e,
          po_no: validJson(e?.po_no) || e?.po_no,
          supplier: e?.supplier?.name,
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
      // const newitems = items?.map((e: any) => {
      //   return {
      //     ...e,
      //     po_no: validJson(e?.po_no) || e?.po_no,
      //     supplier: e?.supplier?.name,
      //   };
      // });
      // setdata(newitems);

      // setloading(false);
    });
  };

  useEffect(() => {
    getDocTypes('Inventory Good Received Note', false, 'htssuite').then(
      (items) => {
        const newData: any = items.filter((item: any) => {
          const reqfields = [
            'supplier',
            'grn_return',
            'date',
            'grn_date',
            'from',
            'grn_no',
            'po_no',
            'invoice_no',
            'invoice_date',
            'status',
            'action',
          ];
          if (reqfields.includes(item.dataIndex)) {
            return true;
          } else {
            return false;
          }
        });
        const ndata = [
          {
            title: 'Grn No',
            key: 'name',
            dataIndex: 'name',
          },
        ];
        ndata.push(...newData);
        setcolumns(ndata);
      }
    );
    setloading(true);
    getTableDetails(null,  paginationData?.page_length, paginationData?.current_page,)
    // getTableData(
    //   'inventory_good_received_note',
    //   'inventory_management',
    //   'htsinventory'
    // ).then((items) => {
    //   const newitems = items?.map((e: any) => {
    //     return {
    //       ...e,
    //       po_no: validJson(e?.po_no) || e?.po_no,
    //       supplier: e?.supplier?.name,
    //     };
    //   });

    //   setdata(newitems);
    //   setloading(false);
    // });

    getDocTypes('Inventory Good Received Note Entries', false, 'htssuite').then(
      (items) => {
        const newData: any = items.filter((item: any) => {
          const reqfields = [
            'part',
            'uom',
            'indent_qty',
            'order_qty',
            'qty',
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
        setNestedcolumns(newData);
      }
    );
  }, []);

  const expandedRowRender = (e: any) => {
    const prods = e?.products?.map((item: any, idx: any) => ({
      ...item,
      key: idx?.toString(),
      part: item?.part?.name,
      uom: item?.uom?.name,
    }));

    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={nestedcolumns} dataSource={prods} />
      </div>
    );
  };

  const handleChange = (e: any, type: string) => {
    console.log(e, type, "**")
    const filters: any = {
      ...filtervalue,
    };
    if (type === 'status') {
      filters.status = e;
      setfiltervalue({
        ...filtervalue,
        status: e,
      });
    
    const filterdata = Object.entries(filters).reduce(
      //@ts-ignore
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {}
    );

    getTableDetails(JSON.stringify(filterdata),  paginationData?.page_length, paginationData?.current_page,)
    }
    else {
      if(e) {
      const endPoint = 'htsinventory.inventory_management.doctype.inventory_good_received_note.api'
      const payload = `search_product?search=${e}`
      searchApi(payload, endPoint).then((items:any)=>{
        const datas = items.map((item:any)=>({
          label: item.name,
          value: item.name
        }))
        setSearchOptions(datas)
      }) 
      }
    else {
      getTableDetails(null,  paginationData?.page_length, paginationData?.current_page,)
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
          'Grn Date': e?.grn_date,
          'Po No': e?.po_no,
          'Invoice No': e?.invoice_no,
          'Invoice Date': e?.invoice_date,
          status: e?.status,
          creation: dateFormat(e?.creation),
        });
        if (e?.products && e?.products?.length > 0) {
          e?.products?.map((item: any) => {
            its.push({
              Product: item?.part?.name,
              uom: item?.uom,
              make: item?.make,
              'Order Qty': item?.order_qty,
              Rate: item?.rate,
              amount: item?.amount,
              discount: item?.discount,
              net: item?.net,
            });
          });
        }
      });
      const name = 'grn_list';

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
    const filterdata = {name:data }
    getTableDetails(JSON.stringify(filterdata),  paginationData?.page_length, paginationData?.current_page,)

  }
  const handlePrintPreview = (e: any) => {

    setloading(true);
    const filters = { name: e?.name };
    getPdfData(
      'inventory_good_received_note',
      filters,
      'inventory_management',
      'htsinventory'
    ).then((items) => {
      setfilePerview({
        isOpen: true,
        fileUrl: items?.file,
      });
      setloading(false);
    });
  };

  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getTableDetails(JSON.stringify(filtervalue), page_length, current_page,);
    setPaginationData({ ...paginationData, current_page, page_length });
  };

  return (
    <div>
      <Spin loading={loading} />
      <Filter
        handleChange={handleChange}
        exportXl={exportXl}
        filterOptions={filterOptions}
        serachPlaceholder="Search by GRN No"
        autoCompleteSearchOptions= {searchOptions}
        showAutoComplete={true}
        onSelect= {onHandleSelect}
      />
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
        dataSource={data}
        editUrl="/good-received-note"
        blockEdit={['Pending', 'Partial Unbilled Order']}
        expandable={{ expandedRowRender }}
        isPrint={true}
        printPreview={handlePrintPreview}
        isEditable={true}
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
      />
    </div>
  );
};

export default View;
