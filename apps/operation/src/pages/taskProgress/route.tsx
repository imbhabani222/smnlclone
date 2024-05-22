import MainComponet from './index';
import ViewTaskProgress from './TaskProgress/view';

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

export const taskProgress_subRoutes: MenuItem[] = [
  {
    label: 'Task Details',
    key: '/view-task-progress',
    mainkey: '/view-task-progress',
    path: '/view-task-progress',
    component: ViewTaskProgress,
    element: <MainComponet />,
    identity: 'taskprogress',
  },
];
