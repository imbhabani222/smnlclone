import React, { useEffect, useState, useContext } from 'react';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import Drawer from '../../../../../../libs/common/ui/Drawer/drawer';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import Filter from '../../../../../../libs/common/ui/Filter';
import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import Cookies from 'universal-cookie';


type Props = {};

const Create = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columnData, setColumnData] = useState<any>([]);
  const [relod, setrelod] = useState<any>(false);
  const [fil, setFilter] = useState<any>(false);
  const [searchItem, setSearchItem] = useState<any>(null)
  const [filteredData, setFilteredData] = useState<any>({})
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize|| 10, current_page: 1})
  // @ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);
  const filterData: any = [
    {
      label: 'Employee',
      name: 'emp_name',
      datatype: 'Link',
      options: 'Personal Details',
      isReq: true,
      colSpan: 1,
      description: {
        linkfield: 'full_name',
        modulename: 'employee_management',
      },
    },
    {
      label: 'Status',
      name: 'status',
      datatype: 'Select',
      options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' },
      ],
      isReq: false,
      colSpan: 1,
    },
  ];

  const column = [
    {
      title: 'Employee Code',
      dataIndex: 'emp_code',
      key: 'emp_code',
    },
    {
      title: 'Employee Name',
      dataIndex: 'travel_requested_for',
      key: 'travel_requested_for',
    },
    {
      title: 'Request No',
      dataIndex: 'name',
      key: 'Request_No',
    },
    {
      title: 'Request Date',
      dataIndex: 'travel_request_date',
      key: 'travel_request_date',
    },
    {
      title: 'Estimated Amount',
      dataIndex: 'estimated_cost',
      key: 'estimated_cost',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Approver',
      dataIndex: 'approver',
      key: 'approver',
    },
    {
      title: 'Approver Date',
      dataIndex: 'approved_date_rejected_date_cancelled_date',
      key: 'approved_date_rejected_date_cancelled_date',
    },
  ];

  useEffect(() => {
    getTableResponse(filteredData,paginationData?.current_page,paginationData?.page_length,null)
  }, [relod]);

  const getTableResponse =(e:any,current_page:number,page_length:number,search:any)=>{

    getTableDataWithPagination('travel_request','travel_requisition',current_page,page_length,'htssuite',JSON.stringify(e),search)
    .then((items:any)=>{
      const newItem = items?.data.map((item: any) => {
        if (item.employee) {
          item.employee = item.employee.employee_name;
        }

        return {
          ...item,
          emp_code: item?.travel_requested_for,
          travel_requested_for: item?.travel_requested_for_name,
          approver: item?.approver_name,
        };
      });
      setColumnData(newItem);
      setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page })
    })

  }
  const handlePageRelod = () => {
    setrelod((pre: any) => !pre);
  };
  // const handleChange = (value: any, name: any) => {
  //   setFilter((pre: any) => {
  //     return { ...pre, name: value };
  //   });
  // };

  const handleFilter = (e: any) => {
    updateFilter(false);
  };

  const handleClose = () => {
    updateFilter(false);
  };

  const exportXl = () => {
    if (columnData && columnData?.length > 0) {
      const its: any = [];
      columnData.map((e: any) => {
        its.push({
          'Employee Code': e?.emp_code,
          'Employee Name': e?.travel_requested_for,
          'Request No': e?.name,
          'Request Date': e?.travel_request_date,
          'Estimated Amount': e?.estimated_cost,
          Status: e?.status,
        });
      });
      handleExport(columnData);
    }
  };

  const handleChange = (e: any,type:string) => {
    
    const filters = type === "status" ? {status : e}:{};
    const search = type === "search" ? {e} : {}
    
    setSearchItem(search?.e)
    setFilteredData(filters)
   getTableResponse(filters,paginationData?.current_page,paginationData?.page_length,search?.e)
  };

  const handleSearch = (e:any) => {
    
    setSearchItem(e);
    getTableResponse(filteredData, paginationData?.current_page, paginationData?.page_length, e)
  }

  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse(filteredData, current_page, page_length, searchItem);
    setPaginationData({...paginationData, current_page, page_length })
  }

  return (
    <div>
      {/* <Drawer
        handleClose={handleClose}
        open={filter}
        appname="htssuite"
        fields={filterData}
        handleFilter={handleFilter}
      />
      {filterData && (
        <SmnlFormDynamicLayout
          sectionData={filterData}
          onChange={handleChange}
          appname={'htssuite'}
        />
      )} */}
      <Filter handleChange={handleChange} exportXl={exportXl} serachPlaceholder="Search" handleSearch={handleSearch} />
      <SmnlTable
        dataSource={columnData}
        column={column}
        handlePageRelod={handlePageRelod}
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
      ></SmnlTable>
    </div>
  );
};

export default Create;
