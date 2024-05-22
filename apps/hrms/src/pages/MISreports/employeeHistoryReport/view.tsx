import React, { useState, useEffect, useContext } from 'react';
import { getReportsData } from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import Report from '../../../../../../libs/common/ui/Report/report';
import autoTable from 'jspdf-autotable';
import { styles, bodyStyle, headerStyles } from '../leaveReports/view';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';

const formData = [
  {
    name: 'employee_name',
    datatype: 'Link',
    isReq: false,
    description: {
      linkfield: 'full_name',
      modulename: 'employee_management',
    },
    options: 'Personal Details',
    placeholder: 'Employee Name',
    hidden: 0,
    readonly: false,
  },
];

const View = (props: any) => {
  const [loading, setloading] = useState(false);
  const [salaryParameterOptions, setSalaryParameterOptions] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [paginationData, setPaginationData] = useState<any>({
    page_length: 5,
    current_page: 1,
  });

  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);

  const pageData = {
    pageTitle: 'Employee History Report',
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
      `employee_history_report?page=${current_page}&page_length=${page_length}`,
      'mis_reports',
      'htssuite',
      payload
    ).then((items) => {
      const modifiedData = [
        {
          ...items?.data?.['Employee Details'],
          violations: items?.data?.['Violations'],
        },
      ];

      setPaginationData({
        ...paginationData,
        total_records: items?.total_records || 0,
      });
      setTableData(modifiedData);
      setloading(false);
    });
  };
  useEffect(() => {
    const columns = [
      {
        title: 'Employee Id',
        key: 'Employee Id',
        dataIndex: 'Employee Id',
        description: { sortType: 'char' },
        // render: (_: any, record: any) => record?.employee_data?.name,
      },
      {
        title: 'Employee Name',
        key: 'Employee Name',
        dataIndex: 'Employee Name',
        description: { sortType: 'char' },
        // render: (_: any, record: any) => record?.employee_data?.full_name,
      },
      {
        title: 'Designation',
        key: 'Designation',
        dataIndex: 'Designation',
        description: { sortType: 'char' },
      },
      {
        title: 'Department',
        key: 'Department',
        dataIndex: 'Department',
        description: { sortType: 'char' },

        //  / render: (_: any, record: any) => record?.employee_data?.location_name,
      },
      {
        title: 'DOJ',
        key: 'DOJ',
        dataIndex: 'Date of Joining',
        description: { sortType: 'char' },

        //  / render: (_: any, record: any) => record?.employee_data?.location_name,
      },
    ];
    setColumnsData(columns);
    if (selectedFilter?.employee_name) {
      reportFn(
        JSON.stringify(selectedFilter),
        paginationData?.current_page || 1,
        paginationData?.page_length || 5
      );
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

  const onFilterClickHandler = () => {
    handleExport(tableData);
  };

  const onHandleChangeFilterHandler = (value: any, key: string) => {
    setSelectedFilter({ ...selectedFilter, [key]: value });
  };
  const onDownloadExcel = () => {
    const data = tableData;
    handleExport(data, 'Employee Histroy Report');
  };
  const onHandlePagination = (current_page: number, page_length: number) => {
    setPaginationData({
      ...paginationData,
      current_page: current_page,
      page_length: page_length,
    });
    reportFn(JSON.stringify(selectedFilter), current_page, page_length);
  };
  const expandedRowRender = (e: any) => {
    const tablekeys = ['Leave Code', 'Leave Name', 'Leave Balance'];
    const columns = [
      {
        title: 'Date',
        key: 'Date',
        dataIndex: 'Date',
        description: { sortType: 'char' },
        // render: (_: any, record: any) => record?.employee_data?.name,
      },
      {
        title: 'Violation Type',
        key: 'Violation Type',
        dataIndex: 'Violation Type',
        description: { sortType: 'char' },
        // render: (_: any, record: any) => record?.employee_data?.full_name,
      },
      {
        title: 'Description',
        key: 'Description',
        dataIndex: 'Description',
        description: { sortType: 'char' },
      },
    ];
    // console.log("nest columns",nestedcolumns)
    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <SmnlTable column={columns} dataSource={e?.violations || []} />
      </div>
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
        showTable={true} //not needed only pass when false
        pageData={pageData}
        showExportToExcel={true} //not needed only pass when false
        showDownloadPaySlip={false} //not needed only pass when false
        showFilters={true} //not needed only pass when false
        downloadExcel={onDownloadExcel}
        totalRecords={paginationData?.total_records}
        onChangePaginationFn={onHandlePagination}
        expandable={{
          expandedRowRender,
          rowExpandable: (record: any) => record.expandable !== false,
        }}
      />
    </div>
  );
};

export default View;
