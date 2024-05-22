import React, { useState, useEffect, useContext } from 'react';
import { getInventoryReports } from '../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../libs/common/context/filtercontext';
import { handleExportforVehiclewisereports } from '../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
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
  // {
  //   datatype: 'LinkSearch',
  //   name: 'supplier',
  //   options: 'Inventory Supplier Details',
  //   colSpan: 4,
  //   placeholder: 'Supplier',
  //   description: {
  //     linkfield: 'supplier_name',
  //     modulename: 'inventory_general_setup',
  //     showActive: 'true',
  //     appname: 'htsinventory',
  //     filter: true,
  //   },
  // },
  {
    datatype: 'DateRange',
    name: 'daterange',
    isReq: false,
    colSpan: 3,
    options: 'past',
    // placeholder: 'From date',
  },
  {
    placeholder: 'Select Vehicle',
    name: 'vehicle_no',
    //title: ' Products',
    // dataIndex: 'part_name',
    key: 'vehicle',
    fieldtype: 'TableSelect',
    datatype: 'TableSelect',
    description: {
      search: 'fuel_management.doctype.vehicles.api.search_product?search=',
      linkfield: 'part_name',
      modulename: 'fuel_management',
      appname: 'htsinventory',
    },
    options: 'vehicles',
    columns: [
      {
        title: 'Vehicle No',
        dataIndex: 'door_no',
        key: 'door_no',
      },
      // {
      //   title: 'Product Id',
      //   dataIndex: 'name',
      //   key: 'name',
      // },
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
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [exportloading, setexportloading] = useState<any>(false);
  const [allrecords, setallrecords] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>(
    getDateRange('rangePicker')
  );
  // getDateRange('rangePicker')
  const [total, setTotal] = useState<any>([]);
  const { filter, updateFilter } = useContext<any>(FilterContext);
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });
  const pageData = {
    pageTitle: 'Vehicle Wise Report',
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
      `job_card_vehicle_data?page=${current_page}&page_length=${page_length}`,
      'inventory_mis_reports',
      'htsinventory',
      payload
    ).then((items) => {
      const columns = [
        {
          title: 'vehicle no',
          key: 'vehicle_no',
          dataIndex: 'vehicle_no',
          //  description: { sortType: 'char' },
          // render: (_: any, record: any) =>
          //   record?.job_card_creation?.vehicle_no,
        },
        {
          title: 'vehicle type',
          key: 'vehicle_type',
          dataIndex: 'vehicle_type',
          //  description: { sortType: 'char' },
          // render: (_: any, record: any) =>
          //   record?.job_card_creation?.vehicle_type,
        },
        {
          title: 'last service',
          key: 'last_service',
          dataIndex: 'last_service',
          // description: { sortType: 'char' },
          //  render: (_: any, record: any) => record?.job_card_creation?.used_for,
        },
        {
          title: 'Total Cost',
          key: 'total_job_cards_cost',
          dataIndex: 'total_job_cards_cost',
          render: (_: any, record: any) =>
            record?.total_job_cards_cost?.toFixed(2),

          // description: { sortType: 'char' },
          //  render: (_: any, record: any) => record?.job_card_creation?.name,
        },

        // {
        //   title: 'date',
        //   key: 'date',
        //   dataIndex: 'date',
        //   //  description: { sortType: 'char' },
        //   render: (_: any, record: any) => record?.job_card_creation?.date,
        // },
      ];

      setColumnsData(columns);
      setPaginationData({
        ...paginationData,
        total_records: items?.total_count,
      });

      // const vehicleaJobCardsData: any = items?.data?.map((jobcard: any) => {
      //   let jobCardsData: any = [];
      //   jobcard?.job_cards?.map((reqItems: any) => {
      //     reqItems?.products?.map((prod: any) => {
      //       // entries?.part_issue_note_entries?.map((prod: any) => {
      //       jobCardsData.push({ ...reqItems, ...prod });
      //       //  });
      //     });
      //   });
      //   return { ...jobcard, ['job_cards']: jobCardsData };
      // });
      setTableData(items?.data || []);
      //setTotal(items?.total_reconciliation_amount);
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
      `job_card_vehicle_data`,
      'inventory_mis_reports',
      'htsinventory',
      JSON.stringify(selectedFilter)
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
          daterange: undefined,
        });
      }
      return;
    }

    setSelectedFilter({ ...selectedFilter, [key]: val });
  };

  const onDownloadExcel = () => {
    // let jobCardsData: any = [];
    // allrecords?.map((jobcard: any) => {
    //   jobcard?.job_cards?.map((reqItems: any) => {
    //     reqItems?.products?.map((prod: any) => {
    //       jobCardsData.push({ ...jobcard, ...reqItems, ...prod });
    //     });
    //   });
    // });
    // const mapedData = jobCardsData?.map((item: any) => ({
    //   'JOB CARD No': item?.job_card_no,
    //   date: item?.date,
    //   'Product ID': item?.part_no,
    //   'Product Name': item?.part_name,
    //   'Product MRP': item?.amount?.toString(),
    //   quantity: item?.quantity?.toString(),
    //   'Total Product Cost': item?.total_cost?.toString(),
    //   'Job Card Cost': item?.total_job_card_cost?.toString(),
    //   'vehicle no': item?.vehicle_no,
    //   'vehicle type': item?.vehicle_type,
    //   'Total Job Card Cost per vehicle': item?.total_job_cards_cost?.toString(),
    //   supervisor: item?.supervisor,
    //   driver: item?.driver,
    //   'Last Service': item?.last_service,
    //   machanic: item?.machanic,
    // }));
    handleExportforVehiclewisereports(
      allrecords,
      'Vehicle Report',
      `Vehicle Report from ${selectedFilter?.from_date} to ${
        selectedFilter?.to_date
      } ${
        selectedFilter?.vehicle_no
          ? `for Vehicle ${selectedFilter?.vehicle_no}`
          : ''
      }`
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
        title: 'job Card NO',
        key: 'job_card_no',
        dataIndex: 'job_card_no',
        width: 100,
        //  description: { sortType: 'char' },
        // render: (_: any, record: any) => record?.employee_data?.name,
      },
      // {
      //   title: 'part issue note no',
      //   key: 'name',
      //   dataIndex: 'name',
      //   width: 180,

      //   //  description: { sortType: 'char' },
      //   // render: (_: any, record: any) => record?.employee_data?.name,
      // },
      {
        title: 'Creation date',
        key: 'date',
        dataIndex: 'date',
        width: 100,

        //  description: { sortType: 'char' },
        // render: (_: any, record: any) => record?.employee_data?.name,
      },
      {
        title: 'total job card cost',
        key: 'total_job_card_cost',
        dataIndex: 'total_job_card_cost',
        render: (_: any, record: any) =>
          record?.total_job_card_cost?.toFixed(2),
        width: 100,
      },
      // {
      //   title: 'Product Cost',
      //   key: 'amount',
      //   dataIndex: 'amount',
      //   render: (_: any, record: any) => record?.amount?.toFixed(2),
      //   width: 100,
      // },
      // {
      //   title: 'quantity',
      //   key: 'quantity',
      //   dataIndex: 'quantity',
      //   width: 100,
      // },
      // {
      //   title: 'total cost',
      //   key: 'total_cost',
      //   dataIndex: 'total_cost',
      //   render: (_: any, record: any) => record?.total_cost?.toFixed(2),
      //   width: 100,
      // },
      {
        title: 'Closed date',
        key: 'close_date',
        dataIndex: 'close_date',
        width: 100,

        //  description: { sortType: 'char' },
        // render: (_: any, record: any) => record?.employee_data?.name,
      },
      {
        title: 'status',
        key: 'status',
        dataIndex: 'status',
        width: 100,

        // description: { sortType: 'int' },

        // render: (_: any, record: any) => record?.employee_data?.location_name,
      },
    ];
    // console.log("nest columns",nestedcolumns)
    return (
      <div
        style={{
          margin: '15px',
          border: '1px solid #d1d1d1',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        }}
      >
        <SmnlTable
          column={columns}
          dataSource={e?.job_cards || []}
          expandable={{
            expandedRowRender: expandedsubRowRender,
            rowExpandable: (record: any) => true,
          }}
          showScroll={false}
        />
      </div>
    );
  };
  const expandedsubRowRender = (e: any) => {
    const columns = [
      {
        title: 'Product ID',
        key: 'part_no',
        dataIndex: 'part_no',
        width: 180,

        //  description: { sortType: 'char' },
        // render: (_: any, record: any) => record?.employee_data?.name,
      },

      {
        title: 'Product',
        key: 'part_name',
        dataIndex: 'part_name',
        width: 180,
      },
      {
        title: 'Product Cost',
        key: 'amount',
        dataIndex: 'amount',
        render: (_: any, record: any) => record?.amount?.toFixed(2),
        width: 100,
      },
      {
        title: 'quantity',
        key: 'quantity',
        dataIndex: 'quantity',
        width: 100,
      },
      {
        title: 'return qty',
        key: 'return_qty',
        dataIndex: 'return_qty',
        //   render: (_: any, record: any) => record?.amount?.toFixed(2),
        width: 100,
      },
      {
        title: 'total cost',
        key: 'total_cost_after_return',
        dataIndex: 'total_cost_after_return',
        render: (_: any, record: any) =>
          record?.total_cost_after_return?.toFixed(2),
        width: 100,
      },
    ];
    // console.log("nest columns",nestedcolumns)
    return (
      <div
        style={{
          margin: '15px 0',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        }}
      >
        <SmnlTable
          column={columns}
          dataSource={e?.products || []}
          showScroll={false}
        />
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
        expandable={{
          expandedRowRender,
          rowExpandable: (record: any) => record.expandable !== false,
        }}
        totalRecords={paginationData?.total_records}
        onChangePaginationFn={onHandlePagination}
        disableExcel={exportloading}
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
