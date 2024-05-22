const BrandMasterMenu = [
  {
    url: '/brand-master',
    viewtitle: 'Brand Master',
    isBreadcrumb: false,
    buttonTitle: 'Add Brand Master',
    createUrl: '/add-brand-master',
    mainmodule: 'assetsmanagement',
    isviewBreadcrumb: true,
  },
  {
    url: '/add-brand-master',
    title: 'Brand Master',
    isBreadcrumb: true,
    buttonTitle: 'Add Brand Master',
    backUrl: '/brand-master',
    mainmodule: 'assetsmanagement',
  },
  {
    url: '/edit-brand-master',
    title: 'Brand Master',
    isBreadcrumb: true,
    buttonTitle: 'Add Brand Master',
    backUrl: '/brand-master',
    mainmodule: 'assetsmanagement',
  },
];

const AssetMasterMenu = [
  {
    url: '/asset-master',
    viewtitle: 'Asset Master',
    isBreadcrumb: false,
    buttonTitle: 'Add Asset Master',
    createUrl: '/add-asset-master',
    module: 'assetsmanagement',
    isexport: true,
  },
  {
    url: '/add-asset-master',
    title: 'Asset Master',
    isBreadcrumb: true,
    buttonTitle: 'Add Asset Master',
    backUrl: '/asset-master',
    module: 'assetsmanagement',
  },
  {
    url: '/edit-asset-master',
    title: 'Asset Master',
    isBreadcrumb: true,
    buttonTitle: 'Add Asset Master',
    backUrl: '/asset-master',
    module: 'assetsmanagement',
  },
];

const AssetListMenu = [
  {
    url: '/asset-list',
    viewtitle: 'Asset List',
    isBreadcrumb: false,
    buttonTitle: null,
    createUrl: '/add-asset-list',
    module: 'assetsmanagement',
  },
];

const AssetRequestMenu = [
  {
    url: '/asset-request',
    viewtitle: 'Asset Request',
    isBreadcrumb: false,
    buttonTitle: 'Add Asset Request',
    createUrl: '/add-asset-request',
    module: 'assetsmanagement',
  },
  {
    url: '/add-asset-request',
    title: 'Asset Request',
    isBreadcrumb: true,
    buttonTitle: 'Add Asset Request',
    module: 'assetsmanagement',
    backUrl: '/asset-request',
  },
  {
    url: '/edit-asset-request',
    title: 'Asset Request',
    isBreadcrumb: true,
    buttonTitle: 'Add Asset Request',
    backUrl: '/asset-request',
    module: 'assetsmanagement',
  },
];

export const AssetMenu = [
  ...BrandMasterMenu,
  ...AssetMasterMenu,
  ...AssetListMenu,
  ...AssetRequestMenu,
];
