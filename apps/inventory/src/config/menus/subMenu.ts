interface MenuItem {
  label: string;
  link?: string;
  key: string;
}

export const General_Setup_Sub_Menu: MenuItem[] = [
  { label: 'Country', link: '/view-country', key: '/view-country' },
  { label: 'States', link: '/view-state', key: '/view-state' },
  {label: 'Company',link: '/add-inventory-company-setup',key: '/add-inventory-company-setup',},
  { label: 'User Role', link: '/view-user-role', key: '/view-user-role' },
  { label: 'User Master', link: '/view-user-master', key: '/view-user-master' },
  { label: 'Section', link: '/view-section', key: '/view-section' },
  { label: 'Godown', link: '/view-godown', key: '/view-godown' },
  { label: 'Supplier/Vendor', link: '/view-supplier', key: '/view-supplier' },
  {
    label: 'Supplier Location Master',
    link: '/view-supplier-location-master',
    key: '/view-supplier-location-master',
  },
  {
    label: 'Approval User Limit',
    link: '/view-inventory-approval-user',
    key: '/view-inventory-approval-user',
  },
];

export const Product_Configuration_Sub_Menu: MenuItem[] = [
  {
    label: 'Unit Of Measurement',
    link: '/view-unit-of-measurement',
    key: '/view-unit-of-measurement',
  },
  {
    label: 'Category Master',
    link: '/view-category-master',
    key: '/view-category-master',
  },
  {
    label: 'Service Product Master',
    link: '/view-service-product-master',
    key: '/view-service-product-master',
  },
  { label: 'Brand Master', 
    link: '/view-inventory-product-brand-master', 
    key: '/view-inventory-product-brand-master' 
  },
  {
    label: 'Product Used For',
    link: '/view-product-used-for',
    key: '/view-product-used-for',
  },
  {
    label: 'Product Master',
    link: '/view-product-master',
    key: '/view-product-master',
  },
  {
    label: 'Alternate UOM',
    link: '/view-alternate-UOM',
    key: '/view-alternate-UOM',
  },
  // { label: 'Product opening balance', link: '/', key: '/' },
];


export const Purchase_Management_Sub_Menu: MenuItem[] = [
  {
    label: 'Purchase Indent',
    link: '/create-purchase-indent',
    key: '/create-purchase-indent',
  },
  {
    label: 'Purchase Indent Register',
    link: '/view-purchase-indent-register',
    key: '/view-purchase-indent-register',
  },
  {
    label: 'Purchase Indent Approval',
    link: '/view-purchase-indent-approval',
    key: '/view-purchase-indent-approval',
  },
  
  { label: 'Purchase Order', 
    link: '/purchase-order', 
    key: '/purchase-order' 
  },
  {
    label: 'Purchase Order Approval',
    link: '/purchase-order-approval',
    key: '/purchase-order-approval',
  },
  {
    label: 'Purchase Order Register',
    link: '/purchase-order-register',
    key: '/purchase-order-register',
  },
  {
    label: 'Purchase Invoice',
    link: '/Purchase-invoice',
    key: '/Purchase-invoice',
  },
  {
    label: 'Purchase Register',
    link: '/purchase-register',
    key: '/purchase-register',
  },
  {
    label: 'Purchase Return',
    link: '/purchase-return',
    key: '/purchase-return',
  },
  {
    label: 'Purchase Return',
    link: '/purchase-return',
    key: '/purchase-return',
  },
  {
    label: 'Purchase Return Register',
    link: '/purchase return register',
    key: '/purchase return register',
  },
  {
    label: 'Pending PO for Short Close',
    link: '/pending-op-for-short-close',
    key: '/pending-op-for-short-close',
  },
  {
    label: 'Pending PO for Cancellation',
    link: '/pending-po-for-cancellation',
    key: '/pending-po-for-cancellation',
  },
  {
    label: 'Purchase Indent - Reorder Level',
    link: '/purchase-indent-reorder-level',
    key: '/purchase-indent-reorder-level',
  },
  {
    label: 'Purchase Invoice Approval',
    link: '/purchase-invoice-approval',
    key: '/purchase-invoice-approval',
  },
  {
    label: 'Purchase Return Approval',
    link: '/purchase-return-approval',
    key: '/purchase-return-approval',
  },
];

export const Workshop_Management_Sub_Menu : MenuItem[]=[
  {
    label: 'Service Types',
    link: '/view-service-types',
    key: '/view-service-types',
  }
]

export const Fuel_Management_Sub_Menu: MenuItem[] = [
  
  {
    label: 'View Fuel Bowser',
    link: '/view-fuel-bowser',
    key: '/view-fuel-bowser',
  },
  {
    label: 'Create Fuel Bowser',
    link: '/create-fuel-bowser',
    key: '/create-fuel-bowser',
  },
  {
    label: 'Edit Fuel Bowser',
    link: '/edit-fuel-bowser',
    key: '/edit-fuel-bowser',
  },
  {
    label: 'View Vehicle Types',
    link: '/view-vehicle-types',
    key: '/view-vehicle-types',
  },
  {
    label: 'Create Vehicle Types',
    link: '/create-vehicle-types',
    key: '/create-vehicle-types',
  },
  {
    label: 'Edit Vehicle Types',
    link: '/edit-vehicle-types',
    key: '/edit-vehicle-types',
  },
  {
    label: 'View Vehicles',
    link: '/view-vehicles',
    key: '/view-vehicles',
  },
  {
    label: 'Create Vehicles',
    link: '/create-vehicles',
    key: '/create-vehicles',
  },
  {
    label: 'Edit Vehicles',
    link: '/edit-vehicles',
    key: '/edit-vehicles',
  },
  {
    label: 'View Mobile Users',
    link: '/view-mobile-users',
    key: '/view-mobile-users',
  },
  {
    label: 'Create Mobile Users',
    link: '/create-mobile-users',
    key: '/create-mobile-users',
  },
  {
    label: 'Edit Mobile Users',
    link: '/edit-mobile-users',
    key: '/edit-mobile-users',
  },
  {
    label: 'View Hire Lease Master',
    link: '/view-hire-lease-master',
    key: '/view-hire-lease-master',
  },
  {
    label: 'Create Hire Lease Master',
    link: '/create-hire-lease-master',
    key: '/create-hire-lease-master',
  },
  {
    label: 'Edit Hire Lease Master',
    link: '/edit-hire-lease-master',
    key: '/edit-hire-lease-master',
  },
];

