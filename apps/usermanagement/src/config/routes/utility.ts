const NewsMenu = [
  {
    url: '/view-news-entry',
    viewtitle: 'News Entry List',
    isBreadcrumb: false,
    buttonTitle: 'Add News Entry',
    createUrl: '/create-news-entry',
    mainmodule: 'utilities',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-news-entry',
    title: 'Add News Entry',
    viewtitle: 'News Entry',
    isBreadcrumb: true,
    buttonTitle: 'News Entry',
    backUrl: '/view-news-entry',
    module: 'utilities',
  },
  {
    url: '/edit-news-entry',
    title: 'Edit News Entry',
    viewtitle: 'News Entry',
    isBreadcrumb: true,
    buttonTitle: 'News Entry',
    backUrl: '/view-news-entry',
    module: 'utilities',
  },
];

const UploadMenu = [
  {
    url: '/view-upload-policy',
    viewtitle: 'Policy Upload',
    isBreadcrumb: false,
    buttonTitle: 'Add Policy Upload',
    createUrl: '/create-upload-policy',
    module: 'utilities',
  },
  {
    url: '/create-upload-policy',
    title: 'Add Policy Upload',
    isBreadcrumb: true,
    buttonTitle: 'Policy Upload',
    backUrl: '/view-upload-policy',
    module: 'utilities',
  },
  {
    url: '/view-upload-form',
    viewtitle: 'Form Upload',
    isBreadcrumb: false,
    buttonTitle: 'Add Upload Form',
    createUrl: '/create-upload-form',
    module: 'utilities',
  },
  {
    url: '/create-upload-form',
    title: 'Add Form Upload',
    isBreadcrumb: true,
    buttonTitle: 'Form Upload',
    backUrl: '/view-upload-policy',
    module: 'utilities',
  },
];
const BankMenu = [
  {
    // View is Not there for Bank Advice
    url: '/create-bank-advice',
    title: 'Add Bank Advice',
    isBreadcrumb: true,
    buttonTitle: 'Bank Advice',
    backUrl: '',
    mainmodule: 'utilities',
  },
];

const HolidayMenu = [
  {
    url: '/view-public-holidays',
    viewtitle: 'Public Holiday List',
    isBreadcrumb: false,
    buttonTitle: 'Add Public Holiday',
    createUrl: '/create-public-holiday',
    mainmodule: 'utilities',
  },
  {
    url: '/create-public-holiday',
    title: 'Add Public Holiday',
    isBreadcrumb: true,
    buttonTitle: 'Public Holiday',
    backUrl: '/view-public-holidays',
    mainmodule: 'utilities',
  },
  {
    url: '/edit-public-holiday',
    title: 'Edit Public Holiday',
    isBreadcrumb: true,
    buttonTitle: 'Public Holiday',
    backUrl: '/view-public-holidays',
    mainmodule: 'utilities',
  },
];

const EmailMenu = [
  {
    url: '/view-email-templates',
    viewtitle: 'Email Templates',
    isBreadcrumb: false,
    buttonTitle: 'Add Email Template',
    createUrl: '/create-email-template',
    module: 'utilities',
  },
  {
    url: '/create-email-template',
    title: 'Add Email Template',
    isBreadcrumb: true,
    buttonTitle: 'Email Template',
    backUrl: '/view-upload-policy',
    module: 'utilities',
  },
];
const MonthMenu = [
  // create only for close Month
  {
    url: '/create-close-month',
    title: 'Close Month Process',
    isBreadcrumb: true,
    buttonTitle: 'Close Month',
    backUrl: '',
    module: 'utilities',
  },
];
const PasswordMenu = [
  {
    url: '/change-password',
    title: 'Change Password',
    isBreadcrumb: true,
    buttonTitle: 'Password',
    backUrl: '',
    module: 'utilities',
  },
  {
    url: '/reset-password',
    title: 'Reset Password',
    isBreadcrumb: true, 
    buttonTitle: 'Password',
    backUrl: '',
    module: 'utilities',
  },
];

const OptionalHolidayMenu = [
  {
    url: '/view-optional-holidays',
    viewtitle: 'Optional Holiday',
    isBreadcrumb: false,
    buttonTitle: 'Add Optional Holiday',
    createUrl: '/create-optional-holiday',
    mainmodule: 'utilities',
  },
  {
    url: '/create-optional-holiday',
    title: 'Create Optional Holidays',
    isBreadcrumb: true,
    buttonTitle: 'Optional Holidays',
    backUrl: '/view-optional-holidays',
    mainmodule: 'utilities',
  },
  {
    url: '/edit-optional-holiday',
    title: 'Edit Optional Holidays',
    isBreadcrumb: true,
    buttonTitle: 'Optional Holidays',
    backUrl: '/view-optional-holidays',
    mainmodule: 'utilities',
  },
];

export const UtilitiesMenu = [
  ...NewsMenu,
  ...UploadMenu,
  ...BankMenu,
  ...HolidayMenu,
  // View Organization Pages are Not there In Current Site
  ...EmailMenu,
  ...MonthMenu,
  ...PasswordMenu,
  ...OptionalHolidayMenu,
];
