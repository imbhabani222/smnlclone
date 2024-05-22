
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
let reporttitle:any

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


export const onDownloadPdf1 = (tableData:any,columnd:any,reportname:string,titlestart:number,titleend:number,pagewidth:number,pageheight:number)=>{
  console.log("tableData",tableData)
  let mapedData:any
  let customWidth = pagewidth;
  let customHeight = pageheight;
  console.log("custom width",customWidth)
  console.log("custom height",customHeight)
  // const rep :any = new jsPDF('p', 'pt')
    const rep :any = new jsPDF('landscape', 'pt')

  // rep.setPageSize({ width: customWidth, height: customHeight });
  const data = [...tableData]
  console.log("data",data)
  if (reportname==="PurchaseInvoice"){
    // columnd.unshift("Sl No")
    if(reportname==="PurchaseInvoice"){
      reporttitle="Purchase Invoice"
  
    }

   mapedData = data?.map((item:any, index:any)=>[
    `${index +1}`,
    item?.date,
    item?.invoice_no,
    item?.supplier?.supplier,
    item?.product_value,
    item?.discount_value,
    // item?.gross_value,
    item?.gst_value,
    item?.tcs,
    item?.invoice_value,
   



  ])
  
} 
 else if(reportname==="PurchaseReturn"){
  if(reportname==="PurchaseReturn"){
    reporttitle="Purchase Return"

  }
  
  mapedData = data?.map((item:any, index:any)=>[
    `${index +1}`,
    item?.return,
    item?.return_date,
    item?.supplier?.supplier,
    item?.grn_return?.grn_return,
    item?.return_date,
    item?.product_cost,
    item?.discount,
    item?.tax,
    item?.tcs,
    item?.invoice_value,
   



  ])
  // columnd.unshift("Sl No")

 }

else  if(reportname=="CreditNoteWithGst"){
  // columnd.unshift("Sl No")
  if(reportname==="CreditNoteWithGst"){
    reporttitle="Credit Note With GST"

  }
  mapedData = data?.map((item:any, index:any)=>[
    `${index +1}`,
    item?.name,
    item?.voucher_date,
    item?.ref_no,    
    item?.ledger_ac?.ledger_ac,
    item?.product_value,
    item?.discount,
    // item?.gross,
    item?.tax,
    item?.tcs,
    item?.invoice_value,
   



  ])
  // columnd.unshift("Sl No")

 }
 else if(reportname==="DeditNoteWithGst"){
 
  if(reportname==="DeditNoteWithGst"){
    reporttitle="Debit Note With GST"

  }
  mapedData = data?.map((item:any, index:any)=>[
    `${index +1}`,
    item?.name,
    item?.voucher_date,
    item?.ref_no,    
    item?.ledger_ac?.ledger_ac,
    item?.product_value,
    // item?.discount,
    // item?.gross,
    item?.tax,
    item?.tcs,
    item?.invoice_value,  
   



  ])

 } 
 else if(reportname==="ServiceExpense") {

  if(reportname==="ServiceExpense"){
    reporttitle="Service Expense"

  }
  mapedData = data?.map((item:any, index:any)=>[
    `${index +1}`,
    item?.invoice_no,
    item?.inv_date,
    item?.ref_no,    
    item?.ledger?.ledger,
    item?.product_value,
    item?.discount,
    // item?.gross,
    item?.tax,
    item?.tcs,
    item?.invoice_value,
    item?.narration,
   
   



  ])


 }




  console.log("columd",columnd, mapedData)
  
  rep.html(document.querySelector(`#${reportname}`),{
    callback: function (pdf:any){
      rep.setFontSize(18)
      rep.text(
        `C/O Adani Krishnapatnam Port Ltd., Muthukur, Nellore, - 524344`,
        155,100
      )
      rep.setFontSize(28);
      rep.text(reporttitle,275,145);
      autoTable(rep, {
        theme : 'grid',
        head : [columnd],
        body : mapedData,
        startY : 180,
        styles : styles,
        headStyles : headerStyles,
        bodyStyles : bodyStyle,
      });
      pdf.save(`${reportname}.pdf`)
    }
  })
}