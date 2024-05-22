const TravelRequestMenu = [
  {
    url: '/travel-request',
    viewtitle: 'Travel Management ',
    isBreadcrumb: true,
    createUrl: '/create',
    mainmodule: 'travelrequisition',
  },
  {
    url: '/create',
    buttonTitle: 'Travel Management ',
    isBreadcrumb: true,
    createUrl: '/travel-request',
    mainmodule: 'travelrequisition',
  },
  {
    url: '/approve-request',
    buttonTitle: 'Travel Management ',
    isBreadcrumb: true,
    createUrl: '/travel-request',
    mainmodule: 'travelrequisition',
  },
  {
    url: '/report',
    viewtitle: 'Travel Management ',
    isBreadcrumb: false,
    // createUrl: '/view-employee-details',
    backUrl: '/approve-request',
    mainmodule: 'travelrequisition',
    isexport: true,
  },
];

export const TravelMenu = [...TravelRequestMenu];
