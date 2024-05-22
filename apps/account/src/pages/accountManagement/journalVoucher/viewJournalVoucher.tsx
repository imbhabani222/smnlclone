import React, { useEffect, useState } from 'react';
import {
  deleteRecordById,
  getDocTypes,
  getPdfData,
  getTableData,getTableDataWithPagination
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { datetoFrom } from '../../../../../../libs/common/utils/common';
import { Row, Col,Modal } from "antd";
import InputSearch from '../../../../../../libs/common/ui/InputSearch/inputSearch';
import Cookies from 'universal-cookie';

const View = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(true);
  const cookies = new Cookies();
  const [filePerview, setfilePerview] = useState({
    isOpen: false,
    fileUrl: null,
  });
  const pageSize = cookies.get('pageSize');
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });
  const [searchItem, setSearchItem] = useState(null);

  const tableData = (current_page:number, page_length:number, search:any) => {
    getTableDataWithPagination('journal_voucher', 'account_management', current_page, page_length, 'htsaccount', null, search).then(
      (items: any) => {
        const data = items?.data?.map((record:any)=>{
           return{
           ...record,
           amount : record?.amount
 }
         })
        if(items?.message !== "No records found"){
          setdata(data);
          setPaginationData({total_records:items?.total_records,page_length:items?.page_length, current_page: items?.current_page })
          setloading(false);
        }else{
          setdata([])
          setPaginationData({total_records:items?.total_records,page_length:items?.page_length, current_page: items?.current_page })
          setloading(false);
        }
      }
    );
  }; 
  useEffect(() => {
    setloading(true);
    getDocTypes('Journal Voucher', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqFields = ['voucher_date',  'action'];
        if (reqFields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      newData.unshift({
        dataIndex: 'name',
        key: 'name',
        title: 'Voucher ID',
      });
      const amount = {
        dataIndex: 'amount',
        key: 'amount',
        title: 'Amount',
      }
      newData.splice(newData?.length-1 , 0 ,amount)
      setcolumns(newData);
    });
    
    tableData( paginationData?.current_page, paginationData?.page_length, null);
  }, []);

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

  const handlePrintPreview = (e: any) => {
    setloading(true);
    const filters = { name: e?.name };
    getPdfData(
      'journal_voucher',
      filters,
      'account_management',
      'htsaccount'
    ).then((items) => {
      setfilePerview({
        isOpen: true,
        fileUrl: items?.file,
      });
      setloading(false);
    });
  };

  const deletehandler = (rowNumber: string) => {
    let tempData = [...data];
    // @ts-ignore
    let newtempData = tempData.filter((data) => {
      return data?.name !== rowNumber;
    });
    deleteRecordById(
      'journal_voucher',
      'account_management',
      'htsaccount',
      rowNumber
    ).then((items) => {
      // @ts-ignore
      setmsg(() => {
        const message =
          items?.status !== 'error' ? { isSuccess: true } : { isError: true };
        return {
          ...message,
          desc: items?.message,
        };
      });
    });
    setdata(newtempData);
  };

  return (
    <div>
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
             placeholder={'Search by Voucher Id'}
             />
          </Col>
        </Row>
      </div>
      <Spin loading={loading} />
      <Modal
        open={filePerview?.isOpen}
        footer={null}
        width="70%"
        onCancel={() =>
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
      <Table
        column={columns}
        dataSource={data}
        editUrl="/create-journal-voucher"
        //deletehandler={deletehandler}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        onChangePagination={onHandleChangePagination}
        isPrint={true}
        printPreview={handlePrintPreview}
      />
    </div>
  );
};

export default View;