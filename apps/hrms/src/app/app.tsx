// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useLocation, useRoutes } from 'react-router-dom';
import ExportProvider from '../../../../libs/common/context/context';
import FilterProvider from '../../../../libs/common/context/filtercontext';
import { getPermissionsByRoles } from '../../../../libs/common/api/doctype';

// import CreateInvestmentDeclaration from '../pages/employeeManagement/InvestmentDeclaration/create';
// import ViewInvestmentDeclaration from '../pages/employeeManagement/InvestmentDeclaration/view';
import Login from '../pages/login/login';

import MainLayout from '../../../../libs/common/masterlayout/masterLayout';
// import ViewRoles from '../pages/masterData/organisationSettings/Roles/view';
// import CreateRoles from '../pages/masterData/organisationSettings/Roles/create';

// import CreatePermissions from '../pages/masterData/organisationSettings/Permissions/create';
import ViewBrandMaster from '../pages/assetManagement/BrandMaster/view';
import AddBrandMaster from '../pages/assetManagement/BrandMaster/create';
import EditBrandMaster from '../pages/assetManagement/BrandMaster/create';
import ViewAssetMaster from '../pages/assetManagement/AssetMaster/view';
import ViewAssetList from '../pages/assetManagement/AssetList/view';
import AddAssetMaster from '../pages/assetManagement/AssetMaster/create';
import EditAssetMaster from '../pages/assetManagement/AssetMaster/create';
import ViewAssetRequest from '../pages/assetManagement/AssetRequest/view';
import AddAssetRequest from '../pages/assetManagement/AssetRequest/create';
import EditAssetRequest from '../pages/assetManagement/AssetRequest/create';
import Cookies from 'universal-cookie';

import './app.scss';
import CreateEmployeeResignation from '../pages/employeeManagement/employeeResignation/create';

import ViewEmployeeList from '../pages/employeeManagement/employeeList/employeeList';
// import HouseRentDeclaration from '../pages/employeeManagement/houseRentDeclaration/view';
import Home from '../pages/home';

import IncomeTaxSlabs from '../pages/payrollConfiguration/incomeTaxSlabs/view';
import CreateProfessionalTax from '../pages/payrollConfiguration/professionalTaxSlabs/create';
import ViewProfessionalTax from '../pages/payrollConfiguration/professionalTaxSlabs/view';
import ViewIncomeTaxSlabs from '../pages/payrollConfiguration/incomeTaxSlabs/view';
import CreateIncomeTaxSlabs from '../pages/payrollConfiguration/incomeTaxSlabs/create';
import CreateInvestmentItems from '../pages/payrollConfiguration/investmentSectionItems/create';
import ViewInvestmentItems from '../pages/payrollConfiguration/investmentSectionItems/view';

import CreateReimbursementRequest from '../pages/expenses/reimbursementRequest/create';
import ExpenseRequest from '../pages/expenses';
import ViewReimbursementRequest from '../pages/expenses/reimbursementRequest/view';
import ReimbursementApproveReject from '../pages/expenses/reimbursementApproveReject/view';
import ReimbursementReport from '../pages/expenses/reimbursementReport/view';
import CreateEmployeeCategoryLeaveSetup from '../pages/leaveManagement/empCategoryLeaveSetup/create';
import CreateLeaveRequest from '../pages/leaveManagement/leaveRequest/create';
import ApproveLeaveType from '../pages/leaveManagement/leaveApproval/Index';
import LeaveEncashment from '../pages/leaveManagement/leaveEncashment/Index';
import ApproveEncashment from '../pages/leaveManagement/approveEncashment/Index';
import CreateTravelRequest from '../pages/travel/travelRequest/create';
import TravelApproveRejct from '../pages/travel/travelApproveReject/Create';
import ViewTravelRequest from '../pages/travel/travelRequest/view';
import LeaveRequestListing from '../pages/leaveManagement/leaveRequest/leaveRequestListing';
import Travel from '../pages/travel/TravelTabs';
import LeaveSetup from '../pages/leaveManagement/leaveSetup/create';
// import Dashboard from '../pages/home/Dashboard';

