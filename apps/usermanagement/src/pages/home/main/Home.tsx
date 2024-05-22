import React from 'react';
import styles from '../home.module.scss';

import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Typography } from 'antd';
import { ReactComponent as HRMS } from '../../../../../../libs/common/assets/icons/HRMS.svg';
import { ReactComponent as Inventory } from '../../../../../../libs/common/assets/icons/Inventory.svg';
import { ReactComponent as Accounts } from '../../../../../../libs/common/assets/icons/Accounts.svg';
import { ReactComponent as Operations } from '../../../../../../libs/common/assets/icons/Operations.svg';

const dashboardWidgetsData = [
  { label: 'HRMS', icon: HRMS, Link: process.env.HRMS },
  { label: 'Inventory', icon: Inventory, Link: process.env.INVENTORY },
  { label: 'Accounts', icon: Accounts, Link: process.env.ACCOUNTS },
  { label: 'Operations', icon: Operations, Link: process.env.OPERATIONS },
];
console.log(process);
const Home = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const name = cookies.get('userid');
  const { Title } = Typography;

  const handleNavigation = (link: string) => {
    if (link) {
      // navigate(link);
      window.open(link, '_blank');
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
                }}
              >
                <div>
                  {` Welcome back, ${name || ' '}${' '}`
                    .split('')
                    .map((i: any, index: any) => {
                      return (
                        <span
                          // initial="initial"
                          // variants={Displayletterbyletter}
                          // animate={'animate'}
                          // custom={index}
                          key={index}
                        >
                          {i}
                        </span>
                      );
                    })}
                </div>
                <div
                // variants={tittleAnimstion}
                // whileHover={'hower'}
                // animate="handanimation"
                >
                  👋🏻
                </div>
              </Title>
              <Title level={5} style={{ color: '#667085', margin: 0 }}>
                <div
                // variants={tittleAnimstion}
                // initial="intial"
                // animate="showonce"
                >
                  {' '}
                  Here is what you might be looking to see today
                </div>
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
            {/* <div
              initial="hidden"
              animate="show"
              variants={widgetContaineranimation}
              className={styles.dashboard__widgets__content}
            >
              <AnimatePresence>
             
              </AnimatePresence>
            </div> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
