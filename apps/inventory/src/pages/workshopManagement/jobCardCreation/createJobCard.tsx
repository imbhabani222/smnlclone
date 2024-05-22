import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import {
  dateFormat,
  datetoFrom,
  setFormData,
} from '../../../../../../libs/common/utils/common';
// import JobCardFilter from '../helper/workshopFilter';
import dayjs from 'dayjs';

type Props = {};

const statusFilterOptions = [
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Pending', label: 'Pending' },
];

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>({ used_for: 'Vehicle Use' });
  const [filteredData, setFilteredData] = useState([]);
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });
  const [searchParams, _] = useSearchParams();

  const reqFields = [
    'used_for',
    'priority',
    'date',
    'supervisor',
    'section',
    'driver',
    // 'exp_delivery_date',
    'machanic',
    'service_type',
    'vehicle_type',
    'vehicle_no',
    'hours_reading',
  ];
  const term = searchParams.get('id');
  useEffect(() => {
    // getDesignationWiseEmployee(
    //   'employee_management.doctype.personal_details.api.search_by_designation?designation=["Work Shop Incharge"]',
    //   'htssuite'
    // ).then((items: any) => {
    //   console.log(items, 'suppervisor');
    // });

    getFields('Inventory Job Card Creation', 'htssuite').then((items) => {
      items.forEach((item: any) => {
        if (item.name === 'exp_delivery_date') {
          item.options = {
            type: 'future',
            value: moment().format('YYYY/MM/DD'),
          };
        }
        if (item.name === 'date') {
          item.description = {
            format: 'DD/MM/YYYY hh:mm:ss',
          };
        }
        if (item.name === 'vehicle_no') {
          item.options = 'vehicles';
          item.datatype = 'Link';
        }
        if (
          item.name === 'supervisor' ||
          item.name === 'driver' ||
          item.name === 'machanic'
        ) {
          item.datatype = 'TableSelect';
          item.description = {
            ...item.description,
            colSpan: '3',
          };
          item.columns = [
            {
              title: 'Code',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Name',
              dataIndex: 'full_name',
              key: 'full_name',
            },
            {
              title: item.name === 'supervisor' ? 'Section' : 'Designation',
              dataIndex:
                item.name === 'supervisor' ? 'section_name' : 'designation',
              key: item.name === 'supervisor' ? 'section_name' : 'designation',
            },
          ];
          item.searchIndexes = [
            'name',
            'full_name',
            'section_name',
            'designation',
          ];
        }
      });
      // const newItems = items.map((e: any) => {
      //   if (reqFields.includes(e?.name)) {
      //     return {
      //       ...e,
      //       isReq: true,
      //     };
      //   } else {
      //     return { ...e };
      //   }
      // });

      const filterVehicleUse = items.filter(
        (i: any) =>
          i.name !== 'upload_doc' &&
          i.name !== 'section' &&
          i.name !== 'labourother_charges' &&
          i.name !== 'third_party_vehicle_no'
      );
      const newDats: any = filterVehicleUse.map((e: any) => {
        if (reqFields.includes(e?.name)) {
          return {
            ...e,
            isReq: true,
          };
        } else {
          return { ...e };
        }
      });
      setformData(newDats);
      // setformData(newItems);
      setFilteredData(items);
    });
    if (!term) {
      const date = moment();
      setformValue({
        date: dayjs(),
      });
    }
  }, []);

  useEffect(() => {
    if (term && filteredData?.length > 0) {
      const data = { name: term };
      getRecordById(
        'inventory_job_card_creation',
        data,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items) => {
        getEditJobCardFields(items?.used_for);
        setformValue({
          ...items,
          date: datetoFrom(items?.date),
          exp_delivery_date: datetoFrom(items?.exp_delivery_date),
        });
      });
    }
  }, [filteredData, term]);


  const getEditJobCardFields = (val: any) => {
    if (val === 'Vehicle Use') {
      const filterVehicleUse = filteredData.filter(
        (i: any) =>
          i.name !== 'upload_doc' &&
          i.name !== 'section' &&
          i.name !== 'labourother_charges' &&
          i.name !== 'third_party_vehicle_no'
      );
      const newItems: any = filterVehicleUse.map((e: any) => {
        if (
          ['remarks', 'complaint', 'km_reading', 'hours_reading'].includes(
            e?.name
          )
        ) {
          return {
            ...e,
            readonly: false,
          };
        } else {
          return { ...e, readonly: true };
        }
      });
      setformData(newItems);
      // setformValue({...formValue})
    }
    if (val === 'General Use') {
      const filteredGeneralUse = filteredData.filter(
        (i: any) =>
          i.name === 'used_for' ||
          i.name === 'priority' ||
          i.name === 'date' ||
          i.name === 'supervisor' ||
          i.name === 'section' ||
          i.name === 'complaint' ||
          i.name === 'labourother_charges' ||
          (i.name === 'section' && i.name !== 'third_party_vehicle_no')
      );
      const newItems: any = filteredGeneralUse.map((e: any) => {
        if (['remarks', 'labourother_charges'].includes(e?.name)) {
          return {
            ...e,
            readonly: false,
          };
        } else {
          return { ...e, readonly: true };
        }
      });
      setformData(newItems);
    }
    if (val === 'Thirdparty Use') {
      const filteredThirdparty = filteredData.filter(
        (i: any) =>
          i.name === 'used_for' ||
          i.name === 'priority' ||
          i.name === 'date' ||
          i.name === 'supervisor' ||
          i.name === 'third_party_vehicle_no' ||
          i.name === 'remarks' ||
          i.name === 'labourother_charges' ||
          i.name === 'upload_doc' ||
          i.name === 'company_name'
      );

      const newItems: any = filteredThirdparty.map((e: any) => {
        if (['remarks'].includes(e?.name)) {
          return {
            ...e,
            readonly: false,
          };
        } else {
          return {
            ...e,
            readonly: true,
          };
        }
      });
      setformData(newItems);
    }
  };
  const onChangeUserFor = (val: any, fieldName: any) => {
    if (val === 'Vehicle Use') {
      const filterVehicleUse = filteredData.filter(
        (i: any) =>
          i.name !== 'upload_doc' &&
          i.name !== 'section' &&
          i.name !== 'labourother_charges' &&
          i.name !== 'third_party_vehicle_no'
      );
      const newItems: any = filterVehicleUse.map((e: any) => {
        if (reqFields.includes(e?.name)) {
          return {
            ...e,
            isReq: true,
          };
        } else {
          return { ...e };
        }
      });
      setformData(newItems);
    }
    if (val === 'General Use') {
      const filteredGeneralUse = filteredData.filter(
        (i: any) =>
          i.name === 'used_for' ||
          i.name === 'priority' ||
          i.name === 'date' ||
          i.name === 'supervisor' ||
          i.name === 'section' ||
          i.name === 'complaint' ||
          (i.name === 'section' && i.name !== 'third_party_vehicle_no')
      );
      const newItems: any = filteredGeneralUse.map((e: any) => {
        if (reqFields.includes(e?.name)) {
          return {
            ...e,
            isReq: true,
          };
        } else {
          return { ...e };
        }
      });
      setformData(newItems);
    }
    if (val === 'Thirdparty Use') {
      const filteredThirdparty = filteredData.filter(
        (i: any) =>
          i.name === 'used_for' ||
          i.name === 'priority' ||
          i.name === 'date' ||
          i.name === 'supervisor' ||
          // i.name === 'section' ||
          i.name === 'third_party_vehicle_no' ||
          i.name === 'remarks' ||
          i.name === 'labourother_charges' ||
          // i.name === 'section' ||
          // i.name === 'third_party_vehicle_no' ||
          i.name === 'upload_doc' ||
          i.name === 'company_name'

        // i.name === 'vehicle_no'
      );

      const newItems: any = filteredThirdparty.map((e: any) => {
        if (reqFields.includes(e?.name)) {
          return {
            ...e,
            isReq: true,
          };
        } else {
          if (e?.name === 'upload_doc') {
            return {
              ...e,
              isReq: true,
            };
          } else {
            return { ...e };
          }
        }
      });
      setformData(newItems);
    }
    if (fieldName === 'vehicle_no') {
      getTableData(
        'vehicles',
        'fuel_management',
        'htsinventory',
        JSON.stringify({ name: val })
      ).then((item: any) => {
        setformValue({ ...formValue, vehicle_type: item?.[0]?.vehicle_type });
      });
    }

    if (
      ['complaint', 'remarks'].includes(fieldName) &&
      typeof val === 'object'
    ) {
      val = '';
    }
    setformValue({ ...formValue, [fieldName]: val });
  };

  const handleFinish = (e: any) => {
    console.log(e, 'e');
    if (term) {
      let payload = {};
      if (e?.status === 'Rejected') {
        payload = {
          name: term,
          data: {
            approval_remarks: e?.approval_remarks?.remarks || e?.remarks,
            status: 'Cancelled',
          },
        };
      } else {
        payload = {
          name: term,
          data: {
            ...e,
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            // exp_delivery_date: dateFormat(e?.exp_delivery_date),
          },
        };
      }

      updateRecord(
        'inventory_job_card_creation',
        payload,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items: any) => {
        // eslint-disable-next-line no-lone-blocks
        {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-job-card');
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      });
    } else {
      const record = {
        ...e,
        date: moment().format('YYYY-MM-DD HH:mm'),
      };

      createRecord(
        'inventory_job_card_creation',
        record,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-job-card');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  const onHandleImageUpload = (file: any) => {
    setformValue({ ...formValue, upload_doc: file?.originalfile });
  };
  return (
    <FormWrapper
      formValue={formValue}
      formData={formData}
      handleFinish={handleFinish}
      onChange={onChangeUserFor}
      appname="htsinventory"
      dynamicLayout
      handleImageUpload={onHandleImageUpload}
      cancelButtonLabel={term ? 'Back' : 'Cancel'}
      isReject={term ? true : false}
      rejectButtonLabel="Cancel Job Card"
    />
  );
};

export default Create;
