import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Switch } from 'antd';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getActiveVehicleDrivers,
  getActiveVehicles,
  getActiveDrivers,
  onCloseActivity,
  getTableData,
  getVehicleTypeSeries,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams } from 'react-router-dom';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { Modal } from 'antd';
import TwoFormWrapper from '../../../../../../libs/common/ui/TwoForm_Table/TwoFormWrapper';
import style from './activity.module.scss';
import { disableAllFieldsHandler } from '../../../../../../libs/common/ui/Form/FormHelper';

const formDataAddVehiclesTemp = [
  {
    label: 'Vehicle Type',
    name: 'vehicle_type',
    datatype: 'Select',
    isReq: true,
    description: {
      linkfield: 'vehicle_type',
      modulename: 'fuel_management',
      appname: 'htsinventory',
      showActive: 'true',
    },
    options: 'Vehicle Types',
    hidden: 0,
    readonly: false,
  },
  {
    label: 'Series',
    name: 'series',
    datatype: 'Select',
    isReq: false,
    description: { type: 'MultiSelect' },
    default: '',
    hidden: 0,
    readonly: false,
  },
  {
    label: 'No. of Vehicles available',
    name: 'no_of_vehicles_availabel',
    datatype: 'Data',
    isReq: false,
    description: {},
    hidden: 0,
    readonly: true,
  },
  {
    label: 'No. of Vehicles Required',
    name: 'no_of_vehicles',
    datatype: 'Int',
    isReq: true,
    description: {
      type: 'int',
      maxlength: '4',
    },
    hidden: 0,
    readonly: false,
  },
];

