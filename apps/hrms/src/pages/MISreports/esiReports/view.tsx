import React, { useState, useEffect, useContext } from 'react';
import {
  getReportsData,
  getReportsDataOnValue,
} from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import { handleExportforMisreports } from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import Report from '../../../../../../libs/common/ui/Report/report';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ESIReportTemplate from './esiReportTemplate';
import autoTable from 'jspdf-autotable';
import { styles, bodyStyle, headerStyles } from '../leaveReports/view';
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
  const x = cookies.getAll();
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
    pageTitle: 'ESI Report',
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
      'esi'
    ).then((items) => {
      const tableKeys = [
        'Employee Id',
        'Employee Name',
        'DOJ',
        'ESI Number',
        'Working Days',
        'LOP',
        'Work Location',
        'Total Earning',
      ];
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
          title: 'DOJ',
          key: 'DOJ',
          dataIndex: 'date_of_joining',
          description: { sortType: 'char' },

          //  / render: (_: any, record: any) => record?.employee_data?.location_name,
        },
        {
          title: 'ESI Number',
          key: 'esi_number',
          dataIndex: 'esi_number',
          description: { sortType: 'int' },
        },
        {
          title: 'Working Days',
          key: 'Working_days',
          dataIndex: 'Working_days',
          description: { sortType: 'int' },
        },
        {
          title: 'LOP',
          key: 'lop',
          dataIndex: 'lop',
          description: { sortType: 'int' },
        },
        {
          title: 'ESI',
          key: 'esi',
          dataIndex: 'esi',
          description: { sortType: 'int' },

          //  / render: (_: any, record: any) => record?.employee_data?.location_name,
        },
        {
          title: 'Employer ESI',
          key: 'employer_esi',
          dataIndex: 'employer_esi',
          description: { sortType: 'int' },

          //  / render: (_: any, record: any) => record?.employee_data?.location_name,
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
        'esi'
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

  const onFilterClickHandler = () => {
    //handleExport(tableData);
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
    const rep: any = new jsPDF('p', 'pt', 'a4');
    const data = [...allrecords];
    const mapedData = data?.map((item: any, index: any) => [
      `${index + 1}`,
      item['Employee Id'],
      item['Employee Name'],
      item['DOJ'],
      item['ESI Number'],
      item['Working Days'],
      item['LOP'],
      item['Work Location'],
      item['Total Earning'],
    ]);
    const columnd = [
      'Sl.NO',
      'Employee Id',
      'Employee Name',
      'DOJ',
      'ESI Number',
      'Working Days',
      'LOP',
      'Work Location',
      'Total Earning',
    ];
    rep.html(document.querySelector('#payslip_id'), {
      callback: function (pdf: any) {
        rep.setFontSize(12);
        rep.setTextColor('#00000');
        rep.text('SHREE MARUTINANDAN LOGISTICS PRIVATE LIMITED', 130, 20);
        rep.setFontSize(11);
        rep.setTextColor('#5f5f5f');
        rep.text(
          'C/O Adani Krishnapatnam Port Ltd., Muthukur, Nellore,-524344',
          130,
          35
        );
        rep.setFontSize(14);
        rep.setTextColor('#00000');
        rep.text('ESI Report', 250, 55);
        // rep.addImage(logo, 'SVG', 10, 10, 190, 200);
        autoTable(rep, {
          theme: 'grid',
          head: [columnd], // Use the first row as the header
          body: mapedData, // Exclude the header row from the body
          startY: 80, // Y-position from the top
          styles: styles,
          headStyles: headerStyles,
          bodyStyles: bodyStyle,
        });
        pdf.save('ESIreport.pdf');
      },
    });
  };
  const onDownloadExcel = () => {
          setexportloading(true); 
    handleExportforMisreports(
      allrecords,
      'ESI Report',
      `ESI Report for the ${selectedFilter?.month || ''}`
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
      <div style={{ visibility: 'hidden', height: 0 }} id="payslip">
        <div id="payslip_id">
          <></>
        </div>
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
