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
import { table } from 'console';
import {
  colsing_balance_add_dr_cr,
  ledgerColumntype1,
  ledgerSearchIndexex,
} from '../../accountManagement/helper';
import { getModifiedData, getModifiedData1 } from '../helper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Row, Col } from 'antd';

const formData = [
  {
    datatype: 'TableSelect',
    name: 'ledger',
    placeholder: 'Select Ledger',
    isReq: false,
    options: 'Inventory General Ledger',
    colSpan: 8,
    columns: ledgerColumntype1,
    searchIndexes: ledgerSearchIndexex,
    description: {
      linkfield: 'ledger_name',
      modulename: 'inventory_account_configuration',
      appname: 'htsaccount',
      colSpan: '2',
    },
  },

  {
    datatype: 'Date',
    name: 'from_date',
    isReq: false,
    // description: undefined,
    colSpan: 6,
    placeholder: 'From date',
    defaultValue: datetoFrom(moment().format('YYYY-MM-DD')),
  },
  {
    datatype: 'Date',
    name: 'to_date',
    isReq: false,
    // description: undefined,
    colSpan: 6,
    placeholder: 'To date',
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
  const [selectedLedger, setSelectedLedger] = useState<any>(null);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({to_date:moment().format('YYYY-MM-DD'),from_date:moment().format('YYYY-MM-DD')});

  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);

  const pageData = {
    pageTitle: 'Ledger Account',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Export to PDF',
    tableHeight: 230,
  };








  useEffect(() => {
    // if(selectedFilter?.month && selectedFilter?.year) {
    setloading(true);
    const payload = selectedFilter;
    getAccountReports(
      'get_ledger_account_book',
      'account_management',
      'htsaccount',
      JSON.stringify(payload)
    ).then((items) => {
      setloading(false);

      let columns: any = [];
      const tableKeys = [
        'Voucher Date',
        'Particular',
        'Voucher Type',
        'Voucher No',
        'Document No',
        // 'Chq/Ref No',
        'Narration',
        'Dr Amount',
        'Cr Amount',
        'Balance',

        // 'Balance'
      ];
      columns = tableKeys.map((item: any) => ({
        title: item,
        key: item.toString().toLowerCase().replace(' ', '_'),
        dataIndex: item.toString().toLowerCase().replace(' ', '_'),
        description: getDescription(item),
      }));
      const modifiedColumns = columns.map((col: any) => {
        if (col.dataIndex === 'chq/ref_no' && col.key === 'chq/ref_no') {
          return {
            ...col,
            key: 'cheque_no',
            dataIndex: 'cheque_no',
          };
        }
        return col;
      });

      // here we need to add amount for contra voucher
      const md = getModifiedData1(items, pageData?.pageTitle, selectedLedger);
      let bal = 0;
      md.forEach((i: any) => {
        if (i?.dr_amount) {
          bal = bal - parseFloat(i?.dr_amount);
        }
        if (i?.cr_amount) {
          bal = bal + parseFloat(i?.cr_amount);
        }
        // i?.balance = bal;
      });
      const totalValues = md.reduce(
        (total: any, row: any) => {
          total.dr_amount += parseFloat(row?.dr_amount) || 0;
          total.cr_amount += parseFloat(row?.cr_amount) || 0;
          total.balance += row?.balance;
          return total;
        },
        { dr_amount: 0, cr_amount: 0, balance: 0 }
      );

      setTotal(totalValues);

      setColumnsData(modifiedColumns);
      setTableData(items);
      console.log(md,modifiedColumns,items, "Md")
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
      x === 'Voucher No' ||
      x === 'Particular'
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
    if (key === 'ledger') {
      setSelectedLedger(value);
    }

    let val = value;

    if (key == 'from_date') {
      const date: any = dateFormat(value);
      val = date;
    }
    value && setSelectedFilter({ ...selectedFilter, [key]: val });
  };

  const onDownloadExcel = () => {
    const data = tableData.map((item: any, index: any) => ({
      'Sl No.': index + 1,
      'Voucher Date': item?.voucher_date,
      'Particular': item?.particular,
      'Voucher Type': item?.voucher_type,
      'Voucher No': item?.name,
      'Doc No': item?.document_no,
     'Narration': item?.narration,
      'Dr Amount': item?.dr_amount,
      'Cr Amount': item?.cr_amount,
      'Balance': colsing_balance_add_dr_cr(item?.balance),
    }));

    const totalObject={
      'Sl No.': '',
      'Voucher Date': '',
      'Particular': '',
      'Voucher Type': '',
      'Voucher No': '',
      'Doc No': 'Total',
      'Narration': '',
      'Dr Amount': total?.dr_amount,
      'Cr Amount': total?.cr_amount,
      'Balance': colsing_balance_add_dr_cr(total?.balance),
    }

    handleExportAccounts(AddFooterToExcel(data,totalObject), 'Ledger Accounts Reports','Ledger Accounts Report');
  };

  const onDownloadPdf = () => {
    const rep: any = new jsPDF('p', 'pt', 'a4');
    const data = [...tableData];
    const mapedData = data?.map((item: any, index: any) => [
      `${index + 1}`,
      item?.voucher_date,
      item?.particular,
      item?.voucher_type,
      item?.name,
      item?.document_no,
      item?.narration,
      item?.dr_amount,
      item?.cr_amount,
      item?.balance,
    ]);

    const columnd = [
      'Sl No.',
      'Voucher Date',
      'Particular',
      'Voucher Type',
      'Voucher No',
      'Document No',
      // 'Chq/Ref No',
      'Narration',
      'Dr Amount',
      'Cr Amount',
      'Balance',
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
        rep.text('Ledger Account', 250, 145);
        autoTable(rep, {
          theme: 'grid',
          head: [columnd],
          body: mapedData,
          startY: 180,
          styles: styles,
          headStyles: headerStyles,
          bodyStyles: bodyStyle,
        });
        pdf.save('LedgerAccount.pdf');
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
        showDownloadPaySlip={true} //not needed only pass when false
        showFilters={true} //not needed only pass when false
        downloadExcel={onDownloadExcel}
        downloadPdf={onDownloadPdf}
        showScroll={true}
        footer={() => {
          return (
            <>
              <Row>
                <Col span={4}></Col>
                <Col span={12}>
                  <strong>TOTAL:</strong>
                </Col>
                <Col span={3}>
                  <strong>{total?.dr_amount}</strong>
                </Col>
                <Col span={3}>
                  <strong>{total?.cr_amount}</strong>
                </Col>
                <Col span={2}>
                  <strong>{total?.balance || 0}</strong>
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
