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
        label: 'Short Close Remarks',
        name: 'reason_for_short_close',
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
    if (term && formValue?.status === 'Partial Supplied Order') {
      const record = {
        name: term,
        data: {
          reason_for_short_close: e?.reason_for_short_close,
          status: 'Short Close',
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
          navigate('/view-purchase-order-register');
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
        submitButtonLabel="Close"
      />
    </div>
  );
};

export default Create;
