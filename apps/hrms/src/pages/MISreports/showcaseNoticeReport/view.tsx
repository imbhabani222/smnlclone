import React, { useState, useEffect, useContext } from 'react';
import {
  getReportsData,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import { handleExportforMisreports } from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import Report from '../../../../../../libs/common/ui/Report/report';
import moment from 'moment';
import { years } from '../helper';
import Cookies from 'universal-cookie';

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

type Props = {};
const View = (props: Props) => {
  const [loading, setloading] = useState(false);
  const [salaryParameterOptions, setSalaryParameterOptions] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });
  const [exportloading, setexportloading] = useState<any>(false);
  const [allrecords, setallrecords] = useState<any>([]);
  const pageData = {
    pageTitle: 'Showcase Notice Report',
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
    getReportsData(
      `employee_showcase_notice_report?page=${current_page}&page_length=${page_length}`,
      'mis_reports',
      'htssuite',
      payload
    ).then((items) => {
      const columns: any = [
        {
          title: 'Employee Code',
          dataIndex: 'employee_code',
          key: 'employee_code',
        },
        {
          title: 'Employee Name',
          dataIndex: 'full_name',
          key: 'full_name',
        },
        {
          title: 'Department',
          dataIndex: 'department',
          key: 'department',
        },
        {
          title: 'Designation',
          dataIndex: 'designation',
          key: 'designation',
        },
        {
          title: 'Absent Date',
          dataIndex: 'absent_date',
          key: 'absent_date',
        },
        {
          title: 'First Letter Date',
          dataIndex: 'first_letter_date',
          key: 'first_letter_date',
          //    render: (_:any, record:any) => record?.first_letter_date ?<a  style={{cursor:"pointer"}} onClick={() => onTableChange(record, 'first_letter')}>{record?.first_letter_date}</a> : <a  style={{cursor:"pointer"}} onClick={() => onTableChange(record, 'first_letter')}>Download</a>
        },
        {
          title: 'Second Letter Date',
          dataIndex: 'second_letter_date',
          key: 'second_letter_date',
          //   render: (_:any, record:any) => (record?.first_letter_date && !record?.second_letter_date)? <a style={{cursor:"pointer"}} onClick={() => onTableChange(record, 'second_letter')}>Download</a>: <a  style={{cursor:"pointer"}} onClick={() => onTableChange(record, 'first_letter')}>{record?.second_letter_date || "-"}</a>
        },
        {
          title: 'Third Letter Date',
          dataIndex: 'third_letter_date',
          key: 'third_letter_date',
          //    render: (_:any, record:any) => (record?.second_letter_date && !record?.thrid_letter_date)? <a style={{cursor:"pointer"}} onClick={() => onTableChange(record, 'third_letter')}>Download</a> : <a  style={{cursor:"pointer"}} onClick={() => onTableChange(record, 'first_letter')}>{record?.third_letter_date || "-"}</a>
        },
      ];
      setColumnsData(columns);
      setTableData(items?.data || items);
      setPaginationData({
        ...paginationData,
        total_records: items?.total_records || 0,
      });
      setloading(false);
    });
  };
  useEffect(() => {
    setexportloading(true);

    reportFn(
      JSON.stringify(selectedFilter),
      paginationData?.current_page || 1,
      paginationData?.page_length || 5
    );
    getReportsData(
      `employee_showcase_notice_report`,
      'mis_reports',
      'htssuite',
      JSON.stringify(selectedFilter)
    ).then((items) => {
      setallrecords(items?.data || items);
      setexportloading(false);
    });
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
    //handleExport(tableData);
  };

  const onHandleChangeFilterHandler = (value: any, key: string) => {
    setSelectedFilter({ ...selectedFilter, [key]: value });
  };

  const onDownloadExcel = () => {
    handleExportforMisreports(
      allrecords,
      'noticeReport',
      `Show case notice Report`
    );
  };

  const onHandlePagination = (current_page: number, page_length: number) => {
    setPaginationData({
      ...paginationData,
      current_page: current_page,
      page_length: page_length,
    });
    reportFn(JSON.stringify(selectedFilter), current_page, page_length);
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
        showTable={true} //not needed only pass when false
        pageData={pageData}
        showExportToExcel={true} //not needed only pass when false
        showDownloadPaySlip={false} //not needed only pass when false
        showFilters={true} //not needed only pass when false
        downloadExcel={onDownloadExcel}
        totalRecords={paginationData?.total_records}
        onChangePaginationFn={onHandlePagination}
      />
    </div>
  );
};

export default View;
