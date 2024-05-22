import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  onCloseActivity,
  endShift
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams } from 'react-router-dom';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import {
  dateTimetoFrom,
} from '../../../../../../libs/common/utils/common';
import Message from '../../../../../../libs/common/ui/Message/message';
import style from "./subtask.module.scss"
import moment from 'moment';
const Create = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>({
    state_name: '',
    active: false,
  });
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });
  const [openModal, setOpenModal] = useState(false);
  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    // http://127.0.0.1:8000/api/method/htsoperation.operations_master_data.doctype.movement_type.api.get_records

    getFields('Sub Task', 'htssuite').then((items) => {
      setformData(items);
      const data = setFormData(items);
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'sub_task',
        data,
        'task_management',
        'htsoperation'
      ).then((items) =>
        setformValue({
         ...items,
        //  arriving_date:dateTimetoFrom(items?.arriving_date ?? ""),
        //   start_date:dateTimetoFrom(items?.start_date ?? ""),
          sub_task_starting_time:dateTimetoFrom(items?.sub_task_starting_time ?? ""),
          sub_task_completion_time:dateTimetoFrom(items?.sub_task_completion_time ?? ""),
          active: items?.active === 1 ? true : false,
         
        })
      );
    }
  }, [term]);

  const handleFinish = (e: any) => {
    if(e?.status) {
      const record = {
      name: term,
      data: {
        ...e,
        sub_task_starting_time: formValue?.sub_task_starting_time? moment(formValue?.sub_task_starting_time?.$d).format("YYYY-MM-DD HH:mm:ss")  : moment().format("YYYY-MM-DD HH:mm:ss"),
        sub_task_completion_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        active: 0,
      },
    };
    updateRecord(
      'sub_task',
      record,
      'task_management',
      'htsoperation'
    ).then((items: any) => {
      // setloading(false);
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        navigate('/view-subtasks');
      } else {
        isSuccess(items?.message, 'error');
      }
    });
    }
    else if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          sub_task_starting_time: formValue?.sub_task_starting_time? moment(formValue?.sub_task_starting_time?.$d).format("YYYY-MM-DD HH:mm:ss")  : moment().format("YYYY-MM-DD HH:mm:ss"),
          sub_task_completion_time: null,
          active: 1,
        },
      };
      updateRecord(
        'sub_task',
        record,
        'task_management',
        'htsoperation'
      ).then((items: any) => {
        // setloading(false);
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-subtasks');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        sub_task_starting_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        sub_task_completion_time: null,
        active: 1,
      };
      createRecord(
        'sub_task',
        record,
        'task_management',
        'htsoperation'
      ).then((items) => {
        // setloading(false);
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-subtasks');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };
  console.log(term, "term")

  const onCloseShift = (values:any) => {
    console.log(values,"shiftValues")
    const excavatorhrs=values?.excavator_hrs.$H*60 +values?.excavator_hrs?.$m;
    const loaderhrs=values?.loader_hrs.$H*60 +values?.loader_hrs?.$m;
    const data={
      "dumper_trips":parseInt(values?.dumper_trips),
      "quantity_lifted":parseFloat(values?.quantity_lifted),
      "excavator_hrs":excavatorhrs,
      "loader_hrs":loaderhrs
    }
    if(term) {
      endShift(data,term).then((items:any) => {
        setmsg((prevState) => {
          const message =
            items?.status !== 'error' ? { isSuccess: true, isWarning: false } : { isError: true, isWarning: false };
          return {
            ...prevState,
            ...message,
            desc: items?.message,
          };
        });
        
      })
    }
    setTimeout(()=>{
      navigate('/view-subtasks');
    },1000)
    setOpenModal(prev=>!prev)  
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
    <>
       {openModal ? (
        <Modal
          title="Close Shift"
          open={openModal}
          width={'70%'}
          centered
          onCancel={() => setOpenModal(false)}
          // onOk={handleVehicleDriverChange}
          footer={null}
        >
        <div className={style.taskModalInner}>
        <FormWrapper
            formData={[
              {
                "label": "Quantity Lifted",
                "name": "quantity_lifted",
                "datatype": "Data",
                "isReq": true,
                "description": {
                    "type": "float",
                    "minlength": "1",
                    "maxlength": "7"
                },
                "hidden": 0,
                "readonly": false,
                colSpan: 4,

            },
            {
              "label": "Dumper Trips",
              "name": "dumper_trips",
              "datatype": "Data",
              "isReq": false,
              "description": {
                  "type": "integer",
                  "minlength": "1",
                  "maxlength": "3"
              },
              "hidden": 0,
              "readonly": false,
              colSpan: 4,

          },
          {
            "label": "Excavator hours",
            "name": "excavator_hrs",
            "datatype": "Time",
            "isReq": false,
            "placeholder":"Select Hours",
            "hidden": 0,
            "readonly": false,
            colSpan: 4,

        },
        {
          "label": "Loader hours",
          "name": "loader_hrs",
          "datatype": "Time",
          "placeholder":"Select Hours",
          "isReq": false,
          // "description": {
          //     "type": "integer",
          //     "minlength": "1",
          //     "maxlength": "3"
          // },
          "hidden": 0,
          "readonly": false,
          colSpan: 4,

      }
            ]}
            formValue={{}}
            dynamicLayout={true}
            handleFinish={onCloseShift}
          />
          </div>        
          
        </Modal>
      ) : null}
      <Message
        msg={msg?.desc}
        isSuccess={msg.isSuccess}
        isError={msg.isError}
        isWarning={msg.isWarning}
        handleQuit={handleQuit}
      />
      <Spin loading={loading} />
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        dynamicLayout={true}
        markasComplete={term ? true : false}
        markasCompleteButtonLabel="Mark as complete"
        // handleCancel={() => setOpenModal(true)}
        // cancelButtonLabel={"Cancel" }
      />
    </>
  );
};

export default Create;
