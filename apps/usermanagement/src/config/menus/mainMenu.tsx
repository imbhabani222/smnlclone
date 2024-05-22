import { ReactComponent as SettingsIcon } from '../../../../../libs/common/assets/Settings.svg';

import { ReactComponent as HomeIcon } from '../../../../../libs/common/assets/home.svg';

interface Menu {
  label: string;
  key: string;
  type?: string;
  subMenu?: Object;
  icon?: any;
  link?: string;
  identity?: string;
}

export const Menus: Menu[] = [
  {
    label: 'Home',
    key: '1',
    type: 'home',
    identity: 'home',
    icon: HomeIcon,
    link: '/',
  },
  {
    label: 'Users',
    key: '2',
    type: 'user',
    identity: 'users',
    link: '/view-users',
    icon: SettingsIcon,
  },
];
