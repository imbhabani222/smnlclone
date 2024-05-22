import CreateFuelBowser from './fuelBowser/create';
import ViewFuelBowser from './fuelBowser/view';

import CreateVehicleTypes from './vehicleTypes/create';
import ViewVehicleTypes from './vehicleTypes/view';

import CreateVehicles from './vehicles/create';
import ViewVehicles from './vehicles/view';

import CreateMobileUsers from './mobileUsers/create';
import ViewMobileUsers from './mobileUsers/view';

import CreateHireLeaseMaster from './hireLeaseMaster/create';
import ViewHireLeaseMaster from './hireLeaseMaster/view';


import MainComponent from './index';

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
  identity?: string;
}



export const Fuel_Management_Sub_Menu: MenuItem[] = [
  
  {
    label: 'Fuel Bowser',
    key: '/view-fuel-bowser',
    path: '/view-fuel-bowser',
    mainkey: '/view-fuel-bowser',
    title: 'View Fuel Bowser',
    element: <MainComponent />,
    component: ViewFuelBowser,
    buttonLink: '/create-fuel-bowser',
    buttonTitle: 'Add Fuel Bowser',
    identity: 'fuelmanagement',
  },

  {
    label: 'Fuel Bowser',
    key: '/create-fuel-bowser',
    path: '/create-fuel-bowser',
    mainkey: '/view-fuel-bowser',
    title: 'Add Fuel Bowser',
    element: <MainComponent />,
    component: CreateFuelBowser,
    isback: true,
    hidden: true,
    identity: 'fuelmanagement',
  },

  {
    label: 'Fuel Bowser',
    key: '/edit-fuel-bowser',
    path: '/edit-fuel-bowser',
    mainkey: '/view-fuel-bowser',
    title: 'Edit Fuel Bowser',
    element: <MainComponent />,
    component: CreateFuelBowser,
    isback: true,
    hidden: true,
    identity: 'fuelmanagement',
  },

  {
    label: 'Vehicle Types',
    key: '/view-vehicle-types',
    path: '/view-vehicle-types',
    mainkey: '/view-vehicle-types',
    title: 'View Vehicle Types',
    element: <MainComponent />,
    component: ViewVehicleTypes,
    buttonLink: '/create-vehicle-types',
    buttonTitle: 'Add Vehicle Types',
    identity: 'fuelmanagement',
  },

  {
    label: 'Vehicle Types',
    key: '/create-vehicle-types',
    path: '/create-vehicle-types',
    mainkey: '/view-vehicle-types',
    title: 'Add Vehicle Types',
    element: <MainComponent />,
    component: CreateVehicleTypes,
    isback: true,
    hidden: true,
    identity: 'fuelmanagement',
  },

  {
    label: 'Vehicle Types',
    key: '/edit-vehicle-types',
    path: '/edit-vehicle-types',
    mainkey: '/view-vehicle-types',
    title: 'Edit Vehicle Types',
    element: <MainComponent />,
    component: CreateVehicleTypes,
    isback: true,
    hidden: true,
    identity: 'fuelmanagement',
  },

  {
    label: 'Vehicles',
    key: '/view-vehicles',
    path: '/view-vehicles',
    mainkey: '/view-vehicles',
    title: 'View Vehicles',
    element: <MainComponent />,
    component: ViewVehicles,
    buttonLink: '/create-vehicles',
    buttonTitle: 'Add Vehicles',
    identity: 'fuelmanagement',
  },

  {
    label: 'Vehicles',
    key: '/create-vehicles',
    path: '/create-vehicles',
    mainkey: '/view-vehicles',
    title: 'Add Vehicles',
    element: <MainComponent />,
    component: CreateVehicles,
    hidden: true,
    isback: true,
    identity: 'fuelmanagement',
  },

  {
    label: 'Vehicles',
    key: '/edit-vehicles',
    path: '/edit-vehicles',
    mainkey: '/view-vehicles',
    title: 'Edit Vehicles',
    element: <MainComponent />,
    component: CreateVehicles,
    isback: true,
    hidden: true,
    identity: 'fuelmanagement',
  },

  {
    label: 'Mobile Users',
    key: '/view-mobile-users',
    path: '/view-mobile-users',
    mainkey: '/view-mobile-users',
    title: 'View Mobile Users',
    buttonLink: '/create-mobile-users',
    buttonTitle: 'Add Mobile Users',
    element: <MainComponent />,
    component: ViewMobileUsers,
    identity: 'fuelmanagement',
  },

  {
    label: 'Mobile Users',
    key: '/create-mobile-users',
    path: '/create-mobile-users',
    mainkey: '/view-mobile-users',
    title: 'Add Mobile Users',
    element: <MainComponent />,
    component: CreateMobileUsers,
    hidden: true,
    isback: true,
    identity: 'fuelmanagement',
  },

  {
    label: 'Mobile Users',
    key: '/edit-mobile-users',
    path: '/edit-mobile-users',
    mainkey: '/view-mobile-users',
    title: 'Edit Mobile Users',
    element: <MainComponent />,
    component: CreateMobileUsers,
    isback: true,
    hidden: true,
    identity: 'fuelmanagement',
  },


  {
    label: 'Hire Lease Master',
    key: '/view-hire-lease-master',
    path: '/view-hire-lease-master',
    mainkey: '/view-hire-lease-master',
    title: 'View Hire Lease Master',
    buttonLink: '/create-hire-lease-master',
    buttonTitle: 'Add Hire Lease Master',
    element: <MainComponent />,
    component: ViewHireLeaseMaster,
    identity: 'fuelmanagement',
  },

  {
    label: 'Hire Lease Master',
    key: '/create-hire-lease-master',
    path: '/create-hire-lease-master',
    mainkey: '/view-hire-lease-master',
    title: 'Add Hire Lease Master',
    element: <MainComponent />,
    component: CreateHireLeaseMaster,
    isback: true,
    hidden: true,
    identity: 'fuelmanagement',
  },

  {
    label: 'Hire Lease Master',
    key: '/edit-hire-lease-master',
    path: '/edit-hire-lease-master',
    mainkey: '/view-hire-lease-master',
    title: 'Edit Hire Lease Master',
    element: <MainComponent />,
    component: CreateHireLeaseMaster,
    isback: true,
    hidden: true,
    identity: 'fuelmanagement',
  },
  

];
