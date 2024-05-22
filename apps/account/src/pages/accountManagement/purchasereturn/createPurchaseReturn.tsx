import React, { useCallback, useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getSupplierGRNReturn,
} from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import {
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';
import {
  ledgerSearchIndexex,
  ledgerColumntype1,
  supplierColumn,
  supplierSearchIndex,
  getTotalAmountfromProductsAdded,
  getNetCalculation,
} from '../helper';
import moment from 'moment';

type Props = {
  doc_id: string | null;
  setDoc_id: any;
  switchToNextTab?: any;
  url?: string;
  setSupplier_id?: any;
  setGrn_id?: any;
};

const Create = (props: any) => {
  const {
    doc_id,
    setDoc_id,
    switchToNextTab = () => {},
    setGrn_id,
    setSupplier_id,
  } = props;
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({});
  const [products, setProducts] = useState<any>([]);
  const [loading, setloading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [imageData, setImageData] = useState<any>({})
  const term = searchParams.get('id');

  useEffect(() => {
    setloading(true);
    getFields('Purchase Return', 'htssuite').then((items) => {
      items?.forEach((item: any) => {
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
          grn_return: true,
          invoice_no: true,
        };
        items?.forEach((item: any) => {
          if (disableBooleanMap[item.name]) {
            item.disabled = true;
          }
        });
      }

      setformData(items);
      setloading(false);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'purchase_return',
        data,
        'account_management',
        'htsaccount'
      ).then(async (items) => {
        setSupplier_id(items?.supplier);
        setGrn_id(items?.grn_return);
        const totalValue = getTotalAmountfromProductsAdded(items?.details);
        let val = { netValue: 0, roundOffValue: '0.00' };
        await getNetCalculation(totalValue, items?.tds, items?.tcs).then(
          (res) => {
            val = res;
          }
        );
        setformValue({
          ...items,
          return_date: datetoFrom(items?.return_date),
          invoice_date: datetoFrom(items?.invoice_date),
          grn_return: items?.grn_return?.name,
          net_value: totalValue,
          invoice_value: val?.netValue,
          round_up: val?.roundOffValue,
          upload_doc: items?.upload_doc ? `${items?.upload_doc}` : null,

        });
        setProducts(items?.details);
      });
    } else {
      const currentDate = moment().format('YYYY-MM-DD');
      setformValue({
        return_date: datetoFrom(currentDate),
      });
    }
  }, [term]);

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          return_date: dateFormat(e?.return_date),
          invoice_date: dateFormat(e?.invoice_date),
          ledger_ac: e?.ledger_ac?.name,
          supplier: e?.supplier?.name,
          upload_doc : imageData?.file,
          products: products?.map((item: any) => ({
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
          switchToNextTab(
            '/return-product',
            items?.data?.id,
            e?.grn_return,
            e?.supplier
          );
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        return_date: dateFormat(e?.return_date),
        invoice_date: dateFormat(e?.invoice_date),
        active: e?.active ? 1 : 0,
        upload_doc : imageData?.file,
      };

      createRecord(
        'purchase_return',
        record,
        'account_management',
        'htsaccount'
      ).then((items) => {
        if (items?.status === 200) {
          setDoc_id(items?.data?.id);

          // const record = {
          //   name: items?.data?.id,
          //   data: {
          //     products: products?.grnProducts,
          //   },
          // };
          // updateRecord(
          //   'purchase_return',
          //   record,
          //   'account_management',
          //   'htsaccount'
          // ).then((itemss: any) => {
          //   if (itemss?.status === 200) {
          //     //  isSuccess(itemss?.message, 'success');
          //   } else {
          //     isSuccess(
          //       'Record created sucessfully but Failed to Update the records',
          //       'error'
          //     );
          //   }
          // });
          isSuccess(items?.message, 'success');
          switchToNextTab(
            '/return-product',
            items?.data?.id,
            e?.grn_return,
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
        getSupplierGRNReturn(e, 'htsinventory').then((response) => {
          setProducts(response);
          const grnOptions = response?.map((item: any) => ({
            label: `${item.name}`,
            value: `${item.name}`,
          }));
          const grnFieldIndex: any = formData.findIndex(
            (item: any) => item.name === 'grn_return'
          );

          const grnField: any = formData.find(
            (item: any) => item.name === 'grn_return'
          );
          setProducts((pre: any) => ({ ...pre, suppProduct: response }));
          const newGrnData = {
            ...grnField,
            datatype: 'Select',
            options: grnOptions,
          };

          const updatedFormData: any = [...formData];
          updatedFormData[grnFieldIndex] = newGrnData;
          setformData(updatedFormData);
        });
      }
      if (fieldName == 'grn_return') {
        let grnDetails: any = {};

        for (let i of products?.suppProduct) {
          if (i.name === e) {
            grnDetails = i;
            break;
          }
        }

        const pro = grnDetails?.products?.map((item: any) => ({
          ...item,
          products: item?.part,
          part: undefined,
          name: undefined,
          creation: undefined,
          grn_return_no: undefined,
          grn_qty: undefined,
          modified: undefined,
          modified_by: undefined,
          owner: undefined,
          docstatus: undefined,
          parent: undefined,
          parentfield: undefined,
          parenttype: undefined,
          idx: undefined,
          uom: item?.uom,
        }));
        setProducts((pre: any) => ({ ...pre, grnProducts: pro }));

        const totalAmount = getTotalAmountfromProductsAdded(
          grnDetails?.products
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
          from: grnDetails?.from,
          invoice_date: datetoFrom(grnDetails.invoice_date),
          invoice_no: grnDetails.invoice,
          narration: grnDetails.narration,
          // invoice_value: totalAmount || 0,
          net_value: totalAmount || 0,
        });
      } else if (fieldName === 'tcs' && e) {
        const fields = form?.getFieldsValue(true);
        const val: any = await getNetCalculation(
          fields?.total_value,
          '',
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
    <div>
      <Spin loading={loading} />
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        onChange={formChangeHandler}
        handleImageUpload = {onHandleImageUpload}
        appname="htsaccount"
        dynamicLayout
        submitButtonLabel="Save & Continue"
      />
    </div>
  );
};

export default Create;