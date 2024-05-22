import React, { useState, useEffect } from 'react';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { PlusOutlined } from '@ant-design/icons';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Modal, message, Row, Upload, Select } from 'antd';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import styles from '../leave.module.scss';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import Datepicker from '../../../../../../libs/common/ui/DatePicker/Datepicker';
import ModalField from '../../../../../../libs/common/ui/Modal/modal';
import UploadIcon from '../../../../../../libs/common/assets/Upload icon.svg';
import {
  getAttendanceReconcilationData,
  importReconXlsx,
  approveAttendance,
  getERPStatusData
} from '../../../../../../libs/common/api/doctype';
import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import { getBase64 } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';

const { Dragger } = Upload;

const View = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<any>(false);
  // const [columns, setColumns] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const [filterData, setFilerData] = useState<any>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });
  const [uploadpayload, setuploadpayload] = useState<any>({});
  const [approveKeys, setapproveKeys] = useState<any>([]);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [disableUploadBtn, setDisableUploadBtn] = useState<boolean>(true);
  const [erpStatus, setErpStatus] = useState<any>([])

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys: React.Key[], e: any) => {
      setSelectedRowKeys(newSelectedKeys);
      setapproveKeys(e);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.status === 'Approved' || record?.status === 'Changed',
    }),
  };
  const columns = [
    {
      key: 'date',
      dataIndex: 'date',
      title: 'Date',
    },
    {
      key: 'emp_code',
      dataIndex: 'emp_code',
      title: 'Emp Code',
    },
    {
      key: 'full_name',
      dataIndex: 'full_name',
      title: 'Employee Name',
    },
    {
      key: 'erp_status',
      dataIndex: 'erp_status',
      title: 'ERP Status',
    },
    {
      key: 'rec_status',
      dataIndex: 'rec_status',
      title: 'Reconcilation Status',
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Status',
    },
  ];

  const getErpStatus =async (date:{})=>{
    const erpData = await getERPStatusData(date)      
      setErpStatus(erpData.map((data:any)=>({
        label : data , value : data
      })))
   }

  useEffect(() => {
    if (filterData?.date_string) {
      getTableResponse(
        filterData,
        paginationData?.current_page,
        paginationData?.page_length
      );
      getErpStatus(filterData?.date_string)
     
    }
  }, [filterData]);

  
  


  const handleChange = (data: any) => {
    setFilerData({
      ...filterData,
      date_string: data.format('YYYY-MM-DD'),
    });
  };

  const handleDrop = () => { };

  const handleBeforeUpload = (file: any) => {
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      message.error('File size must be less than 5MB');
    }
  };

  const handlePreview = () => { };

  const onUploadFile = () => {
    setisModalOpen(true);
  };

  const getTableResponse = (
    filter: any,
    current_page: number,
    page_length: number
  ) => {
    setLoading(true);
    getAttendanceReconcilationData(
      'attendance_reconcilation.api.fetch_date_wise_attendance',
      'leave_management',
      current_page,
      page_length,
      'htssuite',
      filter
    ).then((items: any) => {
      if (items.status === 200) {
        const newitems = items?.data;
        setPaginationData({
          total_records: items?.total_records,
          page_length: items?.page_length,
          current_page: items?.current_page,
        });
        newitems?.forEach((item: any) => {
          if (item.status === null) {
            item.status = 'Un Changed';
          }
        });
        setTableData(newitems);
        setLoading(false);
      } else {
        setLoading(false);
        setTableData([]);
        setPaginationData({
          total_records: 0,
          page_length: pageSize,
          current_page: 1,
        });
      }
    });
  };

  const onuploadExcel = () => {
    setLoading(true);
    importReconXlsx(uploadpayload).then((items: any) => {
      if (items.status === 200) {
        const newitems = items?.data;
        setTableData(newitems);
        setisModalOpen(false);
        setLoading(false);
        getTableResponse(
          filterData,
          paginationData?.current_page,
          paginationData?.page_length
        );
      } else {
        setLoading(false);
        getTableResponse(
          filterData,
          paginationData?.current_page,
          paginationData?.page_length
        );
      }
    });

    // navigate('/approve-attendance-reconcilation');
  };

  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getTableResponse(filterData, current_page, page_length);
    setPaginationData({ ...paginationData, current_page, page_length });
  };

  const exportXl = () => {
    setLoading(true);
    getAttendanceReconcilationData(
      'attendance_reconcilation.api.fetch_date_wise_attendance',
      'leave_management',
      null,
      null,
      'htssuite',
      filterData
    ).then((items: any) => {
      if (items.status === 200) {
        setLoading(false);
        const newitems = items?.data;
        const its: any = [];
        newitems.map((e: any) => {
          its.push({
            date: e?.date,
            emp_code: e?.emp_code,
            full_name: e?.full_name,
            erp_status: e?.erp_status,
            rec_status: e?.rec_status,
            // status: e?.status,
          });
        });
        handleExport(its, 'Employee Reconciliation List');
      } else {
        setLoading(false);
      }
    });

    // if (tableData && tableData?.length > 0) {
    //   const its: any = [];

    // }
  };

  const handlefileChange = async (e: any) => {
    const data: any = await getBase64(e.file.originFileObj);
    const splitBase64Data = data.split(',')?.[1];
    const payload = {
      base64string: splitBase64Data,
    };
    setUploadedFileName(e?.file?.name);
    setDisableUploadBtn(false);
    setuploadpayload(payload);
  };

  const handleApprove = () => {
    const newdata: any = [];
    approveKeys && approveKeys?.map((e: any) => newdata.push(e?.name));

    const data: any = {
      records: newdata,
    };
    approveAttendance(data).then((items: any) => {
      if (items.status === 200) {
        isSuccess(items?.message, 'success');
        getTableResponse(
          filterData,
          paginationData?.current_page,
          paginationData?.page_length
        );

        // const newitems = items?.data;
        // const its: any = [];
        // newitems.map((e: any) => {
        //   its.push({
        //     date: e?.date,
        //     emp_code: e?.emp_code,
        //     full_name: e?.full_name,
        //     erp_status: e?.erp_status,
        //     rec_status: e?.rec_status,
        //   });
        // });
        // handleExport(its);
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };
  const handlestatusChange = (data: any) => {
    
   setFilerData({
    ...filterData,
    status : data
   })

  };

  const handlesERPChange = (data:any)=>{
    setFilerData({
      ...filterData,
      erp_status: data
    })
  }

  return (
    <React.Fragment>
      <Spin loading={loading} />
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
          Reconcilation of Attendance
        </Col>
      </Row>

      <Panel>
        <div className={styles.panel_container}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              // padding: '15px 20px',
            }}
          >
            <Row
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
                gap: '10px',
              }}
            >
              <Col xs={24} sm={24} md={24} lg={3} xl={3}>
                {/* <p style={{ marginBottom: 10, marginTop: '0px' }}>Select Date</p> */}
                <Datepicker
                  style={{ height: '32px' }}
                  disableDate="past"
                  onChange={handleChange}
                  // defaultValue={moment().subtract(1, 'days')}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={3} xl={3}>
                <Select
                  style={{ width: '100%', height: '32px' }}
                  placeholder="Select ERP Status"
                  onChange={handlesERPChange}
                  allowClear
                  options={erpStatus}
                  disabled={erpStatus?.length === 0}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={3} xl={3}>
                <Select
                  style={{ width: '100%', height: '32px' }}
                  placeholder="Select Status"
                  onChange={handlestatusChange}
                  allowClear
                  options={[
                    { value: 'Un Changed', label: 'Un Changed' },
                    { value: 'Changed', label: 'Changed' },
                    { value: 'Pending', label: 'Pending' },
                  ]}
                />
              </Col>
            </Row>
            <div className={styles.button_wrap} style={{ marginBottom: '15px' }}>
              <Button
                onClick={() => handleApprove()}
                // type='primary'
                className={styles.upload_all_btn}
                disabled={selectedRowKeys && selectedRowKeys?.length <= 0}
              >
                Approve All
              </Button>
              <Button
                onClick={() => onUploadFile()}
                // type='primary'
                className={styles.upload_all_btn}
              >
                Upload All
              </Button>

              <Button
                onClick={() => exportXl()}
                // type='primary'
                className={styles.primary_btn}
              >
                Export to Excel
              </Button>
            </div>
          </div>
          {/* <div className={styles.table_wrap}> */}
          <SmnlTable
            column={columns}
            dataSource={tableData}
            totalNumberofRecords={paginationData?.total_records}
            currentPage={paginationData?.current_page}
            onChangePagination={onHandleChangePagination}
            rowSelection={rowSelection}
          />
          {/* </div> */}
        </div>
      </Panel>
      <ModalField
        isModalOpen={isModalOpen}
        footer={null}
        width="500px"
        handleCancel={() => {
          setisModalOpen(false);
        }}
      >
        <div style={{ height: '400px' }}>
          <Spin loading={loading} />
          <p style={{ fontSize: '18px', margin: '5px 0px 25px 5px' }}>
            Upload Document
          </p>
          <div
            style={{
              height: '300px',
              width: '445px',
              margin: 'auto',
              background: '#f8f8ff',
            }}
          >
            <Dragger
              style={{
                width: '100%',
              }}
              name="file"
              onChange={handlefileChange}
              onDrop={handleDrop}
              beforeUpload={handleBeforeUpload}
              onPreview={handlePreview}
              showUploadList={false}
            >
              <img src={UploadIcon} />
              <p style={{ fontWeight: 'bold' }}>
                {uploadedFileName ? (
                  `File: ${uploadedFileName}`
                ) : (
                  <>
                    Drag & drop files or{' '}
                    <span style={{ color: '#483ea8' }}>Browse</span>
                  </>
                )}
              </p>
              <p>
                P=Present, L=LOP, H=Holiday, W=Weekoff,SL=Sick Leave,
                ML=Maternity Leave, A=Absent, PL=Paid Leave,CL=Casual Leave,
                LT=Late Login, EL=early logout, Mis=Mispunch, SPL=Special
              </p>
              <p className="ant-upload-hint">Supported File size 5 MB</p>
            </Dragger>
            <Button
              onClick={() => onuploadExcel()}
              className={styles.upload_file_btn}
              disabled={disableUploadBtn}
            >
              {' '}
              UPLOAD FILE
            </Button>
          </div>
        </div>
      </ModalField>
    </React.Fragment>
  );
};

export default View;
