import CreatePartIssueNote from './partIssueNote/createList';
import ViewPartIssueNoteRegister from './partIssueNote/viewRegister';
import PartIssueNote from './partIssueNote/index';
import PartIssueNoteProduct from './partIssueNote/productPartIssue';
import PartIssueAddTabs from './partIssueNote/partIssueAddTabs';
import JobCardPartReqView from './jobCardPartReqAccept/viewJobCardPartReqAccept';
import JobCardPartAccept from './jobCardPartReqAccept/createJobCardPartAccept';

import MainComponent from './index';

import GoodRecievedNote from './goodRecievedNote/view';
import InventoryStock from './inventoryStock/view';
import GrnRegister from './grnRegister/view';
import GrnReturnRegister from './grnReturnRegister/view';
import AddGrnTabs from './goodRecievedNote/addTabs';
import GrnAddProduct from './goodRecievedNote/grnAddProducts';
import AlternateGrnReturn from './grnReturnRegister/altGrnReturn';

import GrnReturnAddTabs from './grnReturnRegister/grnReturnAddTabs';
import AltGrnAddProduct from './grnReturnRegister/altGrnReturnAddProduct';

import PartReturnNoteAccept from './partReturnNoteAccept/view';
import PartReturnNoteRegister from './partReturnNoteRegister/view';
import ReorderLevel from './reorderLevel/view';
import CreateReorderLevel from './reorderLevel/create';
import ViewReconciliation from './reconciliation/view';
import AddReconciliationTab from './reconciliation/addReconciliationTab';
import ViewReconciliationApproval from './reconciliationApproval/view';
import CreateReconciliationApproval from './reconciliationApproval/create'

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

