const PurchaseIndentMenu = [
    {
        url: '/view-purchase-indent-register',
        viewtitle: 'Purchase Indent Register',
        isBreadcrumb: false,
        buttonTitle: '',
        createUrl: '',
        mainmodule: 'purchasemanagement',
        isviewBreadcrumb: true,
    },
    {
      url: '/create-purchase-indent',
      title: 'Purchase Indent',
      isBreadcrumb: true,
      buttonTitle: '',
      backUrl: '',
      mainmodule: 'purchasemanagement',
    },
  ];

  export const PurchaseManagementMenu = [
    ...PurchaseIndentMenu,
  ];