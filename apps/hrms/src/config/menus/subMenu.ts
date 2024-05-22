interface MenuItem {
  label: string;
  link?: string;
  key: string;
  identity?: string;
  type?: string;
}

export const Home_Sub_Menu: MenuItem[] = [
  { label: 'DashBoard', link: '/dashboard', key: '/dashboard' },
];

export const Loan_Sub_Menu: MenuItem[] = [
  {
    label: 'Loan Advance',
    link: '/loan-advance',
    key: '/loan-advance',
  },
  {
    label: 'Advance Payment Collection',
    link: '/advance-payment-collection',
    key: '/advance-payment-collection',
  },
];

export const Asset_Sub_Menu: MenuItem[] = [
  {
    label: 'Brand Master',
    link: '/brand-master',
    key: '/brand-master',
  },
  {
    label: 'Asset Master',
    link: '/asset-master',
    key: '/asset-master',
  },
  {
    label: 'Asset Request',
    link: '/asset-request',
    key: '/asset-request',
  },
];

export const MasterData_Sub_Menu: MenuItem[] = [
  {
    label: 'Organization Settings',
    link: '/view-state',
    key: '/view-state',
    identity: 'organizationsettings',
    type: 'masterdata',
  },
  {
    label: 'Employee Settings',
    link: '/view-qualification',
    key: '/view-qualification',
    identity: 'employeesettings',
    type: 'masterdata',
  },
];

export const MasterData_Header_Menu: MenuItem[] = [
  {
    label: 'State',
    link: '/view-state',
    key: '/view-state',
  },
  {
    label: 'Grade',
    link: '/view-grade',
    key: '/view-grade',
  },
  {
    label: 'Section',
    link: '/view-section',
    key: '/view-section',
  },
  {
    label: 'Designation',
    link: '/view-designation',
    key: '/view-designation',
  },
  {
    label: 'Department',
    link: '/view-department',
    key: '/view-department',
  },
  {
    label: 'Nature of Claims',
    link: '/view-claims',
    key: '/view-claims',
  },
  {
    label: 'Company Details',
    link: '/view-company-details',
    key: '/view-company-details',
  },
  {
    label: 'Bank Master',
    link: '/view-bank-master',
    key: '/view-bank-master',
  },
  {
    label: 'Work Location',
    link: '/view-work-location',
    key: '/view-work-location',
  },
  {
    label: 'Branch Master',
    link: '/view-branch-master',
    key: '/view-branch-master',
  },
  {
    label: 'Employee Type',
    link: '/view-employment-type',
    key: '/view-employment-type',
  },
  {
    label: 'Qualification',
    link: '/view-qualification',
    key: '/view-qualification',
  },
  {
    label: 'Employee Category',
    link: '/view-employee-category',
    key: '/view-employee-category',
  },
  {
    label: 'Shift Master',
    link: '/view-shift-master',
    key: '/view-shift-master',
  },
  {
    label: 'Salary Parameter Master',
    link: '/view-salary-parameter-master',
    key: '/view-salary-parameter-master',
  },
  {
    label: 'Leave Type Master',
    link: '/view-leave-type-master',
    key: '/view-leave-type-master',
  },
  {
    label: 'Overtime Category',
    link: '/view-overtime-category-details',
    key: '/view-overtime-category-details',
  },
  {
    label: 'Roles',
    link: '/view-roles',
    key: '/view-roles',
  },
  {
    label: 'Permissions',
    link: '/set-permissions',
    key: '/set-permissions',
  },
  {
    label: 'Users',
    link: '/view-users',
    key: '/view-users',
  },
];

export const Payroll_Sub_Menu: MenuItem[] = [
  {
    label: 'Income Tax Slabs',
    link: '/view-income-tax-slabs',
    key: '/view-income-tax-slabs',
  },
  {
    label: 'Investment section',
    link: '/view-investment-section',
    key: '/view-investment-section',
  },
  {
    label: 'Investment Section Items',
    link: '/view-investment-section-items',
    key: '/view-investment-section-items',
  },
  {
    label: 'Professional Tax Slabs',
    link: '/view-professional-tax-slabs',
    key: '/view-professional-tax-slabs',
  },
  {
    label: 'General Configuration',
    link: '/create-general-configuration',
    key: '/create-general-configuration',
  },
];

export const Employee_Sub_Menu: MenuItem[] = [
  {
    label: 'Employee Setup',
    link: '/view-employee-details',
    key: '/view-employee-details',
  },
  {
    label: 'Resigned Employee List',
    link: '/view-resigned-employee-list',
    key: '/view-resigned-employee-list',
  },
  {
    label: 'Employee Notice Letter',
    link: '/view-employee-NoticeLetter',
    key: '/view-employee-NoticeLetter',
  },
];

export const Utility_Sub_Menu: MenuItem[] = [
  {
    label: 'News Entry',
    link: '/view-news-entry',
    key: '/view-news-entry',
  },
  {
    label: 'Public Holiday List',
    link: '/view-public-holidays',
    key: '/view-public-holidays',
  },
  {
    label: 'Organization Chart',
    link: '/view-organization-chart',
    key: '/view-organization-chart',
  },
  {
    label: 'Optional Holidays',
    link: '/view-optional-holidays',
    key: '/view-optional-holidays',
  },
];

export const Leave_Sub_Menu: MenuItem[] = [
  {
    label: 'Leave Setup by  Category',
    link: '/employee-category-leave-setup',
    key: '/employee-category-leave-setup',
  },
  {
    label: 'Leave Setup',
    link: '/leave-setup',
    key: '/leave-setup',
  },
  {
    label: 'Leave Request',
    link: '/leave-request',
    key: '/leave-request',
  },
  {
    label: 'Leave Approval/Rejection',
    link: '/leave-approval-rejection',
    key: '/leave-approval-rejection',
  },
  {
    label: 'Leave Encashment',
    link: '/leave-encashment',
    key: '/leave-encashment',
  },
  {
    label: 'Leave Encashment Approval/Rejection',
    link: '/approve-encashment',
    key: '/approve-encashment',
  },
];

export const Expense_Sub_Menu: MenuItem[] = [
  {
    label: 'Request',
    link: '/view-reimbursement-request',
    key: '/view-reimbursement-request',
  },
  {
    label: 'Approvals',
    link: '/reimbursement-approve-reject',
    key: '/reimbursement-approve-reject',
  },
];

export const Travel_Sub_Menu: MenuItem[] = [
  {
    label: 'Travel Request',
    link: '/travel-request',
    key: '/travel-request',
  },
];

export const Payroll_Processing_Sub_Menu: MenuItem[] = [
  {
    label: 'Additional Allowance',
    link: '/view-additional-allowance',
    key: '/view-additional-allowance',
  },
  {
    label: 'Stock Allowances',
    link: '/view-stock-allowances',
    key: '/view-stock-allowances',
  },
];
