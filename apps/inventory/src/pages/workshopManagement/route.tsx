import ViewServiceTypes from './serviceTypes/view';
import CreateServiceTypes from './serviceTypes/create';
import ViewJobCardCreation from './jobCardCreation/viewJobCard';
import CreateJobCard from './jobCardCreation/createJobCard';
import ViewJobCardApproval from './jobCardApproval/viewJobCardApproval';
import ViewJobCardRegister from './jobCardRegister/viewJobCardRegister';
import ViewJobCardPartReq from './jobCardPartRequest/viewJobCardPartReq';
import CreateJobcardPartReq from './jobCardPartRequest/createJobCardPartReq';
import ViewJobCardPartReqApproval from './jobCardPartReqApproval/viewJobCardPartReqApproval';
import CreateJobCardPartReqApproval from './jobCardPartReqApproval/createJobCardPartApproval';
import CreateJobCardApproval from './jobCardApproval/createJobCardApproval';
import ViewJobCardPartReqRegister from './jobcardPartReqRegister/viewJobCardPartRegister';
import JobCardClose from './jobCardClose/jobCardClose';
import ViewJobCardClose from './jobCardClose/viewJobCardClose';
import ViewPartRetunNote from './partReturnNote/viewPartReturn';
import addPartReturn from './partReturnNote/addPartRetun';
import addPartrequest from './jobCardPartRequest/addPartRequest';
import ViewPartReturnApproval from './partReturnNoteApproval/viewpartReturnApproval';
import CreatepartReturnApproval from './partReturnNoteApproval/createPartReturnApproval';
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
  identity?: string;
}

