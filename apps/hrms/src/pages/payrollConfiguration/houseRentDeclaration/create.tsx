import React, { useEffect, useState} from "react";
import FormWrapper from "../../../../../../libs/common/ui/Form/FormWrapper";
import { getFields, createRecord, getRecordById, updateRecord } from "../../../../../../libs/common/api/doctype";
import { isSuccess } from "../../../../../../libs/common/ui/Message";
import { useNavigate, useSearchParams } from "react-router-dom";
import { employeeSelectDropDown } from "../../../../../../libs/common/utils/common";

const Create = () => {
   const navigate = useNavigate(); 
   const [formValue, setformValue] = useState<any>({});
   const [formData, setFormData] = useState<any>([])

 
   let [searchParams] = useSearchParams();
   const term = searchParams.get('id');

   useEffect(()=> {
    getFields('House Rent Declaration', 'htssuite').then((fields: any)=>{
        const formFields  = fields?.map((item:any)=>{
          if (item.name === 'employee_name') {
            return employeeSelectDropDown(item);
          }
          return item
        })
        setFormData(formFields)
       });
       
       if(term) {
        const params = { doc_id : term}
        getRecordById('house_rent_declaration', params, 'employee_management', 'htssuite').then(
            (items) => {
              setformValue({
                ...items,
              });
            }
          );
       }
   },[term])

   const handleFinish = (values: any) => {
     const payload = {
       ...values,
       employee_name: values?.employee_name?.name || values?.employee_name
     };
     if (term) {
        const updateRecordPayload = {
            doc_id: term,
            data: payload
        }
       updateRecord(
         'house_rent_declaration',
         updateRecordPayload,
         'employee_management',
         'htssuite'
       ).then((items: any) => {
         if (items?.status === 200) {
           isSuccess(items?.message, 'success');
           navigate('/view-house-rent-declaration');
         } else {
           isSuccess(items?.message, 'error');
         }
       });
     } else {
       createRecord(
         'house_rent_declaration',
         payload,
         'employee_management',
         'htssuite'
       ).then((items: any) => {
         if (items?.status === 200) {
           isSuccess(items?.message, 'success');
           navigate('/view-house-rent-declaration');
         } else {
           isSuccess(items?.message, 'error');
         }
       });
     }
   };

    return (
        <React.Fragment>
            <FormWrapper
             formValue={formValue}
             handleFinish={handleFinish}
             formData={formData}
             dynamicLayout={true}
             appname="htssuite"
             />
        </React.Fragment>
    )
}

export default Create;