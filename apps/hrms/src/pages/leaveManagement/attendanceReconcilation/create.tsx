import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Modal, Row } from 'antd';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import styles from '../leave.module.scss';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import Datepicker from '../../../../../../libs/common/ui/DatePicker/Datepicker';

const Create = () => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [loading, setLoading] = useState<any>(false);
  const [columns, setColumns] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleChange = () => {};

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys: React.Key[], e: any) => {
      console.log(e, newSelectedKeys);
      setSelectedRowKeys(newSelectedKeys);
    },
  };

  const colums = [
    {
      title: 'Action',
      dataindex: 'Action',
      key: 'Action',
      render: (_:any, record: any) => (
        <Row
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button className={styles.reject_btn}>Approve</Button>
          <Button className={styles.reject_btn}>Reject</Button>
        </Row>
      ),
    },
  ];
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
          <Row
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px',
            }}
          >
            <Col xs={24} sm={24} md={24} lg={4} xl={4}>
              <p style={{ marginBottom: 10, marginTop: '0px' }}>Select Date</p>
              <Datepicker disableDate="past" onChange={handleChange} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6} offset={14}>
              <div className={styles.button_wrap}>
                <Button
                  onClick={() => handleChange()}
                  // type='primary'
                  className={styles.upload_all_btn}
                >
                  Approve All
                </Button>
                <Button className={styles.primary_btn}>Export to Excel</Button>
              </div>
            </Col>
          </Row>
          <div className={styles.table_wrap}>
            <SmnlTable
              column={colums}
              dataSource={[]}
              rowSelection={rowSelection}
            />
          </div>
        </div>
      </Panel>
    </React.Fragment>
  );
};

export default Create;
