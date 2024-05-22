import React, { useEffect, useState} from "react";
import FormWrapper from "../../../../../../../libs/common/ui/Form/FormWrapper";
import { getFields, createRecord, getRecordById, updateRecord } from "../../../../../../../libs/common/api/doctype";
import { isSuccess } from "../../../../../../../libs/common/ui/Message";
import { useNavigate, useSearchParams } from "react-router-dom";

const Create = () => {
   const navigate = useNavigate(); 
   const [formValue, setformValue] = useState<any>({active: true});
   const [formData, setFormData] = useState<any>([])

 
   let [searchParams] = useSearchParams();
   const term = searchParams.get('id');

   useEffect(()=> {
    getFields('Workforce Category', 'htssuite').then((fields: any)=>{
        setFormData(fields)
       });
       
       if(term) {
        const params = { name : term}
        getRecordById('workforce_category', params, 'master_data', 'htssuite').then(
            (items) => {
              setformValue({
                ...items,
                active: items?.active === 1 ? true : false,
              });
            }
          );
       }
   },[term])

   const handleFinish = (values: any) => {
     const payload = {
       ...values,
       active: values?.active ? 1 : 0,
     };
     if (term) {
        const updateRecordPayload = {
            doc_id: term,
            data: payload
        }
       updateRecord(
         'workforce_category',
         updateRecordPayload,
         'master_data',
         'htssuite'
       ).then((items: any) => {
         if (items?.status === 200) {
           isSuccess(items?.message, 'success');
           navigate('/view-employee-category');
         } else {
          isSuccess(`${items?.error?.fieldname.toString()?.replace("_", "")} ${items?.error?.Entry.toLowerCase()}`, 'error');
        }
       });
     } else {
       createRecord(
         'workforce_category',
         payload,
         'master_data',
         'htssuite'
       ).then((items: any) => {
         if (items?.status === 200) {
           isSuccess(items?.message, 'success');
           navigate('/view-employee-category');
         } else {
          isSuccess(`${items?.error?.fieldname.toString()?.replace("_", "")} ${items?.error?.Entry.toLowerCase()}`, 'error');
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

            //  dynamicLayout={true}

             />
        </React.Fragment>
    )
}

export default Create;