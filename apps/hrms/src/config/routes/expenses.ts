const RequestMenu = [
  {
    url: '/view-reimbursement-request',
    viewtitle: 'Reimbursement Request',
    isBreadcrumb: false,
    buttonTitle: 'Add Reimbursement Request',
    createUrl: '/create-reimbursement-request',
    mainmodule: 'expense',
    isexport: true,
    isviewBreadcrumb: true,
  },

  {
    url: '/create-reimbursement-request',
    isBreadcrumb: true,
    buttonTitle: 'Reimbursement Request',
    backUrl: '/view-reimbursement-request',
    mainmodule: 'expense',
  },
];
const ApproveRejectMenu = [
  {
    url: '/reimbursement-approve-reject',
    viewtitle: 'Reimbursement Approve Reject',
    isBreadcrumb: false,
    mainmodule: 'expense',
    isviewBreadcrumb: true,
  },
];
// const ReportMenu = [
//   {
//     url: '/reimbursement-report',
//     title: 'Reimbursement Report',
//     mainmodule: 'expense',
//   },
// ];

export const ExpenseMenu = [
  ...RequestMenu,
  ...ApproveRejectMenu,
  // ...ReportMenu,
];
