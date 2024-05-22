import React, { useState } from 'react';
import { Button } from 'antd';
//@ts-ignore
import styles from '../filter.module.scss';
import { RightOutlined } from '@ant-design/icons';
type Props = {};

const Sidebar = (props: any) => {
  const { setFiletrOption, sidebarItems, filterOption } = props;
  console.log(props, 'props')
  const handleSelect = (filter: any) => {
    setFiletrOption(filter);
  };
  return (
    <div className={styles.sidebar__Container} style={{ width: '40%' }}>
      <div className={styles.sidebar}>
        {sidebarItems?.map((item: any) => {
          return (
            <>
              <div
                className={`${styles.sidebar__item} ${
                  filterOption?.key === item?.key ? styles.active : ''
                }`}
                onClick={() => {
                  handleSelect(item);
                }}
                style={{ width: '100%' }}
              >
                {item?.label}
                <RightOutlined />
              </div>
              {/* <Button
                onClick={() => {
                  handleSelect(item);
                }}
                style={{ width: '100%' }}
              >
                {item?.label}
              </Button> */}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
