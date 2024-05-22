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
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import {
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';
import { Modal } from 'antd';
import InputField from '../../../../../../libs/common/ui/InputField/inputField';
import { log } from 'console';
import {
  getNetCalculation,
  getTotalAmountfromProductsAdded,
  ledgerColumn,
  ledgerSearchIndexex,
} from '../helper';
import moment from 'moment';
import InputNumbers from '../../../../../../libs/common/ui/InputNumber/inputNumber';
const Create = (props: any) => {
  const { doc_id, setDoc_id, switchToNextTab = () => {} } = props;
  const navigate = useNavigate();

  const [formData, setformData] = useState([]);

  const [reload, setReload] = useState(false);
  const [loading, setloading] = useState(true);
  const [searchParams, _] = useSearchParams();
  const [formValue, setformValue] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [recoveryComponents, setRecoveryComponents] = useState<any>([]);
  const [recoveryAmounts, setRecoveryAmounts] = useState<any>([]);
  const [imageData, setImageData] = useState<any>({})


  const term = searchParams.get('id');

  useEffect(() => {
    const currentDate = moment().format('YYYY/MM/DD');
    setloading(true);
    getFields('Service Expense Invoice', 'htssuite').then((items) => {
      items.forEach((item: any) => {
        if (item.name === 'additional_component') {
          item.datatype = 'Button';
        } else if (item.name === 'ledger') {
          item.datatype = 'TableSelect';
          item.columns = ledgerColumn;
          item.searchIndexes = ledgerSearchIndexex;
        } else if (item.name === 'ledger_ac') {
          item.datatype = 'TableSelect';
          item.columns = ledgerColumn;
          item.searchIndexes = ledgerSearchIndexex;
        }
        if (item.name === 'account_date' || item.name === 'inv_date') {
          item.options = 'past';
        }
      });
      setformData(items);
      setloading(false);
    });

    if (term) {
      const data = { name: term };
      getRecordById(
        'service_expense_invoice',
        data,
        'account_management',
        'htsaccount'
      ).then(async (item: any) => {
        const totalValue = getTotalAmountfromProductsAdded(item?.products);
        let val = { netValue: 0, roundOffValue: '0.00' };
        await getNetCalculation(
          totalValue,
          item?.tds,
          item?.tcs,
          item?.additional
        ).then((res) => {
          val = res;
        });
        let a = {};
        try {
          a = JSON.parse(item.additional_data);
        } catch (error) {}
        setformValue({
          ...item,
          inv_date: datetoFrom(item?.inv_date),
          party_bill_date: datetoFrom(item?.party_bill_date),
          account_date: datetoFrom(item?.account_date),
          additional_data: a,
          net_value: totalValue,
          invoice_value: val?.netValue,
          round_up: val?.roundOffValue,
          upload_doc: item?.upload_doc ? `${item?.upload_doc}` : null,

        });
        setRecoveryComponents(a);
        setProducts(item?.products);
      });
    } else {
      setformValue({
        inv_date: datetoFrom(currentDate),
        account_date: datetoFrom(currentDate),
      });
    }
  }, [term]);

  useEffect(() => {
    getTableData(
      'inventory_recovery_components',
      'inventory_account_configuration',
      'htsaccount'
    ).then((items) => {
      const recovery = items.map((item: any, index: any) => ({
        name: item.recovery_component_name,
        amount: item.amount || '',
        key: index.toString(),
      }));

      setRecoveryComponents(recovery);
      setloading(false);
    });
  }, []);

  const recoveryColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_: any, record: any) => (
        <InputNumbers
          value={record.amount}
          onChange={(e: any) => handleAmountChange(e, record.key)}
        />
      ),
    },
  ];

  const handleAmountChange = (amount: any, key: any) => {
    setRecoveryComponents((prev: any) =>
      prev.map((item: any) => (item.key === key ? { ...item, amount } : item))
    );
  };

  const calculateTotalAmount = () => {
    return recoveryComponents.reduce(
      (total: any, item: any) => total + parseFloat(item.amount || 0),
      0
    );
  };

  const handleSave = () => {
    const totalAmount = calculateTotalAmount();

    setRecoveryAmounts([...recoveryComponents]);

    setOpenModal(false);

    setformValue((prevFormValue: any) => ({
      ...prevFormValue,
      additional_data: recoveryComponents,
      additional: totalAmount,
    }));
    if (term) {
      isSuccess('Additional components saved successfully!', 'success');
    } else {
      isSuccess('Additional components updated successfully!', 'success');
    }
    // }
  };

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        name: term,
        data: {
          ...formValue,
          inv_date: dateFormat(e?.inv_date),
          party_bill_date: dateFormat(e?.party_bill_date),
          account_date: dateFormat(e?.account_date),
          additional_data: JSON.stringify(recoveryComponents),
          ledger: formValue?.ledger?.name,
          ledger_ac: formValue?.ledger_ac?.name,
          upload_doc : imageData?.file,
          creation: undefined,
          modified: undefined,
          products: products?.map((item: any) => ({
            ...item,
            products: item?.products?.name,
            cost_center: item?.cost_center?.name,
          })),
        },
      };

      updateRecord(
        'service_expense_invoice',
        record,
        'account_management',
        'htsaccount'
      ).then((items: any) => {
        if (items?.status === 200) {
          setDoc_id(items?.data?.id);
          isSuccess(items?.message, 'success');
          switchToNextTab(
            '/add-service-expense-invoice-product',
            items?.data?.id
          );
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        inv_date: dateFormat(e?.inv_date),
        party_bill_date: dateFormat(e?.party_bill_date),
        account_date: dateFormat(e?.account_date),
        additional_data: JSON.stringify(recoveryComponents),
        upload_doc : imageData?.file,
      };

      createRecord(
        'service_expense_invoice',
        record,
        'account_management',
        'htsaccount'
      ).then((items) => {
        if (items?.status === 200) {
          setDoc_id(items?.data?.id);
          isSuccess(items?.message, 'success');
          switchToNextTab(
            '/add-service-expense-invoice-product',
            items?.data?.id
          );
        } else {
          isSuccess(items?.message, 'error');
        }
        setReload((pre: any) => !pre);
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
      if (fieldName === 'tcs') {
        const fields = form?.getFieldsValue(true);
        const val: any = await getNetCalculation(
          fields?.net_value,
          fields?.tds_deduction,
          fields?.tcs,
          fields?.additional
        ).then((i: any) => {
          return i;
        });
        setformValue({
          ...formValue,
          invoice_value: val?.netValue,
          tcs: fields?.tcs,
          // round_up: val?.roundOffValue,
        });
      } else if (fieldName === 'tds_deduction') {
        const fields = form?.getFieldsValue(true);
        const val: any = await getNetCalculation(
          fields?.net_value,
          fields?.tds_deduction,
          fields?.tcs,
          fields?.additional
        ).then((i: any) => {
          return i;
        });
        setformValue({
          ...formValue,
          invoice_value: val?.netValue,
          // tcs: fields?.tcs,
          tds_deduction: e,
          // round_up: val?.roundOffValue,
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
        dynamicLayout
        modalHandler={() => setOpenModal(true)}
        handleImageUpload = {onHandleImageUpload}
      />

      <Modal
        title="Additional Components"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={handleSave}
        width={1000}
      >
        <Spin loading={loading} />
        <Table column={recoveryColumn} dataSource={recoveryComponents} />
      </Modal>
    </>
  );
};

export default Create;
