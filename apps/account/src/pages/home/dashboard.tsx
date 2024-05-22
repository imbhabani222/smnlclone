import React from 'react';
import styles from './home.module.scss';
import { Typography, Button } from 'antd';

import Cookies from 'universal-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import { ReactComponent as CalendarIcon } from '../../assets/payable.svg';
import { ReactComponent as MaintenanceIcon } from '../../assets/receivables.svg';
import { ReactComponent as NoshowIcon } from '../../assets/expenses.svg';
import ReportTable from '../../../../../libs/common/ui/ReportTable/ReportTable';
import Maintenance from './maintenance';
import EMI from './emi';
import Opeeation from './operation';
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
        <Col span={11}>
          <Row style={{ margin: '0px 0' }}>
            <Col span={24} className="gutter-row">
              <Row style={{ marginTop: '0px' }}>
                <Col span={24}>
                  <div className={styles.card}>
                    <Title style={{ margin: '10px 0' }} level={5}>
                      Payment Schedule for Suppliers
                    </Title>
                    <ReportTable
                      dataSource={[
                        {
                          billno: '1103950',
                          date: '05/12/2023',
                        },
                        {
                          billno: '1103950',
                          date: '05/12/2023',
                        },
                        {
                          billno: '1103950',
                          date: '05/12/2023',
                        },
                        {
                          billno: '1103950',
                          date: '05/12/2023',
                        },
                        {
                          billno: '1103950',
                          date: '05/12/2023',
                        },
                      ]}
                      column={[
                        {
                          title: 'Bill No',
                          dataIndex: 'billno',
                        },
                        {
                          title: 'Schedule Date',
                          dataIndex: 'date',
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
                      GST Payment Date
                    </Title>
                    <ReportTable
                      dataSource={[
                        {
                          supplierno: 'D-02',
                          suppliername:
                            'Sampath Constructions And Estates Private Limited',
                          date: '05/12/2023',
                        },
                        {
                          supplierno: 'D-02',
                          suppliername:
                            'Sampath Constructions And Estates Private Limited',
                          date: '05/12/2023',
                        },
                        {
                          supplierno: 'D-02',
                          suppliername:
                            'Sampath Constructions And Estates Private Limited',
                          date: '05/12/2023',
                        },
                        {
                          supplierno: 'D-02',
                          suppliername:
                            'Sampath Constructions And Estates Private Limited',
                          date: '05/12/2023',
                        },
                        {
                          supplierno: 'D-02',
                          suppliername:
                            'Sampath Constructions And Estates Private Limited',
                          date: '05/12/2023',
                        },
                      ]}
                      column={[
                        {
                          title: 'Supplier No',
                          dataIndex: 'supplierno',
                        },
                        {
                          title: 'Supplier Name',
                          dataIndex: 'suppliername',
                        },
                        {
                          title: 'Date',
                          dataIndex: 'date',
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
                      Purchase Invoice
                    </Title>
                    <ReportTable
                      dataSource={[
                        {
                          suppliername:
                            'Sampath Constructions And Estates Private Limited',
                          date: '05/12/2023',
                          dueamount: '11,93090.50',
                        },
                        {
                          dueamount: '11,93090.50',
                          suppliername:
                            'Sampath Constructions And Estates Private Limited',
                          date: '05/12/2023',
                        },
                        {
                          dueamount: '11,93090.50',
                          suppliername:
                            'Sampath Constructions And Estates Private Limited',
                          date: '05/12/2023',
                        },
                        {
                          dueamount: '11,93090.50',
                          suppliername:
                            'Sampath Constructions And Estates Private Limited',
                          date: '05/12/2023',
                        },
                        {
                          dueamount: '11,93090.50',
                          suppliername:
                            'Sampath Constructions And Estates Private Limited',
                          date: '05/12/2023',
                        },
                      ]}
                      column={[
                        {
                          title: 'Date',
                          dataIndex: 'date',
                        },
                        {
                          title: 'Supplier Name',
                          dataIndex: 'suppliername',
                        },
                        {
                          title: 'Due Amount',
                          dataIndex: 'dueamount',
                        },
                      ]}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={13}>
          <Row>
            <Col span={24}>
              <div className={styles.card}>
                <Title style={{ margin: '10px 0' }} level={5}>
                  Supplier Payment Summary
                </Title>
                <Maintenance />
              </div>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: '20px' }}>
            <Col span={8} className="gutter-row">
              <div className={styles.topCard}>
                <div className={styles.area}>
                  <div>
                    <p className={styles.title}>Total Payables</p>
                    <p className={styles.mainTitle} style={{ display: 'flex' }}>
                      <span style={{ fontSize: '28px', fontWeight: '400' }}>
                        ₹
                      </span>
                      12000
                    </p>
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
                    <p className={styles.title}>Total Receivables</p>
                    <p className={styles.mainTitle} style={{ display: 'flex' }}>
                      <span style={{ fontSize: '28px', fontWeight: '400' }}>
                        ₹
                      </span>
                      12000
                    </p>
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
                    <p className={styles.title}>Total Expenses</p>
                    <p className={styles.mainTitle} style={{ display: 'flex' }}>
                      <span style={{ fontSize: '28px', fontWeight: '400' }}>
                        ₹
                      </span>
                      12000
                    </p>
                  </div>
                  <div>
                    <NoshowIcon />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={24}>
              <div className={styles.card}>
                <Title style={{ margin: '25px 0' }} level={5}>
                  EMI per Month
                </Title>
                <EMI />
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={24}>
              <div className={styles.card}>
                <Title style={{ margin: '25px 0' }} level={5}>
                  Operational Cost
                </Title>
                <Opeeation />
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
