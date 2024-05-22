import ViewSalarySetup from './salarySetupEmployee/view';
import AdditionalAllowance from './additionalAllowance/view';
import StockAllowance from './stockAllowance/view';
import MainComponent from './index';
import SalaryProcessing from './salaryProcessing/create';
import SalaryRollBack from "./salaryRollback/create"
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
  identity: string
}

export const Payroll_Processing_Sub_Menu: MenuItem[] = [
  {
    label: 'Employee Salary Pay Master',
    key: '/view-employee-salary-pay-master',
    mainkey: '/view-employee-salary-pay-master',
    path: '/view-employee-salary-pay-master',
    component: ViewSalarySetup,
    element: <MainComponent />,
    identity: 'payrollprocessing',
  },
  {
    label: 'Additional Allowance',
    key: '/additional-allowance',
    mainkey: '/additional-allowance',
    path: '/additional-allowance',
    component: AdditionalAllowance,
    element: <MainComponent />,
    identity: 'payrollprocessing',
  },
  {
    label: 'Stock Allowances',
    key: '/stock-allowance',
    mainkey: '/stock-allowance',
    path: '/stock-allowance',
    component: StockAllowance,
    element: <MainComponent />,
    identity: 'payrollprocessing',
  },
  {
    label: 'Salary Processing',
    key: '/salary-processing',
    mainkey: '/salary-processing',
    path: '/salary-processing',
    component: SalaryProcessing,
    element: <MainComponent />,
    identity: 'payrollprocessing',
  },
  {
    label: 'Processed Salary Rollback',
    key: '/processed-salary-rollback',
    mainkey: '/processed-salary-rollback',
    path: '/processed-salary-rollback',
    component: SalaryRollBack,
    element: <MainComponent />,
    identity: 'payrollprocessing', 
  }
  // {
  //     label: "Salary Processing",
  //     key: "",
  //     mainkey: "",
  //     path: "",
  //     component: AdditionalAllowance,
  //     element: <MainComponent />
  // },
  // {
  //     label: "Email Payslip",
  //     key: "",
  //     mainkey: "",
  //     path: "",
  //     component: AdditionalAllowance,
  //     element: <MainComponent />
  // },
  // {
  //     label: "Send SMS",
  //     key: "",
  //     mainkey: "",
  //     path: "",
  //     component: AdditionalAllowance,
  //     element: <MainComponent />
  // }
];
