import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import Message from '../../../../../../libs/common/ui/Message/message';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

const Create = () => {
  const navigate = useNavigate();
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    state_name: '',
    active: false,
    zone: '',
  });
  const [reload, setReload] = useState(false);
  const [loading, setloading] = useState(true);
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });

  const [searchParams, _] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Inventory Alternate UOM', 'htssuite').then((items) =>
      setformData(items)
    );
    getDocTypes('Inventory Alternate UOM', false, 'htssuite').then((items) => {
      const newData: any = items.filter((item: any) => {
        const reqfields = [
          'product_name',
          'alternate_unit_value',
          'alternate_unit',
          'base_unit_value',
          'base_unit',
          'for_order',
          'active',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setcolumns(newData);
    });
    getTableData(
      'inventory_alternate_uom',
      'inventory_product_configuration',
      'htsinventory'
    ).then((items) => {
      setdata(items);
      setloading(false);
    });
  }, [term, reload]);

  const handleFinish = (e: any) => {
    const record = {
      ...e,
      active: e?.active ? 1 : 0,
    };
    createRecord(
      'inventory_alternate_uom',
      record,
      'inventory_product_configuration',
      'htsinventory'
    ).then((items) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
      } else {
        isSuccess(items?.message, 'error');
      }
      setReload((pre: any) => !pre);
    });
  };

  return (
    <div>
      <Spin loading={loading} />
      <FormWrapper
        // multiple={true}
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        reset={true}
        dynamicLayout
      />
      <Table column={columns} dataSource={data} />
    </div>
  );
};

export default Create;
