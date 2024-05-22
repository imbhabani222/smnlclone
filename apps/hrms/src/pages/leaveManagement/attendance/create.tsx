import React, { useEffect, useState } from 'react';
import { Row, Col, Modal } from 'antd';
import dayjs from 'dayjs';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import styles from '../leave.module.scss';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { fromDBFields, easyTimeProFields } from '../helper/helper';
import { uploadExcel, getFields, createRecord } from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import moment from 'moment';
import { dateFormat, employeeSelectDropDown, } from '../../../../../../libs/common/utils/common';
import  handleExport from "../../../../../../libs/common/ui/ExportToExcel/ExportToExcel"

const formData = [
  {
    label: 'Attendance Through',
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
        label: 'Get From DB',
        value: 'getFromDB',
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
  const [formValue, setformValues] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [base64Data, setBase64Data] = useState<any>();
  const [seconds, setSeconds] = useState<any>();

  const navigate = useNavigate();
  const { confirm } = Modal;

  useEffect(() => {
    if (formValue?.attendanceThrough === 'easyTimePro') {
      setFormData([...formData, ...easyTimeProFields]);
    }
    if (formValue?.attendanceThrough === 'getFromDB') {
      setFormData([...formData, ...fromDBFields]);
    }
    if (formValue?.attendanceThrough === 'form') {
      setLoading(true)
       getFields('Attendance', 'htssuite').then((items)=>{
        const fields: any = [...items];
       const updatedItems = fields.map((item:any)=>{
          if(item.name === "date"){
            item.options =  "past"
          }
          if(item.name === "employee_code") {
            return employeeSelectDropDown(item)
          }
          return item
        })
        setFormData([...formData, ...updatedItems]);
        setLoading(false)
    }) 
    }
  }, [formValue]);

  useEffect(()=>{
    if(formValue?.first_punch &&  formValue?.last_punch) {
      const durationInMinutes = formValue.last_punch.diff(formValue.first_punch, 'minute');
      const adjustedDurationInMinutes = (durationInMinutes + 24 * 60) % (24 * 60);
      const hours = Math.floor(adjustedDurationInMinutes / 60);
      const minutes = adjustedDurationInMinutes % 60;
      const total_time = `${hours}:${String(minutes).padStart(2, '0')}`;     
       setSeconds(Math.abs(durationInMinutes)*60)
      setformValues({...formValue, total_time})
    }

  },[formValue?.first_punch, formValue?.last_punch])

  const handleFinish = (values: any) => {

    if (values?.attendanceThrough === 'easyTimePro') {
      const payload = {
        data: {
          base64string: base64Data,
        },
      };
      setLoading(true);
      uploadExcel(
        'attendance.api.bulk_upload_10AM',
        payload,
        'leave_management',
        'htssuite'
      ).then((items: any) => {
        if (items.status === 200) {
          isSuccess(items.message, 'success');
          setLoading(false);
          navigate('/view-attendance');
        } else {
          isSuccess(items.message, 'error');
          setLoading(false);
        }
      });
    }
    if (values?.attendanceThrough === 'getFromDB') {
      const payload = {
        start_date: dateFormat(values?.date?.[0]),
        end_date: dateFormat(values?.date?.[1])
        // force_upload: true,
      };
      setLoading(true);
      uploadExcel(
        'attendance.api.get_attendance_from_client_db',
        payload,
        'leave_management',
        'htssuite'
      ).then((items: any) => {
        if (items.status === 200) {
          isSuccess(items.message, 'success');
          setLoading(false);
          navigate('/view-attendance');
        } else {
          isSuccess(items.message, 'error');
          setLoading(false);
          showConfirm(items.message)    
        
        }
      });
    }
    if (values?.attendanceThrough === 'form') {
      const payload = {
        ...values,
        date: dateFormat(values?.date),
        first_punch: moment(values?.first_punch?.$d).format('HH:mm:ss'),
        last_punch: moment(values?.last_punch?.$d).format('HH:mm:ss'),
        total_time: seconds,
        status: values?.status,
      };
      setLoading(true)
      createRecord('attendance', payload, 'leave_management', 'htssuite').then((items:any)=>{
        if (items.status === 200) {
          isSuccess(items.message, 'success');
          setLoading(false);
          navigate('/view-attendance');
        } else {
          isSuccess(items.message, 'error');
          setLoading(false);

        }
      })
    }
    if(values?.status === "marksAsComponent") {
      downloadExcel()
    }
  };
 
  const downloadExcel = () => {
    const data = [
      {
        employee_code: "",
        date: "",
        first_punch:"",
        last_punch:"",
        total_time: "",
        shift:"",
      }
    ]
    handleExport(data, "Sample_template")
  }


  const handleFormChange = (val: any, key: any) => {
    setformValues({ ...formValue, [key]: val });

    
  };
  const onHandleImageUpload = (file: any) => {
    setBase64Data(file?.file);
  };

  const showConfirm = (message:any) => {
    confirm({
      title: message,
      icon: <ExclamationCircleFilled />,
      onOk() {
        const payload = {
          start_date: dateFormat(formValue?.date?.[0]),
          end_date: dateFormat(formValue?.date?.[1]),
          force_upload: true,
        };
        setLoading(true);
        uploadExcel(
          'attendance.api.get_attendance_from_client_db',
          payload,
          'leave_management',
          'htssuite'
        ).then((items: any) => {
          if (items.status === 200) {
            isSuccess(items.message, 'success');
            setLoading(false);
            navigate('/view-attendance');
          } else {
            isSuccess(items.message, 'error');
            setLoading(false);
            showConfirm(items.message)    
          
          }
        });
      },
      onCancel() {
      },
    });
  };

 

  return (
    <React.Fragment>
      {/* <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
          Create Attendance
        </Col>
      </Row> */}
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
