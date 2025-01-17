import MainComponet from './index';
import ViewMovements from './movement/view';
import CreateMovements from './movement/create';
import ViewDepartment from './department/view';
import CreateDepartment from './department/create';
import CreateActivity from './activity/create';
import ViewActivity from './activity/view';
import ViewComodity from './comodity/view';
import CreateComodity from './comodity/create';
import ViewLocationMaster from './location/view';
import CreateLocationMaster from './location/create';

import ViewSeries from './series/view';
import CreateSeries from './series/create';


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
  identity?: string;
  
}

export const masterData_subRoutes: MenuItem[] = [
  {
    label: 'Movement',
    key: '/view-movements',
    mainkey: '/view-movements',
    path: '/view-movements',
    component: ViewMovements,
    element: <MainComponet />,
    buttonLink: '/create-movements',
    buttonTitle: 'Add Movement',
    identity: 'masterData',
  },
  {
    label: 'Add Movement',
    key: '/create-movements',
    path: '/create-movements',
    mainkey: '/view-movements',
    title: 'Create Movement',
    element: <MainComponet />,
    component: CreateMovements,
    hidden: true,
    isback: true,
    identity: 'masterData',
  },
  {
    label: 'Edit Movement',
    key: '/edit-movements',
    path: '/edit-movements',
    mainkey: '/view-movements',
    title: 'Create Movement',
    element: <MainComponet />,
    component: CreateMovements,
    hidden: true,
    isback: true,
    identity: 'masterData',
  },
  // {
  //   label: 'Department',
  //   key: '/view-department',
  //   mainkey: '/view-department',
  //   path: '/view-department',
  //   component: ViewDepartment,
  //   element: <MainComponet />,
  //   buttonLink: '/create-department',
  //   buttonTitle: 'Add Department',
  //   identity: 'masterData',
  // },
  // {
  //   label: 'Add Department',
  //   key: '/create-department',
  //   path: '/create-department',
  //   mainkey: '/view-department',
  //   title: 'Create Department',
  //   element: <MainComponet />,
  //   component: CreateDepartment,
  //   hidden: true,
  //   isback: true,
  //   identity: 'masterData',
  // },
  // {
  //   label: 'Edit Department',
  //   key: '/edit-department',
  //   path: '/edit-department',
  //   mainkey: '/view-department',
  //   title: 'Create Department',
  //   element: <MainComponet />,
  //   component: CreateDepartment,
  //   hidden: true,
  //   isback: true,
  //   identity: 'masterData',
  // },
  {
    label: 'Commodity',
    key: '/view-comodity',
    mainkey: '/view-comodity',
    path: '/view-comodity',
    component: ViewComodity,
    element: <MainComponet />,
    buttonLink: '/create-comodity',
    buttonTitle: 'Add Commodity',
    identity: 'masterData',
  },
  {
    label: 'Add Commodity',
    key: '/create-comodity',
    path: '/create-comodity',
    mainkey: '/view-comodity',
    title: 'Create Comodity',
    element: <MainComponet />,
    component: CreateComodity,
    hidden: true,
    isback: true,
    identity: 'masterData',
  },
  {
    label: 'Edit Commodity',
    key: '/edit-comodity',
    path: '/edit-comodity',
    mainkey: '/view-comodity',
    title: 'Create Comodity',
    element: <MainComponet />,
    component: CreateComodity,
    hidden: true,
    isback: true,
    identity: 'masterData',
  },
  {
    label: 'Location',
    key: '/view-location',
    mainkey: '/view-location',
    path: '/view-location',
    component: ViewLocationMaster,
    element: <MainComponet />,
    buttonLink: '/create-location',
    buttonTitle: 'Add Location',
    identity: 'masterData',
  },
  {
    label: 'Add Location',
    key: '/create-location',
    path: '/create-location',
    mainkey: '/view-location',
    title: 'Create location',
    element: <MainComponet />,
    component: CreateLocationMaster,
    hidden: true,
    isback: true,
    identity: 'masterData',
  },
  {
    label: 'Edit Location',
    key: '/edit-location',
    path: '/edit-location',
    mainkey: '/view-location',
    title: 'Create location',
    element: <MainComponet />,
    component: CreateLocationMaster,
    hidden: true,
    isback: true,
    identity: 'masterData',
  },

  {
    label: 'Activity Type',
    key: '/view-activity-type',
    mainkey: '/view-activity-type',
    path: '/view-activity-type',
    component: ViewActivity,
    element: <MainComponet />,
    buttonLink: '/create-activity-type',
    buttonTitle: 'Add Activity Type',
    identity: 'masterData',
  },
  {
    label: 'Add Activity Type',
    key: '/create-activity-type',
    path: '/create-activity-type',
    mainkey: '/view-activity-type',
    title: 'Create Activity Type',
    element: <MainComponet />,
    component: CreateActivity,
    hidden: true,
    isback: true,
    identity: 'masterData',
  },
  {
    label: 'Edit Activity Type',
    key: '/edit-activity-type',
    path: '/edit-activity-type',
    mainkey: '/view-activity-type',
    title: 'Create Activity Type',
    element: <MainComponet />,
    component: CreateActivity,
    hidden: true,
    isback: true,
    identity: 'masterData',
  },
  {
    label: 'Series',
    key: '/view-series',
    mainkey: '/view-series',
    path: '/view-series',
    component: ViewSeries,
    element: <MainComponet />,
    buttonLink: '/create-series',
    buttonTitle: 'Add series',
    identity: 'masterData',
  },
  {
    label: 'Add Series',
    key: '/create-series',
    path: '/create-series',
    mainkey: '/view-series',
    title: 'Create Series',
    element: <MainComponet />,
    component: CreateSeries,
    hidden: true,
    isback: true,
    identity: 'masterData',
  },
  {
    label: 'Edit series',
    key: '/edit-series',
    path: '/edit-series',
    mainkey: '/view-series',
    title: 'Edit Series',
    element: <MainComponet />,
    component: CreateSeries,
    hidden: true,
    isback: true,
    identity: 'masterData',
  },
  // {
  //   label: 'Movement',
  //   key: '/view-movements',
  //   mainkey: '/view-movements',
  //   path: '/view-movements',
  //   component: ViewMovements,
  //   element: <MainComponet />,
  //   buttonLink: '/create-movements',
  //   buttonTitle: 'Add Movement',
  //   identity: 'masterData',
  // },
  // {
  //   label: 'Add Movement',
  //   key: '/create-movements',
  //   path: '/create-movements',
  //   mainkey: '/view-movements',
  //   title: 'Create Movement',
  //   element: <MainComponet />,
  //   component: CreateMovements,
  //   hidden: true,
  //   isback: true,
  //   identity: 'masterData',
  // },
  // {
  //   label: 'Edit Movement',
  //   key: '/edit-movements',
  //   path: '/edit-movements',
  //   mainkey: '/view-movements',
  //   title: 'Create Movement',
  //   element: <MainComponet />,
  //   component: CreateMovements,
  //   hidden: true,
  //   isback: true,
  //   identity: 'masterData',
  // },
  // {
  //   label: 'Cost Center',
  //   key: '/view-cost-center',
  //   mainkey: '/view-cost-center',
  //   path: '/view-cost-center',
  //   component: ViewCostCenter,
  //   element: <MainComponet />,
  //   buttonLink: '/create-cost-center',
  //   buttonTitle: 'Add Cost Center',
  // },
  // {
  //   label: 'Add Cost Center',
  //   key: '/create-cost-center',
  //   path: '/create-cost-center',
  //   mainkey: '/view-cost-center',
  //   title: 'Create Cost Center',
  //   element: <MainComponet />,
  //   component: CreateCostCenter,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Edit Cost Center',
  //   key: '/edit-cost-center',
  //   path: '/edit-cost-center',
  //   mainkey: '/view-cost-center',
  //   title: 'Create Cost Center',
  //   element: <MainComponet />,
  //   component: CreateCostCenter,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Commodity',
  //   key: '/view-commodity',
  //   mainkey: '/view-commodity',
  //   path: '/view-commodity',
  //   component: ViewCommodity,
  //   element: <MainComponet />,
  //   buttonLink: '/create-commodity',
  //   buttonTitle: 'Add Commodity',
  // },
  // {
  //   label: 'Add Commodity',
  //   key: '/create-commodity',
  //   path: '/create-commodity',
  //   mainkey: '/view-commodity',
  //   title: 'Create Commodity',
  //   element: <MainComponet />,
  //   component: CreateCommodity,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Edit Commodity',
  //   key: '/edit-commodity',
  //   path: '/edit-commodity',
  //   mainkey: '/view-commodity',
  //   title: 'Create Commodity',
  //   element: <MainComponet />,
  //   component: CreateCommodity,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Ledger Category',
  //   key: '/view-ledger-category',
  //   mainkey: '/view-ledger-category',
  //   path: '/view-ledger-category',
  //   component: ViewLedgerCategory,
  //   element: <MainComponet />,
  //   buttonLink: '/create-ledger-category',
  //   buttonTitle: 'Add Ledger Category',
  // },
  // {
  //   label: 'Add Ledger Category',
  //   key: '/create-ledger-category',
  //   path: '/create-ledger-category',
  //   mainkey: '/view-ledger-category',
  //   title: 'Create Ledger Category',
  //   element: <MainComponet />,
  //   component: CreateLedgerCategory,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Edit Ledger Category',
  //   key: '/edit-ledger-category',
  //   path: '/edit-ledger-category',
  //   mainkey: '/view-ledger-category',
  //   title: 'Create Ledger Category',
  //   element: <MainComponet />,
  //   component: CreateLedgerCategory,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Ledger Group',
  //   key: '/view-ledger-group',
  //   mainkey: '/view-ledger-group',
  //   path: '/view-ledger-group',
  //   component: ViewLedgerGroup,
  //   element: <MainComponet />,
  //   buttonLink: '/create-ledger-group',
  //   buttonTitle: 'Add Ledger Group',
  // },
  // {
  //   label: 'Add Ledger Group',
  //   key: '/create-ledger-group',
  //   path: '/create-ledger-group',
  //   mainkey: '/view-ledger-group',
  //   title: 'Create Ledger Group',
  //   element: <MainComponet />,
  //   component: CreateLedgerGroup,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Edit Ledger Group',
  //   key: '/edit-ledger-group',
  //   path: '/edit-ledger-group',
  //   mainkey: '/view-ledger-group',
  //   title: 'Create Ledger Group',
  //   element: <MainComponet />,
  //   component: CreateLedgerGroup,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'General Ledger',
  //   key: '/view-general-ledger',
  //   mainkey: '/view-general-ledger',
  //   path: '/view-general-ledger',
  //   component: ViewGeneralLedger,
  //   element: <MainComponet />,
  //   buttonLink: '/create-general-ledger',
  //   buttonTitle: 'Add General Ledger',
  // },
  // {
  //   label: 'Add General Ledger',
  //   key: '/create-general-ledger',
  //   path: '/create-general-ledger',
  //   mainkey: '/view-general-ledger',
  //   title: 'Create General Ledger',
  //   element: <MainComponet />,
  //   component: CreateGeneralLedger,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Edit General Ledger',
  //   key: '/edit-general-ledger',
  //   path: '/edit-general-ledger',
  //   mainkey: '/view-general-ledger',
  //   title: 'Create General Ledger',
  //   element: <MainComponet />,
  //   component: CreateGeneralLedger,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'TDS Master',
  //   key: '/view-tds-master',
  //   mainkey: '/view-tds-master',
  //   path: '/view-tds-master',
  //   component: ViewTdsMaster,
  //   element: <MainComponet />,
  //   buttonLink: '/create-tds-master',
  //   buttonTitle: 'Add TDS Master',
  // },
  // {
  //   label: 'TDS Master',
  //   key: '/create-tds-master',
  //   path: '/create-tds-master',
  //   mainkey: '/view-tds-master',
  //   title: 'Create TDS Master',
  //   element: <MainComponet />,
  //   component: CreateTdsMaster,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'TDS Master',
  //   key: '/edit-tds-master',
  //   path: '/edit-tds-master',
  //   mainkey: '/view-tds-master',
  //   title: 'Create TDS Master',
  //   element: <MainComponet />,
  //   component: CreateTdsMaster,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Bank Master',
  //   key: '/view-bank-master',
  //   mainkey: '/view-bank-master',
  //   path: '/view-bank-master',
  //   component: ViewBankMaster,
  //   element: <MainComponet />,
  //   buttonLink: '/create-bank-master',
  //   buttonTitle: 'Add Bank Master',
  // },
  // {
  //   label: 'Add Bank Master',
  //   key: '/create-bank-master',
  //   path: '/create-bank-master',
  //   mainkey: '/view-bank-master',
  //   title: 'Create Bank Master',
  //   element: <MainComponet />,
  //   component: CreateBankMaster,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Edit Bank Master',
  //   key: '/edit-bank-master',
  //   path: '/edit-bank-master',
  //   mainkey: '/view-bank-master',
  //   title: 'Create Bank Master',
  //   element: <MainComponet />,
  //   component: CreateBankMaster,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Bank Account Master',
  //   key: '/view-bank-account-master',
  //   mainkey: '/view-bank-account-master',
  //   path: '/view-bank-account-master',
  //   component: ViewBankAccountMaster,
  //   element: <MainComponet />,
  //   buttonLink: '/create-bank-account-master',
  //   buttonTitle: 'Add Bank Account Master',
  // },
  // {
  //   label: 'Add Bank Account Master',
  //   key: '/create-bank-account-master',
  //   path: '/create-bank-account-master',
  //   mainkey: '/view-bank-account-master',
  //   title: 'Create Bank Account Master',
  //   element: <MainComponet />,
  //   component: CreateBankAccountMaster,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Edit Bank Account Master',
  //   key: '/edit-bank-account-master',
  //   path: '/edit-bank-account-master',
  //   mainkey: '/view-bank-account-master',
  //   title: 'Create Bank Account Master',
  //   element: <MainComponet />,
  //   component: CreateBankAccountMaster,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Recovery Component',
  //   key: '/view-recovery-component',
  //   mainkey: '/view-recovery-component',
  //   path: '/view-recovery-component',
  //   component: ViewRecoveryComponent,
  //   element: <MainComponet />,
  //   buttonLink: '/create-recovery-component',
  //   buttonTitle: 'Add Recovery Component',
  // },
  // {
  //   label: 'Add Recovery Component',
  //   key: '/create-recovery-component',
  //   path: '/create-recovery-component',
  //   mainkey: '/view-recovery-component',
  //   title: 'Create Recovery Component',
  //   element: <MainComponet />,
  //   component: CreateRecoveryComponent,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Edit Recovery Component',
  //   key: '/edit-recovery-component',
  //   path: '/edit-recovery-component',
  //   mainkey: '/view-recovery-component',
  //   title: 'Create Recovery Component',
  //   element: <MainComponet />,
  //   component: CreateRecoveryComponent,
  //   hidden: true,
  //   isback: true,
  // },
];
