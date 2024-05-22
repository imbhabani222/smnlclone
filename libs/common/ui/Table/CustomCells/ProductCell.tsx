/**
 *All the requiered custom columns should be listed here, SmnlTable compound uses the listed cells to render in the table
 */
import React, { useState } from 'react';
import { dateFormat, isObject } from '../../../utils/common';
import { getTableData, getRecordById } from '../../../api/doctype';
import Table from '../SmnlTable';

import Modal from '../../Modal/modal';
import SmnlTable from '../SmnlTable';

const SupplierCell: React.FC = (props: any) => {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const { columnItem, text, otherRecords } = props;
  const [data, setdata] = useState([]);
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
      title: 'Date',
      dataIndex: 'creation',
      key: 'creation',
    },
    {
      title: 'Batch No',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Order Qty',
      dataIndex: 'inward_qty',
      key: 'inward_qty',
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
    // const filters = JSON.parse({ name: otherRecords?.product?.id });
    const data = { name: otherRecords?.product?.id };

    getRecordById(
      'inventory_stock',
      data,
      'inventory_management',
      'htsinventory'
    ).then((items) => {
      console.log(items);

      setdata(
        items?.stock_data?.map((e: any) => ({
          ...e,
          creation: dateFormat(e?.creation),
          supplier: e?.suppliers?.name,
        }))
      );
    });
  };

  const handleClick = () => {
    setisOpen(true);
    tableData();
  };

  if (text) {
    return (
      <>
        {
          //@ts-ignore
        }{' '}
        <Modal
          isModalOpen={isOpen}
          handleCancel={() => setisOpen(false)}
          width={900}
        >
          <div>
            <b>Product History</b>
          </div>
          <div style={{ margin: '10px 0' }}>
            <b>Product:</b> {text}
          </div>
          <Table
            column={columns}
            dataSource={data}
            // editUrl="/purchase-order"
            // expandable={{ expandedRowRender }}
            // supplierHistory={true}
          />
        </Modal>
        {props?.productLink ? (
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
