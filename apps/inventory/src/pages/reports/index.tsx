import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Select, DatePicker, Divider } from 'antd';
import HeaderNavigation from '../../../../../libs/common/ui/Report/ReportsHeader';
import { Panel } from '../../../../../libs/common/ui/Panel';

import { MIS_Report_Sub_Menu } from './route';
import { useLocation } from 'react-router-dom';
import { overflow } from 'html2canvas/dist/types/css/property-descriptors/overflow';
type Props = {};

const View = (props: Props) => {
  const { RangePicker } = DatePicker;

  const location = useLocation();

  const compt = () => {
    const comp: any = MIS_Report_Sub_Menu?.find(
      (e: any) => e?.path === location.pathname
    );
    //klj
    return <comp.component />;
  };

  return (
    <div>
      <HeaderNavigation menus={MIS_Report_Sub_Menu} />
      {/* <Panel> */}
      {/* <div>

          {/* <Filter /> */}
      <div
        className="reportsContainer"
        style={{ margin: '15px 20px 15px 20px' }}
      >
        {compt()}
      </div>
      {/*} </div> */}
      {/* </Panel> */}
    </div>
  );
};

export default View;
