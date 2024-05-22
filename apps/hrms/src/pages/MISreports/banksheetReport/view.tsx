import React, { useState, useEffect, useContext } from 'react';
import { getReportsData } from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import Report from '../../../../../../libs/common/ui/Report/report';
import { getPreviousYear, monthNames, years } from '../helper';

let months: any = monthNames;
const currentMonthIndex = new Date().getMonth();      
months = monthNames.slice(0, currentMonthIndex + 1);
const formData = [
  {
    datatype: 'Select',
    // label: 'Year',
    name: 'year',
    isReq: false,
    description: undefined,
    colSpan: 6,
    placeholder: 'Year',
    options: years,
  },
  {
    datatype: 'Select',
    // label: 'month',
    name: 'month',
    isReq: false,
    description: undefined,
    colSpan: 6,
    placeholder: 'Month',
    options: months,
  },
  {
    datatype: 'Filter',
    name: 'filter',
    isReq: false,
    sidebarItems: [
      {
        label: 'Employee Name',
        appname: 'htssuite',
        module: 'employee_management',
        doctype: 'personal_details',
        key: 'full_name',
        name: 'emp_code',
        id: 'name',
        // specialapi: true,
      },
      {
        label: 'Employee ID',
        appname: 'htssuite',
        module: 'employee_management',
        doctype: 'personal_details',
        key: 'name',
        name: 'emp_code',
        id: 'name',
        specialapi: true,
      },
      {
        label: 'Designation',
        appname: 'htssuite',
        module: 'master_data',
        doctype: 'designation',
        key: 'designation_name',
        name: 'designation',
        id: 'name',
      },
      {
        label: 'Department',
        appname: 'htssuite',
        module: 'master_data',
        doctype: 'department',
        key: 'department_name',
        name: 'department',
        id: 'name',
      },

      {
        label: 'Grade',
        appname: 'htssuite',
        module: 'master_data',
        doctype: 'grade',
        key: 'grade_name',
        name: 'employee_grade',
        id: 'name',
      },
      {
        label: 'Work Location',
        appname: 'htssuite',
        module: 'master_data',
        doctype: 'work_location',
        key: 'location_name',
        name: 'work_location',
        id: 'name',
      },
      {
        label: 'Employee Category',
        appname: 'htssuite',
        module: 'master_data',
        doctype: 'workforce_category',
        key: 'category_name',
        name: 'employee_category',
        id: 'name',
      },
      // {
      //   label: 'Week Off Category',
      //   appname: 'htssuite',
      //   module: 'master_data',
      //   doctype: 'employee_category',
      //   key: 'category_name',
      //   name: 'Grade',
      //   specialapi: true,
      // },
    ],
    colSpan: 6,
  },
];
type Props = {};
const View = (props: Props) => {
  const [loading, setloading] = useState(false);
  const [salaryParameterOptions, setSalaryParameterOptions] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>(getPreviousYear());
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);

  const pageData = {
    pageTitle: 'Bank Sheet Register Report',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Download Report',
    tableHeight: 250,
  };

  useEffect(() => {
    if (selectedFilter?.year && selectedFilter?.month) {
      setloading(true);
      const payload = selectedFilter;
      getReportsData(
        'get_deductions_reports',
        'mis_reports',
        'htssuite',
        JSON.stringify(payload)
      ).then((items) => {
        setTableData(items?.data);
        setloading(false);
      });
    }
  }, [selectedFilter]);

  const updateSelectionHandler = (Object: object) => {
    setSelectionObject(Object);
  };

  const onHandleCloseHandler = () => {
    updateFilter(false);
  };

  const onHandleFilterHandler = (key: any, value: any) => {
    updateFilter(false);
  };

  // const onFilterClickHandler = () => {
  //   handleExport(tableData);
  // };

  const onHandleChangeFilterHandler = (value: any, key: string) => {

    let getYears = new Date().getFullYear()
    
    if (key === "year" && parseFloat(value) !== getYears ) {
      formData.forEach((items:any)=>{
        if (items?.name === 'month') {
          items.options = monthNames
         
        }
      })     
    }else{
      formData.forEach((items:any)=>{
        if (items?.name === 'month') {
          items.options = months
         
        }
      })   
    }
    if (key === 'filter') {
      setSelectedFilter((pre: any) => {
        return { ...pre, ...value };
      });
      return;
    }
    setSelectedFilter({ ...selectedFilter, [key]: value });
  };

  const onDownloadExcel = () => {
    const formatExcelData = tableData.map((item: any) => ({
      'Employee Id': item['employee_name'],
      'Employee Name': item['full_name'],
      Department: item['department_name'],
      Designation: item['designation'],
      'Work Location': item['location_name'],
      'Bank Name': item['payslip_data']['bank_details'].bank_name,
      'Account Holder Name':
        item['payslip_data']['bank_details'].account_holder_name,
      'Account Number': item['payslip_data']['bank_details'].account_number,
      'IFSC code': item['payslip_data']['bank_details'].bank_ifsc_code,
      'Net Payable': item['net_salary'],
    }));
    handleExport(formatExcelData, 'Bank Sheet Report');
  };

  return (
    <div>
      <Report
        formData={formData}
        formValue={selectedFilter}
        updateSelectionHandler={updateSelectionHandler}
        onHandleCloseHandler={onHandleCloseHandler}
        onHandleFilterHandler={onHandleFilterHandler}
        // onFilterClickHandler={onFilterClickHandler}
        onHandleChangeFilterHandler={onHandleChangeFilterHandler}
        filter={filter}
        tableData={tableData}
        columnsData={columnsData}
        loading={loading}
        showTable={false} //not needed only pass when false
        pageData={pageData}
        showExportToExcel={true} //not needed only pass when false
        showDownloadPaySlip={false} //not needed only pass when false
        showFilters={true} //not needed only pass when false
        downloadExcel={onDownloadExcel}
        disableExcel={loading}
      />
    </div>
  );
};

export default View;
