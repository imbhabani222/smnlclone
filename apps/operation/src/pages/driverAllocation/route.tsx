import MainComponent from './index';
import View from './VehicledriverAllocation/view';
import Create from './VehicledriverAllocation/create';
import Edit from './VehicledriverAllocation/edit';
// import { getTableData } from "../../../../../libs/common/api/doctype";

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
  name?: string;
  id?: string;
}

export const driverallocation_routes: MenuItem[] = [
  {
    label: 'Dumpers',
    key: '/view-dumper-driverallocation',
    mainkey: '/view-dumper-driverallocation',
    path: '/view-dumper-driverallocation',
    component: View,
    element: <MainComponent />,
    identity: 'driverAllocation',
    buttonLink: '/create-dumper-driverallocation',
    buttonTitle: 'Add Shift Details',
    name: 'Dumper',
    id: 'DUMPERS',
  },
  {
    label: 'Dumpers',
    key: '/create-dumper-driverallocation',
    mainkey: '/view-dumper-driverallocation',
    path: '/create-dumper-driverallocation',
    component: Create,
    element: <MainComponent />,
    identity: 'driverAllocation',
    hidden: true,
    isback: true,
    name: 'Dumper',
    id: 'DUMPERS',
  },
  {
    label: 'Dumpers',
    key: '/edit-dumper-driverallocation',
    mainkey: '/view-dumper-driverallocation',
    path: '/edit-dumper-driverallocation',
    component: Edit,
    element: <MainComponent />,
    identity: 'driverAllocation',
    hidden: true,
    isback: true,
    name: 'Dumper',
    id: 'DUMPERS',
  },
  {
    label: 'Wheel Loaders',
    key: '/view-driverallocation',
    mainkey: '/view-driverallocation',
    path: '/view-driverallocation',
    component: View,
    element: <MainComponent />,
    identity: 'driverAllocation',
    buttonLink: '/create-driverallocation',
    buttonTitle: 'Add Shift Details',
    id: 'WHEEL LOADER',
    name: 'Loader',

  },
  {
    label: 'Wheel Loaders',
    key: '/create-driverallocation',
    mainkey: '/view-driverallocation',
    path: '/create-driverallocation',
    component: Create,
    element: <MainComponent />,
    identity: 'driverAllocation',
    hidden: true,
    isback: true,
    name: 'Loader',
    id: 'WHEEL LOADER',
  },
  {
    label: 'Wheel Loaders',
    key: '/edit-loader-driverallocation',
    mainkey: '/view-driverallocation',
    path: '/edit-loader-driverallocation',
    component: Edit,
    element: <MainComponent />,
    identity: 'driverAllocation',
    hidden: true,
    isback: true,
    name: 'Loader',
    id: 'WHEEL LOADER',
  },
  {
    label: 'Excavators',
    key: '/view-excavator-driverallocation',
    mainkey: '/view-excavator-driverallocation',
    path: '/view-excavator-driverallocation',
    component: View,
    element: <MainComponent />,
    identity: 'driverAllocation',
    buttonLink: '/create-excavator-driverallocation',
    buttonTitle: 'Add Shift Details',
    name: 'Excavator',
    id: 'EXCAVATORS',
  },
  {
    label: 'Excavators',
    key: '/create-excavator-driverallocation',
    mainkey: '/view-excavator-driverallocation',
    path: '/create-excavator-driverallocation',
    component: Create,
    element: <MainComponent />,
    identity: 'driverAllocation',
    hidden: true,
    isback: true,
    name: 'Excavator',
    id: 'EXCAVATORS',
  },
  {
    label: 'Excavators',
    key: '/edit-excavator-driverallocation',
    mainkey: '/view-excavator-driverallocation',
    path: '/edit-excavator-driverallocation',
    component: Edit,
    element: <MainComponent />,
    identity: 'driverAllocation',
    hidden: true,
    isback: true,
    name: 'Excavator',
    id: 'EXCAVATORS',
  },
];
