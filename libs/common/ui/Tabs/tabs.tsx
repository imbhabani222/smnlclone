import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import styles from "./tabs.module.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

type Props = {
  items: any;
  defaultActiveKey?: any;
  currentTab?: any;
  onChange?: any;
};

const DynamicTabs = (props: Props) => {
  const {
    items,
    defaultActiveKey = 1,
    currentTab,
    onChange = () => {},
  } = props;

  const handleTabChange = (key: any) => {
    onChange && onChange(key);
  };

  return (
    <div className={styles.tab_container}>
      <Tabs
        activeKey={currentTab}
        defaultActiveKey={defaultActiveKey}
        items={items}
        className={styles.dynamicTabs}
        onChange={handleTabChange}></Tabs>
    </div>
  );
};

export default DynamicTabs;
