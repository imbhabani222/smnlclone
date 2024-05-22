import ViewEmployee from './employeeSetup/EmployeeSetup';
import CreateEmployee from './employeeSetup/addDetails/AddDetails';
import CreateResignedEmployee from './employeeResignation/create';
import ViewResignedEmployee from './employeeResignation/view';
import CreateNoticeLetter from './employeeNotice/create';
import ViewNoticeLetter from './employeeNotice/View';
import ViewViolation from './employeeViolation/view';
import CreateViolation from './employeeViolation/create';
import ViewSettlement from './employeeSettlement/view';
import EditSettlement from './employeeSettlement/edit';
import CreateSettlement from './employeeSettlement/create';

import MainComponet from './index';

interface MenuItem {
  label: string;
  key: string;
  title?: string;
  component: any;
  path: any;
  subMenu?: any;
  hidden?: boolean;
  mainkey?: string;
  isButton?: any;
  buttonLink?: string;
  isback?: boolean;
  buttonTitle?: string;
  element?: any;
  identity: string;
}

export const Employee_Management_Sub_Menu: MenuItem[] = [
  {
    label: 'Employee',
    key: '/view-employee-details',
    mainkey: '/view-employee-details',
    path: '/view-employee-details',
    component: ViewEmployee,
    element: <MainComponet />,
    buttonLink: '/add-employee-details',
    buttonTitle: 'Add Employee',
    identity: 'employeemanagement',
  },
  {
    label: 'Pesonal Details',
    key: '/add-employee-details',
    path: '/add-employee-details',
    mainkey: '/view-employee-details',
    title: 'Create Employee',
    element: <MainComponet />,
    component: CreateEmployee,
    hidden: true,
    isback: true,
    identity: 'employeemanagement',
  },
  {
    label: 'Personal Details',
    key: '/personal-details',
    path: '/personal-details',
    mainkey: '/view-employee-details',
    title: 'Create Employee',
    element: <MainComponet />,
    component: CreateEmployee,
    hidden: true,
    isback: true,
    identity: 'employeemanagement',
  },
  {
    label: 'Official Details',
    key: '/official-details',
    path: '/official-details',
    mainkey: '/view-employee-details',
    element: <MainComponet />,
    component: CreateEmployee,
    hidden: true,
    identity: 'employeemanagement',
  },
  {
    label: 'Address Details',
    key: '/address-details',
    path: '/address-details',
    mainkey: '/view-employee-details',
    element: <MainComponet />,
    component: CreateEmployee,
    hidden: true,
    identity: 'employeemanagement',
  },
  {
    label: 'Document Details',
    key: '/document-details',
    path: '/document-details',
    mainkey: '/view-employee-details',
    element: <MainComponet />,
    component: CreateEmployee,
    hidden: true,
    isback: true,
    identity: 'employeemanagement',
  },
  {
    label: 'Other Details',
    key: '/other-details',
    path: '/other-details',
    mainkey: '/view-employee-details',
    element: <MainComponet />,
    component: CreateEmployee,
    hidden: true,
    isback: true,
    identity: 'employeemanagement',
  },
  {
    label: 'Family Details',
    key: '/family-details',
    path: '/family-details',
    mainkey: '/view-employee-details',
    element: <MainComponet />,
    component: CreateEmployee,
    hidden: true,
    isback: true,
    identity: 'employeemanagement',
  },
  {
    label: 'Ex-Employee',
    key: '/view-resigned-employee',
    mainkey: '/view-resigned-employee',
    path: '/view-resigned-employee',
    component: ViewResignedEmployee,
    element: <MainComponet />,
    buttonLink: '/create-resigned-employee',
    buttonTitle: 'Add Ex-Employee',
    identity: 'employeemanagement',
  },
  {
    label: 'Create Ex-Employee',
    key: '/create-resigned-employee',
    mainkey: '/view-resigned-employee',
    path: '/create-resigned-employee',
    component: CreateResignedEmployee,
    element: <MainComponet />,
    hidden: true,
    isback: true,
    identity: 'employeemanagement',
  },
  {
    label: 'Edit Ex-Employee',
    key: '/edit-resigned-employee',
    mainkey: '/view-resigned-employee',
    path: '/edit-resigned-employee',
    component: CreateResignedEmployee,
    element: <MainComponet />,
    hidden: true,
    isback: true,
    identity: 'employeemanagement',
  },
  {
    label: 'Notice Letter',
    key: '/view-notice-letter',
    mainkey: '/view-notice-letter',
    path: '/view-notice-letter',
    component: ViewNoticeLetter,
    element: <MainComponet />,
    // buttonLink: '/create-notice-letter',
    // buttonTitle: 'Add Notice Letter',
    identity: 'employeemanagement',
  },
  {
    label: 'Create Notice Letter',
    key: '/create-notice-letter',
    mainkey: '/view-notice-letter',
    path: '/create-notice-letter',
    component: CreateNoticeLetter,
    element: <MainComponet />,
    hidden: true,
    isback: true,
    identity: 'employeemanagement',
  },
  {
    label: 'Edit Notice Letter',
    key: '/edit-notice-letter',
    mainkey: '/view-notice-letter',
    path: '/edit-notice-letter',
    component: CreateNoticeLetter,
    element: <MainComponet />,
    hidden: true,
    isback: true,
    identity: 'employeemanagement',
  },
  {
    label: 'Final Settlement',
    key: '/view-settlement',
    mainkey: '/view-settlement',
    path: '/view-settlement',
    component: ViewSettlement,
    element: <MainComponet />,
    buttonLink: '/create-settlement',
    buttonTitle: 'Create Settlement',
    identity: 'employeemanagement',
  },
  {
    label: 'Create Settlement',
    key: '/create-settlement',
    mainkey: '/view-settlement',
    path: '/create-settlement',
    component: CreateSettlement,
    element: <MainComponet />,
    hidden: true,
    isback: true,
    identity: 'employeemanagement',
  },
  {
    label: 'Edit Settlement',
    key: '/edit-settlement',
    mainkey: '/view-settlement',
    path: '/edit-settlement',
    component: EditSettlement,
    element: <MainComponet />,
    hidden: true,
    isback: true,
    identity: 'employeemanagement',
  },
  {
    label: 'Employee Violation',
    key: '/view-violation',
    mainkey: '/view-violation',
    path: '/view-violation',
    component: ViewViolation,
    element: <MainComponet />,
    buttonLink: '/create-violation',
    buttonTitle: 'Add Violation',
    identity: 'employeemanagement',
  },
  {
    label: 'Create Violation',
    key: '/create-violation',
    mainkey: '/view-violation',
    path: '/create-violation',
    component: CreateViolation,
    element: <MainComponet />,
    hidden: true,
    isback: true,
    identity: 'employeemanagement',
  }
  // {
  //   label: 'Edit Notice Letter',
  //   key: '/edit-notice-letter',
  //   mainkey: '/view-notice-letter',
  //   path: '/edit-notice-letter',
  //   component: CreateNoticeLetter,
  //   element: <MainComponet />,
  //   hidden: true,
  //   isback: true,
  //   identity: 'employeemanagement',
  // },
];
