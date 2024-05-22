const LoanAdvanceMenu = [
  {
    url: '/loan-advance',
    viewtitle: 'Loan Advance',
    isBreadcrumb: false,
    buttonTitle: 'Add Loan Advance',
    createUrl: '/add-loan-advance',
    mainmodule: 'loanAdvance',
    isexport: true,
    isviewBreadcrumb: true,
  },
  {
    url: '/add-loan-advance',
    title: 'Loan Advance',
    isBreadcrumb: true,
    buttonTitle: 'Add Loan Advance',
    backUrl: '/loan-advance',
    mainmodule: 'loanAdvance',
  },
];

const AdvanceReportMenu = [
  {
    url: '/loan-advance-report',
    viewtitle: 'Loan Advance',
    isBreadcrumb: false,
    buttonTitle: '',
    createUrl: '',
    mainmodule: 'loanAdvance',
    isviewBreadcrumb: true,
  },
];

const AdvancePaymentCollection = [
  {
    url: '/advance-payment-collection',
    viewtitle: 'Loan Advance Payment Collection',
    isBreadcrumb: false,
    buttonTitle: 'Add Loan Advance Payment Collection',
    createUrl: '/add-advance-payment-collection',
    mainmodule: 'loanAdvance',
    isviewBreadcrumb: true,
  },
  {
    url: '/add-advance-payment-collection',
    title: 'Loan Advance Payment Collection',
    isBreadcrumb: true,
    buttonTitle: 'Add Loan Advance Payment Collection',
    backUrl: '/advance-payment-collection',
    mainmodule: 'loanAdvance',
  },
  {
    url: '/edit-advance-payment-collection',
    title: 'Loan Advance Payment Collection',
    isBreadcrumb: true,
    buttonTitle: 'Edit Loan Advance Payment Collection',
    backUrl: '/advance-payment-collection',
    mainmodule: 'loanAdvance',
  },
];

export const LoanMenu = [
  ...LoanAdvanceMenu,
  ...AdvanceReportMenu,
  ...AdvancePaymentCollection,
];
