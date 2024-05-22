import React from 'react';
import logo from '../../../../../../libs/common/assets/logo.svg';

type Props = {
  data:any
}
const PFReportTemplate = (props: Props) => {
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
        <p style={{ fontSize: '13px', textAlign: 'center' }}>PF Report</p>
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
              <p style={{ margin: '10px' }}> Emp Code </p>
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
              <p style={{ margin: '10px' }}> PF No </p>
            </td>

            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              {' '}
              <p style={{ margin: '10px' }}>Total Earning</p>
            </td>

            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              {' '}
              <p style={{ margin: '10px' }}>Employee PF</p>
            </td>

            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              {' '}
              <p style={{ margin: '10px' }}>Employer PF </p>
            </td>

            <td
              style={{
                fontWeight: 'bold',
                border: '1px solid black',
                borderCollapse: 'collapse',
              }}
            >
              {' '}
              <p style={{ margin: '10px' }}>Pension</p>
            </td>
          </tr>
          {data?.length > 0 &&
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
                    <p style={{ margin: '10px' }}>{item?.['EPF']}</p>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <p style={{ margin: '10px' }}>{item?.['Total Earning']}</p>
                  </td>

                  <td
                    style={{
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <p style={{ margin: '10px' }}>{item?.['Employee PF']}</p>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <p style={{ margin: '10px' }}>{item?.['Employer PF']}</p>
                  </td>
                  <td
                    style={{
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <p style={{ margin: '10px' }}>{item?.['Pension']}</p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </React.Fragment>
  );
};
export default PFReportTemplate;