export const Workshop_Management_Sub_Menu: MenuItem[] = [
  {
    label: 'Service Types',
    key: '/view-service-types',
    path: '/view-service-types',
    mainkey: '/view-service-types',
    element: <MainComponent />,
    buttonLink: '/create-service-types',
    buttonTitle: 'Add Service',
    component: ViewServiceTypes,
    identity: 'workshopmanagement',
  },
  {
    label: 'Add Service Master',
    key: '/create-service-types',
    path: '/create-service-types',
    mainkey: '/view-service-types',
    title: 'Add Service Master',
    element: <MainComponent />,
    component: CreateServiceTypes,
    isback: true,
    hidden: true,
    identity: 'workshopmanagement',
  },
  {
    label: 'Edit Service Master',
    key: '/edit-service-types',
    path: '/edit-service-types',
    mainkey: '/view-service-types',
    title: 'Edit Service Master',
    element: <MainComponent />,
    component: CreateServiceTypes,
    isback: true,
    hidden: true,
    identity: 'workshopmanagement',
  },

  {
    label: 'Job Card',
    key: '/view-job-card',
    path: '/view-job-card',
    mainkey: '/view-job-card',
    element: <MainComponent />,
    buttonLink: '/create-job-card',
    buttonTitle: 'Add New Job Card',
    component: ViewJobCardCreation,
    identity: 'workshopmanagement',
  },

  {
    label: 'Job Card-Add New',
    key: '/create-job-card',
    path: '/create-job-card',
    mainkey: '/view-job-card',
    title: 'Add Job Card',
    element: <MainComponent />,
    component: CreateJobCard,
    isback: true,
    hidden: true,
    identity: 'workshopmanagement',
  },
  {
    label: 'Job Card - Edit',
    key: '/edit-job-card',
    path: '/edit-job-card',
    mainkey: '/view-job-card',
    title: 'Edit Job card',
    element: <MainComponent />,
    component: CreateJobCard,
    isback: true,
    hidden: true,
    identity: 'workshopmanagement',
  },

  {
    label: 'Job Card Part Request',
    key: '/view-job-card-part-req',
    path: '/view-job-card-part-req',
    mainkey: '/view-job-card-part-req',
    element: <MainComponent />,
    buttonLink: '/job-card-part-req',
    buttonTitle: 'Job Card Part Request',
    component: ViewJobCardPartReq,
    identity: 'workshopmanagement',
  },
  {
    label: 'Job Card Close',
    key: '/view-job-card-close',
    path: '/view-job-card-close',
    mainkey: '/view-job-card-close',
    element: <MainComponent />,
    // buttonLink: '/job-card-part-req',
    // buttonTitle: 'Job Card Part Request',
    component: ViewJobCardClose,
    identity: 'workshopmanagement',
  },
  {
    label: 'Job Card Part Request',
    key: '/job-card-part-req',
    path: '/job-card-part-req',
    mainkey: '/view-job-card-part-req',
    // title:"Add Job Card",
    element: <MainComponent />,
    component: addPartrequest,
    isback: true,
    hidden: true,
    identity: 'workshopmanagement',
  },
  {
    label: 'Job Card Part Request',
    key: '/add-part-product-request',
    path: '/add-part-product-request',
    mainkey: '/view-job-card-part-req',
    // title:"Add Job Card",
    element: <MainComponent />,
    component: addPartrequest,
    isback: true,
    hidden: true,
    identity: 'workshopmanagement',
  },

  {
    label: 'Job Card Part Request Approval',
    key: '/view-job-card-part-req-approval',
    path: '/view-job-card-part-req-approval',
    mainkey: '/view-job-card-part-req-approval',
    element: <MainComponent />,
    buttonLink: '/',
    // buttonTitle :'Add New Job Card',
    component: ViewJobCardPartReqApproval,
    identity: 'workshopmanagement',
  },
  {
    label: 'Job Card Close',
    key: '/job-card-close',
    path: '/job-card-close',
    mainkey: '/view-job-card-close',
    element: <MainComponent />,
    // buttonTitle :'Add New Job Card',
    isback: true,
    hidden: true,
    component: JobCardClose,
    identity: 'workshopmanagement',
  },
  {
    label: 'Job Card Part Request - Approval',
    key: '/create-job-card-part-req-approve',
    path: '/create-job-card-part-req-approve',
    mainkey: '/view-job-card-part-req-approval',
    element: <MainComponent />,
    component: CreateJobCardPartReqApproval,
    isback: true,
    hidden: true,
    identity: 'workshopmanagement',
  },
  // {
  //   label: 'Job Card Part Request Register',
  //   key: '/view-job-card-part-req-register',
  //   path: '/view-job-card-part-req-register',
  //   mainkey: '/view-job-part-req-register',
  //   element: <MainComponent />,
  //   component: ViewJobCardPartReqRegister,
  //   identity: 'workshopmanagement',
  // },

  {
    label: 'Part Return Note',
    key: '/view-part-return-note',
    path: '/view-part-return-note',
    mainkey: '/view-part-return-note',
    element: <MainComponent />,
    buttonLink: '/create-part-return-note',
    buttonTitle: 'Part Return Note',
    component: ViewPartRetunNote,
    identity: 'workshopmanagement',
  },
  {
    label: 'Part Return Note',
    key: '/create-part-return-note',
    path: '/create-part-return-note',
    mainkey: '/view-part-return-note',
    element: <MainComponent />,
    component: addPartReturn,
    isback: true,
    hidden: true,
    identity: 'workshopmanagement',
  },
  {
    label: 'Part Return Note',
    key: '/add-part-return-product',
    path: '/add-part-return-product',
    mainkey: '/view-part-return-note',
    element: <MainComponent />,
    component: addPartReturn,
    isback: true,
    hidden: true,
    identity: 'workshopmanagement',
  },

  {
    label: 'Part Return Note Approval',
    key: '/view-part-return-note-approval',
    path: '/view-part-return-note-approval',
    mainkey: '/view-part-return-note-approval',
    element: <MainComponent />,
    component: ViewPartReturnApproval,
    identity: 'workshopmanagement',
  },
  {
    label: 'Part Return Note - Approval',
    key: '/create-part-return-note-approve',
    path: '/create-part-return-note-approve',
    mainkey: '/view-part-return-note-approval',
    element: <MainComponent />,
    component: CreatepartReturnApproval,
    isback: true,
    hidden: true,
    identity: 'workshopmanagement',
  },
];
