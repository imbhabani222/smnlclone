import React, { useState, useEffect, useContext } from 'react';
import {
  getReportsData,
  getTableData,
  generatePayslip,
} from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import { handleExportforMisreports } from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import Report from '../../../../../../libs/common/ui/Report/report';
import PayslipTemplate from './payslipTemplate';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { styles, bodyStyle, headerStyles } from '../leaveReports/view';
import { monthNames, years, getPreviousYear } from '../helper';
import Cookies from 'universal-cookie';
import Modal from '../../../../../../libs/common/ui/Modal/modal';

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
  const [selectedFilter, setSelectedFilter] = useState<any>(
    getPreviousYear('payslip')
  );
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });

  const [filePerview, setfilePerview] = useState({
    isOpen: false,
    fileUrl: null,
  });

  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);

  const pageData = {
    pageTitle: 'Pay Register',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Download Pdf',
    tableHeight: 250,
  };

  const payslipReportFn = (
    payload: any,
    current_page: any,
    page_length: any
  ) => {
    setloading(true);
    getReportsData(
      `payslip_reports?page=${current_page}&page_length=${page_length}`,
      'mis_reports',
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
    if (selectedFilter?.month && selectedFilter?.year) {
      // setexportloading(true);
      payslipReportFn(
        JSON.stringify(selectedFilter),
        paginationData?.current_page,
        paginationData?.page_length
      );
      // getReportsData(
      //   `payslip_reports`,
      //   'mis_reports',
      //   'htssuite',
      //   JSON.stringify(selectedFilter)
      // ).then((items) => {
      //   setallrecords(items?.data || items);
      //   // setexportloading(false);
      // });
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
    setloading(true);
    const filters = selectedFilter;
    generatePayslip(
      'payslip_generator.generate_payslips',
      JSON.stringify(filters),
      'htssuite'
    ).then((items) => {
      setfilePerview({
        isOpen: true,
        fileUrl: items?.data,
      });
      setloading(false);
    });
  };
  const newColumns = (e: any) => {
    const newobj: any = {};
    Object.keys(e).forEach((key: any) => {
      newobj[`Earned ${key}`] = e[key];
    });

    return newobj;
  };

  const onDownloadExcel = () => {
    setexportloading(true);

    getReportsData(
      `payslip_reports`,
      'mis_reports',
      'htssuite',
      JSON.stringify(selectedFilter)
    ).then((items:any) => {
      const records = items?.data || items
      // setallrecords(items?.data || items);
      const newallrecords = records.map((e: any) => {
        const d: any = e?.payslip_data?.earnings;
        return {
          ...e,
          payslip_data: {
            ...e?.payslip_data,
            // earnings: newColumns(d),
          },
        };
      });
  //     const formatExcelData = newallrecords.map((item: any) => ({
  //       'Employee Id': item['employee_name'],
  //       'Emp Code': String(item['employee_name']).slice(-4),
  //       'Employee Name': item['full_name'],
  //       'Father or Husband Name': item['fathershusbands_name'],
  //       Department: item['department_name'],
  //       Designation: item['designation'],
  //      'Date of Joining': moment((item['date_of_joining'])).format("DD/MM/YYYY"),
  //       'Work Location': item['location_name'],
  //       UAN: item['uan_number'],
  //       'Present Days': item['present_days'],
  //       'Total Days': item['total_days'],
  //       'Earned Days': item['earned_days'],
  //       'Leave Applied': item['leave_applied'],
  //       ...item['leave_balance'],
  //       'Bank Name': item['payslip_data']['bank_details']?.bank_name,
  //       'Bank Account': item['payslip_data']['bank_details']?.account_number,
  //       'Actual Basic': item['payslip_data']?.actuals['Basic'] || 0,
  //       // 'Actual Special Incentive':
  //       //   item['payslip_data']?.actuals['Special Incentive'],
  //       // 'Actual Gross':
  //       //   parseInt(item['payslip_data']['total_actuals']) -
  //       //   parseInt(item['payslip_data']?.actuals['Over Time'] || 0),
  //       'Actual Over Time': item['payslip_data']?.actuals['Over Time'] || 0,
  //       'Actual HRA': item['payslip_data']?.actuals['HRA'] || 0,
  //       'Actual Conveyance': item['payslip_data']?.actuals['Conveyance'] || 0,
  //       'Actual Child Education Allowance':
  //         item['payslip_data']?.actuals['Child Education Allowance'] || 0,
  //       'Actual Medical Allowance':
  //         item['payslip_data']?.actuals['Medical Allowance'] || 0,
  //           'Actual Special Incentive':
  //         item['payslip_data']?.actuals['Special Incentive'] || 0,
  // 'Total Actual':
  //         parseInt(item['payslip_data']['total_actuals']) -
  //         parseInt(item['payslip_data']?.actuals['Over Time'] || 0),
  //       // "Actiual BASIC",
  //       // 	HRA	SPECIAL INCENTIVE	MEDICAL ALLOWANCE	CONVEYANCE	CHILD EDUCATION ALLOWANCE
  //       // ...item['payslip_data']?.actuals,
  //       // Overtime: item['payslip_data']?.actuals['Over Time'],
  //       // 'Actual Gross Payable': item['payslip_data']['total_actuals'],
  //       'Earned Basic': item['payslip_data']?.earnings['Basic'] || 0,
  //       // 'Earned Special Incentive':
  //       //   item['payslip_data']?.earnings['Special Incentive'],
  //       // 'Earned Gross': parseInt(item['payslip_data']?.earnings['Basic'] || 0) 
  //       //   + parseInt(item['payslip_data']?.earnings['Special Incentive'] || 0) 
  //       //   + parseInt(item['payslip_data']?.earnings['HRA'] || 0) 
  //       //   + parseInt(item['payslip_data']?.earnings['Medical Allowance'] || 0) 
  //       //   + parseInt(item['payslip_data']?.earnings['Conveyance'] || 0) + parseInt(item['payslip_data']?.earnings['Child Education Allowance'] || 0),
  //       'Earned Over Time': item['payslip_data']?.earnings['Over Time'] || 0,
  //       'Earned HRA': item['payslip_data']?.earnings['HRA'] || 0,
  //       'Earned Conveyance': item['payslip_data']?.earnings['Conveyance'] || 0,
  //       'Earned Child Education Allowance':
  //         item['payslip_data']?.earnings['Child Education Allowance'] || 0,
  //       'Earned Medical Allowance':
  //         item['payslip_data']?.earnings['Medical Allowance'] || 0,
  //           'Earned Special Incentive':
  //         item['payslip_data']?.earnings['Special Incentive'] || 0,
  
  //       OT: item['payslip_data']?.earnings['OT'] || 0,
  //       WOP: item['payslip_data']?.earnings['WOP'] || 0,
  //       GWA: item['payslip_data']?.earnings['GWA'] || 0,
  //       'Other Allowances': item['payslip_data']?.earnings['Other Allowances'] || 0,
  //       LTA: item['payslip_data']?.earnings['LTA'] || 0,
  //       Gratuity: item['payslip_data']?.earnings['Gratuity'] || 0,
  //       Bonus: item['payslip_data']?.earnings['Bonus'] || 0,
  //       Arrears: item['payslip_data']?.earnings['Arrears'] || 0,
  
  //       // 'Actual Basic': item['payslip_data']?.actuals['Basic'],
  //       // 'Actual Over Time': item['payslip_data']?.actuals['Over Time'],
  //       // 'Actual Special Incentive':
  //       //   item['payslip_data']?.actuals['Special Incentive'],
  //       // 'Basic Earnings': item['payslip_data'].earnings['Basic'],
  //       // 'Over Time Earnings': item['payslip_data'].earnings['Over Time'],
  //       // 'Special Incentive Earnings':
  //       //   item['payslip_data'].earnings['Special Incentive'],
  //       // 'Total Earnings': item['payslip_data']['total_earnings'],
  //       // HRA: item['hra'],
  //       // ...item['payslip_data'].earnings,s
  //       // 'Earned Stock Allowance':
  //       //   item['payslip_data']?.earnings['Earned Stock Allowance'],
  //       // 'Earned Overtime': item['payslip_data']?.earnings['Earned Over Time'],
  //       'Total Earnings': item['payslip_data']['total_earnings'],
  
  //       EPF: item['payslip_data']?.deductions['EPF'] || 0,
  //       ESI: item['payslip_data']?.deductions['ESI'] || 0,
  //       PT: item['payslip_data']?.deductions['PT'] || 0,
  //       IT: item['payslip_data']?.deductions['IT'] || 0,
  //       'CVR Maintainance': item['payslip_data']?.deductions['CVR Maintainance'] || 0,
  //       'Other Deductions': item['payslip_data']?.deductions['Other Deductions'] || 0,
  //       'Total Deductions': item['payslip_data']['total_deductions'] || 0,
  //       'Net Payable': `${item['net_salary']}`,
  //     }));

  const formatExcelData = newallrecords.map((item: any) => ({
    'Employee Id': item['employee_name'],
    'Employee Name': item['full_name'],
    'Father or Husband Name': item['fathershusbands_name'],
    Department: item['department_name'],
    Designation: item['designation'],
    'Date of Joining': moment((item['date_of_joining'])).format("DD/MM/YYYY"),
    'Work Location': item['location_name'],
    UAN: item['uan_number'],
    'Present Days': item['present_days'],
    'Total Days': item['total_days'],
    'Earned Days': item['earned_days'],
    'Leave Applied': item['leave_applied'],
    ...item['leave_balance'],
    'Bank Name': item['payslip_data']['bank_details']?.bank_name,
    'Bank Account': item['payslip_data']['bank_details']?.account_number,
    'Actual Basic': item['payslip_data']?.actuals['Basic'] || 0,
    'Actual Special Incentive':
      item['payslip_data']?.actuals['Special Incentive'] || 0,
    'Actual Gross':
      parseInt(item['payslip_data']['total_actuals']) -
      parseInt(item['payslip_data']?.actuals['Over Time'] || 0),
    'Actual Over Time': item['payslip_data']?.actuals['Over Time'] || 0,
    'Actual HRA': item['payslip_data']?.actuals['HRA'] || 0,
    'Actual Conveyance': item['payslip_data']?.actuals['Conveyance'] || 0,
    'Actual Child Education Allowance':
      item['payslip_data']?.actuals['Child Education Allowance'] || 0,
    'Actual Medical Allowance':
      item['payslip_data']?.actuals['Medical Allowance'] || 0,

    // "Actiual BASIC",
    // 	HRA	SPECIAL INCENTIVE	MEDICAL ALLOWANCE	CONVEYANCE	CHILD EDUCATION ALLOWANCE
    // ...item['payslip_data']?.actuals,
    // Overtime: item['payslip_data']?.actuals['Over Time'],
    'Actual Gross Payable': item['payslip_data']['total_actuals'] || 0,
    'Earned Basic': item['payslip_data']?.earnings['Basic'] || 0,
    'Earned Special Incentive':
      item['payslip_data']?.earnings['Special Incentive'] || 0,
    'Earned Gross': parseInt(item['payslip_data']?.earnings['Basic'] || 0) 
      + parseInt(item['payslip_data']?.earnings['Special Incentive'] || 0) 
      + parseInt(item['payslip_data']?.earnings['HRA'] || 0) 
      + parseInt(item['payslip_data']?.earnings['Medical Allowance'] || 0) 
      + parseInt(item['payslip_data']?.earnings['Conveyance'] || 0) + parseInt(item['payslip_data']?.earnings['Child Education Allowance'] || 0),
    'Earned Over Time': item['payslip_data']?.earnings['Over Time'] || 0,
    'Earned HRA': item['payslip_data']?.earnings['HRA'] || 0,
    'Earned Conveyance': item['payslip_data']?.earnings['Conveyance'] || 0,
    'Earned Child Education Allowance':
      item['payslip_data']?.earnings['Child Education Allowance'] || 0,
    'Earned Medical Allowance':
      item['payslip_data']?.earnings['Medical Allowance'] || 0,

    // OT: item['payslip_data']?.earnings['OT'] || 0,
    WOP: item['payslip_data']?.earnings['WOP'] || 0,
    GWA: item['payslip_data']?.earnings['GWA'] || 0,
    'Other Allowances': item['payslip_data']?.earnings['Other Allowances'] || 0,
    LTA: item['payslip_data']?.earnings['LTA'] || 0,
    Gratuity: item['payslip_data']?.earnings['Gratuity'] || 0,
    Bonus: item['payslip_data']?.earnings['Bonus'] || 0,
    Arrears: item['payslip_data']?.earnings['Arrears'] || 0,

    // 'Actual Basic': item['payslip_data']?.actuals['Basic'],
    // 'Actual Over Time': item['payslip_data']?.actuals['Over Time'],
    // 'Actual Special Incentive':
    //   item['payslip_data']?.actuals['Special Incentive'],
    // 'Basic Earnings': item['payslip_data'].earnings['Basic'],
    // 'Over Time Earnings': item['payslip_data'].earnings['Over Time'],
    // 'Special Incentive Earnings':
    //   item['payslip_data'].earnings['Special Incentive'],
    // 'Total Earnings': item['payslip_data']['total_earnings'],
    // HRA: item['hra'],
    // ...item['payslip_data'].earnings,s
    // 'Earned Stock Allowance':
    //   item['payslip_data']?.earnings['Earned Stock Allowance'],
    // 'Earned Overtime': item['payslip_data']?.earnings['Earned Over Time'],
    'Earned Gross Payable': item['payslip_data']['total_earnings'] || 0,

    EPF: item['payslip_data']?.deductions['EPF'] || 0,
    ESI: item['payslip_data']?.deductions['ESI'] || 0,
    PT: item['payslip_data']?.deductions['PT'] || 0,
    IT: item['payslip_data']?.deductions['IT'] || 0,
    'CVR Maintainance': item['payslip_data']?.deductions['CVR Maintainance'] || 0,
    'Other Deductions': item['payslip_data']?.deductions['Other Deductions'] || 0,
    'Total Deductions': item['payslip_data']['total_deductions'] || 0,
    'Net Payable': Number(item['net_salary'] || 0),
  }));






      handleExportforMisreports(
        formatExcelData,
        'Pay Register',
        `Payslip Report for the ${selectedFilter?.month || ''}`
      );
      setexportloading(false);
    });
   

    // setexportloading(false);
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
      <div id="payslip_id" style={{ position: 'absolute', left: '-9999px' }}>
        <PayslipTemplate data={tableData} />
      </div>
      <Modal
        isModalOpen={filePerview?.isOpen}
        footer={null}
        width="70%"
        handleCancel={() =>
          setfilePerview({
            ...filePerview,
            isOpen: false,
          })
        }
      >
        <div>
          {filePerview?.fileUrl && (
            <embed
              src={`${filePerview?.fileUrl}`}
              style={{ width: '100%', height: '70vh' }}
            />
          )}
        </div>
      </Modal>

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
        showDownloadPaySlip={true} //not needed only pass when false
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
