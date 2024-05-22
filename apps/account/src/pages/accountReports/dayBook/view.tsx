import React, { useState, useEffect, useContext } from 'react';
import { getAccountReports } from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import {handleExportAccounts} from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import moment from 'moment';
import dayjs from 'dayjs';
import Report from '../../../../../../libs/common/ui/Report/report';
import {
  AddFooterToExcel,
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';
import { getModifiedData, getModifiedData1 } from '../helper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { table } from 'console';
import { Row, Col } from 'antd';

const formData = [
  {
    datatype: 'Date',
    // label: 'Date',
    name: 'voucher_date',
    placeholder: 'Select Date',
    isReq: false,
    // description: undefined,
    colSpan: 6,
    defaultValue: datetoFrom(moment().format('YYYY-MM-DD')),
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
  const [total, setTotal] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({
    voucher_date: moment().format('YYYY-MM-DD'),
  });
  

  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);

  const pageData: any = {
    pageTitle: 'Day Book',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Export to PDF',
    tableHeight: 250,
  };

  useEffect(() => {
    setloading(true);
    const payload = selectedFilter;
    getAccountReports(
      'day_book',
      'account_management',
      'htsaccount',
      JSON.stringify(payload)
    ).then((items) => {
      console.log(items,"abc")
      let columns: any = [];
      const tableKeys = [
        'Voucher Type',
        'Voucher No',
        'Voucher Date',
        'Dr Ledger',
        'Dr Amount',
        'Cr Ledger',
        'Cr Amount',
      ];
      columns = tableKeys.map((item: any) => ({
        title: item,
        key: item.toString().toLowerCase().replace(' ', '_'),
        dataIndex: item.toString().toLowerCase().replace(' ', '_'),
        description: getDescription(item),
        render:(a:any)=> a
      }));

      console.log(columns,"columns")


      const md = items;

      const totalValues = md.reduce(
        (total: any, row: any) => {
          total.dr_amount += parseFloat(row?.dr_amount) || 0;
          total.cr_amount += parseFloat(row?.cr_amount) || 0;
          return total;
        },
        { dr_amount: 0, cr_amount: 0 }
      );

      setTotal(totalValues);

      console.log(md ,columns,"Total")

      setTableData(md);

      setColumnsData(columns);

      setloading(false);
    });
    //   }
  }, [selectedFilter]);

  const getDescription = (x: any) => {
    if (
      x === 'Voucher Type' ||
      x === 'Voucher Date' ||
      x === 'Debit Ledger' ||
      x === 'Credit Ledger' ||
      x === 'Voucher No'
    ) {
      return { sortType: 'char' };
    } else if (x === 'Dr Amount' || x === 'Cr Amount') {
      return { sortType: 'int' };
    }
    return {};
  };
  const updateSelectionHandler = (Object: object) => {
    setSelectionObject(Object);
  };

  const onHandleCloseHandler = () => {
    updateFilter(false);
  };

  const onHandleFilterHandler = (key: any, value: any) => {
    updateFilter(false);
  };

  const onFilterClickHandler = () => {
    handleExportAccounts(tableData);
  };

  const onHandleChangeFilterHandler = (value: any, key: string) => {
    // const date:any = dateFormat(value);
    if (key === 'voucher_date') {
      value = dateFormat(value);
    }
    value && setSelectedFilter({ ...selectedFilter, [key]: value });
  };

  const onDownloadExcel = () => {
    const data = tableData.map((item: any, index: any) => ({
      'Sl No.': index + 1,
      'Voucher Type': item?.voucher_type,
      'Voucher No': item?.voucher_no,
      'Voucher Date': item?.voucher_date,
      'Dr Ledger': item?.dr_ledger,
      'Dr Amount': item?.dr_amount,
      'Cr Ledger': item?.cr_ledger,
      'Cr Amount': item?.cr_amount,
    }));

    const totalObject={
      'Sl No.': '',
      'Voucher Type': '',
      'Voucher No': '',
      'Voucher Date': 'Total',
      'Dr Ledger': '',
      'Dr Amount': total.dr_amount,
      'Cr Ledger': '',
      'Cr Amount': total.cr_amount,
    }

    handleExportAccounts(AddFooterToExcel(data,totalObject), 'Day Book Reports','Day Book Report');

  };

  const onDownloadPdf = () => {
    const rep: any = new jsPDF('p', 'pt', 'a4');
    const data = [...tableData];
    const mapedData = data?.map((item: any, index: any) => [
      `${index + 1}`,
      item?.voucher_type,
      item?.voucher_no,
      item?.voucher_date,
      item?.dr_ledger,
      item?.dr_amount,
      item?.cr_ledger,
      item?.cr_amount,
    ]);
    

    const columnd = [
      'Sl No.',
      'Voucher Type',
      'Voucher No',
      'Voucher Date',
      'Dr Ledger',
      'Dr Amount',
      'Cr Ledger',
      'Cr Amount',
    ];
    rep.html(document.querySelector('#payslip_id'), {
      callback: function (pdf: any) {
        rep.setFontSize(18);
        rep.text(
          `C/O Adani Krishnapatnam Port Ltd., Muthukur, Nellore, -524344`,
          35,
          100
        );
        rep.setFontSize(28);
        rep.text('Day Book', 250, 145);
        autoTable(rep, {
          theme: 'grid',
          head: [columnd],
          body: mapedData,
          startY: 180,
          styles: styles,
          headStyles: headerStyles,
          bodyStyles: bodyStyle,
        });
        pdf.save('DayBook.pdf');
      },
    });
  };

  return (
    <>
      <div style={{ visibility: 'hidden', height: 0 }} id="payslip">
        <div id="payslip_id">
          <></>
        </div>
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
        showTable={true} //not needed only pass when false
        pageData={pageData}
        showExportToExcel={true} //not needed only pass when false
        showDownloadPaySlip={false} //not needed only pass when false
        showFilters={true} //not needed only pass when false
        downloadExcel={onDownloadExcel}
        downloadPdf={onDownloadPdf}
        showScroll={true}
        footer={() => {
          return (
            <>
              <Row>
                <Col span={1}></Col>
                <Col span={2}></Col>
                <Col span={8}>
                  <strong>TOTAL:</strong>
                </Col>

                <Col span={4}></Col>
                <Col span={6}>
                  <strong>{total?.dr_amount}</strong>
                </Col>
                <Col span={3}>
                  <strong>{total?.cr_amount}</strong>
                </Col>
              </Row>
            </>
          );
        }}
      />
    </>
  );
};

export default View;
