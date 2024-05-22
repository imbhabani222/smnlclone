import MainComponent from './index';
import ViewSubTasks from './SubTasks/viewSubTasks';
import CreateSubTask from './SubTasks/create';
import ViewTasks from './Tasks/viewTasks';
import CreateTask from './Tasks/create';
import ViewActivities from './Activity/view';
import CreateActivity from './Activity/create';

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

export const tasks_subRoutes: MenuItem[] = [
  {
    label: 'Tasks',
    key: '/view-tasks',
    mainkey: '/view-tasks',
    path: '/view-tasks',
    component: ViewTasks,
    title: 'Tasks',
    element: <MainComponent />,
    buttonLink: '/create-tasks',
    buttonTitle: 'Add Tasks',
    identity: 'tasks',
  },
  {
    label: 'Add Task',
    key: '/create-tasks',
    path: '/create-tasks',
    mainkey: '/view-tasks',
    title: 'Create Tasks',
    element: <MainComponent />,
    component: CreateTask,
    hidden: true,
    isback: true,
    identity: 'tasks',
  },
  {
    label: 'Edit Tasks',
    key: '/edit-tasks',
    path: '/edit-tasks',
    mainkey: '/view-tasks',
    title: 'Create Tasks',
    element: <MainComponent />,
    component: CreateTask,
    hidden: true,
    isback: true,
    identity: 'tasks',
  },

  //Sub Tasks
  // {
  //   label: 'Sub Tasks',
  //   key: '/view-subtasks',
  //   mainkey: '/view-subtasks',
  //   path: '/view-subtasks',

  //   component: ViewSubTasks,
  //   title: 'subtasks',
  //   element: <MainComponent />,
  //   buttonLink: '/create-subtasks',
  //   buttonTitle: 'Add subtasks',
  //   identity: 'tasks',
  // },
  // {
  //   label: 'Add Subtask',
  //   key: '/create-subtasks',
  //   path: '/create-subtasks',
  //   mainkey: '/view-subtasks',
  //   title: 'Create subtasks',
  //   element: <MainComponent />,
  //   component: CreateSubTask,
  //   hidden: true,
  //   isback: true,
  //   identity: 'tasks',
  // },
  // {
  //   label: 'Edit Subtasks',
  //   key: '/edit-subtasks',
  //   path: '/edit-subtasks',
  //   mainkey: '/view-subtasks',
  //   title: 'Create subtasks',
  //   element: <MainComponent />,
  //   component: CreateSubTask,
  //   hidden: true,
  //   isback: true,
  //   identity: 'tasks',
  // },

  //Activity

  // {
  //   label: 'Activities',
  //   key: '/view-activities',
  //   mainkey: '/view-activities',
  //   path: '/view-activities',
  //   component: ViewActivities,
  //   title: 'activity',
  //   element: <MainComponent />,
  //   buttonLink: '/create-activities',
  //   buttonTitle: 'Add activity',
  //   identity: 'tasks',
  // },
  // {
  //   label: 'Add activity',
  //   key: '/create-activities',
  //   path: '/create-activities',
  //   mainkey: '/view-activities',
  //   title: 'Create activity',
  //   element: <MainComponent />,
  //   component: CreateActivity,
  //   hidden: true,
  //   isback: true,
  //   identity: 'tasks',
  // },
  // {
  //   label: 'Edit activity',
  //   key: '/edit-task-activities',
  //   path: '/edit-task-activities',
  //   mainkey: '/view-activities',
  //   title: 'Edit activity',
  //   element: <MainComponent />,
  //   component: CreateActivity,
  //   hidden: true,
  //   isback: true,
  //   identity: 'tasks',
  // },
];
