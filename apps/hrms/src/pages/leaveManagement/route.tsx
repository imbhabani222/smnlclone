import LeaveSetupCategory from './empCategoryLeaveSetup/create';
import EmployeeLeaveSetup from './leaveSetup/create';
import LeaveRequestListing from './leaveRequest/leaveRequestListing';
import CreateLeaveRequest from './leaveRequest/create';
import LeaveApproval from './leaveApproval/Index';
import LeaveEnchasmentListing from './leaveEncashment/view';
import CreateLeaveEnchasment from './leaveEncashment/create';
import LeaveEncashmentApproval from './approveEncashment/Create';
import ViewAttendance from "./attendance/view";
import EditAttendance from "./attendance/edit";
import CreateAttendance from  "./attendance/create";
import CreateCompensatory from './compensatory/create';
import ViewCompensatory from './compensatory/view';
import CreateWeekOff from './weekOff/create';
import ViewWeekOff from './weekOff/view';
import AttendanceReconcilationListing from './attendanceReconcilation/view';
import CreateAttendanceReconcilation from './attendanceReconcilation/create';
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
  identity: string;
}

export const Leave_Management_Sub_Menu: MenuItem[] = [
  // {
  //   label: 'Leave Setup by Category',
  //   key: '/employee-category-leave-setup',
  //   mainkey: '/employee-category-leave-setup',
  //   path: '/employee-category-leave-setup',
  //   component: LeaveSetupCategory,
  //   element: <MainComponet />,
  //   identity: 'leavemanagement',
  // },
  {
    label: 'Attendance',
    key: '/view-attendance',
    mainkey: '/view-attendance',
    path: '/view-attendance',
    component: ViewAttendance,
    element: <MainComponet />,
    identity: 'leavemanagement',
  },
  {
    label: 'Create Attendance',
    key: '/create-attendance',
    mainkey: '/view-attendance',
    path: '/create-attendance',
    component: CreateAttendance,
    element: <MainComponet />,
    identity: 'leavemanagement',
    hidden: true,
  },
  {
    label: 'Edit Attendance',
    key: '/edit-attendance',
    mainkey: '/view-attendance',
    path: '/edit-attendance',
    component: EditAttendance,
    element: <MainComponet />,
    identity: 'leavemanagement',
    hidden: true,
  },
  {
    label: 'Reconcilation of Attendance',
    key: '/view-attendance-reconcilation',
    mainkey: '/view-attendance-reconcilation',
    path: '/view-attendance-reconcilation',
    component: AttendanceReconcilationListing,
    element: <MainComponet />,
    identity: 'leavemanagement',
  },
  {
    label: 'Reconcilation of Attendance',
    key: '/approve-attendance-reconcilation',
    mainkey: '/view-attendance-reconcilation',
    path: '/approve-attendance-reconcilation',
    component: CreateAttendanceReconcilation,
    element: <MainComponet />,
    identity: 'leavemanagement',
    hidden: true,
  },
  {
    label: 'Compensatory Off',
    key: '/view',
    mainkey: '/view-compensatory-off',
    path: '/view-compensatory-off',
    component: ViewCompensatory,
    element: <MainComponet />,
    identity: 'leavemanagement',
  },
  {
    label: 'Create Compensatory Off',
    key: '/create-compensatory-off',
    mainkey: '/view-compensatory-off',
    path: '/create-compensatory-off',
    component: CreateCompensatory,
    element: <MainComponet />,
    identity: 'leavemanagement',
    hidden: true,
  },
  {
    label: 'Edit Compensatory Off',
    key: '/edit-compensatory-off',
    mainkey: '/view-compensatory-off',
    path: '/edit-compensatory-off',
    component: CreateCompensatory,
    element: <MainComponet />,
    identity: 'leavemanagement',
    hidden: true,
  },
  {
    label: 'Week Off',
    key: '/view-week-off',
    mainkey: '/view-week-off',
    path: '/view-week-off',
    component: ViewWeekOff,
    element: <MainComponet />,
    identity: 'leavemanagement',
  },
  {
    label: 'Create Week Off',
    key: '/create-week-off',
    mainkey: '/view-week-off',
    path: '/create-week-off',
    component: CreateWeekOff,
    element: <MainComponet />,
    identity: 'leavemanagement',
    hidden: true,
  },
  {
    label: 'Edit Week Off',
    key: '/edit-week-off',
    mainkey: '/view-week-off',
    path: '/edit-week-off',
    component: CreateWeekOff,
    element: <MainComponet />,
    identity: 'leavemanagement',
    hidden: true,
  },

  {
    label: 'Leave Setup',
    key: '/leave-setup',
    mainkey: '/leave-setup',
    path: '/leave-setup',
    component: EmployeeLeaveSetup,
    element: <MainComponet />,
    identity: 'leavemanagement',
  },
  {
    label: 'Leave Request',
    key: '/leave-request',
    mainkey: '/leave-request',
    path: '/leave-request',
    component: LeaveRequestListing,
    element: <MainComponet />,
    buttonLink: '/create-leave-request',
    buttonTitle: 'Add Leave Request',
    identity: 'leavemanagement',
  },
  {
    label: 'Leave Request',
    key: '/create-leave-request',
    mainkey: '/leave-request',
    path: '/create-leave-request',
    component: CreateLeaveRequest,
    element: <MainComponet />,
    hidden: true,
    identity: 'leavemanagement',
  },
  {
    label: 'Edit Leave Request',
    key: '/edit-leave-request',
    mainkey: '/leave-request',
    path: '/edit-leave-request',
    component: CreateLeaveRequest,
    element: <MainComponet />,
    hidden: true,
    identity: 'leavemanagement',
  },
  {
    label: 'Leave Approvals & Rejections',
    key: '/leave-approval-rejection',
    mainkey: '/leave-approval-rejection',
    path: '/leave-approval-rejection',
    component: LeaveApproval,
    element: <MainComponet />,
    identity: 'leavemanagement',
  },
  {
    label: 'Leave Approvals & Rejections',
    key: '/create-leave-request',
    mainkey: '/leave-approval-rejection',
    path: '/create-leave-request',
    component: CreateLeaveRequest,
    element: <MainComponet />,
    hidden: true,
    identity: 'leavemanagement',
  },
  {
    label: 'Leave Encashment',
    key: '/leave-encashment',
    mainkey: '/leave-encashment',
    path: '/leave-encashment',
    component: LeaveEnchasmentListing,
    element: <MainComponet />,
    buttonLink: '/create-leave-encashment',
    buttonTitle: 'Add Leave encashment',
    identity: 'leavemanagement',
  },
  {
    label: 'Leave Encashment',
    key: '/create-leave-encashment',
    mainkey: '/leave-encashment',
    path: '/create-leave-encashment',
    component: CreateLeaveEnchasment,
    element: <MainComponet />,
    hidden: true,
    identity: 'leavemanagement',
  },
  {
    label: 'Edit Leave Encashment',
    key: '/edit-leave-encashment',
    mainkey: '/leave-encashment',
    path: '/edit-leave-encashment',
    component: CreateLeaveEnchasment,
    element: <MainComponet />,
    hidden: true,
    identity: 'leavemanagement',
  },
  {
    label: 'Leave Encashment Approvals & Rejections',
    key: '/leave-encashment-approval-rejection',
    mainkey: '/leave-encashment-approval-rejection',
    path: '/leave-encashment-approval-rejection',
    component: LeaveEncashmentApproval,
    element: <MainComponet />,
    identity: 'leavemanagement',
  },
  {
    label: 'Leave Encashment Approvals & Rejections',
    key: '/create-leave-encashment',
    mainkey: '/leave-encashment-approval-rejection',
    path: '/create-leave-Encashment',
    component: CreateLeaveEnchasment,
    element: <MainComponet />,
    hidden: true,
    identity: 'leavemanagement',
  },

];

