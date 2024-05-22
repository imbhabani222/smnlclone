import React from "react";
import Table from "../../../../../../libs/common/ui/Table/SmnlTable";


type Props = {
    data:any
}

const columns = [
    {
        dataIndex: 'name',
        key: 'name',
        title: 'Driver Name',
        render: (_:any, record:any) => record?.driver_name?.value
      },
      {
        dataIndex: 'value',
        key: 'value',
        title: 'Driver Id',
        render: (_:any, record:any) => record?.driver_name?.name
      },
      {
        dataIndex: 'vehicle',
        key: 'vehicle',
        title: 'vehicle',
      },
      {
        dataIndex: 'vehicle_type',
        key: 'vehicle_type',
        title: 'Vehicle Type',
      }
]
const AllocationData = (props: Props) => {
 const { data } = props


    return (
        <Table column={columns} dataSource={data} />
    );

}

export default AllocationData;