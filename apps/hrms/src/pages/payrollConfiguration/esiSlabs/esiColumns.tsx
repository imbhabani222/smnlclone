import { Select } from "antd";


const monthNames = [
    {
        label: "January",
        value: "January"
    },
    {
        label: "February",
        value: "February"
    },
    {
        label: "March",
        value: "March"
    },
    {
        label: "April",
        value: "April"
    },
    {
        label: "May",
        value: "May"
    },
    {
        label: "June",
        value:  "June"
    },
    {
        label: "July",
        value: "July"
    },
    {
        label: "August",
        value: "August"
    },
    {
        label: "September",
        value: "September"
    },
    {
        label: "October",
        value: "October"
    },
    {
        label: "November",
        value: "November"
    },
    {
        label: "December",
        value: "December"
    }
]

export const Column = (handleCellEdit:any) => [
    {
        title: 'From Month',
        dataIndex: 'from_value',
        key: 'fromvalue',
        align: 'center',
        render: (_: any, record: any, index:number) => (
          <>
            <Select
              style={{ width: '250px' }}
              placeholder="Select Month"
              options = {monthNames}
              value={record?.from_month}
              onChange={(e: any) => {
                handleCellEdit(index, 'from_month', e);
              }}
            />
          </>
        ),
      },
      {
        title: 'To Month',
        dataIndex: 'from_value',
        key: 'fromvalue',
        align: 'center',
        render: (_: any, record: any, index: number) => (
          <>
            <Select
              style={{ width: '250px' }}
              placeholder="Select Month"
              options = {monthNames}
              value={record?.to_month}
              onChange={(e: any) => {
                handleCellEdit(index, 'to_month', e);
              }}
            />
          </>
        ),
      },
      { title: 'Action', dataIndex: 'action', key: 'action', align: 'center' },

        
    ]
