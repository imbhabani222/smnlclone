import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getJobCardClose,
  updateRecord,
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
import Cookies from 'universal-cookie';
import {
  setFormData,
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';

const fields = [
  'used_for',
  'name',
  'date',
  'priority',
  'driver',
  'machanic',
  'supervisor',
  'vehicle_type',
  'vehicle_no',
  'complaint'
];

const columnsData = [
  {
    title: 'PART',
    key: 'part',
    dataIndex: 'part',
    render: (_: any, record: any) => record?.part_name,
  },
  {
    title: 'UOM',
    key: 'uom',
    dataIndex: 'uom',
    render: (_: any, record: any) => record?.uom_name,
  },
  {
    title: 'Required Qty',
    key: 'required_qty',
    dataIndex: 'required_qty',
  },
];
const Create = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [formData, setformData] = useState<any>([]);
  const [formValue, setformValue] = useState<any>({
    status: 'Requested',
  });
  const [data, setdata] = useState<any>([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    const disableits: any = [];
    getFields('Inventory Job Card Creation', 'htssuite').then((items) => {
      items?.map((e: any) => {
        if (fields.includes(e.name)) {
          if(e.name === 'complaint') {
            disableits.push({
             ...e,
             disabled: true,
             hidden :  formValue?.complaint ? 0 : 1
            })
          }
          else if(e.name === 'vehicle_no'){
            disableits.push({
              ...e,
              disabled: true,
              hidden :  formValue?.vehicle_no ? 0 : 1
             })
          }
          else{
            disableits.push({
              ...e,
              disabled: true,
            });
          }
          
        }
      });
      disableits.push({
        label: '',
        name: '',
        datatype: 'Column Break',
      });
      //   disableits.push({
      // /complaint/     colSpan: 1,
      //     label: 'Product Details',
      //     name: '',
      //     datatype: 'table',
      //     isReq: true,
      //     dataSource: data,
      //     column: columns,
      //   });
      disableits.push({
        colSpan: 24,
        label: '',
        name: '',
        datatype: 'Column Break',
      });
      disableits.push(
        // {
        //   colSpan: 3,
        //   label: 'Next Service Kilometer',
        //   name: 'next_service_km_reading',
        //   datatype: 'Data',
        //   isReq: true,
        //   description: items?.next_service_km_reading,
        //   default: items?.default,
        //   options: null,
        //   hidden: false,
        //   depends_on: null,
        //   readonly: false,
        // },
        // {
        //   colSpan: 3,
        //   label: 'Next Service Date',
        //   name: 'next_service_date',
        //   datatype: 'Date',
        //   isReq: true,
        //   description: items?.next_service_date,
        //   default: items?.default || null,
        //   hidden: false,
        //   depends_on: null,
        //   readonly: false,
        // },
        // {
        //   colSpan: 3,
        //   label: 'Next Service Hours Reading',
        //   name: 'next_service_hours_reading',
        //   datatype: 'Data',
        //   isReq: false,
        //   description: items?.next_service_hours_reading,
        //   default: items?.default,
        //   options: null,
        //   hidden: false,
        //   depends_on: null,
        //   readonly: false,
        // },
        {
          colSpan: 1,
          label: 'Product Details',
          name: '',
          datatype: 'table',
          data: data,
          column: columnsData,
        },
        {
          colSpan: 24,
          label: '',
          name: '',
          datatype: 'Column Break',
        },
        {
        label: 'Labour Other Charges',
        name: 'labourother_charges',
        datatype: 'Data',
        isReq: false,
        options: null,
        hidden: formValue?.used_for === 'Thirdparty Use' ? 0 : 1,
        depends_on: null,
        readonly: false,
        },
        {
          colSpan: 2,
          label: 'Close Remarks',
          name: 'close_remarks',
          datatype: 'Long Text',
          isReq: true,
          description: items?.close_remarks,
          default: items?.default,
          options: null,
          hidden: false,
          depends_on: null,
          readonly: false,
        }
      );
      setformData(disableits);
    });
    // if (term) {
    //   const data = { name: term };
    //   getJobCardClose(
    //     'inventory_job_card_creation.api.job_card_close_get_records',
    //     'inventory_workshop_management',
    //     1,
    //     1,
    //     'htsinventory',
    //     JSON.stringify(data)
    //   ).then((items) => {
    //     const record = items?.data?.[0];
    //     setformValue({ ...record, date: datetoFrom(record?.date) });
    //     setdata(record?.products);
    //   });
    // }
  }, [formValue]);

useEffect(()=>{
  if (term) {
    const data = { name: term };
    getJobCardClose(
      'inventory_job_card_creation.api.job_card_close_get_records',
      'inventory_workshop_management',
      1,
      1,
      'htsinventory',
      JSON.stringify(data)
    ).then((items) => {
      const record = items?.data?.[0];
      setformValue({ ...record, date: datetoFrom(record?.date) });
      setdata(record?.products);
    });
  }
}, [term])

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        name: term,
        data: {
          approval_remarks: e?.close_remarks,
          status: 'Closed',
          // next_service_km_reading: e?.next_service_km_reading,
          // next_service_date: dateFormat(e?.next_service_date),
          // service_date: dateFormat(Date.now()),
          // next_service_hours_reading: e?.next_service_hours_reading,
        },
      };

      updateRecord(
        'inventory_job_card_creation',
        record,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-job-card-close');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };
  // const onImageUpload = (file: any, exs: any, name: any) => {
  //   setformValue({ ...formValue, [name]: file?.originalfile || null });
  // };


  return (
    <div>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        dynamicLayout
        submitButtonLabel="Close"
        // handleImageUpload={onImageUpload}
        // isReject={true}
      />
    </div>
  );
};

export default Create;
