import React, { useEffect, useState, useContext } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,getSearchData 
} from '../../../../../../libs/common/api/doctype';
import { Row, Col } from "antd";
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { Context } from '../../../../../../libs/common/context/context';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Drawer from '../../../../../../libs/common/ui/Drawer/drawer';
import InputSearch from '../../../../../../libs/common/ui/InputSearch/inputSearch';
import Cookies from 'universal-cookie';
type Props = {};

 


const View = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);

  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });
  const [searchItem, setSearchItem] = useState(null);
  
  // const { exportXl, updateExport, exportData, updateDisbutton } =
  //   useContext(Context);
  
  

  const tableData = (e: any, current_page:number, page_length:number, search:any) => {
    if(search){
      getSearchData('inventory_ledger_group',search,'inventory_account_configuration','htsaccount').then((items:any)=>{
        console.log(items,"itemssss")
        const length=items?.length;
        setdata(items);
        setPaginationData({total_records:length,current_page:1,page_length:10 })
      })
      return
    }
    getTableDataWithPagination('inventory_ledger_group', 'inventory_account_configuration', current_page, page_length, 'htsaccount', JSON.stringify(e), search).then(
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

  useEffect(() => {
    setloading(true);
    getDocTypes('Inventory Ledger Group', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqfields = [
          'ledger_group_name',
          'parent_name',
          'profit_loss_schedule_no',
          'profit_loss_schedule_name',
          'balance_sheet_schedule_no',
          'balance_sheet_schedule_name',
          'mis_report_group_name',
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
    });
    // getTableData(
    //   'inventory_ledger_group',
    //   'inventory_account_configuration',
    //   'htsaccount'
    // ).then((items) => {
    //   setdata(items);
    //   setloading(false);
    // });
    tableData({active:1}, paginationData?.current_page, paginationData?.page_length, searchItem);
  }, []);

  const onHandleChangePagination = (current_page:number, page_length:number) => {
    tableData({active:1}, current_page, page_length, searchItem);
    setPaginationData({...paginationData, current_page, page_length })
  }
  const handleChange = (e:any) => {
    const current_page = 1;
    const page_length = 10;
    tableData({active:1}, current_page, page_length, e)
    setSearchItem(e);
  }

  return (
    <>
      <Spin loading={loading} />
      <div
      className='filters'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          // padding: '15px 20px',
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
             placeholder={'Search by Group Name'}
             />
          </Col>
        </Row>
      </div>
      <Table
        column={columns}
        dataSource={data}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        onChangePagination={onHandleChangePagination}
        editUrl="/edit-ledger-group"
      />
      
    </>
  );
};

export default View;
