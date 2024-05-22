import React, { useState, useEffect } from 'react';

import {
  getDocTypes,
  getLinkValue,
  getProductById,
  getRecordById,
  getTableData,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';

import FormTable from '../../../../../../libs/common/ui/Form_Table/FormTable';
import { getFields } from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { CheckDuplicateData, CheckProductQuantity } from '../helper';


const AddProductReturn = (props: any) => {

  const [formData, setformData] = useState<any>([]);
  const [formValue, setformValue] = useState<any>([]);
  const [columns, setcolumns] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>([]);
  const [selectCostCenter, setSelectCostCenter] = useState<any>([])
  const [searchParams] = useSearchParams();
  const [Errors, setErrors] = useState<any>({
    isError: false,
    errors: {},
  });


  const mainId = searchParams.get('id') || '';
  const navigate = useNavigate();




  useEffect(() => {
    if (mainId) {
      getFields('Service Expense Invoice Entries', 'htssuite').then((_items) => {
        const itemsss = _items.map((itemsData: any) => {
          if (itemsData.name === "products") {
            return {
              "label": "Products",
              "name": "products",
              "title": " Products",
              "dataIndex": "products",
              "key": "products",
              "fieldtype": 'TableSelect',
              "datatype": 'TableSelect',
              "description": {
                "search": 'inventory_product_configuration.doctype.inventory_product_master.api.search_product?search=',
                "linkfield": "part_name",
                "modulename": "inventory_product_configuration",
                "appname": "htsinventory"
              },
              "options": "Inventory Product Master",
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
          else {
            return itemsData
          }
        })
        setformData(itemsss)

        getDocTypes('Service Expense Invoice Entries', false, 'htssuite').then(
          (items) => {
            let newData = items.filter((item: any) => {
              const reqFields = [
                "products",
                "cost_center",
                "uom",
                "amount",
                "net",
                "action"

              ]
              if (reqFields.includes(item.dataIndex)) {
                return true
              } else {
                return false
              }

            });
            setcolumns(newData)
          }
        );
        const data = { name: mainId };
        getRecordById(
          'service_expense_invoice',
          data,
          'account_management',
          'htsaccount'
        ).then((items) => {

          setformValue({
            ...formValue,
            products: items?.products?.map((item: any) => ({
              ...item,
              products: item?.products?.name,
              cost_center: item?.cost_center?.name
            })),
            tabledata: items?.products?.map((item: any) => ({
              ...item,
              products: item?.products,
            }))
          })

        });
      });

    }
  }, [mainId]);



  const onchangeHandler = (val: any, fieldName: any) => {
    if (fieldName === 'products' && val) {
      getProductById(
        'service_expense_invoice',
        val,
        'account_management',
        'htsaccount'
      ).then((items) => {

        setformValue({
          ...formValue,
          data: {
            ...items,
            products: { name: items?.product?.id, products: items?.product?.name },
            uom: items?.uom,
            sei_no: mainId,
            rate: parseFloat(items?.rate),
            available_qty: items?.available_qty,
            c_gst: items?.c_gst,
            i_gst: items?.i_gst,
            s_gst: items?.s_gst,
            // tax : 18,
            qty: 0,
            discount: 0,
            amount: 0,
            base_amount: 0,
            net: 0
          }
        })
      });
    } else if (fieldName === "cost_center") {

      getTableData('inventory_cost_center', 'inventory_account_configuration', 'htsaccount').then((items) => {
        const costCenter = items?.find((item: any) => item.name === val)

        setformValue({
          data: {
            cost_center: { cost_center: costCenter?.cost_center_name, name: costCenter?.name }
            // cost_center : costCenter?.cost_center_name
          }
        })

      })


    } else if (fieldName === "qty" && val) {
      if (val > formValue?.data?.available_qty) {
        isSuccess("Qty should not be greater than availabel qty", "error")
        setformValue({
          data: {
            ...formValue?.data,
            qty: ""
          }
        })
      } else {
        const quantity = parseFloat(val)
        let amt = parseFloat(formValue?.data?.rate) * quantity
        const discountAmt: any = amt - (amt * parseFloat(formValue?.data?.discount)) / 100
        let taxValue: any = parseFloat(discountAmt) + (parseFloat(discountAmt) * (parseFloat(formValue?.data?.tax))) / 100

        if (isNaN(taxValue)) {
          taxValue = formValue?.data?.net || 0;
        }
        if (isNaN(amt)) {
          amt = 0
        }

        setformValue({
          data: {
            ...formValue?.data,
            qty: quantity,
            amount: amt,
            net: taxValue,
            base_amount: formValue?.data?.discount ? discountAmt : amt

          }

        })
      }

    } else if (fieldName === "rate" && val) {
      const rate = parseFloat(val)
      const qty = parseFloat(formValue?.data?.qty)
      const amt = rate * qty
      const discountAmt: any = amt - (amt * parseFloat(formValue?.data?.discount)) / 100

      let taxValue: any = parseFloat(discountAmt) + (parseFloat(discountAmt) * (parseFloat(formValue?.data?.tax))) / 100

      if (isNaN(taxValue)) {
        taxValue = formValue?.data?.net || 0;
      }

      setformValue({
        data: {
          ...formValue?.data,
          rate: rate,
          amount: amt.toFixed(2),
          net: taxValue || 0,
          base_amount: formValue?.data?.discount ? discountAmt : null
        }

      })
    } else if (fieldName === "discount" && val) {
      if (val <= 100) {
        const discountAmt: any = parseFloat(formValue?.data?.amount) - (parseFloat(formValue?.data?.amount) * parseFloat(val)) / 100

        const taxValue: any = parseFloat(discountAmt) + (parseFloat(discountAmt) * (parseFloat(formValue?.data?.tax) || 0)) / 100
        setformValue({
          data: {
            ...formValue?.data,
            discount: val,
            tax: formValue?.data?.tax || 0,
            net: taxValue.toFixed(2) || 0,
            base_amount: discountAmt
          }
        })

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



    } else if (fieldName === "tax") {
      const discountAmt: any = parseFloat(formValue?.data?.amount) - (parseFloat(formValue?.data?.amount) * parseFloat(formValue?.data?.discount || 0)) / 100

      let taxValue: any = parseFloat(discountAmt) + (parseFloat(discountAmt) * parseFloat(val)) / 100

      if (isNaN(taxValue)) {
        taxValue = formValue?.data?.net;
      }
      setformValue({
        data: {
          ...formValue?.data,
          tax: val,
          discount: formValue?.data?.discount,
          net: taxValue.toFixed(2),
          c_gst: val / 2,
          s_gst: val / 2
        }
      })
    }








    // if (val) {            
    //     const amt :any = parseFloat(val)* parseFloat(formValue?.data?.rate)
    //     setformValue({
    //         data:{
    //             ...formValue?.data,
    //             qty: val,
    //             amount : amt
    //         }
    //     })
    // }
  }

  // setformValue({
  //     ...formValue,
  //     amount : formValue?.
  // })






  const handleFinish = (values: any) => {


    const record = {
      name: mainId,
      data: {
        products: values.map((item: any) => ({
          ...item,
          products: item?.products?.name,
          cost_center: item?.cost_center?.name,
          name: undefined,
          // creation: undefined,
          // modified: undefined,
          modified_by: undefined,
          owner: undefined,
          docstatus: undefined,
          parent: undefined,
          parentfield: undefined,
          parenttype: undefined,
          idx: undefined,
          sei_no: undefined,
        }))
      }

    }




    updateRecord(
      'service_expense_invoice',
      record,
      'account_management',
      'htsaccount'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        navigate('/view-service-expense-invoice');
      } else {
        isSuccess(items?.message, 'error');
      }
    });
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
      data: {
        ...items,
        products: items?.products,
        active: items?.active === 1 ? true : false,
      },
    });
  }

  return (
    <>

      {/* <Spin loading={loading}/>    */}
      <FormTable
        formValue={formValue?.data}
        formData={formData}
        columns={columns}
        module="account_management"
        doctype="Service Expense Invoice Entries"
        doc_id={mainId}
        handleFinish={handleFinish}
        appname="htsaccount"
        submitButtonLabel="Submit"
        onchangehandler={onchangeHandler}
        tableData={formValue?.tabledata}
        formTableEditRow={formTableEditRow}
        isError={Errors}
        checkDuplicateData={CheckDuplicateData}
        CheckProductQuantity={CheckProductQuantity}
      // selectedProduct={selectedProduct}
      />
    </>
  );
};

export default AddProductReturn;
