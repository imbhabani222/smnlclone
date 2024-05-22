import React, { useCallback, useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import Message from '../../../../../../libs/common/ui/Message/message';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

import {
  bankGroupName,
  bankfields,
  sundryExpenseFields,
  sundryExpenseGroupName,
  sundryGroupName,
  sundryfields,
  commonfields,
} from './helper';

import { isSuccess } from '../../../../../../libs/common/ui/Message';

type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [formData, setformData] = useState<any>([]);
  const [dependData, setdependData] = useState<any>([]);
  const [formValue, setformValue] = useState({ active: true });
  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');
  useEffect(() => {
    getFields('Inventory General Ledger ', 'htssuite').then((items) => {
      items.forEach((element: any) => {
        delete element.depends_on;
      });
      const fil = items.filter((item: any) => {
        if (commonfields.includes(item.name)) {
          return true;
        } else {
          false;
        }
      });
      setFilteredData(fil);

      setformData(items);
    });
    getTableData(
      'inventory_ledger_group',
      'inventory_account_configuration',
      'htsaccount'
    ).then((items) => {
      setloading(false);

      setData(items);
    });
    if (term) {
      const data = { name: term };
      setloading(true);
      getRecordById(
        'inventory_general_ledger',
        data,
        'inventory_account_configuration',
        'htsaccount'
      ).then((items) => {
        setloading(false);
        setformValue(items);
      });
    }
  }, [term]);

  const handleFinish = (e: any) => {
    setloading(true);
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
        },
      };

      updateRecord(
        'inventory_general_ledger',
        record,
        'inventory_account_configuration',
        'htsaccount'
      ).then((items: any) => {
        setloading(false);
        if (items.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-general-ledger');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
      };

      createRecord(
        'inventory_general_ledger',
        record,
        'inventory_account_configuration',
        'htsaccount'
      ).then((items) => {
        setloading(false);
        if (items.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-general-ledger');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };
  const handleFormData: any = (fields: any, data: any) => {
    const fil = formData.filter((item: any) => {
      if (fields.includes(item.name)) {
        return true;
      } else if (commonfields.includes(item.name)) {
        return true;
      } else {
        false;
      }
    });
    setFilteredData(fil);
  };
  const onChangeGroupName = (value: any, data: any) => {
    // console.log(value, data);
    // const findGroupId = data.find((id: any) => {
    //   if (id?.name === value) {
    //     return id?.ledger_group_name;
    //   }
    // });
    // console.log(findGroupId, formData, 'saa');
    // if (findGroupId.ledger_group_name === 'Sundry Creditors Expenses') {
    //   const sundryCreditorsExp = formData.dependsdata.filter(
    //     (i: any) => i.name === 'state'
    //   );
    //   console.log(sundryCreditorsExp);
    //   setdependData(sundryCreditorsExp);
    // }
  };

  const handleChange = (val: any, name: any, e: any, selectBoxOptions: any) => {
    if (name === 'group_name') {
      if (bankGroupName.find((i: any) => i === selectBoxOptions?.label)) {
        handleFormData(bankfields);
      } else if (
        sundryGroupName.find((i: any) => i === selectBoxOptions?.label)
      ) {
        handleFormData(sundryfields);
      } else if (
        sundryExpenseGroupName.find((i: any) => i === selectBoxOptions?.label)
      ) {
        handleFormData(sundryExpenseFields);
      } else {
        handleFormData([]);
      }
    }
    // setformData((pre: any) => {
    //   return [...pre, { fieldName: 'hello', datatype: 'Data' }];
    // });
  };

  return (
    <>
      <Spin loading={loading} />
      <FormWrapper
        formValue={formValue}
        formData={filteredData}
        handleFinish={handleFinish}
        appname="htsaccount"
        // dependsData={dependData}
        dynamicLayout
        onChange={handleChange}
      />
    </>
  );
};

export default Create;
