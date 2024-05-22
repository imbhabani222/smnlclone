import React, { useState, useEffect, useContext, useCallback } from 'react';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Drawer from '../../../../../../libs/common/ui/Drawer/drawer';
import {
  getTableData,
  getDocTypes,
  updateRecord,
  getRecordById,
} from '../../../../../../libs/common/api/doctype';
import { fields, Filter } from '../helper/helper';
import { datetoFrom } from '../../../../../../libs/common/utils/common';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { isSuccess } from '../../../../../../libs/common/ui/Message';

// import { FilterContext } from '../../../../../../libs/common/context/filtercontext';

type Props = {};

const LeaveRequestListing = (props: Props) => {
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);

  const [formValue, setformValue] = useState({
    status: ['in', ['Partial Supplied Order']],
  });

  // const { filter, updateFilter } = useContext<any>(FilterContext);
  const [supplier, setSupplier] = useState<any>([]);
  const [columns, setcolumns] = useState<any>([]);
  const [filterData, setFilerData] = useState<any>({});
  const [formData, setFormData] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
          'status'
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
      label: 'Reason For Short Close',
      name: 'reason_for_short_close',
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
    setFormData(textArea);
  }, []);

  const gettableDatadetails = (e: any) => {
    getTableData(
      'inventory_purchase_order',
      'inventory_purchase_management',
      'htsinventory',
      JSON.stringify(e)
    ).then((items: any) => {
      const newItem = items.map((item: any, index: number) => {
        item.key = item?.name;

        if (item?.supplier) {
          item.supplier = item?.supplier;
        }
        const intNo = JSON.parse(item?.indent_no);
        item.indent_no = intNo.toString();
        return item;
      });
      setTableData(newItem);
      setloading(false);
    });
  };
  const getTableResponse = () => {
    setloading(true);
    const filters = { status: ['in', ['Partial Supplied Order']] };
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
      status: ['in', ['Partial Supplied Order']],
      supplier: selectedSupplier,
    };
    gettableDatadetails(filters);
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
        viewUrl="/shortclose-purchase-order"
      />
      {/* <FormWrapper formData={formData} formValue={formData} handleFinish={handleFinish} submitButtonLabel="Click Clear to Short Close" appname="htsinventory"
        dynamicLayout
/> */}
    </React.Fragment>
  );
};

export default LeaveRequestListing;
