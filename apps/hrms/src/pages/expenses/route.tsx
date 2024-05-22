import ViewReimburesment from './reimbursementRequest/view';
import Create from './reimbursementRequest/create';
import ApproveRequest from './reimbursementRequest/createapproval';
import ViewApproval from './reimbursementRequest/viewapproval';
import ViewApprovalReport from './reimbursementRequest/approvalReport';
import Expense from './index';
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
  identity: string
}

export const Expense_Sub_Menu: MenuItem[] = [
  {
    label: 'Expense Request',
    key: '/view-reimbursement-request',
    mainkey: '/view-reimbursement-request',
    path: '/view-reimbursement-request',
    component: ViewReimburesment,
    element: <MainComponent />,
    buttonLink: '/create-expense-request',
    buttonTitle: 'Create Expense',
    identity: 'expense',
  },
  {
    label: 'Expense Request',
    key: '/create-expense-request',
    mainkey: '/view-reimbursement-request',
    path: '/create-expense-request',
    component: Create,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'expense',
  },

  {
    label: 'Expense Request',
    key: '/edit-expense-request',
    mainkey: '/view-reimbursement-request',
    path: '/edit-expense-request',
    component: Create,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'expense',
  },
  {
    label: 'Expense Request',
    key: '/expense-request-approval',
    mainkey: '/view-reimbursement-request',
    path: '/expense-request-approval',
    component: ApproveRequest,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'expense',
  },

  {
    label: 'Expense Approvals',
    key: '/expense-approvals',
    mainkey: '/expense-approvals',
    path: '/expense-approvals',
    component: ViewApproval,
    element: <MainComponent />,
    identity: 'expense',
  },
  {
    label: 'Expense Reports',
    key: '/expense-report',
    mainkey: '/expense-report',
    path: '/expense-report',
    component: ViewApprovalReport,
    element: <MainComponent />,
    hidden: true,
    identity: 'expense',
  },
];
