import React, { useEffect, useState } from 'react';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import { getTableData } from '../../../../../../libs/common/api/doctype';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';

type Props = {};

function Index(props: Props) {
  const [filter, setFilter] = useState<any>({});
  const [columnData, setColumnData] = useState<any>([]);
  const filterData: any = [
    {
      label: 'Department',
      name: 'department_name',
      datatype: 'Link',
      options: 'Department',
      isReq: false,
    },
    {
      label: 'Project',
      name: 'employee_name',
      datatype: 'Select',
      options: '',
      isReq: false,
    },
    {
      label: 'Employee',
      name: 'first_name',
      datatype: 'Link',
      options: 'Personal Details',
      module: 'employee_management',
      // isReq: true,
    },
    {
      label: 'Status',
      name: 'employee_name',
      datatype: 'Select',
      options: '',
      isReq: false,
    },
    {
      label: 'Leave Deducted fromat',
      name: 'employee_name',
      datatype: 'Select',
      options: '',
      isReq: false,
    },
  ];
  const column = [
    {
      title: 'Reg No',
      dataIndex: 'Reg_No',
      key: 'Reg_No',
    },
    {
      title: 'Reg Date',
      dataIndex: 'Reg_Date',
      key: 'Reg_Date',
    },
    {
      title: 'Emp Name ',
      dataIndex: 'Emp_Name',
      key: 'Emp_Name',
    },
    {
      title: 'Department',
      dataIndex: 'Department',
      key: 'Department',
    },
    {
      title: 'Project',
      dataIndex: 'Project',
      key: 'Project',
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      key: 'Amount',
    },
    {
      title: 'Status ',
      dataIndex: 'Status',
      key: 'Status',
    },
  ];
  useEffect(() => {
    getTableData('leave_request', 'leave_management', 'htssuite', filter).then(
      (item) => {
        setColumnData(item);
      }
    );
  }, []);
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
        />
      )}
      <SmnlTable dataSource={columnData} column={column}></SmnlTable>
    </div>
  );
}

export default Index;
