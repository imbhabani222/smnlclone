import React, { useState, useEffect, useContext } from 'react';
import { getJobSummaryReport } from '../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../libs/common/context/filtercontext';
import handleExport from '../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import {handleExportInventory} from '../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import dayjs from 'dayjs';
import Report from '../../../../../libs/common/ui/Report/report';
import {
  dateFormat,
  datetoFrom,
} from '../../../../../libs/common/utils/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { table } from 'console';
// import {
//   ledgerColumntype1,
//   ledgerSearchIndexex,
// } from '../../accountManagement/helper';

const formData:any = [
  // {
  //   datatype: 'Link',
  //   // label: 'Supplier',
  //   name: 'supplier',
  //   options: 'Inventory Supplier Details',
  //   colSpan: 6,
  //   description: {
  //     linkfield: 'supplier_name',
  //     modulename: 'inventory_general_setup',
  //     showActive: 'true',
  //     appname: 'htsinventory',
  //   },
  // },
  // {
  //   datatype: 'Date',
  //   name: 'from_date',
  //   isReq: false,
  //   // description: undefined,
  //   colSpan: 6,
  //   placeholder: 'From date',
  // },
  // {
  //   datatype: 'Date',
  //   name: 'to_date',
  //   isReq: false,
  //   // description: undefined,
  //   colSpan: 6,
  //   placeholder: 'To date',
  //   //
  // },
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
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);

  const pageData = {
    pageTitle: 'Job Card Summary',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Download PDF',
    tableHeight: 250,
  };

  useEffect(() => {
    // if(selectedFilter?.month && selectedFilter?.year) {
    setloading(true);
    const payload = selectedFilter;

    getJobSummaryReport(
      'inventory_job_card_creation',
      'inventory_workshop_management',
      'htsinventory',
      JSON.stringify(payload)
    ).then((items) => {
      console.log(items);
      let columns: any = [];
      const tableKeys = [
        'Job Card No',
        'Vehicle No',
        'Total Part Requests Raised',
        'Total Part Requests Closed',
        'Pending Part Request',
        'amount',
      ];
      columns = tableKeys.map((item: any) => ({
        title: item,
        key: item.toString().toLowerCase().replaceAll(' ', '_'),
        dataIndex: item.toString().toLowerCase().replaceAll(' ', '_'),
      }));

      console.log(columns);
      //   const md = getModifiedData1(items,pageData?.pageTitle)
      // here we need to add amount for contra voucher

      const modifiedData = items?.map((item: any) => {
        return {
          ...item,
          job_card_no: item?.job_card_no,
          amount: item?.total_amount,
          vehicle_no: item?.veichle_no,
          total_part_requests_raised: item?.total_part_raised,
          total_part_requests_closed: item?.total_part_closed,
          pending_part_request: item?.total_pending_parts,
        };
      });

      console.log(modifiedData);
      setColumnsData(columns);
      setTableData(modifiedData || []);
      setloading(false);
    });
    //   }
  }, [selectedFilter]);

  console.log(columnsData, 'columnss');

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

  const onFilterClickHandler = () => {
    handleExportInventory(tableData);
  };

  const onHandleChangeFilterHandler = (value: any, key: string) => {
    let val = value;

    if (key == 'from_date') {
      const date: any = dateFormat(value);
      val = date;
    }
    setSelectedFilter({ ...selectedFilter, [key]: val });
  };
  const onDownloadExcel = () => {
    const data = tableData.map((item: any, index: any) => ({
      'Sl No.': index + 1,
      'Job Card No': item?.job_card_no,
      'Vehicle No': item?.veichle_no,
      'Total Part Requests Raised': item?.total_part_raised,
      'Total Part Requests Closed': item?.total_part_closed,
      'Pending Part Request': item?.total_pending_parts,
      Amount: item?.total_amount,
    }));
    handleExportInventory(data, 'Job Card Reports','Job Card Report');
  };
  const onDownloadPdf = () => {
    const rep: any = new jsPDF('landscape', 'pt', 'a4');
    const data = [...tableData];
    const mapedData = data?.map((item: any, index: any) => [
      `${index + 1}`,
      item?.job_card_no,
      item?.veichle_no,
      item?.total_part_raised,
      item?.total_part_closed,
      item?.total_pending_parts,
      item?.total_amount,
    ]);

    const columnd = [
      'Job Card No',
      'Vehicle No',
      'Total Part Requests Raised',
      'Total Part Requests Closed',
      'Pending Part Request',
      'amount',
    ];
    rep.html(document.querySelector('#payslip_id'), {
      callback: function (pdf: any) {
        rep.setFontSize(18);
        rep.text(
          `C/O Adani Krishnapatnam Port Ltd., Muthukur, Nellore, -524344`,
          rep.internal.pageSize.width / 2,
          100, // Y coordinate
          { align: 'center' }
        );

        rep.setFontSize(28);
        rep.text('Job Card Report', rep.internal.pageSize.width / 2, 145, {
          align: 'center',
        });
        autoTable(rep, {
          theme: 'grid',
          head: [columnd],
          body: mapedData,
          startY: 180,
          styles: styles,
          headStyles: headerStyles,
          bodyStyles: bodyStyle,
        });
        pdf.save('JobCardReport.pdf');
      },
    });
  };

  return (
    <div>
      <div style={{ visibility: 'hidden', height: 0 }} id="payslip">
        <div id="payslip_id"></div>
      </div>
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
        appname="htsinventory"
        showTable={true} //not needed only pass when false
        pageData={pageData}
        showExportToExcel={true} //not needed only pass when false
        showDownloadPaySlip={true} //not needed only pass when false
        showFilters={true} //not needed only pass when false
        downloadExcel={onDownloadExcel}
        downloadPdf={onDownloadPdf}
      />
    </div>
  );
};

export default View;
