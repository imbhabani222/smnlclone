import React, { useState, useEffect, useContext } from 'react';
import {
  getFuelReports,
  getInventoryReports,
} from '../../../../../libs/common/api/doctype';
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
import { table } from 'console';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Row, Col } from 'antd';
import Cookies from 'universal-cookie';

type Props = {};
const formData = [
  {
    datatype: 'DateRange',
    name: 'daterange',
    isReq: false,
    colSpan: 3,
    options: 'past',
    // placeholder: 'From date',
  },
];
const Index = (props: Props) => {
  const [loading, setloading] = useState(false);
  const [salaryParameterOptions, setSalaryParameterOptions] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [exportloading, setexportloading] = useState<any>(false);
  const [allrecords, setallrecords] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>(
    getDateRange('rangePicker')
  );
  const [totalFuelConsumed, setTotalFuelConsumed] = useState<any>(0);
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });
  const pageData = {
    pageTitle: 'Vehicle Fuel Consumption',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Download PDF',
    tableHeight: 250,
  };
  const reportFunc = (
    doctype: any,
    module: string,
    appname?: string,
    filters?: any,
    type?: any,
    page?: any,
    page_length?: any
  ) => {
    getFuelReports(
      doctype,
      module,
      appname,
      filters,
      type,
      page,
      page_length
    ).then((items) => {
      const columns = [
        {
          title: 'User ',
          key: 'user_name',
          dataIndex: 'user_name',
        },
        {
          title: 'Bowser',
          key: 'bowser_name',
          dataIndex: 'bowser_name',
        },
        {
          title: 'Vehicle Id',
          key: 'vehicle_id',
          dataIndex: 'vehicle_id',
        },
        {
          title: 'Vehicle Type',
          key: 'vehicle_type_id',
          dataIndex: 'vehicle_type_id',
        },
        {
          title: 'Fuel Filling Date',
          key: 'fuel_filling_date',
          dataIndex: 'fuel_filling_date',
        },
        {
          title: 'Fuel Quantity (in Ltrs)',
          key: 'fuel_filling_ltrs',
          dataIndex: 'fuel_filling_ltrs',
        },
        // {
        //   title: 'Fuel Cost',
        //   key: 'fuel_rate',
        //   dataIndex: 'fuel_rate',
        // },
      ];
      setColumnsData(columns);
      setPaginationData({
        ...paginationData,
        total_records: items?.fuel?.total_records,
      });
      setTableData(items?.fuel?.data || []);
      setTotalFuelConsumed(items?.fuel?.fuel_used);
      setloading(false);
    });
  };
  useEffect(() => {
    setexportloading(true);
    setloading(true);
    reportFunc(
      'fuel_fillings',
      'fuel_management',
      'htsinventory',
      JSON.stringify(selectedFilter),
      'get_records',
      paginationData?.current_page || 1,
      paginationData?.page_length || 10
    );
    getFuelReports(
      'fuel_fillings',
      'fuel_management',
      'htsinventory',
      JSON.stringify(selectedFilter),
      'get_records'
    ).then((items) => {
      setallrecords(items?.fuel?.data || items);
      items?.fuel?.data && setexportloading(false);
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
          daterange: null,
        });
      }
      return;
    }
    setSelectedFilter({ ...selectedFilter, [key]: val });
  };
  const onDownloadExcel = () => {
    const data = allrecords.map((item: any, index: any) => ({
      'Sl No.': index + 1,
      'Company Id': item?.comp_id,
      'Comapny Name': item?.company_name,
      User: item?.user_name,
      'Bowser id': item?.bowser_id,
      'Bowser Name': item?.bowser_name,
      'Vehicle id': item?.vehicle_id,
      'Vehicle Type': item?.vehicle_type_id,
      'Fuel filling date': item?.fuel_filling_date,
      'Fuel Quantity': item?.fuel_filling_ltrs,
      'Fuel Cost': item?.fuel_rate,
    }));
    handleExportInventory(
      data,
      'Vehicle Fuel Consumption Report',
      'Vehicle Fuel Consumption Report'
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
    // rep.html(document.querySelector('#payslip_id'), {
    //   callback: function (pdf: any) {
    //     rep.setFontSize(18);
    //     rep.text(
    //       `C/O Adani Krishnapatnam Port Ltd., Muthukur, Nellore, -524344`,
    //       rep.internal.pageSize.width / 2,
    //       100, // Y coordinate
    //       { align: 'center' }
    //     );

    //     rep.setFontSize(28);
    //     rep.text('Supplier Report', rep.internal.pageSize.width / 2, 145, {
    //       align: 'center',
    //     });
    //     autoTable(rep, {
    //       theme: 'grid',
    //       head: [columnd],
    //       body: mapedData,
    //       startY: 180,
    //       styles: styles,
    //       headStyles: headerStyles,
    //       bodyStyles: bodyStyle,
    //     });
    //     pdf.save('SupplierReport.pdf');
    //   },
    // });
  };
  const onHandlePagination = (current_page: number, page_length: number) => {
    setPaginationData({
      ...paginationData,
      current_page: current_page,
      page_length: page_length,
    });
    reportFunc(
      'fuel_fillings',
      'fuel_management',
      'htsinventory',
      JSON.stringify(selectedFilter),
      'get_records',
      current_page || 1,
      page_length || 5
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
                <strong>{totalFuelConsumed} Ltrs</strong>
                <strong>TOTAL FUEL USED : </strong>
              </div>
              {/* <Row>
                <Col span={2}></Col>
                <Col span={4}></Col>
                <Col span={8}>
                  <strong>TOTAL FUEL USED:</strong>
                </Col>
                <Col span={4}></Col>

                <Col span={6}>
                  <strong>{totalFuelConsumed}</strong>
                </Col>
              </Row> */}
            </>
          );
        }}
      />
    </div>
  );
};

export default Index;
