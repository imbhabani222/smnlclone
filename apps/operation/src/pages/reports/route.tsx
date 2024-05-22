import MainComponet from './index';
import TaskReport from './taskReport/view';
import VehicleUtilization from './vehicleUtilization/view';
import DriverUtilization from "./driverUtilization/view"

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

export const reportOperation_subRoutes: MenuItem[] = [
  {
    label: 'Task Report',
    key: '/view-task-report',
    mainkey: '/view-task-report',
    path: '/view-task-report',
    component: TaskReport,
    element: <MainComponet />,
    identity: 'reportoperation',
  },
  {
    label: 'Vehicle Utilization',
    key: '/view-vehicle-utilization',
    mainkey: '/view-vehicle-utilization',
    path: '/view-vehicle-utilization',
    component: VehicleUtilization,
    element: <MainComponet />,
    identity: 'reportoperation',
  },
  {
    label: 'Driver Utilization',
    key: '/view-driver-utilization',
    mainkey: '/view-driver-utilization',
    path: '/view-driver-utilization',
    component: DriverUtilization,
    element: <MainComponet />,
    identity: 'reportoperation',
  },
  
];
