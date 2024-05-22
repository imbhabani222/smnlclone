
import moment from "moment";

// export const taskColumnData = [
//   {
//     title: 'Date',
//     dataIndex: 'date',
//     key: 'date',
//   },
//   {
//     title: 'no of activities',
//     dataIndex: 'activities',
//     key: 'ledger_code',
//   },
//   {
//     title: 'vehicles used',
//     dataIndex: 'vehicles',
//     key: 'vehicles',
//   },
//   {
//     title: 'progress',
//     dataIndex: 'progress',
//     key: 'progress',
//   },
// ];
// export const nestedcolumns = [
//   {
//     title: 'subtask no',
//     dataIndex: 'progress',
//     key: 'progress',
//   },
//   {
//     title: 'Activity',
//     dataIndex: 'Activity',
//     key: 'Activity',
//   },
//   {
//     title: 'Vehicle used',
//     dataIndex: 'Vehicle',
//     key: 'Vehicle',
//   },
//   {
//     title: 'No of vehicles',
//     dataIndex: 'No',
//     key: 'No',
//   },
//   {
//     title: 'trips/hours',
//     dataIndex: 'trips',
//     key: 'trips',
//   },
// ];
// export const subTaskNestedColumnData: any = [
//   {
//     title: 'Activity',
//     dataIndex: 'Activity',
//     key: 'Activity',
//   },
//   {
//     title: 'Vehicle used',
//     dataIndex: 'Vehicle',
//     key: 'Vehicle',
//   },
//   {
//     title: 'No of vehicles',
//     dataIndex: 'No',
//     key: 'No',
//   },
//   {
//     title: 'trips/hours',
//     dataIndex: 'trips',
//     key: 'trips',
//   },
// ];
// export const progressFormData: any = [
//   {
//     datatype: 'Select',
//     label: 'Task No',
//     name: 'task',
//     options: [
//       { label: 'OP/TM/T/006', value: 'OP/TM/T/006' },
//       { label: 'OP/TM/T/007', value: 'OP/TM/T/007' },
//     ],
//     isReq: true,
//   },
//   {
//     datatype: 'Data',
//     label: 'Commodity',
//     name: 'commodity',
//     isReq: false,
//     readonly: true,
//   },
//   {
//     datatype: 'Data',
//     label: 'Quantity',
//     name: 'quantityin_mt',
//     isReq: false,
//     readonly: true,
//   },
// ];
// export const subTaskProgressFormData: any = [
//   {
//     datatype: 'Select',
//     label: 'Task No',
//     name: 'task',
//     options: [
//       { label: 'OP/TM/T/006', value: 'OP/TM/T/006' },
//       { label: 'OP/TM/T/007', value: 'OP/TM/T/007' },
//     ],
//     isReq: true,
//   },
//   {
//     datatype: 'Select',
//     label: 'Task No',
//     name: 'subtask',
//     options: [],
//     isReq: true,
//   },
//   {
//     datatype: 'Data',
//     label: 'Commodity',
//     name: 'commodity',
//     isReq: false,
//     readonly: true,
//   },
//   {
//     datatype: 'Data',
//     label: 'Quantity',
//     name: 'quantityin_mt',
//     isReq: false,
//     readonly: true,
//   },
// ];
export const formDataInitial = [
  {
    "label": "Task No",
    "name": "task_no",
    "datatype": "Link",
    "isReq": true,
    "description": {
        "linkfield": "name",
        "modulename": "task_management",
        "appname": "htsoperation"
    },
    "options": "Task",
    "hidden": 0,
    "readonly": false
}
];

export const formDataFinal = [
  {
    label: 'Task No',
    datatype: 'Data',
    name: 'taskNo',
    placeholder: 'Task No',
  },
  {
    label: 'Commodity',
    datatype: 'Data',
    placeholder: 'Commodity',
    name: 'commodity',
  },
  {
    label: 'Quantity',
    datatype: 'Data',
    placeholder: 'Quantity',
    name: 'quantity',
  },
];

export const taskProgressColumns = [
  {
    title: 'Total Metric Ton',
    dataIndex: 'total_qty',
    key: 'total_qty',
  },
  {
    title: 'Sub Task id',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Date',
    dataIndex: 'day',
    key: 'day',
    render:(_:any, record:any) => record?.day ? moment(record?.day).format("DD/MM/YYYY"): "-"
  },
  // {
  //   title: 'Shift',
  //   dataIndex: 'shift',
  //   key: 'shift',
  // },

  {
    title: 'Quantity Lifted',
    dataIndex: 'quantity_lifted',
    key: 'quantity_lifted',
  },
  {
    title: 'Quantity Left',
    dataIndex: 'quantity_left',
    key: 'quantity_left',
  },
];

export const tempDataSource = [
  {
    total_metric_ton: 1000,
    day: '2023-10-05',
    shift: 'I',
    dumper: 5,
    excavator: 6,
    loader: 3,
    quantity_lifted: 200,
    quantity_left: 800,
  },
  {
    total_metric_ton: 800,
    day: '2023-10-05',
    shift: 'II',
    dumper: 5,
    excavator: 6,
    loader: 3,
    quantity_lifted: 200,
    quantity_left: 600,
  },
  {
    total_metric_ton: 600,
    day: '2023-10-06',
    shift: 'I',
    dumper: 8,
    excavator: 6,
    loader: 3,
    quantity_lifted: 400,
    quantity_left: 200,
  },
  {
    total_metric_ton: 200,
    day: '2023-10-06',
    shift: 'I',
    dumper: 2,
    excavator: 6,
    loader: 3,
    quantity_lifted: 200,
    quantity_left: 0,
  },
];