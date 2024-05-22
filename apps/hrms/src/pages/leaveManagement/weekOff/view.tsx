import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import {
  deleteRecordById,
  getDocTypes,
  getTableDataWithPagination,
  uploadExcel,
} from '../../../../../../libs/common/api/doctype';
import { PlusOutlined } from '@ant-design/icons';
import SmnlFormDynamicLayout from '../../payrollProcessing/helper/payrollForm';
import { weekoffs_filter } from '../helper/helper';
import moment from 'moment';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import styles from '../leave.module.scss';
import {
  datetoFrom,
  getBase64,
} from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { log } from 'console';
import Message from '../../../../../../libs/common/ui/Message/message';
import Cookies from 'universal-cookie';

const View = () => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [formValue, setFormValue] = useState<any>({});
  const [pageData, setPageData] = useState<any>({
    currentPage: 1,
    page_length: pageSize || 10,
  });
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });

  const navigate = useNavigate();

  const getDefaultDate = () => {
    const currentDate = new Date().getDate();
    const momentDate = moment();
    if (currentDate >= 25) {
      const from_date = momentDate
        .subtract(1, 'months')
        .date(26)
        .format('YYYY-MM-DD');
      const to_date = moment().date(25).format('YYYY-MM-DD');
      setFormValue({
        ...formValue,
        from_date,
        to_date,
        weekoffs_date: [datetoFrom(from_date), datetoFrom(to_date)],
      });
    } else {
      const from_date = momentDate
        .subtract(2, 'months')
        .date(26)
        .format('YYYY-MM-DD');
      const to_date = moment()
        .subtract(1, 'months')
        .date(25)
        .format('YYYY-MM-DD');
      setFormValue({
        ...formValue,
        from_date,
        to_date,
        weekoffs_date: [datetoFrom(from_date), datetoFrom(to_date)],
      });
    }
  };
  useEffect(() => {
    setLoading(true);
    getDefaultDate();
    getDocTypes('Weekoffs', false, 'htssuite').then((item: any) => {
      setColumns(item);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    onGetTableData(
    formValue,
      pageData?.current_page || pageData?.currentPage,
      pageData?.page_length,
      null,
      null
    );
  }, [formValue]);

  const onGetTableData = (
    data: any,
    currentPage: number,
    page_length: number,
    search: any,
    order_by: any,
  ) => {
    setLoading(true);
    delete data?.weekoffs_date;
    getTableDataWithPagination(
      'weekoffs',
      'leave_management',
      currentPage,
      page_length,
      'htssuite',
      JSON.stringify(data),
      search,
      order_by
    ).then((item: any) => {

      if (item.status === 200) {
        // const newTableData = item?.data.map((items: any) => ({
        //   ...items,
        //   shift: items?.shift_name,
        //   total_time : formatTotalTime(items?.total_time)
        // }));
        setTableData(item?.data);
        setPageData({
          total_records: item?.total_records,
          page_length: item?.page_length,
          current_page: item?.current_page,
        });
        setLoading(false);
      }
    }).catch((error: any) => {
      setLoading(false)
      isSuccess("Something went wrong", 'error')

    });
  };

  
  const getFilterData = (value: any, key: any) => {
    setFormValue((prevFormValue: any) => {
      let updatedFormValue = {
        ...prevFormValue,
        [key]:
          key === 'employee_name'
            ? value
            : undefined,
      };

      if (key === 'weekoffs_date') {
        updatedFormValue = {
          ...updatedFormValue,
          from_date: value?.[0]?.toDate()
            ? moment(value?.[0]?.toDate()).format('YYYY-MM-DD')
            : undefined,

          to_date: value?.[1]?.toDate()
            ? moment(value?.[1]?.toDate()).format('YYYY-MM-DD')
            : undefined,
            weekoffs_date: [
            datetoFrom(
              value?.[0]?.toDate()
                ? moment(value?.[0]?.toDate()).format('YYYY-MM-DD')
                : undefined
            ),
            datetoFrom(
              value?.[1]?.toDate()
                ? moment(value?.[1]?.toDate()).format('YYYY-MM-DD')
                : undefined
            ),
          ],
        };
      }

      return updatedFormValue;
    });
  };


//   const applySort = (sortDetails: any, otherDetails: any,) => {
//     if (otherDetails === "ascend") {
//       onGetTableData(formValue, pageData?.current_page, pageData?.page_length, null, `${sortDetails?.sortName} ASC`)

//     } else {
//       onGetTableData(formValue, pageData?.current_page, pageData?.page_length, null, `${sortDetails?.sortName} DESC`)

//     }

//   }

  
  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    onGetTableData(formValue,current_page, page_length,null,null);
    setPageData({ ...pageData, current_page, page_length });
  };


//   const deletehandler = (rowNumber: string) => {

//     deleteRecordById(
//       'attendance',
//       'leave_management',
//       'htssuite',
//       rowNumber
//     ).then((items) => {
//       if (items?.status === 200) {
//         let tempData = [...tableData];
//         let newTempData = tempData.filter((data: any) => {
//           return data?.name !== rowNumber
//         })
//         setTableData(newTempData)
//       }
//       setmsg((prevState) => {
//         const message = items?.status !== 'error' ? { isSuccess: true, isError: false } : { isSuccess: false, isError: true }
//         return {
//           ...prevState,
//           ...message,
//           desc: items?.message
//         }
//       })
//     })
//   }




  const handleQuit = () => {
    setmsg({
      desc: '',
      isError: false,
      isSuccess: false,
      isWarning: false,
    });
  };

  const onCreateWeekoffs = () => {
    navigate('/create-week-off');
  };
  return (
    <React.Fragment>
      <Spin loading={loading} />

      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
          Week Off
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <div className={styles.button_wrap}>
            <Button
              onClick={() => onCreateWeekoffs()}
              className={styles.primary_btn}
            >
              <PlusOutlined /> Create week off
            </Button>
          </div>
        </Col>
      </Row>
      <Panel>
        <div className={styles.panel_container}>
          <SmnlFormDynamicLayout
            payrollFormData={weekoffs_filter}
            handleChange={getFilterData}
            // appname="htssuite"
            formvalue={formValue}
          />
          <Spin loading={loading} />
          <Message
            msg={msg?.desc}
            isSuccess={msg.isSuccess}
            isError={msg.isError}
            isWarning={msg.isWarning}
            handleQuit={handleQuit}
          />
          <SmnlTable
            column={columns}
            dataSource={tableData}
            editUrl="/edit-week-off"
            onChangePagination={onHandleChangePagination}
            totalNumberofRecords={pageData?.total_records}
            currentPage={pageData?.current_page}
            // applySort={applySort}

            // deletehandlerOnStatus={deletehandler}
          />
        </div>
      </Panel>
    </React.Fragment>
  );
};

export default View;
