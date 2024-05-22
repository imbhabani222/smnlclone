import React, { useState, useEffect, useContext } from 'react';
import { getInventoryReports } from '../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../libs/common/context/filtercontext';
import { handleExportInventory } from '../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
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
import Cookies from 'universal-cookie';
const formData: any = [
  {
    datatype: 'Select',
    default: undefined,
    description: {},
    hidden: 0,
    // isReq: true,
    placeholder: 'Financial year',
    name: 'financial_year',
    options: [
      { label: '2021-2022', value: '2021-2022' },
      { label: '2022-2023', value: '2022-2023' },
      { label: '2023-2024', value: '2023-2024' },
      { label: '2024-2025', value: '2024-2025' },
      { label: '2025-2026', value: '2025-2026' },
      { label: '2026-2027', value: '2026-2027' },
      { label: '2027-2028', value: '2027-2028' },
      { label: '2028-2029', value: '2028-2029' },
      { label: '2029-2030', value: '2029-2030' },
    ],
  },
  {
    datatype: 'Select',
    default: undefined,
    description: {},
    hidden: 0,
    // isReq: true,
    placeholder: 'Analysis Type',
    name: 'analysis_type',
    options: [
      { label: 'Bill Value', value: 'bill_value' },
      { label: 'Tax', value: 'taxable_value' },
      { label: 'Items', value: 'items_value' },
      { label: 'Qty', value: 'qty_value' },
    ],
  },
  {
    // label: 'Products',
    name: 'product_id',
    title: ' Products',
    dataIndex: 'part_name',
    key: 'products',
    fieldtype: 'TableSelect',
    datatype: 'TableSelect',
    description: {
      search:
        'inventory_product_configuration.doctype.inventory_product_master.api.search_product?search=',
      linkfield: 'part_name',
      modulename: 'inventory_product_configuration',
      appname: 'htsinventory',
    },
    options: 'Inventory Product Master',
    columns: [
      {
        title: 'Product Name',
        dataIndex: 'part_name',
        key: 'part_name',
      },
      {
        title: 'Product Id',
        dataIndex: 'name',
        key: 'name',
      },
    ],
    searchIndexes: [],
    callOnChange: true,
    colSpan: 3,
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
  const [columnsData, setColumnsData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [exportloading, setexportloading] = useState<any>(false);
  const [allrecords, setallrecords] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [selectedFilter, setSelectedFilter] = useState<any>({
    financial_year: '2023-2024',
    analysis_type: 'bill_value',
  });
  const { filter, updateFilter } = useContext<any>(FilterContext);
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });
  const pageData = {
    pageTitle: 'Product Purchase Analysis Report',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Export to PDF',
    tableHeight: 250,
  };
  const reportFunc = (
    payload: any,
    current_page: number,
    page_length: number
  ) => {
    getInventoryReports(
      `product_purchase_analysis_report?page=${current_page}&page_length=${page_length}`,
      'inventory_mis_reports',
      'htsinventory',
      payload
    ).then((items) => {
      const columns = [
        {
          title: 'Product ID',
          key: 'product_id',
          dataIndex: 'product_id',
          width: 180,
          fixed: 'left',
        },
        {
          title: 'Product',
          key: 'product_name',
          dataIndex: 'product_name',
          width: 250,
          fixed: 'left',
        },
        {
          title: 'april',
          key: 'april',
          dataIndex: 'april',
          width: 100,
        },
        {
          title: 'may',
          key: 'may',
          dataIndex: 'may',
          width: 100,
        },
        {
          title: 'june',
          key: 'june',
          dataIndex: 'june',
          width: 100,
        },
        {
          title: 'july',
          key: 'july',
          dataIndex: 'july',
          width: 100,
        },
        {
          title: 'august',
          key: 'august',
          dataIndex: 'august',
          width: 100,
        },
        {
          title: 'september',
          key: 'september',
          dataIndex: 'september',
          width: 110,
        },
        {
          title: 'october',
          key: 'october',
          dataIndex: 'october',
          width: 100,
        },
        {
          title: 'november',
          key: 'november',
          dataIndex: 'november',
          width: 100,
        },
        {
          title: 'december',
          key: 'december',
          dataIndex: 'december',
          width: 100,
        },
        {
          title: 'January',
          key: 'january',
          dataIndex: 'january',
          width: 100,
        },
        {
          title: 'february',
          key: 'february',
          dataIndex: 'february',
          width: 100,
        },
        {
          title: 'march',
          key: 'march',
          dataIndex: 'march',
          width: 100,
        },
        {
          title: 'Total',
          key: 'total_value',
          dataIndex: 'total_value',
          width: 100,
          fixed: 'right',
        },
      ];
      setColumnsData(columns);
      setPaginationData({
        ...paginationData,
        total_records: items?.total_records,
      });
      setTableData(items?.data || []);
      setloading(false);
    });
  };
  useEffect(() => {
    // setloading(true);
    if (selectedFilter?.financial_year && selectedFilter?.analysis_type) {
      setexportloading(true);
      setloading(true);
      reportFunc(
        JSON.stringify(selectedFilter),
        paginationData?.current_page || 1,
        paginationData?.page_length || 5
      );
      getInventoryReports(
        `product_purchase_analysis_report`,
        'inventory_mis_reports',
        'htsinventory',
        JSON.stringify(selectedFilter)
      ).then((items) => {
        setallrecords(items?.data || items);
        setexportloading(false);
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
  // const onFilterClickHandler = () => {
  //   handleExportSupplierWisePurchase(tableData);
  // };
  const onHandleChangeFilterHandler = (value: any, key: string) => {
    let val = value;
    if (key === 'daterange') {
      if (val) {
        const formdate: any = dateFormat(value[0]?.$d);
        const todate: any = dateFormat(value[1]?.$d);
        setSelectedFilter({
          ...selectedFilter,
          to_date: todate,
          from_date: formdate,
          daterange: val,
        });
      } else {
        setSelectedFilter({
          ...selectedFilter,
          to_date: undefined,
          from_date: undefined,
          daterange: null,
        });
      }
      return;
    }
    setSelectedFilter({ ...selectedFilter, [key]: val });
  };
  const onDownloadExcel = () => {
    const data = allrecords.map((item: any, index: any) => {
      return {
        Supplier: item?.supplier_name,
        ['Product ID']: item?.supplier_id,
        Invoice_date: item?.invoice_date,
        april: `${item['april'] || '0.00'}`,
        may: `${item['april'] || '0.00'}`,
        june: `${item['april'] || '0.00'}`,
        july: `${item['april'] || '0.00'}`,
        august: `${item['april'] || '0.00'}`,
        september: `${item['april'] || '0.00'}`,
        october: `${item['april'] || '0.00'}`,
        november: `${item['april'] || '0.00'}`,
        december: `${item['april'] || '0.00'}`,
        january: `${item['april'] || '0.00'}`,
        february: `${item['april'] || '0.00'}`,
        march: item['march'] || '0.00',
        total_value: item?.total_value?.toString(),
      };
    });
    handleExportInventory(
      data,
      'Product Purchase Analysis',
      'Product Purchase Analysis'
    );
  };
  const onHandlePagination = (current_page: number, page_length: number) => {
    setPaginationData({
      ...paginationData,
      current_page: current_page,
      page_length: page_length,
    });
    reportFunc(JSON.stringify(selectedFilter), current_page, page_length);
  };
  const onDownloadPdf = () => {
    const rep: any = new jsPDF('landscape', 'pt', 'a4');
    const data = [...tableData];
    const mapedData = data?.map((item: any, index: any) => {
      const row: any = [`${index + 1}`, item?.supplier];
      // Loop through columnsData to include month-wise data
      columnsData.forEach((column: any) => {
        if (column.key !== 'supplier') {
          const monthName = moment(column.key).format('MMMM');
          row.push(item[column.key] || 0);
        }
      });
      return row;
    });
    const columnd = [
      'Sl No.',
      'Supplier',
      ...columnsData.map((column: any) => moment(column.key).format('MMMM')), // Include month names in the header
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
        rep.text(
          'Product Purchase Report',
          rep.internal.pageSize.width / 2,
          145,
          {
            align: 'center',
          }
        );
        autoTable(rep, {
          theme: 'grid',
          head: [columnd],
          body: mapedData,
          startY: 180,
          styles: styles,
          headStyles: headerStyles,
          bodyStyles: bodyStyle,
        });
        pdf.save('ProductPurchaseReport.pdf');
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
        appname="htsinventory"
        showTable={true}
        pageData={pageData}
        showExportToExcel={true}
        showDownloadPaySlip={false}
        showFilters={true}
        downloadExcel={onDownloadExcel}
        downloadPdf={onDownloadPdf}
        totalRecords={paginationData?.total_records}
        onChangePaginationFn={onHandlePagination}
        disableExcel={exportloading}
      />
    </div>
  );
};
export default View;
