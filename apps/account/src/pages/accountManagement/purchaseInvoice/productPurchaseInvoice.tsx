import React, { useState, useEffect } from 'react';

import {
  getDocTypes,
  getRecordById,
  getSupplierGRN,
  getPIRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';

import FormTable from '../../../../../../libs/common/ui/Form_Table/FormTable';
import { getFields } from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

const AddProductReturn = (props: any) => {
  const { doc_id, setDoc_id, switchToNextTab = () => {} } = props;
  const [formData, setformData] = useState<any>([]);
  const [formValue, setformValue] = useState<any>([]);
  const [columns, setcolumns] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<any>([])
  const [searchParams] = useSearchParams();
  const [loading, setloading] = useState(true);
  const [Errors, setErrors] = useState<any>({
    isError: false,
    errors: {},
  });
  const [product, setProduct] = useState([]);

  const mainId = searchParams.get('id') || '';
  const grnId = searchParams.get('grn') || '';
  const supId = searchParams.get('supId') || '';


  

  useEffect(() => {
    setloading(true)
    if (mainId) {
      getFields('Invoice Entries', 'htssuite').then((_items) => {

        const disableBooleanMap:any = {
          products : true,
        }
        _items?.forEach((item:any)=>{
          if (disableBooleanMap[item.name]) {
            item.disabled =true
          }
        })
        setformData(_items);
        setloading(false)
        getDocTypes('Invoice Entries', false, 'htssuite').then((items) => {
          let newData = items.filter((item: any) => {
            const reqFields = [
              'products',
              'godown',
              'uom',
              'amount',
              'net',
              'action',
            ];
            if (reqFields.includes(item.dataIndex)) {
              return true;
            } else {
              return false;
            }
          });
    
          setcolumns(newData);
        });
        const data = { name: mainId };
        if(grnId){
          getPIRecordById(
            'inventory_good_received_note',
            grnId,
            'inventory_management',
            'htsinventory'
          ).then((items:any) => {
            setSelectedId(items?.products?.map((item:any)=>({products: item?.products})))
            setformValue({
              ...formValue,
              tabledata: items?.products.map((item:any)=>({
                ...item,
                products : item?.part,
                tax:item?.tax_value,
                c_gst:item?.cgst,
                s_gst:item?.sgst,
                i_gst:item?.igst,
              })),
            });
          });
        }else{
          getRecordById(
            'purchase_invoice',
            data,
            'account_management',
            'htsaccount'
          ).then((items) => {
            setSelectedId(items?.products?.map((item:any)=>({products: item?.products})))
            setformValue({
              ...formValue,
              tabledata: items?.products.map((item:any)=>({
                ...item,
                products : item?.products?.part_name
              })),
            });
          });
        }
        
      });
    }
  }, [mainId, product]);

  const onchangeHandler = (val: any, fieldName: any) => {
    if (fieldName === 'rate') {
      const rate = parseFloat(val) || 0;
      const amt = rate * parseFloat(formValue?.data?.qty);
      const discountAmt: any =
        amt - (amt * parseFloat(formValue?.data?.discount)) / 100;
      // const taxValue: any =
      //   parseFloat(discountAmt) +
      //   (parseFloat(discountAmt) * (parseFloat(formValue?.data?.tax) || 0)) /
      //     100;
        const taxValue = parseFloat(discountAmt) + parseFloat(formValue?.data?.tax||0)
      setformValue((pre: any) => ({
        ...pre,
        data: {
          ...formValue?.data,
          rate: val,
          amount: amt.toFixed(2),
          net: taxValue,
          base_amount : formValue?.data?.discount ? discountAmt : null
        },
      }));
    } else if (fieldName === 'discount') {
      if (val <= 100) {
        const discountAmt: any =
          parseFloat(formValue?.data?.amount) -
          (parseFloat(formValue?.data?.amount) * parseFloat(val)) / 100;
        // const taxValue: any =
        //   parseFloat(discountAmt) +
        //   (parseFloat(discountAmt) * (parseFloat(formValue?.data?.tax) || 0)) /
        //     100;
        const taxValue = parseFloat(discountAmt)+ parseFloat(formValue?.data?.tax||0)
        setformValue((pre: any) => ({
          ...pre,
          data: {
            ...formValue?.data,
            discount: val,
            tax: formValue?.data?.tax || 0,
            net: taxValue || 0,
            base_amount : formValue?.data?.discount ? discountAmt : null
          },
        }));
      } else {
        isSuccess('Discount should be less than 100', 'error');
        setErrors({
          isError: true,
          errors: {
            name: 'discount',
            errors: ['Discount should not be greater than 100'],
          },
        });
      }
    } else if (fieldName === 'tax') {
      const discountAmt: any =
        parseFloat(formValue?.data?.amount) -
        (parseFloat(formValue?.data?.amount) *
          parseFloat(formValue?.data?.discount)) /
          100;
      const taxValue: any =
        parseFloat(discountAmt) +
        (parseFloat(discountAmt) * parseFloat(val)) / 100;
      setformValue((pre: any) => ({
        ...pre,
        data: {
          ...formValue?.data,
          tax: val,
          discount: formValue?.data?.discount,
          net: taxValue.toFixed(2),
          c_gst: val / 2,
          s_gst: val / 2,
        },
      }));
    }
  };
  

  const handleFinish = (values: any) => {
    
    const record = {
      name: mainId,
      data: {
        products: values
      },
    };
    
    updateRecord(
      'purchase_invoice',
      record,
      'account_management',
      'htsaccount'
    ).then((items: any) => {
      if (items?.status === 200) {        
        setDoc_id(items?.data?.id)
        isSuccess(items?.message, 'success');
        switchToNextTab(
          '/add-invoice-gate-pass',
          items?.data?.id,

          selectedId[0]?.products
         
        );
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };

  const formTableEditRow = (items: any) => {
    setformValue({
      ...formValue,
      data: { ...items, rate: items?.mrp_price || items?.rate , base_amount:(items?.amount -items?.amount*(items?.discount/100) )},
    });
  };



  return (
    <>
      <Spin loading={loading}/>   
      <FormTable
        formValue={formValue?.data}
        formData={formData}
        columns={columns}
        module="account_management"
        doctype="Invoice Entries"
        doc_id={mainId}
        handleFinish={handleFinish}
        appname="htsaccount"
        submitButtonLabel="Save & Continue"
        onchangehandler={onchangeHandler}
        tableData={formValue?.tabledata}
        formTableEditRow={formTableEditRow}
        showDelete={false}
        isError={Errors}
        onhideCancelButton={true}
      />
    </>
  );
};

export default AddProductReturn;