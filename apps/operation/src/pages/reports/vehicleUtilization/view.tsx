import React, { useState, useEffect, useContext } from 'react';
import { onCloseActivity } from '../../../../../../libs/common/api/doctype';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import Report from '../../../../../../libs/common/ui/Report/report';
import moment from 'moment';

const formData = [
  {
    datatype: 'Date',
    // label: 'From Date::',

    name: 'from_date',
    isReq: false,
    colSpan: 6,
    placeholder: 'From date',
    options: 'past',
  },
  {
    datatype: 'Date',
    // label: 'To Date::',
    name: 'to_date',
    isReq: false,
    colSpan: 6,
    placeholder: 'To date',
    options: 'past',
  },
  {
    placeholder: 'Vehicle Type',
    name: 'vehicle_type',
    datatype: 'Link',
    isReq: false,
    description: {
      linkfield: 'vehicle_type',
      modulename: 'fuel_management',
      appname: 'htsinventory',
      showActive: 'true',
    },
    options: 'Vehicle Types',
    hidden: 0,
    colSpan: 6,
    readonly: false,
  },
  {
    placeholder: 'Vehicle Number',
    name: 'door_no',
    datatype: 'Select',
    isReq: false,
    description: {
      
    },
    options: undefined,
    hidden: 0,
    colSpan: 6,
    readonly: false,
  }
];

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    // render: (_, record:any) => moment(record?.date).format("DD/MM/YYYY")
  },
  {
    title: "Door Number",
    dataIndex: "door_number",
    key: "door_number",
  },
  {
    title: "Total Time Worked",
    dataIndex: "total_time_worked",
    key: "total_time_worked",
    // render: (_, record:any) => moment(record?.total_time_worked,)
  }
]

type Props = {};

const View = (props: Props) => {
  const [loading, setloading] = useState(false);
  const [salaryParameterOptions, setSalaryParameterOptions] = useState<any>([]);
  const [selectionObject, setSelectionObject] = useState<any>({});
  const [tableData, setTableData] = useState<any>([]);
  const [columnsData, setColumnsData] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [formDatas, setformData] =useState<any>(formData);
  //@ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const [paginationData, setPaginationData] = useState<any>({
    page_length: 5,
    current_page: 1,
  });

  const pageData = {
    pageTitle: 'Vehicle Utilization Report',
    exportToExcelLabel: 'Export to Excel',
    downloadLabel: 'Export to Pdf',
    tableHeight: 250,
  };


  useEffect(()=>{
    onCloseActivity('api.get_door_nos').then((items:any) =>{
      const modifyFormData = [...formData];
      modifyFormData.forEach((item: any) => {
        if (item.name === 'door_no') {
          item.options = items?.data?.map((options: any) => ({
            label: options?.door_no,
            value: options?.name,
          }));
        }
      });
      setformData([...modifyFormData])
   })

  },[])

  const reportFn = (
  payload:any
  ) => {
    setloading(true);

    onCloseActivity(
      `reports.vehicle_utilization_report?from_date=${payload?.from_date || null}&to_date=${payload?.to_date || null}&vehicle_type=${payload?.vehicle_type || null}&door_no=${payload?.door_no || null}`).then((items) => {
      setPaginationData({
        ...paginationData,
        total_records: items?.total_records || 0,
      });
      const datas  =items?.data?.map((object:any) => ({
        date: moment(object?.records?.[0]?.date || object?.date).format("DD/MM/YYYY"),
        door_number : object?.door_number,
        total_time_worked: object?.records?.[0]?.total_time_worked || object?.total_time_worked
      }))
      console.log(items, "tiems")
      setTableData(datas);
      setloading(false);
    });
  };

  

  useEffect(() => {
    if (selectedFilter?.from_date && selectedFilter?.to_date || selectedFilter?.vehicle_type || selectedFilter?.door_no) {
      const payload = {
        ...selectedFilter,
        from_date: selectedFilter?.from_date ? moment(selectedFilter?.from_date?.$d).format("YYYY-MM-DD") : null,
        to_date: selectedFilter?.to_date ? moment(selectedFilter?.to_date?.$d).format("YYYY-MM-DD") : null

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

  const onHandleChangeFilterHandler = (value: any, key: string) => {
    const modifyData = [...formDatas];
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
    setSelectedFilter({ ...selectedFilter, [key]: value });
  };


  const onDownloadExcel = () => {
    handleExport(tableData, 'Vehicle Utilization Report');
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
        formData={formDatas}
        updateSelectionHandler={updateSelectionHandler}
        onHandleCloseHandler={onHandleCloseHandler}
        onHandleFilterHandler={onHandleFilterHandler}
        onFilterClickHandler={onFilterClickHandler}
        onHandleChangeFilterHandler={onHandleChangeFilterHandler}
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
