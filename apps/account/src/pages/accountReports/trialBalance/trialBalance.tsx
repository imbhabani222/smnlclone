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
import { colsing_balance_add_dr_cr, ledgerColumntype1, ledgerSearchIndexex } from '../../accountManagement/helper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Row,Col } from 'antd';
import { Link } from 'react-router-dom';

const formData = [
    {
        datatype: 'Link',
        name: 'group_name',
        placeholder : "Select Group Name",
        isReq: false,
        options:"Inventory Ledger Group",
        colSpan : 8,
        // columns:ledgerColumntype1,searchIndexes:ledgerSearchIndexex,
        description:{linkfield: "ledger_group_name",modulename: "inventory_account_configuration",appname: "htsaccount",colSpan:"2"},
 },
  {
    datatype: 'Date',
    name: 'from_date',
    isReq: false,
    colSpan: 6,
    defaultValue: datetoFrom(moment().format('YYYY-MM-DD')),
  },
  {
    datatype: 'Date',
    name: 'to_date',
    isReq: false,
    colSpan: 6,
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
    pageTitle:"Trial Balance",
    exportToExcelLabel:"Export to Excel",
    downloadLabel:"Export to PDF",
    tableHeight:250,
  }

  useEffect(() => {
      setloading(true);
    const payload = selectedFilter;
    getAccountReports(
      'get_trial_balance',
      'account_management',
      'htsaccount',
      JSON.stringify(payload)
    ).then((items) => {
      let columns: any = [];
      const tableKeys = [
        'Particular',
        'Opening Balance',
        'Closing Balance'
      ];
      columns = tableKeys.map((item: any) => {
        if(item === 'Opening Balance' || item === 'Closing Balance'){
          return {
            title: item,
            key: item.toString().toLowerCase().replace(' ', '_'),
            dataIndex: item.toString().toLowerCase().replace(' ', '_'),
            render:(a:any,b:any)=>  colsing_balance_add_dr_cr(a)
          }
        }
        return {
          title: item,
          key: item.toString().toLowerCase().replace(' ', '_'),
          dataIndex: item.toString().toLowerCase().replace(' ', '_'),
        }
    });

      
    const modifiedColumns = columns.map((col:any)=> {
        if (col.dataIndex === "particular" && col.key === "particular") {
            return {
                ...col,
                key : "group_name",
                dataIndex : "group_name",
                render :(text:string,record:any)=>(
                  <Link to={"/view-ledger-account"}>{text}</Link>
                )
            }
        }
        return col
      }
      )

     
      
      const totalValues = items.reduce((total:any,row:any)=> {
        total.opening_balance += parseFloat(row?.opening_balance) || 0
       total.closing_balance += parseFloat(row?.closing_balance) || 0 
       return total
      },{opening_balance :0, closing_balance : 0 })
      
      setTotal(totalValues)
      
      setColumnsData(modifiedColumns);
      setTableData(items);
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
    
    if (key === "from_date" || key === "to_date" ) {
        
        const date :any = dateFormat(value)
        val=date
    }       
    setSelectedFilter({...selectedFilter,[key]: val})
  };

  

  const onDownloadExcel = ()=>{
    const data = tableData.map((item:any,index:any)=>({
      'Sl No.' : index+1,
      'Particular':item?.group_name ,
      'Opening Balance' : colsing_balance_add_dr_cr(item?.opening_balance),
      'Closing Balance': colsing_balance_add_dr_cr(item?.closing_balance),
    }))

    const totalObject={
      'Sl No.' :'',
      'Particular' :'Total' ,
      'Opening Balance' :  colsing_balance_add_dr_cr(total?.opening_balance),
      'Closing Balance': colsing_balance_add_dr_cr(total?.closing_balance),
    }

    handleExportAccounts(AddFooterToExcel(data,totalObject), "Trial balance","Trial balance Report")
  }

  const onDownloadPdf = ()=>{
    const rep :any = new jsPDF('p', 'pt', 'a4')
    const data = [...tableData]
    const mapedData = data?.map((item:any, index:any)=>[
      `${index +1}`,
      item?.group_name,
      item?.opening_balance,
      item?.closing_balance
    ])

    const columnd = [
      'Sl No.',
      'Particular',
        'Opening Balance',
        'Closing Balance'
    ];
    rep.html(document.querySelector('#payslip_id'),{
      callback: function (pdf:any){
        rep.setFontSize(18)
        rep.text(
          `C/O Adani Krishnapatnam Port Ltd., Muthukur, Nellore, -524344`,
          35,100
        )
        rep.setFontSize(28);
        rep.text('Trial Balance',250,145);
        autoTable(rep, {
          theme : 'grid',
          head : [columnd],
          body : mapedData,
          startY : 180,
          styles : styles,
          headStyles : headerStyles,
          bodyStyles : bodyStyle,
        });
        pdf.save("TrialBalance.pdf")
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
        showScroll={true}
        footer={
          () => {
            return (
               <Row>
               <Col span={2}></Col>
            <Col span={8}>
              <strong>TOTAL:</strong>
            </Col>
          
           
            <Col span={7}>
              <strong>{colsing_balance_add_dr_cr(total?.opening_balance)}</strong>
            </Col>
            <Col span={6}>
            <strong>{colsing_balance_add_dr_cr(total?.closing_balance)}</strong>
            </Col>
           
         
        </Row>
            );
        }
      }
      />
      <Link to={"/view-ledger-account"}>{tableData?.particular}</Link>
    </div>
  );
};

export default View;