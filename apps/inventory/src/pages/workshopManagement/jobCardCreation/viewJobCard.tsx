import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import moment from 'moment';
import {
  getDocTypes,
  getTableData,
  searchApi,
  getTableDataWithPagination,
  getPdfData,
  purchaseMangementGetRecords

} from '../../../../../../libs/common/api/doctype';
import Modal from '../../../../../../libs/common/ui/Modal/modal';

import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import {Filter, JobCardFilterData} from '../helper/workshopFilter';
import Cookies from 'universal-cookie';
import SpinLoader from '../../../../../../libs/common/ui/Loader/spinLoader';
import InventoryFilter from '../../../../../../libs/common/ui/Filter/inventoryFilter';
import { handleExportInventory } from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel'
import { isSuccess } from '../../../../../../libs/common/ui/Message';

const statusFilterOptions = [
  { value: 'Closed', label: 'Closed' },
  { value: 'Approved', label: 'Approved' },
]


const ViewAssetRequest = () => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');


  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [searchOptions, setSearchOptions] = useState([])
  const [filterValue, setfilterValue] = useState<any>({from_date: dayjs().format("YYYY-MM-DD"), to_date: dayjs().format("YYYY-MM-DD")})
  const [paginationData, setPaginationData] = useState<any>({ page_length: pageSize || 10, current_page: 1 })
  const [loading, setloading] = useState(false);
  const [searchItem,  setSearchItem] = useState({})
  const [filePerview, setfilePerview] = useState({
    isOpen: false,
    fileUrl: null,
  });
  const [searchProduct, setSearchProduct] = useState<any>({})


  useEffect(() => {
    // getDocTypes('Inventory Job Card Creation', false, 'htssuite').then(
    //   (items) => {
    //     let newData = items.filter((item: any) => {
    //       const reqFields = [
    //         'used_for',
    //         'time_taken',
    //         'complaint',
    //       ];

    //       if (reqFields.includes(item.dataIndex)) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     });
        
    //   }
    // );
    setcolumns([
      {
        dataIndex: 'jc_no',
        name: 'jc_no',
        title: 'JC No.',
      },
      {
        dataIndex: 'date',
        name: 'date',
        title: 'Date',
        render:(_:any, record:any) =>  record?.date ? dayjs(record?.date).format("DD/MM/YYYY HH:mm") : "-"

      },
      {
        dataIndex: 'vehicle_no',
        name:'vehicle_no',
        title:'VEHICLE No.'
      },
      // {
      //   dataIndex: 'used_for',
      //   name:'used_for',
      //   title:'used for'
      // },
      {
        dataIndex: 'job_card_close_time',
        name:'job_card_close_time',
        title:'Close Time',
        render:(_:any, record:any) =>  record?.job_card_close_time ? dayjs(record?.job_card_close_time).format("DD/MM/YYYY HH:mm") : "-"

      },
      {
        dataIndex: 'time_taken',
        name:'time_taken',
        title:'Time Taken',
      },
     {
      dataIndex:'complaint',
      name:'complaint',
      title: 'complaint'
     },
   
      {
        dataIndex: 'status',
        name:'status',
        title:'Status'
      },
      {
        dataIndex: 'action',
        name:'action',
        title:'Atatus'
      }
    ]);
    getTableDetails(null, paginationData?.page_length, paginationData?.current_page, searchItem, searchProduct)
   
  }, []);

  useEffect(()=>{
    getTableDetails(filterValue, paginationData?.page_length, paginationData?.current_page, searchItem, searchProduct)

  },[filterValue])

  const getTableDetails = (filters:any = null, page_length: number, current_page: number, searchParams:any = null, searchProductDetails:any =null) => {
    setloading(true)
    purchaseMangementGetRecords(
      'inventory_job_card_creation',
      'inventory_workshop_management',
      current_page,
      page_length,
      'htsinventory',
      JSON.stringify(filters),
      searchParams,
      searchProductDetails
    ).then((items) => {
      const nItems = items.data.map((e: any) => ({ jc_no: e?.name, ...e }));
      setdata(nItems);
      setPaginationData({ total_records: items?.total_records, page_length: items?.page_length, current_page: items?.current_page })
      setloading(false);

    });
  }

 

  const handleChange = (value:any, key:string) => {
     if(key === 'status'){
      setfilterValue({
        ...filterValue,
        status:value
      })
     }
     else if(key === 'date'){
      setfilterValue({
        ...filterValue,
        from_date: value?.[0]?.toDate()
        ? moment(value?.[0]?.toDate()).format('YYYY-MM-DD')
        : undefined,

      to_date: value?.[1]?.toDate()
        ? moment(value?.[1]?.toDate()).format('YYYY-MM-DD')
        : undefined,
      })
     }
    else if (key === 'search'){
      if (value) {
        // const endPoint = 'htsinventory.inventory_workshop_management.doctype.inventory_job_card_creation.api'
        // const payload = `search_product?search=${value}`
        // searchApi(payload, endPoint).then((items: any) => {
        //   const datas = items.map((item: any) => ({
        //     label: item.name,
        //     value: item.name
        //   }))
        //   setSearchOptions(datas)
        // })
        setSearchItem({search:value})
        getTableDetails(filterValue, paginationData?.page_length, paginationData?.current_page, {search:value}, searchProduct);

      }
      else {
        setSearchItem({})
        getTableDetails(filterValue, paginationData?.page_length, paginationData?.current_page, null, searchProduct);

      }
    }
  }


  const onSelectSearchData = (data:any) => {
    const filterdata = { name: data, ...filterValue }
    setfilterValue({...filterValue, ...filterdata})
    // getTableDetails(JSON.stringify(filterdata), paginationData?.page_length, paginationData?.current_page,);

  }
  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getTableDetails(filterValue, page_length, current_page, searchItem,searchProduct);
    setPaginationData({ ...paginationData, current_page, page_length });
  };

  const handlePrintPreview = (e: any) => {
    setloading(true);
    const filters = { name: e?.name };
    getPdfData(
      'inventory_job_card_creation',
      filters,
      'inventory_workshop_management',
      'htsinventory'
    ).then((items) => {
      setfilePerview({
        isOpen: true,
        fileUrl: items?.file,
      });
      setloading(false);
    });
  };
  const onHandleChangeFilter = (data:any) => {
  
    
    const filterObject = {
      ...filterValue,
      status: data?.status || undefined,
      used_for:data?.used_for || undefined
    }
    const searchProductDetails = {
      product: data?.product || undefined
    }
    setfilterValue(filterObject)
    setSearchProduct(searchProductDetails)

    getTableDetails(filterObject, paginationData?.page_length, paginationData?.current_page, searchItem, searchProductDetails);

  }

  const exportXl = () => {

  if(data?.length> 0) {
    const mapedData = data?.map((e: any) => ({
      'Job Card No': e?.jc_no,
      'date': dayjs(e?.date).format("DD/MM/YYYY HH:mm"),
      'Vehicle no': e?.vehicle_no,
      'Close Time': e?.job_card_close_time,
      'Time Taken': e?.time_taken,
      'complaint': e?.complaint,
      'status': e?.status
    }));
    const name = 'Job Card';
    handleExportInventory(mapedData, 'Job Card', name);
  }
  else {
    isSuccess('No Data Found', 'error')
  }
   
   
  };

  return (
    <div>
       {/* <JobCardFilter
     handleChange={onHandleFilterChange}
     serachPlaceholder= 'Search by JC no., Vehicle no. '
     showAutoComplete={false}
     defaultDate= {[dayjs(), dayjs()]}
    //  onSelect={onSelectSearchData}
     filterOptions={statusFilterOptions}
    //  autoCompleteSearchOptions={searchOptions}

    /> */}
    <InventoryFilter
    formData = {JobCardFilterData}
    onHandleChangeFilter= {onHandleChangeFilter}
    appname='htsinventory'
    showSearch ={true}
    serachPlaceholder= 'Search by JC no., Vehicle no. '
    defaultDate= {[dayjs(), dayjs()]}
    showDateFilter = {true}
    handleChange= {handleChange}
    showExportExcel ={true}
    exportXl={exportXl}
    
   />
     

    <Modal
        isModalOpen={filePerview?.isOpen}
        footer={null}
        width="70%"
        handleCancel={() =>
          setfilePerview({
            ...filePerview,
            isOpen: false,
          })
        }
      >
        <div>
          {filePerview?.fileUrl && (
            <embed
              src={`data:application/pdf;base64,${filePerview?.fileUrl}`}
              style={{ width: '100%', height: '70vh' }}
            />
          )}
        </div>
      </Modal>

    <SpinLoader loading = {loading} />
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-job-card"
        blockEdit={['Approved']}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        onChangePagination={onHandleChangePagination}
        isEditable={true}
        isPrint={true}
        printPreview={handlePrintPreview}


      />
    </div>
  );
};

export default ViewAssetRequest;
