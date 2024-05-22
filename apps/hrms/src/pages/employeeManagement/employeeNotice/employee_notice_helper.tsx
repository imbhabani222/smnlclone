
export const columns : any = (onTableChange: any) => [
      
    {
        title: "Employee Code",
        dataIndex: "employee_code",
        key: "employee_code",
    },
    {
        title: "Employee Name",
        dataIndex: "employee_name",
        key: "employee_name",
    },
    {
        title: "Department",
        dataIndex: "department",
        key: "department",
    },
    {
        title: "Designation",
        dataIndex: "designation",
        key: "designation",
    },
    {
        title: "Absent Date",
        dataIndex: "absent_date",
        key: "absent_date",
    },
    {
        title: "First Letter Date",
        dataIndex: "first_letter_date",
        key: "first_letter_date",
        render: (_:any, record:any) => record?.first_letter_date ?<a  style={{cursor:"pointer"}} onClick={() => onTableChange(record, 'first_letter')}>{record?.first_letter_date}</a> : <a  style={{cursor:"pointer"}} onClick={() => onTableChange(record, 'first_letter')}>Download</a>
    },
    {
        title: "Second Letter Date",
        dataIndex: "second_letter_date",
        key: "second_letter_date",
        render: (_:any, record:any) => (record?.first_letter_date && !record?.second_letter_date)? <a style={{cursor:"pointer"}} onClick={() => onTableChange(record, 'second_letter')}>Download</a>: <a  style={{cursor:"pointer"}} onClick={() => onTableChange(record, 'first_letter')}>{record?.second_letter_date || "-"}</a> 

    },
    {
        title: "Third Letter Date",
        dataIndex: "third_letter_date",
        key: "third_letter_date",
        render: (_:any, record:any) => (record?.second_letter_date && !record?.thrid_letter_date)? <a style={{cursor:"pointer"}} onClick={() => onTableChange(record, 'third_letter')}>Download</a> : <a  style={{cursor:"pointer"}} onClick={() => onTableChange(record, 'first_letter')}>{record?.third_letter_date || "-"}</a>

    },
    {
        title: "Action",
        dataIndex: 'action',
        key: 'action',
        
    }

]


