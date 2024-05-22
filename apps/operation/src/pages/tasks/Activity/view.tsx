import React, { useEffect, useState, Suspense } from 'react';
import { Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  getDocTypes,
  getFields,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Filter from '../../../../../../libs/common/ui/Filter';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import AllocationData from './allocationData';
import { ReactComponent as EditIcon } from '../../../../../../libs/common/assets/icons/Edit_icon.svg';


const ViewState = (props: any) => {
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate()

const columns = [
  {
    dataIndex: 'activity',
    key: 'activity',
    title: 'Activity Type',
    render: (_:any, record:any) => record?. activity?.value || "-"
  },
  {
    dataIndex: 'activity_id',
    key: 'activity_id',
    title: 'Activity Id',
    render: (_:any, record:any) => record?.name || "-"
  },
  {
    dataIndex: 'sub_task_no',
    key: 'sub_task_no',
    title: 'Sub Task No',
  },
  {
    dataIndex: 'loading_point',
    key: 'loading_point',
    title: 'Loading Point',
    render:(_:any, record:any) => record?.loading_point?.value
  },
  {
    dataIndex: 'unloading_point',
    key: 'unloading_point',
    title: 'Unloading Point',
    render:(_:any, record:any) => record?.unloading_point?.value
  },
  {
    dataIndex: 'status',
    key: 'status',
    title: 'status',
  },
  {
    dataIndex: 'action',
    key: 'action',
    title: 'Action',
    render:(_:any,record:any) => {
      return record?.active===1 ?  <Tooltip placement="top" title="Edit">
        <EditIcon style={{ textAlign: 'end', cursor:'pointer' }} onClick={()=>navigate(`/edit-task-activities?id=${record?.name}`)} />
      </Tooltip>:         <EditIcon style={{ textAlign: 'end', cursor: 'not-allowed' }} />

    }
  },
]

  useEffect(() => {
    setloading(true);
    getTableData(
      'activity_details',
      'task_management',
      'htsoperation'
    ).then((items) => {
      const datas = [...items];
      datas.forEach((item:any)=>{
        item.status = item.active === 1 ? "Active" : "Closed"
      })
      setdata(datas);
      setloading(false);
    });
  }, []);

  
  const expandedRowRender = (e: any) => {
    const allocationTable =e?.allocation_data;
    return ( e?.allocation_data?.length >0 ? <AllocationData data={allocationTable}/> : <p>No Activities Found</p>);
  };
  return (
    <div>
      {/* <Filter /> */}
      <Spin loading={loading} />
      <Table column={columns} 
       dataSource={data} 
       editUrl="/edit-task-activities" 
       expandable={{expandedRowRender}}
      
      
      />
    </div>
  );
};

export default ViewState;
