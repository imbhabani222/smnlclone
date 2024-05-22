import React, { useEffect, useState } from 'react';
import {
  getFields,
  getRecordById,
  createRecord,
  updateRecord,
  getRecordsById,
} from '../../../../../../../libs/common/api/doctype';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';
import {
  CustomiseData,
  removeEmployeCodeFields,
  addExtraFields,
} from '../../../../../../../libs/common/ui/Form/FormHelper';
import { useNavigate, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import dayjs from 'dayjs';
import {
  setFormData,
  dependOnData,
  dateFormat,
  datetoFrom,
} from '../../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import Spin from '../../../../../../../libs/common/ui/Loader/spinLoader';

type Props = { doc_id: string | null; switchToNextTab?: any; url?: string };

const Create = (props: Props) => {
  const { doc_id, switchToNextTab = () => {} } = props;
  const [formData, setformData] = useState<any>({
    originalformData: [],
    dependsdata: [],
  });
  const navigate = useNavigate();
  const [dependData, setdependData] = useState<any>([]);
  const [formValues, setFormValues] = useState<any>({});
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState<any>()
  const id = searchParams.get('id');
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    setLoading(true)
    getFields('Official Details', 'htssuite').then((items: any) => {
      const newData = CustomiseData(items, { addCheckboxColSpan: true });

      let newItems: any = addExtraFields(newData, [
        {
          name: 'first_name',
          module: 'employee_management',
        },
        {
          name: 'first_name_duplicate',
          module: 'employee_management',
        },
      ]);
      newItems.forEach((item: any) => {
        if (item.name === 'date_of_joining') {
          item.options = 'past';
        }
        if (item.name === 'old_date_of_joining') {
          item.options = 'past';
        }
        if (item.name === 'probation_date') {
          item.options = 'future';
        }
        if (item.name === 'confirmation_date') {
          item.options = 'future';
        }
      });
      setformData({
        originalformData: newItems,
        dependsdata: newItems,
      });

      setLoading(false)

      const data: any = setFormData(newData);
      (!doc_id || !id) && setFormValues(data);
    });
    if (doc_id || id) {
      setLoading(true)
      const data = { name: doc_id || id };
      getRecordById(
        'official_details',
        data,
        'employee_management',
        'htssuite'
      ).then((items) => {
        const item = items?.[0];
        if (item?.name) {
          const da = {
            ...item,
            old_date_of_joining: datetoFrom(item?.old_date_of_joining),
            date_of_joining: datetoFrom(item?.date_of_joining),
            confirmation_date: datetoFrom(item?.confirmation_date),
            probation_date: datetoFrom(item?.probation_date),
          };

          setDoc(item?.name);
          setFormValues(da);
          setLoading(false)
          
        }
      });

      getRecordById(
        'personal_details',
        data,
        'employee_management',
        'htssuite'
      ).then((items:any) => {
        const da = {
          // ...items,
          date_of_birth: datetoFrom(items?.date_of_birth),
        };
        setDateOfBirth(da)        
        // setFormValues(da);
        setLoading(false)
      });
  
    }
  }, [doc_id, id]);
  

  const handleFinish = (values: any) => {
    if ((doc_id || id) && doc) {
      setLoading(true)
      const record = {
        doc_id: doc,
        data: {
          emp_code: doc_id || id,
          ...values,
          old_date_of_joining: dateFormat(values?.old_date_of_joining),
          date_of_joining: dateFormat(values?.date_of_joining),
          confirmation_date: dateFormat(values?.confirmation_date),
       },
      };
      updateRecord(
        'official_details',
        record,
        'employee_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/address-details');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    } else {
      setLoading(true)
      const record = {
        ...formValues,
        ...values,
        emp_code: doc_id || id,
        old_date_of_joining: dateFormat(values?.old_date_of_joining),
        date_of_joining: dateFormat(values?.date_of_joining),
        confirmation_date: dateFormat(values?.confirmation_date),
        probation_date: dateFormat(values?.probation_date),
      };
      createRecord(
        'official_details',
        record,
        'employee_management',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/address-details');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    }
  };

  useEffect(() => {
    if (doc_id || id) {
      if (formValues?.date_of_joining) {
        const formDatats: any[] = formData?.originalformData;
        formDatats?.forEach((item) => {
          if (item.name === 'probation_date') {
            item.options = { 
              type: 'future',
              value: moment(formValues?.date_of_joining?.$d, "YYYY-MM-DD").add(1, 'day').format("YYYY-MM-DD") 
            };
          }
          if (item.name === 'old_date_of_joining') {
            item.options = {
              type : 'past',
              value : moment(formValues?.date_of_joining?.$d, "YYYY-MM-DD").subtract(1, 'day').format("YYYY-MM-DD") 
            }
          }
        });
        setformData({
          ...formData,
          originalformData: formDatats,
        });
      }
      if (formValues?.probation_date) {
        const formDatats: any[] = formData?.originalformData;
        formDatats?.forEach((item) => {
          if (item.name === 'confirmation_date') {
            item.options = { 
              type: 'future',
              value: moment(formValues?.probation_date?.$d, "YYYY-MM-DD").add(1, 'day').format("YYYY-MM-DD") 
              };
  
          }
        });
        setformData({
          ...formData,
          originalformData: formDatats,
        });
      }
      if (formValues?.old_date_of_joining) {
        const formDatats: any[] = formData?.originalformData;
        formDatats?.forEach((item) => {
          if (item.name === 'date_of_joining') {
            item.options = {
              type: 'enable_only_two_custom_date',
              startDate: formValues?.old_date_of_joining,
              endDate: moment(new Date()),
            };
          }
          if (item.name === 'probation_date' && formValues?.date_of_joining) {
            item.options = {
                type: 'future',
                value: moment(formValues?.date_of_joining?.$d, "YYYY-MM-DD").add(1, 'day').format("YYYY-MM-DD"),
            }
          }
        });
        setformData({
          ...formData,
          originalformData: formDatats,
        });
      }
      if (dateOfBirth) {        
        const formDatas: any[] = formData?.originalformData;
        formDatas?.forEach((item)=>{
          if (item.name ==='date_of_joining' ) {
            item.options = {
              type : 'enable_only_two_custom_date',
              startDate : moment(dateOfBirth?.date_of_birth?.$d, 'YYYY-MM-DD').add(18,'years').format('YYYY-MM-DD'),
              endDate : moment()
            }
            
          }
        })
        setformData({
          ...formData,
          originalformData : formDatas
        })
      }
    }
   
  }, [formValues?.date_of_joining, formValues?.probation_date,formValues?.old_date_of_joining,dateOfBirth]);

  const handleChange = (val: any, name: any, e: any) => {
    const data: any = dependOnData(e, dependData);
      setFormValues({...formValues, [name]:val})
    setdependData(data);
    if (name === 'old_date_of_joining') { 
           setDateOfBirth(null)
      const formDatats: any[] = formData?.originalformData;
      formDatats?.forEach((item) => {
        if (item.name === 'date_of_joining') {                    
          item.options = {
            type: 'enable_only_two_custom_date',
            startDate: val,
            endDate: moment(new Date()),
          };
        }
        if (item.name === 'probation_date' && formValues?.date_of_joining) {
          item.options = {
              type: 'future',
              value: moment(formValues?.date_of_joining?.$d, "YYYY-MM-DD").add(1, 'day').format("YYYY-MM-DD"),
          }
        }
      });
      
      setformData({
        ...formData,
        originalformData: formDatats,
      });
    }
    if (name === 'date_of_joining') {
      const formDatats: any[] = formData?.originalformData;
      formDatats?.forEach((item) => {
        if (item.name === 'probation_date') {
          item.options = {
              type: 'future',
              value: moment(val?.$d, "YYYY-MM-DD").add(1, 'day').format("YYYY-MM-DD"),
          }
        }
        if (item.name === 'old_date_of_joining') {
          item.options = { type: 'past', value: val };
        }
      });
      setformData({
        ...formData,
        originalformData: formDatats,
      });
    }
    if (name === 'probation_date') {
      const formDatats: any[] = formData?.originalformData;
      formDatats?.forEach((item) => {
        if (item.name === 'confirmation_date') {
          item.options = {
            type: 'future',
            value: moment(val?.$d, "YYYY-MM-DD").add(1, 'day').format("YYYY-MM-DD"),
        }        }
        if (item.name === 'date_of_joining') {
          if(formValues?.old_date_of_joining) {
            item.options = {
              type: 'enable_only_two_custom_date',
              startDate: formValues?.old_date_of_joining,
              endDate: val,
            };
          }
          else{
            if (item.name === 'date_of_joining') {
              item.options = { type: 'past', value: moment(val?.$d, "YYYY-MM-DD").subtract(1, 'day').format("YYYY-MM-DD") };
            }
          }
          
        }

      });
      setformData({
        ...formData,
        originalformData: formDatats,
      });
    }
    if (name === 'confirmation_date') {
      const formDatats: any[] = formData?.originalformData;
      formDatats?.forEach((item) => {
        if (item.name === 'probation_date') {
          item.options = { type: 'past', value: val };
        }
      });
      setformData({
        ...formData,
        originalformData: formDatats,
      });
    }
  };
  const handleCancel = () => {
    navigate('/view-employee-details');
  };
  return (
    <>
    <Spin loading={loading}/>
      <FormWrapper
        formData={formData?.dependsdata}
        formValue={formValues}
        handleFinish={handleFinish}
        submitButtonLabel="Save & Continue"
        removeEmployeeCode={true}
        appname="htssuite"
        onChange={handleChange}
        dependsData={dependData}
        dynamicLayout
        handleCancel={handleCancel}
      />
    </>
  );
};

export default Create;
