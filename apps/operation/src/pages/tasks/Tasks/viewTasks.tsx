import React, { Suspense, useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,getTasksBasedOnProgress
} from '../../../../../../libs/common/api/doctype';
import TwoFormWrapper from '../../../../../../libs/common/ui/TwoForm_Table/TwoFormWrapper';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { Tooltip } from 'antd';
import { ReactComponent as EditIcon } from '../../../../../../libs/common/assets/icons/Edit_icon.svg';
import { validJson } from '../../../../../../libs/common/utils/common';
import SubTask from "./viewSubTasks"
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
type Props = {};


const formDataFilterTemp=[{
  "label": "Select Status",
  "name": "task_status",
  "datatype": "Select",
  "isReq": false,
  "options": [
    {label:"In Progress",value: "inprogress",},
    {label:"Completed",value: "completed",},
    // {label:"All Tasks",value: "alltasks",}
  ],}
]

  const formValueFilterTemp={
    // "task_status":"alltasks"
  }

const View = (props: Props) => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);
  const [formValueFilter,setFormValueFilter]=useState<any>({...formValueFilterTemp});
  // const [subTaskLoading, setSubTaskLoading] = useState(true);
  // const [subTaskColumns, setSubTaskColumns] = useState<any>([]);
  // const [subTaskId,setSubTaskId] = useState<any>([]);
  // const [subTaskData, setSubTaskData] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // getDocTypes('Task', false, 'htssuite').then((items) => {
    //   const newData: any = items.filter((item: any) => {
    //     const reqfields = [
    //       'task_type',
    //       'reference_no',
    //       'vessel_name',
    //       'vessel_party',
    //       'commodity',
    //        'turn_around_time',
    //       'status',
    //       'action',
    //     ];
    //     if (reqfields.includes(item.dataIndex)) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   });
      const newD = [
        {
          dataIndex: 'name',
          key: 'name',
          title: 'Task No',
        },
        {
          dataIndex: 'start_date',
          key: 'start_date',
          title: 'Start Date',
          render: (_:any, record:any) => record?. start_date ? moment(record?.start_date).format("DD/MM/YYYY") : "-"
        },
        {
          dataIndex: 'task_type',
          key: 'task_type',
          title: 'Task type',
          render: (_:any, record:any) => record?.task_type?.movement_type

        },
        {
          dataIndex: 'reference_no',
          key: 'reference_no',
          title: 'Reference No',
        },
        {
          dataIndex: 'vessel_name',
          key: 'vessel_name',
          title: 'Vessel Name',
        },
        {
          dataIndex: 'commodity',
          key: 'commodity',
          title: 'Commodity',
          render: (_:any, record:any) => record?.commodity?.sub_commodity
        },
        {
          dataIndex: 'turn_around_time',
          key: 'turn_around_time',
          title: 'Turn Around Time',
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
            return record?.active === 1 ?  <Tooltip placement="top" title="Edit">
              <EditIcon style={{ textAlign: 'end',  cursor:'pointer' }} onClick={()=>navigate(`/edit-tasks?id=${record?.name}`)} />
            </Tooltip>:  <EditIcon style={{ textAlign: 'end',  cursor:'not-allowed' }} />

          }
          },
      ];
      // newD.push(newData);

      const d = [...newD];
      setcolumns(d);
    // });
    localStorage.removeItem('taskId')
    getTableData('task', 'task_management', 'htsoperation').then((items) => {
      const newItems = items?.map((e: any) => ({
        ...e,
        key: items.name?.toString(),
        status: e.active === 1 ? "In Progress" : "Completed"

      }));
      setdata(newItems);

      setloading(false);
    });
   
  }, []);

  const filterValueHandler=(val:any,label:any)=>{
    setFormValueFilter({[label]:val})
  }

  useEffect(()=>{
    let status;
    if(formValueFilter?.task_status ==="completed"){
      status = 0;
    }else{
      status = 1;
    }
    if(formValueFilter?.task_status){
      getTasksBasedOnProgress(status).then((items)=>{
        console.log(items,"dfd")
        const newItems = items?.map((e: any) => ({
          ...e,
          key: items.name?.toString(),
          status: e.active === 1 ? "In Progress" : "Completed"
        }));
        items ? setdata(newItems) : setdata([])
      })
    }else{
      getTableData('task', 'task_management', 'htsoperation').then((items) => {
        const newItems = items?.map((e: any) => ({
          ...e,
          key: items.name?.toString(),
          status: e.active === 1 ? "In Progress" : "Completed"
        }));
        setdata(newItems);
  
        setloading(false);
      });
    }
    
  },[formValueFilter?.task_status])

  

  const expandedRowRender = (e: any) => {
    const task_id=e?.name;
    return (
      <Suspense fallback={<p>Loading</p>}>
        <SubTask taskId={task_id}/>
      </Suspense>
      
    );
  };

  return (
    <>
      <Spin loading={loading} />
      <TwoFormWrapper formData={formDataFilterTemp} formValue={formValueFilter} onChange={filterValueHandler}/>
      {data?.length>0 ? <Table
        column={columns}
        dataSource={data?.map((item: any, idx: any) => ({
          ...item,
          key: idx?.toString(),
        }))}
        editUrl="/edit-tasks"
        expandable={{ expandedRowRender }}
      /> : <p>No Tasks Found</p>}
    </>
  );
};

export default View;