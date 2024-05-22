import MainComponent from './index';
import PayslipReport from './payslipReports/View';
import LeaveReport from './leaveReports/view';
import PFreport from './pfReports/view';
import PTreport from './ptReports/view';
import EsiReport from './esiReports/view';
import EmployeeSalaryReport from './salaryReport/view';
import FianlSettlementReport from './finalSettlementReport/view';
import EmployeeHistoryReport from './employeeHistoryReport/view';
import BankSheetRegisterReport from './banksheetReport/view';
import HalfYearlyRegisterReport from './halfyearlyReturn/view';
import NoticeReport from './showcaseNoticeReport/view';
import Salaryminusincentives from './salaryminusIncentiveReport/create';
import AttendanveReport from './attendenceReport/Index';
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

export const misSubMenus: MenuItem[] = [
  {
    label: 'Pay Register',
    key: '/view-payslip-report',
    mainkey: '/view-payslip-report',
    path: '/view-payslip-report',
    component: PayslipReport,
    element: <MainComponent />,
    //  buttonLink: '/create-loan-advance',
    //  buttonTitle: 'Add Loan Advance',
    identity: 'misreports',
  },
  {
    label: 'Leave Balance',
    key: '/view-leave-report',
    mainkey: '/view-leave-report',
    path: '/view-leave-report',
    component: LeaveReport,
    element: <MainComponent />,
    //  buttonLink: '/create-loan-advance',
    //  buttonTitle: 'Add Loan Advance',
    identity: 'misreports',
  },
  {
    label: 'PF Report',
    key: '/view-pf-report',
    mainkey: '/view-pf-report',
    path: '/view-pf-report',
    component: PFreport,
    element: <MainComponent />,
    //  buttonLink: '/create-loan-advance',
    //  buttonTitle: 'Add Loan Advance',
    identity: 'misreports',
  },
  {
    label: 'PT Report',
    key: '/view-pt-report',
    mainkey: '/view-pt-report',
    path: '/view-pt-report',
    component: PTreport,
    element: <MainComponent />,
    //  buttonLink: '/create-loan-advance',
    //  buttonTitle: 'Add Loan Advance',
    identity: 'misreports',
  },
  {
    label: 'ESI Report',
    key: '/view-esi-report',
    mainkey: '/view-esi-report',
    path: '/view-esi-report',
    component: EsiReport,
    element: <MainComponent />,
    //  buttonLink: '/create-loan-advance',
    //  buttonTitle: 'Add Loan Advance',
    identity: 'misreports',
  },
  {
    label: 'Salary Report',
    key: '/view-Salary-report',
    mainkey: '/view-Salary-report',
    path: '/view-Salary-report',
    component: EmployeeSalaryReport,
    element: <MainComponent />,
    //  buttonLink: '/create-loan-advance',
    //  buttonTitle: 'Add Loan Advance',
    identity: 'misreports',
  },
  {
    label: 'Attendance Report',
    key: '/view-Attendance-report',
    mainkey: '/view-Attendance-report',
    path: '/view-Attendance-report',
    component: AttendanveReport,
    element: <MainComponent />,
    //  buttonLink: '/create-loan-advance',
    //  buttonTitle: 'Add Loan Advance',
    identity: 'misreports',
  },
  {
    label: 'Settlement Report',
    key: '/view-settlement-report',
    mainkey: '/view-settlement-report',
    path: '/view-settlement-report',
    component: FianlSettlementReport,
    element: <MainComponent />,
    //  buttonLink: '/create-loan-advance',
    //  buttonTitle: 'Add Loan Advance',
    identity: 'misreports',
  },
  {
    label: 'Employee History Report',
    key: '/view-employee-history-report',
    mainkey: '/view-employee-history-report',
    path: '/view-employee-history-report',
    component: EmployeeHistoryReport,
    element: <MainComponent />,
    //  buttonLink: '/create-loan-advance',
    //  buttonTitle: 'Add Loan Advance',
    identity: 'misreports',
  },
  {
    label: 'Showcase Notice Report',
    key: '/notice-report',
    mainkey: '/notice-report',
    path: '/notice-report',
    component: NoticeReport,
    element: <MainComponent />,
    //  buttonLink: '/create-loan-advance',
    //  buttonTitle: 'Add Loan Advance',
    identity: 'misreports',
  },
  {
    label: 'Bank Sheet Register Report',
    key: '/view-bank-sheet-report',
    mainkey: '/view-bank-sheet-report',
    path: '/view-bank-sheet-report',
    component: BankSheetRegisterReport,
    element: <MainComponent />,
    //  buttonLink: '/create-loan-advance',
    //  buttonTitle: 'Add Loan Advance',
    identity: 'misreports',
  },
  {
    label: 'Half Yearly Return Report',
    key: '/view-half-yearly-report',
    mainkey: '/view-half-yearly-report',
    path: '/view-half-yearly-report',
    component: HalfYearlyRegisterReport,
    element: <MainComponent />,
    //  buttonLink: '/create-loan-advance',
    //  buttonTitle: 'Add Loan Advance',
    identity: 'misreports',
  },
  {
    label: 'Salary Report without Incentives',
    key: '/view-salary-minus-incentives-report',
    mainkey: '/view-salary-minus-incentives-report',
    path: '/view-salary-minus-incentives-report',
    component: Salaryminusincentives,
    element: <MainComponent />,
    //  buttonLink: '/create-loan-advance',
    //  buttonTitle: 'Add Loan Advance',
    identity: 'misreports',
  },
  // {
  //   label: 'Show case Notice Report',
  //   key: '/view-notice-report',
  //   mainkey: '/view-notice-report',
  //   path: '/view-notice-report',
  //   component: NoticeReport,
  //   element: <MainComponent />,
  //   //  buttonLink: '/create-loan-advance',
  //   //  buttonTitle: 'Add Loan Advance',
  //   identity: 'misreports',

  // }
  // {
  //   label: 'Create Loan Advance',
  //   key: '/create-loan-advance',
  //   mainkey: '/view-loan-advance',
  //   path: '/create-loan-advance',
  //   component: CreateLoanAdvance,
  //   element: <MainComponent />,
  //   hidden: true,
  // },
  // {
  //   label: 'Edit Loan Advance',
  //   key: '/edit-loan-advance',
  //   mainkey: '/view-loan-advance',
  //   path: '/edit-loan-advance',
  //   component: CreateLoanAdvance,
  //   element: <MainComponent />,
  //   hidden: true,
  // },
  // {
  //   label: 'Loan Advance Approvals',
  //   key: '/loan-advance-approvals',
  //   mainkey: '/loan-advance-approvals',
  //   path: '/loan-advance-approvals',
  //   component: ViewLoanAdvanceApproval,
  //   element: <MainComponent />,
  // },
  // {
  //   label: 'Loan Advance Approval',
  //   key: '/loan-advnace-approval',
  //   mainkey: '/view-loan-advance',
  //   path: '/loan-advnace-approval',
  //   component: CreateLoanAdvanceApproval,
  //   element: <MainComponent />,
  //   hidden: true,
  // },

  // {
  //   label: 'Loan Advance Report',
  //   key: '/loan-advance-report',
  //   mainkey: '/loan-advance-report',
  //   path: '/loan-advance-report',
  //   component: LoanAdvanceReport,
  //   element: <MainComponent />,
  // },
  // {
  //   label: 'Advance Payment Collection',
  //   key: '/view-advance-payment-collection',
  //   mainkey: '/view-advance-payment-collection',
  //   path: '/view-advance-payment-collection',
  //   component: ViewAdvancePayment,
  //   element: <MainComponent />,
  //   buttonLink: '/create-advance-payment-collection',
  //   buttonTitle: 'Add Advance Payment Collection',
  // },
  // {
  //   label: 'Create Advance Payment Collection',
  //   key: '/create-advance-payment-collection',
  //   mainkey: '/view-advance-payment-collection',
  //   path: '/create-advance-payment-collection',
  //   component: CreateAdvancePayment,
  //   element: <MainComponent />,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Edit Advance Payment Collection',
  //   key: '/edit-advance-payment-collection',
  //   mainkey: '/view-advance-payment-collection',
  //   path: '/edit-advance-payment-collection',
  //   component: CreateAdvancePayment,
  //   element: <MainComponent />,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Expense Reports',
  //   key: '/expense-report',
  //   mainkey: '/expense-report',
  //   path: '/expense-report',
  //   component: ViewReimburesment,
  //   element: <MainComponent />,
  // },
  // {
  //   label: 'Approvals',
  //   key: '/expense-approvals',
  //   title: 'Approvals',
  //   path: '/expense-approvals',
  //   component: ViewReimburesment,
  // },
  // {
  //   label: 'Report',
  //   key: '/expense/approvals',
  //   title: 'Approvals',
  //   path: '/expense/approvals',
  //   component: ViewReimburesment,
  // },
  // { label: ' Reimbursement Report', link: '/reimbursement-report' },
];
