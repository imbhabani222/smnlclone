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
import './purchaseOrderApproval.module.scss';
import Cookies from 'universal-cookie';
import {
  setFormData,
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    status: 'Requested',
  });
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Inventory Purchase Order', 'htssuite').then((items) => {
      console.log(items, 'dnfskfndsfnsdf');
      const disableits: any = [];
      items?.map((e: any) => {
        disableits?.push({
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
        colSpan: 24,
        label: '',
        name: '',
        datatype: 'Column Break',
      });
      disableits?.push({
        colSpan: 2,
        label: 'Approval Remarks',
        name: 'approval_remarks',
        datatype: 'Long Text',
        isReq: true,
      });

      setformData(
        disableits?.map((_items: any) => {
          if (_items?.name === 'indent_no') {
            return { ..._items, options: [] };
          } else if (_items?.name == 'products') {
            return false;
          } else {
            return _items;
          }
        })
      );
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'inventory_purchase_order',
        data,
        'inventory_purchase_management',
        'htsinventory'
      ).then((items) =>
        setformValue({
          ...items,
          po_date: datetoFrom(items?.po_date),
          supp_ref_dt: datetoFrom(items?.supp_ref_dt),
          active: items?.active === 1 ? true : false,
          indent_no: JSON.parse(items.indent_no),
          supplier: items?.supplier?.name,
          location: items?.location?.name,
        })
      );
    }
  }, [term, data, columns]);

  useEffect(() => {
    getDocTypes('Inventory Order Entries', false, 'htssuite').then((items) => {
      setcolumns(items);
    });

    getTableData(
      'inventory_order_entries',
      'inventory_purchase_management',
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
      // console.log(items, "dnfjsnfsd")
      setdata(items);
    });
  }, []);

  const handleFinish = (e: any) => {
    console.log(e, formValue, term);
    if (term && formValue?.status === 'Active') {
      const record = {
        name: term,
        data: {
          approval_remarks: e?.approval_remarks,
          status: e?.status === 'Rejected' ? 'Rejected' : 'Approved',
        },
      };
      updateRecord(
        'inventory_purchase_order',
        record,
        'inventory_purchase_management',
        'htsinventory'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/purchase-order-approval');
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
        submitButtonLabel="Approve"
        isReject={true}
        rejectedReq="approval_remarks"
      />
    </div>
  );
};

export default Create;
