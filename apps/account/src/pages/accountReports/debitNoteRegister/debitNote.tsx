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
import { getModifiedData } from '../helper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Row,Col } from 'antd';


const formData = [
{
        datatype: 'TableSelect',
        name: 'Ledger',
        placeholder : "Select Ledger",
        isReq: false,
        options:"Inventory General Ledger",
        colSpan : 8,
        columns:ledgerColumntype1,searchIndexes:ledgerSearchIndexex,
        description:{linkfield: "ledger_name",modulename: "inventory_account_configuration",appname: "htsaccount",colSpan:"2"},
 },

  {
    datatype: 'Date',
    name: 'from_date',
    isReq: false,
    colSpan: 6,
    placeholder : "From date",
    defaultValue: datetoFrom(moment().format('YYYY-MM-DD')),
   
  },
  {
    datatype: 'Date',
    name: 'to_date',
    isReq: false,
    colSpan: 6,
    placeholder : "To date",
    defaultValue: datetoFrom(moment().format('YYYY-MM-DD')),
    
  },
];

export const styles: any = {
  cellPadding: 5,
  fontSize: 12,
  fontStyle: 'normal', // 'normal', 'bold', 'italic', 'bolditalic'
  halign: 'center', // 'left', 'center', 'right'
  valign: 'middle', // 'top', 'middle', 'bottom'
};
export const bodyStyle: any = {
  lineColor: [240, 240, 240],
  lineWidth: { top: 0, right: 0, bottom: 1, left: 0 },
};
export const headerStyles: any = {
  fontSize: 10,
  fillColor: [223, 223, 223],
  textColor: [0, 0, 0],
  fontStyle: 'bold',
  halign: 'center',
  lineColor: [250, 250, 250],
  lineWidth: { top: 0, right: 1, bottom: 0, left: 0 },
};

const View = (props: any) => {
  const [loading, setloading] = useState(false);
  const [salaryParameterOptions, setSalaryParameterOptions] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [total, setTotal] = useState<any>({})
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({to_date:moment().format('YYYY-MM-DD'),from_date:moment().format('YYYY-MM-DD')});

  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);

  const pageData={
    pageTitle:"Debit Note Register",
    exportToExcelLabel:"Export to Excel",
    downloadLabel:"Export to PDF",
    tableHeight:250,
  }

  useEffect(() => {
      setloading(true);
    const payload = selectedFilter;
    getAccountReports(
      'get_debit_register',
      'account_management',
      'htsaccount',
      JSON.stringify(payload)
    ).then((items) => {
      let columns: any = [];
      const tableKeys = [
        'Voucher No',
        'Voucher Date',
        'Dr Ledger',
        'Dr Amount',
        'Cr Ledger',
        'Cr Amount',
        'Narration'
      ];
      columns = tableKeys.map((item: any) => ({
        title: item,
        key: item.toString().toLowerCase().replace(' ', '_'),
        dataIndex: item.toString().toLowerCase().replace(' ', '_'),
        render:(a:any)=>a
      }));
    
      // here we need to add amount for contra voucher
     const md = items
     
     const totalValues = md.reduce((total:any,row:any)=> {
      total.dr_amount += parseFloat(row?.dr_amount) || 0
     total.cr_amount += parseFloat(row?.cr_amount) || 0 
     return total
    },{dr_amount :0, cr_amount : 0 })
    
    setTotal(totalValues)

    setTableData(md);
      
      
      setColumnsData(columns);
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
      'Voucher No' : item?.voucher_no,
      'Voucher Date' : item?.voucher_date,
      'Dr Ledger' : item?.dr_ledger,
      'Dr Amount' : item?.dr_amount,
      'Cr Ledger':item?.cr_ledger,
      'Cr Amount':item?.cr_amount,
      'Narration' :item?.narration
    }))

    const totalObject={
      'Sl No.': '',
      'Voucher No': '',
      'Voucher Date': '',
      'Dr Ledger': 'Total',
      'Dr Amount': total.dr_amount,
      'Cr Ledger': '',
      'Cr Amount': total.cr_amount,
      'Narration' :''
    }

    handleExportAccounts(AddFooterToExcel(data,totalObject), "Debit Note Register Reports","Debit Note Register Report");

  }

  const onDownloadPdf = ()=>{
    const rep :any = new jsPDF('p', 'pt', 'a4')
    const data = [...tableData]
    const mapedData = data?.map((item:any, index:any)=>[
      `${index +1}`,
      item?.name,
      item?.voucher_date,
      item?.debit_ledger,
      item?.dr_amount,
      item?.credit_ledger,
      item?.cr_amount,
      item?.narration
    ])

    const columnd = [
      'Sl No.',
      'Voucher No',
        'Voucher Date',
        'Debit Ledger',
        'Dr Amount',
        'Credit Ledger',
        'Cr Amount',
        'Narration'
    ];
    rep.html(document.querySelector('#payslip_id'),{
      callback: function (pdf:any){
        rep.setFontSize(18)
        rep.text(
          `C/O Adani Krishnapatnam Port Ltd., Muthukur, Nellore, -524344`,
          35,100
        )
        rep.setFontSize(28);
        rep.text('Debit Note Register',250,145);
        autoTable(rep, {
          theme : 'grid',
          head : [columnd],
          body : mapedData,
          startY : 180,
          styles : styles,
          headStyles : headerStyles,
          bodyStyles : bodyStyle,
        });
        pdf.save("DebitNoteRegister.pdf")
      }
    })
  }



   

  return (
    <div>
        <div style={{ visibility: 'hidden', height: 0 }} id="payslip">
<div id="payslip_id">
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
        downloadPdf={onDownloadPdf}
        showScroll = {true}
        footer={
          () => {
            return (
              <>
               <Row>
               <Col span={4}></Col>
            <Col span={6}>
              <strong>TOTAL:</strong>
            </Col>
          
            <Col span={1}></Col>
            <Col span={7}>
              <strong>{total?.dr_amount}</strong>
            </Col>
            <Col span={3}>
            <strong>{total?.cr_amount}</strong>
            </Col>
            <Col span={2}></Col>
           
         
        </Row>
              </>
            );
        }
      }
      />
    </div>
  );
};

export default View;