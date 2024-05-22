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
import moment from 'moment';
import TwoFormTableV2 from '../../../../../../libs/common/ui//Form/TwoFormTableV2';
import { datetoFrom } from '../../../../../../libs/common/utils/common';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import {
  ledgerColumn,
  ledgerSearchIndexex,
  checkLedgerTableDataValidations,
  colsing_balance_add_dr_cr,
  colsing_balance_remove_dr_cr
} from '../helper';


const Create = (props: any) => {
  const { doc_id, setDoc_id, switchToNextTab = () => {} } = props;

  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  // const [formData, setformData] = useState([]);
  const [formData, setformData] = useState<any>([]);

  const [requiredFields, setRequiredFields] = useState([]);
  // const [formDetailsData, setFormDetailsData] = useState();
  const [formDetailsData, setFormDetailsData] = useState<any>();

  const [formValue, setformValue] = useState<any>();
  const [formDetailsValue, setformDetailsValue] = useState<any>();
  const [tabledata, settabledata] = useState<any>();

  const [amount, setAmount] = useState<any>();

  const [imageData, setImageData] = useState<any>({})

  const [searchParams, _] = useSearchParams();

  const term = searchParams.get('id');

  function formatDate(date: any) {
    return [date.$y, date.$M + 1, date.$D].join('-');
  }
  useEffect(() => {
    const currentDate = moment().format('YYYY/MM/DD');
    getFields('Bank Payment Voucher', 'htssuite').then((items) => {
      console.log('Bank Payment Vouche', items);
      items?.pop();
      items.forEach((item: any) => {
        if (item.name === 'bank_ac_ledger_credit') {
          item.datatype = 'TableSelect';
          item.columns = ledgerColumn;
          item.searchIndexes = ledgerSearchIndexex;
        }
        if (item.name === 'document_date' || item.name === 'voucher_date') {
          item.options = 'past';
        }
        
        if(item.name === 'closing_balance_a') {
          item.style = {
            color: '#ff0000'
          }
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
    getFields('Bank Payment Voucher Details', 'htssuite').then((items) => {
      setloading(false);
      items.forEach((item: any) => {
        console.log('itemss', item);

        if (item.name == 'document_date') {
          item.options = 'future';
        }
        if (item.name === 'debit_ledger_ac') {
          item.datatype = 'TableSelect';
          item.columns = ledgerColumn;
          item.searchIndexes = ledgerSearchIndexex;
        }
        if (item.name === 'cheque_date') {
          let date = moment();
          let threemonthsbefore = date.clone().subtract(3, 'month');
          let threemonthsafter = date.clone().add(3, 'month');
          item.options = {
            type: 'enable_only_two_custom_date',
            startDate: threemonthsbefore,
            endDate: threemonthsafter,
          };
        }
        if(item.name === 'closing_balance_b') {
          item.style = {
            color: '#ff0000'
          }
        }
      });
      setFormDetailsData(items);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'bank_payment_voucher',
        data,
        'account_management',
        'htsaccount'
      ).then((items) => {
        setformValue({
          ...items,
          closing_balance_a: colsing_balance_add_dr_cr(items?.closing_balance_a),
          active: items?.active === 1 ? true : false,
          voucher_date: datetoFrom(items?.creation),
          document_date: datetoFrom(items.document_date),
          upload_doc: items?.upload_doc ? `${items?.upload_doc}` : null,
        });
        const td = items?.details?.map((item: any) => {
          return {
            ...item,
            bank_ac_ledger_credit: items?.bank_ac_ledger_credit,
            voucher_date: datetoFrom(items?.creation),
          };
        });
        settabledata(td);
      });
    } else {
      setformValue({
        voucher_date: datetoFrom(currentDate),
        document_date: datetoFrom(currentDate),
      });
    }
  }, [term]);

  const handleFinish = (e: any, eMain: any) => {
    setloading(true);
    const detailsval = e.map((item: any) => {
      return {
        ...item,
        voucher_date: moment(item?.voucher_date?.$d).format('YYYY-MM-DD'),
        closing_balance_a : colsing_balance_remove_dr_cr(item.closing_balance_a),
        closing_balance_b : colsing_balance_remove_dr_cr(item.closing_balance_b),
        debit_ledger_ac: item?.debit_ledger_ac?.name,
      };
    });
    if (term) {
      const record = {
        name: term,
        data: {
          ...eMain,
          voucher_date: moment(eMain?.voucher_date?.$d).format('YYYY-MM-DD'),
          upload_doc : imageData?.file,
          details: detailsval,
          closing_balance_a : colsing_balance_remove_dr_cr(eMain.closing_balance_a),

        },
      };

      updateRecord(
        'bank_payment_voucher',
        record,
        'account_management',
        'htsaccount'
      ).then((items: any) => {
        setloading(false);
        {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-bank-payment-voucher');
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      });
    } else {
      const record = {
        ...eMain,
        // details: {},
        bank_ac_ledger_credit: eMain.bank_ac_ledger_credit?.name,
        voucher_date: moment(eMain?.voucher_date?.$d).format('YYYY-MM-DD'),
        upload_doc : imageData?.file,
        closing_balance_a : colsing_balance_remove_dr_cr(eMain.closing_balance_a),
      };

      createRecord(
        'bank_payment_voucher',
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
              upload_doc : imageData?.file,
              details: detailsval,
            },
          };
          updateRecord(
            'bank_payment_voucher',
            updateData,
            'account_management',
            'htsaccount'
          ).then((updateitems: any) => {
            {
              if (updateitems?.status === 200) {
                isSuccess(items?.message, 'success');
                navigate('/view-bank-payment-voucher');
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
      title: 'Bank A/c Ledger Credit',
      dataIndex: 'bank_ac_ledger_credit',
      key: 'bank_ac_ledger_credit',
    },
    {
      title: 'Credit Amount',
      dataIndex: 'amount',
      key: 'amount02',
    },
    {
      title: 'Pay Mode',
      dataIndex: 'pay_mode',
      key: 'pay_mode',
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
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const onChangeHandler = useCallback(
    (val: any, fieldName: any) => {
      if (fieldName === 'bank_ac_ledger_credit') {
        getClosingBalance(
          val
        ).then((item: any) => {
              setformValue((pre: any) => ({
                ...pre,
                [fieldName]: {
                  [fieldName]: item?.ledger_name,
                  name: item?.name,
                },
                closing_balance_a: colsing_balance_add_dr_cr(item?.closing_balance),
              }));
      
          
        });
      }
      if (fieldName === 'debit_ledger_ac') {
        getClosingBalance(
          val
        ).then((item: any) => {
              setformDetailsValue((pre: any) => ({
                ...pre,
                [fieldName]: {
                  [fieldName]: item?.ledger_name,
                  name: item?.name,
                },
                closing_balance_b: colsing_balance_add_dr_cr(item?.closing_balance),
              }));
       
        });
      }
      // if(fieldName === 'cheque_date'){
      //   console.log("chque")
      //   let newFormData = formDetailsData?.map((data: any) => {
      //     if(data.name==="cheque_date"){
      //       let date = moment(formValue.voucher_date)
      //       let threeMonthsBefore = date.clone().subtract(3, 'months');
      //       let threeMonthsAfter = date.clone().add(3, 'months');
      //       data.options = {
      //             type: "enable_only_two_custom_date",
      //             startDate:threeMonthsBefore ,
      //             endDate: threeMonthsAfter

      //           }

      //     }

      //     return data;
      //   });
      //   setFormDetailsData(newFormData)
      // }
    },
    [formDetailsData]
  );
  const formTableEditRow = (items: any) => {
    setformDetailsValue({
      ...items,
      closing_balance_b: colsing_balance_add_dr_cr(items.closing_balance_b),
      voucher_date: datetoFrom(items?.voucher_date),
      cheque_date: datetoFrom(items?.cheque_date),
      active: items?.active === 1 ? true : false,
    });
  };
  const deleteSavedRecords = (name: any) => {
    if (name) {
      deleteRecordById(
        'bank_payment_voucher_details',

        'account_management',
        'htsaccount',
        name
      ).then((i: any) => {
        isSuccess(i?.message, i?.status);
      });
    }
  };

  const getFooterValues = (tabledata: any) => {};

  const onHandleImageUpload = (data:any, item:any) => {
    setImageData({
      file: data?.originalfile,
      data:data,
      fileType:item
    })
  }
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
        doctype="bank_payment_voucher"
        // doc_id={mainId}
        onchangehandler={onChangeHandler}
        handleFinish={handleFinish}
        submitButtonLabel="Submit"
        requiredFields={requiredFields}
        fieldsToAddToDetails={['bank_ac_ledger_credit', 'voucher_date']}
        formTableEditRow={formTableEditRow}
        ledgerKeys={{
          key1: 'bank_ac_ledger_credit',
          key2: 'debit_ledger_ac',
          name1: 'Bank A/c Ledger(Credit)',
          name2: 'Debit Ledger A/C',
        }}
        closingBalanceKeys={'debit_ledger_ac'}
      /> */}
      <TwoFormTableV2
        mainformdata={formData}
        mainformvalue={formValue}
        detailsformdata={formDetailsData}
        detailsformvalue={formDetailsValue}
        tablecolumn={columnsFamily}
        tabledata={tabledata}
        handleImageUpload = {onHandleImageUpload}
        onchangehandler={onChangeHandler}
        // checkTableDataValidations={(m: any, d: any, td: any) => {
        //   return checkLedgerTableDataValidations(
        //     m,
        //     d,
        //     td,
        //     'closing_balance_b',
        //     {
        //       key1: 'bank_ac_ledger_credit',
        //       key2: 'debit_ledger_ac',
        //       name1: 'Bank A/c Ledger(Credit)',
        //       name2: 'Debit Ledger A/C',
        //     },
        //     'closing_balance_a'
        //   );
        // }}
        formTableEditRow={formTableEditRow}
        handleFinish={handleFinish}
        voucherTittle={'Bank Payment Voucher - Add new'}
        deleteSavedRecords={deleteSavedRecords}
        getFooterValues={getFooterValues}
        footer={(props: any) => {
          return (
            <>
              <Row>
                <Col span={1}></Col>
                <Col span={2}></Col>
                <Col span={6}>
                  <strong>TOTAL:</strong>
                </Col>
                <Col span={6}>
                  <strong>{amount}</strong>
                </Col>
                <Col span={5}></Col>
                <Col span={4}>
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
//Bank Payment Voucher
export default Create;
