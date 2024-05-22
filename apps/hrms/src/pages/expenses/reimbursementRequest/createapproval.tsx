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
import Cookies from 'universal-cookie';

import {
  setFormData,
  datetoFrom,
  dateFormat,
} from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
const Create = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    grade_name: '',
    active: false,
    status: '',
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

      const disableits: any = [];
      items?.map((e: any) => {
        disableits.push({
          ...e,
          disabled: e?.name === "amount" ? false : true,
        });
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
      // const data: any = setFormData(newItems);
      // !term && setformValue(data);
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
          active: items?.active === 1 ? true : false,
          request_date: datetoFrom(items?.request_date),
          claim_from_date: datetoFrom(items?.claim_from_date),
          claim_to_date: datetoFrom(items?.claim_to_date),
          bill_date: datetoFrom(items?.bill_date),
        })
      );
    }
  }, [term]);
  const handleImageUpload = (e: {}, exe: string) => {
    setimageData(e);
    setexe(exe);
  };
  const handleFinish = (e: any) => {
    console.log(e, 'asdsa');
    if (term && formValue?.status === 'Pending') {
      const record = {
        doc_id: term,
        data: {
          approved_date_rejected_date_cancelled_date: dateFormat(new Date()),
          ...e?.remarks,
          status: e?.status || 'Approved',
          approved_by_rejected_by_cancelled_by: cookies.get('userid'),
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
          navigate('/expense-approvals');
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
        formData={formData}
        handleFinish={handleFinish}
        multiple={true}
        appname="htssuite"
        handleImageUpload={handleImageUpload}
        dynamicLayout
        submitButtonLabel="Approve"
        isReject={true}
        rejectedReq="remarks"
      />
    </>
  );
};

export default Create;
