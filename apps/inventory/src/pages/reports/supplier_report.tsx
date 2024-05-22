import React, { useState, useEffect, useContext } from 'react';
import { getInventoryReports } from '../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../libs/common/context/filtercontext';
import handleExport from '../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import { handleExportInventory } from '../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import dayjs from 'dayjs';
import Report from '../../../../../libs/common/ui/Report/report';
import {
  dateFormat,
  datetoFrom,
  getDateRange,
} from '../../../../../libs/common/utils/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import SmnlTable from '../../../../../libs/common/ui/Table/SmnlTable';
import Cookies from 'universal-cookie';
// import {
//   ledgerColumntype1,
//   ledgerSearchIndexex,
// } from '../../accountManagement/helper';

const formData = [
  {
    datatype: 'DateRange',
    name: 'daterange',
    isReq: false,
    colSpan: 4,
    options: 'past',
    // placeholder: 'From date',
  },
  {
    datatype: 'Data',
    name: 'Search of Name of Supplier or id',
    isReq: false,
    colSpan: 4,
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
  const [selectedFilter, setSelectedFilter] = useState<any>(
    getDateRange('rangePicker')
  );
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [exportloading, setexportloading] = useState<any>(false);
  const [allrecords, setallrecords] = useState<any>([]);
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });
  const pageData = {
    pageTitle: 'Supplier Wise Report',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Download PDF',
    tableHeight: 250,
  };
  const reportFunc = (
    payload: any,
    current_page: number,
    page_length: number
  ) => {
    getInventoryReports(
      `supplier_wise_report`,
      'inventory_mis_reports',
      'htsinventory',
      payload
    ).then((items) => {
      const columns = [
        {
          title: 'Supplier Id',
          key: 'supplier_id',
          dataIndex: 'supplier_id',
          description: { sortType: 'char' },
          // render: (_: any, record: any) => record?.employee_data?.name,
        },
        {
          title: 'Supplier Name',
          key: 'supplier_name',
          dataIndex: 'supplier_name',
          description: { sortType: 'char' },
          // render: (_: any, record: any) => record?.employee_data?.full_name,
        },
        {
          title: 'Product Value',
          key: 'product_val',
          dataIndex: 'product_val',
          description: { sortType: 'int' },
        },
        {
          title: 'Discount Value',
          key: 'discount_val',
          dataIndex: 'discount_val',
          description: { sortType: 'int' },

          //  / render: (_: any, record: any) => record?.employee_data?.location_name,
        },
        {
          title: 'Tax Value',
          key: 'tax_value',
          dataIndex: 'tax_value',
          description: { sortType: 'int' },

          //  / render: (_: any, record: any) => record?.employee_data?.location_name,
        },
        {
          title: 'Net Value',
          key: 'net_val',
          dataIndex: 'net_val',
          description: { sortType: 'int' },

          //  / render: (_: any, record: any) => record?.employee_data?.location_name,
        },
      ];

      setColumnsData(columns);
      setTableData(items?.data || []);
      setloading(false);
    });
  };
  useEffect(() => {
    // if(selectedFilter?.month && selectedFilter?.year) {
    setexportloading(true);
    setloading(true);
    reportFunc(
      JSON.stringify({ ...selectedFilter, daterange: undefined }),
      paginationData?.current_page || 1,
      paginationData?.page_length || 5
    );
    getInventoryReports(
      `supplier_wise_report`,
      'inventory_mis_reports',
      'htsinventory'
      // JSON.stringify(selectedFilter)
    ).then((items) => {
      setallrecords(items?.data || items);
      items?.data && setexportloading(false);
    });
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

  const onFilterClickHandler = () => {
    handleExportInventory(tableData);
  };

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
          daterange: undefined,
        });
      }
      return;
    }
    setSelectedFilter({ ...selectedFilter, [key]: val });
  };
  const onDownloadExcel = () => {
    const data = tableData.map((item: any, index: any) => ({
      'Sl No.': index + 1,
      'Po No': item?.po_no,
      Supplier: item?.supplier,
      Date: item?.date,
      'Product Value': item?.product_value,
      Tax: item?.tax,
      Status: item?.status,
      'Order Value': item?.order_value,
    }));
    handleExportInventory(
      data,
      'Supplier Wise Reports',
      'Supplier Wise Report'
    );
  };
  const onDownloadPdf = () => {
    const rep: any = new jsPDF('landscape', 'pt', 'a4');
    const data = [...tableData];
    const mapedData = data?.map((item: any, index: any) => [
      `${index + 1}`,
      item?.po_no,
      item?.supplier,
      item?.date,
      item?.product_value,
      item?.tax,
      item?.status,
      item?.order_value,
    ]);

    const columnd = [
      'Sl No.',
      'PO No.',
      'Supplier',
      'Date',
      'Product Value',
      'Tax',
      'Status',
      'Order Value',
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
        rep.text('Supplier Report', rep.internal.pageSize.width / 2, 145, {
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
        pdf.save('SupplierReport.pdf');
      },
    });
  };
  const expandedRowRender = (e: any) => {
    const columns = [
      {
        title: 'Brand',
        key: 'brand_name',
        dataIndex: 'brand_name',
        description: { sortType: 'char' },
        // render: (_: any, record: any) => record?.employee_data?.full_name,
      },
      {
        title: 'Product',
        key: 'part_name',
        dataIndex: 'part_name',
        description: { sortType: 'char' },
      },
      {
        title: 'UOM',
        key: 'uom_name',
        dataIndex: 'uom_name',
        description: { sortType: 'char' },
      },
      {
        title: 'Product MRP',
        key: 'price',
        dataIndex: 'price',
        description: { sortType: 'int' },

        //  / render: (_: any, record: any) => record?.employee_data?.location_name,
      },
      {
        title: 'Order Quantity',
        key: 'order_qunty',
        dataIndex: 'order_qunty',
        description: { sortType: 'int' },

        //  / render: (_: any, record: any) => record?.employee_data?.location_name,
      },
      {
        title: 'Discount',
        key: 'discount_value',
        dataIndex: 'discount_value',
        description: { sortType: 'int' },

        //  / render: (_: any, record: any) => record?.employee_data?.location_name,
      },
      {
        title: 'Tax',
        key: 'tax_value',
        dataIndex: 'tax_value',
        description: { sortType: 'int' },

        //  / render: (_: any, record: any) => record?.employee_data?.location_name,
      },
      {
        title: 'Net',
        key: 'net',
        dataIndex: 'net',
        description: { sortType: 'int' },

        //  / render: (_: any, record: any) => record?.employee_data?.location_name,
      },
    ];
    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <SmnlTable column={columns} dataSource={e?.products || []} />
      </div>
    );
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
        showDownloadPaySlip={false} //not needed only pass when false
        showFilters={true} //not needed only pass when false
        downloadExcel={onDownloadExcel}
        downloadPdf={onDownloadPdf}
        expandable={{
          expandedRowRender,
          rowExpandable: (record: any) => record.expandable !== false,
        }}
      />
    </div>
  );
};

export default View;
