import {
  Home_Sub_Menu,
  Loan_Sub_Menu,
  Asset_Sub_Menu,
  MasterData_Sub_Menu,
  Payroll_Sub_Menu,
  Employee_Sub_Menu,
  Utility_Sub_Menu,
  Leave_Sub_Menu,
  Expense_Sub_Menu,
  Travel_Sub_Menu,
  Payroll_Processing_Sub_Menu,
} from './subMenu';
import type { MenuProps } from 'antd';

import { ReactComponent as SettingsIcon } from '../../../../../libs/common/assets/Settings.svg';
import { ReactComponent as PayrollConfigurationIcon } from '../../../../../libs/common/assets/Payroll Configuration.svg';
import { ReactComponent as EmpManagementIcon } from '../../../../../libs/common/assets/Employee Management.svg';
import { ReactComponent as LeaveManagementIcon } from '../../../../../libs/common/assets/Leave  Management.svg';
import { ReactComponent as ExpenseIcon } from '../../../../../libs/common/assets/Expense.svg';
import { ReactComponent as MoreIcon } from '../../../../../libs/common/assets/More.svg';
import { ReactComponent as AssetManagementIcon } from '../../../../../libs/common/assets/Assets.svg';
import { ReactComponent as HomeIcon } from '../../../../../libs/common/assets/home.svg';
import { ReactComponent as LoanIcon } from '../../../../../libs/common/assets/Loan.svg';
import { ReactComponent as MISReportIcon } from '../../../../../libs/common/assets/mis_report.svg';
import { ReactComponent as PayrollProcessingIcon } from '../../../../../libs/common/assets/Payroll Processing.svg';
import { ReactComponent as TravelIcon } from '../../../../../libs/common/assets/Travel.svg';
import { ReactComponent as UtilityIcon } from '../../../../../libs/common/assets/Utility.svg';
import { ReactComponent as ReportIcon } from '../../../../../libs/common/assets/MIS Reports.svg';

import { ReactComponent as More } from '../../../../../libs/common/assets/More.svg';

interface Menu {
  label: string;
  key: string;
  type?: string;
  subMenu?: Object;
  icon?: any;
  link?: string;
  identity?: string;
}

interface MoreMenu {
  label: string;
  key: string;
  type?: string;
  children?: Object;
  icon?: any;
  link?: string;
  identity?: string;
}

const MoreMenu: MoreMenu[] = [
  {
    label: 'Loan Advance',
    key: '8',
    type: 'Loan & Advance',
    children: Loan_Sub_Menu,
    icon: <LoanIcon />,
    identity: 'loanadvance',
  },
  {
    label: 'Payroll Processing',
    key: '9',
    type: 'Payroll Processing',
    children: Payroll_Processing_Sub_Menu,
    icon: <PayrollProcessingIcon />,
    identity: 'payrollprocessing',
  },
  {
    label: 'Asset',
    key: '10',
    type: 'Assets Management',
    children: Asset_Sub_Menu,
    icon: <AssetManagementIcon />,
    identity: 'asset',
  },
  {
    label: 'Travel',
    key: '11',
    type: 'Travel Requisition',
    children: Travel_Sub_Menu,
    icon: <TravelIcon />,
    identity: 'travel',
  },
];

export const Menus: Menu[] = [
  {
    label: 'Home',
    key: '1',
    type: 'home',
    identity: 'home',
    icon: HomeIcon,
    link: '/',
  },
  {
    label: 'Master Data',
    key: '2',
    type: 'Master data',
    identity: 'masterdata',
    subMenu: MasterData_Sub_Menu,
    icon: SettingsIcon,
  },

  {
    label: 'Employee Management',
    key: '3',
    type: 'Employee Management',
    // subMenu: Employee_Sub_Menu,
    identity: 'employeemanagement',
    icon: EmpManagementIcon,
    link: '/view-employee-details',
  },

  {
    label: 'Leave Management',
    key: '5',
    type: 'Leave Management',
    identity: 'leavemanagement',
    // subMenu: Leave_Sub_Menu,
    icon: LeaveManagementIcon,
    link: '/view-attendance',
  },
  {
    label: 'Payroll Configurations',
    key: '4',
    type: 'Payroll Configurations',
    identity: 'payrollconfigurations',
    //subMenu: Payroll_Sub_Menu,
    icon: PayrollConfigurationIcon,
    link: '/create-income-tax-slabs',
  },
  {
    label: 'Payroll Processing',
    key: '9',
    type: 'Payroll Processing',
    icon: PayrollProcessingIcon,
    link: '/view-employee-salary-pay-master',
    identity: 'payrollprocessing',
  },
  {
    label: 'Expense',
    key: '6',
    identity: 'expense',
    type: 'Expense & Reimbursement',
    // subMenu: Expense_Sub_Menu,
    icon: ExpenseIcon,
    link: '/view-reimbursement-request',
  },
  // {
  //   label: 'Loan Advance',
  //   key: '8',
  //   type: 'Loan & Advance',
  //   icon: LoanIcon,
  //   link: '/view-loan-advance',
  //   identity: 'loanadvance',
  // },

  {
    label: 'Asset',
    key: '10',
    type: 'Assets Management',
    icon: AssetManagementIcon,
    link: '/view-brand-master',
    identity: 'assetsmanagement',
  },
  {
    label: 'Travel',
    key: '11',
    type: 'Travel Requisition',
    icon: TravelIcon,
    link: '/view-travel',
    identity: 'travelrequisition',
  },
  {
    label: 'Utility',
    key: '12',
    type: 'Utility',
    icon: UtilityIcon,
    link: '/view-news-entry',
    identity: 'utility',
  },
  {
    label: 'MIS Reports',
    key: '13',
    type: 'mis',
    icon: ReportIcon,
    link: '/view-payslip-report',
    identity: 'misreports',
  },
];
