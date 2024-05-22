import moment from 'moment';
import { Divider, Row, Col, Select } from 'antd';


export const Filter = ({ allowanceOptions, handleChangeFilter}: any) => {

    return (
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            // padding: '15px 20px',
          }}
        >
          <Row
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
            }}
          >
            {allowanceOptions && (
              <Col span={3}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select Allowance Type"
                  onChange={(e) => handleChangeFilter(e, 'all_type')}
                  allowClear
                  options={allowanceOptions}
                />
              </Col>
            )}
            <Col span={3}>
              <Select
                style={{ width: '100%' }}
                placeholder="Select Month"
                onChange={(e) => handleChangeFilter(e, 'select_month')}
                allowClear
                options={[
                  {
                    value: moment()
                      .subtract(1, 'month')
                      .startOf('month')
                      .format('MMMM'),
                    label: moment()
                      .subtract(1, 'month')
                      .startOf('month')
                      .format('MMMM'),
                  },
                ]}
              />
            </Col>
            <Col span={3}>
              <Select
                style={{ width: '100%' }}
                placeholder="Select Year"
                onChange={(e) => handleChangeFilter(e, 'select_year')}
                allowClear
                options={[
                  {
                    value: moment().format('YYYY'),
                    label: moment().format('YYYY'),
                  },
                ]}
              />
            </Col>
          </Row>
        </div>
        <Divider style={{ margin: '0 0 10px 0' }} />
      </div>
    );
  
  }