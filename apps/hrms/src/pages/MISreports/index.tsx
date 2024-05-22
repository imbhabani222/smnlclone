import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Select, DatePicker, Divider } from 'antd';
import { HeaderPageButton } from '../../../../../libs/common/ui/Header_Page_Button/headerPageButton';
import { Panel } from '../../../../../libs/common/ui/Panel';
import Filter from '../../../../../libs/common/ui/Filter';
// import CreateRequest from './reimbursementRequest/create';
import { misSubMenus } from './route';
// import ViewRequest from './reimbursementRequest/view';
import { useLocation } from 'react-router-dom';
import { HeaderNavigation } from './ReportsHeaders';
type Props = {};

const View = (props: Props) => {
  const { RangePicker } = DatePicker;

  const location = useLocation();

  const compt = () => {
    const comp: any = misSubMenus.find(
      (e: any) => e.path === location.pathname
    );

    return <comp.component />;
  };

  return (
    <div>
      <HeaderNavigation menus={misSubMenus} />
      {/* <Filter /> */}

      {/* <div>

          {/* <Filter /> */}
      {/* <Panel> */}
      <div
        className="reportsContainer"
        style={{ margin: '15px 20px 15px 20px' }}
      >
        {compt()}
      </div>
      {/* </Panel> */}
      {/*} </div> */}
    </div>
  );
};

export default View;
