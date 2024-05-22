import React, { useState, useEffect, useContext, useCallback } from 'react';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Drawer from '../../../../../../libs/common/ui/Drawer/drawer';
import {
  getTableData,
  getDocTypes,
  updateRecord,
  getRecordById,
  getPoCancel,
} from '../../../../../../libs/common/api/doctype';
import { fields, Filter } from '../helper/helper';
import { datetoFrom } from '../../../../../../libs/common/utils/common';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { validJson } from '../../../../../../libs/common/utils/common';

// import { FilterContext } from '../../../../../../libs/common/context/filtercontext';

type Props = {};

const LeaveRequestListing = (props: Props) => {
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>({
    status: 'Approved',
  });
  const [formValue, setformValue] = useState({
    status: 'Requested',
  });

  // const { filter, updateFilter } = useContext<any>(FilterContext);
  const [supplier, setSupplier] = useState<any>([]);
  const [columns, setcolumns] = useState<any>([]);

  const [formData, setFormData] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [nestedcolumns, setNestedcolumns] = useState<any>([]);

  const term = searchParams.get('id');

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedKeys);
    },
  };

  useEffect(() => {
    getDocTypes('Inventory Purchase Order', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqfields = [
          'name',
          'supplier',
          'po_date',
          'indent_no',
          'suppref_no',
          'net_value',
          'action',
          'status',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      const newD = [
        {
          dataIndex: 'name',
          key: 'name',
          title: 'PO No',
        },
      ];
      // newD.push(newData);

      const d = [...newD, ...newData];
      console.log(d);
      setcolumns(d);
      // setcolumns(newData);
    });
  }, []);

  const textArea: any = [
    {
      label: 'Reason For Cancellation',
      name: 'reason_for_cancellation',
      datatype: 'Long Text',
      isReq: true,
      description: '',
      default: '',
      options: null,
      hidden: false,
      depends_on: null,
      readonly: false,
    },
  ];

  useEffect(() => {
    getDocTypes('Inventory Purchase Order', false, 'htssuite').then((items) => {
      let newData = items.filter((item: any) => {
        const reqfields = [
          'name',
          'supplier',
          'po_date',
          'indent_no',
          'suppref_no',
          'net_value',
          'status',
          'action',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      const newD = [
        {
          dataIndex: 'name',
          key: 'name',
          title: 'PO No',
        },
      ];
      // newD.push(newData);

      const d = [...newD, ...newData];
      console.log(d);
      setcolumns(d);

      // setcolumns(newData);
    });
  }, []);

  useEffect(() => {
    setFormData(textArea);
  }, []);

  const gettableDatadetails = (e: any) => {
    console.log('pocancel');
    getPoCancel(
      'inventory_purchase_order',
      'inventory_purchase_management',
      'htsinventory',
      JSON.stringify(e)
    ).then((items: any) => {
      const newItems = items?.map((e: any) => ({
        ...e,
        supplier: e?.supplier?.name,
        location: e?.location?.name,
        indent_no: validJson(e?.indent_no) || '-',
      }));
      setTableData(newItems);
      setloading(false);
    });
  };
  const getTableResponse = () => {
    setloading(true);
    const filters = { status: 'Approved', };
    gettableDatadetails(filters);
  };

  useEffect(() => {
    getTableResponse();
    getSupplierList(null);
  }, []);

  const getSupplierList = (e: any) => {
    getTableData(
      'inventory_supplier_details',
      'inventory_general_setup',
      'htsinventory',
      e
    ).then((item) => {
      setSupplier(
        item.map((data: any) => ({
          label: data.supplier_name,
          value: data.name,
        }))
      );
    });
  };

  const handleSupplierChange = (selectedSupplier: any) => {
    const filters = {
      status: 'Approved',
      supplier: selectedSupplier,
    };
    gettableDatadetails(filters);
  };

  useEffect(() => {
    getDocTypes('Inventory Order Entries', false, 'htssuite').then((items) => {
      const newData: any = items.filter((item: any) => {
        const reqfields = [
          'part',
          'uom',
          'indent_qty',
          'order_qty',
          'rate',
          'amount',
          'discount',
          'tax',
          'net',
          'pending_indent_qty',
        ];
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
    const prods = e?.products?.map((item: any, idx: any) => ({
      ...item,
      key: idx?.toString(),
      part: item?.part?.name,
      uom: item?.uom?.name,
    }));
    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={nestedcolumns} dataSource={prods} />
      </div>
    );
  };

  return (
    <React.Fragment>
      <Spin loading={loading} />
      <Filter
        handleSupplierChange={handleSupplierChange}
        supplierList={supplier}
      />
      <Table
        column={columns}
        dataSource={tableData}
        // rowSelection={rowSelection}
        viewUrl="/cancel-purchase-order-approval"
        noBlockView="Approved"
        expandable={{ expandedRowRender }}
      />
      {/* <FormWrapper
        formData={formData}
        formValue={formData}
        handleFinish={handleFinish}
        submitButtonLabel="Click Clear to Cancellation"
        appname="htsinventory"
        dynamicLayout
      /> */}
    </React.Fragment>
  );
};

export default LeaveRequestListing;
