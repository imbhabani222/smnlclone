import React, { useEffect, useState } from 'react';
import {
  getFields,
  getRecordById,
  getDocTypes,
  updateRecord,
  createRecord,
  getProductById,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import Message from '../../../../../../libs/common/ui/Message/message';
/* @ts-ignore  */
import FormTable from '../../../../../../libs/common/ui/Form_Table/FormTable';
import { useSearchParams } from 'react-router-dom';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
type Props = { doc_id: any; url?: string; switchToNextTab: any };
const Create = (props: Props) => {
  const { switchToNextTab = () => {} } = props;
  const [searchParams] = useSearchParams();
  const mainId = searchParams.get('id') || '';
  console.log('mainid', mainId);
  const [formData, setformData] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [formValue, setformValue] = useState({
    name: '',
    data: '',
  });
  const [subid, setsubid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getFields('Debit Note Voucher Details', 'htssuite').then((items) => {
      console.log('cnvd', items);
      setformData(items);
    });
    getDocTypes('Debit Note Voucher Details', false, 'htssuite').then(
      (items) => {
        // setcolumns(items)
        // let newData = items.filter((item: any) => {
        //   const reqfields = [
        //     'part',
        //     'uom',
        //     'available_qty',
        //     'make',
        //     'reorder_level',
        //     'indent_qty',
        //     'rate',
        //     'pending_indent_qty',
        //     'action',
        //   ];
        //   if (reqfields.includes(item.dataIndex)) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // });
        // setcolumns(newData);
        setcolumns(items);
      }
    );

    if (mainId) {
      const data = { name: mainId };
      getRecordById(
        'debit_note_voucher',
        data,
        'account_management',
        'htsaccount'
      ).then((items) => {
        console.log(items, 'items');
        // setsubid(items?.[0]?.name || null);
        setformValue({
          ...formValue,
          data: items?.details,
        });
      });
    }
  }, [mainId]);

  const handleFinish = (values: any) => {
    const record = {
      name: mainId,
      data: {
        details: values,
      },
    };
    console.log('r', record);
    updateRecord(
      'debit_note_voucher',
      record,
      'account_management',
      'htsaccount'
    ).then((items: any) => {
      if (items?.status === 200) {
        console.log('items', items);
        isSuccess(items?.message, 'success');
        // switchToNextTab('')
        navigate('');
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };

  // @ts-ignore
  //   let formDataValuesAdded = formDataFamilyRemoved.push(...values);

  const formChangeHandler = (val: any, fieldName: any) => {
    console.log(fieldName, val, 'sdadknasjdnasjdasvalue');
    if (fieldName === 'part') {
      if (val) {
        getProductById(
          'debit_note_voucher',
          val,
          'account_management',
          'htsaccount'
        ).then((items) => {
          console.log(items, 'fdmfksdmfkdsf');
          // reorder_level
          setformValue({
            ...formValue,
            data: { ...items, rate: items?.mrp_price || items?.rate },
          });
        });
      } else {
        setformValue({
          ...formValue,
        });
      }
    }
  };

  const formTableEditRow = (items: any) => {
    setformValue({
      ...formValue,
      data: { ...items, rate: items?.mrp_price || items?.rate },
    });
  };

  return (
    <div>
      {/* @ts-ignore  */}
      <FormTable
        formValue={formValue?.data}
        formData={formData}
        columns={columns}
        module="account_management"
        doctype="Debit Note Voucher"
        doc_id={mainId}
        handleFinish={handleFinish}
        appname="htsaccount"
        submitButtonLabel="Submit"
        // onchangehandler={formChangeHandler}
        // formTableEditRow={formTableEditRow}
      />
    </div>
  );
};

export default Create;
