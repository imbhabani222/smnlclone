import React, { Suspense, useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { validJson } from '../../../../../../libs/common/utils/common';

type Props = {
    taskId?:any;
};

const View = (props: Props) => {
  const {taskId}= props
  const [subTaskLoading, setSubTaskLoading] = useState(true);
  const [subTaskColumns, setSubTaskColumns] = useState<any>([]);
//   const [subTaskId,setSubTaskId] = useState<any>([]);
  const [subTaskData, setSubTaskData] = useState<any>([]);
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
    
  ]

  useEffect(() => {
      //   getDocTypes('Sub Task', false, 'htssuite').then((items) => {
      //   const newData: any = items.filter((item: any) => {
      //   const reqfields = [
      //     'name',
      //     'task_no',
      //     'loading_point',
      //     'unloding_point',
      //     'status',
      //   ];
      //   if (reqfields.includes(item.dataIndex)) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // });
            
            const newD = [
            {
                dataIndex: 'name',
                key: 'name',
                title: 'Subtask No',
            },
            {
              dataIndex: 'loading_point',
              key: 'loading_point',
              title: 'Loading Point',
              render: (_:any, record:any) => record?.loading_point?.value
            },
            {
              dataIndex: 'unloding_point',
              key: 'unloding_point',
              title: 'Unloading Point',
              render: (_:any, record:any) => record?.unloding_point?.value

            }
            ];
            // newD.push(newData);
    
            const d = [...newD];
            setSubTaskColumns(d);
  
          
        const filters = `{ "task_no": "${taskId}" }`;
        try{
        getTableData(
            'activity_details',
            'task_management',
            'htsoperation',
            filters
        ).then((items: any) => {
            const newItems = items?.map((item: any,idx:any) => ({
            ...item,
            key: item?.name,
            status :item.active === 1 ? "Active" : "Closed"
            }));
            setSubTaskData(newItems ?? [])
            setSubTaskLoading(false);
        });
        
        
        }catch(error){
        console.error('Error fetching subtask data:', error);
        setSubTaskLoading(false);
    }
    
    
  }, []);

  console.log(subTaskData, 'subTaskData')

  return (
    <>
      {/* <Spin loading={subTaskLoading} /> */}
      {subTaskLoading ? <p>Loading...</p>: subTaskData?.length>0 ? <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table
            column={columns}
            dataSource={subTaskData}
        />
      </div> : <p>No Data</p>}
      
      
    </>
  );
};

export default View;