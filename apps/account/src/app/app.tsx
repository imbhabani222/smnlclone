// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import ExportProvider from '../../../../libs/common/context/context';
import FilterProvider from '../../../../libs/common/context/filtercontext';
import { Menus } from '../config/menus/mainMenu';
import pageSpecific from '../config/pagespecific';
import { Account_Config_Sub_Menu } from '../pages/accountConfig/route';
import { Account_Management_Sub_Menu } from '../pages/accountManagement/route';
import { Accounts_Vocher_SubMenu } from '../pages/accountManagement/route';
import { Account_Reports_Sub_Menu } from '../pages/accountReports/route';
import NxWelcome from './nx-welcome';
import MainLayout from '../../../../libs/common/masterlayout/masterLayout';
import { Route, Routes, Link } from 'react-router-dom';
import Login from '../pages/login/login';
import Cookies from 'universal-cookie';
import './app.scss';
import { Home_Sub_Menu } from '../pages/home/route';
export function App() {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const location = useLocation();
  const [routesData, setroutesData] = useState<any>([
    ...Account_Config_Sub_Menu,
    ...Account_Management_Sub_Menu,
    ...Home_Sub_Menu,
    ...Accounts_Vocher_SubMenu,
    ...Account_Reports_Sub_Menu
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
  return (
    <>
      <ExportProvider>
        <FilterProvider>
          <MainLayout
            component={element}
            menus={Menus}
            pageSpecific={pageSpecific}
            allRoutes={routesData}
            appName={'Accounts'}
          />
        </FilterProvider>
      </ExportProvider>
      {/* {checkToken() ? (
        <ExportProvider>
          <FilterProvider>
            <MainLayout
              component={element}
              menus={Menus}
              pageSpecific={pageSpecific}
            />
          </FilterProvider>
        </ExportProvider>
      ) : (
        <Login />
      )} */}
    </>
  );
}

export default App;
