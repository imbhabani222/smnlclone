import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableDataWithPagination
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { Row, Col } from "antd";
import InputSearch from '../../../../../../libs/common/ui/InputSearch/inputSearch';
import Cookies from 'universal-cookie';


type Props = {};
const View = (props: Props) => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);

  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });
  const [searchItem, setSearchItem] = useState(null);

  const tableData = (current_page:number, page_length:number, search:any) => {
    getTableDataWithPagination('inventory_general_ledger', 'inventory_account_configuration', current_page, page_length, 'htsaccount', null, search).then(
      (items: any) => {
        const data = items?.data?.map((record:any)=>({
          ...record,

        }))
        if(items?.message !== "No records found"){
          setdata(data);
          setPaginationData({total_records:items?.total_records,page_length:items?.page_length, current_page: items?.current_page })
          setloading(false);
        }else{
          setdata([])
          setloading(false);
        }
      }
    );
  }; 
  const onHandleChangePagination = (current_page:number, page_length:number) => {
    tableData( current_page, page_length, searchItem);
    setPaginationData({...paginationData, current_page, page_length })
  }
  const handleChange = (e:any) => {
    const current_page = 1;
    const page_length = 10;
    tableData( current_page, page_length, e)
    setSearchItem(e);
  }

  useEffect(() => {
    getDocTypes('Inventory General Ledger', false, 'htssuite').then((items) => {
      
      const newData = items.filter((item: any) => {
        // if (item.dataIndex === 'closing_balance') {
        //   item.title = 'opening balance';
        // }
        const reqfields = [
          'ledger_name',
          'opening_balance',
          'opening_type',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setcolumns(newData);
    });
    tableData( paginationData?.current_page, paginationData?.page_length, null);
  }, []);

  return (
    <>
    <div
      className='filters'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        <Row
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <Col span={6}>
            <InputSearch 
             onChange={(e: any) => handleChange(e)}
             placeholder={'Search by Parent Name'}
             />
          </Col>
        </Row>
      </div>
      <Spin loading={loading} />
      <Table
        column={columns}
        dataSource={data}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        onChangePagination={onHandleChangePagination}
      />
    </>
  );
};

export default View;
