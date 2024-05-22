import moment from 'moment';
import { Button, Divider, Popover, Row, Col, Select } from 'antd';
import FormFields from '../../../../../../libs/common/ui/Form/FormFields';

export const columns: any = [
  {
    title: 'Employee',
    key: 'employee_name',
    dataIndex: 'employee_name',
    render: (_: any, record: any) => record?.employee_name,
  },
  {
    title: 'Leave Type',
    key: 'leave_type',
    dataIndex: 'leave_type',
    render: (_: any, record: any) => record?.leave_type,
  },
  {
    title: 'From Date',
    key: 'from_date',
    dataIndex: 'from_date',
    render: (_: any, record: any) =>
      moment(record?.from_date).format('DD/MM/YYYY'),
  },
  {
    title: 'To Date',
    key: 'to_date',
    dataIndex: 'to_date',
    render: (_: any, record: any) =>
      moment(record?.to_date).format('DD/MM/YYYY'),
  },
  {
    title: 'No of Days',
    key: 'no_of_days',
    dataIndex: 'no_of_days',
  },
  {
    title: 'Reason',
    key: 'reason',
    dataIndex: 'reason',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
  },
];

export const leaveRequestColumns = [
  {
    title: 'Employee',
    key: 'employee_name',
    dataIndex: 'employee_name',
    render: (_: any, record: any) => record?.employee_name,
  },
  {
    title: 'Leave Type',
    key: 'leave_type',
    dataIndex: 'leave_type',
    render: (_: any, record: any) => record?.leave_type,
  },
  {
    title: 'From Date',
    key: 'from_date',
    dataIndex: 'from_date',
    render: (_: any, record: any) =>
      moment(record?.from_date).format('DD/MM/YYYY'),
  },
  {
    title: 'To Date',
    key: 'to_date',
    dataIndex: 'to_date',
    render: (_: any, record: any) =>
      moment(record?.to_date).format('DD/MM/YYYY'),
  },
  {
    title: 'No of Days',
    key: 'no_of_days',
    dataIndex: 'no_of_days',
  },
  {
    title: 'Reason',
    key: 'reason',
    dataIndex: 'reason',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
   {
    title: "Action",
    key: "action",
    dataIndex: "action"
   }
];
export const leaveEncashmentColumns = [
  {
    title: 'Employee Code',
    key: 'employee_code',
    dataIndex: 'employee_code',
    render: (_: any, record: any) => record?.employee_code,
  },
  {
    title: 'Employee',
    key: 'employee_name',
    dataIndex: 'employee_name',
    render: (_: any, record: any) => record?.employee_name,
  },
  {
    title: 'Request Date',
    key: 'requested_date',
    dataIndex: 'requested_date',
    render: (_: any, record: any) =>
      moment(record?.from_date).format('DD/MM/YYYY'),
  },

  {
    title: 'No of Days',
    key: 'no_of_days',
    dataIndex: 'no_of_days',
  },
  {
    title: 'Amount',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'Requested To',
    key: 'requested_to',
    dataIndex: 'requested_to',
    render: (_: any, record: any) => record?.requested_to?.value,
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
  },
];
export const leaveEncashmentApproveColumns = [
  {
    title: 'Employee Code',
    key: 'employee_code',
    dataIndex: 'employee_code',
    render: (_: any, record: any) => record?.employee_code,
  },
  {
    title: 'Employee',
    key: 'employee_name',
    dataIndex: 'employee_name',
    render: (_: any, record: any) => record?.employee_name,
  },
  {
    title: 'Request Date',
    key: 'requested_date',
    dataIndex: 'requested_date',
    render: (_: any, record: any) =>
      moment(record?.from_date).format('DD/MM/YYYY'),
  },

  {
    title: 'No of Days',
    key: 'no_of_days',
    dataIndex: 'no_of_days',
  },
  {
    title: 'Amount',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'Requested To',
    key: 'requested_to',
    dataIndex: 'requested_to',
    render: (_: any, record: any) => record?.requested_to?.value,
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
  },
];
export const fields = [
  {
    datatype: 'Link',
    label: 'Employee',
    name: 'name',
    options: 'personal_details',
    colSpan: 1,
    description: { linkfield: 'full_name', modulename: 'employee_management' },
  },
  {
    label: 'Status',
    name: 'status',
    datatype: 'Select',
    isReq: false,
    colSpan: 1,
    options: [
      {
        label: 'Pending',
        value: 'Pending',
      },
      {
        label: 'Approved',
        value: 'Approved',
      },
      {
        label: 'Rejected',
        value: 'Rejected',
      },
      {
        label: 'Cancelled',
        value: 'Cancelled',
      },
    ],
  },
];

export const leaveRequestFilter = [
  {
    label: 'Employee',
    name: 'emp_code',
    datatype: 'TableSelect',
    isReq: false,
    description: {
      linkfield: 'full_name',
      modulename: 'employee_management',
      showActive: 'true',
      colSpan: '7',
      appname: 'htssuite',
      search: 'api.search_employees?search=',
    },
    options: 'Personal Details',
    hidden: 0,
    readonly: false,
    columns: [
      {
        title: 'Employee Code',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Employee Name',
        dataIndex: 'full_name',
        key: 'full_name',
      },
    ],
    searchIndexes: [],
    callOnChange:true

  },
  {
    label: 'Status',
    name: 'status',
    datatype: 'Select',
    isReq: false,
    colSpan: 1,
    options: [
      {
        label: 'Pending',
        value: 'Pending',
      },
      {
        label: 'Approved',
        value: 'Approved',
      },
      {
        label: 'Rejected',
        value: 'Rejected',
      },
     
    ],
  },
];


export const Filter = ({
  handlestatusChange,
  employeeNameList,
  handleCategoryChange,
  defaultStatus
}: any) => {
  const filterOption: any = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <div>
      <div
        className="filters"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          // padding: '15px 20px',
        }}
      >
        <Row
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          Filter:
          <Col span={3}>
            <Select
              style={{ width: '100%' }}
              placeholder="Select Status"
              onChange={handlestatusChange}
              defaultValue={defaultStatus}
              allowClear
              options={[
                { value: 'Rejected', label: 'Rejected' },
                { value: 'Approved', label: 'Approved' },
                { value: 'Pending', label: 'Pending' },
              ]}
            />
          </Col>
          <Col span={3}>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Select Employee"
              onChange={handleCategoryChange}
              allowClear
              options={employeeNameList}
              optionFilterProp="children"
              filterOption={filterOption}
            />
          </Col>
        </Row>
      </div>
      <Divider style={{ margin: '10px 0 0px 0' }} />
    </div>
  );
};

