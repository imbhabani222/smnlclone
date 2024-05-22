import ViewCategoryMaster from './categoryMaster/view';
import CreateCategoryMaster from './categoryMaster/create';

import ViewServiceProductMaster from './serviceProductMaster/view';
import CreateServiceProductMaster from './serviceProductMaster/create';

import ViewUnitOfMeasurement from './unitOfMeasurement/view';
import CreateUnitOfMeasurement from './unitOfMeasurement/create';

import ViewBrandMaster from './BrandMaster/view';
import CreateBrandMaster from './BrandMaster/create';

import ViewproductUsedFor from './productUsedFor/view';
import CreateproductUsedFor from './productUsedFor/create';

import ViewProduct from './productMaster/view';
import CreateProduct from './productMaster/create';

import CreateProductAccountBalance from './productOpeningbalance/create';

import ViewAlternateUOM from './alternateUOM/view';

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
  identity?: string;
}

export const Product_Configuration_Sub_Menu: MenuItem[] = [
  {
    label: 'Unit of Measurement',
    key: '/view-unit-of-measurement',
    mainkey: '/view-unit-of-measurement',
    path: '/view-unit-of-measurement',
    component: ViewUnitOfMeasurement,
    element: <MainComponet />,
    buttonLink: '/create-unit-of-measurement',
    buttonTitle: 'Add Unit of Measurement',
    identity: 'productconfiguration',
  },
  {
    label: 'Create Unit of Measurement',
    key: '/create-unit-of-measurement',
    path: '/create-unit-of-measurement',
    mainkey: '/view-unit-of-measurement',
    title: 'Create Unit of Measurement',
    element: <MainComponet />,
    component: CreateUnitOfMeasurement,
    hidden: true,
    isback: true,
    identity: 'productconfiguration',
  },
  {
    label: 'Edit Unit of Measurement',
    key: '/edit-unit-of-measurement',
    path: '/edit-unit-of-measurement',
    mainkey: '/view-unit-of-measurement',
    title: 'Create Unit of Measurement',
    element: <MainComponet />,
    component: CreateUnitOfMeasurement,
    hidden: true,
    isback: true,
    identity: 'productconfiguration',
  },
  {
    label: 'Category',
    key: '/view-category',
    mainkey: '/view-category',
    path: '/view-category',
    component: ViewCategoryMaster,
    element: <MainComponet />,
    buttonLink: '/create-category',
    buttonTitle: 'Add Category',
    identity: 'productconfiguration',
  },
  {
    label: 'Create Category',
    key: '/create-category',
    path: '/create-category',
    mainkey: '/view-category',
    title: 'Create Category',
    element: <MainComponet />,
    component: CreateCategoryMaster,
    hidden: true,
    isback: true,
    identity: 'productconfiguration',
  },
  {
    label: 'Edit Category',
    key: '/edit-category-master',
    path: '/edit-category-master',
    mainkey: '/view-category',
    title: 'Create Category',
    element: <MainComponet />,
    component: CreateCategoryMaster,
    hidden: true,
    isback: true,
    identity: 'productconfiguration',
  },
  {
    label: 'Brand Master',
    key: '/view-brand-master',
    mainkey: '/view-brand-master',
    path: '/view-brand-master',
    component: ViewBrandMaster,
    element: <MainComponet />,
    buttonLink: '/create-brand-master',
    buttonTitle: 'Add Brand Master',
    identity: 'productconfiguration',
  },
  {
    label: 'Create Brand Master',
    key: '/create-brand-master',
    path: '/create-brand-master',
    mainkey: '/view-brand-master',
    title: 'Create Brand Master',
    element: <MainComponet />,
    component: CreateBrandMaster,
    hidden: true,
    isback: true,
    identity: 'productconfiguration',
  },
  {
    label: 'Edit Brand Master',
    key: '/edit-brand-master',
    path: '/edit-brand-master',
    mainkey: '/view-brand-master',
    title: 'Create Brand Master',
    element: <MainComponet />,
    component: CreateBrandMaster,
    hidden: true,
    isback: true,
    identity: 'productconfiguration',
  },
  {
    label: 'Product Used For',
    key: '/view-product-usedfor',
    mainkey: '/view-product-usedfor',
    path: '/view-product-usedfor',
    component: ViewproductUsedFor,
    element: <MainComponet />,
    buttonLink: '/create-product-usedfor',
    buttonTitle: 'Add Product Used For',
    identity: 'productconfiguration',
  },
  {
    label: 'Create Product Used For',
    key: '/create-product-usedfor',
    path: '/create-product-usedfor',
    mainkey: '/view-product-usedfor',
    title: 'Create Productusedfor',
    element: <MainComponet />,
    component: CreateproductUsedFor,
    hidden: true,
    isback: true,
    identity: 'productconfiguration',
  },
  {
    label: 'Edit Product Used For',
    key: '/edit-product-used-for',
    path: '/edit-product-used-for',
    mainkey: '/view-product-usedfor',
    title: 'Create Productusedfor',
    element: <MainComponet />,
    component: CreateproductUsedFor,
    hidden: true,
    isback: true,
    identity: 'productconfiguration',
  },
  {
    label: 'Product Master',
    key: '/view-product',
    mainkey: '/view-product',
    path: '/view-product',
    component: ViewProduct,
    element: <MainComponet />,
    buttonLink: '/create-product',
    buttonTitle: 'Add Product',
    identity: 'productconfiguration',
  },
  {
    label: 'Create Product',
    key: '/create-product',
    path: '/create-product',
    mainkey: '/view-product',
    title: 'Create Product',
    element: <MainComponet />,
    component: CreateProduct,
    hidden: true,
    isback: true,
    identity: 'productconfiguration',
  },
  {
    label: 'Edit Product',
    key: '/edit-product-master',
    path: '/edit-product-master',
    mainkey: '/view-product',
    title: 'Create Product',
    element: <MainComponet />,
    component: CreateProduct,
    hidden: true,
    isback: true,
    identity: 'productconfiguration',
  },
  {
    label: 'Service Product',
    key: '/view-service-product',
    mainkey: '/view-service-product',
    path: '/view-service-product',
    component: ViewServiceProductMaster,
    element: <MainComponet />,
    buttonLink: '/create-service-product',
    buttonTitle: 'Add Service Product',
    identity: 'productconfiguration',
  },
  {
    label: 'Create Service Product',
    key: '/create-service-product',
    path: '/create-service-product',
    mainkey: '/view-service-product',
    title: 'Create Service Product',
    element: <MainComponet />,
    component: CreateServiceProductMaster,
    hidden: true,
    isback: true,
    identity: 'productconfiguration',
  },
  {
    label: 'Edit Service Product',
    key: '/edit-service-product-master',
    path: '/edit-service-product-master',
    mainkey: '/view-service-product',
    title: 'Create Service Product',
    element: <MainComponet />,
    component: CreateServiceProductMaster,
    hidden: true,
    isback: true,
    identity: 'productconfiguration',
  },
 
 
 
  {
    label: 'Product Account Balance',
    key: '/create-product-account-balance',
    path: '/create-roduct-account-balance',
    mainkey: '/create-roduct-account-balance',
    title: 'Product Account Balance',
    element: <MainComponet />,
    component: CreateProductAccountBalance,
    hidden: true,
  },
  // {
  //   label: 'Alternate UOM',
  //   key: '/view-alternate-UOM',
  //   path: '/view-alternate-UOM',
  //   mainkey: '/view-alternate-UOM',
  //   title: 'Product Account Balance',
  //   element: <MainComponet />,
  //   component: ViewAlternateUOM,
  //   // hidden: true,
  // },
];
