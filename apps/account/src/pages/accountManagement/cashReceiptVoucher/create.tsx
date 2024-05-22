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
import TwoFormTable from '../../../../../../libs/common/ui/TwoForm_Table/TwoFormTable';
import TwoFormTableV2 from '../../../../../../libs/common/ui//Form/TwoFormTableV2';
import moment from 'moment';
import { datetoFrom } from '../../../../../../libs/common/utils/common';
import {
  checkLedgerTableDataValidations,
  ledgerColumn,
  ledgerSearchIndexex,
  colsing_balance_remove_dr_cr,
  colsing_balance_add_dr_cr
} from '../helper';
import { message } from 'antd';
type Props = {};
const Create = (props: Props) => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [requiredFields, setRequiredFields] = useState([]);
  const [formDetailsData, setFormDetailsData] = useState();
  const [formValue, setformValue] = useState<any>();
  const [formDetailsValue, setformDetailsValue] = useState<any>();
  const [searchParams, _] = useSearchParams();
  const [tabledata, settabledata] = useState<any>();
  const [amount, setAmount] = useState<any>();
  const [imageData, setImageData] = useState<any>({})
  const term = searchParams.get('id');
  useEffect(() => {
    // const currentDate = moment().format('YYYY/MM/DD');
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss"');
    console.log('cd', currentDate);
    getFields('Account Cash Receipt Voucher', 'htssuite').then((items) => {
      items?.pop();
      items.forEach((item: any) => {
        if (item.name === 'cash_ac_ledger') {
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
    getFields('Account Cash Receipt Voucher Details', 'htssuite').then(
      (items) => {
        items.forEach((item: any) => {
          if (item.name === 'ledger_ac') {
            item.datatype = 'TableSelect';
            item.columns = ledgerColumn;
            item.searchIndexes = ledgerSearchIndexex;
          }
          if(item.name === 'closing_balance_b') {
            item.style = {
              color: '#ff0000'
            }
          }
        });
        setFormDetailsData(items);
      }
    );
    if (term) {
      const data = { name: term };
      getRecordById(
        'account_cash_receipt_voucher',
        data,
        'account_management',
        'htsaccount'
      ).then((items) => {
        setformValue({
          ...items,
          active: items?.active === 1 ? true : false,
          voucher_date: datetoFrom(items?.creation),
          closing_balance_a: colsing_balance_add_dr_cr(items?.closing_balance_a),
          upload_document: items?.upload_document ? `${items?.upload_document}` : null,
          // voucher_date:moment(items?.creation?.$d).format("YYYY-MM-DD HH:mm:ss"),
          // voucher_date:datetoFrom(items.voucher_date),
          document_date: datetoFrom(items.document_date),
        });
        const td = items?.details?.map((item: any) => {
          return {
            ...item,

            cash_ac_ledger: items?.cash_ac_ledger,
            voucher_date: datetoFrom(items?.creation),
            // voucher_date:moment(items?.creation?.$d).format("YYYY-MM-DD HH:mm:ss"),
            // voucher_date:moment(items?.voucher_date?.$d).format("YYYY-MM-DD HH:mm:ss"),
            // voucher_date:datetoFrom(items?.voucher_date)
            // voucher_date:datetoFrom(currentDate)
          };
        });
        settabledata(td);
      });
    } else {
      setformValue({
        voucher_date: datetoFrom(currentDate),
        // voucher_date:moment(currentDate).format("YYYY-MM-DD HH:mm:ss"),
        upload_document: null,
      });
    }
  }, [term]);
  const handleFinish = (e: any, eMain: any) => {
    // debugger;
    // const detailform= e.map((item:any)=> {
    //   console.log("detailform",item)
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
        ledger_ac: item?.ledger_ac?.name,
        closing_balance_a : colsing_balance_remove_dr_cr(item.closing_balance_a),
        closing_balance_b : colsing_balance_remove_dr_cr(item.closing_balance_b),
      };
    });

    if (term) {
      const record = {
        name: term,
        data: {
          ...eMain,
          closing_balance_a : colsing_balance_remove_dr_cr(eMain.closing_balance_a),
          voucher_date:moment(eMain?.voucher_date?.$d).format("YYYY-MM-DD"),
          upload_document: imageData?.file,
          // details: e,
          details: detailsval,
        },
      };
      updateRecord(
        'account_cash_receipt_voucher',
        record,
        'account_management',
        'htsaccount'
      ).then((items: any) => {
        {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-cash-receipt-voucher');
          } else {
            isSuccess('Failed to Update Records', 'error');
          }
        }
      });
    } else {
      const record = {
        ...eMain,
        closing_balance_a : colsing_balance_remove_dr_cr(eMain.closing_balance_a),
        cash_ac_ledger: eMain?.cash_ac_ledger?.name,

        voucher_date:moment(eMain?.voucher_date?.$d).format("YYYY-MM-DD"),
        upload_document: imageData?.file,
        
      };
      createRecord(
        'account_cash_receipt_voucher',
        record,
        'account_management',
        'htsaccount'
      ).then((items) => {
        if (items?.status === 200) {
          const updateData = {
            name: items?.data?.id, 
            data: {
              ...eMain,
              // details: e,
              closing_balance_a : colsing_balance_remove_dr_cr(eMain.closing_balance_a),
              upload_document: imageData?.file,
              voucher_date:moment(e.Main?.voucher_date?.$d).format("YYYY-MM-DD"),
              details: detailsval,
            },
          };
          updateRecord(
            'account_cash_receipt_voucher',
            updateData,
            'account_management',
            'htsaccount'
          ).then((updateitems: any) => {
            {
              if (updateitems?.status === 200) {
                isSuccess(items?.message, 'success');
                navigate('/view-cash-receipt-voucher');
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
      title: 'Cash A/C Ledger',
      dataIndex: 'cash_ac_ledger',
      key: 'cash_ac_ledger',
    },
    {
      title: 'Credit Amount',
      dataIndex: 'amount',
      key: 'amount02',
    },
    {
      title: 'Ledger A/C',
      dataIndex: 'ledger_ac',
      key: 'ledger_ac',
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
  const onChangeHandler = useCallback((val: any, fieldName: any, main: any) => {
    if (fieldName === 'cash_ac_ledger') {
      getClosingBalance(
        val
      ).then((items: any) => {
        console.log(items, "items")
            setformValue((pre: any) => ({
              ...pre,
              [fieldName]: {
                [fieldName]: items?.ledger_name,
                name: items?.name,
              },
              closing_balance_a: colsing_balance_add_dr_cr(items.closing_balance),
            }));
         ;
          
      });
    } else if (fieldName === 'ledger_ac') {
      getClosingBalance(val).then((items: any) => {
        setformDetailsValue((pre: any) => ({
          ...pre,
          [fieldName]: {
            [fieldName]: items?.ledger_name,
            name: items?.name,
          },
          closing_balance_b: colsing_balance_add_dr_cr(items.closing_balance),
        }));
      });
    }
  }, []);

  const formTableEditRow = (items: any) => {
    console.log(items)
    setformDetailsValue({
      ...items,
      closing_balance_b: colsing_balance_add_dr_cr(items.closing_balance_b),
      // ledger_ac: items?.ledger_ac?.ledger_ac,
      active: items?.active === 1 ? true : false,
    });
  };
  const deleteSavedRecords = (name: any) => {
    if (name) {
      deleteRecordById(
        'account_cash_receipt_voucher',

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
  const onHandleImageUpload = (data:any, item:any) => {
    console.log(data,"abc")
    setImageData({
      file: data?.originalfile,
      data:data,
      fileType:item
    })
  }
  console.log(formValue, "formValue")
  return (
    <>
      {/* <TwoFormTable
        formValueMain={formValue}
        formDataMain={formData}
        formValue={formDetailsValue}
        formData={formDetailsData}
        columns={columnsFamily}
        module="account_management"
        doctype="account_cash_receipt_voucher"
        // doc_id={mainId}
        onchangehandler={onChangeHandler}
        handleFinish={handleFinish}
        submitButtonLabel="Submit"
        requiredFields={requiredFields}
        fieldsToAddToDetails={['cash_ac_ledger', 'voucher_date']}
        ledgerKeys={{
          key1: 'cash_ac_ledger',
          key2: 'ledger_ac',
          name1: 'Cash A/C Ledger',
          name2: 'Ledger A/C',
        }}
        formTableEditRow={formTableEditRow}
      /> */}
      <TwoFormTableV2
        mainformdata={formData}
        mainformvalue={formValue}
        detailsformdata={formDetailsData}
        detailsformvalue={formDetailsValue}
        tablecolumn={columnsFamily}
        tabledata={tabledata}
        onchangehandler={onChangeHandler}
        checkTableDataValidations={(m: any, d: any, td: any) => {
          return checkLedgerTableDataValidations(m, d, td, 0, {
            key1: 'cash_ac_ledger',
            key2: 'ledger_ac',
            name1: 'Cash A/C Ledger',
            name2: 'Ledger A/C',
          });
        }}
        handleImageUpload = {onHandleImageUpload}
        formTableEditRow={formTableEditRow}
        handleFinish={handleFinish}
        voucherTittle={'Cash Receipt Voucher - Add new'}
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
              </Row>
            </>
          );
        }}
      />
    </>
  );
};

export default Create;
