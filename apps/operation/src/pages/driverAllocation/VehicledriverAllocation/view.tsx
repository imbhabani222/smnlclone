import React, { useEffect, useState } from 'react';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import { columns } from "../helper/helper"
import { onCloseActivity } from '../../../../../../libs/common/api/doctype';
import Spin from "../../../../../../libs/common/ui/Loader/spinLoader"

type Props = {
props:any
}
const View = (props: Props) => {

    const [tableData, setTableData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(()=>{
        const query:any = props?.props?.id;
        setLoading(true)
        const endPoint = `task_management.doctype.driver_allocation.api.list_allocations?vehicle_type=${query || "Loader"}`
        onCloseActivity(endPoint).then((items:any)=>{
            const table:any = items?.data;
            table.forEach((item:any)=>{
              if(item.active === 0) {
                item.status = "Closed"
                item.vehicleStatus = "Active"
              }
              else {
                item.vehicleStatus = "Closed"
                item.status = 'Active'
              }
            })
            setTableData([...table])
            setLoading(false)
        })
    },[props])

    return (
      <React.Fragment>
        <Spin loading={loading} />
        <SmnlTable 
        column={columns} dataSource={tableData}
        editUrl={`/edit-${String(props.props.name).toLowerCase()}-driverallocation`}
        />
      </React.Fragment>
    );
}



export default View