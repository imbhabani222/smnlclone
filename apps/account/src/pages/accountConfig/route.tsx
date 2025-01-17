import ViewTdsMaster from './tdsMaster/view';
import CreateTdsMaster from './tdsMaster/create';
import ViewBankMaster from './bankMaster/view';
import CreateBankMaster from './bankMaster/create';
import ViewBankAccountMaster from './bankAccountMaster/view';
import CreateBankAccountMaster from './bankAccountMaster/create';
import ViewFirmType from './firmType/view';
import CreateFirmType from './firmType/create';
import ViewCostCenter from './costCenter/view';
import CreateCostCenter from './costCenter/create';
import ViewCommodity from './commodity/view';
import CreateCommodity from './commodity/create';
import ViewLedgerCategory from './ledgerCategory/view';
import CreateLedgerCategory from './ledgerCategory/create';
import ViewLedgerGroup from './ledgerGroup/view';
import CreateLedgerGroup from './ledgerGroup/create';
import ViewGeneralLedger from './generalLedger/view';
import CreateGeneralLedger from './generalLedger/create';
import ViewRecoveryComponent from './recoveryComponent/view';
import CreateRecoveryComponent from './recoveryComponent/create';
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
  identity?: any;
}

export const Account_Config_Sub_Menu: MenuItem[] = [
  {
    label: 'Firm Type',
    key: '/view-firm-type',
    mainkey: '/view-firm-type',
    path: '/view-firm-type',
    component: ViewFirmType,
    element: <MainComponet />,
    buttonLink: '/create-firm-type',
    buttonTitle: 'Add Firm Type',
    identity: 'accountconfiguration',
  },
  {
    label: 'Add Firm Type',
    key: '/create-firm-type',
    path: '/create-firm-type',
    mainkey: '/view-firm-type',
    title: 'Create Firm Type',
    element: <MainComponet />,
    component: CreateFirmType,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  {
    label: 'Edit Firm Type',
    key: '/edit-firm-type',
    path: '/edit-firm-type',
    mainkey: '/view-firm-type',
    title: 'Create Firm Type',
    element: <MainComponet />,
    component: CreateFirmType,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  {
    label: 'Cost Center',
    key: '/view-cost-center',
    mainkey: '/view-cost-center',
    path: '/view-cost-center',
    component: ViewCostCenter,
    element: <MainComponet />,
    buttonLink: '/create-cost-center',
    buttonTitle: 'Add Cost Center',
    identity: 'accountconfiguration',
  },
  {
    label: 'Add Cost Center',
    key: '/create-cost-center',
    path: '/create-cost-center',
    mainkey: '/view-cost-center',
    title: 'Create Cost Center',
    element: <MainComponet />,
    component: CreateCostCenter,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  {
    label: 'Edit Cost Center',
    key: '/edit-cost-center',
    path: '/edit-cost-center',
    mainkey: '/view-cost-center',
    title: 'Create Cost Center',
    element: <MainComponet />,
    component: CreateCostCenter,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  // {
  //   label: 'Commodity',
  //   key: '/view-commodity',
  //   mainkey: '/view-commodity',
  //   path: '/view-commodity',
  //   component: ViewCommodity,
  //   element: <MainComponet />,
  //   buttonLink: '/create-commodity',
  //   buttonTitle: 'Add Commodity',
  //   identity: 'accountconfiguration',
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
  //   identity: 'accountconfiguration',
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
  //   identity: 'accountconfiguration',
  // },
  {
    label: 'Ledger Category',
    key: '/view-ledger-category',
    mainkey: '/view-ledger-category',
    path: '/view-ledger-category',
    component: ViewLedgerCategory,
    element: <MainComponet />,
    buttonLink: '/create-ledger-category',
    buttonTitle: 'Add Ledger Category',
    identity: 'accountconfiguration',
  },
  {
    label: 'Add Ledger Category',
    key: '/create-ledger-category',
    path: '/create-ledger-category',
    mainkey: '/view-ledger-category',
    title: 'Create Ledger Category',
    element: <MainComponet />,
    component: CreateLedgerCategory,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  {
    label: 'Edit Ledger Category',
    key: '/edit-ledger-category',
    path: '/edit-ledger-category',
    mainkey: '/view-ledger-category',
    title: 'Create Ledger Category',
    element: <MainComponet />,
    component: CreateLedgerCategory,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  {
    label: 'Ledger Group',
    key: '/view-ledger-group',
    mainkey: '/view-ledger-group',
    path: '/view-ledger-group',
    component: ViewLedgerGroup,
    element: <MainComponet />,
    buttonLink: '/create-ledger-group',
    buttonTitle: 'Add Ledger Group',
    identity: 'accountconfiguration',
  },
  {
    label: 'Add Ledger Group',
    key: '/create-ledger-group',
    path: '/create-ledger-group',
    mainkey: '/view-ledger-group',
    title: 'Create Ledger Group',
    element: <MainComponet />,
    component: CreateLedgerGroup,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  {
    label: 'Edit Ledger Group',
    key: '/edit-ledger-group',
    path: '/edit-ledger-group',
    mainkey: '/view-ledger-group',
    title: 'Create Ledger Group',
    element: <MainComponet />,
    component: CreateLedgerGroup,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  {
    label: 'General Ledger',
    key: '/view-general-ledger',
    mainkey: '/view-general-ledger',
    path: '/view-general-ledger',
    component: ViewGeneralLedger,
    element: <MainComponet />,
    buttonLink: '/create-general-ledger',
    buttonTitle: 'Add General Ledger',
    identity: 'accountconfiguration',
  },
  {
    label: 'Add General Ledger',
    key: '/create-general-ledger',
    path: '/create-general-ledger',
    mainkey: '/view-general-ledger',
    title: 'Create General Ledger',
    element: <MainComponet />,
    component: CreateGeneralLedger,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  {
    label: 'Edit General Ledger',
    key: '/edit-general-ledger',
    path: '/edit-general-ledger',
    mainkey: '/view-general-ledger',
    title: 'Create General Ledger',
    element: <MainComponet />,
    component: CreateGeneralLedger,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  {
    label: 'TDS Master',
    key: '/view-tds-master',
    mainkey: '/view-tds-master',
    path: '/view-tds-master',
    component: ViewTdsMaster,
    element: <MainComponet />,
    buttonLink: '/create-tds-master',
    buttonTitle: 'Add TDS Master',
    identity: 'accountconfiguration',
  },
  {
    label: 'Add TDS Master',
    key: '/create-tds-master',
    path: '/create-tds-master',
    mainkey: '/view-tds-master',
    title: 'Create TDS Master',
    element: <MainComponet />,
    component: CreateTdsMaster,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  {
    label: 'Add TDS Master',
    key: '/edit-tds-master',
    path: '/edit-tds-master',
    mainkey: '/view-tds-master',
    title: 'Create TDS Master',
    element: <MainComponet />,
    component: CreateTdsMaster,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  // {
  //   label: 'Bank Master',
  //   key: '/view-bank-master',
  //   mainkey: '/view-bank-master',
  //   path: '/view-bank-master',
  //   component: ViewBankMaster,
  //   element: <MainComponet />,
  //   buttonLink: '/create-bank-master',
  //   buttonTitle: 'Add Bank Master',
  //   identity: 'accountconfiguration',
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
  //   identity: 'accountconfiguration',
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
  //   identity: 'accountconfiguration',
  // },
  {
    label: 'Bank Account Master',
    key: '/view-bank-account-master',
    mainkey: '/view-bank-account-master',
    path: '/view-bank-account-master',
    component: ViewBankAccountMaster,
    element: <MainComponet />,
    buttonLink: '/create-bank-account-master',
    buttonTitle: 'Add Bank Account Master',
    identity: 'accountconfiguration',
  },
  {
    label: 'Add Bank Account Master',
    key: '/create-bank-account-master',
    path: '/create-bank-account-master',
    mainkey: '/view-bank-account-master',
    title: 'Create Bank Account Master',
    element: <MainComponet />,
    component: CreateBankAccountMaster,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  {
    label: 'Edit Bank Account Master',
    key: '/edit-bank-account-master',
    path: '/edit-bank-account-master',
    mainkey: '/view-bank-account-master',
    title: 'Create Bank Account Master',
    element: <MainComponet />,
    component: CreateBankAccountMaster,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  {
    label: 'Recovery Component',
    key: '/view-recovery-component',
    mainkey: '/view-recovery-component',
    path: '/view-recovery-component',
    component: ViewRecoveryComponent,
    element: <MainComponet />,
    buttonLink: '/create-recovery-component',
    buttonTitle: 'Add Recovery Component',
    identity: 'accountconfiguration',
  },
  {
    label: 'Add Recovery Component',
    key: '/create-recovery-component',
    path: '/create-recovery-component',
    mainkey: '/view-recovery-component',
    title: 'Create Recovery Component',
    element: <MainComponet />,
    component: CreateRecoveryComponent,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
  {
    label: 'Edit Recovery Component',
    key: '/edit-recovery-component',
    path: '/edit-recovery-component',
    mainkey: '/view-recovery-component',
    title: 'Create Recovery Component',
    element: <MainComponet />,
    component: CreateRecoveryComponent,
    hidden: true,
    isback: true,
    identity: 'accountconfiguration',
  },
];
