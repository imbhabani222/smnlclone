import React, { useState, useEffect, useContext } from 'react';
import { getAccountReports } from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import {handleExportAccounts} from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import dayjs from 'dayjs';
import Report from '../../../../../../libs/common/ui/Report/report';
import {
    AddFooterToExcel,
    dateFormat,
    datetoFrom,
  } from '../../../../../../libs/common/utils/common';
import { table } from 'console';
import { ledgerColumntype1, ledgerSearchIndexex } from '../../accountManagement/helper';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable'
import { onDownloadPdf1 } from '../pdfhelper';
import {Row,Col} from "antd";

const formData = [

    {
        datatype: 'TableSelect',
        // label: 'Ledger',
        placeholder: 'Ledger',
        name: 'ledger',
        isReq: false,
        options:"Inventory General Ledger",
        colSpan : 8,
        columns:ledgerColumntype1,searchIndexes:ledgerSearchIndexex,
        description:{linkfield: "ledger_name",modulename: "inventory_account_configuration",appname: "htsaccount",colSpan:"2"},
 },
  
  {
    datatype: 'Date',
    // label: 'From Date::',
    placeholder: 'From Date',
    name: 'from_date',
    isReq: false,
    colSpan: 6,
    defaultValue: datetoFrom(moment().format('YYYY-MM-DD')),
  },
  {
    datatype: 'Date',
    // label: 'To Date',
    placeholder: 'To Date',
    name: 'to_date',
    isReq: false,
    colSpan: 6,
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

  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const [pdfTable, setPdfTable]= useState<any>()
  const [total, setTotal] = useState<any>({});

  const pageData={
    pageTitle:"Service Expense Register",
    exportToExcelLabel:"Export to Excel",
    downloadLabel:"Export to PDF",
    tableHeight:250,
  }

  useEffect(() => {
      setloading(true);
    const payload = selectedFilter;
    // console.log("payload",payload)
    getAccountReports(
      'get_service_expense_report',
      'account_management',
      'htsaccount',
      JSON.stringify(payload)
    ).then((items) => {
        // console.log("items",items)
      let columns: any = [];
      const tableKeys = [
        'Invoice no',
        'Invoice Date',
        'Ref No',
        'Ledger',
        'TCS (%)',
        'Invoice Value',
        'Narration'
      ];
      let tableKeys1=[...tableKeys]
      tableKeys1.unshift('Sl No')
      setPdfTable(tableKeys1  )
      columns = tableKeys.map((item: any)=>{
        if(item === "Invoice no"){
          return {
            title: item,
            key: item.toString().toLowerCase().replace(' (%)', '').replace(' ', '_'),
            render:(a:any,b:any)=>a?.name
          }
        }
        if(item === "Ref No"){
          return {
            title: item,
            key: item.toString().toLowerCase().replace(' (%)', '').replace(' ', '_'),
            render:(a:any,b:any)=>a?.party_bill_no
          }
        }
        if(item === "TCS (%)"){
          return {
            title: item,
            key: item.toString().toLowerCase().replace(' (%)', '').replace(' ', '_'),
            render:(a:any,b:any)=>a?.tcs
          }
        }
        if(item === "Invoice Date"){
          return {
            title: item,
            key: item.toString().toLowerCase().replace(' (%)', '').replace(' ', '_'),
            render:(a:any,b:any)=>a?.inv_date
          }
        }
        return {
          title: item,
          key: item.toString().toLowerCase().replace(' (%)', '').replace(' ', '_'),
          dataIndex: item.toString().toLowerCase().replace(' (%)', '').replace(' ', '_'),
        }
      })
     

    

     
      setColumnsData(columns);
    const totalValues = items.reduce((total:any,row:any)=> {
      total.product_value+= parseFloat(row?.product_value) || 0
     total.discount += parseFloat(row?.discount) || 0 
    //  total.gross += parseFloat(row?.gross) ||0
     total.tax += parseFloat(row?.tax) ||0
     total.tcs_amt +=parseFloat(row?.tcs_value)||0
     total.invoice_value += parseFloat(row?.invoice_value)|| 0

     return total
    },{invoice_value :0})

    setTotal(totalValues)
  
    const inovicesWithProducts=items.filter((invoice:any)=>{
      if(invoice?.products?.length >0){
        return true
      }
      return false
    })


    setTableData(inovicesWithProducts)

      setloading(false);
    });
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
  // console.log("key",key) 
  // console.log("value", value) 
  if(key==="from_date" || key==="to_date"){
    value=dateFormat(value)
  }
    setSelectedFilter({...selectedFilter, [key]: value})
  };

  const onDownloadExcel = ()=>{

   
    const data = tableData.map((item:any,index:any)=>({
      'Sl No.' : index+1,
      'Invoice no':item?.name,
      'Invoice Date':item?.inv_date ,
      'Ref No':item?.party_bill_no,
      'Ledger':item?.ledger?.ledger,
      'TCS (%)':item?.tcs_amt?item?.tcs_amt:0,
      'Invoice Value': item?.invoice_value,
      'Narration':item?.narration
    }))

    const totalObject={
      'Sl No.' :'',
      'Invoice no' :'' ,
      'Invoice Date' :  '',
      'Ref No': 'Total',
      'Ledger':'',
      'TCS (%)' :'',
      'Invoice Value' : total?.invoice_value,
      'Narration':''
    }

    handleExportAccounts(AddFooterToExcel(data,totalObject), "Service Expense Reports","Service Expense Report")
  }

 
  const expandedRowRender = (e: any) => {
    // console.log("e",e.products)
    const productDetails= e?.products?.map((p:any)=> {
      // console.log("p",p)
      return {
        name:p?.products?.products,
        uom:p?.uom,
        qty:p?.qty,
        rate:p?.rate,
        discount:p?.discount,
        tax:p?.tax,
        net_amount:p?.net



      }

    })
   const tablekeys= ["name", "uom","qty","rate","discount","tax (%)","net amount"]
   const nestedcolumns = tablekeys.map((item)=> {
    return {
      title:item.split(' ').map((word:any)=>word.charAt(0).toUpperCase()+word.slice(1)).join(' '),
      key:item.toString().toLowerCase().replace(' (%)', '').replace(' ', '_'),
      dataIndex:item.toString().toLowerCase().replace(' (%)', '').replace(' ', '_'),

    }
   })

    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={nestedcolumns} dataSource={productDetails} />
      </div>
    );

  }

  const onDownloadPdf =()=> {
    const pdfTableData = [...tableData]
    pdfTableData?.forEach((item:any) => {
      if(item.date === 'Total') {
        item.inv_date = "Total"
      }
    })
   
    // pdfTableData.push({date:"Total", invoice_value : tableData?.reduce((total:any,row:any) =>      total.invoice_value += parseFloat(row?.invoice_value) || 0)})
    onDownloadPdf1(pdfTableData, pdfTable,"ServiceExpense",170,140,230,297 )

  }
   
  return (
    <div>
       <div style={{ visibility: 'hidden', height: 0 }} id="ServiceExpens">
<div id="ServiceExpense">
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
                <strong>{total?.invoice_value || 0}</strong>
                </Col>
                <Col span={3}>
                  
                </Col>
              </Row>
          );
        }}
      />
    </div>
  );
};

export default View;