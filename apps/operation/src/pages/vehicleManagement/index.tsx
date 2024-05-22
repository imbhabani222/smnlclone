import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Select, DatePicker, Divider } from 'antd';
import { HeaderNavigation } from '../../../../../libs/common/ui/HeaderNavigation/headerNavigation';
import { Panel } from '../../../../../libs/common/ui/Panel';
import '../stylesOverride.scss';
import { vehicleManagement_subRoutes } from './route';
import { useLocation } from 'react-router-dom';
type Props = {};

const View = (props: Props) => {
  const { RangePicker } = DatePicker;

  const location = useLocation();

  const compt = () => {
    const comp: any = vehicleManagement_subRoutes?.find(
      (e: any) => e?.path === location.pathname
    );

    return <comp.component />;
  };

  return (
    <div style={{ height: '100%' }}>
      <HeaderNavigation menus={vehicleManagement_subRoutes} />
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
