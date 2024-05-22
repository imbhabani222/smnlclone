import InputField from '../../../../../../libs/common/ui/InputField/inputField';


    export const columns : any = (onHandleChange: any) => [
      
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
            title: "No Of Days",
            dataIndex: "no_of_days",
            key: "no_of_days",
            render:(_: any, record:any, index: number) => <InputField fieldData = {{ description: {type:"onlyNumber"}}} style={{ width: 90, height: 36 }} value={record.no_of_days} onChange={(e:any) => onHandleChange(e, record, index)} />

        }
    
    ]