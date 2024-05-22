import React, { useEffect, useState } from 'react';
import { Breadcrumb, Row, Col, Menu, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './headernavigation.module.scss';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { ReactComponent as BackIcon } from 'libs/common/assets/Back.svg';
import { ReactComponent as CloseIcon } from 'libs/common/assets/Close.svg';
import { AnimatePresence, delay, motion } from 'framer-motion';
import { ButtonClickAnimation } from '../../../../libs/common/utils/animations/variants';

// const SubMenu = [
//   {
//     text: 'Request',
//     title: 'Expense Request',
//     route: '/expense-request',
//   },
//   {
//     text: 'Approvals',
//     title: 'Expense Arrovals List',
//     route: '/approval-request',
//   },
//   {
//     text: 'Reports',
//     route: '/view-expense-report',
//   },
// ];
export const HeaderNavigation = ({ menus, create }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentKey, setcurrentKey] = useState('');

  // const da = menus.map(({ label, link, key }: any) => {
  //   return <Menu.Item key={key}>{label}</Menu.Item>;
  // });

  const handleClick = (e: any) => {
    navigate(e.key);
  };

  useEffect(() => {
    const suMenu = menus?.find((e: any) => location.pathname === e.path);

    setcurrentKey(suMenu.mainkey);
  }, [location.pathname]);

  const menuItems = menus?.find((e: any) => e?.path === location.pathname);

  const menusIdentity = menus.find((identity: any) => identity.identity);
  return menus && menus?.length > 0 ? (
    <div className={styles.header_navigation}>
      <Row className={styles.row}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Menu
            mode="horizontal"
            onClick={(e) => handleClick(e)}
            selectedKeys={[currentKey]}
          >
            {menus?.map(({ label, path, key, hidden }: any) =>
              hidden ? null : <Menu.Item key={path}>{label}</Menu.Item>
            )}
          </Menu>
        </Col>
      </Row>
      <Row className={styles.rowtitle}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div
            style={
              menusIdentity?.identity === 'accountreports'
                ? { display: 'none', alignItems: 'center', gap: '10px' }
                : { display: 'flex', alignItems: 'center', gap: '10px' }
            }
          >
            {menuItems?.isback ? (
              <BackIcon
                className={styles.back_button}
                style={{ cursor: 'pointer', color: '#7b7777' }}
                onClick={() => navigate(-1)}
              />
            ) : null}
            {menus?.find((i: any) => i.path == location.pathname)?.backTittle ||
              menus?.find((i: any) => i.path == location.pathname)?.label}
          </div>
          <AnimatePresence>
            <motion.div
              whileHover={'hover'}
              whileTap={'tap'}
              variants={ButtonClickAnimation}
            >
              {/* && create?.create */}
              {menuItems?.buttonTitle ? (
                <Button
                  onClick={() => navigate(menuItems?.buttonLink)}
                  type="primary"
                >
                  {menuItems?.isEditIcon ? <EditOutlined /> : <PlusOutlined />}

                  {menuItems?.buttonTitle}
                </Button>
              ) : null}
            </motion.div>
          </AnimatePresence>
          {menuItems?.isback ? (
            <div className={styles.close_button} onClick={() => navigate(-1)}>
              <CloseIcon />
            </div>
          ) : null}
        </Col>
      </Row>
    </div>
  ) : null;
};
