import React, { useEffect, useState } from 'react';
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

  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Asset Request', 'htssuite').then((items) => {
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
        'asset_request',
        data,
        'assets_management',
        'htssuite'
      ).then((items) =>
        setformValue({
          ...items,
          request_date: datetoFrom(items?.request_date),
          date_needed: datetoFrom(items?.date_needed),
          active: items?.active === 1 ? true : false,
        })
      );
    }
  }, [term]);

  const handleFinish = (e: any) => {
    console.log(e, 'sadasdasd');
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
        'asset_request',
        record,
        'assets_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-asset-approval');
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
        appname="htssuite"
        dynamicLayout
        submitButtonLabel="Approve"
        isReject={true}
        rejectedReq={'remarks'}
      />
    </>
  );
};

export default Create;
