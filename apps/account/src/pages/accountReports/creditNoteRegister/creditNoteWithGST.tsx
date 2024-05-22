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
import {onDownloadPdf1} from "../pdfhelper"
import { Col, Row } from 'antd';




const formData = [
{
        datatype: 'TableSelect',
        name: 'ledger',
        isReq: false,
        placeholder : "Select Ledger",
        options:"Inventory General Ledger",
        colSpan : 8,
        columns:ledgerColumntype1,searchIndexes:ledgerSearchIndexex,
        description:{linkfield: "ledger_name",modulename: "inventory_account_configuration",appname: "htsaccount",colSpan:"2"},
 },

  {
    datatype: 'Date',
    name: 'from_date',
    isReq: false,
    // description: undefined,
    colSpan: 6,
    placeholder: 'From date',
    defaultValue: datetoFrom(moment().format('YYYY-MM-DD')),
  },
  {
    datatype: 'Date',
    name: 'to_date',
    isReq: false,
    // description: undefined,
    colSpan: 6,
    placeholder: 'To date',
    // 
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
    pageTitle:"Credit Note With GST Register",
    exportToExcelLabel:"Export to Excel",
    downloadLabel:"Export to PDF",
    tableHeight:250,
  }

  useEffect(() => {
    // if(selectedFilter?.month && selectedFilter?.year) {
      setloading(true);
    const payload = selectedFilter;
    getAccountReports(
      'get_credit_with_gst_register',
      'account_management',
      'htsaccount',
      JSON.stringify(payload)
    ).then((items) => {
      let columns: any = [];
      const tableKeys = [
        'Credit Note No',
        'Voucher Date',
        'Ref No',
        'Ledger',
        'TCS (%)',
        "Invoice Value"
      ];
      // setPdfTable(tableKeys)
      const tableKeys1=[...tableKeys]
      tableKeys1.unshift('Sl No')
      setPdfTable(tableKeys1)

      columns = tableKeys.map((item: any)=>{
        if(item === "Ledger"){
          return {
            title: item,
            key: item.toString().toLowerCase().replace(' (%)', '').replace(' ', '_'),
            render:(a:any,b:any)=>a?.ledger_ac?.ledger_ac
          }
        }
        return {
          title: item,
          key: item.toString().toLowerCase().replace(' (%)', '').replace(' ', '_'),
          dataIndex: item.toString().toLowerCase().replace(' (%)', '').replace(' ', '_'),
        }
      })


    const modifiedColumns = columns.map((col:any)=> {
        if (col.dataIndex === "credit_note no" && col.key === "credit_note no") {
            return {
                ...col,
                key : "name",
                dataIndex : "name",
            }
        }
        return col
      }
      )

     
      
      
      
      setColumnsData(modifiedColumns);
      const totalValues = items.reduce((total:any,row:any)=> {
        total.product_value+= parseFloat(row?.product_value) || 0
       total.discount += parseFloat(row?.discount) || 0 
       total.gross += parseFloat(row?.gross) ||0
       total.tax += parseFloat(row?.tax) ||0
       total.tcs_value +=parseFloat(row?.tcs_value)||0
       total.order_value+= parseFloat(row?.order_value)||0
       total.invoice_value+= parseFloat(row?.invoice_value) || 0
       return total
      },{invoice_value :0 })
    
      
      setTotal(totalValues);

      const inovicesWithProducts=items.filter((invoice:any)=>{
        if(invoice?.product?.length >0){
          return true
        }
        return false
      })


      setTableData(inovicesWithProducts);
      setloading(false);
    });
//   }
  }, [selectedFilter]);
  
console.log(columnsData,"columnss");

  const updateSelectionHandler = (Object: object) => {
    setSelectionObject(Object);
  };

  const onHandleCloseHandler = () => {
    updateFilter(false);
  };

  const onHandleFilterHandler = (key:any, value:any) => {
    console.log(key, value, "value")
    updateFilter(false);
  };

  const onFilterClickHandler = () => {
    handleExportAccounts(tableData);
  };

  const onHandleChangeFilterHandler = (value: any, key: string) => {
    let val=value
    
    if (key === "from_date" || key === "to_date") {
        
        const date :any = dateFormat(value)
        val=date
    }       
    setSelectedFilter({...selectedFilter,[key]: val})
  };

  const onDownloadExcel = ()=>{
    const data = tableData.map((item:any,index:any)=>({
      'Sl No.' : index+1,
      'Credit Note No' :item?.name ,
        'Voucher Date' : item?.voucher_date || "Total",
        'Ref No': item?.ref_no,
        'Ledger':item?.ledger_ac?.ledger_ac,
        'TCS' :item?.tcs,
        'Invoice Value' : +item?.invoice_value
    }))

    const totalObject={
      'Sl No.' :'',
      'Credit Note No' :'' ,
      'Voucher Date' :  '',
      'Ref No': 'Total',
      'Ledger':'',
      'TCS' :'',
      'Invoice Value' : total?.invoice_value
    }

    handleExportAccounts(AddFooterToExcel(data,totalObject), "Credit Note with GST Reports","Credit Note with GST Report")
  }

  const expandedRowRender = (e: any) => {
   console.log("ee",e)
    const productDetails= e?.product?.map((p:any)=> {
      console.log("p",p.product)
      return {
        name:p?.products?.products,
        uom:p?.uom,
        qty:p?.qty,
        rate:p?.rate,
        discount:p?.discount,
        tax:p?.tax,
        net_amount:p.net




      }


    })

    // console.log("product details", productDetails)

    const tablekeys=["name","uom","qty","rate","discount","tax (%)", 'Net Amount']
    const nestedcolumns = tablekeys.map((item:any)=> {
      return {
        title:item.split(' ').map((word:any) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        key: item.toString().toLowerCase().replace(' (%)', '').replace(' ', '_'),
        dataIndex: item.toString().toLowerCase().replace(' (%)', '').replace(' ', '_'),
      }
    })
    // console.log("nest columns",nestedcolumns)
    

    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={nestedcolumns} dataSource={productDetails} />
      </div>
    );
  };

  

  const onDownloadPdf =()=> {
    
    onDownloadPdf1(tableData,pdfTable,"CreditNoteWithGst",170,140,230,297 )

  }

   

  return (
    <div>
         <div style={{ visibility: 'hidden', height: 0 }} id="CreditNoteWithGst">
<div id="CreditNoteWithGst">
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