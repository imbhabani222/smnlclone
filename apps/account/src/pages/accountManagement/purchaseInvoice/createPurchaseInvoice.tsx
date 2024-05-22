import React, { useCallback, useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getDocTypes,
  getTableData,
  getSupplierGRN,
  getPIRecordById,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import {
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';
import {
  ledgerColumntype1,
  supplierColumn,
  ledgerSearchIndexex,
  supplierSearchIndex,
  getTotalAmount,
  getNetCalculation,
  getTotalAmountfromProductsAdded,
} from '../helper';
import moment from 'moment';

const Create = (props: any) => {
  const {
    doc_id,
    setDoc_id,
    switchToNextTab = () => {},
    setSupplier_id,
    setGrn_id,
  } = props;
  const navigate = useNavigate();

  const [formData, setformData] = useState([]);
  const [loading, setloading] = useState(true);
  const [searchParams, _] = useSearchParams();
  const [selectedId, setSelectedId] = useState<any>([]);
  const [formValue, setformValue] = useState<any>({});
  const [product, setProduct] = useState<any>({
    suppProduct: [],
    grnProducts: [],
    grnGate: [],
  });
  const [imageData, setImageData] = useState<any>({})

  const term = searchParams.get('id');

  useEffect(() => {
    setloading(true);
    const currentDate = moment().format('YYYY-MM-DD');
    getFields('Purchase Invoice', 'htssuite').then((items) => {
      const da: any = [];
      items.map((e: any) => {
        if (e?.name !== 'products' && e?.name !== 'gate_pass') {
          da.push(e);
        }
      });
      da?.pop();
      da?.forEach((item: any) => {
        if (item.name === 'ledger_ac') {
          item.datatype = 'TableSelect';
          item.columns = ledgerColumntype1;
          item.searchIndexes = ledgerSearchIndexex;
        } else if (item.name === 'supplier') {
          item.datatype = 'TableSelect';
          item.columns = supplierColumn;
          item.searchIndexes = supplierSearchIndex;
        }
      });
      if (term) {
        const disableBooleanMap: any = {
          supplier: true,
          tcs: true,
          ledger_ac: true,
          grn_no: true,
        };
        da?.forEach((item: any) => {
          if (disableBooleanMap[item.name]) {
            item.disabled = true;
          }
        });
      }
      setformData(da);
      setformValue({
        ...formValue,
        date: datetoFrom(currentDate),
      });
      setloading(false);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'purchase_invoice',
        data,
        'account_management',
        'htsaccount'
      ).then(async (item: any) => {        
        setSupplier_id(item?.supplier?.name);
        setGrn_id(item?.grn_no);
        setSelectedId({
          supplier: item?.supplier?.name,
          ledger_ac: item?.ledger_ac?.name,
        });
        const totalValue = getTotalAmountfromProductsAdded(item?.products);
        let val = { netValue: 0, roundOffValue: '0.00' };
        await getNetCalculation(totalValue, item?.tds, item?.tcs).then(
          (res) => {
            val = res;
          }
        );
              setformValue({
          ...item,
          date: datetoFrom(item?.date),
          invoice_date: datetoFrom(item?.invoice_date || currentDate),
          supplier: item?.supplier?.name,
          grn_no: item?.grn_no?.name,
          ledger_ac: item?.ledger_ac?.name ,
          net_value: totalValue,
          invoice_value: val?.netValue,
          round_up: val?.roundOffValue,
          upload_doc: item?.upload_doc ? `${item?.upload_doc}` : null,
        });
        setProduct(item?.products);
      });
    }
  }, [term]);

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          date: dateFormat(e?.date),
          invoice_date: dateFormat(e?.invoice_date),
          ledger_ac: selectedId?.ledger_ac,
          supplier: selectedId?.supplier,
          upload_doc: imageData?.file,
          products: product?.map((item: any) => ({
            ...item,
            products: item?.products?.name,
            purchase_invoice_no: undefined,
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
          })),
          gross_value: 0,
        },
      };

      updateRecord(
        'purchase_invoice',
        record,
        'account_management',
        'htsaccount'
      ).then((items: any) => {
        if (items?.status === 200) {
          setDoc_id(items?.data?.id);
          isSuccess(items?.message, 'success');
          switchToNextTab(
            '/add-purchase-invoice-product',
            items?.data?.id,
            e?.grn_no,
            e?.supplier
          );
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        date: dateFormat(e?.date),
        invoice_date: dateFormat(e?.invoice_date),
        gross_value: 0,
        upload_doc : imageData?.file,
      };

      createRecord(
        'purchase_invoice',
        record,
        'account_management',
        'htsaccount'
      ).then((items) => {
        if (items?.status === 200) {
          setDoc_id(items?.data?.id);

          // const record = {
          //   name: items?.data?.id,
          //   data: [
          //     {
          //       products: product?.grnProducts,
          //       gate_pass: product?.grnGate,
          //       gross_value: 0,
          //     },
          //   ],
          // };
          // updateRecord(
          //   'purchase_invoice',
          //   record,
          //   'account_management',
          //   'htsaccount'
          // ).then((itemss: any) => {
          //   if (itemss?.status === 200) {
          //     // isSuccess(itemss?.message, 'success');
          //   } else {
          //     isSuccess(
          //       'Record created sucessfully but Failed to Update the records',
          //       'error'
          //     );
          //   }
          // });
          isSuccess(items?.message, 'success');
          switchToNextTab(
            '/add-purchase-invoice-product',
            items?.data?.id,
            e?.grn_no,
            e?.supplier
          );
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  const formChangeHandler = useCallback(
    async (
      e: any,
      fieldName: any,
      event: any,
      selectBoxOptions: any,
      form: any
    ) => {
      if (fieldName === 'supplier') {
        getSupplierGRN(e, 'htsinventory').then((response) => {
          setProduct(response);
          const grnOptions = response?.map((item: any) => ({
            label: `${item.name}`,
            value: `${item.name}`,
          }));
          const grnFieldIndex: any = formData.findIndex(
            (item: any) => item.name === 'grn_no'
          );

          const grnField: any = formData.find(
            (item: any) => item.name === 'grn_no'
          );
          setProduct((pre: any) => ({ ...pre, suppProduct: response }));
          const newGrnData = {
            ...grnField,
            datatype: 'Select',
            options: grnOptions,
          };

          const updatedFormData: any = [...formData];
          updatedFormData[grnFieldIndex] = newGrnData;
          setformData(updatedFormData);
        });
      } else if (fieldName === 'grn_no') {
        let grndetails: any = {};
        for (let i of product?.suppProduct) {
          if (i.name === e) {
            grndetails = i;
            break;
          }
        }
        const proGate = grndetails?.gate_pass?.map((gate: any) => ({
          ...gate,
          gate_pass_date: gate?.gate_pass_date,
          lr_no: gate?.lr_no,
          lr_date: gate?.lr_date,
          bags: gate?.bags,
          bundles: gate?.bundles,
          boxes: gate?.boxes,
          gate_pass_no: gate?.gate_pass_no,
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
          narration: undefined,
          _user_tags: undefined,
          _comments: undefined,
          _assign: undefined,
          _liked_by: undefined,
        }));
        const pro = grndetails?.products?.map((item: any) => ({
          ...item,
          products: item?.part?.id,
          part: undefined,
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
          uom: item?.uom?.id,
        }));
        setProduct((pre: any) => ({
          ...pre,
          grnProducts: pro,
          grnGate: proGate,
        }));
        const totalAmount = getTotalAmountfromProductsAdded(
          grndetails?.products
        );
        const disableBooleanMap: any = {
          supplier: true,
        };
        formData?.forEach((item: any) => {
          if (disableBooleanMap[item.name]) {
            item.disabled = true;
          }
        });
        setformData(formData);
        setformValue({
          ...formValue,
          invoice_no: grndetails?.invoice_no || '-',
          invoice_date: datetoFrom(grndetails?.invoice_date),
          project_name: grndetails?.project_name || '-',
          delivery_type: grndetails.delivery_type || '-',
          doc_header_text: grndetails.doc_header_text || '-',
          net_value: totalAmount || 0,
        });
      } else if (fieldName === 'tds' || fieldName === 'tcs') {
        const fields = form?.getFieldsValue(true);
        const val: any = await getNetCalculation(
          fields?.net_value,
          fields?.tds,
          fields?.tcs
        ).then((i: any) => {
          return i;
        });
        setformValue({
          ...formValue,
          invoice_value: val?.netValue,
          round_up: val?.roundOffValue,
        });
      }
    },
    [formData, formValue]
  );

  
  const onHandleImageUpload = (data:any, item:any) => {
    setImageData({
      file:  data?.originalfile,
      data:data,
      fileType:item
    })
  }

  return (
    <>
      <Spin loading={loading} />
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsaccount"
        onChange={formChangeHandler}
        submitButtonLabel="Save & Continue"
        dynamicLayout
        handleImageUpload = {onHandleImageUpload}
      />
    </>
  );
};

export default Create;
