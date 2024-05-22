import Expense from './index';
import MainComponent from './index';
import IncomeTaxSlab from './incomeTaxSlabs/create';
import InvestmentSectionItems from './investmentSectionItems/create';
import InvestmentSection from './investmentSection/create';
import ViewInvestmentSection from './investmentSection/view';
import ViewInvestmentSectionItems from './investmentSectionItems/view';
import ProfessionalTaxSlabs from './professionalTaxSlabs/create';
import GeneralConfiguration from './generalConfiguration/create';
import ESISlab from './esiSlabs/create';
import ViewDesignationWiseSalaryParamaters from "./designationSalaryParameter/view";
import ViewHouseRentDeclaration from "./houseRentDeclaration/view"
import CreateHouseRentDeclaration from "./houseRentDeclaration/create";
import ViewInvestmentDeclaration from "./InvestmentDeclaration/view";
import CreateInvestmentDeclaration from "./InvestmentDeclaration/create";
import createDesignationWiseSalaryParamaters from  "./designationSalaryParameter/create";
import CreateNewTaxRegime from "./newIncomeTaxRegime/create"


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

export const Payroll_Sub_Menu: MenuItem[] = [
  {
    label: 'Income Tax Master',
    key: '/create-income-tax-slabs',
    mainkey: '/create-income-tax-slabs',
    path: '/create-income-tax-slabs',
    component: IncomeTaxSlab,
    element: <MainComponent />,
    identity: 'payrollconfigurations',
    // buttonLink: '/create-expense-request',
    //  buttonTitle: 'Create Expense',
  },
  {
    label: 'Income Tax Master (New Regime)',
    key: '/create-new-income-tax-regime',
    mainkey: '/create-new-income-tax-regime',
    path: '/create-new-income-tax-regime',
    component: CreateNewTaxRegime,
    element: <MainComponent />,
    identity: 'payrollconfigurations',
    // buttonLink: '/create-expense-request',
    //  buttonTitle: 'Create Expense',
  },
  {
    label: 'Investment Section ',
    key: '/view-investment-section',
    mainkey: '/view-investment-section',
    path: '/view-investment-section',
    component: ViewInvestmentSection,
    element: <MainComponent />,
    buttonLink: '/create-investment-section',
    buttonTitle: 'Create Investment Section ',
    identity: 'payrollconfigurations',
  },
  {
    label: 'Investment Section ',
    key: '/create-investment-section',
    mainkey: '/view-investment-section',
    path: '/create-investment-section',
    component: InvestmentSection,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'payrollconfigurations',
  },
  {
    label: 'Investment Section Items',
    key: '/view-investment-section-items',
    mainkey: '/view-investment-section-items',
    path: '/view-investment-section-items',
    component: ViewInvestmentSectionItems,
    element: <MainComponent />,
    buttonLink: '/create-investment-section-items',
    buttonTitle: 'Create Investment Section Items',
    identity: 'payrollconfigurations',
  },
  {
    label: 'Investment Section Items',
    key: '/create-investment-section-items',
    mainkey: '/view-investment-section-items',
    path: '/create-investment-section-items',
    component: InvestmentSectionItems,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'payrollconfigurations',
  },
  {
    label: 'Professional Tax Master',
    key: '/create-professional-tax-slabs',
    mainkey: '/create-professional-tax-slabs',
    path: '/create-professional-tax-slabs',
    component: ProfessionalTaxSlabs,
    element: <MainComponent />,
    identity: 'payrollconfigurations',
    // buttonLink: '/create-expense-request',
    //  buttonTitle: 'Create Expense',
  },
  {
    label: 'General Configuration',
    key: '/create-general-configuration',
    mainkey: '/create-general-configuration',
    path: '/create-general-configuration',
    component: GeneralConfiguration,
    element: <MainComponent />,
    identity: 'payrollconfigurations'
  },
  {
    label: 'ESI Slab',
    key: '/create-esi-slabs',
    mainkey: '/create-esi-slabs',
    path: '/create-esi-slabs',
    component: ESISlab,
    element: <MainComponent />,
    identity: 'payrollconfigurations',
  },
  {
    label: 'Designation Wise Salary Parameters',
    key: '/view-designation-wise-salary-parameters',
    mainkey: '/view-designation-wise-salary-parameters',
    path: '/view-designation-wise-salary-parameters',
    component: ViewDesignationWiseSalaryParamaters,
    element: <MainComponent />,
    identity: 'payrollconfigurations',
    buttonLink: '/create-designation-wise-salary-parameters',
    buttonTitle: 'Create Designation Wise Salary Parameters',
  },
  {
    label: 'Designation Wise Salary Parameters',
    key: '/create-designation-wise-salary-parameters',
    mainkey: '/view-designation-wise-salary-parameters',
    path: '/create-designation-wise-salary-parameters',
    component: createDesignationWiseSalaryParamaters,
    element: <MainComponent />,
    identity: 'payrollconfigurations',
    hidden: true,
    isback: true,
  },
  {
    label: 'Edit Designation Wise Salary Parameters',
    key: '/view-designation-wise-salary-parameters',
    mainkey: '/view-designation-wise-salary-parameters',
    path: '/view-designation-wise-salary-parameters',
    component: createDesignationWiseSalaryParamaters,
    element: <MainComponent />,
    identity: 'payrollconfigurations',
    hidden: true,
    isback: true,
  },
  {
    label: 'House Rent Declaration',
    key: '/view-house-rent-declaration',
    mainkey: '/view-house-rent-declaration',
    path: '/view-house-rent-declaration',
    component: ViewHouseRentDeclaration,
    element: <MainComponent />,
    buttonLink: '/create-house-rent-declaration',
    buttonTitle: 'Add House Rent Declaration',
    identity: 'payrollconfigurations',
  },
  {
    label: 'Create House Rent Declaration',
    key: '/create-house-rent-declaration',
    mainkey: '/view-house-rent-declaration',
    path: '/create-house-rent-declaration',
    component: CreateHouseRentDeclaration,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'payrollconfigurations',
  },
  {
    label: 'Edit House Rent Declaration',
    key: '/edit-house-rent-declaration',
    mainkey: '/view-house-rent-declaration',
    path: '/edit-house-rent-declaration',
    component: CreateHouseRentDeclaration,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'payrollconfigurations',
  },

  {
    label: 'Investment Declaration',
    key: '/view-investment-declaration',
    mainkey: '/view-investment-declaration',
    path: '/view-investment-declaration',
    component: ViewInvestmentDeclaration,
    element: <MainComponent />,
    buttonLink: '/create-investment-declaration',
    buttonTitle: 'Add Investment Declaration',
    identity: 'payrollconfigurations',

  },
  {
    label: 'Create Investment Declaration',
    key: '/create-investment-declaration',
    mainkey: '/view-investment-declaration',
    path: '/create-investment-declaration',
    component: CreateInvestmentDeclaration,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'payrollconfigurations',
  },
  {
    label: 'Edit Investment Declaration',
    key: '/edit-investment-declaration',
    mainkey: '/view-investment-declaration',
    path: '/edit-investment-declaration',
    component: CreateInvestmentDeclaration,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'payrollconfigurations',
  }

  // {
  //   label: 'Expense Request',
  //   key: '/view-reimbursement-request',
  //   mainkey: '/view-reimbursement-request',
  //   path: '/view-reimbursement-request',
  //   component: ViewReimburesment,
  //   element: <MainComponent />,
  //   buttonLink: '/create-expense-request',
  //   buttonTitle: 'Create Expense',
  // },
  // {
  //   label: 'Expense Request',
  //   key: '/create-expense-request',
  //   mainkey: '/view-reimbursement-request',
  //   path: '/create-expense-request',
  //   component: Create,
  //   element: <MainComponent />,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Expense Request',
  //   key: '/edit-expense-request',
  //   mainkey: '/view-reimbursement-request',
  //   path: '/edit-expense-request',
  //   component: Create,
  //   element: <MainComponent />,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Expense Request',
  //   key: '/expense-request-approval',
  //   mainkey: '/view-reimbursement-request',
  //   path: '/expense-request-approval',
  //   component: ApproveRequest,
  //   element: <MainComponent />,
  //   hidden: true,
  //   isback: true,
  // },
  // {
  //   label: 'Expense Approvals',
  //   key: '/expense-approvals',
  //   mainkey: '/expense-approvals',
  //   path: '/expense-approvals',
  //   component: ViewApproval,
  //   element: <MainComponent />,
  // },
  // {
  //   label: 'Expense Reports',
  //   key: '/expense-report',
  //   mainkey: '/expense-report',
  //   path: '/expense-report',
  //   component: ViewApprovalReport,
  //   element: <MainComponent />,
  //   hidden: true,
  // },
];
