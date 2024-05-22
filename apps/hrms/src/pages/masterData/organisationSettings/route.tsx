import ViewState from './State/view';
import CreateState from './State/create';
import ViewGrade from './Grade/view';
import CreateGrade from './Grade/create';
import ViewSection from './Section/view';
import CreateSection from './Section/create';
import ViewBank from './BankMaster/view';
import CreateBank from './BankMaster/create';
import ViewBranch from './BranchMaster/view';
import CreateBranch from './BranchMaster/create';
import CompanyDetails from './CompanyDetails/Create';
import ViewCompanyDetails from './CompanyDetails/View';
import ViewDepartment from './Department/view';
import CreateDepartment from './Department/create';
import ViewNatureofClaims from './NatureOfClaims/view';
import CreateNatureofClaims from './NatureOfClaims/create';
import ViewWorkLocation from './WorkLocation/view';
import CreateWorkLocation from './WorkLocation/create';
// import ViewUsers from './Users/view';
// import CreateUsers from './Users/create';
// import ViewRoles from './Roles/view';
// import CreateRoles from './Roles/create';
// import CreatePermissions from './Permissions/create';
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
  subidentity?: string;
  belongto?: string;
}

export const Organization_Sub_Menu: MenuItem[] = [
  {
    label: 'State',
    key: '/view-state',
    mainkey: '/view-state',
    path: '/view-state',
    component: ViewState,
    element: <MainComponet />,
    buttonLink: '/create-state',
    buttonTitle: 'Add State',
    identity: 'masterdata',
    subidentity: 'organizationsettings',
    belongto: 'States',
  },
  {
    label: 'State',
    key: '/create-state',
    path: '/create-state',
    mainkey: '/view-state',
    title: 'Create State',
    element: <MainComponet />,
    component: CreateState,
    hidden: true,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
    belongto: 'States',
  },
  {
    label: 'State',
    key: '/edit-state',
    path: '/edit-state',
    mainkey: '/view-state',
    title: 'Create State',
    element: <MainComponet />,
    component: CreateState,
    hidden: true,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
    belongto: 'States',
  },
  {
    label: 'edit State',
    key: '/edit-state-data',
    path: '/edit-state-data',
    mainkey: '/view-state',
    element: <MainComponet />,
    title: 'Create State data',
    component: CreateState,
    hidden: true,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
    belongto: 'States',
  },
  {
    label: 'Company',
    key: '/view-company-details',
    mainkey: '/view-company-details',
    path: '/view-company-details',
    component: ViewCompanyDetails,
    element: <MainComponet />,
    buttonLink: '/create-company-details',
    buttonTitle: 'Edit',
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Company',
    key: '/company',
    mainkey: '/view-company-details',
    path: '/create-company-details',
    component: CompanyDetails,
    hidden: true,
    element: <MainComponet />,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Department',
    key: '/department',
    mainkey: '/view-department',
    path: '/view-department',
    component: ViewDepartment,
    buttonLink: '/create-department',
    buttonTitle: 'Add Department',
    element: <MainComponet />,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Department',
    key: '/create-department',
    mainkey: '/view-department',
    path: '/create-department',
    component: CreateDepartment,
    element: <MainComponet />,
    isback: true,
    hidden: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Edit Department',
    key: '/edit-department',
    mainkey: '/view-department',
    path: '/edit-department',
    component: CreateDepartment,
    element: <MainComponet />,
    isback: true,
    hidden: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  // {
  //   label: 'Users',
  //   key: '/view-users',
  //   mainkey: '/view-users',
  //   path: '/view-users',
  //   element: <MainComponet />,
  //   component: ViewUsers,
  //   buttonLink: '/create-users',
  //   buttonTitle: 'Add Users',
  //   identity: 'masterdata',
  //   subidentity: 'organizationsettings',
  // },
  // {
  //   label: 'Users',
  //   key: '/create-users',
  //   mainkey: '/view-users',
  //   path: '/create-users',
  //   component: CreateUsers,
  //   hidden: true,
  //   element: <MainComponet />,
  //   isback: true,
  //   identity: 'masterdata',
  //   subidentity: 'organizationsettings',
  // },
  // {
  //   label: 'Users',
  //   key: '/edit-users',
  //   mainkey: '/view-users',
  //   path: '/edit-users',
  //   component: CreateUsers,
  //   hidden: true,
  //   element: <MainComponet />,
  //   isback: true,
  //   identity: 'masterdata',
  //   subidentity: 'organizationsettings',
  // },

  // {
  //   label: 'Roles',
  //   key: '/view-roles',
  //   mainkey: '/view-roles',
  //   path: '/view-roles',
  //   element: <MainComponet />,
  //   component: ViewRoles,
  //   buttonLink: '/create-roles',
  //   buttonTitle: 'Add roles',
  //   identity: 'masterdata',
  //   subidentity: 'organizationsettings',
  // },
  // {
  //   label: 'Roles',
  //   key: '/create-roles',
  //   mainkey: '/view-roles',
  //   path: '/create-roles',
  //   component: CreateRoles,
  //   hidden: true,
  //   element: <MainComponet />,
  //   isback: true,
  //   identity: 'masterdata',
  //   subidentity: 'organizationsettings',
  // },
  // {
  //   label: 'Roles',
  //   key: '/edit-roles',
  //   mainkey: '/view-roles',
  //   path: '/edit-roles',
  //   component: CreateRoles,
  //   hidden: true,
  //   element: <MainComponet />,
  //   isback: true,
  //   identity: 'masterdata',
  //   subidentity: 'organizationsettings',
  // },
  // {
  //   label: 'Permissions',
  //   key: '/set-permissions',
  //   mainkey: '/set-permissions',
  //   path: '/set-permissions',
  //   component: CreatePermissions,
  //   element: <MainComponet />,
  //   identity: 'masterdata',
  //   subidentity: 'organizationsettings',
  // },
  {
    label: 'Work Location',
    key: '/view-work-location',
    mainkey: '/view-work-location',
    path: '/view-work-location',
    component: ViewWorkLocation,
    buttonLink: '/create-work-location',
    element: <MainComponet />,
    buttonTitle: 'Add Work Location',
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Create Work Location',
    key: '/createworklocation',
    mainkey: '/view-work-location',
    path: '/create-work-location',
    element: <MainComponet />,
    component: CreateWorkLocation,
    isback: true,
    hidden: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Edit Work Location',
    key: '/editworklocation',
    mainkey: '/view-work-location',
    path: '/edit-work-location',
    element: <MainComponet />,
    component: CreateWorkLocation,
    isback: true,
    hidden: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Salary Grade',
    key: '/view-grade',
    mainkey: '/view-grade',
    element: <MainComponet />,
    path: '/view-grade',
    component: ViewGrade,
    buttonLink: '/create-grade',
    buttonTitle: 'Add Salary Grade',
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Add Salary Grade',
    key: '/create-grade',
    mainkey: '/view-grade',
    path: '/create-grade',
    element: <MainComponet />,
    component: CreateGrade,
    hidden: true,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Salary Grade',
    key: '/edit-grade',
    mainkey: '/view-grade',
    element: <MainComponet />,
    path: '/edit-grade',
    component: CreateGrade,
    hidden: true,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Section',
    key: '/view-section',
    mainkey: '/view-section',
    path: '/view-section',
    element: <MainComponet />,
    component: ViewSection,
    buttonLink: '/create-section',
    buttonTitle: 'Add Section',
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Section',
    key: '/create-section',
    mainkey: '/view-section',
    path: '/create-section',
    element: <MainComponet />,
    component: CreateSection,
    hidden: true,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Section',
    key: '/edit-section',
    mainkey: '/view-section',
    path: '/edit-section',
    element: <MainComponet />,
    component: CreateSection,
    hidden: true,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Bank',
    key: '/bank',
    mainkey: '/view-bank',
    path: '/view-bank',
    component: ViewBank,
    element: <MainComponet />,
    buttonLink: '/create-bank',
    buttonTitle: 'Add Bank',
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Create Bank',
    key: '/create-bank',
    mainkey: '/view-bank',
    path: '/create-bank',
    component: CreateBank,
    element: <MainComponet />,
    isback: true,
    hidden: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Edit Bank',
    key: '/edit-bank',
    mainkey: '/view-bank',
    path: '/edit-bank-master',
    component: CreateBank,
    element: <MainComponet />,
    isback: true,
    hidden: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },

  {
    label: 'Branch Master',
    key: '/branchmaster',
    mainkey: '/view-branch-master',
    path: '/view-branch-master',
    component: ViewBranch,
    buttonLink: '/create-branch-master',
    buttonTitle: 'Add Branch Master',
    element: <MainComponet />,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Create Branch Master',
    key: '/create-branch-master',
    mainkey: '/view-branch-master',
    path: '/create-branch-master',
    component: CreateBranch,
    element: <MainComponet />,
    hidden: true,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Edit Branch Master',
    key: '/edit-branch-master',
    mainkey: '/view-branch-master',
    path: '/edit-branch-master',
    component: CreateBranch,
    element: <MainComponet />,
    hidden: true,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },

  {
    label: 'Reimbursement',
    key: '/view-nature-of-claims',
    mainkey: '/view-nature-of-claims',
    path: '/view-nature-of-claims',
    component: ViewNatureofClaims,
    buttonLink: '/create-nature-of-claims',
    buttonTitle: 'Add Reimbursement',
    element: <MainComponet />,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Create Reimbursement',
    key: '/create-nature-of-claims',
    mainkey: '/view-nature-of-claims',
    path: '/create-nature-of-claims',
    component: CreateNatureofClaims,
    element: <MainComponet />,
    hidden: true,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Reimbursement',
    key: '/edit-nature-of-claims',
    mainkey: '/view-nature-of-claims',
    path: '/edit-nature-of-claims',
    component: CreateNatureofClaims,
    hidden: true,
    element: <MainComponet />,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
];