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
  getDateRange,
} from '../../../../../libs/common/utils/common';
import Table from '../../../../../libs/common/ui/Table/SmnlTable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Cookies from 'universal-cookie';
import SmnlTable from '../../../../../libs/common/ui/Table/SmnlTable';

const formData: any = [
  //   {
  //     datatype: 'DateRange',
  //     name: 'daterange',
  //     isReq: false,
  //     colSpan: 3,
  //     options: 'past',
  //     // placeholder: 'From date',
  //   },
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
  const [total, setTotal] = useState<any>('0.00');
  const [exportloading, setexportloading] = useState<any>(false);
  const [allrecords, setallrecords] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>();
  // getDateRange('rangePicker')
  const { filter, updateFilter } = useContext<any>(FilterContext);
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });
  const pageData = {
    pageTitle: 'Stock Reconciliation Report',
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
      `reconciliation_report?page=${current_page}&page_length=${page_length}`,
      'inventory_mis_reports',
      'htsinventory',
      payload
    ).then((items) => {
      const columns = [
        {
          title: 'reconciliation ID',
          key: 'name',
          dataIndex: 'name',
          //  width: 180,
        },
        {
          title: 'date',
          key: 'date',
          dataIndex: 'date',
          //  width: 250,
        },
        {
          title: 'status',
          key: 'status',
          dataIndex: 'status',
          //  width: 100,
        },
        {
          title: 'reconciliation amount',
          key: 'reconciliation_amount',
          dataIndex: 'reconciliation_amount',
          //   width: 100,
        },
      ];
      setColumnsData(columns);
      setPaginationData({
        ...paginationData,
        total_records: items?.total_count,
      });
      setTableData(items?.data || []);
      setTotal(items?.total_reconciliation_amount || 0);
      setloading(false);
    });
  };
  useEffect(() => {
    setexportloading(true);
    setloading(true);
    reportFunc(
      JSON.stringify(selectedFilter),
      paginationData?.current_page || 1,
      paginationData?.page_length || 5
    );
    getInventoryReports(
      `reconciliation_report`,
      'inventory_mis_reports',
      'htsinventory'
      // JSON.stringify(selectedFilter)
    ).then((items) => {
      setallrecords(items?.data || items);
      items?.data && setexportloading(false);
    });
  }, [selectedFilter]);

  const updateSelectionHandler = (Object: object) => {
    // setSelectionObject(Object);
  };

  const onHandleCloseHandler = () => {
    updateFilter(false);
  };

  const onHandleFilterHandler = (key: any, value: any) => {
    updateFilter(false);
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
          daterange: null,
        });
      }
      return;
    }

    setSelectedFilter({ ...selectedFilter, [key]: val });
  };

  const onDownloadExcel = () => {
    let data: any = [];
    allrecords?.map((item: any) => {
      item?.products?.map((i: any) => {
        data.push({ ...i, ...item, productNo: i?.name });
      });
    });
    const mapedData = data?.map((item: any) => ({
      'reconciliation ID': item?.name,
      date: item?.date,
      'reconciliation amount': item?.reconciliation_amount,
      Status: item?.status,
      'reconciliation Product N0': item?.productNo,
      Product: item?.part?.name,
      price: item?.price,
      'available qty': item?.available_qty,
      required_qty: item?.required_qty,
      net_amount: item?.net_amount,
    }));
    handleExportInventory(
      mapedData,
      'Reconciliation Report',
      'Reconciliation Report'
    );
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
          'Supplier Purchase Report',
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

        pdf.save('SupplierPurchaseReport.pdf');
      },
    });
  };
  const onHandlePagination = (current_page: number, page_length: number) => {
    setPaginationData({
      ...paginationData,
      current_page: current_page,
      page_length: page_length,
    });
    reportFunc(JSON.stringify(selectedFilter), current_page, page_length);
  };
  const expandedRowRender = (e: any) => {
    const columns = [
      {
        title: 'Product No',
        key: 'name',
        dataIndex: 'name',
        //  description: { sortType: 'char' },
        render: (_: any, record: any) => record?.part?.id,
      },
      {
        title: 'Product',
        key: 'part',
        dataIndex: 'part',
        //  description: { sortType: 'char' },
        render: (_: any, record: any) => record?.part?.name,
      },
      {
        title: 'price',
        key: 'price',
        dataIndex: 'price',
        // description: { sortType: 'int' },

        // render: (_: any, record: any) => record?.employee_data?.location_name,
      },

      {
        title: 'Damaged / Lost qty',
        key: 'required_qty',
        dataIndex: 'required_qty',
        // description: { sortType: 'int' },

        // render: (_: any, record: any) => record?.employee_data?.location_name,
      },
      {
        title: 'gst (%)',
        key: 'gst',
        dataIndex: 'gst',
        // description: { sortType: 'int' },

        render: (_: any, record: any) => `${record?.gst}`,
      },
      {
        title: 'net amount',
        key: 'net_amount',
        dataIndex: 'net_amount',
        // description: { sortType: 'int' },

        // render: (_: any, record: any) => record?.employee_data?.location_name,
      },
      //   {
      //     title: 'rate',
      //     key: 'rate',
      //     dataIndex: 'rate',
      //     // description: { sortType: 'int' },

      //     // render: (_: any, record: any) => record?.employee_data?.location_name,
      //   },
    ];
    // console.log("nest columns",nestedcolumns)
    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <SmnlTable column={columns} dataSource={e?.products || []} />
      </div>
    );
  };
  return (
    <div>
      <div style={{ visibility: 'hidden', height: 0 }} id="payslip"></div>
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
        showFilters={false}
        downloadExcel={onDownloadExcel}
        downloadPdf={onDownloadPdf}
        expandable={{
          expandedRowRender,
          rowExpandable: (record: any) => record.expandable !== false,
        }}
        totalRecords={paginationData?.total_records}
        onChangePaginationFn={onHandlePagination}
        disableExcel={exportloading}
        footer={() => {
          return (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  columnGap: '8px',
                }}
              >
                <strong>Rs. {total} </strong>
                <strong>Total Reconciliation Cost : </strong>
              </div>
            </>
          );
        }}
      />
    </div>
  );
};

export default View;
