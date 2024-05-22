import React, { useEffect, useState, useCallback } from 'react';
import { Col, Row } from 'antd';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getClosingBalance,
  deleteRecordById,
} from '../../../../../../libs/common/api/doctype';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import TwoFormTableV2 from '../../../../../../libs/common/ui//Form/TwoFormTableV2';
import TwoFormTable from '../../../../../../libs/common/ui/TwoForm_Table/TwoFormTable';
import moment from 'moment';
import { datetoFrom } from '../../../../../../libs/common/utils/common';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import {
  ledgerColumn,
  ledgerSearchIndexex,
  checkLedgerTableDataValidations,
  colsing_balance_remove_dr_cr,
  colsing_balance_add_dr_cr
} from '../helper';
type Props = {};
const Create = (props: Props) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState([]);
  const [requiredFields, setRequiredFields] = useState([]);
  const [formDetailsData, setFormDetailsData] = useState();
  const [formValue, setformValue] = useState<any>();
  const [formDetailsValue, setformDetailsValue] = useState<any>();
  const [tabledata, settabledata] = useState<any>();
  const [amount, setAmount] = useState<any>();
  const [searchParams, _] = useSearchParams();
  const [imageData, setImageData] = useState<any>({});

  const term = searchParams.get('id');

  function formatDate(date: any) {
    return [date.$y, date.$M + 1, date.$D].join('-');
  }
  useEffect(() => {
    const currentDate = moment().format('YYYY/MM/DD');
    getFields('Cash Payment Voucher', 'htssuite').then((items) => {
      items?.pop();
      items.forEach((item: any) => {
        if (item.name === 'cash_ac_ledger_credit') {
          item.datatype = 'TableSelect';
          item.columns = ledgerColumn;
          item.searchIndexes = ledgerSearchIndexex;
        }
        if (item.name === 'document_date' || item.name === 'voucher_date') {
          item.options = 'past';
        }
        
        if(item.name === 'closing_balance_a'){
          item.style = { color: '#ff0000' }
        }
      });
      setformData(items);
      items.map((item: any) => {
        if (item?.isReq) {
          // @ts-ignore
          setRequiredFields((prev: any[]) => [...prev, item?.name]);
          // @ts-ignore
          setRequiredFields((prev: any[]) => [...new Set(prev)]);
        }
      });
    });
    getFields('Cash Payment Voucher Details', 'htssuite').then((items) => {
      items.forEach((item: any) => {
        if (item.name === 'debit_ledger_ac') {
          item.datatype = 'TableSelect';
          item.columns = ledgerColumn;
          item.searchIndexes = ledgerSearchIndexex;
        }
        if(item.name === 'closing_balance_b'){
          item.style = { color: '#ff0000' }
        }
      });
      setFormDetailsData(items);
    });
    if (term) {
      const data = { name: term };
      setloading(true);
      getRecordById(
        'cash_payment_voucher',
        data,
        'account_management',
        'htsaccount'
      ).then((items) => {
        console.log('acc', items);
        setloading(false);
        setformValue({
          ...items,
          // cash_ac_ledger_credit:
          //   items?.cash_ac_ledger_credit?.cash_ac_ledger_credit ||
          //   items?.cash_ac_ledger_credit,
          active: items?.active === 1 ? true : false,
          closing_balance_a : colsing_balance_add_dr_cr(items?.closing_balance_a),
          voucher_date: datetoFrom(items?.creation),
          document_date: datetoFrom(items?.document_date),
          upload_doc: items?.upload_doc
            ? `${items?.upload_doc}`
            : null,
        });
        const td = items?.details?.map((item: any) => {
          console.log('tdsasa', item);
          return {
            ...item,
            cash_ac_ledger_credit: items?.cash_ac_ledger_credit,
            voucher_date: datetoFrom(items?.creation),
            // voucher_date:moment(item?.voucher_date?.$d).format("YYYY-MM-DD"),
          };
        });
        settabledata(td);
      });
    } else {
      setformValue({
        voucher_date: datetoFrom(currentDate),
        upload_document: null,
      });
    }
  }, [term]);

  const handleFinish = (e: any, eMain: any) => {
    // delete eMain.closing_balance;
    // const detailform= e.map((item:any)=> {
    // console.log("detailform",item)
    // console.log("detailformitem",item?.ledger_ac?.name)
    // return {
    //   ledger_ac:item?.ledger_ac?.name,
    //   closing_balance_b:item.closing_balance,
    //   amount:item.amount,
    //   narration:item.narration

    // }

    // })
    const detailsval = e.map((item: any) => {
      return {
        ...item,
        voucher_date: moment(item?.voucher_date?.$d).format('YYYY-MM-DD'),
        debit_ledger_ac: item?.debit_ledger_ac?.name,
        closing_balance_a : colsing_balance_remove_dr_cr(item.closing_balance_a),
        closing_balance_b : colsing_balance_remove_dr_cr(item.closing_balance_b),
      };
    });
    setloading(true);
    if (term) {
      const record = {
        name: term,
        data: {
          ...eMain,
          voucher_date: moment(eMain?.voucher_date?.$d).format('YYYY-MM-DD'),
          upload_doc: imageData?.file,
          details: detailsval,
          closing_balance_a : colsing_balance_remove_dr_cr(eMain.closing_balance_a),

        },
      };

      updateRecord(
        'cash_payment_voucher',
        record,
        'account_management',
        'htsaccount'
      ).then((items: any) => {
        setloading(false);
        {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-cash-payment-voucher');
          } else {
            isSuccess('Failed to Update Records', 'error');
          }
        }
      });
    } else {
      const record = {
        ...eMain,
        upload_doc: imageData?.file,
        cash_ac_ledger_credit: eMain.cash_ac_ledger_credit?.name,
        // voucher_date:moment(eMain?.voucher_date?.$d).format("YYYY-MM-DD"),
        voucher_date: moment(eMain?.voucher_date?.$d).format('YYYY-MM-DD'),
        closing_balance_a : colsing_balance_remove_dr_cr(eMain.closing_balance_a),

      };
      createRecord(
        'cash_payment_voucher',
        record,
        'account_management',
        'htsaccount'
      ).then((items) => {
        setloading(false);
        if (items?.status === 200) {
          const updateData = {
            name: items?.data?.id,
            data: {
              ...eMain,
              voucher_date: moment(e.Main?.voucher_date?.$d).format(
                'YYYY-MM-DD'
              ),
              closing_balance_a : colsing_balance_remove_dr_cr(eMain.closing_balance_a),
              upload_doc: imageData?.file,
              details: detailsval,
            },
          };
          updateRecord(
            'cash_payment_voucher',
            updateData,
            'account_management',
            'htsaccount'
          ).then((updateitems: any) => {
            {
              if (updateitems?.status === 200) {
                isSuccess(items?.message, 'success');
                navigate('/view-cash-payment-voucher');
              } else {
                isSuccess(updateitems?.message, 'error');
              }
            }
          });
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };
  let columnsFamily = [
    {
      title: 'Voucher Date',
      dataIndex: 'voucher_date',
      key: 'voucher_date',
    },
    {
      title: 'Cash A/c Ledger Credit',
      dataIndex: 'cash_ac_ledger_credit',
      key: 'cash_ac_ledger_credit',
    },
    {
      title: 'Credit Amount',
      dataIndex: 'amount',
      key: 'amount02',
    },
    {
      title: 'Debit Ledger A/c',
      dataIndex: 'debit_ledger_ac',
      key: 'debit_ledger_ac',
    },
    {
      title: 'Debit Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Narration',
      dataIndex: 'narration',
      key: 'narration',
      width: '200px',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const onChangeHandler = (val: any, fieldName: any) => {
    if (fieldName === 'cash_ac_ledger_credit') {
      getClosingBalance(val).then((item: any) => {
        setformValue((pre: any) => ({
          ...pre,
          [fieldName]: { [fieldName]: item?.ledger_name, name: item?.name },
          closing_balance_a: colsing_balance_add_dr_cr(item?.closing_balance),
        }));
  
      });
    } else if (fieldName === 'debit_ledger_ac') {
      getClosingBalance(val).then((item: any) => {
        setformDetailsValue((pre: any) => ({
          ...pre,
          [fieldName]: { [fieldName]: item?.ledger_name, name: item?.name },
          closing_balance_b: colsing_balance_add_dr_cr(item?.closing_balance),
        }));
     
      });
    }
  };

  const formTableEditRow = (items: any) => {
    setformDetailsValue({
      ...items,
      // debit_ledger_ac: items?.debit_ledger_ac?.debit_ledger_ac,
      closing_balance_b: colsing_balance_add_dr_cr(items.closing_balance_b),
      voucher_date: datetoFrom(items?.voucher_date),
      active: items?.active === 1 ? true : false,
    });
  };

  const deleteSavedRecords = (name: any) => {
    if (name) {
      deleteRecordById(
        'cash_payment_voucher_details',
        'account_management',
        'htsaccount',
        name
      ).then((i: any) => {
        isSuccess(i?.message, i?.status);
      });
    }
  };
  const getFooterValues = (tabledata: any = []) => {
    let amount = 0;
    tabledata.map((item: any) => {
      amount += parseFloat(item?.amount);
    });
    setAmount(amount);
  };

  const onHandleImageUpload = (data: any, item: any) => {
    setImageData({
      file: data?.originalfile,
      data: data,
      fileType: item,
    });
  };
  return (
    <>
      <Spin loading={loading} />
      {/* <TwoFormTable
        formValueMain={formValue}
        formDataMain={formData}
        formValue={formDetailsValue}
        formData={formDetailsData}
        columns={columnsFamily}
        module="account_management"
        doctype="cash_payment_voucher"
        // doc_id={mainId}
        onchangehandler={onChangeHandler}
        handleFinish={handleFinish}
        submitButtonLabel="Submit"
        requiredFields={requiredFields}
        fieldsToAddToDetails={['cash_ac_ledger_credit', 'voucher_date']}
        ledgerKeys={{
          key1: 'cash_ac_ledger_credit',
          key2: 'debit_ledger_ac',
          name1: 'Cash A/c Ledger (Credit)',
          name2: 'Debit Ledger A/C',
        }}
        closingBalanceKeys={'debit_ledger_ac'}
        formTableEditRow={formTableEditRow}
      /> */}

      <TwoFormTableV2
        mainformdata={formData}
        mainformvalue={formValue}
        detailsformdata={formDetailsData}
        detailsformvalue={formDetailsValue}
        tablecolumn={columnsFamily}
        tabledata={tabledata}
        handleImageUpload={onHandleImageUpload}
        onchangehandler={onChangeHandler}
        // checkTableDataValidations={(m: any, d: any, td: any) => {
        //   return checkLedgerTableDataValidations(
        //     m,
        //     d,
        //     td,
        //     'closing_balance_b',
        //     {
        //       key1: 'cash_ac_ledger_credit',
        //       key2: 'debit_ledger_ac',
        //       name1: 'Cash A/c Ledger (Credit)',
        //       name2: 'Debit Ledger A/C',
        //     },
        //     'closing_balance_a'
        //   );
        // }}
        formTableEditRow={formTableEditRow}
        handleFinish={handleFinish}
        voucherTittle={'Cash Payment Voucher - Add new'}
        deleteSavedRecords={deleteSavedRecords}
        getFooterValues={getFooterValues}
        footer={(props: any) => {
          return (
            <>
              <Row>
                <Col span={1}></Col>
                <Col span={2}></Col>
                <Col span={5}>
                  <strong>TOTAL:</strong>
                </Col>
                <Col span={6}>
                  <strong>{amount}</strong>
                </Col>
                <Col span={2}></Col>
                <Col span={2}>
                  <strong>{amount}</strong>
                </Col>
                {/* <Col span={2}></Col> */}
              </Row>
            </>
          );
        }}
      />
    </>
  );
};

export default Create;
