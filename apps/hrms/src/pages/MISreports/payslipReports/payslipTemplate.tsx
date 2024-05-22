import React from 'react';
import logo from '../../../../../../libs/common/assets/logo.svg';

type Props = {
data:any
}
const PayslipTemplate = (props: Props) => {
  const {data } = props; 
  return (
    <React.Fragment>
        {
           data?.length > 0 &&  data?.map((item:any) => {
               return <React.Fragment>
<div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '20px 0px',
        }}
      >
        <img src={logo} width="600" />
        <p style={{ fontSize: '14px', textAlign: 'center', margin: '20px 0px 0px 0px' }}>
          C/O Adani Krishnapatnam Port Ltd., Muthukur, Nellore,-524344
        </p>
        <p style={{ fontSize: '13px', textAlign: 'center' }}>
          Pay Slip for the Month of September 2023
        </p>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <tr>
            <td
              colSpan={3}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >

               <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}>Employee Code </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['Employee Id']}</p>
                </div> 
              
            </td>

            <td
              colSpan={2}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
                  <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}>Date of Joning </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['DOJ']}</p>
                </div> 
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
                  <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}> Employee Name </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['Employee Name']}</p>
                </div>  
                
                           </td>

            <td
              colSpan={2}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
                   <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}> Total Days </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['Total Days']}</p>
                </div> 
            </td>
          </tr>

          <tr>
            <td
              colSpan={3}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
                   <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}> Designation </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['Designation']}</p>
                </div> 
            </td>

            <td
              colSpan={2}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
                  <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}> Present Days </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['Present Days']}</p>
                </div> 
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
                  <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}> Department </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['Department']}</p>
                </div> 
            </td>
            <td
              colSpan={2}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
                  <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}> Leave Avalied </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['Leave Applied']}</p>
                </div> 
            </td>
          </tr>

          <tr>
            <td
              colSpan={3}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
                   <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}> UAN No. </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['UAN']}</p>
                </div> 
            </td>

            <td
              colSpan={2}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
                   <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}>Earned Days </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['Eraned Days']}</p>
                </div> 
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
                  <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}>Earned Days </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['Eraned Days']}</p>
                </div> 
            </td>

            <td
              colSpan={2}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
                 <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}>Balance Leaves </p>
              <p style={{ margin: '10px', width:"50%" }}> <span style={{paddingRight:"15px"}}>ML: {item?.['Balance Leave']?.['Maternity Leave']}</span>
              <br />
              <span style={{paddingRight:"15px"}}>PL : {item?.['Balance Leave']?.['Paid Leave']}</span>
              <br />

              {/* <span style={{paddingRight:"15px"}}>PLeave:{item?.['Balance Leave']?.['Paternity Leave']}</span> */}

              </p>
                </div> 
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
                   <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}>ESIC No </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['ESI']}</p>
                </div> 
            </td>

            <td
              colSpan={2}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
                 <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}>Bank A/c No </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['Payslip Data']?.['bank_details']?.['account_number']}</p>
                </div> 
            </td>
          </tr>

          <tr>
            <td
              colSpan={3}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
 <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}>Bank Name </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['Payslip Data']?.['bank_details']?.['bank_name']}</p>
                </div>             </td>

            <td
              colSpan={2}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
            <div style ={{display:"flex", width:"100%"}}>
               <p style={{ margin: '10px', width:"50%" }}>IFCS Code </p>
              <p style={{ margin: '10px', width:"50%" }}> {item?.['Payslip Data']?.['bank_details']?.['bank_ifsc_code']}</p>
                </div>  
            </td>
          </tr>
        </tbody>
      </table>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop:"10px" }}>
        <tbody>
          <tr>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> particulars </p>
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              {' '}
              <p style={{ margin: '10px' }}> Actual (Rs.) </p>
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              {' '}
              <p style={{ margin: '10px' }}> Earnings (Rs.) </p>
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}>Deductions </p>
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              {' '}
              <p style={{ margin: '10px' }}> Amount (Rs.) </p>
            </td>
          </tr>
          <tr>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}>Over Time </p>
            </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}>{item?.['Payslip Data']?.actuals?.OT}</p>
            </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}>{item?.['Payslip Data']?.earnings?.OT}</p>
            </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}> Professional Tax </p>
            </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}>{item?.['Payslip Data']?.deductions
?.PT}</p>
            </td>
          </tr>
          <tr>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}> Basic</p>
            </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
        <p style={{ margin: '10px' }}>{item?.['Payslip Data']?.actuals
?.Basic}</p>            </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
 <p style={{ margin: '10px' }}>{item?.['Payslip Data']?.earnings
?.Basic}</p>                        </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}> EPF </p>
            </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}>{item?.['Payslip Data']?.deductions

?.EPF}</p>
            </td>
          </tr>
          <tr>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}> Special Incentive </p>
            </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
<p style={{ margin: '10px' }}>{item?.['Payslip Data']?.actuals?.['Special Incentive']}</p>            </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
<p style={{ margin: '10px' }}>{item?.['Payslip Data']?.earnings?.['Special Incentive']}</p>      
            </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}> ESI </p>
            </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
<p style={{ margin: '10px' }}>{item?.['Payslip Data']?.deductions?.['ESI']}</p>      
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
              <p style={{ margin: '10px' }}> Total (A) </p>
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> {item?.['Payslip Data']?.total_actuals} </p>
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> {item?.['Payslip Data']?.total_earnings}</p>
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              {' '}
              <p style={{ margin: '10px' }}> Total (B) </p>
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              {' '}
              <p style={{ margin: '10px' }}> {item?.['Payslip Data']?.total_deductions}</p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={5}
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              {' '}
              <p style={{ margin: '10px' }}> Net Payable: ₹{item?.['Net Payable']} </p>
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
              colSpan={5}
            >
              <p style={{ margin: '10px' }}>
             Rupees {item?.['In Words']}
               
              </p>
            </td>
          </tr>
          {/* <tr>
            <td
              colSpan={5}
              style={{
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' , textAlign:"right"}}>
                {' '}
                Attendance taken from 26/08/2023 to 25/09/2023
              </p>
            </td>
          </tr> */}
        </tbody>
      </table>
      </React.Fragment>
            })
        }
      
    </React.Fragment>
  );
};
export default PayslipTemplate;
