import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
import {
  setFormData,
  dateFormat,
  datetoFrom,
  updateDependOnData,
  employeeSelectDropDown
} from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import moment from 'moment';
import dayjs from 'dayjs';

type Props = { mode?: any };
const Create = (props: Props) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [formData, setformData] = useState<any>([]);
  const [formValue, setformValue] = useState<any>({});
  const [dependData, setdependData] = useState<any>([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const [exe, setexe] = useState('');
  const [imageData, setimageData] = useState<any>({});
  const term = searchParams.get('id');
  const mode = searchParams.get('mode');
  const [dateRange, setDateRange] = useState({
    type: '',
    startDate: {},
    endDate: {},
  });

  useEffect(() => {
    getFields('Travel Request', 'htssuite').then((items) => {
      const its = items.filter(
        (e: any) =>
          e.name !== 'approved_by' &&
          e.name !== 'approved_date' &&
          e.name !== 'approved_claim_amt' &&
          e.name !== 'requested_to'
      );
      let newItems: any = addExtraFields(its, [
        {
          name: 'email',
          module: 'employee_management',
        },
      ]);
      newItems = newItems.map((item: any) => {
        if (mode === 'view' && item.name !== 'remarks') {
          item.disabled = true;
        } else if (mode !== 'view' && item.name === 'remarks') {
          item.hidden = 1;
        }
        return item;
      });      

      const updatedFields = newItems.map((item: any) => {        
        if (item.name === 'travel_requested_for') {
          if (term) {
            item.disabled = true
          }else{
            return employeeSelectDropDown(item);
          }
        }
        if (item.datatype === 'Date') {
          item.options = 'future';
        }
        if (item.name === 'travel_request_date') {
          item.default = dayjs();
          item.disabled = true;
        }
        if (item.name === "return_date") {
          item.isReq = true

        }
        
        return item
      });

      setformData({
        originalformData: updatedFields,
        dependsdata: updatedFields,
      });
      const data: any = setFormData(updatedFields);
      !term && setformValue(data);
    });
    if (term) {
      const data = { doc_id: term };
      getRecordById(
        'travel_request',
        data,
        'travel_requisition',
        'htssuite'
      ).then((items: any) => {

        setformValue({
          ...items,
          active: items?.active === 1 ? true : false,
          travel_requested_for: items?.travel_requested_for?.employee_code,
          travel_requested_for_code: items?.travel_requested_for?.employee_code,

          leaving_date: datetoFrom(items?.leaving_date),

          approved_date_rejected_date_cancelled_date: datetoFrom(
            items?.approved_date_rejected_date_cancelled_date
          ),
          return_date: datetoFrom(items?.return_date),
          travel_request_date: datetoFrom(items?.travel_request_date),
        });
      });
    } else {
      const currentDate = moment().format('YYYY/MM/DD');
      setformValue({
        travel_request_date: datetoFrom(currentDate),
      });
    }
  }, [term]);

  useEffect(() => {
    if (formValue) {
      const data: any = updateDependOnData(formData?.dependsdata, formValue);
      setdependData([...dependData, ...data]);
    }

    if (term) {
      if (formValue?.journey_type === "One Way") {
       const data = dependData;
       const formDatas = formData?.dependsdata;
       formDatas?.forEach((item: any) => {
         if (item.name === "return_date") {
           item.isReq = false
           item.hidden = 1
         }
         if (item.name === 'return_mode') {
           item.hidden = 1
         }
       })
       setformData({
         ...formData,
         dependsdata: formDatas
       }) 
      }
      if (formValue?.accommodation_required === 'No') {
       const formDatas = formData?.dependsdata
       formDatas?.forEach((item: any) => {
         if (item.name === "occupancy_type") {
           item.isReq = false
           item.hidden = 1
         }
       })
       setformData({
         ...formData,
         dependsdata: formDatas
       });
      }
     }
  }, [formValue]);

  


  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        doc_id: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
          // onward_date: dateFormat(e?.onward_date),
          approved_date_rejected_date_cancelled_date: dateFormat(
            e?.approved_date_rejected_date_cancelled_date || new Date()
          ),
          return_date: dateFormat(e?.return_date),
          travel_request_date: dateFormat(e?.travel_request_date),
          travel_requested_for: e?.travel_requested_for_code || e?.travel_requested_for?.employee_code,

          // upload_document: imageData?.file || null,
          // extention: exe,
        },
      };
      updateRecord(
        'travel_request',
        record,
        'travel_requisition',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-travel');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
        // onward_date: dateFormat(e?.onward_date),
        approved_date_rejected_date_cancelled_date: dateFormat(
          e?.approved_date_rejected_date_cancelled_date || new Date()
        ),
        return_date: dateFormat(e?.return_date),
        travel_request_date: dateFormat(e?.travel_request_date),

        travel_requested_for: e?.travel_requested_for_code || e?.travel_requested_for,
        // upload_document: imageData?.file || null,
        // extention: exe,
      };

      createRecord(
        'travel_request',
        record,
        'travel_requisition',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-travel');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };
  const handleImageUpload = (e: {}, exe: string) => {
    setimageData(e);
    setexe(exe);
  };
  const handleChange = (value: any, name: any) => {
    if (name === 'leaving_date') {
      setDateRange((prev) => ({ ...prev, startDate: value }));
      let newFormData = formData.originalformData.map((data: any) => {
        if (data.name === 'return_date') {
          data.startDate = value;
          data.options = {
            type: 'future',
            value: value,
          };
        }
        return data;
      });

      setformData({
        originalformData: formData.originalformData,
        dependsdata: newFormData,
      });
    }
    if (name === 'return_date') {

      setDateRange((prev) => ({ ...prev, startDate: value }));
      let newFormData = formData.originalformData.map((data: any) => {
        if (data.name === 'leaving_date') {
          data.options = {
            type: value === null ? 'future' : 'enable_only_two_custom_date',
            startDate: moment(new Date()),
            endDate: value,
          };
        }
        return data;
      });

      setformData({
        originalformData: formData.originalformData,
        dependsdata: newFormData,
      });
    }

    if (value?.$d && dateRange.type === 'Return') {
      if (name === 'return_date') {

        setDateRange((prev) => ({ ...prev, endDate: value }));
        let newFormData = formData.originalformData.map((data: any) => {
          if (data.name === 'leaving_date' || data.name === 'return_date') {
            data.endDate = value;
          }
          return data;
        });
        setformData({
          originalformData: newFormData,
          dependsdata: newFormData,
        });
      }
    }

    if (value === 'One Way') {
      const data = dependData;
      const formDatas = formData?.dependsdata;
      formDatas?.forEach((item: any) => {
        if (item.name === "return_date") {
          item.isReq = false
          item.hidden= 1
        }
      })
      setformData({
        ...formData,
        dependsdata: formDatas
      })
      const filterData = data.filter((item: any) => item !== name);
      setdependData([...filterData]);
    } else if (value === 'Return') {      
      const formDatas = formData?.dependsdata;
      formDatas?.forEach((item: any) => {
        if (item.name === "return_date") {
          item.isReq = true
          item.hidden = 0
        }
        if (item.name === "return_mode") {
          item.isReq = false
          item.hidden = 0
        }
      })
      setFormData(formDatas)
      setDateRange((prev) => ({ ...prev, type: value }));
      setdependData([...dependData, name]);
    }
    if (name === 'accommodation_required' && value === 'Yes') {
      const formDatas = formData?.dependsdata;
      formDatas?.forEach((item: any) => {
        if (item.name === "occupancy_type") {
          item.isReq = true
          item.hidden = 0
        }
      })
      setformData({
        ...formData,
        dependsdata: formDatas
      });
      setdependData([...dependData, name]);
    } else if (name === 'accommodation_required' && value === 'No') {
      const data = dependData;
      const formDatas = formData?.dependsdata;
      formDatas?.forEach((item: any) => {
        if (item.name === "occupancy_type") {
          item.isReq = false
          item.hidden = 1
        }
      })
      setformData({
        ...formData,
        dependsdata: formDatas
      });
      const filterData = data.filter((item: any) => item !== name);
      setdependData([...filterData]);
    }
  };

  const handleApprove = (e: any) => {

    if (term && formValue?.status === 'Pending') {
      const record = {
        doc_id: term,
        data: {
          approved_date_rejected_date_cancelled_date: dateFormat(new Date()),
          remarks: e?.remarks?.remarks || e?.approval_remarks?.remarks || null,
          status: e?.status || 'Approved',
          approved_by_rejected_by_cancelled_by: cookies.get('userid'),
        },
      };
      updateRecord(
        'travel_request',
        record,
        'travel_requisition',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/travel-approval');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  return (
    <>
      <FormWrapper
        formValue={formValue}
        formData={formData?.dependsdata}
        handleFinish={mode === 'view' ? handleApprove : handleFinish}
        multiple={true}
        appname="htssuite"
        handleImageUpload={handleImageUpload}
        dynamicLayout={true}
        onChange={handleChange}
        dependsData={dependData}
        // reset={true}
        isReject={mode === 'view' ? true : false}
        cancelButtonLabel={mode == 'view' ? 'Cancel' : 'Clear'}
        submitButtonLabel={mode === 'view' ? 'Approve' : 'Submit'}
      />
    </>
  );
};

export default Create;
