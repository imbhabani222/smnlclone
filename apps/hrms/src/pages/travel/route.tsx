import CreateTravel from './travelRequest/create';
import ViewTravel from './travelRequest/view';
import ApprovalTravel from './travelApproveReject/Create';
import TravelReport from './travelReport/Create';

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
  identity: string;
}

export const Travel_Sub_Menu: MenuItem[] = [
  {
    label: 'Travel Request',
    key: '/view-travel',
    mainkey: '/view-travel',
    path: '/view-travel',
    component: ViewTravel,
    element: <MainComponent />,
    buttonLink: '/create-travel',
    buttonTitle: 'Add Travel',
    identity: 'travelrequisition',
  },
  {
    label: 'Raise Travel Request',
    key: '/create-travel',
    mainkey: '/view-travel',
    path: '/create-travel',
    component: CreateTravel,
    element: <MainComponent />,
    hidden: true,
    identity: 'travelrequisition',
  },
  {
    label: 'Edit Travel',
    key: '/edit-travel',
    mainkey: '/view-travel',
    path: '/edit-travel',
    component: CreateTravel,
    element: <MainComponent />,
    hidden: true,
    identity: 'travelrequisition',
  },
  {
    label: 'Travel Approval',
    key: '/travel-approval',
    mainkey: '/travel-approval',
    path: '/travel-approval',
    component: ApprovalTravel,
    element: <MainComponent />,
    identity: 'travelrequisition',
  },
  {
    label: 'Travel Report',
    key: '/travel-report',
    mainkey: '/travel-report',
    path: '/travel-report',
    component: TravelReport,
    element: <MainComponent />,
    identity: 'travelrequisition',
  },
  {
    label: 'Travel Request Approval',
    key: '/travel-request-approval',
    mainkey: '/view-travel',
    path: '/travel-request-approval',
    component: CreateTravel,
    element: <MainComponent />,
    hidden: true,
    identity: 'travelrequisition',
  },
  // {
  //   label: 'Loan Advance',
  //   key: '/view-loan-advance',
  //   mainkey: '/view-loan-advance',
  //   path: '/view-loan-advance',
  //   component: ViewLoanAdvance,
  //   element: <MainComponent />,
  //   buttonLink: '/create-loan-advance',
  //   buttonTitle: 'Add Loan Advance',
  // },
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
