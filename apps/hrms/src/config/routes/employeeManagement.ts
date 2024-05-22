const EmployeeListMenu = [
  {
    url: '/view-employee-list',
    viewtitle: 'Employee List',
    isBreadcrumb: false,
    buttonTitle: 'Filter',
    mainmodule: 'employeemanagement',
    isviewBreadcrumb: true,
  },
  {
    url: '/house-rent-declaration',
    viewtitle: 'House Rent Declaration',
    isBreadcrumb: false,
    buttonTitle: 'Filter',
    mainmodule: 'employeemanagement',
    isviewBreadcrumb: true,
  },
];

const ResignationMenu = [
  {
    url: '/add-resignation-details',
    title: 'Employee Resignation Details',
    isBreadcrumb: true,
    buttonTitle: 'Employee Resignation Details',
    mainmodule: 'employeemanagement',
  },
];
const InvestmentMenu = [
  {
    url: '/view-employee-investment-declaration',
    viewtitle: 'Employee Investement Declaration',
    isBreadcrumb: false,
    buttonTitle: 'Add Investment Declaration',
    createUrl: '/create-employee-investment-declaration',
    mainmodule: 'employeemanagement',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-employee-investment-declaration',
    // title: "Employee Details",
    isBreadcrumb: true,
    buttonTitle: 'Add Investment Declaration',
    backUrl: '/view-employee-investment-declaration',
    mainmodule: 'employeemanagement',
  },
  {
    url: '/edit-employee-investment-declaration',
    title: 'Update Employee Investment Declaration',
    isBreadcrumb: true,
    buttonTitle: 'Edit Investment Declaration ',
    backUrl: '/view-employee-investment-declaration',
    mainmodule: 'employeemanagement',
  },
];

const ResignedEmployeeMenu = [
  {
    url: '/view-resigned-employee-list',
    title: 'Resigned Employee List',
    viewtitle: 'Resigned Employee List',
    isBreadcrumb: false,
    buttonTitle: 'Add Employee Resignation',
    createUrl: '/add-resignation-details',
    mainmodule: 'employeemanagement',
    isexport: true,
    isviewBreadcrumb: true,
  },
  {
    url: '/edit-resignation-details',
    title: 'Update Resigned Employee',
    isBreadcrumb: true,
    buttonTitle: 'Edit Resigned Employee',
    backUrl: '/view-resigned-employee-list',
    mainmodule: 'employeemanagement',
  },
];
const NoticeLetterMenu = [
  {
    url: '/create-employee-NoticeLetter',
    title: 'Employee Details',
    viewtitle: 'Create Employee Details',
    isBreadcrumb: true,
    backUrl: '/view-employee-NoticeLetter',
    mainmodule: 'employeemanagement',
  },
  {
    url: '/edit-employee-NoticeLetter',
    title: 'Employee Details',
    viewtitle: 'Edit Employee Details',
    isBreadcrumb: true,
    backUrl: '/view-employee-NoticeLetter',
    mainmodule: 'employeemanagement',
  },
  {
    url: '/view-employee-NoticeLetter',
    viewtitle: 'Employee Notice Letter',
    isBreadcrumb: false,
    buttonTitle: 'Add New ',
    createUrl: '/create-employee-NoticeLetter',
    backUrl: '/view-income-tax-slabs',
    mainmodule: 'employeemanagement',
    isviewBreadcrumb: true,
  },
];

const EmployeeSetupTabsMenu = [
  {
    url: '/view-employee-details',
    viewtitle: 'Employee Setup',
    isBreadcrumb: false,
    buttonTitle: 'Add Employee Details',
    createUrl: '/add-employee-details',
    mainmodule: 'employeemanagement',
    isexport: true,
    isviewBreadcrumb: true,
    isFilter: true,
  },
  {
    url: '/add-employee-details',
    title: 'Personal Details',
    isBreadcrumb: true,
    buttonTitle: 'Personal Details',
    backUrl: '/view-employee-details',
    mainmodule: 'employeemanagement',
  },
  {
    url: '/add-details',
    isBreadcrumb: true,
    buttonTitle: 'Add Employee Details',
    backUrl: '/view-employee-details',
    mainmodule: 'employeemanagement',
  },
  {
    url: '/personal-details',
    title: 'Personal Details',
    isBreadcrumb: true,
    buttonTitle: 'Personal Details',
    backUrl: '/view-employee-details',
    mainmodule: 'employeemanagement',
  },
  {
    url: '/official-details',
    title: 'Official Details',
    isBreadcrumb: true,
    buttonTitle: 'Official Details',
    backUrl: '/view-employee-details',
    mainmodule: 'employeemanagement',
  },
  {
    url: '/address-details',
    title: 'Address Details',
    isBreadcrumb: true,
    buttonTitle: 'Address Details',
    backUrl: '/view-employee-details',
    mainmodule: 'employeemanagement',
  },
  {
    url: '/document-details',
    title: 'Document Details',
    isBreadcrumb: true,
    buttonTitle: 'Document Details',
    backUrl: '/view-employee-details',
    mainmodule: 'employeemanagement',
  },
  {
    url: '/other-details',
    title: 'Other Details',
    isBreadcrumb: true,
    buttonTitle: 'Other Details',
    backUrl: '/view-employee-details',
    mainmodule: 'employeemanagement',
  },
  {
    url: '/family-details',
    title: 'Family Details',
    isBreadcrumb: true,
    buttonTitle: 'Family Details',
    backUrl: '/view-employee-details',
    mainmodule: 'employeemanagement',
  },
];

export const EmployeeManagementMenu = [
  ...EmployeeListMenu,
  ...ResignationMenu,
  ...InvestmentMenu,
  //houserentdeclaration
  //employeehistory
  ...ResignedEmployeeMenu,
  ...NoticeLetterMenu,
  ...EmployeeSetupTabsMenu,
];
