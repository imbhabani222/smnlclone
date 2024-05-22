import React, { useState, useEffect, useContext } from 'react';
import {
  getJobCardReport,
  getJobSummaryReport,
} from '../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../libs/common/context/filtercontext';
import handleExport from '../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import { handleExportInventory } from '../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import dayjs from 'dayjs';
import Report from '../../../../../libs/common/ui/Report/report';
import {
  dateFormat,
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

const formData: any = [
  {
    datatype: 'DateRange',
    name: 'daterange',
    isReq: false,
    colSpan: 3,
    options: 'past',
    // placeholder: 'From date',
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
  const [total, setTotal] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>(
    getDateRange('rangePicker')
  );
  //status: 'Approved',
  //  getDateRange()
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const [exportloading, setexportloading] = useState<any>(false);
  const [allrecords, setallrecords] = useState<any>([]);
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });
  const pageData = {
    pageTitle: 'Job Card Report',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Download PDF',
    tableHeight: 250,
  };
  const reportFunc = (
    payload: any,
    current_page: number,
    page_length: number
  ) => {
    getJobCardReport(payload).then((items) => {
      const columns: any = [
        {
          title: 'Job Card No',
          key: 'job_card_no',
          dataIndex: 'job_card_no',
          // render: (_: any, record: any) => record?.employee_name,
        },
        {
          title: 'Job Card Cost',
          key: 'total_job_card_cost',
          dataIndex: 'total_job_card_cost',
          //  render: (_: any, record: any) => record?.leave_type,
          render: (_: any, record: any) => record?.total_job_card_cost?.toFixed(2),
        },

        {
          title: 'veichle no',
          key: 'veichle_no',
          dataIndex: 'veichle_no',
        },
        {
          title: 'total part raised',
          key: 'total_part_raised',
          dataIndex: 'total_part_raised',
        },
        {
          title: 'total part issued',
          key: 'total_part_closed',
          dataIndex: 'total_part_closed',
        },
        {
          title: 'total parts returns',
          key: 'total_part_returned',
          dataIndex: 'total_part_returned',
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
        },
      ];
      //   const md = getModifiedData1(items,pageData?.pageTitle)
      // here we need to add amount for contra voucher

      setColumnsData(columns);
      setTableData(items?.data || []);
      setTotal(items?.total_records_on_page);
      setloading(false);
    });
  };
  useEffect(() => {
    // if(selectedFilter?.month && selectedFilter?.year) {
    setexportloading(true);
    setloading(true);
    reportFunc(
      JSON.stringify(selectedFilter),
      paginationData?.current_page || 1,
      paginationData?.page_length || 5
    );

    getJobCardReport().then((items) => {
      setallrecords(items?.data || items);
      setexportloading(false);
    });
    //   }
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
    let data: any = [];
    allrecords?.map((item: any) => {
      item?.products?.map((i: any) => {
        data.push({ ...item, ...i });
      });
    });
    const mapedData = data?.map((item: any) => ({
      ...item,
      products: undefined,
      creation: undefined,
    }));
    handleExportInventory(mapedData, 'Job Card Report', 'Job Card Report');
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
  const expandedRowRender = (e: any) => {
    const columns = [
      {
        title: 'Product Id',
        key: 'part_no',
        dataIndex: 'part_no',
        // description: { sortType: 'char' },
        // render: (_: any, record: any) => record?.employee_data?.name,
      },
      {
        title: 'Product',
        key: 'part_name',
        dataIndex: 'part_name',
        // description: { sortType: 'char' },
        // render: (_: any, record: any) => record?.employee_data?.full_name,
      },
      {
        title: 'MRP price',
        key: 'amount',
        dataIndex: 'amount',
      },
      {
        title: 'requested Qty',
        key: 'requested_qty',
        dataIndex: 'requested_qty',
        //  description: { sortType: 'int' },

        // render: (_: any, record: any) => record?.employee_data?.location_name,
      },
      {
        title: 'issued qty',
        key: 'issued_qty',
        dataIndex: 'issued_qty',
        //  description: { sortType: 'int' },
      },
      {
        title: 'Total Amount',
        key: 'total_cost',
        dataIndex: 'total_cost',
      },
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
        onChangePaginationFn={onHandlePagination}

        // footer={() => {
        //   return (
        //     <>
        //       <div
        //         style={{
        //           display: 'flex',
        //           flexDirection: 'row-reverse',
        //           columnGap: '8px',
        //         }}
        //       >
        //         <strong>{total} Rs</strong>
        //         <strong>TOTAL JOB CARD PRODUCTS COST : </strong>
        //       </div>
        //       {/* <Row>
        //           <Col span={2}></Col>
        //           <Col span={4}></Col>
        //           <Col span={8}>
        //             <strong>TOTAL FUEL USED:</strong>
        //           </Col>
        //           <Col span={4}></Col>

        //           <Col span={6}>
        //             <strong>{totalFuelConsumed}</strong>
        //           </Col>
        //         </Row> */}
        //     </>
        //   );
        // }}
      />
    </div>
  );
};

export default View;
