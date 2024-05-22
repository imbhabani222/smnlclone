// import {
//     General_Setup_Sub_Menu,
//     Product_Configuration_Sub_Menu,
//   } from './subMenu';

import { ReactComponent as SettingsIcon } from '../../../../../libs/common/assets/Settings.svg';
import { ReactComponent as HomeIcon } from '../../../../../libs/common/assets/home.svg';
import { ReactComponent as TaskIcon } from '../../../../../libs/common/assets/Task.svg';
import { ReactComponent as ProgressIcon } from '../../../../../libs/common/assets/progress.svg';
import { ReactComponent as ReportIcon } from '../../../../../libs/common/assets/reports.svg';

interface Menu {
  label: string;
  key: string;
  type?: string;
  subMenu?: object;
  icon?: any;
  link?: string;
  identity?: string;
}

interface MoreMenu {
  label: string;
  key: string;
  type?: string;
  children?: Object;
  icon?: any;
  link?: string;
  identity?: string;
}

export const Menus: Menu[] = [
  {
    label: 'Home',
    key: '1',
    type: 'home',
    icon: HomeIcon,
    link: '/',
  },
  {
    label: 'Master Data',
    key: '2',
    type: 'masterData',
    identity: 'masterData',
    icon: SettingsIcon,
    link: '/view-movements',
  },
  {
    label: 'Tasks',
    key: '3',
    type: 'tasks',
    identity: 'tasks',
    icon: TaskIcon,
    link: '/view-tasks',
  },
  {
    label: 'Driver Allocation',
    key: '4',
    type: 'driverAllocation',
    identity: 'driverAllocation',
    icon: SettingsIcon,
    link: '/view-dumper-driverallocation',
  },
  {
    label: 'Task Progress',
    key: '5',
    type: 'taskprogress',
    identity: 'taskprogress',
    icon: ProgressIcon,
    link: '/view-task-progress',
  },
  {
    label: 'Reports',
    key: '6',
    type: 'reportoperation',
    identity: 'reportoperation',
    icon: ReportIcon,
    link: '/view-task-report',
  },
];

// {
//     label:'More',
//     key:"5",
//     type:"More",
//     subMenu: MoreMenu,
//     icon: More
// }
