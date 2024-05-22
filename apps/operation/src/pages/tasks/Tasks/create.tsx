import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { ReactComponent as EditIcon } from '../../../../../../libs/common/assets/icons/Edit_icon.svg';
import { Divider, Tooltip, Button, Row, Col, Modal } from 'antd';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams } from 'react-router-dom';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { dateTimetoFrom } from '../../../../../../libs/common/utils/common';
import TwoFormWrapper from '../../../../../../libs/common/ui/TwoForm_Table/TwoFormWrapper';
import Styles from '../Activity/activity.module.scss';
import SMNLTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import ModalField from '../../../../../../libs/common/ui/Modal/modal';
import Activity from '../Activity/create';

const Create = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>({
    state_name: '',
    active: false,
  });
  const [activityDetails, setActivityDetails] = useState<any>([]);
  const [activityModal, setActivityModal] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showAddActivityBtn, setshowAddActivityBtn] = useState<boolean>(false);

  const columns = [
    {
      dataIndex: 'activity',
      key: 'activity',
      title: 'Activity Type',
      render: (_: any, record: any) => record?.activity?.value || '-',
    },
    {
      dataIndex: 'activity_id',
      key: 'activity_id',
      title: 'Activity Id',
      render: (_: any, record: any) => record?.name || '-',
    },
    {
      dataIndex: 'loading_point',
      key: 'loading_point',
      title: 'Loading Point',
      render: (_: any, record: any) => record?.loading_point?.value,
    },
    {
      dataIndex: 'unloading_point',
      key: 'unloading_point',
      title: 'Unloading Point',
      render: (_: any, record: any) => record?.unloading_point?.value,
    },
    {
      dataIndex: 'status',
      key: 'status',
      title: 'status',
    },
    {
      dataIndex: 'action',
      key: 'action',
      title: 'Action',
      render: (_: any, record: any) => {
        return record?.active === 1 ? (
          <Tooltip placement="top" title="Edit">
            <EditIcon
              style={{ textAlign: 'end', cursor: 'pointer' }}
              onClick={() => {
                setActivityModal(true);
                setSelectedRecord(record);
              }}
            />
          </Tooltip>
        ) : (
          <EditIcon style={{ textAlign: 'end', cursor: 'not-allowed' }} />
        );
      },
    },
  ];

  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Task', 'htssuite').then((items) => {
      const modifyFormData: any = [...items];
      modifyFormData.forEach((item: any) => {
        if (item.datatype === 'Datetime') {
          item.options = 'future';
        }
        if (item.name === 'completion_date') {
          item.showNow = false;
        }
      });
      setformData(modifyFormData);
      const data = setFormData(items);
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById('task', data, 'task_management', 'htsoperation').then(
        (items) =>
          setformValue({
            ...items,
            task_type: items?.task_type?.name,
            commodity: items?.commodity?.name,
            arriving_date: dateTimetoFrom(items?.arriving_date ?? ''),
            start_date: dateTimetoFrom(items?.start_date ?? ''),
            completion_date: dateTimetoFrom(items?.completion_date ?? ''),
            turn_around_time: items?.turn_around_time,
            active: items?.active === 1 ? true : false,
          })
      );
      localStorage.setItem('taskId', term);
    }
  }, [term]);

  useEffect(() => {
    if (formValue?.start_date && formValue?.completion_date) {
      const fromDate = formValue?.start_date;
      const ToDate = formValue?.completion_date;
      const duration = moment.duration(ToDate.diff(fromDate));
      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();
      setformValue({
        ...formValue,
        turn_around_time: `${days} day${days > 1 ? 's' : ''}  ${hours} hour${
          hours > 1 ? 's' : ''
        } ${minutes} minute${minutes > 1 ? 's' : ''}`,
      });
    }
  }, [formValue?.start_date, formValue?.completion_date]);

  useEffect(() => {
    const data = { task_no: term || localStorage.getItem('taskId') };
    getTableData(
      'activity_details',
      'task_management',
      'htsoperation',
      JSON.stringify(data)
    ).then((items) => {
      const datas = [...items];
      datas.forEach((item: any) => {
        item.status = item.active === 1 ? 'Active' : 'Closed';
      });
      setActivityDetails(datas);
      setloading(false);
    });
  }, [activityModal]);

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          arriving_date: moment(e?.arriving_date).format('YYYY-MM-DD HH:mm'),
          start_date: moment(e?.start_date?.$d).format('YYYY-MM-DD HH:mm'),
          completion_date: moment(e?.completion_date?.$d).format(
            'YYYY-MM-DD HH:mm'
          ),
          active: e?.active == 0 ? 0 : 1,
        },
      };
      updateRecord('task', record, 'task_management', 'htsoperation').then(
        (items: any) => {
          // setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            // navigate('/view-tasks');
            if (activityDetails?.length === 0) {
              setActivityModal(true);
              // localStorage.setItem('taskId', term)
            }
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      );
    } else if (e?.status === 'markClose') {
      const record = {
        name: term || localStorage.getItem('taskId'),
        data: {
          // ...e,
          start_date: moment(e?.start_date?.$d).format('YYYY-MM-DD HH:mm'),
          completion_date: moment(e?.completion_date?.$d).format(
            'YYYY-MM-DD HH:mm'
          ),
          active: 0,
        },
      };
      updateRecord('task', record, 'task_management', 'htsoperation').then(
        (items: any) => {
          // setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-tasks');
            // setActivityModal(true);
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      );
    } else {
      const record = {
        ...e,
        active: 1,
        arriving_date: moment(e?.arriving_date).format('YYYY-MM-DD HH:mm'),
        start_date: moment(e?.start_date).format('YYYY-MM-DD HH:mm'),
        completion_date: moment(e?.completion_date?.$d).format(
          'YYYY-MM-DD HH:mm'
        ),
      };
      createRecord('task', record, 'task_management', 'htsoperation').then(
        (items) => {
          // setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            // setActivityModal(true);
            setshowAddActivityBtn(true)
            localStorage.setItem('taskId', items?.data?.id);
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      );
    }
  };

  const onHandleChange = (value: any, key: any) => {
    setformValue({ ...formValue, [key]: value });
    const formDatas = [...formData];
    if (key === 'completion_date') {
      formDatas?.forEach((item: any) => {
        if (item.name === 'start_date') {
          item.options = {
            type: 'enable_only_two_custom_date',
            startDate: formValue?.arriving_date,
            endDate: value || moment().add(1, 'years'),
          };
        }
      });
    }
    if (key === 'start_date') {
      formDatas?.forEach((item: any) => {
        if (item.name === 'arriving_date') {
          item.options = {
            type: 'past',
            value: value,
          };
          item.readonly = false;
        }
      });
    }
    if (key === 'arriving_date') {
      formDatas?.forEach((item: any) => {
        if (item.name === 'start_date') {
          item.options = {
            type: 'future',
            value: value,
          };
          item.readonly = false;
        }
      });
      if (key === 'arriving_date' && !value) {
        formDatas?.forEach((item: any) => {
          if (item.name === 'start_date') {
            item.options = {
              type: 'future',
              value: value,
            };
            item.readonly = true;
          }
          if (item.name === 'completion_date') {
            item.options = {
              type: 'future',
              value: value,
            };
            item.readonly = true;
          }
        });
      }
      setformValue({
        ...formValue,
        [key]: value,
        start_date: undefined,
        completion_date: undefined,
        turn_around_time: undefined,
      });
    }
    if (key === 'start_date') {
      formDatas?.forEach((item: any) => {
        if (item.name === 'completion_date') {
          item.options = {
            type: 'future',
            value: moment(value?.$d).add(1, 'seconds'),
          };
          item.readonly = false;
        }
      });
    }
    setformData([...formDatas]);
  };
  const editTableData = (record: any) => {
    console.log(record, '***');
    // set
  };
  const deleteHandler = () => {};

  const closeActivtiy = () => {
    setActivityModal(false);
  };

  const expandedRowRender = (e: any) => {
    const nestedColumns = [
      {
        title: 'vehicle type',
        dataIndex: 'vehicle_type',
        key: 'vehicle_type',
      },
      {
        title: 'Driver name',
        dataIndex: 'driver_name',
        key: 'driver_name',
        render: (_: any, record: any) => record?.driver_name?.value,
      },
      {
        title: 'Employee Code',
        dataIndex: 'driver_name',
        key: 'driver_name',
        render: (_: any, record: any) => record?.driver_name?.name,
      },
      {
        title: 'Vehicle Number',
        dataIndex: 'vehicle',
        key: 'vehicle',
      },
      {
        title: 'shift',
        dataIndex: 'shift',
        key: 'shift',
      },
    ];
    if (e?.allocation_data && e?.allocation_data?.length > 0) {
      const prods = e?.allocation_data?.map((item: any, idx: any) => ({
        ...item,
      }));

      return (
        <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
          <SMNLTable column={nestedColumns} dataSource={prods || []} />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className={Styles.activityForm}>
      <Spin loading={loading} />
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        dynamicLayout={true}
        // markasComplete={term ? true : false}
        onChange={onHandleChange}
      />
      {/* <div className={Styles.activityForm__actions}>
        <Button
          className={Styles.activityForm__actions__cancel}
          htmlType="submit"
          type="default"
          onClick={handleFinish}
          disabled={!term}
        >
          Mark as Complete
        </Button>

        <Button
          className={Styles.activityForm__actions__submit}
          htmlType="submit"
          type="primary"
          onClick={handleFinish}
          // onClick={submitActivity}
          // disabled={!submittable}
        >
          Submit
        </Button>
      </div> */}

      {(activityDetails?.length > 0  || showAddActivityBtn || term) && (
        <React.Fragment>
          <Divider />
          <Row>
            <Col span={22}>
              <p className={Styles.formHeading}>Activity Details</p>
            </Col>
            <Col span={2}>
              <Button
                htmlType="submit"
                type="primary"
                style={{
                  width: '100%',
                  marginBottom: '15px',
                }}
                onClick={() => setActivityModal(true)}

                // onClick={submitActivity}
                // disabled={!submittable}
              >
                Add Activity
              </Button>
            </Col>
          </Row>

          <SMNLTable
            dataSource={activityDetails}
            column={columns}
            deletehandler={deleteHandler}
            onlyEditRow={editTableData}
            expandable={{ expandedRowRender }}
          />
          <div className={Styles.activityForm__actions}>
            <Button
              className={Styles.activityForm__actions__cancel}
              htmlType="submit"
              type="default"
              onClick={() => handleFinish({ status: 'markClose', active: 0 })}
              disabled={activityDetails?.length === 0}
            >
              Mark as Complete
            </Button>
          </div>
        </React.Fragment>
      )}
      <ModalField
        isModalOpen={activityModal}
        footer={null}
        handleCancel={() => {
          setSelectedRecord(null);
          setActivityModal(false);
        }}
        width={'80%'}
      >
        {activityModal && (
          <Activity
            onCloseActivityDetails={closeActivtiy}
            selectedActivity={selectedRecord}
          />
        )}
      </ModalField>

      {/* <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        dynamicLayout={true}
        markasComplete={term ? true : false}
        onChange={onHandleChange}
        markasCompleteButtonLabel="Mark as complete"
      /> */}
    </div>
  );
};

export default Create;
