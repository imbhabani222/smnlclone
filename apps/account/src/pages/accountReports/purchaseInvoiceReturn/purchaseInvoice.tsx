import React, { useState, useEffect, useContext } from 'react';
import { getAccountReports } from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import {handleExportAccounts} from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import dayjs from 'dayjs';
import Report from '../../../../../../libs/common/ui/Report/report';
import cloneDeep from 'lodash/cloneDeep';
import { Row, Col } from 'antd';
import {
    
  AddFooterToExcel,
    dateFormat,
    datetoFrom,
  } from '../../../../../../libs/common/utils/common';
  // import Table from '../../../../../libs/common/ui/Table/SmnlTable';
  import Table from '../../../../../../libs/common/ui/Table/SmnlTable'
  import {onDownloadPdf1} from "../pdfhelper"
import { getNetCalculation, getTotalAmountfromProductsAdded } from '../../accountManagement/helper';



const formData = [
  
  {
    datatype: 'Link',
    placeholder: 'Supplier',
    name: 'supplier',
    isReq: false,
    options:"Inventory Supplier Details",
    description:{linkfield: "supplier_name",modulename: "inventory_general_setup",appname: "htsinventory",colSpan:"2"},
  
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
  const [salaryParameterOptions, setSalaryParameterOptions] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({to_date:moment().format('YYYY-MM-DD'),from_date:moment().format('YYYY-MM-DD')});
  const [total, setTotal] = useState<any>({});
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const [pdfTable, setPdfTable]= useState<any>()

  const pageData={
    pageTitle:"Purchase Invoice",
    exportToExcelLabel:"Export to Excel",
    downloadLabel:"Export to PDF",
    tableHeight:250,
  }

  useEffect(() => {
      setloading(true);
    const payload = selectedFilter;
    getAccountReports(
      'get_invoice_register',
      'account_management',
      'htsaccount',
      JSON.stringify(payload)
    ).then((items) => {
      // console.log(" get_invoice_register items", items)
      let columns: any = [];
      const tableKeys = [
        'Invoice No',
        'Date',
        'Supplier', 
        'TCS (%)',
        'Invoice Value',
      ];
      const tableKeys1=cloneDeep(tableKeys)
      tableKeys1.unshift('Sl No')
      setPdfTable(tableKeys1)

      columns = tableKeys.map((item: any)=>{
        if(item === "TCS (%)"){
          return {
            title: item,
            key: item.toString().toLowerCase().replace(' ', '_'),
            dataIndex: item.toString().toLowerCase().replace(' ', '_'),
            render:(a:any,b:any)=> b.tcs
          }
        }
        return {
          title: item,
            key: item.toString().toLowerCase().replace(' ', '_'),
            dataIndex: item.toString().toLowerCase().replace(' ', '_'),
          render:(a:any)=> a
        }
      })
      
      setColumnsData(columns);
      const totalValues = items.reduce((total:any,row:any)=> {
        total.product_value+= parseFloat(row?.product_value) || 0
       total.discount_value += parseFloat(row?.discount_value) || 0 
       total.gross_value += parseFloat(row?.gross_value) ||0
       total.gst_value += parseFloat(row?.gross_value) ||0
       total.tcs_value +=parseFloat(row?.tcs_value)||0
       total.invoice_value += parseFloat(row?.invoice_value)||0

       return total
      },{invoice_value :0 })

      setTotal(totalValues)

      const inovicesWithProducts=items.filter((invoice:any)=>{
        if(invoice?.products?.length >0){
          return true
        }
        return false
      })

      setTableData(inovicesWithProducts);
     
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

  const onHandleFilterHandler = (key:any, value:any) => {
    updateFilter(false);
  };

  const onFilterClickHandler = () => {
    handleExportAccounts(tableData);
  };

  const onHandleChangeFilterHandler = (value: any, key: string) => {
    if (key==="from_date" || key==="to_date"){
      value=dateFormat(value)
    }
    setSelectedFilter({...selectedFilter, [key]: value})
  };
  const onDownloadExcel = ()=>{

    
    const tableTempData=tableData?.length >0 ? cloneDeep(tableData).slice(0, -1):[];
   
    const data = tableTempData.map((item:any,index:any)=>({
      'Sl No.' : index+1,
      'Date':item.date,
      'Invoice No':item.invoice_no,
      'Supplier':item.supplier,
      'TCS(%)':item?.tcs?item?.tcs:0,
      'Invoice Value':item?.invoice_value?+item.invoice_value:0
    }))

    const totalObject={
      'Sl No.' : '',
      'Date':'',
      'Invoice No':'',
      'Supplier':'Total',
      'TCS':'',
      'Invoice Value':total?.invoice_value
    }

    handleExportAccounts(AddFooterToExcel(data,totalObject), "Purchase Invoice Reports","Purchase Invoice Report");
  }

  const expandedRowRender = (e: any) => {
    const productDetails= e?.products?.map((p:any)=> {
      return {
        name:p?.products,
        uom:p?.uom,
        qty:p?.qty,
        rate:p?.rate,
        discount:p?.discount,
        tax:p?.tax,
        net_amount:p?.net
      }
    })

    const tablekeys=["name","uom","qty","rate","discount","tax(%)","net amount"]
    const nestedcolumns = tablekeys.map((item:any)=> {
      if(item === "tax(%)"){
        return {
          title: item,
          key: item.toString().toLowerCase().replace(' ', '_'),
          dataIndex: item.toString().toLowerCase().replace(' ', '_'),
          render:(a:any,b:any)=> b.tax
        }
      }
      return {
        title:item,
        key: item.toString().toLowerCase().replace(' ', '_'),
        dataIndex: item.toString().toLowerCase().replace(' ', '_'),
      }
    })
    
    if(productDetails?.length ===0){
      return <p>No Products Found</p>
    }else{
      return (
        <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
          <Table column={nestedcolumns} dataSource={productDetails} />
        </div>
      );
    }
    
  };

  
  
  const onDownloadPdf =()=> {
    onDownloadPdf1(tableData,pdfTable,"PurchaseInvoice",120,70,210,297 )
  }


   

  return (
    <div>
        <div style={{ visibility: 'hidden', height: 0 }} id="PurchaseInvoice">
<div id="PurchaseInvoice">
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
        expandable={{ expandedRowRender,
          rowExpandable: (record:any) => record.expandable !== false,

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
                  <strong>{total?.invoice_value || 0}</strong>
                </Col>
              </Row>
          );
        }}
      />
    </div>
  );
};

export default View;