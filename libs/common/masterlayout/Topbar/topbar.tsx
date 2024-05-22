import React from 'react';
import styles from './topbar.module.scss';
import { Avatar, Dropdown, message, Space } from 'antd';
import type { MenuProps } from 'antd';
import Logo from '../../assets/logo.svg';
import { UserOutlined } from '@ant-design/icons';
import { ReactComponent as Notification } from '../../assets/Notification.svg';
import { ReactComponent as DownIcon } from '../../assets/Down.svg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import GlobalSearch from '../../ui/globalSearch/GlobalSearch';

const items: MenuProps['items'] = [
  {
    label: 'Logout',
    key: '1',
  },
];

export const Topbar = ({ appName }: any) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = ({ key }) => {
    cookies.remove('token');
    cookies.remove('userid');
    cookies.remove('role');
    cookies.remove('username');
    cookies.remove('useremail');
    navigate('/login');
  };
  const username = cookies.get('username');

  return (
    <header className={styles.topbar_container}>
      <div className={styles.logo}>
        <img src={Logo} />
      </div>
      <div></div>
      <div className={styles.user_icons}>
        {/* <div className={styles.notification}>
          <Notification />
        </div> */}
        {appName === 'Accounts' && <GlobalSearch />}
        <div className={styles.user_profile}>
          <Avatar className={styles.user_img} icon={<UserOutlined />} />
          <p className={styles.user_name}>{username}</p>
        </div>
        <div className={styles.dropdown}>
          <Dropdown menu={{ items, onClick }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <DownIcon />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};
