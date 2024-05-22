import React, { useEffect, useState, useContext } from 'react';
import { Button, Col, Form, Row, Divider } from 'antd';
import { getTableDataWithPagination,getTableData, updateRecord, updateLeaveStatus, getDocTypes } from '../../../../../../libs/common/api/doctype';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import { fields, leaveRequestFilter, columns} from '../helper/helper';
import Spin from "../../../../../../libs/common/ui/Loader/spinLoader";
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { FilterContext } from "../../../../../../libs/common/context/filtercontext"
import Drawer from "../../../../../../libs/common/ui/Drawer/drawer"
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import styles from '../leave.module.scss';
import LeaveRequestFilter from '../../payrollProcessing/helper/payrollForm'


type Props = {};
function Index(props: Props) {
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean> (false)
  const { filter, updateFilter } = useContext<any>(FilterContext);
  const [filterData, setFilerData] = useState<any>({});
  const [paginationData, setPaginationData] = useState<any>({page_length: 10, current_page: 1})
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [approveKeys, setapproveKeys] = useState<any>([]);


  useEffect(() => {
    getTableResponse(filterData,paginationData?.current_page,paginationData?.page_length,null)

  }, []);
  
  const getTableResponse = (e:any,current_page:number,page_length:number,search:any) => {
    setLoading(true)
    getTableDataWithPagination('leave_request', 'leave_management',current_page,page_length, 'htssuite', JSON.stringify(e),search).then(
      (items:any) => {
        const getData = items?.data.map((item:any)=>({
          ...item,
          employee_name : item?.full_name,
          leave_type : item?.leave_type,

        }))
        setTableData(getData);
        setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page })
        setLoading(false)
        setSelectedRowKeys([]);
        setapproveKeys([]);
      }
    );
  }

  useEffect(()=>{
  if(filterData?.status || filterData?.emp_code){
    getTableResponse(filterData,paginationData?.current_page,paginationData?.page_length,null)
  }
  else{
    getTableResponse(filterData,paginationData?.current_page,paginationData?.page_length,null)
  }
  },[filterData])
   
    const handleClose = () => {
      updateFilter(false);
    };
  
    const onHandleFilter = (e: any) => {
      updateFilter(false);
      setLoading(true);
      getTableResponse(filterData,paginationData?.current_page,paginationData?.page_length,null)
    }
    const getFilterData = (value: any, key: any) => {
      setFilerData((prevFormValue:any) => {
        let updatedFormValue = {
          ...prevFormValue,
          [key]: 
          key === 'emp_code' || key === "status" ? value : undefined
        }
        return updatedFormValue
      })
    };


    const onHandleChangePagination = (current_page:number, page_length:number)=>{
      getTableResponse(filterData,current_page,page_length,null)
      setPaginationData({...paginationData,current_page,page_length})

    }

    const rowSelection = {
      selectedRowKeys,
      onChange: (newSelectedKeys: React.Key[], e: any) => {
        setSelectedRowKeys(newSelectedKeys);
        setapproveKeys(e);
      },
      getCheckboxProps: (record:any) => ({
        disabled: record.status !== "Pending",
      })
      ,
    };

    const onHandleReject = () => {
      const payload = {
        data: {
          status: 'Rejected',
          leave_data: approveKeys?.map((item: any) => item.name),
        }
      };
      updateLeaveStatus('leave_request.api.update_leaves_status', payload, 'leave_management', 'htssuite').then((item:any)=>{
        if(item.status === 200){
          isSuccess(item?.message, 'success');
          setLoading(false)
          getTableResponse(filterData,paginationData?.current_page,paginationData?.page_length,null)
        }
        else {
          isSuccess(item?.message, 'error');
          setLoading(false)

        }
      })
    };



    const handleApprove = () => {
      setLoading(true)
      const payload = {
        data: {
          status: 'Approved',
          leave_data: approveKeys?.map((item: any) => item.name),
        }
      }
      updateLeaveStatus('leave_request.api.update_leaves_status', payload, 'leave_management', 'htssuite').then((item:any)=>{
        if(item.status === 200){
          isSuccess(item?.message, 'success');
          setLoading(false)
          getTableResponse(filterData,paginationData?.current_page,paginationData?.page_length,null)
        }
        else {
          isSuccess(item?.message, 'error');
          setLoading(false)

        }
      })
    };

   
  return (
    <div>
      <Drawer
       handleClose= {handleClose}
       open={filter}
       appname="htssuite"
       fields = {fields}
       handleFilter={onHandleFilter}
       />

      <Spin loading= {loading} />
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
        Leave Approvals & Rejections
        </Col>
        {/* <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <div className={styles.button_wrap}>
            <Button className={styles.primary_btn} onClick={onFilterClick}>
              Filter
            </Button>
          </div> */}
        {/* </Col> */}
      </Row>
      <Panel>
      <div className={styles.panel_container}>
      <LeaveRequestFilter
            payrollFormData={leaveRequestFilter}
            handleChange={getFilterData}

          />
        <div style={{marginTop:"20px"}}>
      <SmnlTable dataSource={tableData} 
         column={columns}
         viewUrl="/create-leave-request"
         mode="view"
         onChangePagination={onHandleChangePagination}
         totalNumberofRecords={paginationData?.total_records}
         currentPage={paginationData?.current_page}
         rowSelection={rowSelection}
      />
      </div>
      </div>
      </Panel>
    </div>
  );
}

export default Index;
