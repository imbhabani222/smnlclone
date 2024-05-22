import React, { useEffect, useState } from 'react';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import {
  getDocTypes,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
type Props = {};

const Create = (props: Props) => {
  const [filter, setFilter] = useState<any>({});
  const [columnData, setColumnData] = useState<any>([]);
  const [relod, setrelod] = useState<any>(false);
  const filterData: any = [
    {
      label: 'Employee',
      name: 'emp_name',
      datatype: 'Link',
      options: 'Personal Details',
      isReq: true,
      colSpan: 4,
      description: {
        linkfield: 'full_name',
        modulename: 'employee_management',
      },
    },
    {
      label: 'Status',
      name: 'status',
      datatype: 'Select',
      options: '',
      isReq: false,
      colSpan: 4,
    },
  ];

  const column = [
    {
      title: 'Request No',
      dataIndex: 'travel_request_no',
      key: 'Request_No',
    },
    {
      title: 'Request Date',
      dataIndex: 'travel_request_date',
      key: 'Request Date',
    },
    {
      title: 'Claim From',
      dataIndex: 'Request By',
      key: 'Request By',
    },
    {
      title: 'Claim To',
      dataIndex: 'estimated_cost',
      key: 'Estimated Cost',
    },
    {
      title: 'Emp Code',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Emp Name',
      dataIndex: 'Details',
      key: 'Details',
    },
    {
      title: 'Amount',
      dataIndex: 'Details',
      key: 'Details',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Details',
      dataIndex: 'Details',
      key: 'Details',
    },
    {
      title: 'Action',
      dataIndex: 'statusUpdate',
      key: 'statusUpdate',
      align: 'center',
      module: 'reimbursement_request',
      doctype: 'expense_&_reimbursement',
      appname: 'htssuite',
    },
  ];

  useEffect(() => {
    getTableData(
      'reimbursement_request',
      'expense_&_reimbursement',
      'htssuite'
    ).then((items) => {
      setColumnData(items);
    });
  }, [relod]);
  const handlePageRelod = () => {
    setrelod((pre: any) => !pre);
  };
  const handleChange = (value: any, name: any) => {
    setFilter((pre: any) => {
      return { ...pre, name: value };
    });
  };
  return (
    <div>
      {filterData && (
        <SmnlFormDynamicLayout
          sectionData={filterData}
          onChange={handleChange}
          appname={'htssuite'}
        />
      )}
      <SmnlTable
        dataSource={columnData}
        column={column}
        handlePageRelod={handlePageRelod}
      ></SmnlTable>
    </div>
  );
};

export default Create;
