import React from 'react';
import { Button, Table } from 'antd';
// @ts-ignore
import * as XLSX from 'xlsx';
// import styles from './ExportToExcel.module.scss';

interface DataSourceItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface ExportToExcelProps {
  data: DataSourceItem[];
}

const ExportToExcel: React.FC<ExportToExcelProps> = ({ data }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const handleExport = () => {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileName = 'Employee_list.xls';

    const ws = XLSX.utils.json_to_sheet(data); // Use the data prop
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: fileType });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <>
      <Button onClick={handleExport}>Export to Excel</Button>
    </>
  );
};

export default ExportToExcel;
