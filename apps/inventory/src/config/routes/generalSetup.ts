const CountryMenu = [
  {
    url: '/view-country',
    viewtitle: 'Country',
    isBreadcrumb: false,
    buttonTitle: 'Add Country',
    createUrl: '/create-country',
    mainmodule: 'generalsetup',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-country',
    title: 'Add Country',
    isBreadcrumb: true,
    buttonTitle: 'Add Country',
    backUrl: '/view-country',
    mainmodule: 'generalsetup',
  },
  {
    url: '/edit-country',
    title: 'Edit Country',
    isBreadcrumb: true,
    buttonTitle: 'Edit Country',
    backUrl: '/view-country',
    mainmodule: 'generalsetup',
  },
];

const AddCompanySetup = [
  {
    url: '/add-inventory-company-setup',
    title: 'Company Setup',
    buttonTitle: 'Add Company',
    isBreadcrumb: true,
    mainmodule: 'generalsetup',
  },
];

const ApprovalUserlimitMenu = [
  {
    url: '/view-inventory-approval-user',
    viewtitle: 'Approval User Limit List',
    isBreadcrumb: false,
    buttonTitle: 'Add User',
    createUrl: '/create-inventory-approval-user',
    mainmodule: 'generalsetup',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-inventory-approval-user',
    // title: 'Add Approval',
    isBreadcrumb: true,
    buttonTitle: 'Add Approval User Limit Master',
    backUrl: '/view-inventory-approval-user',
    mainmodule: 'generalsetup',
  },
  {
    url: '/edit-inventory-approval-user',
    // title: 'Add Approval',
    isBreadcrumb: true,
    buttonTitle: 'Edit Approval User Limit Master',
    backUrl: '/view-inventory-approval-user',
    mainmodule: 'generalsetup',
  },
];

const StateMenu = [
  {
    url: '/view-state',
    viewtitle: 'State',
    isBreadcrumb: false,
    buttonTitle: 'Add State',
    createUrl: '/create-state',
    mainmodule: 'generalsetup',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-state',
    title: 'Add State',
    isBreadcrumb: true,
    buttonTitle: 'Add State',
    backUrl: '/view-state',
    mainmodule: 'generalsetup',
  },
  {
    url: '/edit-state',
    title: 'Edit State',
    isBreadcrumb: true,
    buttonTitle: 'Edit State',
    backUrl: '/view-state',
    mainmodule: 'generalsetup',
  },
];

const UserRoleMenu = [
  {
    url: '/view-user-role',
    viewtitle: 'User Role',
    isBreadcrumb: false,
    buttonTitle: 'Add User Role',
    createUrl: '/create-user-role',
    mainmodule: 'generalsetup',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-user-role',
    title: 'Add User Role',
    buttonTitle: 'User Role',
    isBreadcrumb: true,
    backUrl: '/view-user-role',
    mainmodule: 'generalsetup',
  },
];
const UserMasterMenu = [
  {
    url: '/view-user-master',
    viewtitle: 'User Master',
    isBreadcrumb: false,
    buttonTitle: 'Add User Master',
    createUrl: '/create-user-master',
    mainmodule: 'generalsetup',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-user-master',
    title: 'Add User Master',
    buttonTitle: 'User Master',
    isBreadcrumb: true,
    backUrl: '/view-user-master',
    mainmodule: 'generalsetup',
  },
];
const SupplierMasterMenu = [
  {
    url: '/view-supplier',
    viewtitle: 'Supplier Master',
    isBreadcrumb: false,
    buttonTitle: 'Add Supplier Master',
    createUrl: '/create-supplier',
    mainmodule: 'generalsetup',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-supplier',
    title: 'Add Supplier Master',
    buttonTitle: 'Supplier Master',
    isBreadcrumb: true,
    backUrl: '/view-supplier',
    mainmodule: 'generalsetup',
  },
  {
    url: '/edit-supplier',
    title: 'Add Supplier Master',
    buttonTitle: 'Supplier Master',
    isBreadcrumb: true,
    backUrl: '/view-supplier',
    mainmodule: 'generalsetup',
  },
];
const SupplierLocationMenu = [
  {
    url: '/view-supplier-location-master',
    viewtitle: 'Supplier Location List',
    isBreadcrumb: false,
    buttonTitle: 'Add User Master',
    createUrl: '/create-supplier-location-master',
    mainmodule: 'generalsetup',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-supplier-location-master',
    title: 'Supplier Location Details',
    isBreadcrumb: true,
    buttonTitle: 'Add Supplier Location',
    backUrl: '/view-supplier-location-master',
    mainmodule: 'generalsetup',
  },
  {
    url: '/edit-supplier-location-master',
    title: 'Edit Supplier Location Details',
    isBreadcrumb: true,
    buttonTitle: 'Edit Supplier Location',
    backUrl: '/view-supplier-location-master',
    mainmodule: 'generalsetup',
  },
];

const SectionMenu = [
  {
    url: '/view-section',
    viewtitle: 'Section',
    isBreadcrumb: false,
    buttonTitle: 'Add Section',
    createUrl: '/create-section',
    mainmodule: 'generalsetup',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-section',
    title: 'Add Section',
    isBreadcrumb: true,
    buttonTitle: 'Add Section',
    backUrl: '/view-section',
    mainmodule: 'generalsetup',
  },
  {
    url: '/edit-section',
    title: 'Edit Section',
    isBreadcrumb: true,
    buttonTitle: 'Edit Section',
    backUrl: '/view-section',
    mainmodule: 'generalsetup',
  },
];

const GodownMenu = [
  {
    url: '/view-godown',
    viewtitle: 'Godown',
    isBreadcrumb: false,
    buttonTitle: 'Add Godown',
    createUrl: '/create-godown',
    mainmodule: 'generalsetup',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-godown',
    title: 'Add godown',
    isBreadcrumb: true,
    buttonTitle: 'Add Godown',
    backUrl: '/view-godown',
    mainmodule: 'generalsetup',
  },
  {
    url: '/edit-godown',
    title: 'Edit Godown',
    isBreadcrumb: true,
    buttonTitle: 'Edit Godown',
    backUrl: '/view-godown',
    mainmodule: 'generalsetup',
  },
];

export const GeneralSetupMenu = [
  ...AddCompanySetup,
  ...CountryMenu,
  ...StateMenu,
  ...UserRoleMenu,
  ...UserMasterMenu,
  ...SupplierLocationMenu,
  ...ApprovalUserlimitMenu,
  ...SupplierMasterMenu,
  ...SectionMenu,
  ...GodownMenu,
];
