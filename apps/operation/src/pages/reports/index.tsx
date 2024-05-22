import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Select, DatePicker, Divider } from 'antd';
import ReportsHeaders from "../../../../hrms/src/pages/MISreports/ReportsHeaders"
import '../stylesOverride.scss';
import { reportOperation_subRoutes } from './route';
import { useLocation } from 'react-router-dom';
type Props = {};

const View = (props: Props) => {
  const { RangePicker } = DatePicker;

  const location = useLocation();

  const compt = () => {
    const comp: any = reportOperation_subRoutes?.find(
      (e: any) => e?.path === location.pathname
    );

    return <comp.component />;
  };

  return (
    <div style={{ height: '100%' }}>
      <ReportsHeaders menus={reportOperation_subRoutes} />
      {/* <Panel> */}
        {/* <div>

          {/* <Filter /> */}
        <div
          className="contentHeight" 

          style={{ margin: '15px 20PX 15px 20px', height:"auto" }}
        >
          {compt()}
        </div>
        {/*} </div> */}
      {/* </Panel> */}
    </div>
  );
};

export default View;
