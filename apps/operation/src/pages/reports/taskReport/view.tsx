import React, { useState, useEffect, useContext } from 'react';
import { onCloseActivity } from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import Report from '../../../../../../libs/common/ui/Report/report';
import moment from 'moment';

const formDatas = [
  {
    "label":"",
    "name": "task_id",
    "datatype": "Link",
    "isReq": true,
    "description": {
        "linkfield": "name",
        "modulename": "task_management",
        "appname": "htsoperation"
    },
    "options": "Task",
    "hidden": 0,
    "readonly": false,
    colSpan: 6,
    placeholder: "Task Id"
},
  {
    datatype: 'Date',
    // label: 'From Date::',

    name: 'from_date',
    isReq: false,
    colSpan: 6,
    placeholder: 'From date',
    options: "past"
  },
  {
    datatype: 'Date',
    // label: 'To Date::',
    name: 'to_date',
    isReq: false,
    colSpan: 6,
    placeholder: 'To date',
    options: "past"
  },

  {
    name: 'active',
    datatype: 'Select',
    isReq: false,
    colSpan: 6,
    placeholder: "Task Status",
    options: [
      { label: 'In Progress', value: "in progress" },
      { label: 'Completed', value: "completed" },
    ],
  },
];

const columns = [
  {
    title: 'Task Id',
    dataIndex: 'task_id',
    key: 'task_id',
  },
  {
    title: 'Start Date',
    dataIndex: 'start_date',
    key: 'start_date',
    // render: (_, record: any) =>
    //   record?.start_date
    //     ? moment(record?.start_date).format('DD/MM/YYYY')
    //     : '-',
  },
  {
    title: 'End Date',
    dataIndex: 'end_date',
    key: 'end_date',
    // render: (_, record: any) =>
    //   record?.end_date ? moment(record?.end_date).format('DD/MM/YYYY') : '-',
  },
  {
    title: 'Excavator',
    dataIndex: 'Excavator',
    key: 'Excavator',
  },
  {
    title: 'Loader',
    dataIndex: 'Loader',
    key: 'Loader',
  },
  {
    title: 'Dumper',
    dataIndex: 'Dumper',
    key: 'Dumper',
  },
  {
    title: 'Status',
    dataIndex: 'active',
    key: 'active',
    render: (_:any, record: any) =>
      record?.active === 0 ? (
        <span
          style={{
            background: '#95d989',
            color: '#045122',
            borderColor: 'transparent',
            borderRadius: '25px',
            // width: '140px',
            padding: '9px 38px',
            fontWeight: '600',
          }}
        >
          {' '}
          Completed{' '}
        </span>
      ) : (
        <span
          style={{
            color: '#1677ff',
            background: '#e6f4ff',
            borderColor: 'transparent',
            borderRadius: '25px',
            width: '80px',
            padding: '9px 38px',
            fontWeight: '600',
          }}
        >
          {' '}
          InProgress
        </span>
      ),
  },
];

type Props = {
  
}
const View = (props: Props) => {
  const [loading, setloading] = useState(false);
  const [salaryParameterOptions, setSalaryParameterOptions] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [formData, setformData] = useState <any> (formDatas);
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const [paginationData, setPaginationData] = useState<any>({
    page_length: 5,
    current_page: 1,
  });

  const pageData = {
    pageTitle: 'Task Report',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Export to Pdf',
    tableHeight: 250,
  };

  const reportFn = (
  payload:any
  ) => {
    setloading(true);

    onCloseActivity(
      `reports.task_report?task_id=${payload?.task_id || null}&from_date=${payload?.from_date || null}&to_date=${payload?.to_date || null}&active=${payload?.active === "in progress" ? 1 : payload?.active === "completed" ? 0 : null || null}`).then((items) => {
      setPaginationData({
        ...paginationData,
        total_records: items?.total_records || 0,
      });
      const modifyData = items?.data?.map((record:any) => ({
        ...record,
        start_date : record?.start_date ? moment(record?.start_date).format("DD/MM/YYYY") : "-",
        end_date : record?.end_date ? moment(record?.end_date).format("DD/MM/YYYY") : "-"
      }))
      setTableData(modifyData);
      setloading(false);
    });
  };

  

  useEffect(() => {
    if (selectedFilter?.from_date && selectedFilter?.to_date || selectedFilter?.task_id || selectedFilter?.active) {
      const payload = {
        ...selectedFilter,
        from_date: selectedFilter?.from_date ? moment(selectedFilter?.from_date?.$d).format("YYYY-MM-DD") : null,
        to_date:  selectedFilter?.to_date ? moment(selectedFilter?.to_date?.$d).format("YYYY-MM-DD") : null

      }
      reportFn(payload);
    }

    if(Object.values(selectedFilter).filter((item:any) => !!item).length === 0) {
      reportFn(selectedFilter)
    }
    
  }, [selectedFilter]);


  useEffect(()=>{
    reportFn(selectedFilter)
  },[])
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

  const onHandleChangeFilterHandle = (value: any, key: string) => {
    const modifyData = [...formData];
    if(key === 'task_id' && value) {
      modifyData.forEach((item:any) => {
        if(item.name !== "task_id") {
          item.readonly =true
        }
      })
      setformData([...modifyData])
    }
    if(key === 'task_id' && !value) {
      modifyData.forEach((item:any) => {
        if(item.name !== "task_id") {
          item.readonly =false
        }
      })
      setformData([...modifyData])
    }
    if(key === "from_date"){
      modifyData.forEach((item:any) => {
        if(item.name === "to_date") {
          item.options = {
            type: "enable_only_two_custom_date",
            startDate: value,
            endDate: moment(new Date())
          }
        }
      })
      setformData([...modifyData])
    }
    if(key === "to_date") {
      modifyData.forEach((item:any) => {
        if(item.name === "from_date") {
          item.options = {
            type: "past",
            value: value
          }
        }
      })
      setformData([...modifyData])
    }
    
    
    // formDatas?.
    setSelectedFilter({ ...selectedFilter, [key]: value });
  };

  const onDownloadExcel = () => {
    handleExport(tableData, 'Task Report');
  };

  const onHandlePagination = (current_page: number, page_length: number) => {
    setPaginationData({
      ...paginationData,
      current_page: current_page,
      page_length: page_length,
    });
    // reportFn(JSON.stringify(selectedFilter), current_page, page_length);
  };

  return (
    <div>
      <Report
        formData={formData}
        updateSelectionHandler={updateSelectionHandler}
        onHandleCloseHandler={onHandleCloseHandler}
        onHandleFilterHandler={onHandleFilterHandler}
        onFilterClickHandler={onFilterClickHandler}
        onHandleChangeFilterHandler={onHandleChangeFilterHandle}
        filter={filter}
        tableData={tableData}
        columnsData={columns}
        loading={loading}
        showTable={true} //not needed only pass when false
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
