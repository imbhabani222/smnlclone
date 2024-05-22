import ViewDashboard from './dashboard';

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

export const Home_Sub_Menu: MenuItem[] = [
  {
    label: 'Dashboard',
    key: '/',
    mainkey: '/',
    path: '/',
    component: ViewDashboard,
    element: <MainComponent />,
    identity: 'home',
  },
  {
    label: 'Dashboard',
    key: '/dashboard',
    mainkey: '/',
    path: '/dashboard',
    component: ViewDashboard,
    element: <MainComponent />,
    hidden: true,
    identity: 'home',
  },
];
