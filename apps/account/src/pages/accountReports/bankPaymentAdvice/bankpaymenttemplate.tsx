import React from 'react';
import logo from '../../../../../../libs/common/assets/logo.svg';

const BankPaymentTemplate = (showdata:any) => {
//  debugger;
  console.log("showdata",showdata)
  // const {account_name,address1,address2,chequeno,city,printdate,supplier_name,totalamount,voucher  }=showdata?.showdata
  // console.log("an",account_name)
  // console.log("s",supplier_name)
  let printdate,totalamount,voucher,chequeno,account_name,address1,address2,city,supplier_name,bank_name,ifsc_code,account_no,documentdate,documentno,issuedfrom, modeofPayment
  if(showdata?.showdata){
    printdate = showdata?.showdata?.printdate
    totalamount= showdata?.showdata?.totalamount
    voucher= showdata?.showdata?.voucher
    chequeno=showdata?.showdata?.chequeno
    account_name=showdata?.showdata?.account_name
    address1=showdata?.showdata?.address1
    address2=showdata?.showdata?.address2 
    city=showdata?.showdata?.city 
    supplier_name=showdata?.showdata?.supplier_name
    bank_name=showdata?.showdata?.bank_name
    ifsc_code=showdata?.showdata?.ifsc_code
    account_no=showdata?.showdata?.account_no
    documentdate=showdata?.showdata?.documentdate
    documentno=showdata?.showdata?.documentno
    issuedfrom=showdata?.showdata?.issuedfrom
    modeofPayment = showdata?.showdata?.modeofPayment



  }
  // console.log("cheqno",chequeno)

  // console.log("show----",showdata,"dataval-----",totalamount,voucher)
//   let totalamount
//   // const totalamount=sd?.showdata?.totalamount
//   if(sd?.showdata["totalamount"]){
//    totalamount=sd?.showdata?.totalamount
//   }
//   else 
//   {
// totalamount=0
//   }
  // const printdate=sd?.showdata["printdate"]
  // const voucherdata=sd?.showdata["voucher"]
  // console.log("printdate",printdate)
  return (
    <React.Fragment>
      <div
        style={{
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          // flexDirection: 'column',
          margin: '20px 0px',
        }}
      >
        {/* <img src={logo} width="600" /> */}
       
      
        <div>
          <h2 style={{ fontSize: '14px', textAlign: 'center', margin: '0' }}>ABC company</h2>
          <p style={{ fontSize: '14px', textAlign: 'center', margin: '0' }}>No 24 Ghandhi Nagar</p>
          <p style={{ fontSize: '14px', textAlign: 'center', margin: '0' }}>Banglore</p>
          <p style={{ fontSize: '14px', textAlign: 'center', margin: '0' }}><b><u>Payment Advice</u></b></p>


        </div>
       <div style={{display:"flex",justifyContent:"space-between" }}>
        <div >
            <h3 style={{lineHeight:"1px"}}>{supplier_name}</h3>
            <p style={{lineHeight:"1px"}}>{address1}</p>
            <p style={{lineHeight:"1px"}}>{city} </p>
            {/* <p style={{lineHeight:"1px"}}>3rd Cross 5th Main, jayanagar</p> */}
        </div>
        <div style={{ float: "left" }}>
            <p>Date <b>{printdate}</b> </p>
        </div>
       </div>
       
        <p>Dear Sir/Madam</p>
        <p>Please find below the payment details </p>
       
      
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <tr>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> Bill Ref</p>
            </th>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> Bill Date</p>
            </th>
            <th
               colSpan={3}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> Amount</p>
            </th>
            </tr>
            <tr>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> New Ref/Bill Apr {documentno}</p>
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> {documentdate}</p>
            </td>
            <td
              colSpan={3}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> {totalamount}</p>
            </td>
            </tr>
            <tr>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> </p>
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> Net Amount</p>
            </td>
            <td
              colSpan={3}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> {totalamount}</p>
            </td>
            </tr>
            </tbody>
      </table>
            <table style={{ borderCollapse: 'collapse', width: '100%', marginTop:'8px' }}>
           <tr>
            <th
          colSpan={5}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
                
              }}
            >
              <p style={{ margin: '10px' }}> Payment Details</p>
            </th>
            </tr>
            <tr>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> Payment Mode</p>
            </th>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> Transfered to</p>
            </th>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> Instrument Details</p>
            </th>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> Issued From</p>
            </th>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> Amount</p>
            </th>
            </tr>
            <tr>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}>{modeofPayment} </p>
            </th>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}>A/c No:{ account_no} </p>
              <p style={{ margin: '10px' }}>Bank: { bank_name}</p>
              <p style={{ margin: '10px' }}>IFSC: { ifsc_code}</p>
            </th>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}></p>
            </th>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}>  {issuedfrom}</p>
            </th>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}>{totalamount}</p>
            </th>
            </tr>

            <tr>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> </p>
            </th>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> </p>
            </th>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}></p>
            </th>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> Total</p>
            </th>
            <th
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}>{totalamount}</p>
            </th>
            </tr>

            </table>
            <p>Kindly acknowledge the receipt</p>
            <p>Thanking You</p>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <p>Authorised Signatory</p>
              <p>Receiver's Signature</p>
            </div>
          {/* {data?.length > 0 &&
            data?.map((item: any) => {
              return (
                <tr>
                  <td
                    style={{
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <p style={{ margin: '10px' }}>{item?.['Employee Id']}</p>
                  </td>
            
                  <td
                    style={{
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <p style={{ margin: '10px' }}>{item?.['Employee Name']}</p>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <p style={{ margin: '10px' }}>{item?.['DOJ']}</p>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <p style={{ margin: '10px' }}>{item?.['ESI Number']}</p>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <p style={{ margin: '10px' }}>{item?.['ESI Amount']}</p>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <p style={{ margin: '10px' }}>{item?.['Working Days']}</p>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <p style={{ margin: '10px' }}>{item?.['LOP']}</p>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <p style={{ margin: '10px' }}>{item?.['Work Location']}</p>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <p style={{ margin: '10px' }}>{item?.['Total Earning']}</p>
                  </td>
                </tr>
              );
            })} */}
       
    </React.Fragment>
  );
};
export default BankPaymentTemplate;
