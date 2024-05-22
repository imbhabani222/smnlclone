const TaxSlabsMenu = [
  {
    url: '/view-income-tax-slabs',
    viewtitle: 'Income Tax Slabs',
    isBreadcrumb: false,
    buttonTitle: 'Add New',
    createUrl: '/create-income-tax-slabs',
    module: 'payrollconfiguration',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-income-tax-slabs',
    title: 'Create Income Tax Slabs',
    isBreadcrumb: true,
    buttonTitle: 'Add Other Details',
    backUrl: '/view-income-tax-slabs',
    module: 'payrollconfiguration',
  },
  {
    url: '/edit-income-tax-slabs',
    title: 'Edit Income Tax Slabs',
    isBreadcrumb: true,
    buttonTitle: 'Add Other Details',
    backUrl: '/view-income-tax-slabs',
    module: 'payrollconfiguration',
  },
];

const InvestmentSectionMenu = [
  {
    url: '/edit-investment-section-items',
    title: 'Update Investment Section Master',
    isBreadcrumb: true,
    buttonTitle: 'Edit Investment Section Items ',
    backUrl: '/view-investment-section-items',
    module: 'payrollconfiguration',
  },
  {
    url: '/view-investment-section-items',
    viewtitle: 'Investment Section Item Master List',
    isBreadcrumb: false,
    buttonTitle: 'Add Section Master',
    createUrl: '/create-investment-section-item',
    module: 'payrollconfiguration',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-investment-section-item',
    title: 'Add Section Master',
    isBreadcrumb: true,
    buttonTitle: 'Add Section Master',
    backUrl: '/view-investment-section-items',
    module: 'payrollconfiguration',
  },
];

const ProfessionalTaxMenu = [
  {
    url: '/edit-pt-slabs',
    title: 'Professional Tax Slab Details',
    isBreadcrumb: true,
    buttonTitle: 'Add Other Details',
    backUrl: '/view-income-tax-slabs',
    module: 'payrollconfiguration',
  },
  {
    url: '/edit-professional-tax-slabs',
    title: 'Update Professional Tax Slabs',
    isBreadcrumb: true,
    buttonTitle: 'Edit Professional Tax Slabs',
    backUrl: '/view-professional-tax-slabs',
    module: 'payrollconfiguration',
  },
  {
    url: '/view-professional-tax-slabs',
    viewtitle: 'Professional Tax Slabs',
    isBreadcrumb: false,
    buttonTitle: 'Add Professional Tax Slab',
    createUrl: '/create-professional-tax-slab',
    module: 'payrollconfiguration',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-professional-tax-slab',
    title: 'Professional Tax Slab Details',
    isBreadcrumb: true,
    buttonTitle: 'Add New PT Slab',
    backUrl: '/view-professional-tax-slabs',
    module: 'payrollconfiguration',
  },
];

export const PayrollConfigMenu = [
  ...TaxSlabsMenu,
  ...InvestmentSectionMenu,
  ...ProfessionalTaxMenu,
];
