import React, { useState, useEffect, useContext } from 'react';
import {
  getReportsData,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import { handleExportforMisreports } from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import Report from '../../../../../../libs/common/ui/Report/report';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { styles, bodyStyle, headerStyles } from '../leaveReports/view';
import { monthNames, years, getPreviousYear } from '../helper';
import Cookies from 'universal-cookie';

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
    options: monthNames,
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
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });

  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);

  const pageData = {
    pageTitle: 'Payslip Report',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Export to Pdf',
    tableHeight: 250,
  };

  const payslipReportFn = (
    payload: any,
    current_page: any,
    page_length: any
  ) => {
    setloading(true);
    getTableData(
      `employee_notice_letter`,
      'employee_management',
      'htssuite',
      payload
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
          title: 'Designation',
          key: 'Designation',
          dataIndex: 'designation',
          description: { sortType: 'char' },
        },
        {
          title: 'Department',
          key: 'Department',
          dataIndex: 'department_name',
          description: { sortType: 'char' },

          //  / render: (_: any, record: any) => record?.employee_data?.location_name,
        },
        {
          title: 'DOJ',
          key: 'DOJ',
          dataIndex: 'date_of_joining',
          description: { sortType: 'char' },

          //  / render: (_: any, record: any) => record?.employee_data?.location_name,
        },
      ];
      setColumnsData(columns);
      setPaginationData({
        ...paginationData,
        total_records: items?.total_records,
      });
      setTableData(items?.data || items);
      setloading(false);
    });
  };
  useEffect(() => {
    if (true) {
      setexportloading(true);
      payslipReportFn(
        JSON.stringify(selectedFilter),
        paginationData?.current_page,
        paginationData?.page_length
      );
      getReportsData(
        `payslip_reports`,
        'mis_reports',
        'htssuite',
        JSON.stringify(selectedFilter)
      ).then((items) => {
        setallrecords(items?.data || items);
        setexportloading(false);
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
    console.log(key, value, 'value');
    updateFilter(false);
  };

  const onHandleChangeFilterHandler = (value: any, key: string) => {
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
    setTimeout(() => {
      html2canvas(id, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 10, 10, 190, 200);
        pdf.save('payslip.pdf');
      });
    }, 1000);
    // const data = [...tableData];
    // const mapedData = data?.map((item: any, index: any) => [
    //   `${index + 1}`,
    //   item['Employee Id'],
    //   item['Employee Name'],
    //   item['Department'],
    //   item['Designation'],
    //   item['Work Location'],
    //   item['UAN'],
    //   item['Present Days'],
    //   item['Total Days'],
    //   item['Eraned Days'],
    //   item['Leave Applied'],
    //   item['Payslip Data']['bank_details'].bank_name,
    //   item['Net Payable'],
    //   item['Payslip Data']['total_earnings'],
    //   item['Payslip Data']['total_deductions'],
    // ]);
    // const columnd = [
    //   'Sl.N0',
    //   'Employee Id',
    //   'Employee Name',
    //   'Department',
    //   'Designation',
    //   'Work Location',
    //   'UAN',
    //   'Present Days',
    //   'Total Days',
    //   'Eraned Days',
    //   'Leave Applied',
    //   'Bank Name',
    //   'Net Payable',
    //   'Total Earnings',
    //   'Total Deductions',
    // ];
    // rep.html(document.querySelector('#payslip_id'), {
    //   callback: function (pdf: any) {
    //     rep.setFontSize(18);
    //     rep.text(
    //       ' C/O Adani Krishnapatnam Port Ltd., Muthukur, Nellore,-524344',
    //       35,
    //       100
    //     );
    //     rep.setFontSize(28);
    //     rep.text(' PaySlip Report', 200, 145);
    //     // rep.addImage(logo, 'SVG', 10, 10, 190, 200);
    //     autoTable(rep, {
    //       theme: 'grid',
    //       head: [columnd], // Use the first row as the header
    //       body: mapedData, // Exclude the header row from the body
    //       startY: 180, // Y-position from the top
    //       styles: styles,
    //       headStyles: headerStyles,
    //       bodyStyles: bodyStyle,
    //     });
    //     pdf.save('PayslipReport.pdf');
    //   },
    // });
  };
  const onDownloadExcel = () => {
    const formatExcelData = allrecords.map((item: any) => ({
      'Employee Id': item['employee_name'],
      'Employee Name': item['full_name'],
      Department: item['department_name'],
      Designation: item['designation'],
      'Work Location': item['location_name'],
      UAN: item['uan_number'],
      'Present Days': item['present_days'],
      'Total Days': item['total_days'],
      'Eraned Days': item['earned_days'],
      'Leave Applied': item['leave_applied'],
      ...item['leave_balance'],
      'Bank Name': item['payslip_data']['bank_details'].bank_name,
      'Net Payable': item['net_salary'],
      ...item['payslip_data'].earnings,
      HRA: item['hra'],
      ...item['payslip_data'].deductions,
      'Total Earnings': item['payslip_data']['total_earnings'],
      'Total Deductions': item['payslip_data']['total_deductions'],
    }));

    handleExportforMisreports(
      formatExcelData,
      'Payslip',
      `Payslip Report for the ${selectedFilter?.month || ''}`
    );
  };
  const onHandlePagination = (current_page: number, page_length: number) => {
    setPaginationData({
      ...paginationData,
      current_page: current_page,
      page_length: page_length,
    });
    payslipReportFn(JSON.stringify(selectedFilter), current_page, page_length);
  };
  return (
    <>
      <div
        id="payslip_id"
        style={{ position: 'absolute', left: '-9999px' }}
      ></div>
      <Report
        formData={formData}
        updateSelectionHandler={updateSelectionHandler}
        onHandleCloseHandler={onHandleCloseHandler}
        onHandleFilterHandler={onHandleFilterHandler}
        formValue={selectedFilter}
        // onFilterClickHandler={onFilterClickHandler}
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
        downloadPdf={onDownloadPdf}
        downloadExcel={onDownloadExcel}
        onChangePaginationFn={onHandlePagination}
        totalRecords={paginationData?.total_records}
        disableExcel={exportloading}
      />
    </>
  );
};

export default View;
