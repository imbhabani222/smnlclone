import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Select, DatePicker, Divider } from 'antd';
import { HeaderNavigation } from '../../../../../libs/common/ui/HeaderNavigation/headerNavigation';
import { HeaderPageButton } from '../../../../../libs/common/ui/Header_Page_Button/headerPageButton';
import { Panel } from '../../../../../libs/common/ui/Panel';
import Filter from '../../../../../libs/common/ui/Filter';
// import CreateRequest from './reimbursementRequest/create';
import { Home_sub_menu } from './route';
// import ViewRequest from './reimbursementRequest/view';
import { useLocation } from 'react-router-dom';
import styles from './home.module.scss';

type Props = {};

const View = (props: Props) => {
  const { RangePicker } = DatePicker;

  const location = useLocation();

  const compt = () => {
    const comp: any = Home_sub_menu.find(
      (e: any) => e.path === location.pathname
    );
    //klj

    return <comp.component />;
  };

  return (
    <div>
      {/* <Filter /> */}

      {/* <div>

          {/* <Filter /> */}
      <div className={styles.content}>{compt()}</div>
      {/*} </div> */}
    </div>
  );
};

export default View;
