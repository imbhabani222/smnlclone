import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Col, Form, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Drawer from '../../../../../../libs/common/ui/Drawer/drawer';
import {
  getTableData,
  getTableDataWithPagination,
  getDocTypes,
  deleteRecordById,
} from '../../../../../../libs/common/api/doctype';
import { leaveRequestColumns, fields, Filter, leaveRequestFilter } from '../helper/helper';
import styles from '../leave.module.scss';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import Message from '../../../../../../libs/common/ui/Message/message';
import Cookies from 'universal-cookie';
import LeaveRequestFilter from '../../payrollProcessing/helper/payrollForm'

type Props = {};

const LeaveRequestListing = (props: Props) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [employeeNames, setEmployeeName] = useState<any>([]);
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });
  const [formValue, setFormValue] = useState({})
  const [filterData, setFilerData] = useState<any>({});
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });

  const getTableResponse = (
    e: any,
    current_page: number,
    page_length: number,
    search: any
  ) => {
    setloading(true);
    getTableDataWithPagination(
      'leave_request',
      'leave_management',
      current_page,
      page_length,
      'htssuite',
      JSON.stringify(e),
      search
    ).then((items: any) => {
      const getData = items?.data.map((item: any) => ({
        ...item,
        employee_name: item?.full_name,
        leave_type: item?.leave_type,
      }));
      setTableData(getData);
      setPaginationData({
        total_records: items?.total_count,
        page_length: items?.page_length,
        current_page: items?.current_page,
      });
      setloading(false);
    });
  };

  useEffect(() => {
    getTableResponse(
      filterData,
      paginationData?.current_page,
      paginationData?.page_length,
      null
    );
    getEmployeeName(null);
  }, []);

  useEffect(() => {
    if (filterData?.status || filterData.emp_code) {
      getTableResponse(
        filterData,
        paginationData?.current_page,
        paginationData?.page_length,
        null
      );
    } else {
      getTableResponse(
        filterData,
        paginationData?.current_page,
        paginationData?.page_length,
        null
      );
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
  
  const onAddLeaveRequest = () => {
    navigate('/create-leave-request')
  }

  const onHandleChangePagination = (current_page: number, page_length: number) => {
    getTableResponse(filterData, current_page, page_length, null);
    setPaginationData({ ...paginationData, current_page, page_length })
  }

  const deletehandler = (rowNumber: string) => {
    deleteRecordById('leave_request', 'leave_management', 'htssuite', rowNumber)
      .then((items) => {
        if (items?.status === 200) {
          let tempData = [...tableData];
          let newTempData = tempData.filter((data: any) => {
            return data?.name !== rowNumber
          })
          setTableData(newTempData)
        }
        setmsg((prevState) => {
          const message = items?.status !== 'error' ? { isSuccess: true, isError: false } : { isSuccess: false, isError: true }
          return {
            ...prevState,
            ...message,
            desc: items?.message
          }
        })
      })
  }

  const handleQuit = () => {
    setmsg({
      desc: '',
      isError: false,
      isSuccess: false,
      isWarning: false,
    });
  };





  return (
    <React.Fragment>
      <Spin loading={loading} />
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
          Leave Request
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <div className={styles.button_wrap}>
            <Button
              className={styles.primary_btn}
              onClick={() => onAddLeaveRequest()}
            >
              <PlusOutlined /> Add Leave Request
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
          <Message
            msg={msg?.desc}
            isSuccess={msg.isSuccess}
            isError={msg.isError}
            isWarning={msg.isWarning}
            handleQuit={handleQuit}
          />
          <div style={{ marginTop: '20px' }}>
            <Table
              column={leaveRequestColumns}
              //  editUrl="/edit-leave-request"
              dataSource={tableData}
              onChangePagination={onHandleChangePagination}
              totalNumberofRecords={paginationData?.total_records}
              currentPage={paginationData?.current_page}
              deletehandlerOnStatus={deletehandler}
            />
          </div>
        </div>
      </Panel>
    </React.Fragment>
  );
};

export default LeaveRequestListing;
