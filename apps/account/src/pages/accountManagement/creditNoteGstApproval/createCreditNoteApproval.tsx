import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getDocTypes,
  getTableData
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
const Create = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    status: 'Requested',
  });
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>({});
  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');


  useEffect(() => {
    getFields('Credit Note', 'htssuite').then((items) => {
      const disableits: any = [];
      items?.map((e: any) => {
        disableits.push({
          ...e,
          disabled: true,
        });
      });
      disableits?.push({
        colSpan: 24,
        label: '',
        name: '',
        datatype: 'Column Break',
      });
      disableits.push({
        colSpan: 1,
        label: 'Product Details',
        name: '',
        datatype: 'table',
        data: data,
        column: columns,
      });
      disableits.push({
        label: '',
        name: '',
        datatype: 'Column Break',
      });
      disableits.push({
        colSpan: 2,
        label: 'Approval Remarks',
        name: 'approval_remarks',
        datatype: 'Long Text',
        isReq: true,
        description: items?.description,
        default: items?.default,
        options: null,
        hidden: false,
        depends_on: null,
        readonly: false,
      });

      setformData(disableits);
    });
    
    if (term) {
      const data = { name: term };
      getRecordById(
        'credit_note',
        data,
        'account_management',
        'htsaccount'
      ).then((items) =>
        setformValue({
          ...items,
          customersupplier: items?.customersupplier?.customersupplier,
          ledger_ac : items?.ledger_ac?.ledger_ac,
          voucher_date: datetoFrom(items?.voucher_date),
          ref_date: datetoFrom(items?.ref_date),
          accounting_date:datetoFrom(items?.accounting_date),
          active: items?.active === 1 ? true : false,
          upload_doc: items?.upload_doc ? `data:application/pdf;base64,${items?.upload_doc}` : null,
        })
      );
    }
  }, [term,data,columns]);

  useEffect(() => {
    getDocTypes('Credit Note Entries', false, 'htssuite').then((items) => {      
      setcolumns(items);
    });
    getTableData('credit_note_entries', 'account_management', 'htsaccount').then(
      (items) => {

        setdata(items);
      }
    );
  }, []);
  
  

  const handleFinish = (e: any) => {
    if (term && formValue?.status === 'Pending') {
      const record = {
        name: term,
        data: {
          approval_remarks: e?.approval_remarks,
          status: e?.status || 'Approved',
        },
      };
      
      updateRecord(
        'credit_note',
        record,
        'account_management',
        'htsaccount'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-credit-note-with-gst-approval');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };


  return (
    <div>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsaccount"
        dynamicLayout
        submitButtonLabel="Approve"
        isReject={true}
        rejectedReq="approval_remarks"

      /> 
     
    </div>
  );
};

export default Create;
