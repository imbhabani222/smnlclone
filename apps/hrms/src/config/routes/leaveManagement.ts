const EmployeeCategoryMenu = [
  {
    url: '/employee-category-leave-setup',
    viewtitle: 'Leave Setup by  Category',
    isBreadcrumb: false,
    // buttonTitle: "Employee Category - Leave Setup",
    createUrl: '/employee-category-leave-setup',
    mainmodule: 'leavemanagement',
    isviewBreadcrumb: true,
  },
];

const EmployeeLeaveRequestMenu = [
  {
    url: '/leave-request',
    viewtitle: 'Leave Request',
    isBreadcrumb: false,
    backUrl: '/leave-request',
    mainmodule: 'leavemanagement',
    isviewBreadcrumb: false,
    isFilter: true,
    buttonTitle: 'Add Leave Request',
    createUrl: '/create-leave-request',
  },
  {
    url: '/create-leave-request',
    title: 'Add Leave Request',
    isBreadcrumb: true,
    buttonTitle: 'Add Leave Request',
    backUrl: '/leave-request',
    mainmodule: 'leavemanagement',
  },
];

const EmployeeLeaveSetupMenu = [
  {
    url: '/leave-setup',
    viewtitle: 'Leave Setup',
    isBreadcrumb: false,
    // buttonTitle: "Employee Category - Leave Setup",
    // createUrl: '/employee-category-leave-setup',
    mainmodule: 'leavemanagement',
    isviewBreadcrumb: true,
  },
];

const EmployeeLeaveApprovalMenu = [
  {
    url: '/leave-approval-rejection',
    viewtitle: 'Leave Approvals & Rejections',
    isBreadcrumb: false,
    // buttonTitle: "Employee Category - Leave Setup",
    // createUrl: '/employee-category-leave-setup',
    mainmodule: 'leavemanagement',
    isviewBreadcrumb: true,
    isFilter: true,
  },
];

export const LeaveMenu = [...EmployeeCategoryMenu, ...EmployeeLeaveRequestMenu, ...EmployeeLeaveSetupMenu, ...EmployeeLeaveApprovalMenu];
