import React, { useEffect, useState } from 'react';
import {
  getFields,
  getRecordById,
  getDocTypes,
  updateRecord,
  createRecord,
  getProductById,
  getProductsList,
  getTableData
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import Message from '../../../../../../libs/common/ui/Message/message';
/* @ts-ignore  */
import FormTable from '../../../../../../libs/common/ui/Form_Table/FormTable';
import { useSearchParams } from 'react-router-dom';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
type Props = {
  doc_id: any;
  url?: string;
  switchToNextTab?: any;
  dataOfForm?: any;
};
const Create = (props: Props) => {
  const { switchToNextTab = () => {}, doc_id } = props;
  const [searchParams] = useSearchParams();
  const mainId = searchParams.get('id') || '';
  const [formData, setformData] = useState([]);
  const [selectedId, setSelectedId] = useState<any>({});
  const [columns, setcolumns] = useState([]);
  const [formValue, setformValue] = useState<any>({
    name: '',
    data: '',
  });
  const [actualData, setactuvalData] = useState<any>([]);
  const [isIGSTTrue, setIGSTTrue] = useState<boolean>(false);
  const [companyDetails, setCompanyDetails] = useState <any>({})
  const [subid, setsubid] = useState(null);
  const [IsSameSate, setIsSameSate] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    let formItems: any = [];
    getTableData('inventory_company_details', 'inventory_general_setup', 'htsinventory').then((items:any) => {
      console.log(items, "items")
      setCompanyDetails(items?.[0])
    })
    getFields('Inventory Good Received Note Entries', 'htssuite').then(
      (items) => {
        // const newItems = items?.map((e: any) =>
        //   e?.name === 'part' ? { ...e, readonly: true } : { ...e }
        // );
        const datas = items;

        datas.forEach((record: any) => {
          if (record.name === 'qty') {
            record.description = {
              type: 'compare_two_values',
              depends: 'order_qty',
              label: 'Order Qty'
            };
          }
        });
        setformData(datas);
        // setformData(items);
        formItems = items;
        const data = { name: mainId };

        getProductsList(
          'inventory_good_received_note',
          data,
          'inventory_management',
          'htsinventory'
        ).then((items) => {
          setactuvalData(items);
          console.log(items, 'temmm');
          const newData = items.map((item: any, i: any) => {
            item.products = item?.part?.name;
            return item;
          });
          console.log(newData, 'newDataaa');
          // setSelectedId(items?.part?.id);
          const locationsOptions = items.map((item: any) => ({
            label: item?.part?.name,
            value: item.part?.id,
          }));

          const locationFieldIndex: any = formItems.findIndex(
            (item: any) => item.name === 'part'
          );
          const locationField: any = formItems.find(
            (item: any) => item.name === 'part'
          );

          const newLocationData = {
            ...locationField,
            datatype: 'Select',
            options: locationsOptions,
          };
          const updatedFormData: any = [...formItems];
          updatedFormData[locationFieldIndex] = newLocationData;
          console.log(updatedFormData, ' updatedFormData');
          setformData(updatedFormData);

          // setformValue({
          //   ...formValue,
          //   data: newData,
          //   // tabledata: newData,
          // });
        });
      }
    );
    getDocTypes('Inventory Good Received Note Entries', false, 'htssuite').then(
      (items) => {
        const nData = [
          {
            title: 'Product',
            key: 'products',
            dataIndex: 'products',
          },
        ];
        const newData: any = items.filter((item: any) => {
          const reqfields = [
            'products',
            'indent_qty',
            'order_qty',
            'qty',
            'rate',
            'amount',
            'dicount',
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
  }, [mainId]);

  const handleFinish = (values: any) => {
    const record = {
      name: mainId,
      data: {
        products: values.map((item: any) => ({
          ...item,
          godown: item?.godown?.id,
          uom: item?.uom?.id,
          part: item?.part?.id,
          product: item?.product?.id || item?.product
        })),
      },
    };
    updateRecord(
      'inventory_good_received_note',
      record,
      'inventory_management',
      'htsinventory'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        switchToNextTab('/add-get-pass', items?.data?.id);
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };

  // @ts-ignore
  //   let formDataValuesAdded = formDataFamilyRemoved.push(...values);

  const formChangeHandler = (val: any, fieldName: any) => {
    const prevformData = formValue?.data?.[0]
      ? formValue?.data?.[0]
      : formValue?.data;
    // console.log(JSON.stringify(prevformData), val);

    if (fieldName === 'part') {
      if (val) {
        const fitems = actualData?.find((e: any) => e?.part?.id == val);
        setformValue({
          ...formValue,
          data: {
            ...fitems,
            products: fitems?.part?.name,
            part: fitems?.part?.id,
            product: fitems?.part,
            rate: Number(fitems?.rate).toFixed(2),
            tax: Number(fitems?.sgst) * 2 || fitems?.tax,
            warranty: (fitems?.warranty === 'No' || fitems?.warranty === 'Yes') ? undefined : fitems?.warrant
          },
        });
        const isSamestate = companyDetails?.state_name?.id === fitems?.supplier_state;
        setIsSameSate(isSamestate)
        const cols: any = formData?.map((item: any) => {
          if (item?.name === 'qty') {
            return {
              ...item,
              max: fitems?.order_qty,
            };
          }
          if(item?.name === 'warranty') {
            return {
              ...item,
              isReq : fitems?.warranty === "Yes"
            }
          }
          if(item.name === 'igst'){
            return {
              ...item,
              hidden : isSamestate ?  1 : 0
            }
          }
          if(item.name === 'cgst' || item.name === 'sgst'){
            return {
              ...item,
              hidden : isSamestate ? 0 : 1
            }
          }

          return item;
        });

        setformData(cols);

        // getProductById(
        //   'inventory_good_received_note_entries',
        //   val,
        //   'inventory_management',
        //   'htsinventory'
        // ).then((items) => {
        //   // reorder_level
        //   setSelectedId(items?.part?.id);
        //   setformValue({
        //     ...formValue,
        //     data: { ...items, rate: items?.mrp_price || items?.rate },
        //   });
        // });
      }
    } else if (fieldName === 'uom') {
      setformValue({
        data: {
          ...prevformData,
          uom: val,
        },
      });
    } else if (fieldName === 'qty') {
      let amt: any = parseFloat(val) * parseFloat(prevformData?.rate);
      amt = amt || 0;

      const discountvalue =
        parseFloat(prevformData?.discount) > 0
          ? (parseFloat(amt) * parseFloat(prevformData?.discount)) / 100
          : 0;
      const net: any = amt - discountvalue;

      // const totalamt: any = (net * 18) / 100 + net;

      const taxvalue: any =
        parseFloat(prevformData?.tax) > 0
          ? (parseFloat(net) * parseFloat(prevformData?.tax)) / 100
          : 0;

      const netValue = taxvalue > 0 ? taxvalue + net : net;

      setformValue({
        data: {
          ...prevformData,
          amount: Number(amt).toFixed(2),
          discount_value: discountvalue.toFixed(2),
          net: Number(netValue).toFixed(2),
          // order_qty: val,
          tax_value: taxvalue.toFixed(2),
          qty: +val,
          
        },
      });
    } else if (fieldName === 'discount') {
      const amt: any = parseFloat(prevformData?.amount) || 0;
      //disVal
      const discountvalue =
        parseFloat(val) > 0 ? (parseFloat(amt) * parseFloat(val)) / 100 : 0;

      //gross
      const gross: any = amt - discountvalue;

      //tax value
      const taxvalue: any =
        parseFloat(prevformData?.tax) > 0
          ? (parseFloat(gross) * parseFloat(prevformData?.tax)) / 100
          : 0;

      //net
      const netValue = gross + taxvalue;

      setformValue({
        data: {
          ...prevformData,
          discount_value: +discountvalue,
          net: Number(netValue).toFixed(2),
          tax_value: taxvalue.toFixed(2),
          discount: +val,
        },
      });
    } else if (fieldName === 'tax') {
      const amt: any = parseFloat(prevformData?.amount);
      const discountvalue =
        parseFloat(val) > 0 ? (parseFloat(amt) * parseFloat(val)) / 100 : 0;
      const gross: any = amt - discountvalue;

      // const totalamt: any = (net * 18) / 100 + net;

      const taxvalue: any = (gross * +val) / 100;

      const netValue = gross + taxvalue;

      setformValue({
        data: {
          ...prevformData,
          net: netValue,
          tax_value: taxvalue,
          tax: +val,
          sgst: IsSameSate ?  val /2 : 0 ,
          cgst :IsSameSate ? val /2 : 0,
          igst: IsSameSate ? 0 : val,

        },
      });
    } else if (fieldName === 'rate') {
      const amt: any = parseFloat(prevformData?.qty || 0) * parseFloat(val);
      //disVal
      const discountvalue =
        parseFloat(val) > 0
          ? (parseFloat(amt) * parseFloat(prevformData?.discount)) / 100
          : 0;

      //gross
      const gross: any = amt - discountvalue;

      //tax value
      const taxvalue: any =
        parseFloat(prevformData?.tax) > 0
          ? (parseFloat(gross) * parseFloat(prevformData?.tax)) / 100
          : 0;

      //net
      const netValue = gross + taxvalue;

      setformValue({
        data: {
          ...prevformData,
          net: netValue,
          discount_value: +discountvalue,
          tax_value: taxvalue,
          amount: amt,
          rate: +val,
        },
      });
    }
    else if(fieldName === "spl_discount_amount") {
      const amt: any = parseFloat(prevformData?.amount) || 0;
      //disVal
      const discountvalue = prevformData?.discount_value
        

      //gross
      const gross: any = amt - discountvalue;

      //tax value
      const taxvalue: any =
        parseFloat(prevformData?.tax) > 0
          ? (parseFloat(gross) * parseFloat(prevformData?.tax)) / 100
          : 0;

      const specialDiscount =   parseFloat(val) > 0 ?  (parseFloat(val) *  parseFloat(prevformData?.tax) / 100) : 0
      //net
      const netValue = gross + taxvalue + Number(prevformData?.freight_packaging || 0) - (Number(val) + specialDiscount)
      

      setformValue({
        data: { 
          ...prevformData,
          net: Number(netValue).toFixed(2),
          tax_value: taxvalue.toFixed(2),
          spl_discount_amount: +val
        },
      });
    }
    else if(fieldName === "freight_packaging") {
      const amt: any = parseFloat(prevformData?.amount) || 0;
      //disVal
      const discountvalue = prevformData?.discount_value
        

      //gross
      const gross: any = amt - discountvalue;

      //tax value
      const taxvalue: any =
        parseFloat(prevformData?.tax) > 0
          ? (parseFloat(gross) * parseFloat(prevformData?.tax)) / 100
          : 0;

      const specialDiscount =   parseFloat(prevformData?.spl_discount_amount) > 0 ?  (parseFloat(prevformData?.spl_discount_amount) *  parseFloat(prevformData?.tax) / 100) : 0
      //net
      const netValue = gross + taxvalue + Number(val) - (Number(prevformData?.spl_discount_amount || 0) + specialDiscount)
      

      setformValue({
        data: { 
          ...prevformData,
          net: Number(netValue).toFixed(2),
          tax_value: taxvalue.toFixed(2),
          freight_packaging: +val
        },
      });
    }
    else {
      setformValue({
        ...formValue,
      });
    }
  };

  const formTableEditRow = (items: any) => {
    if (formValue?.data?.part) {
    } else {
      const cols: any = formData?.map((item: any) => {
        if (item?.name === 'qty') {
          return {
            ...item,
            max: items?.order_qty,
          };
        } else if (item?.name === 'part') {
          return {
            ...item,
            options: [
              {
                value: items?.part?.id || items?.product?.id,
                label: items?.products,
              },
            ],
          };
        }
        return item;
      });

      setformData(cols);

      const tData = formValue?.tabledata?.filter(
        (e: any) => e?.products !== items?.products
      );

      console.log(items);
      setSelectedId(items?.product?.id);

      setformValue({
        ...formValue,
        data: {
          ...items,
          rate: items?.mrp_price || items?.rate,
          pending_qty: items?.pending_order_qty,
          part: items?.part?.id || items?.part?.id,
          product: items?.part?.id ? items?.part : items?.product,
          products: items?.products,
        },
        tabledata: tData,
      });
    }
  };

  const handleSet = (e: any, data: any, value: any) => {
    e.igst = value?.igst;
    e.cgst = value?.cgst;
    e.sgst = value?.sgst;
    console.log(e, data, value);

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

  const handleFormCancel = () => {
    const forms = formValue;

    if (forms?.data?.product?.id === selectedId) {
      setformValue({
        ...forms,
        data: null,
        tabledata: [{ ...forms.data }, ...forms.tabledata],
      });
    }
  };

  const da = actualData?.find((a: any) => a?.part?.id == 'ERP/PC/PM/033');

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
          data: datas?.reduce((acc:any, val:any) => acc + Number(val?.order_qty ||0) ,0),
          index: 4
        },
        {
          data: "",
          index: 5
        },
        {
          data: Number(datas?.reduce((acc:any, val:any) => acc + Number(val?.amount ||0) ,0)).toFixed(2),
          index: 6
        },
        {
          data:"",
          // data: Number(datas?.reduce((acc:any, val:any) => acc + Number(val?.amount ||0) ,0)).toFixed(2),
          index: 7
        },
        {
          data: Number(datas?.reduce((acc:any, val:any) => acc + Number(val?.net ||0) ,0)).toFixed(2),
          index: 8
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
        tableData={formValue.tabledata}
        columns={columns}
        module="inventory_management"
        // doctype="Inventory Invoice Entries"
        doc_id={mainId}
        handleFinish={handleFinish}
        appname="htsinventory"
        submitButtonLabel="Save & Continue"
        onchangehandler={formChangeHandler}
        formTableEditRow={formTableEditRow}
        isSetNew={true}
        handleSet={handleSet}
        hideSelectData={formValue?.tabledata}
        cancelButtonLabel="Cancel"
        handleFormCancel={handleFormCancel}
        tableSummary ={
          onGettableSummaryData(formValue?.tabledata)
        }
      />
    </div>
  );
};

export default Create;
