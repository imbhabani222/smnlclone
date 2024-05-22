import React, { Suspense, useEffect, useState } from 'react';
import moment from 'moment';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { validJson } from '../../../../../../libs/common/utils/common';
import Activity from "./viewActivity";
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EditIcon } from '../../../../../../libs/common/assets/icons/Edit_icon.svg';
import { Tooltip } from 'antd';
type Props = {};

const View = (props: Props) => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
  
      const newD = [
        {
          dataIndex: 'sub_task_starting_time',
          key: 'sub_task_starting_time',
          title: 'Date',
          render: (_:any, record:any) => record?. sub_task_starting_time ? moment(record?.sub_task_starting_time).format("DD/MM/YYYY") : "-"
        },
        {
          dataIndex: 'name',
          key: 'name',
          title: 'Sub Task No',
        },
        {
          dataIndex: 'task_no',
          key: 'task_no',
          title: 'Task No',
        },
        {
          dataIndex: 'loading_point',
          key: 'loading_point',
          title: 'Loading Point',
          render: (_:any, record:any) => record?.unloding_point?.value
        },
        {
          dataIndex: 'unloding_point',
          key: 'unloding_point',
          title: 'Unloding Point',
          render: (_:any, record:any) => record?.unloding_point?.value
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
            <EditIcon style={{ textAlign: 'end', cursor:'pointer' }} onClick={()=>navigate(`/edit-subtasks?id=${record?.name}`)} />
          </Tooltip>:  <EditIcon style={{ textAlign: 'end', cursor:'not-allowed' }} />
        }
        },
      ];

      const d = [...newD];
      setcolumns(d);
    getTableData('sub_task', 'task_management', 'htsoperation').then((items) => {
      const newItems = items?.map((e: any) => ({
        ...e,
        key: items.name?.toString(),
        status : e.active === 1 ? "Active" : "Closed"

      }));
      setdata(newItems);
      setloading(false);
    });
   
  }, []);

  

  const expandedRowRender = (e: any) => {
    const subtask_id=e?.name;
    return (
      <Suspense fallback={<p>Loading</p>}>
        <Activity subTaskId={subtask_id}/>
      </Suspense>
      
    );
  };

  console.log(data, 'data');

  return (
    <>
      <Spin loading={loading} />
      <Table
        column={columns}
        dataSource={data?.map((item: any, idx: any) => ({
          ...item,
          key: idx?.toString(),
        }))}
        editUrl="/edit-subtasks"
        expandable={{ expandedRowRender }}
      />
    </>
  );
};

export default View;