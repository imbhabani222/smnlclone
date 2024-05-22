import React, { useEffect, useState, useContext } from 'react';
import { Row,  Col} from "antd";
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import {
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import {
  Filter,
  leaveEncashmentApproveColumns,
  leaveRequestFilter
} from '../helper/helper';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import styles from  "../leave.module.scss"
import LeaveRequestFilter from '../../payrollProcessing/helper/payrollForm'


type Props = {};
function Index(props: Props) {
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<any>();
  const [openPopOver, setOpenPopOver] = useState(false);
  const { filter, updateFilter } = useContext<any>(FilterContext);
  const [employeeNames, setEmployeeName] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>({})
  const [paginationData, setPaginationData] = useState<any>({page_length: 10, current_page: 1})

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
  }, [filterData])
  

  const getTableResponse = (e: any,current_page:number,page_length:number,search:any) => {
    setLoading(true);
    getTableDataWithPagination(
      'leave_encashment_request',
      'leave_management',
      current_page,
      page_length,
      'htssuite',
      JSON.stringify(e),
      search
    ).then((items:any) => {
      const getData = items?.data.map((item:any)=>({
        ...item,
        employee_code: item?.employee_name,
        employee_name: item?.full_name,
      }))
      setTableData(getData);
      setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page })
      setLoading(false);
    });
  };

 
  const getFilterData = (value: any, key: any) => {
    setFilterData((prevFormValue:any) => {
      let updatedFormValue = {
        ...prevFormValue,
        [key]: 
        key === 'emp_code' || key === "status" ? value : undefined
      }
      return updatedFormValue
    })
  };


  const getHandleChangeCategory = (e: any) => {    
    const filterObject = {...filterData}
    const filter = e
    ? {...filterObject, emp_code : e}
    : {status : filterObject.status}
    setFilterData(filter)
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
  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse(filterData, current_page, page_length, null);
    setPaginationData({...paginationData, current_page, page_length })
  }

  

  return (
    <div>

      <Spin loading={loading} />
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
        Leave Encashment Approvals & Rejections
        </Col>
      </Row>
      <Panel>
      <div className={styles.panel_container}>
      <LeaveRequestFilter
            payrollFormData={leaveRequestFilter}
            handleChange={getFilterData}

          />
      {/* <Filter
        handlestatusChange={getFilterData}
        handleCategoryChange={getHandleChangeCategory}
        employeeNameList={employeeNames}
      /> */}
      <div style={{marginTop:"20px"}}>
      <SmnlTable
        dataSource={tableData}
        column={leaveEncashmentApproveColumns}
        viewUrl="/create-leave-encashment"
        mode="view"
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        
      />
      </div>
      </div>
      </Panel>
    </div>
  );
}

export default Index;
