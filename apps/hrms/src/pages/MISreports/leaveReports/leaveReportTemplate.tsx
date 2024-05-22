import React from 'react';
import logo from '../../../../../../libs/common/assets/logo.svg';

type Props = {
  data:any
}
const LeaveReportTemplate = (props: Props) => {
  const { data } = props
  return (
    <React.Fragment>
    
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
        <p style={{ fontSize: '14px', textAlign: 'center', margin: '0' }}>
          C/O Adani Krishnapatnam Port Ltd., Muthukur, Nellore,-524344
        </p>
        <p style={{ fontSize: '13px', textAlign: 'center' }}>
          Leave Report
        </p>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <tr>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              <p style={{ margin: '10px' }}> EmpCode </p>
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              {' '}
              <p style={{ margin: '10px' }}> Emp Name </p>
            </td>
    
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              {' '}
              <p style={{ margin: '10px' }}> Location </p>
            </td>
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              {' '}
              <p style={{ margin: '10px' }}> Leave Type </p>
            </td>
     
            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              {' '}
              <p style={{ margin: '10px' }}>
              Total Leave Balance </p>
            </td>
          </tr>
          {
           data?.length > 0 &&  data?.map((item:any) => {
               return (
          <tr>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}>{item?.['employee_data']?.['name']}</p>
            </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}>{item?.['employee_data']?.['full_name']}</p>
            </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}>{item?.['employee_data']?.['location_name']}</p>
            </td>
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}>{item?.['leave_name']}</p>
            </td>
          
            <td
              style={{ border: '1px solid black', borderCollapse: 'collapse' }}
            >
              <p style={{ margin: '10px' }}>{item?.['balance']}</p>
            </td>
          </tr>
        
           )})}
        </tbody>
      </table>      
    </React.Fragment>
  );
};
export default LeaveReportTemplate;
