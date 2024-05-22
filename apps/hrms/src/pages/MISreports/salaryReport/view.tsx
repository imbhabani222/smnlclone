import React, { useState, useEffect, useContext } from 'react';
import { getReportsData } from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import { handleExportforMisreports } from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import Report from '../../../../../../libs/common/ui/Report/report';
import autoTable from 'jspdf-autotable';
import { styles, bodyStyle, headerStyles } from '../leaveReports/view';
import jsPDF from 'jspdf';
import { log } from 'node:console';
import { isSuccess } from '../../../../../../libs/common/ui/Message';

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
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const [paginationData, setPaginationData] = useState<any>({
    page_length: 5,
    current_page: 1,
  });

  const pageData = {
    pageTitle: 'Salary History Report',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Download Report',
    tableHeight: 250,
  };

  const reportFn = (
    payload: any,
    current_page: number,
    page_length: number
  ) => {
    setloading(true);
    getReportsData(
      `salary_report?page=${current_page}&page_length=${page_length}`,
      'mis_reports',
      'htssuite',
      payload
    ).then((items) => {
      const tableKeys = [
        'Employee Id',
        'Employee Name',
        'DOJ',
        'Designation',
        'Net Salary',
        'Total Deductions',
        'Total Earnings',
      ];
      const columns = [
        {
          title: 'Employee Id',
          key: 'Employee Id',
          dataIndex: 'employee_id',
          description: { sortType: 'char' },
          // render: (_: any, record: any) => record?.employee_data?.name,
        },
        {
          title: 'Employee Name',
          key: 'Employee Name',
          dataIndex: 'employee_name',
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
          title: 'DOJ',
          key: 'DOJ',
          dataIndex: 'doj',
          description: { sortType: 'char' },

          //  / render: (_: any, record: any) => record?.employee_data?.location_name,
        },
        {
          title: 'Total Deductions',
          key: 'total_deductions',
          dataIndex: 'total_deductions',
          description: { sortType: 'int' },

          //  / render: (_: any, record: any) => record?.employee_data?.location_name,
        },
        {
          title: 'Total Earnings',
          key: 'totalearnings',
          dataIndex: 'totalearnings',
          description: { sortType: 'int' },

          //  / render: (_: any, record: any) => record?.employee_data?.location_name,
        },
        {
          title: 'Net Salary',
          key: 'net_salary',
          dataIndex: 'net_salary',
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
      setloading(false);
    });
  };

  useEffect(() => {
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
    //  handleExport(tableData);
  };

  const onHandleChangeFilterHandler = (value: any, key: string) => {
    setSelectedFilter({ ...selectedFilter, [key]: value });
  };

  const onDownloadExcel = () => {
    const formatedExcelData = tableData.map((item: any) => ({
      Month: item['month'],
      Year: item['year'],
      'Employee Id': item['employee_id'],
      'Employee Name': item['employee_name'],
      Designation: item['designation'],
      DOJ: item['doj'],
      'Net Salary': item['net_salary'],
      ...item.deductions,
      ...item.earnings,
      'Total Earnings': item['totalearnings'],
      'Total Deductions': item['total_deductions'],
    }));

    handleExportforMisreports(
      formatedExcelData,
      'Salary Report',
      `Salary Report`
    );
  };
  const onDownloadPdf = () => {
    const rep: any = new jsPDF('p', 'pt', 'a4');
    console.log(tableData,"tabled");
    if (!tableData) {
      isSuccess("No salary data for this employee","error")
    }else{
      const data = [...tableData];  
      console.log(data,"datta");
        
      const mapedData = data?.map((item: any, index: any) => [
        `${index + 1}`,
        item?.employee_id,
        item?.employee_name,
        item?.doj,
        item?.designation,
        item?.net_salary,
        item?.total_deductions,
        item?.totalearnings,
      ]);    
      const columnd = [
        'Sl.NO',
        'Employee Id',
        'Employee Name',
        'DOJ',
        'Designation',
        'Net Salary',
        'Total Deductions',
        'Total Earnings',
      ];
      rep.html(document.querySelector('#payslip_id'), {
        callback: function (pdf: any) {
          rep.setFontSize(12);
          rep.setTextColor('#00000');
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
          rep.text('Salary Report', 250, 55);
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
          pdf.save('salaryreport.pdf');
        },
      });
    }
    
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
      />
    </div>
  );
};

export default View;
