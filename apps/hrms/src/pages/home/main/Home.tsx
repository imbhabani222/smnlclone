import React, { useEffect, useState } from 'react';
import styles from '../home.module.scss';
import { Typography, Button } from 'antd';
//@ts-ignore

import { ReactComponent as AssetManagement } from '../../../../../../libs/common/assets/hrmsDashboardSvg/icons/assetsManagement.svg';
import { ReactComponent as EmployeeManagement } from '../../../../../../libs/common/assets/hrmsDashboardSvg/icons/employeeManagement.svg';
import { ReactComponent as ExpenseReimbursement } from '../../../../../../libs/common/assets/hrmsDashboardSvg/icons/expenseMng.svg';
import { ReactComponent as LeaveManagement } from '../../../../../../libs/common/assets/hrmsDashboardSvg/icons/leaveManagement.svg';
import { ReactComponent as MisReports } from '../../../../../../libs/common/assets/hrmsDashboardSvg/icons/misReports.svg';
import { ReactComponent as MasterData } from '../../../../../../libs/common/assets/hrmsDashboardSvg/icons/masterData.svg';
import { ReactComponent as PayrollConfiguration } from '../../../../../../libs/common/assets/hrmsDashboardSvg/icons/payrollConfig.svg';
import { ReactComponent as PayrollProcessing } from '../../../../../../libs/common/assets/hrmsDashboardSvg/icons/payrollPrcessing.svg';
import { ReactComponent as TravelRequisition } from '../../../../../../libs/common/assets/hrmsDashboardSvg/icons/travelRequistion.svg';
import { ReactComponent as Utilities } from '../../../../../../libs/common/assets/hrmsDashboardSvg/icons/utilities.svg';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import News from '../components/News';
import Holiday from '../components/Holiday';
import { AnimatePresence, motion } from 'framer-motion';
import SalaryChart from '../charts/BarChart';
import ShiftwiseAttendance from '../charts/DoughnutChart';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import { Displayletterbyletter } from '../../../../../../libs/common/utils/animations/variants';
import {
  getSalaryYear,
  getNoticeEmployee,
  getPresentEmployee,
  getEmpBirthday,
} from '../../../../../../libs/common/api/doctype';
import Avatar from 'antd/es/avatar/avatar';
const { Title } = Typography;

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const dashboardWidgetsData = [
  { label: 'Master Data', icon: MasterData, Link: '/view-state' },
  {
    label: 'Employee Management',
    icon: EmployeeManagement,
    Link: '/view-employee-details',
  },
  {
    label: 'Leave Management',
    icon: LeaveManagement,
    Link: '/leave-setup',
  },
  {
    label: 'Payroll Configuration',
    icon: PayrollConfiguration,
    Link: '/create-income-tax-slabs',
  },
  {
    label: 'Payroll Processing',
    icon: PayrollProcessing,
    Link: '/view-employee-salary-pay-master',
  },
  {
    label: 'Expense & Reimbursement',
    icon: ExpenseReimbursement,
    Link: '/view-reimbursement-request',
  },

  {
    label: 'Assets Management',
    icon: AssetManagement,
    Link: '/view-brand-master',
  },
  {
    label: 'Travel Requisition',
    icon: TravelRequisition,
    Link: '/view-travel',
  },
  { label: 'Utility', icon: Utilities, Link: '/view-news-entry' },
  { label: 'MIS Reports', icon: MisReports, Link: '/view-payslip-report' },
  // { label: 'Statutory Reports', icon: StatutoryReportsSVG, disabled: true },
  // { label: 'Settings', icon: SettingsSVG, disabled: true },
];
const holidayList: any = [];

const dt = new Date();
dt.setDate(dt.getDate() - 1);