const ManualUploadFormData = [
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
const Create = (props: any) => {
  const { onCloseActivityDetails, selectedActivity } = props;
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>({
    state_name: '',
    active: 1,
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [submitData, setSubmitData] = useState<any>({});
  const [activeVehicleDrivers, setActiveVehicleDrivers] = useState<any>([]);
  const [activeDrivers, setActiveDrivers] = useState<any>([]);
  const [activeVehicles, setActiveVehicles] = useState<any>([]);
  const [vehicleDriverAllocation, setVehicleDriverAllocation] = useState<any>(
    []
  );
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [driverFormValue, setDriverFormValue] = useState<any>({});
  const [formValueAddVehicles, setFormValueAddVehicles] = useState<any>({});
  const [formDataAddVehicles, setFormDataAddVehicles] = useState<any>([
    ...formDataAddVehiclesTemp,
  ]);

  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [ showQtyLifted, setShowQtyLifted ] = useState<boolean>(false);

  // formDataAddVehiclesTemp
  const [data, setData] = useState([]);
  let [searchParams] = useSearchParams();
  const term = selectedActivity?.name;
  const editDriverDetails = [
    {
      label: 'Vehicle Number',
      name: 'vehicle_number',
      datatype: 'Select',
      isReq: false,
      description: {},
      options: activeVehicles.map((item: any) => ({
        label: item.door_no,
        value: item.door_no,
      })),
      hidden: 0,
      readonly: false,
      colSpan: 2,
    },
    // {
    //   label: 'Driver',
    //   name: 'driver',
    //   datatype: 'Select',
    //   isReq: false,
    //   description: {},
    //   options: activeDrivers?.map((item: any) => ({
    //     label: item.full_name,
    //     value: item.name,
    //   })),
    //   hidden: 0,
    //   readonly: false,
    //   colSpan: 2,
    // },
  ];

  useEffect(() => {
    setloading(true);
    getTableData('sub_task', 'task_management', 'htsoperation').then(
      (items) => {
        setData(items);
        setloading(false);
      }
    );
    getFields('Activity Details', 'htssuite').then((items) => {
      const formDatas: any = [...items];
      formDatas?.forEach((item: any) => {
        if (item.name === 'resource_allocation_column') {
          item.datatype = 'Break';
        }
        if (item.name === 'series') {
          item.datatype = 'MultiSelect';
        }
        setloading(false);
      });
      setformData(formDatas);
      const data = setFormData(formDatas);
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'activity_details',
        data,
        'task_management',
        'htsoperation'
      ).then((items) => {
        setformValue({
          ...items,
          active: items?.active === 1 ? true : false,
        });
        const driverData = items.allocation_data?.map((item: any) => ({
          vehicle: item.vehicle,
          door_no: item.vehicle,
          shift: item.shift,
          vehicle_type: item.vehicle_type,
          driver_name: item.driver_name?.name || item?.driver_name,
          full_name: item.driver_name?.value || item?.full_name,
        }));
        setVehicleDriverAllocation(driverData);
      });
    }
    

    !term && setVehicleDriverAllocation([]);
    
  }, [term]);

  // useEffect(() => {
  //   if (selectedRecord?.vehicle_type && term) {
  //     const endPoint = `api.get_all_vehicles?type=${selectedRecord?.vehicle_type}`;
  //     onCloseActivity(endPoint).then((items: any) => {
  //       setActiveVehicles(items?.data);
  //     });
  //     // getActiveDrivers(selectedRecord?.vehicle_type).then((items:any) => {
  //     //   setActiveDrivers([...items]);
  //     // });
  //   }
  // }, [selectedRecord]);

  useEffect(() => {
    if (!formValueAddVehicles?.vehicle_type) {
      //   setFormValueAddVehicles((prev: any) => ({
      //     ...prev,
      //     series: [],
      //   }));
    }
    if (
      formValueAddVehicles?.vehicle_type &&
      formValueAddVehicles?.vehicle_type?.length > 0
    ) {
      setloading(true);
      getVehicleTypeSeries(formValueAddVehicles?.vehicle_type).then((items) => {
        const seriesArr = items.map((item: any) => ({
          label: item.series,
          value: item.series,
        }));
        const formDatas: any = [...formDataAddVehicles];
        formDatas.forEach((item: any) => {
          if (item.name === 'series') {
            item.options = seriesArr;
          }
        });
        setFormDataAddVehicles(formDatas);
        setloading(false);
      });
    }
    if (
      formValueAddVehicles?.vehicle_type?.length > 0 &&
      formValueAddVehicles?.series?.length > 0
    ) {
      const vehicleType = formValueAddVehicles?.vehicle_type;
      const series = formValueAddVehicles?.series;
      setloading(true);
      getActiveVehicleDrivers(vehicleType, JSON.stringify(series)).then(
        (items) => {
          items.forEach((data: any, index: number) => {
            data.ids = index;
            data.series = series;
          });
          setFormValueAddVehicles((prev: any) => ({
            ...prev,
            no_of_vehicles_availabel: findNumberOfVehicleAvailable(
              items,
              vehicleType,
              term
            ),
          }));
          setActiveVehicleDrivers([...items]);
        }
      );

      // getActiveVehicles(vehicleType, JSON.stringify(series)).then((items) => {
      //   setActiveVehicles([...items]);
      //   setFormValueAddVehicles((prev: any) => ({
      //     ...prev,
      //     no_of_vehicles_availabel: findNumberOfVehicleAvailable(
      //       items,
      //       vehicleType,
      //       term
      //     ),
      //   }));
      //   setloading(false);
      // });
      // getActiveDrivers(vehicleType).then((items) => {
      //   setActiveDrivers([...items]);
      // });
    }
  }, [formValueAddVehicles?.vehicle_type, formValueAddVehicles?.series]);

  const findNumberOfVehicleAvailable = (
    data: any,
    vehicleType: any,
    term: any
  ) => {
    const countNotPresent = data.filter(
      (item1: any) =>
        !vehicleDriverAllocation?.some(
          (item2: any) => item1.door_no === item2.door_no
        )
    ).length;

    return countNotPresent;
    // const filterVehicleType = vehicleDriverAllocation.filter((item:any) => item.vehicle_type === vehicleType)
    //   const value = count - filterVehicleType.length
    //   return Math.max(0, value)
  };

  const submitActivity = (e: any) => {
    //setloading(true);
    const isDuplicate = hasDuplicates(vehicleDriverAllocation, [
      'driver_name',
      'vehicle',
    ]);
    if (isDuplicate) {
      isSuccess(
        'Duplicates found. Please check for either the same driver or the same vehicle',
        'error'
      );
    } else {
      const payload = {
        ...formValue,
        task_no: localStorage.getItem('taskId'),
        loading_point:
          formValue?.loading_point?.name ?? formValue?.loading_point,
        unloading_point:
          formValue?.unloading_point?.name ?? formValue?.unloading_point,
        active: 1,
        allocation_data: vehicleDriverAllocation?.map((item: any) => ({
          driver_name: item.driver_name,
          // vehicle: item.vehicle,
          vehicle_type: item.vehicle_type,
          vehicle: item?.door_no,
          shift: item?.shift,
        })),
      };
      if (term) {
        const record = {
          // doc_id: term,
          name: term,
          data: {
            task_no:
              selectedActivity?.task_no || localStorage.getItem('taskId'),
            activity: formValue?.activity,
            allocated_source_user: formValue?.allocated_source_user,
            source_location: formValue?.source_location,
            allocated_destination_user: formValue?.allocated_destination_user,
            destination_location: formValue?.destination_location,
            // vehicle_type: formValue?.vehicle_type,
            // series: formValue?.series,
            // no_of_vehicles: Number(formValue?.no_of_vehicles),
            active: 1,
            allocation_data: vehicleDriverAllocation?.map((item: any) => ({
              driver_name: item.driver_name,
              // vehicle: item.vehicle,
              vehicle_type: item.vehicle_type,
              vehicle: item?.door_no,
              shift: item?.shift,
            })),
          },
        };
        updateRecord(
          'activity_details',
          record,
          'task_management',
          'htsoperation'
        ).then((items: any) => {
          // setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            // navigate('/');
            onCloseActivityDetails();
          } else {
            isSuccess(items?.message, 'error');
          }
        });
      } else {
        const record = {
          ...payload,
        };
        createRecord(
          'activity_details',
          record,
          'task_management',
          'htsoperation'
        ).then((items) => {
          // setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            // navigate('/view-activities');
            onCloseActivityDetails();
          } else {
            isSuccess(items?.message, 'error');
          }
        });
      }
      setVehicleDriverAllocation([]);
      setformValue({})
    }
  };

  function hasDuplicates(arr: any, keys: any) {
    const uniqueValues: any = {};
    return arr.some((item: any) => {
      const keyValues = keys.map((key: any) => item[key]);
      const keyString = keyValues.join('-');
      if (uniqueValues[keyString]) {
        return true;
      }

      uniqueValues[keyString] = true;
      return false;
    });
  }

  // useEffect(() => {
  //   const noOfVehiclesAvailable = parseInt(formValue?.no_of_vehicles_availabel);
  //   const numberOfVehicles = parseInt(formValue?.no_of_vehicles);
  //   let newvehicleDriverAllocation;
  //   if (numberOfVehicles <= noOfVehiclesAvailable) {
  //     if (numberOfVehicles !== 0) {
  //       newvehicleDriverAllocation = activeVehicleDrivers.slice(
  //         0,
  //         numberOfVehicles
  //       );
  //     } else if (numberOfVehicles === 0) {
  //       newvehicleDriverAllocation = [];
  //     }
  //     setVehicleDriverAllocation([...newvehicleDriverAllocation]);
  //   } else {
  //     // isSuccess("", "error")
  //   }
  // }, [formValue?.no_of_vehicles]);

  useEffect(() => {
    if (formValue?.activity) {
      getRecordById(
        'activity_type',
        { name: formValue?.activity },
        'operations_master_data',
        'htsoperation'
      ).then((items) => {
        const tempVehicleType = items?.vehicle_type_used?.map((item: any) => {
          return {
            label: item,
            value: item,
          };
        });
        const formDatas = formDataAddVehicles.map((item: any) => {
          if (item.name === 'vehicle_type') {
            return {
              ...item,
              options: [...tempVehicleType],
              datatype: 'Select',
            };
          }
          return item;
        });
        setFormDataAddVehicles(formDatas);
      });
    }
  }, [formValue?.activity]);

  const columns = [
    {
      title: 'Vehicle Type',
      dataIndex: 'vehicle_type',
      key: 'vehicle_type',
    },
    {
      title: 'Driver Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Employee Code',
      dataIndex: 'driver_name',
      key: 'driver_name',
    },
    {
      title: 'Vehicle Number',
      dataIndex: 'door_no',
      key: 'door_no',
    },
    {
      title: 'Shift',
      dataIndex: 'shift',
      key: 'shift',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  // const handleVehicleDriverChange = (e) => {
  //   console.log(e, 'handle');
  // };

  const tableEditRow = (items: any) => {
    setSelectedRecord(items);
    getActiveVehicleDrivers(
      items?.vehicle_type,
      JSON.stringify(items?.series) || null
    ).then((datas: any) => {
      const items = datas.filter(
        (item: any) =>
          !vehicleDriverAllocation.some(
            (item2: any) => item.door_no === item2.door_no
          )
      );
      setActiveVehicles(items);
    });
    setDriverFormValue({
      vehicle_number: items?.door_no,
    });
    setOpenModal(true);

    // setVehicleDriverAllocation({
    //   data: { ...items, active: items?.active === 1 ? true : false },
    // });
  };

  const changeMainActivityForm = (val: any, name: any) => {
    setformValue({ ...formValue, [name]: val });
    if (name === 'activity') {
      setFormValueAddVehicles((prev: any) => ({
        ...prev,
        vehicle_type: [],
        series: [],
      }));
    }

    if (name === 'sub_task_no') {
      const filterData: any = data?.filter((item: any) => {
        if (item.name === val) {
          return item;
        }
      });
      setformValue({
        ...formValue,
        loading_point: filterData?.[0]?.loading_point || val,
        unloading_point: filterData?.[0]?.unloding_point || val,
        [name]: val,
      });
    }

    // setSubmitData(prev=>({...prev ,[name]:val}))
  };

  const deleteHandler = (e: any, b: any, record: any) => {
    const vehicleDrivers = vehicleDriverAllocation.filter((item: any) => {
      if (record.full_name !== item.full_name) {
        return true;
      }
      return false;
    });

    setformValue((prev: any) => ({
      ...prev,
      no_of_vehicles: prev?.no_of_vehicles - 1,
    }));

    setVehicleDriverAllocation([...vehicleDrivers]);

    // setVehicleDriverAllocation()
  };

  const onhandleFinish = (value: any) => {
    const updateAllocation = [...vehicleDriverAllocation];
    updateAllocation.forEach((item: any) => {
      if (item.ids === selectedRecord?.ids) {
        item.door_no = value?.vehicle_number
          ? value.vehicle_number
          : item.vehicle;
      }
    });
    setActiveVehicleDrivers([...updateAllocation]);
    setOpenModal(false);
  };

  const onsubmitCompletedData = () => {
      setShowQtyLifted(true)
    // }
    // else{
    //   const endPoint = `api.close_activity?activity_id=${
    //     term || localStorage.getItem('taskId')
    //   }`;
    //   onCloseActivity(endPoint).then((items: any) => {
    //     if (items?.status === 200) {
    //       isSuccess(items?.message, 'success');
    //       onCloseActivityDetails();
    //     } else {
    //       onCloseActivityDetails();
    //       isSuccess(items?.message, 'error');
    //     }
    //   });
    // }
   
  };
  const onsubmitAllocateDriver = () => {
    const endPoint = `api.auto_allocate_drivers?activity_id=${term}&type=${formValue?.vehicle_type}`;
    onCloseActivity(endPoint).then((items: any) => {
      setVehicleDriverAllocation(items?.data);
    });
  };

  const addVehicleHandler = (value: any, field: any) => {
    // console.log(field,value,"andd",formValueAddVehicles)
    setFormValueAddVehicles((prev: any) => ({ ...prev, [field]: value }));
    // setFormValueAddVehicles({})
    if (field === 'vehicle_type') {
      setFormValueAddVehicles((prev: any) => ({ ...prev, series: [] }));
      const formDatas = formDataAddVehicles.map((item: any) => {
        if (item.name === 'series') {
          return { ...item, options: [], datatype: 'Select' };
        }
        return item;
      });
      setFormDataAddVehicles(formDatas);
    }
  };

  const addVehicleSubmit = (record: any) => {
    const datas = [...formData];
    datas.forEach((item: any) => {
      if (item.name === 'activity') {
        item.readonly = true;
      }
    });
    setformData(datas);

    const noOfVehiclesAvailable = parseInt(
      formValueAddVehicles?.no_of_vehicles_availabel
    );
    const numberOfVehicles = parseInt(formValueAddVehicles?.no_of_vehicles);
    let newvehicleDriverAllocation = [];
    if (numberOfVehicles <= noOfVehiclesAvailable) {
      if (numberOfVehicles !== 0) {
        newvehicleDriverAllocation = checkDuplicateData(
          0,
          activeVehicleDrivers,
          numberOfVehicles,
          formValueAddVehicles?.vehicle_type
        );
      } else if (numberOfVehicles === 0) {
        newvehicleDriverAllocation = [];
      }
      if (vehicleDriverAllocation) {
        setVehicleDriverAllocation([
          ...(vehicleDriverAllocation || []),
          ...newvehicleDriverAllocation,
        ]);
      } else {
        setVehicleDriverAllocation(newvehicleDriverAllocation);
      }

      // setVehicleDriverAllocation([
      //   ...(vehicleDriverAllocation || []),
      //   ...newvehicleDriverAllocation,
      // ]);
    } else {
      // isSuccess("", "error")
    }
    // setFormValueAddVehicles([])
    setFormValueAddVehicles({});
  };

  const checkDuplicateData = (
    dataIndex: number,
    data: any,
    numberOfVehicles: any,
    vehicle_type: any
  ): any => {
    const filteredData = data.filter(
      (item: any) =>
        !vehicleDriverAllocation?.some(
          (item2: any) => item.driver_name === item2.driver_name
        )
    );
    const datas = filteredData.slice(dataIndex, dataIndex + numberOfVehicles);
    const checkduplicate = vehicleDriverAllocation?.some(
      (value: any) => value.driver_name === datas[0]?.driver_name
    );

    if (checkduplicate) {
      const index = vehicleDriverAllocation?.findIndex(
        (value: any) => value.vehicle_type === vehicle_type
      );

      if (index !== -1) {
        return checkDuplicateData(index + 1, data, numberOfVehicles, null);
      }
    } else {
      return datas;
    }
  };

  const handleChange = (check: any) => {
    setIsChecked(check);
  };

  const onSubmitData = (values:any) => {
    console.log(values, "values")
      const endPoint = `api.close_activity?activity_id=${
        term || localStorage.getItem('taskId')
      }&quantity_lifted=${values?.quantity_lifted}`;
      onCloseActivity(endPoint).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          setShowQtyLifted(false);
          onCloseActivityDetails();
        } else {
          onCloseActivityDetails();
          isSuccess(items?.message, 'error');
        }
      }); 
    
    }

  return (
    <div className={style.activityForm}>
      <Spin loading={loading} />
      <TwoFormWrapper
        formValue={formValue}
        formData={formData}
        dynamicLayout={true}
        onChange={changeMainActivityForm}
        isformSelect={true}
      />
      {/* const [formValueAddVehicles,setFormDataAddVehicles]=useState([{}]) */}
      <Row>
        <Col span={22}>
          <p className={style.formHeading}>Vehicles Allocation</p>
        </Col>
        <Col span={2}>
          <Switch
            style={{
              background: isChecked ? '#272083' : '',
            }}
            checkedChildren="Automatic"
            unCheckedChildren="Manual"
            disabled={false}
            onChange={handleChange}
            defaultChecked
          />
        </Col>
      </Row>

      <FormWrapper
        formData={
          isChecked
            ? formValue?.activity
              ? formDataAddVehicles
              : disableAllFieldsHandler(formDataAddVehicles)
            : ManualUploadFormData
        }
        formValue={formValueAddVehicles}
        dynamicLayout={true}
        submitButtonLabel="Add"
        cancelButtonLabel="Clear"
        onhideCancelButton={true}
        onChange={addVehicleHandler}
        handleFinish={addVehicleSubmit}
        reset={true}
      />
      {vehicleDriverAllocation?.length > 0 ? (
        <Table
          dataSource={vehicleDriverAllocation}
          column={columns}
          onlyEditRow={tableEditRow}
          deletehandler={deleteHandler}
        />
      ) : null}
      <div className={style.activityForm__actions}>
        {/* <Button
          className={style.activityForm__actions__cancel}
          htmlType="submit"
          type="default"
          onClick={onsubmitAllocateDriver}
          disabled={!formValue?.allocation_data_history}
        >
          Allocate Drivers
        </Button> */}
        {vehicleDriverAllocation?.length > 0 && (
          <>
            <Button
              className={style.activityForm__actions__cancel}
              htmlType="submit"
              type="default"
              onClick={() => onsubmitCompletedData()}
              disabled={!term}
            >
              Mark as Complete
            </Button>

            <Button
              className={style.activityForm__actions__submit}
              htmlType="submit"
              type="primary"
              onClick={submitActivity}
              disabled={vehicleDriverAllocation?.length === 0}
              // disabled={!submittable}
            >
              Submit
            </Button>
          </>
        )}
      </div>
      {showQtyLifted ? (
        <Modal
          title="Quantity Details"
          open={showQtyLifted}
          width={'50%'}
          style={{ top: 170 }}
          onCancel={() => setShowQtyLifted(false)}
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
  
              }
              ]}
              formValue={driverFormValue}
              dynamicLayout={true}
              // cancelButtonLabel="Clear"
              handleCancel={()=>{
                setShowQtyLifted(false)
              }}
              handleFinish={onSubmitData}
            />
          </div>
        </Modal>
      ) : null}

      {openModal ? (
        <Modal
          title="Change Vehicle"
          open={openModal}
          width={'50%'}
          style={{ top: 170 }}
          onCancel={() => setOpenModal(false)}
          // onOk={handleVehicleDriverChange}
          footer={null}
        >
          <div className={style.taskModalInner}>
            <FormWrapper
              formData={[...editDriverDetails]}
              formValue={driverFormValue}
              dynamicLayout={true}
              // cancelButtonLabel="Clear"
              handleCancel={()=>{
                setOpenModal(false)
              }}
              handleFinish={onhandleFinish}
            />
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Create;
