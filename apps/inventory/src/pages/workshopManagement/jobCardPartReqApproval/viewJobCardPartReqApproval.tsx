import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,
} from '../../../../../../libs/common/api/doctype';
import Cookies from 'universal-cookie';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';

const ViewAssetRequest = () => {
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [nestedcolumns, setNestedcolumns] = useState<any>([]);
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [paginationData, setPaginationData] = useState<any>({
    page_length: pageSize || 10,
    current_page: 1,
  });

  const getTableDetails = (current_page: number, page_length: number) => {
    getTableDataWithPagination(
      'inventory_job_card_part_request',
      'inventory_workshop_management',
      current_page,
      page_length,
      'htsinventory',
      JSON.stringify({ status: 'Active' })
    ).then((items: any) => {
      const data = items?.data?.map((record: any) => ({
        ...record,
      }));
      if (items?.message !== 'No records found') {
        setdata(data);
        setPaginationData({
          total_records: items?.total_records,
          page_length: items?.page_length,
          current_page: items?.current_page,
        });
        // setloading(false);
      } else {
        setdata([]);
        // setloading(false);
      }
    });
  };

  useEffect(() => {
    getDocTypes('Inventory Job Card Part Request', false, 'htssuite').then(
      (items) => {
        let newData = items.filter((item: any) => {
          const reqFields = [
            'job_card',
            'vehicle_no',
            'request_no',
            'part_request',
            'date',
            'remarks',
            'status',
            'action',
          ];
          if (reqFields.includes(item.dataIndex)) {
            return true;
          } else {
            return false;
          }
        });
        const d = [
          {
            dataIndex: 'name',
            key: 'name',
            title: 'Request No.',
          },
          {
            dataIndex: 'vehicle_no',
            key: 'vehicle_no',
            title: 'Vehicle No.',
          },
        ];

        const newItems = [...d, ...newData];

        setcolumns(newItems);
      }
    );

    getTableDetails(paginationData?.current_page, paginationData?.page_length);

    getDocTypes('Inventory PIN Entries', false, 'htssuite').then((items) => {
      const newData: any = items.filter((item: any) => {
        const reqfields = ['part', 'uom', 'required_qty'];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setNestedcolumns(newData);
    });
  }, []);

  const expandedRowRender = (e: any) => {
    console.log(e);
    const prods = e?.products?.map((item: any, idx: any) => ({
      ...item,
      key: idx?.toString(),
      part: item?.part?.name,
      uom: item?.uom?.name,
    }));
    console.log(prods);
    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={nestedcolumns} dataSource={prods} />
      </div>
    );
  };

  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    getTableDetails(current_page, page_length);
    setPaginationData({ ...paginationData, current_page, page_length });
  };

  return (
    <div>
      <Table
        column={columns}
        dataSource={data}
        viewUrl="/create-job-card-part-req-approve"
        expandable={{ expandedRowRender }}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        onChangePagination={onHandleChangePagination}
        noBlockView= 'Active'
      />
    </div>
  );
};

export default ViewAssetRequest;