const Home = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [salaryData, setsalaryData] = useState([]);
  const [noticeEmployeeData, setNoticeEmployeeData] = useState([]);
  const [year, setyear] = useState(dayjs().format('YYYY'));
  const [empDate, setempDate] = useState(dayjs(dt).format('YYYY-MM-DD'));
  const [attendanceData, setattendanceData] = useState<any>([]);
  const [birthDay, setbirthDay] = useState<any>([]);

  const name =
    cookies.get('userid') ||
    cookies.get('username')?.charAt(0).toUpperCase() +
      cookies.get('username')?.slice(1);
  const handleNavigation = (link: string) => {
    if (link) {
      navigate(link);
    }
  };
  const tittleAnimstion: any = {
    hower: {
      rotate: [0, 30, 0],
      transition: {
        repeat: 10,
        type: 'tween',
        duration: 0.3,
      },
    },
    handanimation: {
      rotate: [0, 30, 0],
      transition: {
        delay: 1.1,
        repeat: 10,
        type: 'tween',
        duration: 0.3,
      },
    },
    intial: { x: '-100vw' },
    showonce: {
      x: [null, 0],
      transition: {
        //duration: 2,
        ease: 'linear',
        delay: 1.8,
      },
    },
  };
  const widgetContaineranimation: any = {
    show: {
      y: 0,
      transition: {
        //  delay: 1,
        duration: 1,
        when: 'beforeChildren',
        staggerChildren: 0.1,
        delayChildren: 0.2,
        staggerDirection: -1,
      },
    },
    hidden: { y: '-100vh' },
  };
  const widgetsanimation: any = {
    show: {
      y: 0,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
    hidden: { y: '-100vh', x: '-100vw' },
  };
  const d = dayjs().format();

  useEffect(() => {
    getSalaryYear(year).then((items: any) => {
      const neitems = items.map((e: any) => {
        return {
          month: e?.month,
          'Net Salary': e?.net_salary,
        };
      });
      setsalaryData(neitems);
    });
  }, [year]);

  useEffect(() => {
    getPresentEmployee(empDate).then((items: any) => {
      // setattendaceDate(items);

      if (items?.total) {
        setattendanceData([
          { name: 'Present', value: items?.present },
          {
            name: 'Absent',
            value: parseInt(items?.total) - parseInt(items?.present),
          },
          // { name: 'Total', value: items?.total },
        ]);
      }
    });
  }, [empDate]);

  useEffect(() => {
    getNoticeEmployee().then((items: any) => {
      setNoticeEmployeeData(items);
    });
    getEmpBirthday().then((items: any) => {
      setbirthDay(items);
    });
  }, []);

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
                }}
              >
                <motion.div>
                  {` Welcome back, ${name || ' '}${' '}`
                    .split('')
                    .map((i: any, index: any) => {
                      return (
                        <motion.span
                          // initial="initial"
                          // variants={Displayletterbyletter}
                          // animate={'animate'}
                          // custom={index}
                          key={index}
                        >
                          {i}
                        </motion.span>
                      );
                    })}
                </motion.div>
                <motion.div
                // variants={tittleAnimstion}
                // whileHover={'hower'}
                // animate="handanimation"
                >
                  👋🏻
                </motion.div>
              </Title>
              <Title level={5} style={{ color: '#667085', margin: 0 }}>
                <motion.div
                // variants={tittleAnimstion}
                // initial="intial"
                // animate="showonce"
                >
                  {' '}
                  Here is what you might be looking to see today
                </motion.div>
              </Title>
            </div>
            <div className={styles.dashboard__widgets__content}>
              {dashboardWidgetsData.map((item: any, index) => {
                const cursor = item?.disabled ? 'not-allowed' : 'pointer';
                return (
                  <div
                    // variants={widgetsanimation}
                    onClick={(e) => {
                      handleNavigation(item?.Link);
                    }}
                    style={{ cursor: `${cursor}` }}
                    className={styles.dashboard__widgets__content_item}
                    key={index}
                  >
                    <item.icon />
                    <span className={styles.widjetsLabel}>{item.label}</span>
                  </div>
                  // </Button>
                );
              })}
            </div>
            {/* <motion.div
              initial="hidden"
              animate="show"
              variants={widgetContaineranimation}
              className={styles.dashboard__widgets__content}
            >
              <AnimatePresence>
             
              </AnimatePresence>
            </motion.div> */}
          </div>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={16}>
          <Row gutter={16}>
            <Col span={12} className="gutter-row">
              <div className={styles.card}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '18px',
                      color: '#272727',
                      paddingLeft: '20px',
                    }}
                  >
                    Monthly Salaries
                  </h2>
                  <div>
                    <DatePicker
                      defaultValue={dayjs(d, 'YYYY')}
                      format={'YYYY'}
                      picker="year"
                      onChange={(date, dateString: any) => setyear(dateString)}
                      disabledDate={(current) => {
                        let customDate = dayjs().format('YYYY-MM-DD');
                        return (
                          current && current > dayjs(customDate, 'YYYY-MM-DD')
                        );
                      }}
                    />
                  </div>
                </div>

                <div style={{ padding: '10px 0' }}>
                  <SalaryChart salaryData={salaryData} />
                </div>
              </div>
            </Col>
            <Col span={12} className="gutter-row">
              <div className={styles.card}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '18px',
                      color: '#272727',
                      paddingLeft: '20px',
                    }}
                  >
                    Attendance
                  </h2>
                  <div>
                    <DatePicker
                      onChange={(date, dateString: any) =>
                        setempDate(dateString)
                      }
                      defaultValue={dayjs(empDate, 'YYYY-MM-DD')}
                      format={'YYYY/MM/DD'}
                      picker="date"
                      disabledDate={(current) => {
                        let customDate = dayjs().format('YYYY-MM-DD');
                        return (
                          current && current > dayjs(customDate, 'YYYY-MM-DD')
                        );
                      }}
                    />
                  </div>
                </div>
                <div style={{ padding: '10px 0' }}>
                  <ShiftwiseAttendance attendanceData={attendanceData} />
                </div>
              </div>
            </Col>
          </Row>
          <Row style={{ margin: '20px 0' }}>
            <Col span={24} className="gutter-row">
              <News noticeEmployeeData={noticeEmployeeData} />
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={24}>
              <Holiday />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className={styles.dashboard__BirtdayWishes}>
                <Title style={{ margin: 0 }} level={5}>
                  Birthday & Work Anniversaries
                </Title>
                <span className={styles.subText}>
                  Wish and celebrate SMNL employees birthday and work
                  Anniversaries
                </span>
                {birthDay && birthDay?.length > 0
                  ? birthDay?.map((e: any) => (
                      <div className={styles.birthday}>
                        <div>
                          <Avatar size="large" />
                        </div>
                        <div>
                          <p className={styles.birthdaytext}>Happy {e?.type}</p>
                          <h3 className={styles?.birthdayfullname}>
                            {e?.full_name}
                          </h3>
                          <p className={styles?.designation}>
                            {e?.designation_name}
                          </p>
                        </div>
                      </div>
                    ))
                  : null}
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
