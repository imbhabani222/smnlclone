import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getTableData,
  getDocTypes,
} from '../../../../../../libs/common/api/doctype';
import Message from '../../../../../../libs/common/ui/Message/message';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import moment from 'moment';
import dayjs from 'dayjs';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';
import SMNLTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
type Props = {};
const Create = (props: Props) => {
  const navigate = useNavigate();
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({ grade_name: '', active: false });
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });
  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');
  useEffect(() => {
    getFields('Inventory Purchase Return ', 'htssuite').then((items) =>
      setformData(items)
    );
    if (term) {
      const data = { name: term };
      getRecordById(
        'inventory_purchase_order',
        data,
        'inventory_purchase_management',
        'htsinventory'
      ).then((items) => {
        setformValue({
          ...items,
          active: items?.active === 1 ? true : false,
        });
      });
    }
  }, [term]);

  useEffect(() => {
    getDocTypes('Inventory Purchase Return', false, 'htssuite').then((items) =>
      setcolumns(items)
    );
    getTableData(
      'inventory_purchase_return',
      'inventory_purchase_management',
      'htsinventory'
    ).then((items) => {
      setdata(items);
      //   setloading(false);
    });
  }, []);
  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
        },
      };
      updateRecord(
        'inventory_purchase_order',
        record,
        'inventory_purchase_management',
        'htsinventory'
      ).then((items: any) => {
        setmsg((pre) => {
          const message =
            items?.status !== 'error' ? { isSuccess: true } : { isError: true };
          return {
            ...pre,
            ...message,
            desc: items?.message,
          };
        });
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };
      createRecord(
        'inventory_purchase_order',
        record,
        'inventory_purchase_management',
        'htsinventory'
      ).then((items) =>
        setmsg((pre) => {
          const message =
            items?.status !== 'error' ? { isSuccess: true } : { isError: true };
          return {
            ...pre,
            ...message,
            desc: items?.message,
          };
        })
      );
    }
  };
  const handleQuit = () => {
    setTimeout(() => {
      navigate('/purchase-order-approval');
    }, 1000);
  };
  const handleChangeFun = (fieldName: any, e: any) => {};
  return (
    <div>
      <Message
        msg={msg?.desc}
        isSuccess={msg.isSuccess}
        isError={msg.isError}
        isWarning={msg.isWarning}
        handleQuit={handleQuit}
      />
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        dynamicLayout
        onChange={handleChangeFun}
      />
      <div>
        <SmnlTable column={columns} dataSource={data} />
      </div>
    </div>
  );
};
export default Create;
