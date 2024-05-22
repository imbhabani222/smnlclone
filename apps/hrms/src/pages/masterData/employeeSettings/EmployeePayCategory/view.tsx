import React, { useState, useEffect } from "react";
import { getDocTypes, getTableDataWithPagination } from "../../../../../../../libs/common/api/doctype";
import Spin from "../../../../../../../libs/common/ui/Loader/spinLoader";
import Table from "../../../../../../../libs/common/ui/Table/SmnlTable";
import { amountFormater } from "../../../../../../../libs/common/utils/common";
import Cookies from 'universal-cookie';


const View = () => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
    const [loading, setloading] = useState(false);
    const [columns, setcolumns] = useState([]);
    const [tableData, setTableData] = useState([])
    const [paginationData, setPaginationData] = useState<any>({ page_length:pageSize|| 10, current_page: 1 })

    
    useEffect(()=>{
       setloading(true);
       getDocTypes('Workforce Category', false, 'htssuite').then((items)=>{
        const columnDatas = items.filter((item: any) => {
            const reqfields = ['category_name', 'basic_amount', 'active', 'action'];
            if (reqfields.includes(item.dataIndex)) {
              return true;
            } else {
              return false;
            }
          });
          setcolumns(columnDatas);
       });
       getTableResponse(paginationData?.current_page, paginationData?.page_length)

    },[])

    const getTableResponse = (current_page: number, page_length: number) => {
      getTableDataWithPagination('workforce_category', 'master_data', current_page, page_length, 'htssuite')
        .then((items: any) => {
          const records: any = [...items?.data]
        records.forEach((record: any) => {
              record.basic_amount =  amountFormater.format(record.basic_amount)
         })
        setTableData(records)
          setPaginationData({ total_records: items?.total_count, page_length: items?.page_length, current_page: items?.current_page })
          setloading(false)
        })
    }


    const onHandleChangePagination = (current_page: number, page_length: number) => {
      getTableResponse(current_page, page_length);
      setPaginationData({ ...paginationData, current_page, page_length })
    }

    return (
        <React.Fragment>
            <Spin loading = {loading} />
            <Table column={columns} dataSource={tableData} editUrl="/edit-employee-category"
             onChangePagination={onHandleChangePagination}
             totalNumberofRecords={paginationData?.total_records}
             currentPage={paginationData?.current_page}
            />
        </React.Fragment>
    )

}

export default View;