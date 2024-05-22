import ViewSupplierReport from './supplier_report';
import ViewProductWiseReport from './product_wise_report';
import ViewSupplierWisePurchaseReport from './supplier_wise_purchase';
import ViewProductwisePurchaseReport from './product_wise_purchase';
import ViewStockReport from './stock_report';
import JobCardReport from './job_card_report';
import SectionWiseReport from './section_wise_report';
import VehicleWiseReport from './vehicle_wise_report';
import ComplaintWiseReport from './complaint_wise_report';
import ApprovalWiseReport from './approval_wise_report';
import TotalFuelConsumtion from './totalFuelConsumption';
import MonthwiseFuelConsumption from './monthwiseFuelConsumption';
import MainComponent from './index';
import JobCardReports from './JobCardReport';
import Reconcelation from './reconcilation_report';
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

export const MIS_Report_Sub_Menu: MenuItem[] = [
  {
    label: 'Supplier Wise Report',
    key: '/supplier-wise-report',
    path: '/supplier-wise-report',
    mainkey: '/supplier-wise-report',
    element: <MainComponent />,
    component: ViewSupplierReport,
    identity: 'misreports',
  },
  {
    label: 'Supplier Purchase Analysis Report',
    key: '/supplier-purchase-report',
    path: '/supplier-purchase-report',
    mainkey: '/supplier-purchase-report',
    element: <MainComponent />,
    component: ViewSupplierWisePurchaseReport,
    identity: 'misreports',
  },
  {
    label: 'Product Purchase Analysis Report',
    key: '/product-purchase-report',
    path: '/product-purchase-report',
    mainkey: '/product-purchase-report',
    element: <MainComponent />,
    component: ViewProductwisePurchaseReport,
    identity: 'misreports',
  },
  {
    label: 'Stock Report',
    key: '/stock-report',
    path: '/stock-report',
    mainkey: '/stock-report',
    element: <MainComponent />,
    component: ViewStockReport,
    identity: 'misreports',
  },
  {
    label: 'Job Card Summary',
    key: '/job-card-summary',
    path: '/job-card-summary',
    mainkey: '/job-card-summary',
    element: <MainComponent />,
    component: JobCardReport,
    identity: 'misreports',
  },
  {
    label: 'Job Card Report',
    key: '/job-card-report',
    path: '/job-card-report',
    mainkey: '/job-card-report',
    element: <MainComponent />,
    component: JobCardReports,
    identity: 'misreports',
  },
  // {
  //   label: 'Section Wise Report',
  //   key: '/section-wise-report',
  //   path: '/section-wise-report',
  //   mainkey: '/section-wise-report',
  //   element: <MainComponent />,
  //   component: SectionWiseReport,
  //   identity: 'misreports',
  // },
  {
    label: 'Vehicle Wise Report',
    key: '/vehicle-wise-report',
    path: '/vehicle-wise-report',
    mainkey: '/vehicle-wise-report',
    element: <MainComponent />,
    component: VehicleWiseReport,
    identity: 'misreports',
  },
  // {
  //   label: 'Complaint Wise Report',
  //   key: '/complaint-wise-report',
  //   path: '/complaint-wise-report',
  //   mainkey: '/complaint-wise-report',
  //   element: <MainComponent />,
  //   component: ComplaintWiseReport,
  //   identity: 'misreports',
  // },
  // {
  //   label: 'Approval Wise Report',
  //   key: '/approval-wise-report',
  //   path: '/approval-wise-report',
  //   mainkey: '/approval-wise-report',
  //   element: <MainComponent />,
  //   component: ApprovalWiseReport,
  //   identity: 'misreports',
  // },
  {
    label: 'Vehicle Fuel Consumption',
    key: '/total-fuel-consumption',
    path: '/total-fuel-consumption',
    mainkey: '/total-fuel-consumption',
    element: <MainComponent />,
    component: TotalFuelConsumtion,
    identity: 'misreports',
  },
  {
    label: 'MonthWise Fuel Consumption',
    key: '/monthwise-fuel-consumption',
    path: '/monthwise-fuel-consumption',
    mainkey: '/monthwise-fuel-consumption',
    element: <MainComponent />,
    component: MonthwiseFuelConsumption,
    identity: 'misreports',
  },
  {
    label: 'Stock Reconciliation Report',
    key: '/stock-reconciliation-report',
    path: '/stock-reconciliation-report',
    mainkey: '/reconciliation-report',
    element: <MainComponent />,
    component: Reconcelation,
    identity: 'misreports',
  },
];
