import ViewUsers from './Users/view';
import CreateUsers from './Users/create';
import ViewRoles from './Roles/view';
import CreateRoles from './Roles/create';
import Modules from './Modules/create';
import CreatePermissions from './Permissions/create';
import MainComponet from './index';

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
  subidentity?: string;
  belongto?: string;
}

export const User_Sub_Menu: MenuItem[] = [
  {
    label: 'Users',
    key: '/view-users',
    mainkey: '/view-users',
    path: '/view-users',
    element: <MainComponet />,
    component: ViewUsers,
    buttonLink: '/create-users',
    buttonTitle: 'Add Users',
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Users',
    key: '/create-users',
    mainkey: '/view-users',
    path: '/create-users',
    component: CreateUsers,
    hidden: true,
    element: <MainComponet />,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Users',
    key: '/edit-users',
    mainkey: '/view-users',
    path: '/edit-users',
    component: CreateUsers,
    hidden: true,
    element: <MainComponet />,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  // {
  //   label: 'Modules',
  //   key: '/modules',
  //   mainkey: '/modules',
  //   path: '/modules',
  //   element: <MainComponet />,
  //   component: Modules,
  //   identity: 'masterdata',
  //   subidentity: 'organizationsettings',
  // },

  {
    label: 'Roles',
    key: '/view-roles',
    mainkey: '/view-roles',
    path: '/view-roles',
    element: <MainComponet />,
    component: ViewRoles,
    buttonLink: '/create-roles',
    buttonTitle: 'Add roles',
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Roles',
    key: '/create-roles',
    mainkey: '/view-roles',
    path: '/create-roles',
    component: CreateRoles,
    hidden: true,
    element: <MainComponet />,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Roles',
    key: '/edit-roles',
    mainkey: '/view-roles',
    path: '/edit-roles',
    component: CreateRoles,
    hidden: true,
    element: <MainComponet />,
    isback: true,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
  {
    label: 'Permissions',
    key: '/set-permissions',
    mainkey: '/set-permissions',
    path: '/set-permissions',
    component: CreatePermissions,
    element: <MainComponet />,
    identity: 'masterdata',
    subidentity: 'organizationsettings',
  },
];
