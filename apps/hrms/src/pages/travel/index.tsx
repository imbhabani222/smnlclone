import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Select, DatePicker, Divider } from 'antd';
import { HeaderNavigation } from '../../../../../libs/common/ui/HeaderNavigation/headerNavigation';
import { HeaderPageButton } from '../../../../../libs/common/ui/Header_Page_Button/headerPageButton';
import { Panel } from '../../../../../libs/common/ui/Panel';
import Filter from '../../../../../libs/common/ui/Filter';
// import CreateRequest from './reimbursementRequest/create';
import { Travel_Sub_Menu } from './route';
// import ViewRequest from './reimbursementRequest/view';
import { useLocation } from 'react-router-dom';
type Props = {};

const View = (props: Props) => {
  const { RangePicker } = DatePicker;

  const location = useLocation();

  const compt = () => {
    const comp: any = Travel_Sub_Menu.find(
      (e: any) => e.path === location.pathname
    );

    return <comp.component />;
  };

  return (
    <div>
      <HeaderNavigation menus={Travel_Sub_Menu} />
      <Panel>
        {/* <Filter /> */}

        {/* <div>

          {/* <Filter /> */}
        <div
          className="contentHeight"
          style={{ margin: '15px 20px 15px 20px' }}
        >
          {compt()}
        </div>
        {/*} </div> */}
      </Panel>
    </div>
  );
};

export default View;
