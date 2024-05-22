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
} from '../../../../../libs/common/utils/common';
import { table } from 'console';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Row, Col } from 'antd';
import { monthNames, years, getPreviousYear } from './helper';
type Props = {};
const formData = [
  {
    datatype: 'Select',
    // label: 'Year',
    name: 'year',
    isReq: false,
    description: undefined,
    colSpan: 6,
    placeholder: 'Year',
    options: years,
    default: `${new Date().getFullYear()}`,
  },
  {
    datatype: 'Select',
    // label: 'month',
    name: 'month',
    isReq: false,
    description: undefined,
    colSpan: 6,
    placeholder: 'Month',
    options: monthNames,
  },
];
const Index = (props: Props) => {
  const [loading, setloading] = useState(false);
  const [salaryParameterOptions, setSalaryParameterOptions] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>(getPreviousYear());
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const pageData = {
    pageTitle: 'MonthWise Fuel Consumption',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Download PDF',
    tableHeight: 250,
  };

  useEffect(() => {
    setloading(true);
    const payload = selectedFilter;

    getFuelReports(
      'fuel_fillings',
      'fuel_management',
      'htsinventory',
      JSON.stringify(payload),
      'get_fuel_sum_by_year_month'
    ).then((items) => {
      const columns = [
        {
          title: 'Vehicle Id',
          key: 'vehicle_id',
          dataIndex: 'vehicle_id',
        },
        {
          title: 'Total Fuel Quantity (in Ltrs)',
          key: 'total_fuel',
          dataIndex: 'total_fuel',
        },
      ];
      setColumnsData(columns);
      setTableData(items?.data || []);
      //   setTotalFuelConsumed(items?.fuel?.fuel_used);
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

    const monthmap: any = {
      January: '01',
      February: '02',
      March: '03',
      April: '04',
      May: '05',
      June: '06',
      July: '07',
      August: '08',
      September: '09',
      October: '10',
      November: '11',
      December: '12',
    };
    if (key === 'month') {
      val = +monthmap[value];
    }
    setSelectedFilter({ ...selectedFilter, [key]: val });
  };
  const onDownloadExcel = () => {
    const data = tableData.map((item: any, index: any) => ({
      'Sl No.': index + 1,
      'Vehicle id': item?.vehicle_id,
      'Fuel Quantity': item?.total_fuel,
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
        //         <strong>{totalFuelConsumed} Ltrs</strong>
        //         <strong>TOTAL FUEL USED : </strong>
        //       </div>
        //       {/* <Row>
        //         <Col span={2}></Col>
        //         <Col span={4}></Col>
        //         <Col span={8}>
        //           <strong>TOTAL FUEL USED:</strong>
        //         </Col>
        //         <Col span={4}></Col>

        //         <Col span={6}>
        //           <strong>{totalFuelConsumed}</strong>
        //         </Col>
        //       </Row> */}
        //     </>
        //   );
        // }}
      />
    </div>
  );
};

export default Index;
