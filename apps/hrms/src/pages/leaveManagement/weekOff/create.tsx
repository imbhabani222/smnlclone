import React, { useEffect, useState } from 'react';
import { Row, Col, Modal } from 'antd';
import dayjs from 'dayjs';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import styles from '../leave.module.scss';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { fromDBFields, easyTimeProFields, weekoffs_excel_field } from '../helper/helper';
import { uploadExcel, getFields, createRecord, getRecordsById, updateRecord } from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import moment from 'moment';
import { dateFormat, datetoFrom, employeeSelectDropDown, } from '../../../../../../libs/common/utils/common';
import handleExport, { handleDownloadSampleExcel, handleExportforMisreports } from "../../../../../../libs/common/ui/ExportToExcel/ExportToExcel"
import { log } from 'console';
import { fileURLToPath } from 'url';

const formData = [
  {
    label: 'Weekoffs Through',
    name: 'attendanceThrough',
    datatype: 'Select',
    isReq: true,
    description: {},
    options: [
      {
        label: 'Excel upload',
        value: 'easyTimePro',
      },
      {
        label: 'Create Form',
        value: 'form',
      },
    ],
    hidden: 0,
    readonly: false,
  },
];

const Create = () => {
  const [formDatas, setFormData] = useState<any>(formData);
  const [formValue, setformValues] = useState<any>({
    month: '',
    year: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [base64Data, setBase64Data] = useState<any>();
  const [seconds, setSeconds] = useState<any>();
  let [searchParams, setSearchParams] = useSearchParams();

  const term = searchParams.get('id');

  const navigate = useNavigate();
  const { confirm } = Modal;

  useEffect(() => {
    if (formValue?.attendanceThrough === 'easyTimePro') {
      setFormData([...formData, ...weekoffs_excel_field]);
    }
    if (formValue?.attendanceThrough === 'form') {
      setLoading(true)
      getFields('Weekoffs', 'htssuite').then((items) => {
        const fields: any = [...items]
        const updatedFields = fields.map((item: any) => {
          if (item?.name === 'employee_name') {
            return employeeSelectDropDown(item)
          }
          return item
        })
        setFormData([...formData, ...updatedFields]);
        setLoading(false)
      })
    }
  }, [formValue]);

  useEffect(() => {
    if (term) {
      getFields('Weekoffs', 'htssuite').then((items: any) => {
        setFormData(items)
        setLoading(false)
      })
      setLoading(true)
      const data = { name: term }
      getRecordsById('weekoffs', data, 'leave_management', 'htssuite').then(
        (item: any) => {
          setformValues({
            ...item,
            week_off_date: datetoFrom(item?.week_off_date)

          })
          setLoading(false)
        }
      )
    }
  }, [term])


  const handleFinish = (values: any) => {
    if (term) {
      const payload = {
        name: term,
        data: {
          ...values,
          week_off_date: dateFormat(formValue?.week_off_date)
        },
      };
      setLoading(true)

      updateRecord('weekoffs', payload, 'leave_management', 'htssuite').then((items: any) => {
        if (items.status === 200) {
          isSuccess(items.message, 'success');
          setLoading(false);
          navigate('/view-week-off');
          setLoading(false)
        } else {
          isSuccess(items.message, 'error');
          setLoading(false);

        }
      })
    }
    if (values?.attendanceThrough === 'easyTimePro') {
      const payload = {

        base64string: base64Data,
        month: parseInt(moment(values?.month).format('M'), 10),
        year: parseInt(moment(values?.year).format('YYYY'), 10)

      };
      setLoading(true);
      uploadExcel(
        'weekoffs.api.bulk_upload_weekoffs',
        payload,
        'leave_management',
        'htssuite'
      ).then((items: any) => {
        if (items.status === 200) {
          isSuccess(items.message, 'success');
          setLoading(false);
          navigate('/view-week-off');
        } else {
          isSuccess(items.message, 'error');
          setLoading(false);
        }
      });
    }

    if (values?.attendanceThrough === 'form') {
      const payload = {
        ...values,
        status: values?.status,
      };
      setLoading(true)
      createRecord('weekoffs', payload, 'leave_management', 'htssuite').then((items: any) => {
        if (items.status === 200) {
          isSuccess(items.message, 'success');
          setLoading(false);
          navigate('/view-week-off');
          setLoading(false)
        } else {
          isSuccess(items.message, 'error');
          setLoading(false);

        }
      })
    }
    if (values?.status === "marksAsComponent") {
      downloadExcel()
    }
  };

  const downloadExcel = () => {

    const data: any = [
      {
        "Sl No": "",
        "Employee Id": "",
        "ERP Code":"",
        "Full Name": "",
        "DOJ":"",
        "Section":"",
        'Department': "",
        'Designation': "",
        'WO1': "",
        ' 26': '',
        ' 27': '',
        ' 28': '',
        ' 29': '',
        ' 30': '',
        ' 31': '',
        " 01": "",
        " 02": "",
        " 03": "",
        " 04": "",
        " 05": "",
        " 06": "",
        " 07": "",
        " 08": "",
        " 09": "",
        " 10": "",
        " 11": "",
        " 12": "",
        " 13": "",
        " 14": "",
        " 15": "",
        " 16": "",
        " 17": "",
        " 18": "",
        " 19": "",
        " 20": "",
        " 21": "",
        " 22": "",
        " 23": "",
        " 24": "",
        " 25": ""
      }
    ];
    

    handleDownloadSampleExcel(data, "Sample_Weekoffs_Template");
  };

  const handleFormChange = (val: any, key: any) => {
    setformValues({ ...formValue, [key]: val });
    if (key === 'month') {
      setformValues({ ...formValue, month: val })
    }

    if (key === 'year') {
      setformValues({ ...formValue, year: val })
    }
  };
  const onHandleImageUpload = (file: any) => {
    setBase64Data(file?.file);
  };

  //   const showConfirm = (message:any) => {
  //     confirm({
  //       title: message,
  //       icon: <ExclamationCircleFilled />,
  //       onOk() {
  //         const payload = {
  //           start_date: dateFormat(formValue?.date?.[0]),
  //           end_date: dateFormat(formValue?.date?.[1]),
  //           force_upload: true,
  //         };
  //         setLoading(true);
  //         uploadExcel(
  //           'attendance.api.get_attendance_from_client_db',
  //           payload,
  //           'leave_management',
  //           'htssuite'
  //         ).then((items: any) => {
  //           if (items.status === 200) {
  //             isSuccess(items.message, 'success');
  //             setLoading(false);
  //             navigate('/view-attendance');
  //           } else {
  //             isSuccess(items.message, 'error');
  //             setLoading(false);
  //             showConfirm(items.message)    

  //           }
  //         });
  //       },
  //       onCancel() {
  //       },
  //     });
  //   };



  return (
    <React.Fragment>
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
          Create Week Offs
        </Col>
      </Row>
      <Spin loading={loading} />
      <Panel>
        <div className={styles.panel_container}>
          <FormWrapper
            formData={formDatas}
            formValue={formValue}
            handleFinish={handleFinish}
            dynamicLayout
            onChange={handleFormChange}
            handleImageUpload={onHandleImageUpload}
            appname='htssuite'
            markasComplete={formValue?.attendanceThrough === "easyTimePro"}
            markasCompleteButtonLabel={"Download Excel"}
          />
        </div>

      </Panel>
    </React.Fragment>
  );
};
export default Create;
