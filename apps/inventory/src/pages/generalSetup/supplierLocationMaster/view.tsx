import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
type Props = {};

const View = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');

  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);
  const [paginationData, setPaginationData] = useState<any>({ page_length: pageSize || 10, current_page: 1 })

  useEffect(() => {
    getDocTypes('Inventory Supplier Location Master', false, 'htssuite').then(
      (items) => {
        const newData = items.filter((item: any) => {
          const reqfields = [
            'supplier',
            'location_name',
            'city',
            'gst_no',
            'pan_no',
            'active',
            'action',
          ];
          if (reqfields.includes(item.dataIndex)) {
            return true;
          } else {
            return false;
          }
        });

        setcolumns(newData);
      }
    );
    // getTableData(
    //   'inventory_supplier_location_master',
    //   'inventory_general_setup',
    //   'htsinventory'
    // ).then((items) => {
    //   const dat: any = [];
    //   items.map((e: any) => {
    //     dat.push({
    //       ...e,
    //       supplier: e?.supplier?.supplier_name,
    //       state: e?.state?.state_name,
    //     });
    //   });
    //   setdata(dat);
    //   setloading(false);
    // });
    getTableDetails(null, paginationData?.page_length, paginationData?.current_page)

  }, []);

  const getTableDetails = (filters: any = null, page_length: number, current_page: number) => {
    setloading(true)
    getTableDataWithPagination(
      'inventory_supplier_location_master',
      'inventory_general_setup',
      current_page,
      page_length,
      'htsinventory',
      filters
    ).then((items) => {
      if(items.status === 200) {
        const newItems = items?.data?.map((e: any) => ({
          ...e,
          supplier: e?.supplier?.supplier_name,
                state: e?.state?.state_name,
        }));
        setdata(newItems);
        setPaginationData({ total_records: items?.total_records, page_length: items?.page_length, current_page: items?.current_page })
        setloading(false);
      }
      else {
        setdata([]);
        setloading(false)
        setPaginationData({ total_records: 0, page_length: pageSize, current_page: 1 })
      }
    });
  };

  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getTableDetails(null, page_length, current_page,);
    setPaginationData({ ...paginationData, current_page, page_length });
  };

  return (
    <div>
      <Spin loading={loading} />
      <Table
        column={columns}
        dataSource={data}
        editUrl="/edit-supplier-location"
        onChangePagination={onHandleChangePagination}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
      />
    </div>
  );
};

export default View;