export const Inventory_Management_Sub_Menu: MenuItem[] = [
  {
    label: 'GRN Register',
    key: '/view-grn-register',
    mainkey: '/view-grn-register',
    path: '/view-grn-register',
    component: GrnRegister,
    element: <MainComponent />,
    buttonLink: '/good-received-note',
    identity: 'inventorymanagement',
    buttonTitle: 'Add New GRN',
  },
  {
    label: 'GRN Register',
    key: '/good-received-note',
    mainkey: '/view-grn-register',
    path: '/good-received-note',
    component: AddGrnTabs,
    element: <MainComponent />,
    buttonLink: '/create-good-received-note',
    // buttonTitle: 'Add New GRN',
    hidden: true,
    isback: true,
    identity: 'inventorymanagement',
  },
  {
    label: 'GRN Register',
    key: '/add-grn-product',
    mainkey: '/view-grn-register',
    path: '/add-grn-product',
    element: <MainComponent />,
    component: AddGrnTabs,
    isback: true,
    hidden: true,
    identity: 'inventorymanagement',
  },
  {
    label: 'GRN Register',
    key: '/add-get-pass',
    mainkey: '/view-grn-register',
    path: '/add-get-pass',
    element: <MainComponent />,
    component: AddGrnTabs,
    isback: true,
    hidden: true,
    identity: 'inventorymanagement',
  },
  {
    label: 'GRN Return',
    key: '/view-grn-return-register',
    mainkey: '/view-grn-return-register',
    path: '/view-grn-return-register',
    component: GrnReturnRegister,
    element: <MainComponent />,
    buttonLink: '/add-new-alt-grn-return',
    identity: 'inventorymanagement',
    buttonTitle: 'Add New GRN Return',
  },
  {
    label: 'GRN Return Register',
    key: '/add-new-alt-grn-return',
    mainkey: '/view-grn-return-register',
    path: '/add-new-alt-grn-return',
    component: GrnReturnAddTabs,
    element: <MainComponent />,
    buttonLink: '/create-good-received-note',
    // buttonTitle: 'Add New GRN',
    hidden: true,
    identity: 'inventorymanagement',
  },
  {
    label: 'GRN Return Register',
    key: '/add-alt-grn-product',
    mainkey: '/view-grn-return-register',
    path: '/add-alt-grn-product',
    element: <MainComponent />,
    component: GrnReturnAddTabs,
    isback: true,
    hidden: true,
    identity: 'inventorymanagement',
  },
  {
    label: 'Gate Pass',
    key: '/grn-return-gate-pass',
    mainkey: '/view-grn-return-register',
    path: '/grn-return-gate-pass',
    element: <MainComponent />,
    component: GrnReturnAddTabs,
    isback: true,
    hidden: true,
    identity: 'inventorymanagement',
  },
  {
    label: 'Inventory Stock',
    key: '/inventory-stock',
    mainkey: '/inventory-stock',
    path: '/inventory-stock',
    element: <MainComponent />,
    component: InventoryStock,
    identity: 'inventorymanagement',
  },
  {
    label: 'Part Request Accept',
    key: '/job-card-part-accept',
    mainkey: '/job-card-part-accept',
    path: '/job-card-part-accept',
    component: JobCardPartReqView,
    element: <MainComponent />,
    identity: 'inventorymanagement',
  },
  {
    label: 'Part Request Accept',
    key: '/job-card-part-request-accept',
    mainkey: '/job-card-part-accept',
    path: '/job-card-part-request-accept',
    component: JobCardPartAccept,
    element: <MainComponent />,
    identity: 'inventorymanagement',
    hidden: true,
  },
  {
    label: 'Part Issue Note',
    key: '/view-part-issue-note-register',
    mainkey: '/view-part-issue-note-register',
    path: '/view-part-issue-note-register',
    component: ViewPartIssueNoteRegister,
    element: <MainComponent />,
    buttonLink: '/create-part-issue-note',
    identity: 'inventorymanagement',
    buttonTitle: 'Add New',
  },
  {
    label: 'Part Issue Note',
    key: '/create-part-issue-note',
    path: '/create-part-issue-note',
    mainkey: '/view-part-issue-note-register',
    element: <MainComponent />,
    component: PartIssueAddTabs,
    isback: true,
    hidden: true,
    identity: 'inventorymanagement',
  },
  {
    label: 'Part Issue Note',
    key: '/part-issue-product',
    path: '/part-issue-product',
    mainkey: '/view-part-issue-note-register',
    element: <MainComponent />,
    component: PartIssueAddTabs,
    isback: true,
    hidden: true,
    identity: 'inventorymanagement',
  },

  // {
  //   label: 'Part Issue Note Register',
  //   key: '/part-issue-add-get-pass',
  //   path: '/part-issue-add-get-pass',
  //   mainkey: '/view-part-issue-note-register',
  //   element: <MainComponent />,
  //   component: PartIssueAddTabs,
  //   isback: true,
  //   hidden: true,
  //   identity: 'inventorymanagement',
  // },

  {
    label: 'Part Return Note Accept',
    key: '/part-return-note-accept',
    mainkey: '/part-return-note-register',
    path: '/part-return-note-accept',
    component: PartReturnNoteAccept,
    element: <MainComponent />,
    identity: 'inventorymanagement',
    hidden: true,
  },
  {
    label: 'Part Return Accept',
    key: '/part-return-note-register',
    mainkey: '/part-return-note-register',
    path: '/part-return-note-register',
    component: PartReturnNoteRegister,
    element: <MainComponent />,
    identity: 'inventorymanagement',
  },

  // {
  //   label: 'Part Issue Note Register',
  //   key: '/add-new-alt-grn-return',
  //   mainkey: '/view-grn-return-register',
  //   path: '/add-new-alt-grn-return',
  //   component: GrnReturnAddTabs,
  //   element: <MainComponent />,
  //   buttonLink: '/create-good-received-note',
  //   // buttonTitle: 'Add New GRN',
  //   hidden: true,
  //   identity: 'inventorymanagement',
  // },
  {
    label: 'Reorder Level',
    key: '/view-reorder-level',
    mainkey: '/view-reorder-level',
    path: '/view-reorder-level',
    component: ReorderLevel,
    element: <MainComponent />,
    buttonLink: '/create-reorder-level',
    // buttonTitle: 'Add Reorder Level',
    identity: 'inventorymanagement',
  },
  // {
  //   label: 'Add Reorder Level',
  //   key: '/add-reorder-level',
  //   path: '/add-reorder-level',
  //   mainkey: '/view-reorder-level',
  //   title: 'Add Reorder Level',
  //   element: <MainComponent />,
  //   component: CreateReorderLevel,
  //   hidden: true,
  //   isback: true,
  //   identity: 'inventorymanagement',
  // },
  // {
  //   label: 'Edit Reorder Level',
  //   key: '/edit-reorder-level',
  //   path: '/edit-reorder-level',
  //   mainkey: '/view-reorder-level',
  //   title: 'Add Reorder Level',
  //   element: <MainComponent />,
  //   component: CreateReorderLevel,
  //   hidden: true,
  //   isback: true,
  //   identity: 'inventorymanagement',
  // },
  
  {
    label: 'Reconciliation',
    key: '/view-reconciliation',
    mainkey: '/view-reconciliation',
    path: '/view-reconciliation',
    component: ViewReconciliation,
    element: <MainComponent />,
    identity: 'inventorymanagement',
    buttonLink: '/reconciliation-data',
    buttonTitle: 'Add Reconciliation',
  },
  {
    label: 'Reconciliation',
    key: '/reconciliation-data',
    mainkey: '/view-reconciliation',
    path: '/reconciliation-data',
    element: <MainComponent />,
    component: AddReconciliationTab,
    isback: true,
    hidden: true,
    identity: 'inventorymanagement',
  },
  {
    label: 'Reconciliation',
    key: '/add-reconciliation-product',
    mainkey: '/view-reconciliation',
    path: '/add-reconciliation-product',
    element: <MainComponent />,
    component: AddReconciliationTab,
    isback: true,
    hidden: true,
    identity: 'inventorymanagement',
  },
  {
    label: 'Reconciliation Approval',
    key: '/reconciliation-approval',
    path: '/reconciliation-approval',
    mainkey: '/reconciliation-approval',
    title: 'Reconciliation Approval',
    element: <MainComponent />,
    component: ViewReconciliationApproval,
    identity: 'inventorymanagement',
  },

  {
    label: 'Reconciliation-Approval',
    key: '/create-reconciliation-approval',
    path: '/create-reconciliation-approval',
    mainkey: '/reconciliation-approval',
    title: 'Add Reconciliation Approval',
    element: <MainComponent />,
    component: CreateReconciliationApproval,
    isback: true,
    hidden: true,
    identity: 'inventorymanagement',
  }
];
// CreateReconciliation
