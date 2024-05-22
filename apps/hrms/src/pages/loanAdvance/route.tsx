import ViewLoanAdvance from './LoanAdvance/view';
import CreateLoanAdvance from './LoanAdvance/create';
import ViewLoanAdvanceApproval from './LoanAdvance/loanadvanceApprovals';
import CreateLoanAdvanceApproval from './LoanAdvance/createloanadvanceapprovals';
import ViewAdvancePayment from './AdvancePaymentCollection/view';
import CreateAdvancePayment from './AdvancePaymentCollection/create';
import LoanAdvanceReport from './LoanAdvance/loanadvanceReport';
import MainComponent from './index';

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
}

export const Loan_Sub_Menu: MenuItem[] = [
  {
    label: 'Loan Advance',
    key: '/view-loan-advance',
    mainkey: '/view-loan-advance',
    path: '/view-loan-advance',
    component: ViewLoanAdvance,
    element: <MainComponent />,
    buttonLink: '/create-loan-advance',
    buttonTitle: 'Add Loan Advance',
  },
  {
    label: 'Create Loan Advance',
    key: '/create-loan-advance',
    mainkey: '/view-loan-advance',
    path: '/create-loan-advance',
    component: CreateLoanAdvance,
    element: <MainComponent />,
    hidden: true,
  },
  {
    label: 'Edit Loan Advance',
    key: '/edit-loan-advance',
    mainkey: '/view-loan-advance',
    path: '/edit-loan-advance',
    component: CreateLoanAdvance,
    element: <MainComponent />,
    hidden: true,
  },
  {
    label: 'Loan Advance Approvals',
    key: '/loan-advance-approvals',
    mainkey: '/loan-advance-approvals',
    path: '/loan-advance-approvals',
    component: ViewLoanAdvanceApproval,
    element: <MainComponent />,
  },
  {
    label: 'Loan Advance Approval',
    key: '/loan-advnace-approval',
    mainkey: '/view-loan-advance',
    path: '/loan-advnace-approval',
    component: CreateLoanAdvanceApproval,
    element: <MainComponent />,
    hidden: true,
  },

  {
    label: 'Loan Advance Report',
    key: '/loan-advance-report',
    mainkey: '/loan-advance-report',
    path: '/loan-advance-report',
    component: LoanAdvanceReport,
    element: <MainComponent />,
  },
  {
    label: 'Advance Payment Collection',
    key: '/view-advance-payment-collection',
    mainkey: '/view-advance-payment-collection',
    path: '/view-advance-payment-collection',
    component: ViewAdvancePayment,
    element: <MainComponent />,
    buttonLink: '/create-advance-payment-collection',
    buttonTitle: 'Add Advance Payment Collection',
  },
  {
    label: 'Create Advance Payment Collection',
    key: '/create-advance-payment-collection',
    mainkey: '/view-advance-payment-collection',
    path: '/create-advance-payment-collection',
    component: CreateAdvancePayment,
    element: <MainComponent />,
    hidden: true,
    isback: true,
  },
  {
    label: 'Edit Advance Payment Collection',
    key: '/edit-advance-payment-collection',
    mainkey: '/view-advance-payment-collection',
    path: '/edit-advance-payment-collection',
    component: CreateAdvancePayment,
    element: <MainComponent />,
    hidden: true,
    isback: true,
  },
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
