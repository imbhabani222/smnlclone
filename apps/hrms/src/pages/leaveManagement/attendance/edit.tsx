import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row,  } from 'antd';
import SmnlForm from '../../../../../../libs/common/ui/Form/FormWrapper';
import {
  getFields,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import moment from 'moment';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import styles from '../leave.module.scss';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>([]);
  const [formvalue, setFormValue] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  let [searchParams, setSearchParams] = useSearchParams();

  const term = searchParams.get('id');

  useEffect(() => {
    setLoading(true)
    getFields('Attendance', 'htssuite').then((items) => {
      const fields: any = [...items];

      fields.forEach((item: any) => {
        if (item.label !== 'First Punch' && item.label !== 'Last Punch'  && item.label !== "Shift" && item.label !== "Status") {
          item.readonly = true;
          item.disabled = true;
        }
      });
      setFormData(fields);
      setLoading(false)
    });
  }, []);

  useEffect(() => {
    if (term) {
      setLoading(true)
      const data = { name: term };
      getRecordById('attendance', data, 'leave_management', 'htssuite').then(
        (formValues: any) => {
          setFormValue({
            ...formValues,
            date: null || moment(formValues?.date),
            first_punch: moment(formValues?.first_punch, 'HH:mm'),
            last_punch: moment(formValues?.last_punch, 'HH:mm'),
          });
          setLoading(false)
        }
      );
    }
  }, [term]);

  useEffect(()=>{
    if(formvalue?.first_punch &&  formvalue?.last_punch) {
      const duration = moment.duration(formvalue?.last_punch.diff(formvalue?.first_punch))
      const hours = duration.hours();
      const minutes = duration.minutes();
      const total_time = `${hours}:${minutes}`
      setFormValue({...formvalue, total_time})
    }

  },[formvalue?.first_punch, formvalue?.last_punch])

  const onSubmitForm = (values: any) => {
    const { first_punch, last_punch,  total_time, status, shift} = values;
    const payload = {
      doc_id: term,
      data: {
        first_punch : moment(first_punch?.$d || first_punch).format("HH:mm"),
        last_punch:  moment(last_punch?.$d || last_punch).format("HH:mm"),
        duration:total_time,
        status,
        shift
      },
    };
    setLoading(true)
    updateRecord('attendance', payload, 'leave_management', 'htssuite').then(
      (items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-attendance');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      }
    );
  };

  const onHandleChange = (value:any, key:any) => {
    setFormValue({...formvalue, [key]: value,})
  }

  return (
    <React.Fragment>
      <Spin loading={loading} />
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
          Attendance
        </Col>
    
      </Row>
      <Panel>
        <div className={styles.panel_container}>
          <SmnlForm
            formData={formData}
            formValue={formvalue}
            dynamicLayout={true}
            appname="htssuite"
            onChange={onHandleChange}
            handleFinish={onSubmitForm}
          />
        </div>
      </Panel>
    </React.Fragment>
  );
};

export default Create;
