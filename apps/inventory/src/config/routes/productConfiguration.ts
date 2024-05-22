const UnitOfMeasurementMenu = [
  {
    url: '/view-unit-of-measurement',
    viewtitle: 'Unit Of Measurement',
    isBreadcrumb: false,
    buttonTitle: 'Add Unit Of Measurement',
    createUrl: '/create-unit-of-measurement',
    mainmodule: 'productconfiguration',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-unit-of-measurement',
    title: 'Add Unit Of Measurement',
    isBreadcrumb: true,
    buttonTitle: 'Add Unit Of Measurement',
    backUrl: '/view-unit-of-measurement',
    mainmodule: 'productconfiguration',
  },
  {
    url: '/edit-unit-of-measurement',
    title: 'Edit Unit Of Measurement',
    isBreadcrumb: true,
    buttonTitle: 'Edit Unit Of Measurement',
    backUrl: '/view-unit-of-measurement',
    mainmodule: 'productconfiguration',
  },
];

const CategoryMasterMenu = [
  {
    url: '/view-category-master',
    viewtitle: 'Category Master',
    isBreadcrumb: false,
    buttonTitle: 'Add Category Master',
    createUrl: '/create-category-master',
    mainmodule: 'productconfiguration',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-category-master',
    title: 'Add Category Master',
    isBreadcrumb: true,
    buttonTitle: 'Add Category Master',
    backUrl: '/view-category-master',
    mainmodule: 'productconfiguration',
  },
  {
    url: '/edit-category-master',
    title: 'Edit Category Master',
    isBreadcrumb: true,
    buttonTitle: 'Edit Category Master',
    backUrl: '/view-category-master',
    mainmodule: 'productconfiguration',
  },
];

const ServiceProductMasterMenu = [
  {
    url: '/view-service-product-master',
    viewtitle: 'Service Product Master',
    isBreadcrumb: false,
    buttonTitle: 'Add Service Product Master',
    createUrl: '/create-service-product-master',
    mainmodule: 'productconfiguration',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-service-product-master',
    title: 'Add Service Product Master',
    isBreadcrumb: true,
    buttonTitle: 'Add Service Product Master',
    backUrl: '/view-service-product-master',
    mainmodule: 'productconfiguration',
  },
  {
    url: '/edit-service-product-master',
    title: 'Edit Service Product Master',
    isBreadcrumb: true,
    buttonTitle: 'Edit Service Product Master',
    backUrl: '/view-service-product-master',
    mainmodule: 'productconfiguration',
  },
];


const ProductMasterMenu = [
  {
    url: '/view-product-master',
    viewtitle: 'Product List',
    isBreadcrumb: false,
    buttonTitle: 'Add Product Master',
    createUrl: '/create-product-master',
    mainmodule: 'productconfiguration',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-product-master',
    title: 'Product/Part Details',
    isBreadcrumb: true,
    buttonTitle: 'Add Product Master',
    backUrl: '/view-product-master',
    mainmodule: 'productconfiguration',
  },
  {
    url: '/edit-product-master',
    title: 'Edit Product Master',
    isBreadcrumb: true,
    buttonTitle: 'Edit Product Master',
    backUrl: '/view-product-master',
    mainmodule: 'productconfiguration',
  },
];

const ProductUsedForMenu = [
  {
    url: '/view-product-used-for',
    viewtitle: 'Product Used For List',
    isBreadcrumb: false,
    buttonTitle: 'Add Product Used For',
    createUrl: '/create-product-used-for',
    mainmodule: 'productconfiguration',
    isviewBreadcrumb: true,
  },
  {
    url: '/create-product-used-for',
    title: 'Product Details',
    isBreadcrumb: true,
    buttonTitle: 'Add Product Used For',
    backUrl: '/view-product-used-for',
    mainmodule: 'productconfiguration',
  },
  {
    url: '/edit-product-used-for',
    title: 'Edit Product Details',
    isBreadcrumb: true,
    buttonTitle: 'Edit Product Used For',
    backUrl: '/view-product-used-for',
    mainmodule: 'productconfiguration',
  },
];

const AlternateUomMenu = [
  {
    url: '/view-alternate-UOM',
    viewtitle: 'Alternate UOM List',
    isBreadcrumb: false,
    mainmodule: 'productconfiguration',
    isviewBreadcrumb: true,
  },
];

const brandMasterMasterMenu = [ 
  {
    url: '/view-inventory-product-brand-master',
    viewtitle: 'Brand List',
    isBreadcrumb: false,
    buttonTitle: 'Add New UOM',
    createUrl: '/create-inventory-product-brand-master',
    mainmodule: 'productconfiguration',
    isviewBreadcrumb: true,

  },
  {
    url: '/create-inventory-product-brand-master',
    title: '',
    isBreadcrumb: true,
    buttonTitle: 'Add Brand Master',
    backUrl: '/view-inventory-product-brand-master',
    mainmodule: 'productconfiguration',
  },
  {
    url: '/edit-inventory-product-brand-master',
    title: 'Edit Brand Master',
    isBreadcrumb: true,
    // buttonTitle: 'Edit Product Used For',
    backUrl: '/view-inventory-product-brand-master',
    mainmodule: 'productconfiguration',
  },

];

const ProductOpenBalanceMenu = [
  {
    url: '/create-inventory-product-brand-master',
    title: '',
    isBreadcrumb: true,
    buttonTitle: 'Add Brand Master',
    backUrl: '/view-inventory-product-brand-master',
    mainmodule: 'productconfiguration',
  },


]


export const ProductConfigurationMenu = [
    ...UnitOfMeasurementMenu,
    ...brandMasterMasterMenu,
    ...CategoryMasterMenu,
    ...ProductUsedForMenu,
    ...ProductMasterMenu,
    ...AlternateUomMenu,
    ...ServiceProductMasterMenu,
   ...ProductOpenBalanceMenu,
  ];