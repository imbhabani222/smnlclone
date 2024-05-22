import React, { useState, useEffect, useContext } from 'react';
import {
  getReportsData,
  getAttendanceReportsData,
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
import { datetoFrom } from '../../../../../../libs/common/utils/common';

const formData = [
  {
    label: 'Select Date',
    name: 'attendance_Date',
    datatype: 'DateRange',
    isReq: false,
    description: {
      //colSpan: '5',
    },
    options: 'past',
    hidden: 0,
    readonly: false,
    colSpan: '3',
  },
  {
    label : "Employee",
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
  {
    datatype: 'Link',
    label: 'Department',
    name: 'department',
    options: 'department',
    description: {
      linkfield: 'department_name',
      modulename: 'master_data',
      showActive: 'true',
      colSpan: '4',
      type : 'multiselect'

    },
  },
];
const getDefaultDate = () => {
  const currentDate = new Date().getDate();
  const momentDate = moment();
  if (currentDate >= 25) {
    const from_date = momentDate
      .subtract(1, 'months')
      .date(26)
      .format('YYYY-MM-DD');
    const to_date = moment().date(25).format('YYYY-MM-DD');
    return {
      from_date,
      to_date,
      attendance_Date: [datetoFrom(from_date), datetoFrom(to_date)],
    };
  } else {
    const from_date = momentDate
      .subtract(2, 'months')
      .date(26)
      .format('YYYY-MM-DD');
    const to_date = moment()
      .subtract(1, 'months')
      .date(25)
      .format('YYYY-MM-DD');
    return {
      from_date,
      to_date,
      attendance_Date: [datetoFrom(from_date), datetoFrom(to_date)],
    };
  }
};
const View = (props: any) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [loading, setloading] = useState(true);
  const [exportloading, setexportloading] = useState<any>(false);
  const [allrecords, setallrecords] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>(getDefaultDate());
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });

  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);

  const pageData = {
    pageTitle: 'Attendance Report',
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
    let filter: any = {};
    if (selectedFilter?.emp_code) {
      filter.emp_code = Array.from([selectedFilter?.emp_code])
    }
    if(Array.isArray(selectedFilter?.department) && selectedFilter.department.length > 0) {
      filter.department=selectedFilter?.department?.map((item:any)=>item);
    }
    // if (selectedFilter?.emp_code && selectedFilter?.department) {
    //   filter += `"department":${JSON.stringify(selectedFilter?.department?.map((item:any)=>item))},"emp_code" : ${JSON.stringify(Array.from([selectedFilter?.emp_code]))}`
    // }
    if (filter) {
      getAttendanceReportsData(
        `attendance_report?filters=${JSON.stringify(filter)}&page=${current_page}&page_length=${page_length}`,
        'mis_reports',
        'htssuite',
        selectedFilter?.from_date,
        selectedFilter?.to_date,
        //   payload
      ).then((items) => {
        const data = items?.data?.map((item: any) => {
          let d: any = {
            employee_id: item?.employee_id,
            full_name: item?.employee_name,
          };
          item?.attendance?.map((i: any) => {
            d = { ...d, [i?.date]: i?.data };
          });
          return d;
        });
        let columns = [
          {
            title: 'Employee Id',
            key: 'Employee Id',
            dataIndex: 'employee_id',
            description: { sortType: 'char' },
            fixed: 'left',
            width: 180,
            // render: (_: any, record: any) => record?.employee_data?.name,
          },
          {
            title: 'Employee Name',
            key: 'Employee Name',
            dataIndex: 'full_name',
            description: { sortType: 'char' },
            fixed: 'left',
            width: 250,
            // render: (_: any, record: any) => record?.employee_data?.full_name,
          },
        ];
        const datecolumns: any = items?.data?.[0]?.attendance?.map(
          (item: any) => {
            return {
              title: item?.date?.split('-')?.at(-1),
              key: item?.date,
              dataIndex: item?.date,
              width: 100,
              align: 'center',
              render: (data: any, record: any) => {
                return data?.join('/ ');
              },
            };
          }
        );
        setColumnsData(columns?.concat(datecolumns || []));
        setPaginationData({
          ...paginationData,
          total_records: items?.total_records,
        });
        setTableData(data);
        setloading(false);
      });
    }else{
      getAttendanceReportsData(
        `attendance_report?page=${current_page}&page_length=${page_length}`,
        'mis_reports',
        'htssuite',
        selectedFilter?.from_date,
        selectedFilter?.to_date,
        //   payload
      ).then((items) => {
        const data = items?.data?.map((item: any) => {
          let d: any = {
            employee_id: item?.employee_id,
            full_name: item?.employee_name,
          };
          item?.attendance?.map((i: any) => {
            d = { ...d, [i?.date]: i?.data };
          });
          return d;
        });
        let columns = [
          {
            title: 'Employee Id',
            key: 'Employee Id',
            dataIndex: 'employee_id',
            description: { sortType: 'char' },
            fixed: 'left',
            width: 180,
            // render: (_: any, record: any) => record?.employee_data?.name,
          },
          {
            title: 'Employee Name',
            key: 'Employee Name',
            dataIndex: 'full_name',
            description: { sortType: 'char' },
            fixed: 'left',
            width: 250,
            // render: (_: any, record: any) => record?.employee_data?.full_name,
          },
        ];
        const datecolumns: any = items?.data?.[0]?.attendance?.map(
          (item: any) => {
            return {
              title: item?.date?.split('-')?.at(-1),
              key: item?.date,
              dataIndex: item?.date,
              width: 100,
              align: 'center',
              render: (data: any, record: any) => {
                return data?.join('/ ');
              },
            };
          }
        );
        setColumnsData(columns?.concat(datecolumns || []));
        setPaginationData({
          ...paginationData,
          total_records: items?.total_records,
        });
        setTableData(data);
        setloading(false);
      });
    }
    
  };
  useEffect(() => {
    if (selectedFilter?.to_date && selectedFilter?.to_date) {      
      // setexportloading(true);
      payslipReportFn(
        JSON.stringify(selectedFilter),
        paginationData?.current_page,
        paginationData?.page_length
      );
     {
        getAttendanceReportsData(
          `attendance_report`,
          'mis_reports',
          'htssuite',
          selectedFilter?.from_date,
          selectedFilter?.to_date,
          // selectedFilter?.emp_code
          //   payload
        ).then((items) => {
          const data = items?.data?.map((item: any) => {
            let d: any = {
              employee_id: item?.employee_id,
              full_name: item?.employee_name,
            };
            item?.attendance?.map((i: any) => {
              d = { ...d, [i?.date]: i?.data?.join('/ ') };
            });
            return d;
          });
          setallrecords(data);
          // setexportloading(false);
        });
      }
     
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
    } else if (key === 'attendance_Date') {
      setSelectedFilter((pre: any) => {
        return {
          ...pre,
          from_date: value?.[0]?.toDate()
            ? moment(value?.[0]?.toDate()).format('YYYY-MM-DD')
            : undefined,

          to_date: value?.[1]?.toDate()
            ? moment(value?.[1]?.toDate()).format('YYYY-MM-DD')
            : undefined,
          attendance_Date: [
            datetoFrom(
              value?.[0]?.toDate()
                ? moment(value?.[0]?.toDate()).format('YYYY-MM-DD')
                : undefined
            ),
            datetoFrom(
              value?.[1]?.toDate()
                ? moment(value?.[1]?.toDate()).format('YYYY-MM-DD')
                : undefined
            ),
          ],
        };
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
    // const formatExcelData = tableData.map((item: any) => ({
    //   'Employee Id': item['employee_name'],
    //   'Employee Name': item['full_name'],
    //   Department: item['department_name'],
    //   Designation: item['designation'],
    //   'Work Location': item['location_name'],
    //   UAN: item['uan_number'],
    //   'Present Days': item['present_days'],
    //   'Total Days': item['total_days'],
    //   'Earned Days': item['earned_days'],
    //   'Leave Applied': item['leave_applied'],
    //   ...item['leave_balance'],
    //   'Bank Name': item['payslip_data']['bank_details'].bank_name,
    //   'Actual Basic': item['payslip_data'].actuals['Basic'],
    //   'Actual Over Time': item['payslip_data'].actuals['Over Time'],
    //   'Actual Special Incentive':
    //     item['payslip_data'].actuals['Special Incentive'],
    //   'Basic Earnings': item['payslip_data'].earnings['Basic'],
    //   'Over Time Earnings': item['payslip_data'].earnings['Over Time'],
    //   'Special Incentive Earnings':
    //     item['payslip_data'].earnings['Special Incentive'],
    //   'Total Earnings': item['payslip_data']['total_earnings'],
    //   HRA: item['hra'],
    //   ...item['payslip_data'].deductions,
    //   'Total Deductions': item['payslip_data']['total_deductions'],
    //   'Net Payable': item['net_salary'],
    // }));

    handleExportforMisreports(
      allrecords,
      'Attendence',
      `Attendance Report from ${selectedFilter?.from_date || ''} to ${
        selectedFilter?.to_date
      }`
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
        horizontalScroll={true}
      />
    </>
  );
};

export default View;
