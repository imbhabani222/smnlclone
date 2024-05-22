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
  commonfields,replaceClosingBalanceWithOpening
} from './helper';

import { isSuccess } from '../../../../../../libs/common/ui/Message';
import SmnlForm from '../../../../../../libs/common/ui/Form/FormWrapper';
import {
  ledgerColumn,
  ledgerSearchIndexex,

} from '../helper'
type Props = {};
const formData=[
  
  {
    datatype: "Select",
    default: undefined,
    description: {},
    hidden: 0,
    isReq: true,
    label: "Financial year",
    name: "Financial_year",
    options:[ 
    {label: '2021-2022', value: '2021-2022'},
    {label: '2022-2023', value: '2022-2023'},
    {label: '2023-2024', value: '2023-2024'},
    {label: '2024-2025', value: '2024-2025'},
    {label: '2025-2026', value: '2025-2026'},
    {label: '2026-2027', value: '2026-2027'},
    {label: '2027-2028', value: '2027-2028'},
    {label: '2028-2029', value: '2028-2029'},
    {label: '2029-2030', value: '2029-2030'}
    ]
     
    },
  {
    label: "Ledger",
    name: "ledger_name",
    datatype: "Link",
    isReq: true,
    description: {
        linkfield: "ledger_name",
        modulename: "inventory_account_configuration",
        appname: "htsaccount",
        showActive: "true",
        colSpan: "4",
        filterName: "hideBank&cashLedger"
    },
    options: "Inventory General Ledger",
    hidden: 0,
    readonly: false
},
{
  datatype: "Float",
default: undefined,
description: {},
hidden: 0,
isReq: true,
label: "Open Balancing Balance",
name: "closing_balance",
options: undefined,
readonly: false,

},
{
  datatype: "Select",
default: undefined,
description: {},
hidden: 0,
isReq: true,
label: "Opening Type",
name: "opening_type",
options: [
{label: 'Dr', value: 'Dr'},
{label: 'Cr', value: 'Cr'}
],
readonly: false
}

]

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);
  const [formValue, setformValue] = useState<any>({});
  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');
  // const [selectedFilter, setSelectedFilter] = useState<any>({});

  
  // useEffect(() => {
   
    
    // getTableData(
    //   'inventory_ledger_group',
    //   'inventory_account_configuration',
    //   'htsaccount'
    // ).then((items) => {
    //   setloading(false);

    //   setData(items);
    // });
  //   if (term) {
  //     const data = { name: term };
  //     setloading(true);
  //     getRecordById(
  //       'inventory_general_ledger',
  //       data,
  //       'inventory_account_configuration',
  //       'htsaccount'
  //     ).then((items) => {
  //       setloading(false);
  //       setformValue(items);
  //     });
  //   }
  // }, [term]);

  const handleFinish = (e: any) => {
    console.log("e",e)
    let financial_year = e['Financial_year']
    // console.log("financial year",financial_year)
    let closing_balance = e['closing_balance']
    // console.log("closing_balance",closing_balance)
    let opening_type = e['opening_type']
    // console.log("opening", opening_type)
    // console.log("forVal",formValue)
    setloading(true);
  
      const record = {
        name: e?.ledger_name,
        data: {
          // ...e,
          Financial_year:financial_year,
          opening_balance:closing_balance,
          opening_type:opening_type,

          active: 1 ,
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
          navigate('/view-ledger-opening-balance');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } 
    
    // else {
      // const record = {
      //   ...e,
      //   active: e?.active ? 1 : 0,
      // };

      // createRecord(
      //   'inventory_general_ledger',
      //   record,
      //   'inventory_account_configuration',
      //   'htsaccount'
      // ).then((items) => {
      //   setloading(false);
      //   if (items.status === 200) {
      //     isSuccess(items?.message, 'success');
      //     navigate('/view-general-ledger');
      //   } else {
      //     isSuccess(items?.message, 'error');
      //   }
      // });
    // }
  
  
  
  // const  onHandleChange= (value: any, key: string) => {
  //   let val=value
    
  //   console.log("val",val) 
  //   // setSelectedFilter({...selectedFilter,[key]: val})
  //   setformValue({...formValue, [key]:val})
  // };



  return (
    <>
      <Spin loading={loading} />
      <SmnlForm
       formData ={formData}
       formValue={formValue}
    // onChange={onHandleChange}
    handleFinish={handleFinish}
    dynamicLayout
  
                  // appname="htssuite"
    appname='htsaccount'
                />
    </>
  );
};

export default Create;
