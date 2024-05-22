import React, { useContext, useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { Context } from '../../../../../../libs/common/context/context';
import Cookies from 'universal-cookie';


type Props = {};

const ViewAssetMaster = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize|| 10, current_page: 1})
  // @ts-ignore
  const { exportXl, updateExport, exportData } = useContext(Context);

  useEffect(() => {
    const d = true;
    getDocTypes('Assets Master', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqfields = [
          'asset_name',
          'asset_description',
          'department',
          'serial_no',
          'model_no',
          'warranty_expire_date',
          'qty',
          'unit_cost',
          'total_cost',
          'location',
          'brand',
          'active',
          'Action',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setcolumns(items);
    });
    getTableResponse({active:1},paginationData?.current_page,paginationData?.page_length,null)
  }, []);

const getTableResponse = (e:any,current_page:number,page_length:number,search:any)=>{
  getTableDataWithPagination('assets_master','assets_management',current_page,page_length,'htssuite',JSON.stringify(e),search)
  .then((items:any)=>{
    const getData = items?.data.map((e: any) => {
      return {
        ...e,
        brand: e?.brand?.brand_name,
        department: e?.department?.department_name,
        location: e?.location?.location_name,
      };
    });
    setdata(getData)
    setPaginationData({total_records:items?.total_count,page_length:items?.page_length, current_page: items?.current_page })
  })
}

  useEffect(() => {
    if (exportXl && data && data?.length > 0) {
      exportData(data);
      updateExport(false);
    } else {
      // isSuccess("Don't have data to export", 'error');
      updateExport(false);
    }
  }, [exportXl]);


  const onHandleChangePagination = (current_page:number, page_length:number) => {  
    getTableResponse({active:1}, current_page, page_length, null);
    setPaginationData({...paginationData, current_page, page_length })
  }

  return (
    <>
      <Table column={columns} dataSource={data} editUrl="/edit-asset"
      onChangePagination={onHandleChangePagination}
      totalNumberofRecords={paginationData?.total_records}
      currentPage={paginationData?.current_page}
      
      />
    </>
  );
};

export default ViewAssetMaster;
