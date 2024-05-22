import React from 'react';
import styles from './panel.module.scss';
import DynamicTabs from '../Tabs/tabs';

export const Panel = ({ title = '', children, padding = true }: any) => {
  return <div id="panelMain" className={styles.mainpanel}>{children}</div>;
};
