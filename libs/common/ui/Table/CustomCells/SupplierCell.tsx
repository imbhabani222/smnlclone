/**
 *All the requiered custom columns should be listed here, SmnlTable compound uses the listed cells to render in the table
 */
import React, { useState } from 'react';
import { dateFormat, isObject } from '../../../utils/common';
import { getTableData } from '../../../../../libs/common/api/doctype';
import Table from '../../../../../libs/common/ui/Table/SmnlTable';
import Spin from "../../../../../libs/common/ui/Loader/spinLoader";
import Modal from '../../../ui/Modal/modal';
// import SmnlTable from '../SmnlTable';

const SupplierCell: React.FC = (props: any) => {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const { columnItem, text, otherRecords } = props;
  const [data, setdata] = useState([]);
  const [Loader,setLoader] = useState<boolean>(false);
  const getValue = (value: any) => {
    let displayText = value;
    if (isObject(value)) {
      if (columnItem?.key?.includes('date')) {
        displayText = dateFormat(value) || '-';
      } else if (value[columnItem?.dataIndex]) {
        displayText = value[columnItem?.dataIndex];
      } else {
        displayText = value?.name || '-';
      }
    }

    return displayText;
  };
  const columns = [
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Invoice No',
      dataIndex: 'invoice_no',
      key: 'invoice_no',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'invoice_date',
      key: 'invoice_date',
    },
    {
      title: 'Value',
      dataIndex: 'total_value',
      key: 'total_value',
    },
  ];

  const nestedcolumns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Order Qty',
      dataIndex: 'order_qty',
      key: 'order_qty',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'Net',
      dataIndex: 'net',
      key: 'net',
    },
  ];
  const tableData = () => {
    const filters = JSON.stringify({ supplier: otherRecords?.suppliers?.id || otherRecords?.supplier_id || otherRecords?.suppliers });
    setLoader(true);
    getTableData(
      'inventory_good_received_note',
      'inventory_management',
      'htsinventory',
      filters
    ).then((items) => {
      console.log(items);
      setdata(items);
      setLoader(false)
    });
  };

  const handleClick = () => {
    console.log(props);
    setisOpen(true);
    tableData();
  };
  const expandedRowRender = (e: any) => {
    const prods = e?.products?.map((item: any, idx: any) => ({
      ...item,
      key: idx?.toString(),
      product: item?.part?.name,
    }));
    console.log(prods);
    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={nestedcolumns} dataSource={prods} />
      </div>
    );
  };
  if (text) {
    return (
      <>
        {props?.supplierHistory ? (
          <Modal
            isModalOpen={isOpen}
            handleCancel={() => setisOpen(false)}
            width={700}
          >
            <div>
              <b>Last Supplier History</b>
            </div>
            <div style={{ margin: '10px 0' }}>
              <b>Supplier:</b> {text}
            </div>
            <Spin loading = {Loader} />
            <Table
              column={columns}
              dataSource={data}
              editUrl="/purchase-order"
              expandable={{ expandedRowRender }}
              // supplierHistory={true}
            />
          </Modal>
        ) : null}
        {props?.supplierHistory ? (
          <a onClick={() => handleClick()}>{getValue(text)}</a>
        ) : (
          getValue(text)
        )}
      </>
    );
  } else if (columnItem?.key?.includes('colum')) {
    return <></>;
  } else if (text === 0) {
    return <>0</>;
  }
  return <>{'-'}</>;
};
export default SupplierCell;
