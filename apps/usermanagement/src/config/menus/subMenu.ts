interface MenuItem {
  label: string;
  link?: string;
  key: string;
  identity?: string;
  type?: string;
}

export const Home_Sub_Menu: MenuItem[] = [
  { label: 'DashBoard', link: '/dashboard', key: '/dashboard' },
];

export const User_Sub_Menu: MenuItem[] = [
  {
    label: 'Employee Setup',
    link: '/view-employee-details',
    key: '/view-employee-details',
  },
  {
    label: 'Resigned Employee List',
    link: '/view-resigned-employee-list',
    key: '/view-resigned-employee-list',
  },
  {
    label: 'Employee Notice Letter',
    link: '/view-employee-NoticeLetter',
    key: '/view-employee-NoticeLetter',
  },
];
