import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Select, DatePicker, Divider } from 'antd';
import { getPermissionsByRoles } from '../../../../../../libs/common/api/doctype';
import { HeaderNavigation } from '../../../../../../libs/common/ui/HeaderNavigation/headerNavigation';
import { Panel } from '../../../../../../libs/common/ui/Panel';
import '../../stylesOverride.scss';
import { Organization_Sub_Menu } from './route';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
type Props = {};

const View = (props: Props) => {
  const { RangePicker } = DatePicker;
  const [subMenu, setsubMenu] = useState<any>(Organization_Sub_Menu);
  const cookies = new Cookies();
  const permissions = cookies.get('permissions');

  // useEffect(() => {
  //   if (permissions) {
  //     let newArray = Organization_Sub_Menu.filter(
  //       (array22: any) =>
  //         !permissions.some(
  //           (array11: any) => array11?.doctype_name !== array22.belongto
  //         )
  //     );

  //     setsubMenu(newArray);
  //   }
  // }, []);

  const location = useLocation();

  const compt = () => {
    if (subMenu && subMenu?.length > 0) {
      const comp: any = subMenu?.find(
        (e: any) => e?.path === location.pathname
      );

      return comp?.component ? <comp.component /> : <></>;
    }
    return <></>;
  };

  return (
    <div style={{ height: '100%' }}>
      {subMenu && subMenu?.length > 0 ? (
        <HeaderNavigation menus={subMenu} />
      ) : null}
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
