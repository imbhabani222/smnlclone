import React, { useState, useEffect, useContext } from 'react';
import {
  getReportsData,
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import Report from '../../../../../../libs/common/ui/Report/report';
import autoTable from 'jspdf-autotable';
import { styles, bodyStyle, headerStyles } from '../leaveReports/view';
import { handleExportforMisreports } from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';

const formData = [
  {
    placeholder: 'Employee',
    name: 'emp_code',
    datatype: 'TableSelect',
    isReq: false,
    description: {
      linkfield: 'full_name',
      modulename: 'employee_management',
      showActive: 'true',
      appname: 'htssuite',
      search: 'api.search_employees?search=',
    },
    options: 'Personal Details',
    hidden: 0,
    readonly: false,
    columns: [
      {
        title: 'Employee Code',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Employee Name',
        dataIndex: 'full_name',
        key: 'full_name',
      },
    ],
    searchIndexes: [],
    callOnChange: true,
    colSpan: 3,
  },
];

const View = (props: any) => {
  const [loading, setloading] = useState(false);
  const [salaryParameterOptions, setSalaryParameterOptions] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const [paginationData, setPaginationData] = useState<any>({
    page_length: 5,
    current_page: 1,
  });

  const pageData = {
    pageTitle: 'Fianl Settlement Report',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Export to Pdf',
    tableHeight: 250,
  };

  const reportFn = (
    payload: any,
    current_page: number,
    page_length: number
  ) => {
    setloading(true);
    getTableData(
      `final_settlement`,
      'employee_management',
      // current_page,
      // page_length,
      'htssuite',
      payload
    ).then((items) => {
      setTableData(items?.data || items);
      setPaginationData({
        ...paginationData,
        total_records: items?.total_records || 0,
      });
      const columns: any = [];

      setColumnsData(columns);
      setloading(false);
    });
  };

  useEffect(() => {
    reportFn(
      JSON.stringify(selectedFilter),
      paginationData?.current_page || 1,
      paginationData?.page_length || 5
    );
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

  const onFilterClickHandler = () => {
    handleExport(tableData);
  };

  const onHandleChangeFilterHandler = (value: any, key: string) => {
    setSelectedFilter({ ...selectedFilter, [key]: value });
  };

  const onHandlePagination = (current_page: number, page_length: number) => {
    setPaginationData({
      ...paginationData,
      current_page: current_page,
      page_length: page_length,
    });
    reportFn(JSON.stringify(selectedFilter), current_page, page_length);
  };
  const onDownloadExcel = () => {
    const formatExcelData = tableData.map((item: any) => ({
      'Employee Id': item['emp_id'],
      'Employee Name': item['employee_name'],
      Designation: item['designation'],
      section: item['section'],
      doj: item['doj'],
      'resignation type': item['resignation_type'],
      'last working day': item['last_working_day'],
      'no of years worked': item['no_of_years_worked'],
      'gross salary': item['gross_salary'],
      'actual basic': item['actual_basic'],
      'wages payable': item['wages_payable'],
      'leave encashment amount': item['leave_encashment_amount'],
      'gratuity on actual basic': item['gratuity_on_actual_basic'],
      bonus: item['bonus'],
      '6 days wages recovery advance paid':
        item['6_days_wages_recovery_advance_paid'],
      'pf 12%': item['pf_in_12'],
      'esi 0.75%': item['esi_in_075'],
      'net payable': item['net_payable'],
    }));

    handleExportforMisreports(
      formatExcelData,
      'Attendence',
      `Attendance Report from ${selectedFilter?.from_date || ''} to ${
        selectedFilter?.to_date
      }`
    );
  };
  return (
    <div>
      <Report
        formData={formData}
        updateSelectionHandler={updateSelectionHandler}
        onHandleCloseHandler={onHandleCloseHandler}
        onHandleFilterHandler={onHandleFilterHandler}
        onFilterClickHandler={onFilterClickHandler}
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
        totalRecords={paginationData?.total_records}
        onChangePaginationFn={onHandlePagination}
        downloadExcel={onDownloadExcel}
      />
    </div>
  );
};

export default View;
