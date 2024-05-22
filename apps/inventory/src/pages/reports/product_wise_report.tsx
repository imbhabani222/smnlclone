import React, { useState, useEffect, useContext } from 'react';
import { getInventoryReports } from '../../../../../libs/common/api/doctype';
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

// import {
//   ledgerColumntype1,
//   ledgerSearchIndexex,
// } from '../../accountManagement/helper';

const formData = [
  {
    // label: 'Supplier',
    datatype: 'LinkSearch',
    // label: 'Supplier',
    name: 'product',
    options: 'Inventory Product Master',
    colSpan: 6,
    placeholder: 'Product',
    description: {
      linkfield: 'part_name',
      modulename: 'inventory_product_configuration',
      showActive: 'true',
      appname: 'htsinventory',
      filter: true,
    },
  },
  {
    datatype: 'Date',
    name: 'from_date',
    isReq: false,
    // description: undefined,
    colSpan: 6,
    placeholder: 'From date', // Add this line to set the placeholder
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
    pageTitle: 'Product Wise Report',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Download PDF',
    tableHeight: 250,
  };

  useEffect(() => {
    // if(selectedFilter?.month && selectedFilter?.year) {
    setloading(true);
    const payload = selectedFilter;

    getInventoryReports(
      'product_wise_reports',
      'inventory_mis_reports',
      'htsinventory',
      JSON.stringify(payload)
    ).then((items) => {
      console.log(items);
      let columns: any = [];
      const tableKeys = [
        'Product Name',
        'Po No',
        'Part No',
        'date',
        'qty',
        'tax',
        'discount',
        'cost',
        'gross',
        'Total Value',
        // 'status',
        // 'order_value',

        // 'Balance'
      ];
      columns = tableKeys.map((item: any) => ({
        title: item,
        key: item.toString().toLowerCase().replace(' ', '_'),
        dataIndex: item.toString().toLowerCase().replace(' ', '_'),
      }));
      const modifiedColumns = columns.map((col: any) => {
        if (
          col.dataIndex === 'credit_note no' &&
          col.key === 'credit_note no'
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

      console.log(items, 'sdfsdfds');
      const modifiedData = items?.table_row?.flatMap((item: any) => {
        return {
          ...item,
          'Product Name': item?.product_name,
          'Part No': item?.part_no,
          'Po No': item?.po_no,
          'Total Value': item?.total_value,
        };
      });

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
  const onDownloadExcel = () => {
    const data = tableData.map((item: any, index: any) => ({
      'Sl No.': index + 1,
      'Product Name': item?.product_name,
      'Po No': item?.po_no,
      'Part No': item?.part_no,
      Date: item?.date,
      Qty: item?.qty,
      Tax: item?.tax,
      Discount: item?.discount,
      Cost: item?.cost,
      Gross: item?.gross,
      'Total Value': item?.total_value,
    }));
    handleExportInventory(data, 'Product Wise Reports','Product Wise Report');
  };
  const onDownloadPdf = () => {
    const rep: any = new jsPDF('landscape', 'pt', 'a4');
    const data = [...tableData];
    const mapedData = data?.map((item: any, index: any) => [
      `${index + 1}`,
      item?.product_name,
      item?.po_no,
      item?.part_no,
      item?.date,
      item?.qty,
      item?.tax,
      item?.discount,
      item?.cost,
      item?.gross,
      item?.total_value,
    ]);

    const columnd = [
      'Sl No.',
      'Product Name',
      'PO No.',
      'Part No',
      'Date',
      'Qty',
      'Tax',
      'Discount',
      'Cost',
      'Gross',
      'Total Value',
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
        rep.text('Product Report', rep.internal.pageSize.width / 2, 145, {
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
        pdf.save('ProductReport.pdf');
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