// import {
//   ViewNewsEntry,
//   CreateNewsEntry,
//   EditNewsEntry,
//   ViewUploadPolicy,
//   CreateUploadPolicy,
//   ViewUploadForm,
//   CreateUploadForm,
//   CreateBankAdvice,
//   ViewPublicHoliday,
//   EditPublicHoliday,
//   CreatePublicHoliday,
//   ViewOrganizationChart,
//   ViewEmailTemplate,
//   CreateEmailTemplate,
//   CreateCloseMonth,
//   ChangePassword,
//   ResetPassword,
//   ViewOptionalHolidayList,
//   CreateOptionalHolidayList,
// } from '../pages/utility/index';
import './app.scss';
import { Expense_Sub_Menu } from '../pages/expenses/route';

import { Menus } from '../config/menus/mainMenu';
import pageSpecific from '../config/PageSpecific';
import { Organization_Sub_Menu } from '../pages/masterData/organisationSettings/route';
import { Employee_Sub_Menu } from '../pages/masterData/employeeSettings/route';
import { Employee_Management_Sub_Menu } from '../pages/employeeManagement/route';
import { Loan_Sub_Menu } from '../pages/loanAdvance/route';
import { Asset_Sub_Menu } from '../pages/assetManagement/route';
import { Travel_Sub_Menu } from '../pages/travel/route';
import { Leave_Management_Sub_Menu } from '../pages/leaveManagement/route';
import { Home_sub_menu } from '../pages/home/route';
import { Payroll_Sub_Menu } from '../pages/payrollConfiguration/route';
import { Utility_Sub_Menu } from '../pages/utility/route';
import { Payroll_Processing_Sub_Menu } from '../pages/payrollProcessing/route';
import { misSubMenus } from '../pages/MISreports/route';
import { useState } from 'react';

export function App() {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const location = useLocation();
  const [routesData, setroutesData] = useState<any>([
    ...Organization_Sub_Menu,
    ...Expense_Sub_Menu,
    ...Employee_Sub_Menu,
    ...Employee_Management_Sub_Menu,
    ...Loan_Sub_Menu,
    ...Asset_Sub_Menu,
    ...Travel_Sub_Menu,
    ...Leave_Management_Sub_Menu,
    ...Home_sub_menu,
    ...Payroll_Sub_Menu,
    ...Payroll_Processing_Sub_Menu,
    ...Utility_Sub_Menu,
    ...misSubMenus,
  ]);

  const element = useRoutes([
    {
      path: '/add-resignation-details',
      element: <CreateEmployeeResignation />,
    },

    {
      path: '/edit-resignation-details',
      element: <CreateEmployeeResignation />,
    },

    { path: '/view-employee-list', element: <ViewEmployeeList /> },

    {
      path: '/create-reimbursement-request',
      element: <CreateReimbursementRequest />,
    },

    // {
    //   path: '/view-reimbursement-request',
    //   element: <ViewReimbursementRequest />,
    // },
    {
      path: '/reimbursement-approve-reject',
      element: <ReimbursementApproveReject />,
    },
    {
      path: '/reimbursement-report',
      element: <ReimbursementReport />,
    },

    { path: 'travel-request/create', element: <CreateLeaveRequest /> },
    //  { path: 'travel-request/approve-leave', element: <ApproveLeaveType /> },
    { path: '/travel-request', element: <Travel /> },
    { path: '/create', element: <Travel /> },
    { path: '/approve-request', element: <Travel /> },
    { path: '/report', element: <Travel /> },

    {
      path: '/view-travel-request',
      element: <ViewTravelRequest />,
    },
    // {
    //   path: "/leave-setup",
    //   element: <LeaveSetup />
    // },

    ...routesData,
  ]);

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
