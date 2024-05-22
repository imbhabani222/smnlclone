import React, { useState, useEffect, useContext } from 'react';
import { getSectionWiseReport } from '../../../../../libs/common/api/doctype';
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
import Table from '../../../../../libs/common/ui/Table/SmnlTable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// import {
//   ledgerColumntype1,
//   ledgerSearchIndexex,
// } from '../../accountManagement/helper';

const formData = [
  // {
  //   datatype: 'LinkSearch',
  //   // label: 'Supplier',
  //   name: 'supplier',
  //   options: 'Inventory Supplier Details',
  //   colSpan: 6,
  //   description: {
  //     linkfield: 'supplier_name',
  //     modulename: 'inventory_general_setup',
  //     showActive: 'true',
  //     appname: 'htsinventory',
  //     filter: true,
  //   },
  // },
 {
  datatype: 'Link',
  name: "section",
    placeholder:"Select Section",
		options: "Section",
		description: {linkfield: "section_name", modulename:"master_data","appname": "htssuite",showActive:true}
	},
  {
    datatype: 'Date',
    name: 'from_date',
    isReq: false,
    // description: undefined,
    colSpan: 6,
    placeholder: 'From date',
  },
  {
    datatype: 'Date',
    name: 'to_date',
    isReq: false,
    // description: undefined,
    colSpan: 6,
    placeholder: 'To date',
    //
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
    pageTitle: 'Section Wise Report',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Download PDF',
    tableHeight: 250,
  };

  useEffect(() => {
    // if(selectedFilter?.month && selectedFilter?.year) {
    setloading(true);
    const payload = selectedFilter;

    getSectionWiseReport(
      'section_wise_reports',
      'inventory_mis_reports',
      'htsinventory',
      JSON.stringify(payload)
    ).then((items) => {
      console.log(items);
      let columns: any = [];
      const tableKeys = ['date', 'section', 'Job Card No', 'Supervisor'];
      columns = tableKeys.map((item: any) => ({
        title: item,
        key: item.toString().toLowerCase().replace(' ', '_'),
        dataIndex: item.toString().toLowerCase().replaceAll(' ', '_'),
      }));

      const modifiedColumns = columns.map((col: any) => {
        if (
          col.dataIndex === 'credit_note_no' &&
          col.key === 'credit_note_no'
        ) {
          return {
            ...col,
            key: 'name',
            dataIndex: 'name',
          };
        }
        return col;
      });

      //   const md = getModifiedData1(items,pageData?.pageTitle)
      // here we need to add amount for contra voucher

      const modifiedData = items?.map((item: any) => item);

      setColumnsData(modifiedColumns);
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
    } else if (key == 'to_date') {
      const date: any = dateFormat(value);
      val = date;
    }
    setSelectedFilter({ ...selectedFilter, [key]: val });
  };

  const expandedRowRender = (e: any) => {
    console.log(e?.month_wise, 'eee');
    const nestedcolumns = [
      {
        title: 'Part',
        key: 'part',
        dataIndex: 'part',
      },
      {
        title: 'UOM',
        key: 'uom',
        dataIndex: 'uom',
      },
      {
        title: 'Required Qty',
        key: 'required_qty',
        dataIndex: 'required_qty',
      },
    ];

    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={nestedcolumns} dataSource={e?.part_request.flat()} />
      </div>
    );
  };
  const onDownloadExcel = () => {
    const data = tableData.map((item: any, index: any) => ({
      'Sl No.': index + 1,
      Date: item?.date,
      Section: item?.section,
      'Job Card No': item?.job_card_no,
      Supervisor: item?.supervisor,
    }));
    handleExportInventory(data, 'Section Wise Reports','Section Wise Report');
  };
  const onDownloadPdf = () => {
    const rep: any = new jsPDF('p', 'pt', 'a4');
    const data = [...tableData];
    const mapedData = data?.map((item: any, index: any) => [
      `${index + 1}`,
      item?.date,
      item?.section,
      item?.job_card_no,
      item?.supervisor,
    ]);

    const columnd = ['Sl No.', 'Date', 'Section', 'Job Card No', 'Supervisor'];
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
        rep.text('Section Wise Report', rep.internal.pageSize.width / 2, 145, {
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
        pdf.save('SectionWiseReport.pdf');
      },
    });
  };

  return (
    <div>
      <div style={{ visibility: 'hidden', height: 0 }} id="payslip">
        <div id="payslip_id"></div>{' '}
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
        expandable={{ expandedRowRender }}
        downloadExcel={onDownloadExcel}
        downloadPdf={onDownloadPdf}
      />
    </div>
  );
};

export default View;
