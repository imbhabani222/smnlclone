const HomeMenu = [
  {
    url: '/dashboard',
    viewtitle: 'Dashboard',
    isBreadcrumb: false,
    buttonTitle: '',
    mainmodule: 'home',
    // isBreadcrumb: false,
    // buttonTitle: 'Add Brand Master',
    createUrl: '/add-brand-master',
    module: 'asset',
    isviewBreadcrumb: true,
  },
  {
    url: '/',
    viewtitle: 'Dashboard',
    isBreadcrumb: false,
    buttonTitle: '',
    createUrl: '/create-state',
    mainmodule: 'home',
    isviewBreadcrumb: true,
  },
];

export const HomeSubMenu = [...HomeMenu];
