import React, { useState, useEffect, useContext } from 'react';
import { getReportsData } from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import { handleExportforMisreports } from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import Report from '../../../../../../libs/common/ui/Report/report';
import LeaveReportTemplate from './leaveReportTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../../../../../../libs/common/assets/logo.svg';
import autoTable from 'jspdf-autotable';
import { monthNames, years, getPreviousYear, MonthMap } from '../helper';
import { FilterItemsContext } from '../../../../../../libs/common/ui/Filter/ReportsFilter';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import { object } from 'prop-types';
import Cookies from 'universal-cookie';


let months: any = monthNames;
const currentMonthIndex = new Date().getMonth();      
months = monthNames.slice(0, currentMonthIndex + 1);


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
    // label: 'month',
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
        label: 'Leave Type',
        appname: 'htssuite',
        module: 'master_data',
        doctype: 'leave_type_master',
        key: 'leave_name',
        name: 'leave_name',
        id: 'name',
        specialapi: true,
        singleselect: true,
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
        label: 'Work Location',
        appname: 'htssuite',
        module: 'master_data',
        doctype: 'work_location',
        key: 'location_name',
        name: 'work_location',
        id: 'name',
        specialapi: true,
      },
      // {
      //   label: 'Employee Category',
      //   appname: 'htssuite',
      //   module: 'master_data',
      //   doctype: 'workforce_category',
      //   key: 'category_name',
      //   name: 'Employee Category',
      // },
      // {
      //   label: 'Week Off Category',
      //   appname: 'htssuite',
      //   module: 'master_data',
      //   doctype: 'employee_category',
      //   key: 'category_name',
      //   name: 'Grade',
      // },
    ],
    colSpan: 6,
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
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [loading, setloading] = useState(false);
  const [exportloading, setexportloading] = useState<any>(false);
  const [allrecords, setallrecords] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>(
    getPreviousYear('integer')
  );
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });

  const { filter, updateFilter } = useContext<any>(FilterContext);
  const { filterItems, updateFilterItems } =
    useContext<any>(FilterItemsContext);
  const pageData = {
    pageTitle: 'Leave Balance',
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
    getReportsData(
      `get_leave_reports?page=${current_page}&page_length=${page_length}`,
      'mis_reports',
      'htssuite',
      payload
    ).then((items) => {
      const columns = [
        {
          title: 'Employee Id',
          key: 'name',
          dataIndex: 'name',
          description: { sortType: 'char' },
          // render: (_: any, record: any) => record?.employee_data?.name,
        },
        {
          title: 'Employee Name',
          key: 'full_name',
          dataIndex: 'full_name',
          description: { sortType: 'char' },
          // render: (_: any, record: any) => record?.employee_data?.full_name,
        },
        {
          title: 'Designation',
          key: 'designation',
          dataIndex: 'designation',
          description: { sortType: 'char' },
        },
        {
          title: 'Work Location',
          key: 'location_name',
          dataIndex: 'location_name',
          description: { sortType: 'char' },

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
    });
  };
  useEffect(() => {
    if (selectedFilter?.year && selectedFilter?.month) {
      // setexportloading(true);
      leaveReportFn(
        JSON.stringify(selectedFilter),
        paginationData?.current_page || 1,
        paginationData?.page_length || 5
      );
      getReportsData(
        `get_leave_reports?page=${paginationData?.current_page}&page_length=${paginationData?.page_length}`,
        'mis_reports',
        'htssuite',
        JSON.stringify(selectedFilter)
        
      ).then((items) => {
        setallrecords(items?.data || items);
        // setexportloading(false);
      });
    } else {
      setTableData([]);
      setallrecords([]);
      setPaginationData({
        ...paginationData,
        total_records: 0,
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

  const onFilterClickHandler = () => {};

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
    const monthmap: any = {
      January: '01',
      February: '02',
      March: '03',
      April: '04',
      May: '05',
      June: '06',
      July: '07',
      August: '08',
      September: '09',
      October: '10',
      November: '11',
      December: '12',
    };
    if (key === 'month') {
      value = monthmap[value];
    }
    setSelectedFilter({ ...selectedFilter, [key]: Number(value) });
  };

  const onDownloadPdf = () => {
    const rep: any = new jsPDF('p', 'pt', 'a4');
    const data = [...tableData];
    const mapedData = data?.map((item: any, index: any) => [
      `${index + 1}`,
      item?.employee_data?.name,
      item?.employee_data?.full_name,
      item?.name,
      item.balance,
      item?.employee_data?.location_name,
    ]);
    const columnd = [
      'Sl.N0',
      'Employee Id',
      'Employee Name',
      'Leave Type',
      'Total Leave Balance',
      'Work Location',
    ];
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
        rep.text(' Leave Report', 250, 55);

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
        pdf.save('LeaveReport.pdf');
      },
    });
  };

  const onDownloadExcel = () => {
    setexportloading(true);

    let data: any = [];
    allrecords?.map((item: any) => {
      item?.leave_data?.map((i: any) => {
        data.push({ ...item, ...i });
      });
    });
    
    const mapedData = data?.map((item: any) => ({
      'Employee Id': item?.name,
      'Employee Name': item?.full_name,
      'Total Leave Balance': item.balance,
      Designation: item?.designation,
      'Work Location': item?.location_name,
      'Leave Code': item?.leave_code,
      'Leave Name': item?.leave_name,
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
    setexportloading(false);
  };

  const onHandlePagination = (current_page: number, page_length: number) => {
    setPaginationData({
      ...paginationData,
      current_page: current_page,
      page_length: page_length,
    });
    leaveReportFn(JSON.stringify(selectedFilter), current_page, page_length);
  };
  const expandedRowRender = (e: any) => {
    

    const tablekeys = ['Leave Code', 'Leave Name', 'Leave Balance'];
    const columns = [
      {
        title: 'Leave Code',
        key: 'leave_code',
        dataIndex: 'leave_code',
        description: { sortType: 'char' },
        // render: (_: any, record: any) => record?.employee_data?.name,
      },
      {
        title: 'Leave Name',
        key: 'leave_name',
        dataIndex: 'leave_name',
        description: { sortType: 'char' },
        // render: (_: any, record: any) => record?.employee_data?.full_name,
      },
      // {
      //   title: 'Total Leave Balance',
      //   key: 'balance',
      //   dataIndex: 'balance',
      // },
      {
        title: 'Leave Balance',
        key: 'balance',
        dataIndex: 'balance',
        description: { sortType: 'int' },

        // render: (_: any, record: any) => record?.employee_data?.location_name,
      },
    ];
    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <SmnlTable column={columns} dataSource={e?.leave_data || []} />
      </div>
    );
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
        formValue={{
          ...selectedFilter,
          month: MonthMap[selectedFilter?.month],
        }}
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
        showDownloadPaySlip={false} //not needed only pass when false
        showFilters={true} //not needed only pass when false
        downloadPdf={onDownloadPdf}
        downloadExcel={onDownloadExcel}
        onChangePaginationFn={onHandlePagination}
        totalRecords={paginationData?.total_records}
        expandable={{
          expandedRowRender,
          rowExpandable: (record: any) => record.expandable !== false,
        }}
        disableExcel={exportloading}
      />
    </div>
  );
};

export default View;
