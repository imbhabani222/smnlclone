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
// import { leaveRequestColumns, fields, Filter } from '../helper/helper';
import styles from '../leave.module.scss';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import Message from '../../../../../../libs/common/ui/Message/message';
import Cookies from 'universal-cookie';

type Props = {};

const ViewCompensatory = (props: Props) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [columnData, setColumnData] = useState([])
  const [employeeNames, setEmployeeName] = useState<any>([]);
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });
  const [filterData, setFilerData] = useState<any>({});
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });
useEffect(() => {
  setloading(true)
 getDocTypes('Compensatory Off', false,'htssuite').then((item:any)=>{
    setColumnData(item)
    setloading(false)
 })
 getTableData(tableData,paginationData?.current_page,paginationData?.page_length,null)
}, [])

  
const getTableData = (data:any,current_page:number,page_length:number,search:any)=>{
  setloading(true)
  getTableDataWithPagination('compensatory_off','leave_management',current_page,page_length,'htssuite',JSON.stringify(data),search)
  .then((item:any)=>{
   setTableData(item?.data)
   setloading(false)
  })
}
 
  const onAddCompensatory = ()=>{
    navigate('/create-compensatory-off')
  }

  

  


  return (
    <React.Fragment>
      <Spin loading={loading} />
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
        Compensatory Off
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <div className={styles.button_wrap}>
            <Button
              className={styles.primary_btn}
              onClick={() => onAddCompensatory()}
            >
              <PlusOutlined /> Add Compensatory Off
            </Button>
          </div>
        </Col>
      </Row>
      <Panel>
        <div className={styles.panel_container}>
          {/* <Filter
            handlestatusChange={getFilterData}
            handleCategoryChange={getHandleChangeCategory}
            employeeNameList={employeeNames}
          /> */}
          {/* <Message
            msg={msg?.desc}
            isSuccess={msg.isSuccess}
            isError={msg.isError}
            isWarning={msg.isWarning}
            handleQuit={handleQuit}
          /> */}
          <div style={{ marginTop: '20px' }}>
            <Table
              column={columnData}
               editUrl="/edit-compensatory-off"
              dataSource={tableData}
            //   onChangePagination={onHandleChangePagination}
              totalNumberofRecords={paginationData?.total_records}
              currentPage={paginationData?.current_page}
            //   deletehandlerOnStatus={deletehandler}
            />
          </div>
        </div>
      </Panel>
    </React.Fragment>
  );
};

export default ViewCompensatory;
