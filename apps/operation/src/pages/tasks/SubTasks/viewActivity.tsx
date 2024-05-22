import React, { Suspense, useEffect, useState } from 'react';
import {
  getDocTypes,
  onCloseActivity,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { validJson } from '../../../../../../libs/common/utils/common';

type Props = {
    subTaskId?:any;
};


const columns = [
  {
    dataIndex: 'activity',
    key: 'activity',
    title: 'Activity Type',
    render: (_:any, record:any) => record?. activity?.value || "-"
  },
  {
    dataIndex: 'vehicle_type',
    key: 'vehicle_type',
    title: 'Vehicle Type',
    render:(_:any, record:any) => record?.vehicle_type ? <span>{record?.vehicle_type.toString().replaceAll(",", ",  ")}</span> : <span>-</span>
  },
  {
    dataIndex: 'vehicles_count',
    key: 'vehicles_count',
    title: 'No of Vehicles',
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
  }
]

const View = (props: Props) => {
  const {subTaskId}= props
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityColumns, setActivityColumns] = useState<any>([]);
//   const [ActivityId,setActivityId] = useState<any>([]);
  const [activityData, setActivityData] = useState<any>([]);



  useEffect(() => {
        // getDocTypes('Activity Details', false, 'htssuite').then((items) => {
        //     console.log(items,"items")
            
        //     const newD = [
        //     {
        //         dataIndex: 'name',
        //         key: 'name',
        //         title: 'Activity No',
        //     },
        //     ];
            
      
        //     // newD.push(newData);
    
        //     const d = [...newD, ...items];
        //     setActivityColumns(d);
        // });
  
          
        const filters = `{ "sub_task_no": "${subTaskId}" }`;
        try{
          const endPoint = `task_management.doctype.activity_details.api.get_records?filters=${filters}`
          onCloseActivity(
           endPoint
        ).then((items: any) => {
            const newItems = items?.data?.map((item: any,idx:any) => ({
            ...item,
            vehicle_type: items?.vehicle_type?.length !== 0 ? items?.vehicle_type : null,
            vehicles_count: items?.vehicles_count,
            key: item?.name,
            }));
            setActivityData(newItems ?? [])
            setActivityLoading(false);
        });
        
        
        }catch(error){
        console.error('Error fetching Activity data:', error);
        setActivityLoading(false);
    }
    
    
  }, []);


  return (
    <>
      {/* <Spin loading={activityLoading} /> */}
      {activityLoading ? <p>Loading</p>: activityData?.length>0 ? <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table
            column={columns}
            dataSource={activityData}
        />
      </div> : <p>No Activities</p>}
    </>
  );
};

export default View;