import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  getActiveDrivers,
  onCloseActivity,
  updateShift
} from '../../../../../../libs/common/api/doctype';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import styles from '../../../../../../libs/common/ui/Form_Table/formTable.module.scss';
import style from '../../tasks/Activity/activity.module.scss';
import { ReactComponent as DeleteIcon } from '../../../../../../libs/common/assets/icons/Delete.svg';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { isSuccess } from '../../../../../../libs/common/ui/Message';

const column = (deleteRecord: any) => [
  {
    title: 'Door No',
    dataIndex: 'vehicle',
    key: 'vehicle',
  },
  {
    title: 'Driver Name',
    dataIndex: 'driverName',
    key: 'driverName',
    render: (_: any, record: any) =>
      record?.driver_name?.value || record?.full_name,
  },
  {
    title: 'Employee ID',
    dataIndex: 'employee id',
    key: 'employeeId',
    render: (_: any, record: any) =>
      record?.driver_name?.name || record?.driverName,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (_: any, record: any) => (
      <React.Fragment>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => deleteRecord(record)}
        >
          <DeleteIcon />
        </span>
      </React.Fragment>
    ),
  },
];

const formDatas = [
  {
    label: 'Door No',
    name: 'vehicle',
    datatype: 'Select',
    isReq: true,
    options: [],
    hidden: 0,
    readonly: false,
  },
  {
    label: 'Driver Name',
    name: 'driverName',
    datatype: 'Select',
    isReq: true,
    options: [],
    hidden: 0,
    readonly: false,
  },
];

type Props = {
  props: any;
};
const Create = (props: Props) => {
  const [formValue, setformValue] = useState<any>([]);
  const [activeVehicles, setActiveVehicles] = useState<any>([]);
  const [activeDriver, setActiveDrivers] = useState<any>([]);
  const [formData, setFormData] = useState<any>(formDatas);
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<any>({});

  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    const VehicleType = props?.props?.id;
    const getApiendPoint = `task_management.doctype.driver_allocation.api.list_allocations?vehicle_type=${VehicleType}`;

    onCloseActivity(getApiendPoint).then((items: any) => {
      const table: any = items?.data;
      const record = table.filter((record: any) => record?.id === Number(term) && record?.active === 1);
      setSelectedRecord(record?.[0]);

      const filter = {
        active: 1,
        vehicle_type: props?.props?.id.replaceAll(' ', ''),
        shift: record?.[0]?.shift,
        date: record?.[0]?.date,
      };
      const ApiendPoint = `task_management.doctype.driver_allocation.api.get_allocation_details?filters=${JSON.stringify(
        filter
      )}`;
      onCloseActivity(ApiendPoint).then((items: any) => {
        console.log(items);
        setTableData(items.data);
        setLoading(false);
      });
    });
    const endPoint = `api.get_all_vehicles?type=${VehicleType}`;

    onCloseActivity(endPoint).then((items: any) => {
      const options = items.data?.map((item: any) => ({
        label: item.door_no,
        value: item.door_no,
      }));
      setActiveVehicles([...options]);
    });
    getActiveDrivers(VehicleType).then((items: any) => {
      const options = items?.map((item: any) => ({
        label: item.full_name,
        value: item.name,
      }));
      console.log(options, items);
      setActiveDrivers([...options]);
    });
  }, []);

  useEffect(() => {
    const datas = [...formData];
    datas.forEach((item: any) => {
      if (item.name === 'driverName') {
        item.options = activeDriver;
      }
      if (item.name === 'vehicle') {
        item.options = activeVehicles;
      }
    });
    setFormData([...datas]);
  }, [activeDriver, activeVehicles]);
  const handleFinish = () => {
    const payload = {
      date: term || selectedRecord?.date,
      shift: selectedRecord?.shift,
      allocations:  tableData.map((record:any)=> ({
        vehicle_type: props?.props?.name,
        vehicle: record?.vehicle,
        driver_name: record?.driverName || record?.driver_name?.name
      }))
    };
    updateShift('driver_allocation.api.update_shift', payload, 'task_management', 'htsoperation').then((items:any) => {
      if(items.status === 200){
        isSuccess(items?.message, 'success')
        if(props?.props.name === "Loader") {
          navigate('/view-driverallocation')
        }
        else {
          navigate(`/view-${String(props?.props.name).toLocaleLowerCase()}-driverallocation`)
        }
      }
      else {
        isSuccess(items?.message, 'error')
      }
    })

  };

  const deleteRecord = (record: any) => {
    const tabData = tableData.filter((item: any) => item.name !== record.name);
    setTableData([...tabData]);
  };
  const onSubmitForm = (values: any) => {
    const filterDriverName = activeDriver?.filter(
      (item: any) => item.value === values?.driverName
    );
    const addObject = {
      ...values,
      full_name: filterDriverName?.[0]?.label,
    };
   const checkDuplicate = tableData.some((item:any) => item.driver_name.name === values?.driverName || item.vehicle === values?.vehicle)
   if(checkDuplicate){ 
    isSuccess("Data Already Exits", 'error')
   }
   else {
    setTableData([...tableData, addObject]);
   }
  };

  return (
    <div className={styles.formtable_container}>
      <Spin loading={loading} />
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={onSubmitForm}
        dynamicLayout
        submitButtonLabel='Add'
      />
      <SmnlTable
        column={column(deleteRecord)}
        dataSource={tableData}
        showDelete={true}
      />
      <div className={style.activityForm__actions}>
        {/* <Button
          className={style.activityForm__actions__cancel}
          htmlType="submit"
          type="default"
          onClick={onCanc}
          disabled={!term}
        >
          Cancel
        </Button> */}
        <Button
          className={style.activityForm__actions__submit}
          htmlType="submit"
          type="primary"
          onClick={handleFinish}
          // disabled={!submittable}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Create;
