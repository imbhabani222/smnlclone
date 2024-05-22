import React, { useCallback, useEffect, useState } from 'react';
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
  ledgerColumn,
  ledgerSearchIndexex,
  checkLedgerTableDataValidations,
  colsing_balance_add_dr_cr,
  colsing_balance_remove_dr_cr
} from '../helper';
type Props = {};
const Create = (props: Props) => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [requiredFields, setRequiredFields] = useState([]);
  const [formDetailsData, setFormDetailsData] = useState();
  const [formValue, setformValue] = useState<any>();
  const [formDetailsValue, setformDetailsValue] = useState<any>();
  const [amount, setAmount] = useState<any>();
  const [tabledata, settabledata] = useState<any>();
  const [searchParams, _] = useSearchParams();
  const [imageData, setImageData] = useState<any>({});

  const term = searchParams.get('id');

  function formatDate(date: any) {
    return [date.$y, date.$M + 1, date.$D].join('-');
  }
  useEffect(() => {
    const currentDate = moment().format('YYYY/MM/DD');
    getFields('Journal Voucher', 'htssuite').then((items) => {
      console.log('Journal Voucher', items);
      items?.pop();
      items.forEach((item: any) => {
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
    getFields('Journal Voucher Details', 'htssuite').then((items) => {
      items.forEach((item: any) => {
        if (
          item.name === 'debit_ac_ledger' ||
          item.name === 'credit_ledger_ac'
        ) {
          item.datatype = 'TableSelect';
          item.columns = ledgerColumn;
          item.searchIndexes = ledgerSearchIndexex;
        }
        if (item.name === 'amount') {
          item.description = {
            type: 'compare_two_values',
            label: 'Debit Closing Balance',
            depends: 'closing_balance_a',
          };
        }
        if(item.name === 'closing_balanc_b') {
          item.style = {
            color: '#ff0000'
          }
        }
        if(item.name === 'closing_balance_a'){
          item.style = { color: '#ff0000' }
        }
      });
      setFormDetailsData(items);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'journal_voucher',
        data,
        'account_management',
        'htsaccount'
      ).then((items) => {
        setformValue({
          ...items,
          voucher_date: datetoFrom(items?.voucher_date),
          document_date: datetoFrom(items?.document_date),
          closing_balance_a: colsing_balance_add_dr_cr(items?.closing_balance_a),
          upload_doc: items?.upload_doc
            ? `${items?.upload_doc}`
            : null,
        });
        const td = items?.details?.map((item: any) => {
          return {
            ...item,
            voucher_date: datetoFrom(items?.creation),
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
    const detailsval = e.map((item: any) => {
      return {
        ...item,
        voucher_date: moment(item?.voucher_date?.$d).format('YYYY-MM-DD'),
        closing_balance_a : colsing_balance_remove_dr_cr(item.closing_balance_a),
        closing_balanc_b : colsing_balance_remove_dr_cr(item.closing_balanc_b),
        debit_ac_ledger: item?.debit_ac_ledger?.name,
        credit_ledger_ac: item?.credit_ledger_ac?.name,
      };
    });
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
        'journal_voucher',
        record,
        'account_management',
        'htsaccount'
      ).then((items: any) => {
        {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-journal-voucher');
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      });
    } else {
      const record = {
        ...eMain,
        voucher_date: moment(eMain?.voucher_date?.$d).format('YYYY-MM-DD'),
        upload_doc: imageData?.file,
        closing_balance_a : colsing_balance_remove_dr_cr(eMain.closing_balance_a),

      };

      createRecord(
        'journal_voucher',
        record,
        'account_management',
        'htsaccount'
      ).then((items) => {
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
            'journal_voucher',
            updateData,
            'account_management',
            'htsaccount'
          ).then((updateitems: any) => {
            {
              if (updateitems?.status === 200) {
                isSuccess(items?.message, 'success');
                navigate('/view-journal-voucher');
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
      title: 'Debit A/c Ledger',
      dataIndex: 'debit_ac_ledger',
      key: 'debit_ac_ledger',
    },
    {
      title: 'Debit Amount',
      dataIndex: 'amount',
      key: 'amount',
    },

    {
      title: 'Credit Ledger A/c',
      dataIndex: 'credit_ledger_ac',
      key: 'credit_ledger_ac',
    },
    {
      title: 'Credit Amount',
      dataIndex: 'amount',
      key: 'amount02',
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

  const onChangeHandler = useCallback(
    (val: any, fieldName: any) => {
      if (fieldName === 'debit_ac_ledger') {
        getClosingBalance(
          val
        ).then((item: any) => {
              setformDetailsValue((pre: any) => ({
                ...pre,
                [fieldName]: {
                  [fieldName]: item?.ledger_name,
                  name: item?.name,
                },
                closing_balance_a: colsing_balance_add_dr_cr(item?.closing_balance),
              }));
           
        });
      }
      if (fieldName === 'credit_ledger_ac') {
        getClosingBalance(
          val
        ).then((item: any) => {
              setformDetailsValue((pre: any) => ({
                ...pre,
                [fieldName]: {
                  [fieldName]: item?.ledger_name,
                  name: item?.name,
                },
                closing_balanc_b: colsing_balance_add_dr_cr(item?.closing_balance),
              }));
         
        });
      }
    },
    [formDetailsData]
  );

  const formTableEditRow = (items: any) => {
    setformDetailsValue({
      ...items,
      // credit_ledger_ac: items?.credit_ledger_ac?.credit_ledger_ac,
      // debit_ac_ledger: items?.debit_ac_ledger?.debit_ac_ledger,
      voucher_date: datetoFrom(items?.voucher_date),
      closing_balanc_b: colsing_balance_add_dr_cr(items.closing_balanc_b),

      active: items?.active === 1 ? true : false,
    });
  };
  const deleteSavedRecords = (name: any) => {
    if (name) {
      deleteRecordById(
        'journal_voucher_details',

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
      file:  data?.originalfile,
      data: data,
      fileType: item,
    });
  };

  return (
    <div>
      {/* <TwoFormTable
        formValueMain={formValue}
        formDataMain={formData}
        formValue={formDetailsValue}
        formData={formDetailsData}
        columns={columnsFamily}
        module="account_management"
        doctype="journal_voucher"
        // doc_id={mainId}
        formTableEditRow={formTableEditRow}
        onchangehandler={onChangeHandler}
        handleFinish={handleFinish}
        submitButtonLabel="Submit"
        requiredFields={requiredFields}
        fieldsToAddToDetails={['voucher_date']}
        ledgerKeys={{
          key1: 'debit_ac_ledger',
          key2: 'credit_ledger_ac',
          name1: 'Debit A/c Ledger',
          name2: 'Credit Ledger A/C',
        }}
        closingBalanceKeys={'credit_ledger_ac'}
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
        //       key1: 'debit_ac_ledger',
        //       key2: 'credit_ledger_ac',
        //       name1: 'Debit A/c Ledger',
        //       name2: 'Credit Ledger A/C',
        //     },
        //     'closing_balance_a'
        //   );
        // }}
        formTableEditRow={formTableEditRow}
        handleFinish={handleFinish}
        voucherTittle={'Journal Voucher - Add new'}
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
                <Col span={5}>
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
    </div>
  );
};

export default Create;
