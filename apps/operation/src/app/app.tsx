// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useLocation, useRoutes } from 'react-router-dom';
import NxWelcome from './nx-welcome';
import MainLayout from '../../../../libs/common/masterlayout/masterLayout';
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../pages/home/index';
import Login from '../pages/login/login';
import { Menus } from '../config/menus/mainMenu';
import Cookies from 'universal-cookie';
import './app.scss';
import ExportProvider from '../../../../libs/common/context/context';
import FilterProvider from '../../../../libs/common/context/filtercontext';
import { useState } from 'react';
import { masterData_subRoutes } from '../pages/masterData/route';
import { tasks_subRoutes } from '../pages/tasks/route';
import { vehicleManagement_subRoutes } from '../pages/vehicleManagement/route';
import { taskProgress_subRoutes } from '../pages/taskProgress/route';
import { reportOperation_subRoutes } from '../pages/reports/route';
import { driverallocation_routes } from '../pages/driverAllocation/route';
import { Home_Sub_Menu } from '../pages/home/route';

export function App() {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const location = useLocation();
  const [routesData, setroutesData] = useState<any>([
    ...Home_Sub_Menu,
    ...masterData_subRoutes,
    ...tasks_subRoutes,
    ...vehicleManagement_subRoutes,
    ...taskProgress_subRoutes,
    ...reportOperation_subRoutes,
    ...driverallocation_routes,
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
      {checkToken() ? (
        <ExportProvider>
          <FilterProvider>
            <MainLayout
              component={element}
              menus={Menus}
              allRoutes={routesData}
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
