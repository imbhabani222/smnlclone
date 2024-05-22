import React, { useState } from 'react';
import { processSettlement } from '../../../../../../libs/common/api/doctype';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useNavigate } from 'react-router-dom';

type Props = {};
const formData = [
  // {
  //   label: 'Employee Name',
  //   name: 'emp_id',
  //   datatype: 'Link',
  //   isReq: true,
  //   description: {
  //     linkfield: 'employee_name',
  //     modulename: 'employee_management',
  //     optionValueName: "emp_code",
  //     showActive: "true"
  //   },
  //   options: 'resignation_details',
  //   hidden: 0,
  //   readonly: false,
  // },
  {
    label: 'Employee Name',
    name: 'emp_id',
    datatype: 'TableSelect',
    isReq: true,
    description: {
      linkfield: 'employee_name',
      modulename: 'employee_management',
      colSpan: '2',
      appname: 'htssuite',
      // showActive: 'true',
      optionValueName: 'emp_code',
      // search: 'employee_management.doctype.resignation_details.api.search=',
    },
    searchIndexes:['name','employee_name'],
    columns: [
      {
        title: 'Employee Code',
        dataIndex: 'name',
        key: 'name',
        // render : (_:any,record:any)=> record?.name
      },
      {
        title: 'Employee Name',
        dataIndex: 'employee_name',
        key: 'employee_name',
        // render:(_:any, record:any) =>record?.full_name
      },
    ],
    options: 'resignation_details',
    hidden: 0,
    readonly: false,
  },
];
const Create = (props: Props) => {
  const [formValue, setformValue] = useState({});
  const navigate = useNavigate();
  const handleFinish = (values: any) => {
    processSettlement(
      `final_settlement.api.process_settlement?emp_code=${values?.emp_id}`,
      'employee_management',
      'htssuite'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        navigate('/view-settlement');
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };

  return (
    <>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htssuite"
        dynamicLayout
      />
    </>
  );
};
export default Create;
