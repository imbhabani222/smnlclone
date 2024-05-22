import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Message from '../../../../../../libs/common/ui/Message/message';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
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
    state_name: '',
    active: false,
    zone: '',
    status: '',
  });
  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Loan Advance Request', 'htssuite').then((items) => {
      // let newItems: any = addExtraFields(items, [
      //   {
      //     name: 'email',
      //     module: 'employee_management',
      //   },
      // ]);
      const disableits: any = [];
      items?.map((e: any) => {
        disableits.push({
          ...e,
          disabled: true,
        });
      });
      disableits.push({
        colSpan: 24,
        label: '',
        name: '',
        datatype: 'Column Break',
      });
      disableits.push({
        colSpan: 2,
        label: 'Remarks',
        name: 'remarks',
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
      const data = { doc_id: term };
      getRecordById(
        'loan_advance_request',
        data,
        'loan_&_advance',
        'htssuite'
      ).then((items) =>
        setformValue({
          ...items,
          state_name: items?.state_name,
          active: items?.active === 1 ? true : false,
          zone: items?.zone,
          request_date: datetoFrom(items.request_date),
          ecscheque_date: datetoFrom(items.ecscheque_date),
        })
      );
    }
  }, [term]);

  const handleFinish = (e: any) => {
    if (term && formValue?.status === 'Pending') {
      const record = {
        doc_id: term,
        data: {
          approved_date_rejected_date_cancelled_date: dateFormat(new Date()),
          remarks: e?.remarks,
          status: e?.status || 'Approved',
          approved_by_rejected_by_cancelled_by: cookies.get('userid'),
        },
      };

      updateRecord(
        'loan_advance_request',
        record,
        'loan_&_advance',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-loan-advance');
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
        appname="htssuite"
        dynamicLayout
        submitButtonLabel="Approve"
        isReject={true}
      />
    </div>
  );
};

export default Create;
