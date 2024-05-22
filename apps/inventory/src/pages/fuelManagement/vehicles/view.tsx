import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Cookies from 'universal-cookie';


type Props = {};

const View = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');

  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);

  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize|| 10, current_page: 1})

  useEffect(() => {
    getDocTypes('Vehicles', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqfields = [
          'door_no',
          'vehicle_capacity',
          'vehicle_model_no',
          'vehicle_make',
          'purchase_date',
          'pin_code',
          'enine_no',
          'chesis_no',
          'status',
          'action',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setcolumns(newData);
    });

    // getTableData('vehicles', 'fuel_management', 'htsinventory').then(
    //   (items) => {
    //     setdata(items);
    //     setloading(false);
    //   }
    // );

        getTableDetails(paginationData?.current_page, paginationData?.page_length)

  }, []);

    const getTableDetails = ( current_page:number, page_length:number) => {
    setloading(true)
    getTableDataWithPagination(
      'vehicles',
      'fuel_management',
      current_page,
      page_length,
      'htsinventory'
    ).then((items) => {
      setdata(items?.data);
      setPaginationData({ total_records:items?.total_records,page_length:items?.page_length, current_page: items?.current_page })
      setloading(false);
    });
  }

  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getTableDetails(current_page, page_length);
    setPaginationData({ ...paginationData, current_page, page_length });
  };

  return (
    <div>
      <Spin loading={loading} />
      <Table column={columns} 
       dataSource={data} 
      editUrl="/edit-vehicles"
      totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        onChangePagination={onHandleChangePagination}
      
      />
    </div>
  );
};

export default View;
