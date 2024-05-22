import React, { useState, useEffect } from 'react';

import {
  getDocTypes,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';

import FormTable from '../../../../../../libs/common/ui/Form_Table/FormTable';
import { getFields } from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

const Create = (props: any) => {
  const [formData, setformData] = useState<any>([]);
  const [formValue, setformValue] = useState<any>([]);
  const [columns, setcolumns] = useState<any>([]);
  const [searchParams] = useSearchParams();
  const [loading, setloading] = useState(true);
  const [reque_no, setReque] = useState<any>();

  const mainId = searchParams.get('id') || '';
  const navigate = useNavigate();

  const getItemNameAndIdx = (fieldName: any, items: any) => {
    const ItemNumberIdx = items?.findIndex(
      ({ name }: any) => name === fieldName
    );
    const ItemNumberItem = items?.filter(
      ({ name }: any) => name === fieldName
    )[0];
    return { ItemNumberIdx, ItemNumberItem };
  };

  const getIssueNo = (fieldName: any, items: any) => {
    const issueNumberidx = items?.findIndex(
      ({ name }: any) => name === fieldName
    );
    const issueNumberItem = items?.filter(
      ({ name }: any) => name === fieldName
    )[0];
    return { issueNumberidx, issueNumberItem };
  };

  useEffect(() => {
    if (mainId) {
      // setloading(true)
      getFields('Bank Payment Voucher Details', 'htssuite').then((_items) => {
        setformData(_items);
        //     const {
        //       ItemNumberIdx: indentNumberIdx,
        //       ItemNumberItem: indentNumberItem,
        //     } = getItemNameAndIdx('part', _items);

        //    const {
        //      issueNumberidx :partIssueIdx,
        //      issueNumberItem : partIssueItem } = getIssueNo("issue_no",_items)

        getDocTypes('Bank Payment Voucher Details', false, 'htssuite').then(
          (items) => setcolumns(items)
        );
        const data = { name: mainId };
        getRecordById(
          'bank_payment_voucher',
          data,
          'account_management',
          'htsaccount'
        ).then((items) => {
          setformValue({
            ...formValue,
            data: items?.details,
          });
          //   setReque(items?.request_no);
          //   const re_no = { name: items?.request_no };
          //   getRecordById(
          //     'inventory_part_issue_note',
          //     re_no,
          //     'inventory_management',
          //     'htsinventory'
          //   ).then((_prods) => {
          //     console.log(_prods , "dfsdfdsfsf")
          //     setformValue({
          //      data:{
          //       ...formValue,
          //       issue_no: _prods?.issue_no
          //      }
          //     })

          // })

          // const { indent_no = null } = items;
          // const data = { name: indent_no };

          // getRecordById(
          //   'inventory_purchase_indent',
          //   data,
          //   'inventory_purchase_management',
          //   'htsinventory'
          // ).then((prods: any) => {
          // setformValue({
          //   ...formValue,
          //   data:items?.products
          // });
        });
      });
      // });
    }
  }, [mainId]);

  // useEffect(() => {
  //   console.log(loading);
  // } , [loading])

  console.log(formValue, 'fornejdjdjd');

  // const onchangeHandler = (val: any, fieldName: any) => {
  //   console.log(val, fieldName, 'fieldNameCehck');
  //   const data = { name: val };
  //   console.log(data, 'name');

  //   if (fieldName === 'products') {
  //     getRecordById(
  //       'inventory_product_master',
  //       data,
  //       'inventory_product_configuration',
  //       'htsinventory'
  //     ).then((items) => {
  //       console.log(items, 'itemsss');

  //       setformValue({
  //         data: {
  //           ...items,
  //           part: items?.name,
  //           uom: items?.uom,
  //           rate: items?.mrp_price,
  //         },
  //       });
  //     });
  //   }
  // };

  console.log(formValue, 'formdddd');

  const handleFinish = (values: any) => {
    console.log(values, 'dsfnjsdnfsdjfn');
    const record = {
      name: mainId,
      data: {
        details: values,
      },
    };
    console.log(record, 'recorddd');

    updateRecord(
      'bank_payment_voucher',
      record,
      'account_management',
      'htsaccount'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        navigate('/view-bank-payment-voucher');
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };

  const formTableEditRow = (items: any) => {
    setformValue({
      data: { ...items, active: items?.active === 1 ? true : false },
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
        doctype="Bank Payment Voucher Details"
        doc_id={mainId}
        handleFinish={handleFinish}
        appname="htsaccount"
        submitButtonLabel="Submit"
        // onchangehandler={onchangeHandler}
        tableData={formValue?.tabledata}
        formTableEditRow={formTableEditRow}
      />
    </>
  );
};

export default Create;
