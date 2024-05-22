import CreatePurchaseIndent from './purchaseIndent/createPurchaseIndent';
import ViewPurchaseRegister from './purchaseIndent/viewPurchaseIndent';
import PurchaseOrder from './PurchaseOrders/AddDetails';
import ViewPurchaseOrder from './PurchaseOrders/viewRegister';
import PurchaseIndent from './purchaseIndent/index';
import PurchaseProductIndent from './purchaseIndent/productPurchaseIndent';
import PurchaseOrderApproval from './purchaseOrderApproval/viewpurchaseorderapproval';
import CreatePurchaseOrderApproval from './purchaseOrderApproval/createpurchaseorderapproval';
import CreatePurchaseOrderCancel from './pendingPOCancellation/createpurchaseordercancel';
import CreatePurchaseOrderShortClose from './pendingPOShortClose/createpurchaseordershortclose';
import ViewPurchaseOrderRegister from './purchaseOrderRegister/viewpurchaseorderregister';
import ViewPurchaseOrderRegister1 from './PurchaseOrders/viewRegister';

import ViewPurchaseReturn from '../purchaseManagement/purchaseReturn/view';
import PurchaseReturnApproval from '../purchaseManagement/purchaseReturnApproval/view';
import PurchaseReturnRegister from '../purchaseManagement/purchaseReturnRegister/view';

import AddProductPurchaseOrder from './PurchaseOrders/addProduct';
import ViewPendingPOShortClose from '../purchaseManagement/pendingPOShortClose/viewPendingPOShortClose';
import ViewPendingPOCancellation from '../purchaseManagement/pendingPOCancellation/viewPendingPOCancellation';
import ViewPurchaseIndentApproval from  './purchaseIndentApproval/view';
import CreatePurchaseIndentApproval from  './purchaseIndentApproval/create'

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

