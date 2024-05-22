import React, { useState, useEffect, useContext } from 'react';
import {
  getMonthwiseNetSalary,
  getReportsData,
} from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import { handleExportforMisreports } from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import Report from '../../../../../../libs/common/ui/Report/report';
// import LeaveReportTemplate from './leaveReportTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../../../../../../libs/common/assets/logo.svg';
import autoTable from 'jspdf-autotable';
import { getPreviousYear, monthNames, years } from '../helper';
const formData = [
  // {
  //   name: 'employee_name',
  //   datatype: 'Link',
  //   isReq: false,
  //   description: {
  //     linkfield: 'full_name',
  //     modulename: 'employee_management',
  //   },
  //   options: 'Personal Details',
  //   placeholder: "Employee Name",
  //   hidden: 0,
  //   readonly: false,
  //   colSpan: 6,
  // },
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
];
export const styles: any = {
  cellPadding: 5,
  fontSize: 12,
  fontStyle: 'normal', // 'normal', 'bold', 'italic', 'bolditalic'
  halign: 'center', // 'left', 'center', 'right'
  valign: 'middle', // 'top', 'middle', 'bottom'
};
export const bodyStyle: any = {
  lineColor: [240, 240, 240],
  lineWidth: { top: 0, right: 0, bottom: 1, left: 0 },
  fontSize: 8,
};
export const headerStyles: any = {
  fontSize: 10,
  fillColor: [223, 223, 223],
  textColor: [0, 0, 0],
  fontStyle: 'bold',
  halign: 'center',
  lineColor: [250, 250, 250],
  lineWidth: { top: 0, right: 1, bottom: 0, left: 0 },
};
const View = (props: any) => {
  const [loading, setloading] = useState(false);
  const [salaryParameterOptions, setSalaryParameterOptions] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>(getPreviousYear());
  const [paginationData, setPaginationData] = useState<any>({
    page_length: 5,
    current_page: 1,
  });
  const { filter, updateFilter } = useContext<any>(FilterContext);

  const pageData = {
    pageTitle: 'Salary Report without Incentives',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Export to Pdf',
    tableHeight: 250,
  };

  const leaveReportFn = (
    payload: any,
    current_page: number,
    page_length: number
  ) => {
    setloading(true);
    getMonthwiseNetSalary(payload).then((items) => {
      const columns = [
        {
          title: 'Month',
          key: 'month',
          dataIndex: 'month',
          // render: (_: any, record: any) => record?.employee_data?.name,
        },
        {
          title: 'Net Salary',
          key: 'net_salary',
          dataIndex: 'net_salary',
        },
      ];

      setloading(false);
      setColumnsData(columns);
      setPaginationData({
        ...paginationData,
        total_records: items?.total_records || 0,
      });
      console.log(items, 'items');
      setTableData(items?.data || items);
    });
  };
  useEffect(() => {
    if (selectedFilter?.year) {
      leaveReportFn(
        selectedFilter?.year,
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

  const onFilterClickHandler = () => {};

  const onHandleChangeFilterHandler = (value: any, key: string) => {
    setSelectedFilter({ ...selectedFilter, [key]: Number(value) });
  };

  const onDownloadPdf = () => {
    const rep: any = new jsPDF('p', 'pt', 'a4');
    const data = [...tableData];
    const mapedData = data?.map((item: any, index: any) => [
      `${index + 1}`,
      item?.month,
      item?.net_salary,
    ]);
    const columnd = ['Sl.N0', 'Month', 'Net Salary'];
    rep.html(document.querySelector('#payslip_id'), {
      callback: function (pdf: any) {
        rep.setFontSize(12);
        rep.text('SHREE MARUTINANDAN LOGISTICS PRIVATE LIMITED', 130, 20);
        rep.setFontSize(11);
        rep.setTextColor('#5f5f5f');
        rep.text(
          ' C/O Adani Krishnapatnam Port Ltd., Muthukur, Nellore,-524344',
          130,
          35
        );
        rep.setFontSize(14);
        rep.setTextColor('#00000');
        rep.text(' Month Wise Net Salary Report', 200, 55);

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
        pdf.save('netSalaryReport.pdf');
      },
    });
  };

  const onDownloadExcel = () => {
    const data = [...tableData];
    const mapedData = data?.map((item: any) => ({
      'Employee Id': item?.employee_data?.name,
      'Employee Name': item?.employee_data?.full_name,
      'Total Leave Balance': item.balance,
      'Work Location': item?.employee_data?.location_name,
      'Leave Code': item?.leave_code,
      'Leave Name': item?.leave_name,
      'Maximum Leaves Applicable per Request':
        item?.max_leaves_applicable_per_request,
    }));
    const MonothMap: any = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    };
    handleExportforMisreports(
      mapedData,
      'LeaveReport',
      `Leave Report for the ${MonothMap[selectedFilter?.month]}`
    );
  };

  const onHandlePagination = (current_page: number, page_length: number) => {
    setPaginationData({
      ...paginationData,
      current_page: current_page,
      page_length: page_length,
    });
    leaveReportFn(JSON.stringify(selectedFilter), current_page, page_length);
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
        showExportToExcel={false} //not needed only pass when false
        showDownloadPaySlip={true} //not needed only pass when false
        showFilters={true} //not needed only pass when false
        downloadPdf={onDownloadPdf}
        downloadExcel={onDownloadExcel}
        onChangePaginationFn={onHandlePagination}
        totalRecords={paginationData?.total_records}
      />
    </div>
  );
};

export default View;
