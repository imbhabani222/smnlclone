import React from 'react';
import styles from './home.module.scss';
import { Typography, Button } from 'antd';

import Cookies from 'universal-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
// import { ReactComponent as CalendarIcon } from '../../assets/calendar.svg';
// import { ReactComponent as MaintenanceIcon } from '../../assets/maintenance.svg';
// import { ReactComponent as NoshowIcon } from '../../assets/noshow.svg';
import ReportTable from '../../../../../libs/common/ui/ReportTable/ReportTable';
import Maintenance from './taskstatus';
import ShiftInfo from './shiftinformation';
import VehicleStats from './vehiclestats';
import Drivestats from './drivestats';

const { Title } = Typography;

const holidayList: any = [];
const Home = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const name =
    cookies.get('userid') ||
    cookies.get('username')?.charAt(0).toUpperCase() +
      cookies.get('username')?.slice(1);
  const handleNavigation = (link: string) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className={styles.dashboard}>
      <Row gutter={24}>
        <Col span={24}>
          <div className={styles.dashboard__widgets}>
            <div className={styles.dashboard__widgets__greeting}>
              <Title
                style={{
                  margin: '0px',
                  display: 'flex',
                  flexDirection: 'row',
                  fontSize: '30px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '38px',
                  color: '#101828',
                }}
              >
                Welcome Back, Sanjay 👋🏻
              </Title>
              <Title
                level={5}
                style={{
                  color: '#667085',
                  margin: 0,
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '24px',
                }}
              >
                Here is what you might be looking to see today
              </Title>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={16}>
          <Row style={{ margin: '0px 0' }}>
            <Col span={24} className="gutter-row">
              <Row>
                <Col span={24}>
                  <div className={styles.card}>
                    <Title style={{ margin: '10px 0 25px 0' }} level={5}>
                      Task Status
                    </Title>
                    <Maintenance />
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: '20px' }}>
                <Col span={24}>
                  <div className={styles.card}>
                    <Title style={{ margin: '10px 0 25px 0' }} level={5}>
                      Task in progress
                    </Title>
                    <ReportTable
                      dataSource={[
                        {
                          taskno: 'D-02',
                          commodity: 'Coal',
                          tat: 10000,
                          rtat: 4000,
                        },
                        {
                          taskno: 'D-03',
                          commodity: 'Coal',
                          tat: 10000,
                          rtat: 4000,
                        },
                        {
                          taskno: 'D-05',
                          commodity: 'Coal',
                          tat: 10000,
                          rtat: 4000,
                        },
                        {
                          taskno: 'D-06',
                          commodity: 'Coal',
                          tat: 10000,
                          rtat: 4000,
                        },
                      ]}
                      column={[
                        {
                          title: 'Task No.',
                          dataIndex: 'taskno',
                        },
                        {
                          title: 'Commodity',
                          dataIndex: 'commodity',
                        },
                        {
                          title: 'Total Tonnage',
                          dataIndex: 'tat',
                        },
                        {
                          title: 'Remaining Tonnage',
                          dataIndex: 'rtat',
                        },
                        // {
                        //   title: 'Status',
                        //   dataIndex: 'status',
                        // },
                      ]}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            {/* <Col span={24}>
              <div className={styles.card}>
                <Title style={{ margin: '10px 0 25px 0' }} level={5}>
                  Shift Information
                </Title>
                <ShiftInfo />
              </div>
            </Col> */}
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={24}>
              <div className={styles.card}>
                <Title style={{ margin: '10px 0 25px 0' }} level={5}>
                  Vehicle Stat
                </Title>
                <VehicleStats />
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={24}>
              <div className={styles.card}>
                <Title style={{ marginTop: '20px' }} level={5}>
                  Driver Stat
                </Title>
                <Drivestats />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Col span={16}>
        <Row gutter={16} style={{ margin: '20px 0' }}></Row>
      </Col>
    </div>
  );
};

export default Home;
