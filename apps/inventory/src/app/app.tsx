// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useLocation, useRoutes } from 'react-router-dom';
import NxWelcome from './nx-welcome';
import MainLayout from '../../../../libs/common/masterlayout/masterLayout';
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../pages/home/index';
import Login from '../pages/login/login';
import Cookies from 'universal-cookie';
import { Menus } from '../config/menus/mainMenu';
import pageSpecific from '../config/PageSpecific';

//context
import ExportProvider from '../../../../libs/common/context/context';
import FilterProvider from '../../../../libs/common/context/filtercontext';
//styles
import './app.scss';

import CreateApprovalUserLimit from '../pages/generalSetup/approvalUserLimit/create';
import ViewApprovalUserLimit from '../pages/generalSetup/approvalUserLimit/view';
import EditApprovalUserLimit from '../pages/generalSetup/approvalUserLimit/create';
// import AddCompanySetup from '../pages/generalSetup/companySetUp/create';

import ViewProductMaster from '../pages/productConfiguration/productMaster/view';
import CreateProductMaster from '../pages/productConfiguration/productMaster/create';
import CreateProductUsedFor from '../pages/productConfiguration/productUsedFor/create';
import ViewProductUsedFor from '../pages/productConfiguration/productUsedFor/view';
import ViewAlternateUOM from '../pages/productConfiguration/alternateUOM/view';

import CreateInventoryProductBrandMaster from '../pages/productConfiguration/BrandMaster/create';
import ViewInventoryProductBrandMaster from '../pages/productConfiguration/BrandMaster/view';
import EditInventoryProductBrandMaster from '../pages/productConfiguration/BrandMaster/create';

// import InventoryProductAccountBalance from '../pages/productConfiguration/productOpeningbalance/create';

// import {
//   ViewCountry,
//   CreateCountry,
//   ViewState,
//   CreateState,
//   ViewSupplierLocationMaster,
//   CreateSupplierLocationMaster,
//   ViewUserRole,
//   CreateUserRole,
//   CreateMaster,
//   ViewSuppliersList,
//   ViewUserMaster,
//   UserMasterTabs,
//   CreateGodown,
//   ViewGodown,
//   CreateSection,
//   ViewSection,
// } from '../pages/generalSetup';

// import {
//   ViewCategoryMaster,
//   CreateCategoryMaster,
//   ViewServiceProductMaster,
//   CreateServiceProductMaster,
//   ViewUnitOfMeasurement,
//   CreateUnitOfMeasurement,
// } from '../pages/productConfiguration';
import { General_Sub_Menu } from '../pages/generalSetup/route';
import { Product_Configuration_Sub_Menu } from '../pages/productConfiguration/route';
import { Purchase_Management_Sub_Menu } from '../pages/purchaseManagement/route';
import { Inventory_Management_Sub_Menu } from '../pages/inventoryManagement/route';
import { Home_Sub_Menu } from '../pages/home/route';
import { Workshop_Management_Sub_Menu } from '../pages/workshopManagement/route';
import { Fuel_Management_Sub_Menu } from '../pages/fuelManagement/route';
import { MIS_Report_Sub_Menu } from '../pages/reports/route';

const GeneralSetupRoutes = [
  {
    path: '/create-inventory-approval-user',
    element: <CreateApprovalUserLimit />,
  },
  {
    path: '/view-inventory-approval-user',
    element: <ViewApprovalUserLimit />,
  },
  {
    path: '/edit-inventory-approval-user',
    element: <EditApprovalUserLimit />,
  },
];

export function App() {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const location = useLocation();

  const allRoutes = [
    ...General_Sub_Menu,
    ...Product_Configuration_Sub_Menu,
    ...Purchase_Management_Sub_Menu,
    ...Home_Sub_Menu,
    ...Inventory_Management_Sub_Menu,
    ...Workshop_Management_Sub_Menu,
    ...Fuel_Management_Sub_Menu,
    ...MIS_Report_Sub_Menu,
  ];
  const element = useRoutes(allRoutes);
  const checkToken = () => {
    if (token) {
      return true;
    }
    if (location.pathname !== '/login') {
      window.location.replace('/login');
    }
    return false;
  };

  // const activeMenu = () => {
  //   const id = Menus?.map((e: any) => {
  //     const identity = allRoutes?.find((i: any) => i?.identity === e?.identity);
  //     console.log(identity);
  //     if (identity?.key) {
  //       return e?.identity;
  //     }
  //     return null;
  //   });
  //   console.log(id, 'SDfsdfsf');
  //   return id;
  // };

  return (
    <>
      {checkToken() ? (
        <ExportProvider>
          <FilterProvider>
            <MainLayout
              component={element}
              menus={Menus}
              pageSpecific={pageSpecific}
              allRoutes={allRoutes}
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
