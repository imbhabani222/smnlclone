import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import {
  onCloseActivity,
  createShift,
  uploadExcel,
} from '../../../../../../libs/common/api/doctype';
import moment from 'moment';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import styles from '../../../../../../libs/common/ui/Form_Table/formTable.module.scss';
import style from '../../tasks/Activity/activity.module.scss';
import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

const column = [
  {
    title: 'Door No',
    dataIndex: 'vehicle',
    key: 'vehicle',
  },
  {
    title: 'Driver Name',
    dataIndex: 'driverName',
    key: 'driverName',
    render: (_: any, record: any) => record?.driver_name,
  },
  {
    title: 'Employee ID',
    dataIndex: 'employee id',
    key: 'employeeId',
    render: (_: any, record: any) => record?.emp_code || record?.driver_name,
  },
];

const formData = [
  {
    datatype: 'Select',
    name: 'shift',
    placeholder: 'Select Shift Name',
    isReq: true,
    label: 'Shift',
    options: [
      {
        label: 'A-Shift',
        value: 'A-Shift',
      },
      {
        label: 'B-Shift',
        value: 'B-Shift',
      },
      {
        label: 'C-Shift',
        value: 'C-Shift',
      },
      {
        label: 'Day-Shift',
        value: 'Day-Shift',
      },
      {
        label: 'Night-Shift',
        value: 'Night-Shift',
      },
    ],
    // columns:ledgerColumntype1,searchIndexes:ledgerSearchIndexex,
  },
  {
    label: 'Upload Excel',
    name: 'upload_document',
    datatype: 'Attach Image',
    isReq: true,
    description: {
      accept:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      fileType: 'Only .xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    default: 0,
    options: {},
    hidden: 0,
  },
];

type Props = {
  props: any;
};

const Create = (props: Props) => {
  const navigate = useNavigate();

  const [formValue, setformValue] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [base64Data, setbase64Data] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFinish = (values: any) => {
    const payload = {
      date: moment().format('YYYY-MM-DD'),
      shift: formValue?.shift,
      allocations: tableData?.map((item: any) => ({
        vehicle: item.vehicle,
        vehicle_type: item?.vehicle_type,
        driver_name: item?.emp_code || item?.driver_name,
      })),
    };
    createShift(
      'driver_allocation.api.create_shift',
      payload,
      'task_management',
      'htsoperation'
    ).then((data) => {
      if (data.status === 200) {
        isSuccess(data?.message, 'success');
        if (props?.props.name === 'Loader') {
          navigate('/view-driverallocation');
        } else {
          navigate(
            `/view-${String(
              props?.props.name
            ).toLocaleLowerCase()}-driverallocation`
          );
        }
      } else {
        isSuccess(data?.message, 'error');
      }
    });
  };

  const onSubmitForm = (value: any) => {
    if (value?.status === 'marksAsComponent') {
      downloadExcel();
    } else {
      setLoading(true);
      const endPoint = 'driver_allocation.api.upload_allocation';
      const payload = {
        base64string: base64Data,
        type: props?.props?.id,
      };

      uploadExcel(endPoint, payload, 'task_management', 'htsoperation').then(
        (items: any) => {
          if (items.status === 200) {
            setLoading(false);
            setTableData(items?.data);
          } else {
            isSuccess(items?.message, 'error');
            setLoading(false);
          }
        }
      );
    }
  };

  const handleImageUpload = (file: any, exe: any) => {
    setbase64Data(file?.file);
    setformValue({ ...formValue, upload_document: file?.file });
    console.log(file, 'file  ');
    if (!file) {
      setTableData([]);
    }
  };

  const handleChange = (value: any, name: string) => {
    setformValue({ ...formValue, [name]: value });
  };

  const downloadExcel = () => {
    const data = [
      {
        SLNO: '',
        Vehicle: '',
        // 'Vehicle Type':"",
        'Emp Code': '',
        'Emp Name': '',
      },
    ];
    handleExport(data, 'Sample_template');
  };

  return (
    <div className={styles.formtable_container}>
      <Spin loading={loading} />
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={onSubmitForm}
        dynamicLayout
        handleImageUpload={handleImageUpload}
        onChange={handleChange}
        markasCompleteButtonLabel="Download Template"
        markasComplete={true}
      />
      <SmnlTable column={column} dataSource={tableData} />
      <div className={style.activityForm__actions}>
        <Button
          className={style.activityForm__actions__submit}
          htmlType="submit"
          type="primary"
          onClick={handleFinish}
          disabled={tableData?.length === 0}
          // disabled={!submittable}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Create;
