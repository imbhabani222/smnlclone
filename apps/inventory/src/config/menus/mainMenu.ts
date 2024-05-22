import { ReactComponent as SettingsIcon } from '../../../../../libs/common/assets/Settings.svg';
import { ReactComponent as HomeIcon } from '../../../../../libs/common/assets/home.svg';
import { ReactComponent as ProductIcon } from '../../../../../libs/common/assets/Product.svg';
import { ReactComponent as PurchaseIcon } from '../../../../../libs/common/assets/Purchase.svg';
import { ReactComponent as InventoryIcon } from '../../../../../libs/common/assets/Inventory.svg';
import { ReactComponent as WorkshopIcon } from '../../../../../libs/common/assets/Workshop.svg';
import { ReactComponent as FuelIcon } from '../../../../../libs/common/assets/Fuel.svg';
import { ReactComponent as ReportIcon } from '../../../../../libs/common/assets/report_icon.svg';

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
    identity: 'home',
    link: '/',
  },
  {
    label: 'General Setup',
    key: '2',
    type: 'generalsetup',
    link: '/view-country',
    identity: 'generalsetup',
    // subMenu: General_Setup_Sub_Menu,
    icon: SettingsIcon,
  },
  {
    label: 'Product Configuration',
    key: '3',
    type: 'productconfiguration',
    link: '/view-unit-of-measurement',
    identity: 'productconfiguration',
    // subMenu: Product_Configuration_Sub_Menu,
    icon: ProductIcon,
  },
  {
    label: 'Purchase Management',
    key: '4',
    type: 'purchasemanagement',
    link: '/view-purchase-indent-register',
    identity: 'purchasemanagement',
    // subMenu: Product_Configuration_Sub_Menu,
    icon: PurchaseIcon,
  },
  {
    label: 'Inventory Management',
    key: '5',
    type: 'inventorymanagement',
    identity: 'inventorymanagement',
    link: '/view-grn-register',
    // subMenu: Product_Configuration_Sub_Menu,
    icon: InventoryIcon,
  },
  {
    label: 'Workshop Management',
    key: '6',
    type: 'workshopmanagement',
    identity: 'workshopmanagement',
    link: '/view-service-types',
    // subMenu: Product_Configuration_Sub_Menu,
    icon: WorkshopIcon,
  },
  {
    label: 'Fuel Management',
    key: '6',
    type: 'fuelmanagement',
    identity: 'fuelmanagement',
    link: '/view-fuel-bowser',
    // subMenu: Product_Configuration_Sub_Menu,
    icon: FuelIcon,
  },
  {
    label: 'Mis Report',
    key: '6',
    type: 'misreport',
    identity: 'misreport',
    link: '/supplier-wise-report',
    // subMenu: Product_Configuration_Sub_Menu,
    icon: ReportIcon,
  },
];

// {
//     label:'More',
//     key:"5",
//     type:"More",
//     subMenu: MoreMenu,
//     icon: More
// }
