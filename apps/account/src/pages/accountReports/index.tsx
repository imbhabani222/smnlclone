import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Select, DatePicker, Divider } from 'antd';
import { HeaderNavigation } from '../../../../../libs/common/ui/HeaderNavigation/headerNavigation';
import { Panel } from '../../../../../libs/common/ui/Panel';

import { Account_Reports_Sub_Menu } from './route';
import { useLocation } from 'react-router-dom';
type Props = {};

const View = (props: Props) => {
  const { RangePicker } = DatePicker;

  const location = useLocation();

  const compt = () => {
    const comp: any = Account_Reports_Sub_Menu?.find(
      (e: any) => e?.path === location.pathname
    );
    //klj
    return <comp.component />;
  };

  return (
    <div>
      <HeaderNavigation menus={Account_Reports_Sub_Menu} />
      <Panel>
        {/* <div>

          {/* <Filter /> */}
        <div
          className="contentHeight"
          style={{ margin: '15px 20PX 15px 20px' }}
        >
          {compt()}
        </div>
        {/*} </div> */}
      </Panel>
    </div>
  );
};

export default View;
