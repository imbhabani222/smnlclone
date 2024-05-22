import React, { useCallback, useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getDocTypes,
  getTableData,
  getSupplierLocation,
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
import moment from 'moment';
import {
  ledgerColumntype1,
  supplierColumn,
  ledgerSearchIndexex,
  supplierSearchIndex,
  getNetCalculation,
  getTotalAmountfromProductsAdded,
} from '../helper';

const Create = (props: any) => {
  const { doc_id, setDoc_id, switchToNextTab = () => {} } = props;
  const navigate = useNavigate();

  const [formData, setformData] = useState([]);

  const [reload, setReload] = useState(false);
  const [loading, setloading] = useState(true);
  const [searchParams, _] = useSearchParams();
  const [formValue, setformValue] = useState({});
  const [imageData, setImageData] = useState<any>({})

  const term = searchParams.get('id');

  useEffect(() => {
    const currentDate = moment().format('YYYY/MM/DD');

    getFields('Debit Note', 'htssuite').then((items) => {
      items?.forEach((item: any) => {
        if (item.name === 'ledger_ac') {
          item.datatype = 'TableSelect';
          item.columns = ledgerColumntype1;
          item.searchIndexes = ledgerSearchIndexex;
        } else if (item.name === 'customer_supplier') {
          item.datatype = 'TableSelect';
          item.columns = supplierColumn;
          item.searchIndexes = supplierSearchIndex;
        }
      });
      if (term) {
        const disableBooleanMap: any = {
          customer_supplier: true,
          tcs: true,
          ledger_ac: true,
        };
        items?.forEach((item: any) => {
          if (disableBooleanMap[item.name]) {
            item.disabled = true;
          }
        });
      }
      setformData(items);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'debit_note',
        data,
        'account_management',
        'htsaccount'
      ).then(async (item: any) => {
        const totalValue = getTotalAmountfromProductsAdded(item?.product);
        let val = { netValue: 0, roundOffValue: '0.00' };
        await getNetCalculation(totalValue, '', item?.tcs).then((res) => {
          val = res;
        });
        setformValue({
          ...item,
          // customer_supplier: item?.customer_supplier?.customer_supplier,
          // ledger_ac: item?.ledger_ac?.ledger_ac,
          voucher_date: datetoFrom(item?.voucher_date),
          ref_date: datetoFrom(item?.ref_date),
          accounting_date: datetoFrom(item?.accounting_date),
          invoice_value: val?.netValue,
          round_up: val?.roundOffValue,
          upload_doc: item?.upload_doc ? `data:application/pdf;base64,${item?.upload_doc}` : null,

        });
      });
    } else {
      setformValue({
        // bank_ac_ledger_credit: 'Cash',
        voucher_date: datetoFrom(currentDate),
        accounting_date: datetoFrom(currentDate),
        ref_date: datetoFrom(currentDate),
        // closing_balance: 0,
        // upload_document: null,
      });
    }
  }, [term]);

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          customer_supplier: e?.customer_supplier?.name,
          ledger_ac: e?.ledger_ac?.name,
          voucher_date: dateFormat(e?.voucher_date),
          ref_date: dateFormat(e?.ref_date),
          accounting_date: dateFormat(e?.accounting_date),
          upload_doc : imageData?.file,

        },
      };

      updateRecord(
        'debit_note',
        record,
        'account_management',
        'htsaccount'
      ).then((items: any) => {
        if (items?.status === 200) {
          setDoc_id(items?.data?.id);
          isSuccess(items?.message, 'success');
          switchToNextTab('/add-debit-note-product', items?.data?.id);
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        voucher_date: dateFormat(e?.voucher_date),
        ref_date: dateFormat(e?.ref_date),
        accounting_date: dateFormat(e?.accounting_date),
        upload_doc : imageData?.file,
      };

      createRecord(
        'debit_note',
        record,
        'account_management',
        'htsaccount'
      ).then((items) => {
        if (items?.status === 200) {
          setDoc_id(items?.data?.id);
          isSuccess(items?.message, 'success');
          switchToNextTab('/add-debit-note-product', items?.data?.id);
        } else {
          isSuccess(items?.message, 'error');
        }
        setReload((pre: any) => !pre);
      });
    }
  };

  // const formChangeHandler = useCallback(
  //   (e: any, fieldName: any) => {
  //     if (fieldName === 'supplier') {
  //       getSupplierLocation(e, 'htsinventory').then((response) => {
  //         const locationsOptions = response.map((item: any) => ({
  //           label: `${item.name}  ${item.city}`,
  //           value: item.name,
  //         }));

  //         const locationFieldIndex: any = formData.findIndex(
  //           (item: any) => item.name === 'location'
  //         );
  //         const locationField: any = formData.find(
  //           (item: any) => item.name === 'location'
  //         );

  //         const newLocationData = {
  //           ...locationField,
  //           datatype: 'Select',
  //           options: locationsOptions,
  //         };
  //         const updatedFormData: any = [...formData];
  //         updatedFormData[locationFieldIndex] = newLocationData;
  //         setformData(updatedFormData);
  //       });
  //     }
  //     if (fieldName === 'indent_no') {
  //       getPIRecordById(
  //         'inventory_purchase_indent',
  //         e,
  //         'inventory_purchase_management',
  //         'htsinventory'
  //       ).then((items) => {
  //         setProductDetails(items);
  //       });
  //     }
  //   },
  //   [formData]
  // );

  const onHandleImageUpload = (data:any, item:any) => {
    setImageData({
      file: data?.file,
      data:data,
      fileType:item
    })
  }

  return (
    <>
      {/* <Spin loading={loading} /> */}
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        handleImageUpload = {onHandleImageUpload}
        appname="htsaccount"
        dynamicLayout
      />
    </>
  );
};

export default Create;
