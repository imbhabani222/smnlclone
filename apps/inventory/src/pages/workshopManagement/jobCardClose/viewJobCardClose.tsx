import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  getDocTypes,
  getJobCardClose,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Cookies from 'universal-cookie';
import SpinLoader from '../../../../../../libs/common/ui/Loader/spinLoader';
import Filter from '../../../../../../libs/common/ui/Filter';
// import InventoryFilter from '../../../../../../libs/common/ui/Filter/inventoryFilter';

const nestedcolumns = [
  {
    dataIndex: 'name',
    name: 'name',
    title: 'PART',
    render:(_:any, record:any) => record?.part_name

  },
  {
    dataIndex: 'name',
    name: 'name',
    title: 'UOM',
    render:(_:any, record:any) => record?.uom_name
  },
  {
    dataIndex: 'required_qty',
    name: 'required_qty',
    title: 'REQUIRED QTY',
  },
]

const ViewAssetRequest = () => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');

  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [paginationData, setPaginationData] = useState<any>({ page_length: pageSize || 10, current_page: 1 })
  const [loading, setloading] = useState(true);

  const getTableDetails = (filters:any = null, page_length: number, current_page: number, searchParams:any=null) => {
    getJobCardClose(
      'inventory_job_card_creation.api.job_card_close_get_records',
      'inventory_workshop_management',
      current_page,
      page_length,
      'htsinventory',
      JSON.stringify(filters),
      searchParams
    ).then((items) => {
      if (items.status === 200) {
        setdata(items.data);
        setPaginationData({
          total_records: items?.total_records,
          page_length: items?.page_length,
          current_page: items?.current_page,
        });
        setloading(false);
      } else {
        setloading(false);
      }
      

    });
  }

  useEffect(() => {
    setcolumns([
      {
        dataIndex: 'name',
        name: 'name',
        title: 'JC No.',
      },
      {
        dataIndex: 'date',
        name: 'date',
        title: 'Date',
        render:(_:any, record:any) =>  record?.date ? moment(record?.date).format("DD/MM/YYYY HH:mm:ss") : "-"

      },
      {
        dataIndex: 'priority',
        name:'priority',
        title:'Priority'
      },
      {
        dataIndex: 'driver',
        name:'driver',
        title:'driver'
      },
      {
        dataIndex: 'machanic',
        name:'machanic',
        title:'machanic'
      },
      {
        dataIndex: 'supervisor',
        name:'supervisor',
        title:'supervisor'
      },
      {
        dataIndex: 'vehicle_type',
        name:'vehicle_type',
        title:'vehicle type'
      },
      {
        dataIndex: 'vehicle_no',
        name:'vehicle_no',
        title:'Door No'
      },
  
      {
        dataIndex: 'status',
        name:'status',
        title:'Status'
      },
      {
        dataIndex: 'action',
        name:'action',
        title:'action'
      }
    ]);
    getTableDetails({status:"Approved"}, paginationData?.page_length, paginationData?.current_page)

  }, []);

  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getTableDetails(null, page_length, current_page);
    setPaginationData({ ...paginationData, current_page, page_length });
  };

  const handleChange = (value:any, key:any) => {
    getTableDetails({status:"Approved"}, paginationData?.page_length, paginationData?.current_page, value)
  }
  const expandedRowRender = (e: any) => {
    const prods = e?.products?.map((item: any, idx: any) => ({
      ...item,
    }));
    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={nestedcolumns} dataSource={prods} />
      </div>
    );
  };
  return (
    <div>
      <SpinLoader loading= {loading} />
      <Filter
       handleChange={handleChange}
       serachPlaceholder= "Search by JC.No, Vehicle No"
       isHideStatus={true}
       hideExportExcel = {true}
       />

      <Table 
      column={columns} 
      dataSource={data}
      totalNumberofRecords={paginationData?.total_records}
      currentPage={paginationData?.current_page}
      onChangePagination={onHandleChangePagination}
      viewUrl="/job-card-close"
      noBlockView={'Approved'}
      expandable={{expandedRowRender}}

      />
    </div>
  );
};

export default ViewAssetRequest;
