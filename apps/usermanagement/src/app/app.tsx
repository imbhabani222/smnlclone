// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useLocation, useRoutes } from 'react-router-dom';
import ExportProvider from '../../../../libs/common/context/context';
import FilterProvider from '../../../../libs/common/context/filtercontext';
import { getPermissionsByRoles } from '../../../../libs/common/api/doctype';

// import CreateInvestmentDeclaration from '../pages/employeeManagement/InvestmentDeclaration/create';
// import ViewInvestmentDeclaration from '../pages/employeeManagement/InvestmentDeclaration/view';
import Login from '../pages/login/login';

import MainLayout from '../../../../libs/common/masterlayout/masterLayout';

import Cookies from 'universal-cookie';

import './app.scss';

import './app.scss';

import { Menus } from '../config/menus/mainMenu';
import pageSpecific from '../config/PageSpecific';
import { User_Sub_Menu } from '../pages/users/route';

import { Home_sub_menu } from '../pages/home/route';

import { useState } from 'react';

export function App() {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const location = useLocation();
  const [routesData, setroutesData] = useState<any>([
    ...User_Sub_Menu,
    ...Home_sub_menu,
  ]);

  const element = useRoutes([...routesData]);

  const checkToken = () => {
    if (token) {
      return true;
    }
    if (location.pathname !== '/login') {
      window.location.replace('/login');
    }
    return false;
  };

  const getPermissions = (e: any, routes: any) => {
    getPermissionsByRoles(e, 'htssuite').then((items) => {
      cookies.set('permissions', JSON.stringify(items));
      let newArray = routesData.filter(
        (array22: any) =>
          !items.some(
            (array11: any) => array11?.doctype_name !== array22.belongto
          )
      );

      setroutesData(newArray);
    });
  };
  const handlePermissions = (e: any) => {
    if (e) {
      const rols = {
        role_name: 'manager',
      };

      // getPermissions(rols, e);
    }
  };

  return (
    <>
      {checkToken() ? (
        <ExportProvider>
          <FilterProvider>
            <MainLayout
              component={element}
              menus={Menus}
              pageSpecific={pageSpecific}
              allRoutes={routesData}
              handlePermissions={handlePermissions}
            />
          </FilterProvider>
        </ExportProvider>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
