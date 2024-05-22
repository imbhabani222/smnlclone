import CreateBrandMaster from './BrandMaster/create';
import ViewBrandMaster from './BrandMaster/view';
import AddAssetMaster from './AssetMaster/create';
import ViewAssetMaster from './AssetMaster/view';
import CreateAssetRequest from './AssetRequest/create';
import ViewAssetRequest from './AssetRequest/view';
import ViewAssetRequestApproval from './AssetRequest/viewassetrequestapproval';
import CreateAssetReuestApproval from './AssetRequest/createassetrequestapproval';
import ReportAssetRequestApproval from './AssetRequest/reportassetrequestapproval';

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
  identity: string;
}

export const Asset_Sub_Menu: MenuItem[] = [
  {
    label: 'Brand Master',
    key: '/view-brand-master',
    mainkey: '/view-brand-master',
    path: '/view-brand-master',
    component: ViewBrandMaster,
    element: <MainComponent />,
    buttonLink: '/create-brand-master',
    buttonTitle: 'Add Brand Master',
    identity: 'assetsmanagement',
  },
  {
    label: 'Create Brand Master',
    key: '/create-brand-master',
    mainkey: '/view-brand-master',
    path: '/create-brand-master',
    component: CreateBrandMaster,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'assetsmanagement',
  },
  {
    label: 'Edit Brand Master',
    key: '/edit-brand-master',
    mainkey: '/view-brand-master',
    path: '/edit-brand-master',
    component: CreateBrandMaster,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'assetsmanagement',
  },
  {
    label: 'Asset Master',
    key: '/view-asset-list',
    mainkey: '/view-asset-list',
    path: '/view-asset-list',
    component: ViewAssetMaster,
    element: <MainComponent />,
    buttonLink: '/create-asset',
    buttonTitle: 'Add New Asset',
    identity: 'assetsmanagement',
  },
  {
    label: 'Create Asset',
    key: '/create-asset',
    mainkey: '/view-asset-list',
    path: '/create-asset',
    component: AddAssetMaster,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'assetsmanagement',
  },
  {
    label: 'Edit Asset',
    key: '/edit-asset',
    mainkey: '/view-asset-list',
    path: '/edit-asset',
    component: AddAssetMaster,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'assetsmanagement',
  },
  {
    label: 'Asset Request',
    key: '/view-asset-request',
    mainkey: '/view-asset-request',
    path: '/view-asset-request',
    component: ViewAssetRequest,
    element: <MainComponent />,
    buttonLink: '/create-asset-request',
    buttonTitle: 'Add Asset Request',
    identity: 'assetsmanagement',
  },
  {
    label: 'Create Asset Request',
    key: '/create-asset-request',
    mainkey: '/view-asset-request',
    path: '/create-asset-request',
    component: CreateAssetRequest,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'assetsmanagement',
  },
  {
    label: 'Edit Asset Request',
    key: '/edit-asset-request',
    mainkey: '/view-asset-request',
    path: '/edit-asset-request',
    component: CreateAssetRequest,
    element: <MainComponent />,
    hidden: true,
    isback: true,
    identity: 'assetsmanagement',
  },
  {
    label: 'Asset Request Approval',
    key: '/view-asset-approval',
    mainkey: '/view-asset-approval',
    path: '/view-asset-approval',
    component: ViewAssetRequestApproval,
    element: <MainComponent />,
    identity: 'assetsmanagement',
  },
  {
    label: 'Asset Request Approval',
    key: '/asset-request-approval',
    mainkey: '/view-asset-request',
    path: '/asset-request-approval',
    component: CreateAssetReuestApproval,
    element: <MainComponent />,
    hidden: true,
    identity: 'assetsmanagement',
  },
  {
    label: 'Asset Request Report',
    key: '/view-asset-report',
    mainkey: '/view-asset-report',
    path: '/view-asset-report',
    component: ReportAssetRequestApproval,
    element: <MainComponent />,
    identity: 'assetsmanagement',
  },
];
