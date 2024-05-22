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
import Cookies from 'universal-cookie';


type Props = {};

const Create = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columnData, setColumnData] = useState<any>([]);
  const [relod, setrelod] = useState<any>(false);
  const [fil, setFilter] = useState<any>(false); 
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
      title: 'Travel Requested for',
      dataIndex: 'travel_requested_for',
      key: 'travel_requested_for',
    },
    {
      title: 'Estimated Cost',
      dataIndex: 'estimated_cost',
      key: 'estimated_cost',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    // {
    //   title: 'Details',
    //   dataIndex: 'Details',
    //   key: 'Details',
    // },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      // align: 'center',
      // module: 'travel_request',
      // doctype: 'travel_requisition',
      // appname: 'htssuite',
    },
  ];

  useEffect(() => {
    getTableResponse(paginationData?.current_page,paginationData?.page_length)
  }, [relod]);

  const getTableResponse = (current_page:number,page_length:number)=>{
 
    getTableDataWithPagination('travel_request','travel_requisition',current_page,page_length,'htssuite')
    .then((items:any)=>{
      {
        const newItem = items?.data.map((item: any) => {
          if (item.travel_requested_for) {
            item.travel_requested_for =
              item.travel_requested_for_name;
          }

          return item;
        });
        setColumnData(newItem);
        setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page })

      }
    })

  }

  const handlePageRelod = () => {
    setrelod((pre: any) => !pre);
  };
  const handleChange = (value: any, name: any) => {
    setFilter((pre: any) => {
      return { ...pre, name: value };
    });
  };

  const handleFilter = (e: any) => {
    updateFilter(false);
    // setloading(true);
    // tableData(e);
  };

  const handleClose = () => {
    updateFilter(false);
  };

  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse(current_page, page_length);
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
      <SmnlTable
        dataSource={columnData}
        column={column}
        handlePageRelod={handlePageRelod}
        viewUrl="/travel-request-approval"
        mode="view"
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
      ></SmnlTable>
    </div>
  );
};

export default Create;
