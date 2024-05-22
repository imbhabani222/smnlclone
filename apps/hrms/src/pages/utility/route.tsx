import MainComponent from './indexcomponent';
import NewsEntry from './newsEntry/view';
import CreateNewsEntry from './newsEntry/create';
import PublicHoliday from './publicHolidayList/view';
import CreatePublicHolidays from './publicHolidayList/create';
import OrganisationCharts from './organizationChart/view';
import OptionalHoliday from './optionalHolidayList/view';
import ChangePassword from './changePassword/change';
import CloseMoth from './closeMonth/create';
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

export const Utility_Sub_Menu: MenuItem[] = [
  {
    label: 'News Entry',
    key: '/view-news-entry',
    mainkey: '/view-news-entry',
    path: '/view-news-entry',
    component: NewsEntry,
    element: <MainComponent />,
    buttonLink: '/create-news-entry',
    buttonTitle: 'Add New List',
    identity: 'utility',
  },
  {
    label: 'News Entry',
    key: '/create-news-entry',
    mainkey: '/view-news-entry',
    path: '/create-news-entry',
    component: CreateNewsEntry,
    element: <MainComponent />,
    hidden: true,
    identity: 'utility',
  },
  {
    label: 'News Entry',
    key: '/edit-news-entry',
    mainkey: '/view-news-entry',
    path: '/edit-news-entry',
    component: CreateNewsEntry,
    element: <MainComponent />,
    hidden: true,
    identity: 'utility',
  },
  {
    label: 'Holiday List',
    key: '/view-public-holidays',
    mainkey: '/view-public-holidays',
    path: '/view-public-holidays',
    component: PublicHoliday,
    element: <MainComponent />,
    buttonLink: '/create-public-holidays',
    buttonTitle: 'Add New List',
    // hidden: true,
    identity: 'utility',
  },
  {
    label: 'Holiday List',
    key: '/create-public-holidays',
    mainkey: '/view-public-holidays',
    path: '/create-public-holidays',
    component: CreatePublicHolidays,
    element: <MainComponent />,
    hidden: true,
    identity: 'utility',
  },
  {
    label: 'Holiday List',
    key: '/edit-public-holidays',
    mainkey: '/view-public-holidays',
    path: '/edit-public-holidays',
    component: CreatePublicHolidays,
    element: <MainComponent />,
    hidden: true,
    identity: 'utility',
  },
  {
    label: 'Change Password',
    key: '/change-password',
    mainkey: '/change-password',
    path: '/change-password',
    component: ChangePassword,
    element: <MainComponent />,
    hidden: false,
    identity: 'utility',
  },
  {
    label: 'Close Month',
    key: '/close-month',
    mainkey: '/close-month',
    path: '/close-month',
    component: CloseMoth,
    element: <MainComponent />,
    //  buttonLink: '/create-public-holidays',
    //  buttonTitle: 'Add New List',
    // hidden: true,
    identity: 'utility',
  },
  // {
  //   label: 'Organization Chart',
  //   key: '/view-organization-chart',
  //   mainkey: '/view-organization-chart',
  //   path: '/view-organization-chart',
  //   component: OrganisationCharts,
  //   element: <MainComponent />,
  //   // hidden: true,
  // },
  // {
  //   label: 'Optional Holidays',
  //   key: '/view-optional-holidays',
  //   mainkey: '/view-optional-holidays',
  //   path: '/view-optional-holidays',
  //   component: OptionalHoliday,
  //   element: <MainComponent />,
  //   // hidden: true,
  // },
];
