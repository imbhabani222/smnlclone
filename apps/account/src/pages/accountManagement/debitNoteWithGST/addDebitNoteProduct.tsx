import React, { useState, useEffect } from 'react';

import {
  getDocTypes,
  getProductById,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';

import FormTable from '../../../../../../libs/common/ui/Form_Table/FormTable';
import { getFields } from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { CheckDuplicateData, CheckProductQuantity } from '../helper';
import { resolveObjectKey } from 'chart.js/dist/helpers/helpers.core';

const AddProductReturn = (props: any) => {
  const [formData, setformData] = useState<any>([]);
  const [formValue, setformValue] = useState<any>([]);
  const [columns, setcolumns] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [searchParams] = useSearchParams();
  const [Errors, setErrors] = useState<any>({
    isError: false,
    errors: {},
  });

  const mainId = searchParams.get('id') || '';
  const navigate = useNavigate();

  useEffect(() => {
    if (mainId) {
      // setloading(true)
      getFields('Debit Note Entries', 'htssuite').then((_items) => {
        const itemsss=_items.map((itemsData:any)=>{
          if(itemsData.name === "products"){
            return {
              "label":" Products",
              "name":"products",
              "title": " Products",
              "dataIndex": "products",
              "key": "products",
              "fieldtype": 'TableSelect',
              "datatype":'TableSelect',
              "description": {
                "search": 'inventory_product_configuration.doctype.inventory_product_master.api.search_product?search=',
                "linkfield": "part_name",
                "modulename": "inventory_product_configuration",
                "appname": "htsinventory"
              },
              "options":"Inventory Product Master",
              "columns": [
                {
                  title: 'Product Name',
                  dataIndex: 'part_name',
                  key: 'part_name',
                },
                {
                  title: 'Product Id',
                  dataIndex: 'name',
                  key: 'name',
                },
              ],
              "searchIndexes": [],
              "callOnChange": true,
              "colSpan": 2,
            }
          }
          else{
            return itemsData
          }
        })
        setformData(itemsss);
        //     const {
        //       ItemNumberIdx: indentNumberIdx,
        //       ItemNumberItem: indentNumberItem,
        //     } = getItemNameAndIdx('part', _items);

        //    const {
        //      issueNumberidx :partIssueIdx,
        //      issueNumberItem : partIssueItem } = getIssueNo("issue_no",_items)

        getDocTypes('Debit Note Entries', false, 'htssuite').then((items) => {
          let newData = items.filter((item: any) => {
            const reqFields = [
              'products',
              'uom',
              'qty',
              'rate',
              'amount',
              'discount',
              'tax',
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
        getRecordById(
          'debit_note',
          data,
          'account_management',
          'htsaccount'
        ).then((items) => {
          setformValue({
            ...formValue,
            products: items?.product?.map((item:any)=>({
              ...item,
              products:item?.products?.name
            })),
              tabledata: items?.product?.map((item:any)=>({
                ...item,
                products : item?.products,
              })),
          });
          
        });
      });
      // });
    }
  }, [mainId]);

  

  const onchangeHandler = (val: any, fieldName: any) => {
    const data = { name: val };

    if (fieldName === 'products' && val) {
      getProductById(
        'debit_note',
        val,
        'account_management',
        'htsaccount'
      ).then((items:any) => {
        setformValue({
          ...formValue,
          data: {
            ...items,
            products : {name : items?.product?.id,products: items?.product?.name},
            uom: items?.uom,
            debit_note_no : mainId,
            rate:parseFloat(items?.rate),
            available_qty:items?.available_qty,
            c_gst:items?.c_gst,
            i_gst:items?.i_gst,
            s_gst:items?.s_gst,
            tax : 18,
            qty:0,
            discount : 0,
            amount:0,
            base_amount : 0,
            net:0
          },
        });
      });
    } else if (fieldName === 'qty' && val) {
      if (val > formValue?.data?.available_qty) {
        isSuccess("Qty should not be greater than availabel qty","error")
        setformValue({
          data:{
            ...formValue?.data,
            qty : ""
          }
        })
      }else{
        const quantity = parseFloat(val);
        const amt = parseFloat(formValue?.data?.rate) * quantity;
        const discountAmt: any =
          amt - (amt * parseFloat(formValue?.data?.discount)) / 100;
  
        let taxValue: any =
          parseFloat(discountAmt) +
          (parseFloat(discountAmt) * (parseFloat(formValue?.data?.tax))) /
            100;
  
            if (isNaN(taxValue)) {
              taxValue = formValue?.data?.net||0;
          }
  
        setformValue({
          data: {
            ...formValue?.data,
            qty: quantity,
            amount: amt||0 ,
            net: taxValue,
            base_amount:formValue?.data?.discount ? discountAmt :amt
          },
        });
      }
    
    } else if (fieldName === 'rate' && val) {
      const rate = parseFloat(val);
      const qty = parseFloat(formValue?.data?.qty);
      const amt = rate * qty;
      const discountAmt: any =
        amt - (amt * parseFloat(formValue?.data?.discount)) / 100;

      let taxValue: any =
        parseFloat(discountAmt) +
        (parseFloat(discountAmt) * (parseFloat(formValue?.data?.tax) )) /
          100;


          if (isNaN(taxValue)) {
            taxValue = formValue?.data?.net||0;
        }

      setformValue({
        data: {
          ...formValue?.data,
          rate: val,
          amount: amt.toFixed(2),
          net: taxValue||0,
        },
      });
    } else if (fieldName === 'discount' && val) {
      if (val <= 100) {
        const discountAmt: any =
          parseFloat(formValue?.data?.amount) -
          (parseFloat(formValue?.data?.amount) * parseFloat(val)) / 100;

        const taxValue: any =
          parseFloat(discountAmt) +
          (parseFloat(discountAmt) * (parseFloat(formValue?.data?.tax) || 0)) /
            100;

        setformValue({
          data: {
            ...formValue?.data,
            discount: val,
            tax: formValue?.data?.tax || 0,
            net: taxValue.toFixed(2) || 0,
            base_amount:discountAmt
          },
        });
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
          parseFloat(formValue?.data?.discount||0)) /
          100;

      let taxValue: any =
        parseFloat(discountAmt) +
        (parseFloat(discountAmt) * parseFloat(val)) / 100;

        if (isNaN(taxValue)) {
          taxValue = formValue?.data?.net;
      }
      setformValue({
        data: {
          ...formValue?.data,
          tax: val,
          discount: formValue?.data?.discount,
          net: taxValue.toFixed(2),
          c_gst : val/2,
          s_gst : val/2
        },
      });
    }
  };

  const handleFinish = (values: any) => {
    const record = {
      name: mainId,
      data: {
        products: values.map((item:any)=>({
         ...item,
         products : item?.products?.name,
         name: undefined,
          creation: undefined,
          modified: undefined,
          modified_by: undefined,
          owner: undefined,
          docstatus: undefined,
          parent: undefined,
          parentfield: undefined,
          parenttype: undefined,
          idx: undefined,
          debit_note_no: undefined,
        })),
      },
    };

    updateRecord('debit_note', record, 'account_management', 'htsaccount').then(
      (items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-debit-note-with-gst');
        } else {
          isSuccess(items?.message, 'error');
        }
      }
    );
  };

  const formTableEditRow = (items: any) => {
    
    setformData((pre: any) => {
      return pre.map((item: any) => {
        if (item.name === 'products') {
          return { ...item, disabled: true };
        }
        return item;
      });
    });
    setformValue({
      ...formValue,
      data: { 
        ...items,
        // products : items?.products,
        active: items?.active === 1 ? true : false },
    });
  };

  return (
    <>
      {/* <Spin loading={loading}/>    */}
      <FormTable
        formValue={formValue?.data}
        formData={formData}
        columns={columns}
        module="account_management"
        doctype="Debit Note Entries"
        doc_id={mainId}
        handleFinish={handleFinish}
        appname="htsaccount"
        submitButtonLabel="Submit"
        onchangehandler={onchangeHandler}
        tableData={formValue?.tabledata}
        formTableEditRow={formTableEditRow}
        checkDuplicateData={CheckDuplicateData}
        CheckProductQuantity={CheckProductQuantity}
      />
    </>
  );
};

export default AddProductReturn;
