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
  const [data, setdata] = useState<any>([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Inventory Purchase Order', 'htssuite').then((items) => {
      const disableits: any = [];
      items?.map((e: any) => {
        disableits.push({
          ...e,
          disabled: true,
        });
      });
     
      disableits.push({
        label: '',
        name: '',
        datatype: 'Column Break',
      });
      disableits.push({
        colSpan:1,
        label: 'Product Details',
        name: '',
        datatype: 'table',
        isReq: true,
        dataSource : data,
        column : columns,
        
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
        })
      );
    }
  }, [term,data,columns]);

  useEffect(() => {
    getDocTypes('Inventory Order Entries', false, 'htssuite').then((items) => {
      
      // let newData = items.filter((item: any) => {
      //   const reqfields = [
      //     'asset_name',
      //     'date_needed',
      //     'no_of_qty_required',
      //     'action',
      //     'status',
      //   ];
      //   if (reqfields.includes(item.dataIndex)) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // });
      setcolumns(items);
    });
    getTableData('inventory_order_entries', 'inventory_purchase_management', 'htsinventory').then(
      (items) => {
        // const dat: any = [];
        // items.map((e: any) => {
        //   dat.push({
        //     ...e,
        //     asset_name: e?.asset_name?.asset_name,
        //     email: e?.requested_by?.name,
        //   });
        // });
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
      />
      
        <h2>Product Details</h2>
      <Table column={columns} dataSource={data}/>
     
    </div>
  );
};

export default Create;
