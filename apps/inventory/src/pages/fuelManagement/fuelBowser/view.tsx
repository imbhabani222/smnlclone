import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableDataWithPagination,
  getTableData
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
    getDocTypes('Fuel Bowser', false, 'htssuite').then((items) => {
        const newData = items.filter((item:any)=>{
          const reqfields = [
            'bowser_no',
            'bowser_capacity',
            'active',
            'action',
          ];
          if (reqfields.includes(item.dataIndex)) {
              return true
          } else {
              return false
          }
      })
      setcolumns(newData);
    });
    getTableData(
      'fuel_bowser',
      'fuel_management',
      'htsinventory'
    ).then((items) => {
      setdata(items);
      setloading(false);
    });

    // getTableDetails(paginationData?.current_page, paginationData?.page_length)

  
  }, []);

  // const getTableDetails = ( current_page:number, page_length:number) => {
  //   setloading(true)
  //   getTableDataWithPagination(
  //     'fuel_bowser',
  //     'fuel_management',
  //     current_page,
  //     page_length,
  //     'htsinventory'
  //   ).then((items) => {
  //     setdata(items?.data);
  //     setPaginationData({ total_records:items?.total_records,page_length:items?.page_length, current_page: items?.current_page })
  //     setloading(false);
  //   });
  // }

  return (
    <div>
      <Spin loading={loading} />
      <Table column={columns} dataSource={data} editUrl="/edit-fuel-bowser" />
    </div>
  );
};

export default View;