export const attendance_filter = [
  {
    label: 'Employee',
    name: 'emp_code',
    datatype: 'TableSelect',
    isReq: false,
    description: {
      linkfield: 'full_name',
      modulename: 'employee_management',
      showActive: 'true',
      colSpan: '7',
      appname: 'htssuite',
      search: 'api.search_employees?search=',
    },
    options: 'Personal Details',
    hidden: 0,
    readonly: false,
    columns: [
      {
        title: 'Employee Code',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Employee Name',
        dataIndex: 'full_name',
        key: 'full_name',
      },
    ],
    searchIndexes: [],
    callOnChange:true

  },
  {
    datatype: 'Link',
    label: 'Department',
    name: 'department',
    options: 'department',
    description: {
      linkfield: 'department_name',
      modulename: 'master_data',
      showActive: 'true',
      colSpan: '4',

    },
  },
  {
    datatype: 'Select',
    label: 'Status',
    name: 'status',
    options: [
      {
      label: "Normal",
      value: "Normal"
    },
    {
      label: "Mis Punch",
      value: "Miss Punch"
    }
  ],
    description: {
      linkfield: 'department_name',
      modulename: 'master_data',
      showActive: 'true',
      colSpan: '4',
    },
  },
  {
    label: 'Select Date',
    name: 'attendance_Date',
    datatype: 'DateRange',
    isReq: false,
    description: {
      colSpan: '5',

    },
    options: 'past',
    hidden: 0,
    readonly: false,
  },
];

export const weekoffs_filter=[
  {
    label: 'Employee',
    name: 'employee_name',
    datatype: 'TableSelect',
    isReq: false,
    description: {
      linkfield: 'full_name',
      modulename: 'employee_management',
      showActive: 'true',
      colSpan: '7',
      appname: 'htssuite',
      search: 'employee_management.doctype.personal_details.api.search_personal_details?search=',
    },
    options: 'Personal Details',
    hidden: 0,
    readonly: false,
    columns: [
      {
        title: 'Employee Code',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Employee Name',
        dataIndex: 'full_name',
        key: 'full_name',
      },
    ],
    searchIndexes: [],
    callOnChange:true

  },
  {
    label: 'Select Date',
    name: 'weekoffs_date',
    datatype: 'DateRange',
    isReq: false,
    description: {
      colSpan: '5',

    },
    options: 'past',
    hidden: 0,
    readonly: false,
  },
]

export const weekoffs_excel_field = [
  {
    label: 'Upload Excel',
    name: 'uploadExcel',
    datatype: 'Attach Image',
    isReq: false,
    description: {
      accept:
        '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
      fileType: 'Only .xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },

    hidden: 0,
    readonly: false,
  },
  {
    label: 'Select Month',
    name: 'month',
    datatype: 'Date',
    isReq: true,
    description: {},
    options: 'past',
    hidden: 0,
    readonly: false,
    picker : 'month'
  },
  {
    label: 'Select Year',
    name: 'year',
    datatype: 'Date',
    isReq: true,
    description: {},
    options: 'past',
    hidden: 0,
    readonly: false,
    picker : 'year'
  },
]

export const easyTimeProFields = [
  {
    label: 'Upload Excel',
    name: 'uploadExcel',
    datatype: 'Attach Image',
    isReq: false,
    description: {
      accept:
        '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
      fileType: 'Only .xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },

    hidden: 0,
    readonly: false,
  },
 
];

export const fromDBFields = [
  {
    label: 'Select Date',
    name: 'date',
    datatype: 'DateRange',
    isReq: true,
    description: {},
    options: 'past',
    hidden: 0,
    readonly: false,
  },
];
