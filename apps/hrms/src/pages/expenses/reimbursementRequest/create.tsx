import { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
import moment from 'moment';
import dayjs from 'dayjs';
import {
  setFormData,
  datetoFrom,
  dateFormat,
  employeeSelectDropDown
} from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>({
    grade_name: '',
    active: false,
  });
  const [exe, setexe] = useState('');
  const [imageData, setimageData] = useState<any>({});
  let [searchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Reimbursement Request', 'htssuite').then((items) => {
      const its = items.filter(
        (e: any) =>
          e.name !== 'approved_by' &&
          e.name !== 'approved_date' &&
          e.name !== 'approved_claim_amt'
      );
      let newItems: any = addExtraFields(its, [
        {
          name: 'email',
          module: 'employee_management',
        },
      ]);
      const updatedItems = newItems.map((item: any) => {
        if (item.name === 'employee') {
         return employeeSelectDropDown(item);
        }
      
        if (item.name === 'request_date') {
          return { ...item, defaultValue: dayjs(), readonly: true };
        }
      
        if (item.name === 'bill_date') {
          return { ...item, disabled: true };
        }
      
        if (item.name === 'upload_file') {
          return {
            ...item,
            description: {
              accept:
                'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              fileType: 'Only .pdf',
              type: 'application/pdf',
            },
          };
        }
       if (item.datatype === 'Date') {
          return { ...item, options: 'past' };
        }
        return item;
      });
    
      setformData(updatedItems);
      const data: any = setFormData(newItems);
      !term && setformValue(data);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'reimbursement_request',
        data,
        'expense_&_reimbursement',
        'htssuite'
      ).then((items) =>
        setformValue({
          ...items,
          employee_id : items?.employee?.name,
          employee : items?.employee?.employee_name,
          active: items?.active === 1 ? true : false,
          request_date: datetoFrom(items?.request_date),
          claim_from_date: datetoFrom(items?.claim_from_date),
          claim_to_date: datetoFrom(items?.claim_to_date),
          bill_date: datetoFrom(items?.bill_date),
        })
      );
    }
  }, [term]);


  

  useEffect(() => {
    const data = [...formData];
    data.forEach((item: any) => {
      if (item.name === 'bill_date') {
        item.options = {
          type: 'enable_only_two_custom_date',
          startDate:formValue?.claim_from_date ? moment(formValue?.claim_from_date?.$d || formValue?.claim_from_date).subtract(1, 'day') : undefined,
          endDate: formValue?.claim_to_date || moment(new Date()),
        };
        item.disabled = false;
      }
    });
    setformData(data);
    setformValue({ ...formValue });
  }, [formValue?.claim_from_date, formValue?.claim_to_date]);
  const handleImageUpload = (e: {}, exe: string) => {
    setimageData(e);
    setexe(exe);
  };
  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        doc_id: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
          request_date: dateFormat(e?.request_date),
          claim_from_date: dateFormat(e?.claim_from_date),
          claim_to_date: dateFormat(e?.claim_to_date),
          bill_date: dateFormat(e?.bill_date),
          upload_file: imageData?.originalfile || formValue?.upload_file,
          extention: exe,
          employee : formValue?.employee_id,
          claim_name : formValue?.claim_name?.name
        },
      };
      updateRecord(
        'reimbursement_request',
        record,
        'expense_&_reimbursement',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-reimbursement-request');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
        request_date: dateFormat(e?.request_date),
        claim_from_date: dateFormat(e?.claim_from_date),
        claim_to_date: dateFormat(e?.claim_to_date),
        bill_date: dateFormat(e?.bill_date),

        upload_file: imageData?.originalfile || null,
        extention: exe ? exe : null,
      };
      
      createRecord(
        'reimbursement_request',
        record,
        'expense_&_reimbursement',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-reimbursement-request');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  const onHandleChange = (value: any, key: any) => {
    setformValue({ ...formValue, [key]: value });
    if (key === 'claim_from_date') {
      const formDatas = [...formData];
      formDatas?.forEach((item: any) => {
        if (item.name === 'claim_to_date') {
          item.options = {
            type: 'enable_only_two_custom_date',
            startDate: moment(value?.$d).add(0, 'day'),
            endDate: moment(new Date()),
          };
        }
      });
      setformData(formDatas);
    }
    if (key === 'claim_to_date') {
      const formDatas = [...formData];
      formDatas?.forEach((item: any) => {
        if (item.name === 'claim_from_date') {
          item.options = {
            type: 'past',
            value: value,
          };
        }
      });

      setformData(formDatas);
    }
  };

  

  // useEffect(()=>{
  //   if(formValue?.claim_from_date && formValue?.claim_to_date){
  //     const fromDate = moment(formValue?.claim_from_date).format("YYYY-MM-DD")
  //     const toDate = moment(formValue?.claim_to_date).format("YYYY-MM-DD")
  //    const result =  moment(fromDate).isAfter(toDate, 'day')
  //     console.log(result, "result")

  //   }

  // },[formValue?.claim_from_date, formValue?.claim_to_date])
  return (
    <>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        onChange={onHandleChange}
        multiple={true}
        appname="htssuite"
        handleImageUpload={handleImageUpload}
        dynamicLayout
      />
    </>
  );
};

export default Create;
