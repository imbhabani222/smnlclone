import React, { useState, useEffect, useContext } from 'react';
import { getReportsData } from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import handleExport, {
  handleExportforMisreports,
} from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import Report from '../../../../../../libs/common/ui/Report/report';
import moment from 'moment';
import { years } from '../helper';

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
  },
  {
    datatype: 'Select',
    // label: 'month',
    name: 'half_yearly',
    isReq: false,
    description: undefined,
    colSpan: 6,
    placeholder: 'Half Yearly',
    options: [
      {
        value: 'January-June',
        label: 'January -June',
      },
      {
        value: 'July-December',
        label: 'July - December',
      },
    ],
  },
];

type Props = {};
const View = (props: Props) => {
  const [loading, setloading] = useState(false);
  const [salaryParameterOptions, setSalaryParameterOptions] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const [paginationData, setPaginationData] = useState<any>({
    page_length: 5,
    current_page: 1,
  });

  const pageData = {
    pageTitle: 'Half Yearly Return Report',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Export to Pdf',
    tableHeight: 250,
  };

  const reportFn = (
    payload: any,
    current_page: number,
    page_length: number
  ) => {
    setloading(true);

    getReportsData(
      `half_yearly_returns?page=${current_page}&page_length=${page_length}`,
      'mis_reports',
      'htssuite',
      payload
    ).then((items) => {
      setPaginationData({
        ...paginationData,
        total_records: items?.total_records || 0,
      });
      setTableData(items?.data || items);
      setloading(false);
    });
  };

  useEffect(() => {
    if (selectedFilter?.half_yearly && selectedFilter?.year) {
      reportFn(
        JSON.stringify(selectedFilter),
        paginationData?.current_page || 1,
        paginationData?.page_length || 5
      );
    }
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

  const onFilterClickHandler = () => {
    handleExport(tableData);
  };

  const onHandleChangeFilterHandler = (value: any, key: string) => {
    setSelectedFilter({ ...selectedFilter, [key]: value });
  };

  const onDownloadExcel = () => {
    const output = [];
    const input = tableData?.Month_Wise;
    // Loop through each month and gender
    for (const month in input) {
      for (const gender in input[month]) {
        const entry = {
          month: month,
          Gender: gender,
          WD: input[month][gender].WD,
          Earning: input[month][gender].Earnings,
          EPF: input[month][gender].EPF,
          PT: input[month][gender].PT,
          ESI: input[month][gender].ESI,
        };

        output.push(entry);
      }
    }
    handleExportforMisreports(
      output,
      'Half Yearly Return',
      `${selectedFilter?.year} Half Yearly reports from ${selectedFilter?.half_yearly}`
    );
  };

  const onHandlePagination = (current_page: number, page_length: number) => {
    setPaginationData({
      ...paginationData,
      current_page: current_page,
      page_length: page_length,
    });
    reportFn(JSON.stringify(selectedFilter), current_page, page_length);
  };

  return (
    <div>
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
        showTable={false} //not needed only pass when false
        pageData={pageData}
        showExportToExcel={true} //not needed only pass when false
        showDownloadPaySlip={false} //not needed only pass when false
        showFilters={true} //not needed only pass when false
        downloadExcel={onDownloadExcel}
        totalRecords={paginationData?.total_records}
        onChangePaginationFn={onHandlePagination}
      />
    </div>
  );
};

export default View;
