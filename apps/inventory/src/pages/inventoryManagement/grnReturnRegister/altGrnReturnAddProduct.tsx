import React, { useEffect, useState } from 'react';
import {
  getFields,
  getRecordById,
  getDocTypes,
  updateRecord,
  createRecord,
  getProductById,
  getGrnProducts,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import Message from '../../../../../../libs/common/ui/Message/message';
/* @ts-ignore  */
import FormTable from '../../../../../../libs/common/ui/Form_Table/FormTable';
import { useSearchParams } from 'react-router-dom';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
type Props = { doc_id: any; url?: string; switchToNextTab?: any };
const Create = (props: Props) => {
  const { switchToNextTab = () => {}, doc_id } = props;
  const [searchParams] = useSearchParams();
  const mainId = searchParams.get('id') || '';
  const [formData, setformData] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [formValue, setformValue] = useState<any>({
    name: '',
    data: '',
    tabledata: [],
  });
  const [subid, setsubid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getFields('Inventory GRN Return Entries', 'htssuite').then((items) => {
      const datas = items;
      datas.forEach((record: any) => {
        if (record.name === 'qty') {
          record.description = {
            type: 'compare_two_values',
            depends: 'grn_qty',
            label: "GRN Qty"
          };
        }
      });
      setformData(datas);
    });
    getDocTypes('Inventory GRN Return Entries', false, 'htssuite').then(
      (items) => {
        const nData = [
          {
            title: 'Product',
            key: 'products',
            dataIndex: 'products',
          },
          // {
          //   title: 'Uom',
          //   key: 'uoms',
          //   dataIndex: 'uoms',
          // },
          // {
          //   title: 'Godown',
          //   key: 'godwons',
          //   dataIndex: 'godowns',
          // },
        ];
        const newData: any = items.filter((item: any) => {
          const reqfields = [
            'products',
            'batch_no',
            'available_qty',
            'qty',
            'rate',
            'amount',
            'tax',
            'net',
            'action',
          ];
          if (reqfields.includes(item.dataIndex)) {
            return true;
          } else {
            return false;
          }
        });
        const ndata: any = [...nData, ...newData];
        setcolumns(ndata);
      }
    );

    if (mainId) {
      console.log(mainId, 'SDfsdf');

      const data = { name: mainId };
      getGrnProducts(
        'inventory_grn_return',
        data,
        'inventory_management',
        'htsinventory'
      ).then((items) => {
        console.log(items);
        const nItems = items.map((e: any) => ({
          ...e,
          part: e?.part,
          uom: e?.uom?.id,
          godown: e?.godown?.id,
          products: e?.part?.name,
          uoms: e?.uom?.name,
          godowns: e?.godown?.name,
        }));

        setformValue({
          ...formValue,
          tabledata: nItems,
        });
      });
    }
  }, [mainId]);

  const handleFinish = (values: any) => {
    console.log(values);
    const record = {
      name: mainId,
      data: {
        products: values.map((item: any) => ({
          ...item,
          part: item?.part?.id,
          product: item?.product?.id || item?.product
        })),
      },
    };
    updateRecord(
      'inventory_grn_return',
      record,
      'inventory_management',
      'htsinventory'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        switchToNextTab('/grn-return-gate-pass', mainId);
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };

  // @ts-ignore
  //   let formDataValuesAdded = formDataFamilyRemoved.push(...values);

  const formChangeHandler = (val: any, fieldName: any) => {
    if (fieldName === 'part') {
      // if (val) {
      getProductById(
        'inventory_product_master',
        val,
        'inventory_product_configuration',
        'htsinventory'
      ).then((items) => {
        // reorder_level
        setformValue({
          ...formValue,
          data: { ...items },
        });
      });
      // } else {
      //   setformValue({
      //     ...formValue,
      //   });
      // }
    }
    if(fieldName === 'qty') {
      const prevformData = formValue?.data?.[0]
      ? formValue?.data?.[0]
      : formValue?.data;
      let amt: any = parseFloat(val) * parseFloat(prevformData?.rate);
      amt = amt || 0;
      const discountvalue =
        parseFloat(prevformData?.discount) > 0
          ? (parseFloat(amt) * parseFloat(prevformData?.discount)) / 100
          : 0;
      const net: any = amt - discountvalue;
      const taxvalue: any =
        parseFloat(prevformData?.tax_percentage || prevformData?.igst) > 0
          ? (parseFloat(net) * parseFloat(prevformData?.tax_percentage || prevformData?.igst)) / 100
          : 0;
      const netValue = taxvalue > 0 ? taxvalue + net + parseFloat(prevformData?.freightpacking_charges || 0) -  Number(prevformData?.spl_discount || 0) : net + parseFloat(prevformData?.freightpacking_charges || 0) - Number(prevformData?.spl_discount || 0);

      setformValue({
        data: {
          ...prevformData,
          amount: amt,
          discount_value: discountvalue.toFixed(2),
          net: netValue.toFixed(2),
          // order_qty: val,
          tax: taxvalue.toFixed(2),
          qty: +val,
          
        },
      });
    }
  };

  const formTableEditRow = (items: any) => {
    console.log(items);
    setformValue({
      ...formValue,
      data: {
        ...items,
        rate: items?.mrp_price || items?.rate,
        part: items?.part?.id || items?.part?.id,
        product: items?.part?.id ? items?.part : items?.product,
        products: items?.products,
      },
    });
    console.log({
      ...items,
      rate: items?.mrp_price || items?.rate,
      part: items?.part?.id || items?.part?.id,
      product: items?.part?.id ? items?.part : items?.product,
      products: items?.products,
    });
  };

  const handleSet = (e: any, data: any, value: any) => {
    e.igst = value?.igst;
    e.cgst = value?.cgst;
    e.sgst = value?.sgst;
    // if (parseInt(e?.grn_qty || 0) < parseInt(e?.qty || 0)) {
    //   isSuccess('GRN Return quantity is more than GRN Quantity', 'error');
    //   return;
    // }
    setformValue({
      ...value,
      tabledata: [
        {
          ...e,
          products: value?.products,
          product: value?.product,
          part: { id: value?.product?.id, value: value?.products },
        },
        ...data,
      ],
    });
  };

  
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
          index: 3
        },
        {
          data: "",
          index: 4
        },
        {
          data: datas?.reduce((acc:any, val:any) => acc + Number(val?.order_qty ||0) ,0),
          index: 5
        },
        {
          data: "",
          index: 6
        },
        {
          data: Number(datas?.reduce((acc:any, val:any) => acc + Number(val?.amount ||0) ,0)).toFixed(2),
          index: 7
        },
        {
          data: "",
          index: 8
        },
        {
          data: Number(datas?.reduce((acc:any, val:any) => acc + Number(val?.net ||0) ,0)).toFixed(2),
          index: 9
        }
      ]
      return summaryDatas;

    }
    return []
  }
  return (
    <div>
      {/* @ts-ignore  */}
      <FormTable
        formValue={formValue?.data}
        formData={formData}
        columns={columns}
        tableData={formValue?.tabledata}
        module="inventory_management"
        doctype="Inventory GRN Return Entries"
        doc_id={mainId}
        handleFinish={handleFinish}
        appname="htsinventory"
        submitButtonLabel="Submit"
        onchangehandler={formChangeHandler}
        formTableEditRow={formTableEditRow}
        isSetNew={true}
        handleSet={handleSet}
        hideSelectData={formValue?.tabledata}
        tableSummary ={
          onGettableSummaryData(formValue?.tabledata)
        }
      />
    </div>
  );
};

export default Create;
