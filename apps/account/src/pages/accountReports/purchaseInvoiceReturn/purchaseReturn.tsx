import React, { useState, useEffect, useContext } from 'react';
import { getAccountReports } from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import { handleExportAccounts } from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import Report from '../../../../../../libs/common/ui/Report/report';
import cloneDeep from 'lodash/cloneDeep';
import { Row, Col } from 'antd';
import {
  AddFooterToExcel,
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { onDownloadPdf1 } from '../pdfhelper';

const formData = [
  {
    datatype: 'Link',
    placeholder: 'Supplier',
    name: 'supplier',
    isReq: false,
    options: 'Inventory Supplier Details',
    description: {
      linkfield: 'supplier_name',
      modulename: 'inventory_general_setup',
      appname: 'htsinventory',
      colSpan: '2',
    },
  },
  {
    datatype: 'Date',
    placeholder: 'From date',
    name: 'from_date',
    isReq: false,
    defaultValue: datetoFrom(moment().format('YYYY-MM-DD')),
  },
  {
    datatype: 'Date',
    placeholder: 'To date',
    name: 'to_date',
    isReq: false,
    defaultValue: datetoFrom(moment().format('YYYY-MM-DD')),
  },
];

const View = (props: any) => {
  const [loading, setloading] = useState(false);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({to_date:moment().format('YYYY-MM-DD'),from_date:moment().format('YYYY-MM-DD')});
  const [total, setTotal] = useState<any>({});
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const [pdfTable, setPdfTable] = useState<any>();

  const pageData = {
    pageTitle: 'Purchase Return',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Export to PDF',
    tableHeight: 250,
  };

  useEffect(() => {
    setloading(true);
    const payload = selectedFilter;
    getAccountReports(
      'purchase_return_register',
      'account_management',
      'htsaccount',
      JSON.stringify(payload)
    ).then((items) => {
      
      
      const columns: any = [
        {
          title: 'Return No',
          key: 'name',
          dataIndex: 'name',
        },
        {
          title: 'Return Date',
          key: 'return_date',
          dataIndex: 'return_date',
        },
        {
          title: 'Supplier',
          key: 'supplier',
          dataIndex: 'supplier',
        },
        {
          title: 'GRN Return Name',
          key: 'grn_return',
          dataIndex: 'grn_return',
        },
        {
          title: 'GRN Return Date',
          key: 'date',
          dataIndex: 'date',
        },
        {
          title: 'TCS (%)',
          key: 'tcs',
          dataIndex: 'tcs',
        },
        {
          title: 'Order Value',
          key: 'invoice_value',
          dataIndex: 'invoice_value',
        },
      ];

      

      setColumnsData(columns);
      const totalValues = items.reduce(
        (total: any, row: any) => {
          total.order_value += parseFloat(row?.invoice_value) || 0;
          return total;
        },
        {
          order_value: 0,
        }
      );

      const returnsWithProducts=items.filter((returns:any)=>{
        if(returns?.products?.length >0){
          return true
        }
        return false
      })

      setTotal(totalValues)
      setTableData(returnsWithProducts);
      setloading(false);
    });
    //   }
  }, [selectedFilter]);


  const updateSelectionHandler = (Object: object) => {
    setSelectionObject(Object);
  };

  const onHandleCloseHandler = () => {
    updateFilter(false);
  };

  const onHandleFilterHandler = (key: any, value: any) => {
    updateFilter(false);
  };

  const onFilterClickHandler = () => {
    handleExportAccounts(tableData);
  };

  const onHandleChangeFilterHandler = (value: any, key: string) => {
    if (key === 'from_date' || key === 'to_date') {
      value = dateFormat(value);
    }
    setSelectedFilter({ ...selectedFilter, [key]: value });
  };
  const onDownloadExcel = () => {
    const data = tableData.map((item: any, index: any) => ({
      'Sl No.': index + 1,
      'Return No':item?.name,
      'Return Date': item?.return_date,
      "Supplier": item?.supplier,
      'GRN Return Name':item?.grn_return,
      'GRN Return Date':item?.return_date,
      "TCS(%)": item?.tcs ? item?.tcs : 0,
      'Order Value': item?.invoice_value ? +item?.invoice_value : 0,
    }));

    const totalObject={
      'Sl No.': '',
      'Return No':'',
      'Return Date': '',
      "Supplier": '',
      'GRN Return Name':'Total',
      'GRN Return Date':'',
      "TCS(%)": '',
      'Order Value': total?.order_value,
    }

    handleExportAccounts(
      AddFooterToExcel(data,totalObject),
      'Purchase Return Reports',
      'Purchase Return Report'
    );
  };
  const onDownloadPdf = () => {
    onDownloadPdf1(tableData, pdfTable, 'PurchaseReturn', 170, 140, 230, 297);
  };

  const expandedRowRender = (e: any) => {
    const productDetails = e?.products;

    const tablekeys = [
      'name',
      'uom',
      'qty',
      'rate',
      'discount',
      'tax(%)',
      'net amount',
    ];
    
    const nestedcolumns = tablekeys.map((item: any) => {
      if(item === "tax(%)"){
        return {
          title: item,
          key: "tax",
          dataIndex: "tax",
        }
      }
      if(item === "name"){
        return {
          title: item,
          key: "products",
          dataIndex: "products",
        }
      }
      if(item === "net amount"){
        return {
          title: item,
          key: "net",
          dataIndex: "net",
        }
      }
      return {
        title: item
          .split(' ')
          .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        key: item.toString().toLowerCase().replace(' ', '_'),
        dataIndex: item.toString().toLowerCase().replace(' ', '_'),
      };
    });

    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={nestedcolumns} dataSource={productDetails} />
      </div>
    );
  };

  return (
    <div>
      <div style={{ visibility: 'hidden', height: 0 }} id="PurchaseReturn">
        <div id="PurchaseReturn">
          <></>
        </div>
      </div>
      <Report
        formData={formData}
        updateSelectionHandler={updateSelectionHandler}
        onHandleCloseHandler={onHandleCloseHandler}
        onHandleFilterHandler={onHandleFilterHandler}
        onFilterClickHandler={onFilterClickHandler}
        onHandleChangeFilterHandler={onHandleChangeFilterHandler}
        filter={filter}
        tableData={tableData}
        columnsData={columnsData}
        loading={loading}
        appname="htsaccount"
        showTable={true} //not needed only pass when false
        pageData={pageData}
        showExportToExcel={true} //not needed only pass when false
        showDownloadPaySlip={false} //not needed only pass when false
        showFilters={true} //not needed only pass when false
        downloadExcel={onDownloadExcel}
        expandable={{
          expandedRowRender,
          rowExpandable: (record: any) => record.expandable !== false,
        }}
        downloadPdf={onDownloadPdf}
        showScroll={true}
        footer={() => {
          return (
              <Row>
                <Col span={2}></Col>
                <Col span={2}></Col>
                <Col span={7}>
                  <strong>TOTAL:</strong>
                </Col>
                <Col span={3}></Col>
                <Col span={4}>
                </Col>
                <Col span={3}>
                </Col>
                <Col span={3}>
                  <strong>{total?.order_value || 0}</strong>
                </Col>
              </Row>
          );
        }}
      />
    </div>
  );
};

export default View;
