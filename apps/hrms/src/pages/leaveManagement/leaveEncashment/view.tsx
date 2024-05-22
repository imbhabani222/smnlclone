import React, { useState, useEffect, useContext } from 'react';
import { Button, Col, Form, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Drawer from '../../../../../../libs/common/ui/Drawer/drawer';
import {
  getTableData,
  getTableDataWithPagination,
  getDocTypes,
} from '../../../../../../libs/common/api/doctype';
import { leaveEncashmentColumns, leaveRequestFilter, Filter } from '../helper/helper';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import styles from "../leave.module.scss"
import Cookies from 'universal-cookie';
import LeaveRequestFilter from '../../payrollProcessing/helper/payrollForm'


type Props = {};

const LeaveEnchasmentListing = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [employeeNames, setEmployeeName] = useState<any>([]);
  const [filterData, setFilerData] = useState<any>({});
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize|| 10, current_page: 1})
  const navigate = useNavigate();

  const getTableResponse = (e: any,current_page:number,page_length:number,search:any) => {
    setloading(true);
    getTableDataWithPagination(
      'leave_encashment_request',
      'leave_management',
      current_page,
      page_length,
      'htssuite',
      JSON.stringify(e),
      search
    ).then((items: any) => {
      const getData = items?.data.map((item:any)=>({
        ...item,
        employee_code: item?.employee_name,
        employee_name: item?.full_name,
        requested_to : item?.requested_to?.value
      }))
      setTableData(getData);
      setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page })
      setloading(false);
    });
  };

  useEffect(() => {
    getTableResponse(filterData,paginationData?.current_page,paginationData?.page_length,null);
    getEmployeeName(null);
  }, []);

  useEffect(() => {
    if (filterData?.status || filterData.emp_code) {
      getTableResponse(filterData,paginationData?.current_page,paginationData?.page_length,null);
    } else {
      getTableResponse(filterData,paginationData?.current_page,paginationData?.page_length,null);
    }
  }, [filterData]);

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
  const getEmployeeName = (e: any) => {
    getTableData('personal_details', 'employee_management', 'htssuite', e).then(
      (item) => {
        setEmployeeName(
          item.map((data: any) => ({ label: data.full_name, value: data.name }))
        );
      }
    );
  };
  const getHandleChangeCategory = (e: any) => {
    const filterObject = { ...filterData };
    const filter = e
      ? { ...filterObject, emp_code: e }
      : { status: filterObject.status };
    setFilerData(filter);
  };

  const onAddLeaveEncashment = () => {
    navigate('/create-leave-encashment')
  }

  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse(filterData, current_page, page_length, null);
    setPaginationData({...paginationData, current_page, page_length })
  }

  

  return (
    <React.Fragment>
      <Spin loading={loading} />
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
        Leave Encashment
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <div className={styles.button_wrap}>
            <Button className={styles.primary_btn} onClick={()=>onAddLeaveEncashment()}>
            <PlusOutlined /> Add Leave encashment
            </Button>
          </div>
        </Col>
      </Row>
      <Panel>
        <div className={styles.panel_container}>
        <LeaveRequestFilter
            payrollFormData={leaveRequestFilter}
            handleChange={getFilterData}

          />
     
      <div>
      <Table
        column={leaveEncashmentColumns}
        editUrl="/create-leave-encashment"
        dataSource={tableData}
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
      />
      </div>
      </div>
      </Panel>
    </React.Fragment>
  );
};

export default LeaveEnchasmentListing;
