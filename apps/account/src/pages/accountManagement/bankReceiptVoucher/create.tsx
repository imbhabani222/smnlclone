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
const Create = (props: any) => {
  const { doc_id, setDoc_id, switchToNextTab = () => {} } = props;

  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [formData, setformData] = useState([]);
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
    getFields('Bank Receipt Voucher', 'htssuite').then((items) => {
      // console.log("brv",items)
      // items?.pop();
      items.forEach((item: any) => {
        if (item.name === 'bank_ac_ledger') {
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
    getFields('Bank Receipt Voucher Details', 'htssuite').then((items) => {
      setloading(false);
      items.forEach((item: any) => {
        if (item.name === 'ledger_ac') {
          item.datatype = 'TableSelect';
          item.columns = ledgerColumn;
          item.searchIndexes = ledgerSearchIndexex;
        }
        if (item.name === 'cheque_date') {
          let date = moment();

          let threeMonthsBefore = date.clone().subtract(3, 'months');
          let threeMonthsAfter = date.clone().add(3, 'months');
          item.options = {
            type: 'enable_only_two_custom_date',
            startDate: threeMonthsBefore,
            endDate: threeMonthsAfter,
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
      setloading(true);
      getRecordById(
        'bank_receipt_voucher',
        data,
        'account_management',
        'htsaccount'
      ).then((items) => {
        setloading(false);

        setformValue({
          ...items,
          active: items?.active === 1 ? true : false,
          voucher_date: datetoFrom(items?.voucher_date),
          cheque_date: datetoFrom(items?.cheque_date),
          document_date: datetoFrom(items.document_date),
          closing_balance_a: colsing_balance_add_dr_cr(items?.closing_balance_a),
          upload_doc: items?.upload_doc ? `${items?.upload_doc}` : null,
        });
        const td = items?.details?.map((item: any) => {
          // console.log("tddd",item)
          return {
            ...item,
            bank_ac_ledger: items?.bank_ac_ledger,
            voucher_date: datetoFrom(items?.creation),
          };
        });
        settabledata(td);
      });
    } else {
      setformValue({
        voucher_date: datetoFrom(currentDate),
      });
    }
  }, [term]);
  const handleFinish = (e: any, eMain: any) => {
    const detailsval = e.map((item: any) => {
      return {
        ...item,
        voucher_date: moment(item?.voucher_date?.$d).format('YYYY-MM-DD'),
        closing_balance_a : colsing_balance_remove_dr_cr(item.closing_balance_a),
        closing_balance_b : colsing_balance_remove_dr_cr(item.closing_balance_b),
        ledger_ac: item?.ledger_ac?.name,
      };
    });
    setloading(true);
    if (term) {
      const record = {
        name: term,
        data: {
          ...eMain,
          voucher_date:moment(eMain?.voucher_date?.$d).format("YYYY-MM-DD"),
          upload_doc : imageData?.file,
          details: detailsval,
          closing_balance_a : colsing_balance_remove_dr_cr(eMain.closing_balance_a),

        },
      };

      updateRecord(
        'bank_receipt_voucher',
        record,
        'account_management',
        'htsaccount'
      ).then((items: any) => {
        setloading(false);
        {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-bank-receipt-voucher');
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      });
    } else {
      const record = {
        ...eMain,
        // details: {},
        // bank_ac_ledger:eMain?.bank_ac_ledger?.name
        bank_ac_ledger: eMain?.bank_ac_ledger?.name,
        closing_balance_a : colsing_balance_remove_dr_cr(eMain.closing_balance_a),

        voucher_date:moment(eMain?.voucher_date?.$d).format("YYYY-MM-DD"),
        upload_doc : imageData?.file,


      };

      createRecord(
        'bank_receipt_voucher',
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
              closing_balance_a : colsing_balance_remove_dr_cr(eMain.closing_balance_a),

              voucher_date:moment(e.Main?.voucher_date?.$d).format("YYYY-MM-DD"),
              upload_doc : imageData?.file,
              details: detailsval,
            },
          };
          updateRecord(
            'bank_receipt_voucher',
            updateData,
            'account_management',
            'htsaccount'
          ).then((updateitems: any) => {
            {
              if (updateitems?.status === 200) {
                isSuccess(items?.message, 'success');
                navigate('/view-bank-receipt-voucher');
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
      title: 'Bank A/c Ledger',
      dataIndex: 'bank_ac_ledger',
      key: 'bank_ac_ledger',
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
      title: 'Ledger A/c',
      dataIndex: 'ledger_ac',
      key: 'ledger_ac',
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
      if (fieldName === 'bank_ac_ledger') {
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
      if (fieldName === 'ledger_ac') {
        getClosingBalance(val).then((item: any) => {
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
      // if (fieldName === 'cheque_date'){
      //   let newFormData=formDetailsData?.map((data:any)=> {
      //   if(data.name==="cheque_date"){
      //   let date=formValue.voucher_date
      //   let threeMonthsBefore=date.clone().subtract(3,'months')
      //   let threeMonthsAfter=date.clone().add(3,'months')
      //   data.options={
      //     type: "enable_only_two_custom_date",
      //     startDate:threeMonthsBefore ,
      //     endDate: threeMonthsAfter
      //   }
      //   }
      //   return data
      //   })
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
        'bank_receipt_voucher_details',

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
    setImageData({
      file:  data?.originalfile,
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
        doctype="bank_receipt_voucher"
        // doc_id={mainId}
        onchangehandler={onChangeHandler}
        handleFinish={handleFinish}
        submitButtonLabel="Submit"
        requiredFields={requiredFields}
        fieldsToAddToDetails={['bank_ac_ledger', 'voucher_date']}
        formTableEditRow={formTableEditRow}
        ledgerKeys={{
          key1: 'bank_ac_ledger',
          key2: 'ledger_ac',
          name1: 'Bank A/c Ledger',
          name2: 'Ledger A/C',
        }}
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
        checkTableDataValidations={(m: any, d: any, td: any) => {
          return checkLedgerTableDataValidations(m, d, td, 0, {
            key1: 'bank_ac_ledger',
            key2: 'ledger_ac',
            name1: 'Bank A/c Ledger',
            name2: 'Ledger A/C',
          });
        }}
        formTableEditRow={formTableEditRow}
        handleFinish={handleFinish}
        voucherTittle={'Bank Receipt Voucher - Add new'}
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

export default Create;
