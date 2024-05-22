
const PartIssueMenu = [
    {
        url: '/view-part-issue-note',
        viewtitle: 'Part Issue B=Note',
        isBreadcrumb: false,
        buttonTitle: '',
        createUrl: '',
        mainmodule: 'inventorymanagement',
        isviewBreadcrumb: true,
    },
    {
      url: '/create-part-issue-note',
      title: 'Purchase Indent',
      isBreadcrumb: true,
      buttonTitle: '',
      backUrl: '',
      mainmodule: 'inventorymanagement',
    },
    {
        url: '/part-issue-product',
        title: 'Purchase Indent',
        isBreadcrumb: true,
        buttonTitle: '',
        backUrl: '',
        mainmodule: 'inventorymanagement',
      },
  ];

const GoodRecievedMenu = [
  {
    url: '/view-good-received-note',
    viewtitle: 'Good Received Note',
    isBreadcrumb: false,
    buttonTitle: 'Add Good Received Note',
    createUrl: '/create-good-received-note',
    mainmodule: 'inventorymanagement',
    isviewBreadcrumb: true,
  },
];

export const InventoryManagementMenu = [...PartIssueMenu,...GoodRecievedMenu];
