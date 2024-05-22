import React, { useState, useEffect, useContext } from 'react';
import { getAccountReports } from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import {handleExportAccounts} from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import dayjs from 'dayjs';
import Report from '../../../../../../libs/common/ui/Report/report';
// import { Panel } from '../Panel/Panel';
import {Panel} from '../../../../../../libs/common/ui/Panel/Panel';
import {
  AddFooterToExcel,
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';
import {
  ledgerColumntype1,
  ledgerSearchIndexex,
} from '../../accountManagement/helper';
import { getModifiedData } from '../helper';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable'
import { Row, Col, Button, Upload, Modal } from 'antd';
import styles from './bankpayment.module.scss';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import BankPaymentTemplate from './bankpaymenttemplate';
import {SendPaymentAdvice} from "../../../../../../libs/common/api/doctype"
import { isSuccess } from '../../../../../../libs/common/ui/Message';


// import axios from 'axios';
// import { getSelectboxLabel } from '../utils/common';
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();
// const token = cookies.get('token');
// const headers = {
//   'Content-Type': 'application/json',
//   Authorization: token,
// };


const formData = [
  {
    datatype: 'TableSelect',
    // label: 'Bank A/C Ledger',
    placeholder : "Select Ledger",
    name: 'ledger',
    isReq: false,
    options: 'Inventory General Ledger',
    columns: ledgerColumntype1,
    searchIndexes: ledgerSearchIndexex,
    description: {
      linkfield: 'ledger_name',
      modulename: 'inventory_account_configuration',
      appname: 'htsaccount',
      colSpan: '3',
      filterName: 'bankLedgers',
    },
  },
  {
    datatype: 'Date',
    // label: 'From  Date',
    name: 'from_date',
    isReq: false,
    placeholder : "From date",
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
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  // const [showPdfData, setShowPdfData]=useState<any>()
  const [openPdfView, setOpenPdfView] = useState<any>(false);
  const [supplierEmail, setSupplierEmail]=useState("suman.behera@hutechsolutions.com")
  const [total, setTotal] = useState<any>({});
  const pageData = {
    pageTitle: 'Payment Advice',
    exportToExcelLabel: 'Export to Excel',
    // downloadLabel: 'Export to PDF',
    tableHeight: 250,
  };

  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    amount: number;
    cheque_no: string;
    date: Date;
    particular: string;
    voucher_type:string;
  }

  useEffect(() => {
    setloading(true);
    const payload = selectedFilter;
    getAccountReports(
      'get_payment_advice',
      'account_management',
      'htsaccount',
      JSON.stringify(payload)
    ).then((items) => {
      console.log('gafdgsitems', items);
      let columns: any = [];
      const tableKeys = [
        // 'No',
        'Voucher Date',
        'Particular',
        'Voucher Type',
        'Voucher No',
        // 'Doc No',
        'Cheque No',
        'Amount',
        'Narration'
      ];
      columns = tableKeys.map((item: any) => {
        if(item ==='Particular'){
          return {
            title: item,
            key: item.toString().toLowerCase().replace(' ', '_'),
            dataIndex: item.toString().toLowerCase().replace(' ', '_'),
            render:(a:any,b:any)=>b?.dr_ledger
          }
        }
        if(item ==='Amount'){
          return {
            title: item,
            key: item.toString().toLowerCase().replace(' ', '_'),
            dataIndex: item.toString().toLowerCase().replace(' ', '_'),
            render:(a:any,b:any)=>b?.cr_amount
          }
        }
        return {
          title: item,
          key: item.toString().toLowerCase().replace(' ', '_'),
          dataIndex: item.toString().toLowerCase().replace(' ', '_'),
          render:(a:any,b:any)=>a
        }
      });

      columns.push({
  // title: 'Action',
  key: 'action',
  render: (record:any) => (
    <Button onClick={() => handleAction(record)}>Generate Payment Advice</Button>
  ),
});

      setColumnsData(columns);
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

  const onHandleFilterHandler = (key: any, value: any) => {
    updateFilter(false);
  };

  const onFilterClickHandler = () => {
    handleExportAccounts(tableData);
  };

  const onHandleChangeFilterHandler = (value: any, key: string) => {
  console.log("key",key)
    let val=value
    
    if (key === "from_date" || key === "to_date"  ) {
        
        const date :any = dateFormat(value)
        val=date
    }       
    setSelectedFilter({...selectedFilter,[key]: val})
  };
  console.log("selectedfilter",selectedFilter)
//   const onDownloadExcel = ()=>{
//     const data = tableData.map((item:any,index:any)=>({
//       'Sl No.' : index+1,
//       'No',
//         'Date',
//         'Particular',
//         'Voucher Type',
//         'Voucher No',
//         'Doc No',
//         'Cheque No',
//         'Amount',
//         'Narration'
//     }))
//     handleExportAccounts(data, "BankPayment Advice Reports")
//   }

const handleAction = (record:any) => {
  // Implement your action logic here
  console.log('Performing action for record:', record);
  const currentDate = moment().format('YYYY-MM-DD');
  const supplierdata=record?.supplier_details
  const bankdetails=record?.supplier_bank_details


  // const supplieremail=record?.details[0]?.supplier_email
  // console.log("supplieremail",supplieremail)
  // setSupplierEmail(supplieremail)


  console.log("sd",supplierdata)
  const pdfdata= {
      ...supplierdata,
      ...bankdetails,
      totalamount:record?.amount,
      voucher:record?.voucher_date,
      printdate:currentDate,
      chequeno:record?.cheque_no,
      documentno:record?.document_no,
      documentdate:record?.document_date,
      issuedfrom:record?.bank_ac_ledger_credit?.bank_ac_ledger_credit,
      // modeofPayment: record?.details[0]?.pay_mode ?? ""
       
      
    }
   
  console.log("pdf",pdfdata)
  setOpenPdfView(pdfdata)
  // onDownloadPdf()
};
// useEffect(()=>{
//   if(showPdfData){
//     onDownloadPdf()
//   }
// },showPdfData)
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
}

const onDownloadPdf = () => {
  const id:any = document.getElementById('bankpaymentadvice');
  html2canvas(id).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'JPEG', 10, 10, 190, 200);
    // pdf.output('dataurlnewwindow');
    pdf.save('Bank Payment Advice.pdf');
  });
};




const generateAndSendEmail =  async() => {
  
  try {
    const id : any = document.getElementById('bankpaymentadvice');
    const canvas = await html2canvas(id);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'JPEG', 10, 10, 190, 200);
    const pdfBase64 = pdf.output('datauristring').split(',')[1];
    // console.log("pdfBase64", pdfBase64)
    const attachments = [
      {
        base64: pdfBase64,
        filename: 'Bank_Payment_Advice.pdf',
        content_type: 'application/pdf', // Adjust content type if necessary
      },
    ];
    const emaildata= {
         receiver_email: supplierEmail,
         subject: 'Demo Email',
         message: 'This is a test email sent via API.',
         attachments: attachments,

    }

    SendPaymentAdvice(emaildata,'htssuite').then((items:any)=> {
      console.log("sendemail",items)
      if(items.status === 200){
        isSuccess('Emaill Successfully Sent', 'success')
        
      } 
      else {
        isSuccess('Something Went Wrong', 'success')
      }
    })
    // console.log(attachments)
    // const response = await axios.post(
    //   'http://64.227.147.2:8000/api/method/htssuite.utility.sender_email',
    //   {
    //     data: {
    //       receiver_email: '',
    //       subject: 'Demo Email',
    //       message: 'This is a test email sent via API.',
    //       attachments: attachments,
    //     },
    //   },
    //   {
    //     headers: headers,
    //   }
    // );

    // Log the response from the server
    // console.log(response.data);
  } catch (error) {
    // Handle errors, log or show error messages
    console.error('Error sending email:', error);
  }
};

// third




// const sendEmail = async (pdfData: any) => {
  // const generateAndSendEmail = async () => {
  
  //   try {
  //     const id : any = document.getElementById('bankpaymentadvice');
  //     const canvas = await html2canvas(id);
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF();
  //     pdf.addImage(imgData, 'JPEG', 10, 10, 190, 200);
  //     const pdfBase64 = pdf.output('datauristring').split(',')[1];
  //     // console.log("pdfBase64", pdfBase64)
  //     const attachments = [
  //       {
  //         base64: pdfBase64,
  //         filename: 'Bank_Payment_Advice.pdf',
  //         content_type: 'application/pdf', // Adjust content type if necessary
  //       },
  //     ];
  //     // console.log(attachments)
  //     const response = await axios.post(
  //       'http://64.227.147.2:8000/api/method/htssuite.utility.sender_email',
  //       {
  //         data: {
  //           receiver_email: '',
  //           subject: 'Demo Email',
  //           message: 'This is a test email sent via API.',
  //           attachments: attachments,
  //         },
  //       },
  //       {
  //         headers: headers,
  //       }
  //     );
  
  //     // Log the response from the server
  //     console.log(response.data);
  //   } catch (error) {
  //     // Handle errors, log or show error messages
  //     console.error('Error sending email:', error);
  //   }
  // };
  

  // second
  //  const generateAndSendEmail= ()=> {
  //   // debugger;
  //   // let pdf:any;
  //   // let data: any = [];
  //   const id:any = document.getElementById('bankpaymentadvice');
    
  //   const asyncfunc = async () => {
  //     const canvas = await html2canvas(id)
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF();
  //       pdf.addImage(imgData, 'JPEG', 10, 10, 190, 200);
  //       const pdfBase64 = pdf.output('datauristring');
  //       let attachments = [
  //         {
  //           base64: pdfBase64,
  //           filename: 'Bank_Payment_Advice.pdf'
  //         }
  //       ]
  
  //       const response = await axios
  //         .post(
  //           'http://64.227.147.2:8000/api/method/htssuite.utility.sender_email',
  //           {
  //             data: { 
  //               "receiver_email": "vibin@hutechsolutions.com",
  //               "subject": "Demo Email",
  //               "message": "This is a test email sent via API.",
  //               "attachments": attachments,
  //             }
  //           },
  //           {
  //             headers: headers
  //           }
  //         )
  //         // .then(function (response: any) {
  //           // handle success
      
  //           let data = response?.data?.message;
  //           console.log(data)
  //           // response?.data?.message?.fields?.map((items: any) =>
  //           //   data.push({
  //           //     label: items?.label,
  //           //     name: items?.fieldname,
  //           //     datatype: items?.datatype,
  //           //     options: null,
  //           //   })
  //           // );
  //         // })
  //         // .catch(function (error) {
  //         //   let data =
  //         //     error?.response?.data?._server_messages ||
  //         //     error?.response?.data?.message;
  //         // });

  //   }
    
  //   asyncfunc();
 
  // }


  return (
    <div>
        <Modal title="" open={openPdfView} footer={null} onCancel={()=>setOpenPdfView(null)} width={800}>
          <Button  onClick={generateAndSendEmail} >Share</Button>
          <Button onClick={()=>onDownloadPdf()} style={{marginLeft:"1rem"}}>Download</Button>
        <BankPaymentTemplate showdata={openPdfView}/>  
      </Modal>
        <div style={{ position: 'absolute', left: '-9999px' }} id="bankpaymentadvice">
        {/* {loading &&  */}
        <BankPaymentTemplate showdata={openPdfView}  />
        {/* } */}
      </div>
      {/* <Report
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
        showDownloadPaySlip={true} //not needed only pass when false
        showFilters={true} //not needed only pass when false
        // downloadExcel={onDownloadExcel}
      /> */}


       {/* <Panel>
        <div className={styles.panel_container}>
          <Spin loading={loading} />
          {showFilters ? (
            <Row>
              <Col span={24}>
                <SmnlFormDynamicLayout
                  sectionData={formData}
                  onChange={onHandleChangeFilter}
                  // appname="htssuite"
                  appname={appname || 'htssuite'}
                />
              </Col>
            </Row>
          ) : null}
         
          {showTable ? (
            <SmnlTable
              height={tableHeight}
              column={columnsData}
              dataSource={tableData}
              onChangePagination={onHandlePagination}
              
            />
          ) : null}
        </div>
      </Panel> */}
      <Panel>
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
           {pageData.pageTitle}
        </Col>
        
      </Row>
      <Row style={{marginTop:"2rem",marginLeft:"1rem"}}>
      <Col span={24}>
        
                <SmnlFormDynamicLayout
                  sectionData={formData}
                  onChange={onHandleChangeFilterHandler}
                  // appname="htssuite"
                  appname={'htsaccount'}
                />
              </Col>
              </Row>  
     
       <div style={{marginTop:"2rem",marginLeft:"1rem"}}>
      <Table  dataSource={tableData}column={columnsData}   />
      {/* <Row justify="end">
    
      <Col xs={24} sm={24} md={24} lg={16} xl={16}>
       
        <Button>
             Send Email
              </Button>
        
     
         
        </Col>
        
      </Row> */}
      </div>
      </Panel>
    </div>
  );
};

export default View;
