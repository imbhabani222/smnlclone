import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getDocTypes,
  getTableData,
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
  const [data, setdata] = useState<any>([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Workshop Part Return Note', 'htssuite').then((items) => {
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
        label: 'Accept Remarks',
        name: 'accept_remarks',
        datatype: 'Long Text',
        isReq: true,
        description: items?.description,
        default: items?.default,
        options: null,
        hidden: false,
        depends_on: null,
        readonly: false,
      });

      setformData(disableits?.filter((e: any) => e?.name !== 'products'));
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'workshop_part_return_note',
        data,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items) =>
        setformValue({
          ...items,
          return_date: datetoFrom(items?.return_date),
          active: items?.active === 1 ? true : false,
        })
      );
    }
  }, [term, data, columns]);

  useEffect(() => {
    getDocTypes('Part Return Note Entries', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqfields = ['action'];
        if (reqfields.includes(item.dataIndex)) {
          return false;
        } else {
          return true;
        }
      });
      setcolumns(newData);
    });
    getTableData(
      'part_return_note_entries',
      'inventory_workshop_management',
      'htsinventory'
    ).then((items) => {
      setdata(items);
    });
  }, []);

  const handleFinish = (e: any) => {
    console.log({ term, hbbhb: formValue?.status });

    if (term && formValue?.status === 'Approved') {
      console.log(e, 'LLLLLL');
      const record = {
        name: term,
        data: {
          approval_remarks: e?.accept_remarks,
          status: e?.status == 'Rejected' ? 'Rejected' : 'Accepted',
          accept_date: dateFormat(new Date()),
        },
      };

      updateRecord(
        'workshop_part_return_note',
        record,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/part-return-note-register');
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
        appname="htsinventory"
        dynamicLayout
        submitButtonLabel="Accept"
        isReject={true}
        rejectedReq="accept_remarks"
      />
    </div>
  );
};

export default Create;
