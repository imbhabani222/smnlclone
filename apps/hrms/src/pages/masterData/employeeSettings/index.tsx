import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Select, DatePicker, Divider } from 'antd';
import { HeaderNavigation } from '../../../../../../libs/common/ui/HeaderNavigation/headerNavigation';
import { Panel } from '../../../../../../libs/common/ui/Panel';
import '../../stylesOverride.scss';
import { Employee_Sub_Menu } from './route';
import { useLocation } from 'react-router-dom';
import { getPermissionsByRoles } from '../../../../../../libs/common/api/doctype';
import Cookies from 'universal-cookie';
type Props = {};

const View = (props: Props) => {
  const { RangePicker } = DatePicker;
  const cookies = new Cookies();
  const [permissionData, setpermissionData] = useState<any>([]);
  const [perData, setperData] = useState<any>([]);
  const roleid = cookies.get('role');

  const location = useLocation();

  const datarols = {
    role_name: roleid,
    module_name: 'Master data',
  };
  useEffect(() => {
    const comp: any = Employee_Sub_Menu?.find(
      (e: any) => e?.path === location.pathname
    );

    getPermissionsByRoles(datarols, 'htssuite').then((items) => {
      setpermissionData(items);
      const comp: any = Employee_Sub_Menu?.find(
        (e: any) => e?.path === location.pathname
      );

      const data = items?.find((i: any) => i?.doctype_name === comp?.doctype);
      setperData(data);
      // const encoded = btoa(JSON.stringify(items));
      // console.log(encoded);
      // const img = encoded;

      // console.log(encodeURI(encoded).split(/%..|./).length - 1);
      // cookies.set('permissions', 'encoded');
    });
  }, []);

  const compt = () => {
    const comp: any = Employee_Sub_Menu?.find(
      (e: any) => e?.path === location.pathname
    );
    const data = permissionData?.find(
      (i: any) => i?.doctype_name === comp?.doctype
    );

    if (data?.read) {
      return <comp.component perdata={data} />;
    } else {
      // return false;
      return <comp.component perdata={data} />;
    }
  };

  // console.log(perData, 'dataofpersmisdnfsdf');

  return (
    <>
      <HeaderNavigation menus={Employee_Sub_Menu} create={perData} />
      <Panel>
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
    </>
  );
};

export default View;
