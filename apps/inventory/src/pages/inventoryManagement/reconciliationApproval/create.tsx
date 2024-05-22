import React, { useEffect, useState } from 'react';
import {
  getFields,
  getRecordById,
  updateRecord,
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { datetoFrom } from '../../../../../../libs/common/utils/common';

const datas = [
  {
    colSpan: 24,
    label: '',
    name: '',
    datatype: 'Column Break',
  },
  {
    colSpan: 1,
    label: 'Product Details',
    name: '',
    datatype: 'table',
    data: [],
    column: [],
  },
  {
    colSpan: 24,
    label: '',
    name: '',
    datatype: 'Column Break',
  },
  {
    colSpan: 2,
    label: 'Approval Remarks',
    name: 'approval_remarks',
    datatype: 'Long Text',
    isReq: true,
  },
];

const Create = () => {
  const navigate = useNavigate();
  const [formValue, setformValue] = useState<any>({});
  const [formData, setformData] = useState<any>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);

  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Inventory Reconciliation', 'htssuite').then((items: any) => {
      const formDatas: any = [];
      items?.map((e: any) => {
        formDatas.push({
          ...e,
          disabled: true,
          isReq: false,
        });
      });

      setformData([...formDatas, ...datas]);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'inventory_reconciliation',
        data,
        'inventory_management',
        'htsinventory'
      ).then((items: any) => {
        setformValue({
          ...items,
          date: datetoFrom(items?.date)
        });
        setdata(items?.products);
      });
    }
    getDocTypes('Reconciliation Products', false, 'htssuite').then((items) => {
      let newData: any = items.filter((item: any) => {
        const reqfields = [
          'part',
          'uom',
          'available_qty',
          'required_qty',
          'price',
          'net_amount'
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setcolumns(newData);
    });
  }, []);

  useEffect(() => {
    const modifyData = [...formData];
    modifyData.forEach((item: any) => {
      if (item.datatype === 'table') {
        item.data = data;
        item.column = columns;
      }
      if (item.label === 'Products') {
        item.hidden = 1;
      }
    });

    setformData([...modifyData]);
  }, [data, columns]);

  const handleFinish = (e: any) => {
    const record = {
      name: term,
      data: {
        approval_remarks: e?.approval_remarks,
        status: e?.status === 'Rejected' ? 'Rejected' : 'Approved',
      },
    };

    updateRecord(
      'inventory_reconciliation',
      record,
      'inventory_management',
      'htsinventory'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        navigate('/reconciliation-approval');
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };
  return (
    <FormWrapper
      formValue={formValue}
      formData={formData}
      appname="htsinventory"
      dynamicLayout
      submitButtonLabel="Approve"
      isReject={true}
      rejectedReq="approval_remarks"
      handleFinish={handleFinish}
    />
  );
};

export default Create;
