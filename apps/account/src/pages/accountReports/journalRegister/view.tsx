import React, { useState, useEffect, useContext } from 'react';
import { getAccountReportsBalance } from '../../../../../../libs/common/api/doctype';
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
import { table } from 'console';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Row, Col } from 'antd';

const formData = [
  {
    datatype: 'Date',
    name: 'from_date',
    placeholder: 'From date',
    isReq: false,
    colSpan: 6,
    defaultValue: datetoFrom(moment().format('YYYY-MM-DD')),
  },
  {
    datatype: 'Date',
    name: 'to_date',
    placeholder: 'To date',
    isReq: false,
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
  const [tableData, setTableData] = useState<any>([]);
  const [total, setTotal] = useState<any>({});
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({to_date:moment().format('YYYY-MM-DD'),from_date:moment().format('YYYY-MM-DD')});

  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);

  const pageData = {
    pageTitle: 'Journal Register',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Export to PDF',
    tableHeight: 250,
  };

  useEffect(() => {
    setloading(true);
    const payload = selectedFilter;
    getAccountReportsBalance(
      'get_journal_records',
      'account_management',
      'htsaccount',
      JSON.stringify(payload)
    ).then((message) => {
      const items=message?.data;
      console.log(message,"items");
      let columns: any = [];
      const tableKeys = [
        'Voucher No',
        'Voucher Date',
        'Debit Ledger',
        'Dr Amount',
        'Credit Ledger',
        'Cr Amount',
      ];
      columns = tableKeys.map((item: any) => ({
        title: item,
        key: item.toString().toLowerCase().replace(' ', '_'),
        dataIndex: item.toString().toLowerCase().replace(' ', '_'),
        description: getDescription(item),
        render:(a:any)=> a
      }));

      const totalValues = { dr_amount: message?.balance, cr_amount: message?.balance }
      setTotal(totalValues);

      setTableData(items);

      setColumnsData(columns);
      setloading(false);
    });
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
    } else if (x === 'Dr Amount' || x === 'Cr Amount' || x === 'Balance') {
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
    const date: any = dateFormat(value);
    setSelectedFilter({ ...selectedFilter, [key]: date });
  };

  const onDownloadExcel = () => {
    const data = tableData.map((item: any, index: any) => ({
      'Sl No.': index + 1,
      'Voucher No': item?.voucher_no,
      'Voucher Date': item?.voucher_date,
      'Debit Ledger': item?.debit_ledger,
      'Dr Amount': item?.dr_amount,
      'Credit Ledger': item?.credit_ledger,
      'Cr Amount': item?.cr_amount,
    }));

    const totalObject={
      'Sl No.': '',
      'Voucher No': '',
      'Voucher Date': '',
      'Debit Ledger': 'Total',
      'Dr Amount': total.dr_amount,
      'Credit Ledger': '',
      'Cr Amount': total.cr_amount,
    }

    handleExportAccounts(AddFooterToExcel(data,totalObject), 'Journal Register Reports','Journal Register Report');
  };

  const onDownloadPdf = () => {
    const rep: any = new jsPDF('p', 'pt', 'a4');
    const data = [...tableData];
    const mapedData = data?.map((item: any, index: any) => [
      `${index + 1}`,
      item?.voucher_no,
      item?.voucher_date,
      item?.debit_ledger,
      item?.dr_amount,
      item?.credit_ledger,
      item?.cr_amount,
      item?.narration,
    ]);

    const columnd = [
      'Sl No.',
      'Voucher No',
      'Voucher Date',
      'Debit Ledger',
      'Dr Amount',
      'Credit Ledger',
      'Cr Amount',
      'Narration',
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
        rep.text('Journal Register', 250, 145);
        autoTable(rep, {
          theme: 'grid',
          head: [columnd],
          body: mapedData,
          startY: 180,
          styles: styles,
          headStyles: headerStyles,
          bodyStyles: bodyStyle,
        });
        pdf.save('JournalRegister.pdf');
      },
    });
  };


  return (
    <div>
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
                <Col span={4}></Col>
                <Col span={6}>
                  <strong>TOTAL:</strong>
                </Col>

                <Col span={1}></Col>
                <Col span={7}>
                  <strong>{total?.dr_amount}</strong>
                </Col>
                <Col span={3}>
                  <strong>{total?.cr_amount}</strong>
                </Col>
                <Col span={2}></Col>
              </Row>
            </>
          );
        }}
      />
    </div>
  );
};

export default View;
