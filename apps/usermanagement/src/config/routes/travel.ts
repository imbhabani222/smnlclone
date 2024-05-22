const TravelRequestMenu = [
  {
    url: '/travel-request',
    viewtitle: 'Travel Management ',
    isBreadcrumb: true,
    createUrl: '/create',
    mainmodule: 'travel',
  },
  {
    url: '/create',
    buttonTitle: 'Travel Management ',
    isBreadcrumb: true,
    createUrl: '/travel-request',
    mainmodule: 'travel',
  },
  {
    url: '/approve-request',
    buttonTitle: 'Travel Management ',
    isBreadcrumb: true,
    createUrl: '/travel-request',
    mainmodule: 'travel',
  },
  {
    url: '/report',
    viewtitle: 'Travel Management ',
    isBreadcrumb: false,
    // createUrl: '/view-employee-details',
    backUrl: '/approve-request',
    mainmodule: 'travel',
    isexport: true,
  },
];

export const TravelMenu = [...TravelRequestMenu];
