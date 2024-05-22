import React from 'react';
import styles from './panel.module.scss';
import DynamicTabs from '../Tabs/tabs';

export const Panel = ({ title = '', children, padding = true }: any) => {
  return (
    <div
      id="panelMain"
      className={styles.main_panel}
      style={
        padding ? { marginBlockStart: '0px' } : { marginBlockStart: '0px' }
      }
    >
      {/* {tabs.length!==0 ? <DynamicTabs tabs={tabs} currentTab={currentTab}></DynamicTabs> : <></>} */}
      {title ? <p className={styles.main_panel_title}>{title}</p> : <></>}
      <div
        className={styles.page_content}
        style={
          padding
            ? { paddingInline: '0px' }
            : { paddingInline: '0', marginBlockStart: '0' }
        }
      >
        {children}
      </div>
    </div>
  );
};
