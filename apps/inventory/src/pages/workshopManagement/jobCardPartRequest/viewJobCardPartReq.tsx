import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  getTableDataWithPagination,
  getPdfData
} from '../../../../../../libs/common/api/doctype';
import Modal from '../../../../../../libs/common/ui/Modal/modal';
import dayjs from 'dayjs';
import Cookies from 'universal-cookie';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import {Filter} from '../helper/workshopFilter';
import moment from 'moment';
import SpinLoader from '../../../../../../libs/common/ui/Loader/spinLoader';

const statusFilterOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Accepted', label: 'Accepted' },
  { value: 'Part Issued', label: 'Part Issued' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Approved', label: 'Approved' },


]



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

  const [loading, setloading] = useState(true);

  const [filterValue, setfilterValue] = useState<any>({ from_date: dayjs().format("YYYY-MM-DD"), to_date: dayjs().format("YYYY-MM-DD") })
  const [searchItem, setSearchItem] = useState(null)
  const [filePerview, setfilePerview] = useState({
    isOpen: false,
    fileUrl: null,
  });

  const getTableDetails = (filters: any = null, current_page: number, page_length: number, searchParams: any = null) => {
    getTableDataWithPagination(
      'inventory_job_card_part_request',
      'inventory_workshop_management',
      current_page,
      page_length,
      'htsinventory',
      JSON.stringify(filters),
      searchParams
    ).then((items: any) => {
      const data = items?.data?.map((record: any) => ({
        ...record,
        date: moment(record?.date).format("DD/MM/YYYY")
      }));
      if (items?.message !== 'No records found') {
        setdata(data);
        setPaginationData({
          total_records: items?.total_records,
          page_length: items?.page_length,
          current_page: items?.current_page,
        });
        setloading(false);
      } else {
        setdata([]);
        setloading(false);
      }
    });
  };

  useEffect(() => {
    getDocTypes('Inventory Job Card Part Request', false, 'htssuite').then(
      (items) => {
        let newData = items.filter((item: any) => {
          const reqFields = [
            'job_card',
            'part_request',
            'vehicle_no',
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
    getTableDetails(filterValue, paginationData?.current_page, paginationData?.page_length, null);
    // getTableData(
    //   'inventory_job_card_part_request',
    //   'inventory_workshop_management',
    //   'htsinventory'
    // ).then((items) => {
    //   const recods = [...items];
    //   recods.forEach((item: any) => {
    //     if (item.status === 'Accepted') {
    //       item.disableEdit = true;
    //     }
    //   });
    //   setdata(items);
    // });

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

  useEffect(() => {
    getTableDetails(filterValue, paginationData?.current_page, paginationData?.page_length, searchItem)

  }, [filterValue])

  const expandedRowRender = (e: any) => {
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
    getTableDetails(filterValue, current_page, page_length, searchItem);
    setPaginationData({ ...paginationData, current_page, page_length });
  };

  const onHandleFilterChange = (value: any, key: string) => {
    if (key === 'status') {
      setfilterValue({
        ...filterValue,
        status: value
      })
    }
    else if (key === 'date') {
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
    else if (key === 'search') {
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
        setSearchItem(value)
        getTableDetails(filterValue, paginationData?.current_page, paginationData?.page_length, value);

      }
      else {
        setSearchItem(null)
        getTableDetails(filterValue, paginationData?.current_page, paginationData?.page_length, null);

      }
    }
  }

  const handlePrintPreview = (e: any) => {
    setloading(true);
    const filters = { name: e?.name };
    getPdfData(
      'inventory_job_card_part_request',
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

  return (
    <div>
      <Filter
        handleChange={onHandleFilterChange}
        serachPlaceholder='Search by JC no., Vehicle no. '
        showAutoComplete={false}
        defaultDate={[dayjs(), dayjs()]}
        //  onSelect={onSelectSearchData}
        filterOptions={statusFilterOptions}
      //  autoCompleteSearchOptions={searchOptions}

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
      <SpinLoader loading={loading} />
      <Table
        column={columns}
        dataSource={data}
        editUrl="/job-card-part-req"
        expandable={{ expandedRowRender }}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        onChangePagination={onHandleChangePagination}
        isEditable={true}
        isPrint={true}
        printPreview={handlePrintPreview}
        blockEdit={['Pending', 'Active', 'Approved']}
      />
    </div>
  );
};

export default ViewAssetRequest;
