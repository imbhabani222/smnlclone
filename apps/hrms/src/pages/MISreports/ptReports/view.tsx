import React, { useState, useEffect, useContext } from 'react';
import {
  getReportsData,
  getReportsDataOnValue,
} from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import { handleExportforMisreports } from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import Report from '../../../../../../libs/common/ui/Report/report';
import PTReportTemplate from './ptReportTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { monthNames, years, getPreviousYear } from '../helper';
import Cookies from 'universal-cookie';

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
        specialapi: true,
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
        specialapi: true,
      },
      {
        label: 'Department',
        appname: 'htssuite',
        module: 'master_data',
        doctype: 'department',
        key: 'department_name',
        name: 'department',
        id: 'name',
        specialapi: true,
      },

      {
        label: 'Grade',
        appname: 'htssuite',
        module: 'master_data',
        doctype: 'grade',
        key: 'grade_name',
        name: 'employee_grade',
        id: 'name',
        specialapi: true,
      },
      {
        label: 'Work Location',
        appname: 'htssuite',
        module: 'master_data',
        doctype: 'work_location',
        key: 'location_name',
        name: 'work_location',
        id: 'name',
        specialapi: true,
      },
      {
        label: 'Employee Category',
        appname: 'htssuite',
        module: 'master_data',
        doctype: 'workforce_category',
        key: 'category_name',
        name: 'employee_category',
        id: 'name',
        specialapi: true,
      },
      {
        label: 'Branch',
        appname: 'htssuite',
        module: 'master_data',
        doctype: 'branch_master',
        key: 'branch_name',
        name: 'branch',
        id: 'name',
        specialapi: true,
      },
      {
        label: 'Section',
        appname: 'htssuite',
        module: 'master_data',
        doctype: 'section',
        key: 'section_name',
        id: 'name',
        name: 'section',
        specialapi: true,
      },
    ],
    colSpan: 6,
  },
];

const View = (props: any) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [loading, setloading] = useState(false);
  const [exportloading, setexportloading] = useState<any>(false);
  const [allrecords, setallrecords] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>(getPreviousYear());
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });

  const pageData = {
    pageTitle: 'PT Report',
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
    getReportsDataOnValue(
      `get_deductions_reports?page=${current_page}&page_length=${page_length}`,
      'mis_reports',
      'htssuite',
      payload,
      'pt'
    ).then((items) => {
      const columns = [
        {
          title: 'Employee Id',
          key: 'Employee Id',
          dataIndex: 'employee_name',
          description: { sortType: 'char' },
          // render: (_: any, record: any) => record?.employee_data?.name,
        },
        {
          title: 'Employee Name',
          key: 'Employee Name',
          dataIndex: 'full_name',
          description: { sortType: 'char' },
          // render: (_: any, record: any) => record?.employee_data?.full_name,
        },
        {
          title: 'PT',
          key: 'pt',
          dataIndex: 'pt',
          description: { sortType: 'int' },
        },
        {
          title: 'Total Earning',
          key: 'total_earnings',
          dataIndex: 'total_earnings',
          description: { sortType: 'int' },

          //  / render: (_: any, record: any) => record?.employee_data?.location_name,
        },
      ];
      setloading(false);
      setColumnsData(columns);
      setPaginationData({
        ...paginationData,
        total_records: items?.total_records || 0,
      });
      setTableData(items?.data || items);
      setloading(false);
    });
  };

  useEffect(() => {
    if (selectedFilter?.year && selectedFilter?.month) {
      // setexportloading(true);
      reportFn(
        JSON.stringify(selectedFilter),
        paginationData?.current_page || 1,
        paginationData?.page_length || 5
      );
      getReportsDataOnValue(
        `get_deductions_reports`,
        'mis_reports',
        'htssuite',
        JSON.stringify(selectedFilter),
        'pt'
      ).then((items) => {
        setallrecords(items?.data || items);
        // setexportloading(false);
      });
    } else {
      setTableData([]);
      setallrecords([]);
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

  const onDownloadPdf = () => {
    const id: any = document.getElementById('payslip_id');
    html2canvas(id).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 10, 10, 190, 200);
      // pdf.output('dataurlnewwindow');
      pdf.save('PT Report.pdf');
    });
  };

  const onDownloadExcel = () => {
          setexportloading(true);

    handleExportforMisreports(
      allrecords,
      'PT Report',
      `Pt Report for the ${selectedFilter?.month || ''}`
    );
          setexportloading(false);

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
      <div style={{ position: 'absolute', left: '-9999px' }} id="payslip_id">
        {/* {loading &&  */}
        <PTReportTemplate data={tableData} />
        {/* } */}
      </div>
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
        showTable={true} //not needed only pass when false
        pageData={pageData}
        showExportToExcel={true} //not needed only pass when false
        showDownloadPaySlip={true} //not needed only pass when false
        showFilters={true} //not needed only pass when false
        downloadPdf={onDownloadPdf}
        downloadExcel={onDownloadExcel}
        totalRecords={paginationData?.total_records}
        onChangePaginationFn={onHandlePagination}
        disableExcel={exportloading}
      />
    </div>
  );
};

export default View;
