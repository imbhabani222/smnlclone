import React, { useEffect, useState } from 'react';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import { getTableData } from '../../../../../../libs/common/api/doctype';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';
type Props = {};
function Index(props: Props) {
  const [filter, setFilter] = useState<any>({});
  const [tabelData, setTableData] = useState<any>([]);
  const filterData: any = [
    {
      label: 'Select Year*',
      name: 'year',
      datatype: 'Select',
    },
    {
      label: 'Select Month',
      name: 'month',
      datatype: 'Select',
      options: '',
      isReq: false,
    },
    {
      label: 'Branch',
      name: 'branch',
      datatype: 'Select',
      isReq: false,
    },
    {
      label: 'Department',
      name: 'department_name',
      datatype: 'Link',
      options: 'Department',
      isReq: false,
    },
    {
      label: 'Location',
      name: 'location',
      datatype: 'Select',
      options: '',
      isReq: false,
    },
  ];
  const column: any = [
    {
      title: 'Emp Name',
      dataIndex: 'Emp_Name',
      key: 'Emp_Name',
    },
    {
      title: 'Emp Code',
      dataIndex: 'Emp_Code',
      key: 'Emp_Code',
    },
    {
      title: 'Designation',
      dataIndex: 'Designation',
      key: 'Designation',
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
    },
    {
      title: 'Department',
      dataIndex: 'Department',
      key: 'Department',
    },
    {
      title: 'Gross',
      dataIndex: 'Gross',
      key: 'Gross',
    },
    {
      title: 'EL days',
      dataIndex: 'EL_days',
      key: 'EL_days',
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      key: 'Amount',
    },
  ];
  useEffect(() => {
    getTableData(
      'leave_encashment_request',
      'leave_management',
      'htssuite'
    ).then((item) => {
      setTableData(item);
    });
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
      <SmnlTable dataSource={tabelData} column={column}></SmnlTable>
    </div>
  );
}

export default Index;