export const Purchase_Management_Sub_Menu: MenuItem[] = [
  {
    label: 'Purchase Indent',
    key: '/purchase-indent',
    path: '/purchase-indent',
    mainkey: '/view-purchase-indent-register',
    element: <MainComponent />,
    component: PurchaseIndent,
    isback: true,
    hidden: true,
    identity: 'purchasemanagement',
  },
  {
    label: 'Purchase Indent Product',
    key: '/indent-product',
    path: '/indent-product',
    mainkey: '/view-purchase-indent-register',
    element: <MainComponent />,
    component: PurchaseIndent,
    isback: true,
    hidden: true,
    identity: 'purchasemanagement',
  },
  {
    label: 'Purchase Indent',
    key: '/view-purchase-indent-register',
    mainkey: '/view-purchase-indent-register',
    path: '/view-purchase-indent-register',
    buttonLink: '/purchase-indent',
    buttonTitle: 'Purchase Indent',
    component: ViewPurchaseRegister,
    element: <MainComponent />,
    identity: 'purchasemanagement',
  },
  {
    label: 'Purchase Indent Approval',
    key: '/purchase-indent-approval',
    path: '/purchase-indent-approval',
    mainkey: '/purchase-indent-approval',
    title: 'Purchase Indent Approval',
    element: <MainComponent />,
    component: ViewPurchaseIndentApproval,
    identity: 'purchasemanagement',
  },

  {
    label: 'Purchase Indent-Approval',
    key: '/create-purchase-indent-approval',
    path: '/create-purchase-indent-approval',
    mainkey: '/purchase-indent-approval',
    title: 'Add Purchase Order Approval',
    element: <MainComponent />,
    component: CreatePurchaseIndentApproval,
    isback: true,
    hidden: true,
    identity: 'purchasemanagement',
  },
  // {
  //   label: 'Purchase Order',
  //   key: '/purchase-order',
  //   path: '/purchase-order',
  //   mainkey: '/view-purchase-order-register',
  //   component: PurchaseOrder,
  //   element: <MainComponent />,
  // },
  // {
  //   label: 'Purchase Order',
  //   key: '/purchase-order',
  //   path: '/purchase-order',
  //   mainkey: '/purchase-order',
  //   title: 'Purchase Order',
  //   element: <MainComponent />,
  //   component: PurchaseOrder,
  //   buttonLink: '/add-purchase-order',
  //   buttonTitle: 'add Purchase Order',
  // },

  {
    label: 'Purchase Order',
    key: '/view-purchase-order-register',
    path: '/view-purchase-order-register',
    mainkey: '/view-purchase-order-register',
    title: 'Purchase Order Approval',
    element: <MainComponent />,
    buttonLink: '/purchase-order',
    buttonTitle: 'Purchase Order',
    component: ViewPurchaseOrderRegister1,
    identity: 'purchasemanagement',
  },
  {
    label: 'Purchase Order',
    key: '/purchase-order',
    path: '/purchase-order',
    mainkey: '/view-purchase-order-register',
    title: 'Purchase Order',
    element: <MainComponent />,
    component: PurchaseOrder,
    hidden: true,
    isback: true,
    identity: 'purchasemanagement',
  },
  {
    label: 'Purchase Order',
    key: '/order-product',
    path: '/order-product',
    mainkey: '/view-purchase-order-register',
    title: 'Purchase Order',
    element: <MainComponent />,
    component: PurchaseOrder,
    hidden: true,
    isback: true,
    identity: 'purchasemanagement',
  },
  {
    label: 'Purchase Order Approval',
    key: '/purchase-order-approval',
    path: '/purchase-order-approval',
    mainkey: '/purchase-order-approval',
    title: 'Purchase Order Approval',
    element: <MainComponent />,
    component: PurchaseOrderApproval,
    identity: 'purchasemanagement',
  },

  {
    label: 'Purchase Order-Approval',
    key: '/create-purchase-order-approval',
    path: '/create-purchase-order-approval',
    mainkey: '/purchase-order-approval',
    title: 'Add Purchase Order Approval',
    element: <MainComponent />,
    component: CreatePurchaseOrderApproval,
    isback: true,
    hidden: true,
    identity: 'purchasemanagement',
  },
  {
    label: 'Purchase Order-Cancel',
    key: '/cancel-purchase-order-approval',
    path: '/cancel-purchase-order-approval',
    mainkey: '/view-pending-po-cancellation',
    title: 'Purchase Order Cancel',
    element: <MainComponent />,
    component: CreatePurchaseOrderCancel,
    isback: true,
    hidden: true,
    identity: 'purchasemanagement',
  },
  {
    label: 'Purchase Order-ShortClose',
    key: '/shortclose-purchase-order',
    path: '/shortclose-purchase-order',
    mainkey: '/view-pending-po-shortclose',
    title: 'Purchase Order Short Close',
    element: <MainComponent />,
    component: CreatePurchaseOrderShortClose,
    isback: true,
    hidden: true,
    identity: 'purchasemanagement',
  },

  // {
  //   label: 'Purchase Return',
  //   key: '/view-purchase-return',
  //   path: '/view-purchase-return',
  //   mainkey: '/view-purchase-return',
  //   title: 'Purchase Return',
  //   element: <MainComponent />,
  //   component: ViewPurchaseReturn,
  // },
  // {
  //   label: 'Purchase Return Approval',
  //   key: '/view-purchase-return-approval',
  //   path: '/view-purchase-return-approval',
  //   mainkey: '/view-purchase-return-approval',
  //   title: 'Purchase Return Approval',
  //   element: <MainComponent />,
  //   component: PurchaseReturnApproval,
  // },
  // {
  //   label: 'Purchase Return Register',
  //   key: '/view-purchase-return-register',
  //   path: '/view-purchase-return-register',
  //   mainkey: '/view-purchase-return-register',
  //   title: 'Purchase Return Register',
  //   element: <MainComponent />,
  //   component: PurchaseReturnRegister,
  // },
  // {
  //   label: 'Purchase Invoice',
  //   key: '/purchase-invoice',
  //   path: '/purchase-invoice',
  //   mainkey: '/view-purchase-invoice-register',
  //   element: <MainComponent />,
  //   component: PurchcaseInvoice,
  //   isback: true,
  //   hidden: true,
  // },
  // {
  //   label: 'Purchase Invoice Product',
  //   key: '/purchase-invoice-product',
  //   mainkey: 'view-purchase-invoice-register',
  //   path: '/purchase-indent-product',
  //   component: PurchcaseInvoice,
  //   element: <MainComponent />,
  //   isback: true,
  //   hidden: true,
  // },
  // {
  //   label: 'Purchase Invoice Gate',
  //   key: '/purchase-invoice-gate',
  //   mainkey: 'view-purchase-invoice-register',
  //   path: '/purchase-indent-gate',
  //   component: PurchcaseInvoice,
  //   element: <MainComponent />,
  //   isback: true,
  //   hidden: true,
  // },
  // {
  //   label: 'Purchase Invoice',
  //   key: '/view-purchase-invoice-register',
  //   mainkey: '/view-purchase-invoice-register',
  //   path: '/view-purchase-invoice-register',
  //   buttonLink: '/purchase-invoice',
  //   buttonTitle: 'Purchase Invoice',
  //   component: ViewPurchaseInvoiceRegister,
  //   element: <MainComponent />,
  // },

  {
    label: 'Pending PO For Short Close ',
    key: '/view-pending-po-shortclose',
    path: '/view-pending-po-shortclose',
    mainkey: '/view-pending-po-shortclose',
    element: <MainComponent />,
    component: ViewPendingPOShortClose,
    identity: 'purchasemanagement',
  },

  {
    label: 'Pending PO For Cancellation ',
    key: '/view-pending-po-cancellation',
    path: '/view-pending-po-cancellation',
    mainkey: '/view-pending-po-cancellation',
    element: <MainComponent />,
    component: ViewPendingPOCancellation,
    identity: 'purchasemanagement',
  },
];
