const FuelBowserMenu = [
  {
    url: '/view-fuel-bowser',
    viewtitle: 'View Fuel Bowser',
    isBreadcrumb: false,
    buttonTitle: '',
    createUrl: '',
    mainmodule: 'fuelmanagement',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-fuel-bowser',
    title: 'Create Fuel Bowser',
    isBreadcrumb: true,
    buttonTitle: '',
    backUrl: '',
    mainmodule: 'fuelmanagement',
  },
  {
    url: '/edit-fuel-bowser',
    title: 'Edit Fuel Bowser',
    isBreadcrumb: true,
    buttonTitle: '',
    backUrl: '',
    mainmodule: 'fuelmanagement',
  },
];

const VehicleTypesMenu = [
  {
    url: '/view-vehicle-types',
    viewtitle: 'View Vehicle Types',
    isBreadcrumb: false,
    buttonTitle: '',
    createUrl: '',
    mainmodule: 'fuelmanagement',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-vehicle-types',
    title: 'Add Vehicle Types',
    isBreadcrumb: true,
    buttonTitle: '',
    backUrl: '',
    mainmodule: 'fuelmanagement',
  },
  {
    url: '/edit-vehicle-types',
    title: 'Edit Vehicle Types',
    isBreadcrumb: true,
    buttonTitle: '',
    backUrl: '',
    mainmodule: 'fuelmanagement',
  },
];

const VehiclesMenu = [
  {
    url: '/view-vehicles',
    viewtitle: 'View Vehicles',
    isBreadcrumb: false,
    buttonTitle: '',
    createUrl: '',
    mainmodule: 'fuelmanagement',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-vehicles',
    title: 'Add Vehicles',
    isBreadcrumb: true,
    buttonTitle: '',
    backUrl: '',
    mainmodule: 'fuelmanagement',
  },
  {
    url: '/edit-vehicles',
    title: 'Edit Vehicles',
    isBreadcrumb: true,
    buttonTitle: '',
    backUrl: '',
    mainmodule: 'fuelmanagement',
  },
];

const MobileUsersMenu = [
  {
    url: '/view-mobile-users',
    viewtitle: 'View Mobile Users',
    isBreadcrumb: false,
    buttonTitle: '',
    createUrl: '',
    mainmodule: 'fuelmanagement',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-mobile-users',
    title: 'Add Mobile Users',
    isBreadcrumb: true,
    buttonTitle: '',
    backUrl: '',
    mainmodule: 'fuelmanagement',
  },
  {
    url: '/edit-mobile-users',
    title: 'Edit Mobile Users',
    isBreadcrumb: true,
    buttonTitle: '',
    backUrl: '',
    mainmodule: 'fuelmanagement',
  },
];

const HireLeaseMasterMenu = [
  {
    url: '/view-hire-lease-master',
    viewtitle: 'View Hire Lease Master',
    isBreadcrumb: false,
    buttonTitle: '',
    createUrl: '',
    mainmodule: 'fuelmanagement',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-hire-lease-master',
    title: 'Add Hire Lease Master',
    isBreadcrumb: true,
    buttonTitle: '',
    backUrl: '',
    mainmodule: 'fuelmanagement',
  },
  {
    url: '/edit-hire-lease-master',
    title: 'Edit Hire Lease Master',
    isBreadcrumb: true,
    buttonTitle: '',
    backUrl: '',
    mainmodule: 'fuelmanagement',
  },
];

export const FuelManagementMenu = [
  ...FuelBowserMenu,
  ...VehicleTypesMenu,
  ...VehiclesMenu,
  ...MobileUsersMenu,
  ...HireLeaseMasterMenu,
];
