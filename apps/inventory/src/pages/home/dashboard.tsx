import React from 'react';
import styles from './home.module.scss';
import { Typography, Button } from 'antd';

import Cookies from 'universal-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import { ReactComponent as CalendarIcon } from '../../assets/calendar.svg';
import { ReactComponent as MaintenanceIcon } from '../../assets/maintenance.svg';
import { ReactComponent as NoshowIcon } from '../../assets/noshow.svg';
import ReportTable from '../../../../../libs/common/ui/ReportTable/ReportTable';
import Maintenance from './maintenance';

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
          <Row gutter={16}>
            <Col span={8} className="gutter-row">
              <div className={styles.topCard}>
                <div className={styles.area}>
                  <div>
                    <p className={styles.title}>Scheduled Maintenace</p>
                    <p className={styles.mainTitle}>40</p>

                    <Link to="/" className={styles.link}>{`Know More >`}</Link>
                  </div>
                  <div>
                    <CalendarIcon />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8} className="gutter-row">
              <div className={styles.topCard}>
                <div className={styles.area}>
                  <div>
                    <p className={styles.title}>Unscheduled Maintenance</p>
                    <p className={styles.mainTitle}>26</p>

                    <Link to="/" className={styles.link}>{`Know More >`}</Link>
                  </div>
                  <div>
                    <MaintenanceIcon />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8} className="gutter-row">
              <div className={styles.topCard}>
                <div className={styles.area}>
                  <div>
                    <p className={styles.title}>No Show</p>
                    <p className={styles.mainTitle}>56</p>

                    <Link to="/" className={styles.link}>{`Know More >`}</Link>
                  </div>
                  <div>
                    <NoshowIcon />
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row style={{ margin: '20px 0' }}>
            <Col span={24} className="gutter-row">
              <Row>
                <Col span={24}>
                  <div className={styles.card}>
                    <Title style={{ margin: '10px 0' }} level={5}>
                      Maintenance Stats
                    </Title>
                    <Maintenance />
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: '20px' }}>
                <Col span={24}>
                  <div className={styles.card}>
                    <Title style={{ margin: '10px 0' }} level={5}>
                      Reported for Scheduled Maintenance
                    </Title>
                    <ReportTable
                      dataSource={[
                        {
                          vehicleno: 'D-02',
                          date: '05/12/2023',
                          status: 'Scheduled',
                        },
                        {
                          vehicleno: 'D-03',
                          date: '05/12/2023',
                          status: 'Scheduled',
                        },
                        {
                          vehicleno: 'D-05',
                          date: '05/12/2023',
                          status: 'Scheduled',
                        },
                        {
                          vehicleno: 'D-06',
                          date: '05/12/2023',
                          status: 'JC Created',
                        },
                      ]}
                      column={[
                        {
                          title: 'Vehicle No.',
                          dataIndex: 'vehicleno',
                        },
                        {
                          title: 'Date',
                          dataIndex: 'date',
                        },
                        {
                          title: 'Status',
                          dataIndex: 'status',
                        },
                      ]}
                    />
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: '20px' }}>
                <Col span={24}>
                  <div className={styles.card}>
                    <Title style={{ margin: '10px 0' }} level={5}>
                      Reported for Unscheduled Maintenance
                    </Title>
                    <ReportTable
                      dataSource={[
                        {
                          vehicleno: 'D-02',
                          date: '05/12/2023',
                          status: 'Scheduled',
                        },
                        {
                          vehicleno: 'D-03',
                          date: '05/12/2023',
                          status: 'Scheduled',
                        },
                        {
                          vehicleno: 'D-05',
                          date: '05/12/2023',
                          status: 'Scheduled',
                        },
                        {
                          vehicleno: 'D-06',
                          date: '05/12/2023',
                          status: 'JC Created',
                        },
                      ]}
                      column={[
                        {
                          title: 'Vehicle No.',
                          dataIndex: 'vehicleno',
                        },
                        {
                          title: 'Date',
                          dataIndex: 'date',
                        },
                        {
                          title: 'Status',
                          dataIndex: 'status',
                        },
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
            <Col span={24}>
              <div className={styles.card}>
                <Title style={{ margin: 0 }} level={5}>
                  Scheduled Vehicle List
                </Title>
                <span className={styles.subText}>
                  20 days view of scheduled maintenance
                </span>
                <Title style={{ marginTop: '20px' }} level={5}>
                  Today’s Schedule
                </Title>
                <ReportTable
                  dataSource={[
                    {
                      vehicleno: 'D-02',
                      date: '05/12/2023',
                      status: 'Scheduled',
                    },
                    {
                      vehicleno: 'D-03',
                      date: '05/12/2023',
                      status: 'Scheduled',
                    },
                    {
                      vehicleno: 'D-05',
                      date: '05/12/2023',
                      status: 'Scheduled',
                    },
                    {
                      vehicleno: 'D-06',
                      date: '05/12/2023',
                      status: 'JC Created',
                    },
                  ]}
                  column={[
                    {
                      title: 'Vehicle No.',
                      dataIndex: 'vehicleno',
                    },
                    {
                      title: 'Date',
                      dataIndex: 'date',
                    },
                    {
                      title: 'Status',
                      dataIndex: 'status',
                    },
                  ]}
                />

                <Title style={{ marginTop: '20px' }} level={5}>
                  Upcoming Schedules
                </Title>
                <ReportTable
                  dataSource={[
                    {
                      vehicleno: 'D-02',
                      date: '05/12/2023',
                      status: 'Scheduled',
                    },
                    {
                      vehicleno: 'D-03',
                      date: '05/12/2023',
                      status: 'Scheduled',
                    },
                    {
                      vehicleno: 'D-05',
                      date: '05/12/2023',
                      status: 'Scheduled',
                    },
                    {
                      vehicleno: 'D-06',
                      date: '05/12/2023',
                      status: 'JC Created',
                    },
                  ]}
                  column={[
                    {
                      title: 'Vehicle No.',
                      dataIndex: 'vehicleno',
                    },
                    {
                      title: 'Date',
                      dataIndex: 'date',
                    },
                    {
                      title: 'Status',
                      dataIndex: 'status',
                    },
                  ]}
                />
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={24}>
              <div className={styles.card}>
                <Title style={{ marginTop: '20px' }} level={5}>
                  No Show Vehicles List
                </Title>
                <ReportTable
                  dataSource={[
                    {
                      vehicleno: 'D-02',
                      date: '05/12/2023',
                      status: 'Scheduled',
                    },
                    {
                      vehicleno: 'D-03',
                      date: '05/12/2023',
                      status: 'Scheduled',
                    },
                    {
                      vehicleno: 'D-05',
                      date: '05/12/2023',
                      status: 'Scheduled',
                    },
                    {
                      vehicleno: 'D-06',
                      date: '05/12/2023',
                      status: 'JC Created',
                    },
                  ]}
                  column={[
                    {
                      title: 'Vehicle No.',
                      dataIndex: 'vehicleno',
                    },
                    {
                      title: 'Date',
                      dataIndex: 'date',
                    },
                    {
                      title: 'Status',
                      dataIndex: 'status',
                    },
                  ]}
                />
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
