import MainComponet from './index';
import ViewVehicleManagement from './VehicleManagement/view';
import CreateVehicleManagement from './VehicleManagement/create';
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

export const vehicleManagement_subRoutes: MenuItem[] = [
  {
    label: 'Vehicle Management',
    key: '/view-vehiclemanagement',
    mainkey: '/view-vehiclemanagement',
    path: '/view-vehiclemanagement',
    component: ViewVehicleManagement,
    element: <MainComponet />,
    buttonLink: '/create-vehiclemanagement',
    buttonTitle: 'Add Vehicle Details',
    identity: 'vehiclemanagement',
  },
  {
    label: 'Add Vehicle Details',
    key: '/create-vehiclemanagement',
    path: '/create-vehiclemanagement',
    mainkey: '/view-vehiclemanagement',
    title: 'Create Vehicle management',
    element: <MainComponet />,
    component: CreateVehicleManagement,
    hidden: true,
    isback: true,
    identity: 'vehiclemanagement',
  },
  {
    label: 'Edit Vehicle Details',
    key: '/edit-vehiclemanagement',
    path: '/edit-vehiclemanagement',
    mainkey: '/view-vehiclemanagement',
    title: 'Create Vehicle management',
    element: <MainComponet />,
    component: CreateVehicleManagement,
    hidden: true,
    isback: true,
    identity: 'vehiclemanagement',
  },
  
];
