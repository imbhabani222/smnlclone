import Filter from '../../../../../../libs/common/ui/Filter';
import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import Cookies from 'universal-cookie';


const ViewAssetRequest = () => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [paginationData, setPaginationData] = useState<any>({
    page_length:pageSize|| 10,
    current_page: 1,
  });
  const [filterData, setFilterData] = useState<any>({});

  useEffect(() => {
    getDocTypes('Asset Request', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqfields = [
          'asset_name',
          'date_needed',
          'no_of_qty_required',
          // 'action',
          'status',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setcolumns(newData);
    });
    getTableResponse(
      filterData,
      paginationData?.current_page,
      paginationData?.page_length,
      null
    );
  }, []);

  const getTableResponse = (
    e: any,
    current_page: number,
    page_length: number,
    search: any
  ) => {
    getTableDataWithPagination(
      'asset_request',
      'assets_management',
      current_page,
      page_length,
      'htssuite',
      JSON.stringify(e),
      search
    ).then((items: any) => {
      const dat: any = [];
      items?.data.map((e: any) => {
        dat.push({
          ...e,
          asset_name: e?.asset_name?.asset_name,
          email: e?.requested_by?.name,
        });
      });
      setdata(dat);
      setPaginationData({
        total_records: items?.total_count,
        page_length: items?.page_length,
        current_page: items?.current_page,
      });
    });
  };

  const exportXl = () => {
    if (data && data?.length > 0) {
      const its: any = [];
      data.map((e: any) => {
        its.push({
          'Asset Name': e?.asset_name,
          'No of Qty': e?.no_of_qty_required,
          'Date Needed': e?.date_needed,
          Status: e?.status,
        });
      });

      handleExport(its);
    }
  };

  const handleChange = (e: any, key: string) => {
    if (key === 'status') {
      const filters = e ? { status: e } : null;

      getTableResponse(
        filters,
        paginationData?.current_page,
        paginationData?.page_length,
        null
      );
    }
  };

  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getTableResponse(filterData, current_page, page_length, null);
    setPaginationData({ ...paginationData, current_page, page_length });
  };

  return (
    <>
      <Filter
        handleChange={handleChange}
        hideFilter={true}
        exportXl={exportXl}
      />
      <Table
        column={columns}
        dataSource={data}
        viewUrl="/asset-request-approval"
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
      />
    </>
  );
};

export default ViewAssetRequest;
