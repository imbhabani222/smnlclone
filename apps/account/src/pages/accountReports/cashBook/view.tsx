import React, { useState, useEffect, useContext } from 'react';
import cloneDeep from 'lodash/cloneDeep';
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
import { getModifiedData } from '../helper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Row, Col } from 'antd';
import { colsing_balance_add_dr_cr } from '../../accountManagement/helper';

const formData = [
  {
    datatype: 'Date',
    // label: 'From Date::',

    name: 'from_date',
    isReq: false,
    colSpan: 6,
    placeholder: 'From date',
    defaultValue: datetoFrom(moment().format('YYYY-MM-DD')),
  },
  {
    datatype: 'Date',
    // label: 'To Date::',
    name: 'to_date',
    isReq: false,
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
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({to_date:moment().format('YYYY-MM-DD'),from_date:moment().format('YYYY-MM-DD')});
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);

  const pageData = {
    pageTitle: 'Cash Book',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Export to PDF',
    tableHeight: 250,
  };

  useEffect(() => {
    setloading(true);
    const payload = selectedFilter;
    getAccountReports(
      'get_cash_records',
      'account_management',
      'htsaccount',
      JSON.stringify(payload)
    ).then((items) => {
      let columns: any = [];
      const tableKeys = [
        'Voucher Date',
        'Particular',
        'Voucher Type',
        'Voucher No',
        'Dr Amount',
        'Cr Amount',
        'Balance',
      ];
      // columns = tableKeys.map((item: any) => ({
      //   title: item,
      //   key: item.toString().toLowerCase().replace(' ', '_'),
      //   dataIndex: item.toString().toLowerCase().replace(' ', '_'),
      //   description: getDescription(item),
      //   render:(a:any)=> a
      // }));

      // columns = tableKeys.map((item: any) => ({
      //   title: item,
      //   key: item.toString().toLowerCase().replace(' ', '_'),
      //   dataIndex: item.toString().toLowerCase().replace(' ', '_'),
      //   description: getDescription(item),
      //   render:(a:any)=> a
      // }));

      columns = tableKeys.map((item: any)=>{
        if(item === "Particular"){
          return {
            title: item,
            key: item.toString().toLowerCase().replace(' ', '_'),
            dataIndex: item.toString().toLowerCase().replace(' ', '_'),
            description: getDescription(item),
            render:(a:any,b:any)=> {
              if(b.dr_ledger.toLowerCase() !=="cash"){
                return b.dr_ledger
              }else if(b.cr_ledger.toLowerCase() !=="cash"){
                return b.cr_ledger
              }
            }
          }
        }
        return {
          title: item,
          key: item.toString().toLowerCase().replace(' ', '_'),
          dataIndex: item.toString().toLowerCase().replace(' ', '_'),
          description: getDescription(item),
          render:(a:any)=> a
        }
      })


      
      const md = cloneDeep(items);
      const newMd= cloneDeep(items);

      let mdBal = 0;

      md.forEach((i: any) => {
        if (i?.dr_amount) {
          mdBal = mdBal + parseFloat(i?.dr_amount);
        }
        if (i?.cr_amount) {
          mdBal = mdBal - parseFloat(i?.cr_amount);
        }
        i.balance =colsing_balance_add_dr_cr(mdBal);
      });
      
      

      newMd.forEach((i: any) => {
        let bal = 0;
        if (i?.dr_amount) {
          bal = bal + parseFloat(i?.dr_amount);
        }
        if (i?.cr_amount) {
          bal = bal - parseFloat(i?.cr_amount);
        }
        i.balance = bal;
      });
      

      const totalValues = newMd.reduce(
        (total: any, row: any) => {
          total.dr_amount += parseFloat(row?.dr_amount) || 0;
          total.cr_amount += parseFloat(row?.cr_amount) || 0;
          total.balance += row?.balance;
          return total;
        },
        { dr_amount: 0, cr_amount: 0, balance: 0 }
      );


      const Total={...totalValues,balance:colsing_balance_add_dr_cr(totalValues?.balance)}

      console.log(md,"abc")

      setTotal(Total);

      

      setTableData(md);

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
    value && setSelectedFilter({ ...selectedFilter, [key]: date });
  };

  const onDownloadExcel = () => {
    
    
    const data = tableData.map((item: any, index: any) => ({
      'Sl No.': index + 1,
      'Voucher Date': item?.voucher_date,
      'Particular': item.dr_ledger.toLowerCase() !=="cash" ? item.dr_ledger :item.cr_ledger.toLowerCase() !=="cash"?item.cr_ledger: null,
      'Voucher Type': item?.voucher_type,
      'Voucher No': item?.voucher_no,
      'Dr Amount': item?.dr_amount,
      'Cr Amount': item?.cr_amount,
      "Balance":  item?.balance,
    }));

    const totalObject={
      'Sl No.': '',
      'Voucher Date': '',
      'Particular': '',
      'Voucher Type': 'Total',
      'Voucher No': '',
      'Dr Amount': total.dr_amount,
      'Cr Amount': total.cr_amount,
      'Balance': total.balance,
    }

    handleExportAccounts(AddFooterToExcel(data,totalObject), 'Cash Book Reports','Cash Book Report');
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
        rep.text('Cash Book', 250, 145);
        autoTable(rep, {
          theme: 'grid',
          head: [columnd],
          body: mapedData,
          startY: 180,
          styles: styles,
          headStyles: headerStyles,
          bodyStyles: bodyStyle,
        });
        pdf.save('CashBook.pdf');
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
        showDownloadPaySlip={false}  //not needed only pass when false
        showFilters={true} //not needed only pass when false
        downloadExcel={onDownloadExcel}
        downloadPdf={onDownloadPdf}
        showScroll={true}
        footer={() => {
          return (
            <>
              <Row>
                <Col span={2}></Col>
                <Col span={12}>
                  <strong>TOTAL:</strong>
                </Col>
                <Col span={4}>
                  <strong>{total?.dr_amount}</strong>
                </Col>
                <Col span={3}>
                  <strong>{total?.cr_amount}</strong>
                </Col>
                <Col span={3}>
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
