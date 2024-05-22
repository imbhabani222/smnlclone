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
    getFields('Inventory Job Card Part Request', 'htssuite').then((items) => {
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
        label: 'Remarks',
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
        'inventory_job_card_part_request',
        data,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items) =>
        setformValue({
          ...items,
          date: datetoFrom(items?.date),
          active: items?.active === 1 ? true : false,
        })
      );
    }
  }, [term, data, columns]);

  useEffect(() => {
    getDocTypes('Inventory Part Request Entries', false, 'htssuite').then(
      (items) => {
        let newData = items.filter((item: any) => {
          const reqfields = ['action'];
          if (reqfields.includes(item.dataIndex)) {
            return false;
          } else {
            return true;
          }
        });
        setcolumns(newData);
      }
    );
    getTableData(
      'inventory_part_request_entries',
      'inventory_workshop_management',
      'htsinventory'
    ).then((items) => {
      // const dat: any = [];
      // items.map((e: any) => {
      //   dat.push({
      //     ...e,
      //     asset_name: e?.asset_name?.asset_name,
      //     email: e?.requested_by?.name,
      //   });
      // });
      setdata(items);
    });
  }, []);

  const handleFinish = (e: any) => {
    console.log(e);
    if (term) {
      const record = {
        name: term,
        data: {
          approval_remarks: e?.approval_remarks,
          status: e?.status || 'Accepted',
          accept_date: dateFormat(new Date()),
        },
      };
      updateRecord(
        'inventory_job_card_part_request',
        record,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/job-card-part-accept');
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
        rejectedReq={'accept_remarks'}
      />
    </div>
  );
};

export default Create;
