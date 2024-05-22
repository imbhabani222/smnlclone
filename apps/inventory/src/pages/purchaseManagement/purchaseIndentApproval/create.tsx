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
    getFields('Inventory Purchase Indent', 'htssuite').then((items: any) => {
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
        'inventory_purchase_indent',
        data,
        'inventory_purchase_management',
        'htsinventory'
      ).then((items: any) => {
        setformValue(items);
        // eslint-disable-next-line no-unsafe-optional-chaining
        const datas = [...items?.products];
        datas?.forEach((item:any)=>{
          item.pending_indent_qty = item.indent_qty
        })
        setdata(items?.products);
      });
    }
    getDocTypes('Inventory Indent Entries', false, 'htssuite').then((items) => {
      let newData: any = items.filter((item: any) => {
        const reqfields = [
          'part',
          'uom',
          'available_qty',
          'make',
          'reorder_level',
          'indent_qty',
          'rate',
        
          'action',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      const datas = [
        {
          title: "Amount",
          dataIndex: 'amount',
          key: 'amount',
          render:(_:any, record:any) => {
            const rate = Number(record?.rate);
            const indentQty = Number(record?.indent_qty);
            const amount = rate * indentQty;
            return amount.toFixed(2);
          }
        },
        {
          title: "Pending Indent Qty",
          dataIndex: 'pending_indent_qty',
          key: 'pending_indent_qty',
        }
      ]
      setcolumns([...newData, ...datas]);
    });
  }, []);

  useEffect(() => {
    const modifyData = [...formData];
    modifyData.forEach((item: any) => {
      if (item.datatype === 'table') {
        item.data = data;
        item.column = columns;
        item.summary = onGettableSummaryData(data)
      }
      if (item.label === 'Products') {
        item.hidden = 1;
      }
    });

    setformData([...modifyData]);
  }, [data, columns]);


  const onGettableSummaryData = (datas:any) => {
  
      
    if(datas?.length > 0){
      
      const summaryDatas = [
        {
          data: "",
          index: 0
        },
        {
          data: "Total",
          index: 1
        },
        {
          data: "",
          index: 2
        },
        {
          data: Number(datas?.reduce((acc:any, val:any) => acc + Number(val?.indent_qty ||0) ,0)),
          index: 3
        },
        {
          data: '',
          index: 4
        },
        {
          data: datas.reduce((acc: any, item: any) => {
            const subtotal = parseFloat(item.indent_qty) * parseFloat(item.rate);
            return acc + subtotal;
          }, 0).toFixed(2),
          index: 5
        },
        {
          data: Number(datas?.reduce((acc:any, val:any) => acc + Number(val?.pending_indent_qty ||0) ,0)),
          index: 6,
        },
      ]
      return summaryDatas;

    }
    return []
  }

  const handleFinish = (e: any) => {
    const record = {
      name: term,
      data: {
        approval_remarks: e?.approval_remarks,
        status: e?.status === 'Rejected' ? 'Rejected' : 'Approved',
      },
    };

    updateRecord(
      'inventory_purchase_indent',
      record,
      'inventory_purchase_management',
      'htsinventory'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        navigate('/purchase-indent-approval');
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
