import React, { useEffect, useState } from 'react';
import {
  getFields,
  getRecordById,
  getDocTypes,
  updateRecord,
  createRecord,
  getProductById,
  getSupplierGRNReturn,
  getPIRecordById,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import Message from '../../../../../../libs/common/ui/Message/message';
/* @ts-ignore  */
import FormTable from '../../../../../../libs/common/ui/Form_Table/FormTable';
import { useSearchParams } from 'react-router-dom';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

const Create = (props: any) => {
  const { doc_id, setDoc_id, switchToNextTab = () => {} } = props;
  const [searchParams] = useSearchParams();
  const mainId = searchParams.get('id') || '';
  const [formData, setformData] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [loading, setloading] = useState(true);

  const [Errors, setErrors] = useState<any>({
    isError: false,
    errors: {},
  });
 
  const [formValue, setformValue] = useState<any>([]);

  const [subid, setsubid] = useState(null);
  const [selectedId, setSelectedId] = useState<any>([]);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [grn_id,setGrnId] = useState();
  const grnId = searchParams.get('grn') || '';
  const supId = searchParams.get('supId') || '';
  let options: any = [];

  useEffect(() => {
    setloading(true);
    if (mainId) {
      getFields('Purchase Return Entries', 'htssuite').then((items) => {
        const disableBooleanMap: any = {
          products: true,
        };
        items?.forEach((item: any) => {
          if (disableBooleanMap[item.name]) {
            item.disabled = true;
          }
        });
        setformData(items);
      });
      getDocTypes('Purchase Return Entries', false, 'htssuite').then(
        (items) => {
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
          setloading(false);
        }
      );

      

      const data = { name: mainId };
      getRecordById(
        'purchase_return',
        data,
        'account_management',
        'htsaccount'
      ).then((items) => {
        console.log(items,"item 0")
        setGrnId(items?.grn_return?.name)
        // setSelectedId(items?.details?.map((item: any) => item?.products));
        // setformValue({
        //   ...formValue,
        //   products: items?.details?.map((item: any) => ({
        //     ...item,
        //     products: item?.products?.name,
        //   })),
        //   tabledata: items?.details?.map((item: any) => ({
        //     ...item,
        //     products: item?.products?.products,
        //   })),
        // });
        getPIRecordById(
          'inventory_grn_return',
          items?.grn_return?.name,
          'inventory_management',
          'htsinventory'
        ).then((items:any) => {
          console.log(items,"item")
          setSelectedId(items?.products?.map((item: any) => item?.products));
        setformValue({
          ...formValue,
          products: items?.products?.map((item: any) => ({
            ...item,
            products: item?.part,
            i_gst:item?.igst,
            c_gst:item?.cgst,
            s_gst:item?.sgst,
          })),
          tabledata: items?.products?.map((item: any) => ({
            ...item,
            products: item?.part,
            i_gst:item?.igst,
            c_gst:item?.cgst,
            s_gst:item?.sgst,
          })),
        });
        });
      });
    }
  }, [mainId, product]);
  console.log(selectedId, 'selectedidd');
  console.log(formValue, 'formmm');

  const handleFinish = (values: any) => {
    console.log(values, 'valuesss');

    const value = values.map((items:any)=>{
      delete items.emp_code;
      return items
    })

    console.log(value,"emp_code")

    const record = {
      name: mainId,
      data: {
        products: value
      },
    };

    updateRecord(
      'purchase_return',
      record,
      'account_management',
      'htsaccount'
    ).then((items: any) => {
      if (items?.status === 200) {
        setDoc_id(items?.data?.id);
        isSuccess(items?.message, 'success');
        navigate('/view-purchase-return-register');
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };

  // @ts-ignore

  const formTableEditRow = (items: any) => {
    setformValue({
      ...formValue,
      data: { ...items, rate: items?.mrp_price || items?.rate, base_amount:(items?.amount -items?.amount*(items?.discount/100) ) },
      
    });
  };

  const onchangeHandler = (val: any, fieldName: any) => {
    if (fieldName === 'rate') {
      const rate = parseFloat(val) || 0;
      const amt = rate * parseFloat(formValue?.data?.qty);
      const discountAmt: any =
        amt - (amt * parseFloat(formValue?.data?.discount)) / 100;

      const taxValue: any =
        parseFloat(discountAmt) +
        (parseFloat(discountAmt) * (parseFloat(formValue?.data?.tax) || 0)) /
          100;

      setformValue((pre: any) => ({
        ...pre,
        data: {
          ...formValue?.data,
          rate: val,
          amount: amt.toFixed(2),
          net: taxValue,
        },
      }));
    } else if (fieldName === 'discount') {
      if (val <= 100) {
        const discountAmt: any =
          parseFloat(formValue?.data?.amount) -
          (parseFloat(formValue?.data?.amount) * parseFloat(val)) / 100;
        const taxValue: any =
          parseFloat(discountAmt) +
          (parseFloat(discountAmt) * (parseFloat(formValue?.data?.tax) || 0)) /
            100;
        setformValue((pre: any) => ({
          ...pre,
          data: {
            ...formValue?.data,
            discount: val,
            tax: formValue?.data?.tax || 0,
            net: taxValue || 0,
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

  return (
    <div>
      {/* @ts-ignore  */}
      <Spin loading={loading} />
      <FormTable
        formValue={formValue?.data}
        formData={formData}
        columns={columns}
        module="account_management"
        doctype="Purchase Return Entries"
        doc_id={mainId}
        showDelete={false}
        handleFinish={handleFinish}
        appname="htsaccount"
        submitButtonLabel="Submit"
        onchangehandler={onchangeHandler}
        tableData={formValue?.tabledata}
        formTableEditRow={formTableEditRow}
        onhideCancelButton={true}
      />
    </div>
  );
};

export default Create;