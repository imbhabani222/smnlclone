import MainComponent from './index';
import Home from './main/Home';

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
  identity: string;
}

export const Home_sub_menu: MenuItem[] = [
  {
    label: '',
    title: 'Dashboard',
    key: '/',
    mainkey: '/',
    path: '/',
    component: Home,
    element: <MainComponent />,
    identity: 'home',
    // buttonLink: '/create-travel',
    // buttonTitle: 'Add Travel',
  },
];
