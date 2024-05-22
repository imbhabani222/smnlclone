import InputField from '../../../../../../libs/common/ui/InputField/inputField';

    export const columns : any = (onHandleChangeAmount: any) => [
      
        {
            title: "Code",
            dataIndex: "emp_code",
            key: "emp_code",
        },
        {
            title: "Name",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Designation",
            dataIndex: "designation",
            key: "designation",
        },
        {
            title: "Location",
            dataIndex: "work_location",
            key: "work_location",
        },
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
        },
        {
            title: "Allowance amount",
            dataIndex: "amount",
            key: "amount",
            render:(_: any, record:any, index: number) => <InputField fieldData = {{ description: {type:"float"}}} style={{ width: 90, height: 36 }} value={record.amount} onChange={(e:any) => onHandleChangeAmount(e, record, index)} />
        }
    
    ]