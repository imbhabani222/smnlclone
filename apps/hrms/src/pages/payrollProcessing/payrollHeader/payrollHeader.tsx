import React, { useEffect, useState } from 'react';
import { Breadcrumb, Row, Col, Menu, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../../../../../libs/common/ui/HeaderNavigation/headernavigation.module.scss';
import { PlusOutlined } from '@ant-design/icons';

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
export const HeaderNavigation = ({ menus }: any) => {
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
    const suMenu = menus.find((e: any) => location.pathname === e.path);

    setcurrentKey(suMenu.mainkey);
  }, [location.pathname]);

  const menuItems = menus?.find((e: any) => e?.path === location.pathname);

  return (
    <div className={styles.header_navigation}>
      <Row className={styles.row}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Menu
            mode="horizontal"
            onClick={(e) => handleClick(e)}
            selectedKeys={[currentKey]}
          >
            {menus.map(({ label, path, key, hidden }: any) =>
              hidden ? null : <Menu.Item key={path}>{label}</Menu.Item>
            )}
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

