// import {
//     General_Setup_Sub_Menu,
//     Product_Configuration_Sub_Menu,
//   } from './subMenu';

import { ReactComponent as SettingsIcon } from '../../../../../libs/common/assets/Settings.svg';
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { ReactComponent as ConfigIcon } from '../../assets/config.svg';
import { ReactComponent as ManagementIcon } from '../../assets/management.svg';
import { ReactComponent as VoucherIcon } from '../../assets/voucher.svg';
import { ReactComponent as ReportIcon} from '../../../../../libs/common/assets/reports.svg'

interface Menu {
  label: string;
  key: string;
  type?: string;
  subMenu?: Object;
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
    label: 'Account Configuration',
    key: '2',
    type: 'accountconfiguration',
    identity: 'accountconfiguration',
    icon: ConfigIcon,
    link: '/view-firm-type',
  },
  {
    label: 'Account Voucher',
    key: '3',
    type: 'accountvocher',
    identity: 'accountvocher',
    link: '/view-cash-receipt-voucher',
    icon: VoucherIcon,
  },
  {
    label: 'Account Management',
    key: '4',
    type: 'accountmanagement',
    identity: 'accountmanagement',
    link: '/view-purchase-invoice',
    icon: ManagementIcon,
  },
  {
    label: 'Account Reports',
    key: '5',
    type: 'accountreports',
    identity: 'accountreports',
    link: '/view-day-book',
    icon: ReportIcon,
  }
];

// {
//     label:'More',
//     key:"5",
//     type:"More",
//     subMenu: MoreMenu,
//     icon: More
// }
