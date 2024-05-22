import React, { useState, useEffect } from 'react';

import {
  getDocTypes,
  getProductById,
  getProducts,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';

import FormTable from '../../../../../../libs/common/ui/Form_Table/FormTable';
import { getFields } from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AddProductRequest = (props: any) => {
  const [formData, setformData] = useState<any>([]);
  const [formValue, setformValue] = useState<any>([]);
  const [columns, setcolumns] = useState<any>([]);
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [tableData, setTableData] = useState([]);
  const [reload, setReload] = useState(false);
  const mainId = searchParams.get('id') || '';
  const navigate = useNavigate();

  useEffect(() => {
    if (mainId) {
      getFields('Inventory Part Request Entries', 'htssuite').then((_items) => {
        const formItems = [..._items];
        formItems.forEach((record: any) => {
        if (record.name === 'required_qty') {
          record.description = {
            ...record?.description
            // type: 'compare_two_values',
            // label: 'Available Qty',
            // depends: 'available_qty',
          };
        }
        if(record?.name === 'part'){
          record.datatype = 'TableSelect'
          record.description ={
            ...record.description,
            colSpan: '2',
            appname: 'htsinventory',
             search: 'inventory_product_configuration.doctype.inventory_product_master.api.search_product?search='
          }
          record.columns =  [
            {
              title: 'Part',
              dataIndex: 'part_name',
              key: 'part_name',
            },
            {
              title: 'Part Number',
              dataIndex: 'part',
              key: 'part',
            },
          ]
        }
      
      })
        setformData(formItems);

        getDocTypes('Inventory Part Request Entries', false, 'htssuite').then(
          (items) => {
            console.log(items);
            setcolumns(items);
          }
        );
        const data = { name: mainId };
        getRecordById(
          'inventory_job_card_part_request',
          data,
          'inventory_workshop_management',
          'htsinventory'
        ).then((items) => {
          // const { indent_no = null } = items;
          // const data = { name: indent_no };

          // getRecordById(
          //   'inventory_purchase_indent',
          //   data,
          //   'inventory_purchase_management',
          //   'htsinventory'
          // ).then((prods: any) => {
          setTableData(items?.products);
          setformValue({
            ...formValue,
            data: items?.part,
          });
        });
      });
      // });
    }
  }, [mainId, reload]);


  const onchangeHandler = (val: any, fieldName: any) => {
    const data = { name: val };
    if (fieldName === 'part' && val) {
      getRecordById(
        'inventory_product_master',
        data,
        'inventory_product_configuration',
        'htsinventory'
      ).then((items) => {
        console.log(items, 'DDDDDDDD');
        setSelectedProduct(items);
        setformValue({
          data: {
            ...items,
            uom: items?.uom?.id,
            part: items?.name,
            available_qty: items?.avaiable_qty,
            // id: items?.uom,
          },
        });

        const cols: any = formData?.map((item: any) => {
          if (item?.name === 'required_qty') {
            return {
              ...item,
              // max: items?.avaiable_qty,
            };
          }
          return item;
        });
        console.log(cols);

        setformData(cols);
      });
    }
  };


  const handleFinish = (values: any) => {
    console.log(values, formValue, 'vallll');

    const record = {
      name: mainId,
      data: {
        jcp_no: formValue?.job_card,
        products: values?.map((item:any) => ({
          available_qty : item?.available_qty,
          emp_code: item?.emp_code?.name || item?.emp_code,
          part: item?.part?.id || item?.part,
          required_qty: item?.required_qty,
          uom: item?.uom?.id || item?.uom

        })),
      },
    };
   
    updateRecord(
      'inventory_job_card_part_request',
      record,
      'inventory_workshop_management',
      'htsinventory'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        navigate('/view-job-card-part-req');
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };

  const formTableEditRow = (items: any) => {
    setformValue({
      data: {
        ...items,
        active: items?.active === 1 ? true : false,
      },
    });
  };

  const cheackquantity = (newData: any, tableData: any) => {
    if (
      parseInt(newData?.available_qty || 0) < 1 ||
      parseInt(newData?.required_qty) < 1
    ) {
      isSuccess(
        'Requiered Quantity || Available quantity should not be less than 1',
        'error'
      );
    } else if (
      parseInt(newData?.available_qty || 0) < parseInt(newData?.required_qty)
    ) {
      isSuccess('Requiered Quantity is more than available quantity', 'error');
      return false;
    }

    return newData;
  };
  const handleCancel = () => {
    setReload((pre) => !pre);
     navigate(-1);
  };
  console.log(formValue, "***")
  return (
    <>
      <FormTable
        formValue={formValue?.data}
        formData={formData}
        columns={columns}
        module="inventory_workshop_management"
        doctype="Inventory Part Request Entries"
        doc_id={mainId}
        handleFinish={handleFinish}
        appname="htsinventory"
        submitButtonLabel="Submit"
        onchangehandler={onchangeHandler}
        tableData={tableData}
        formTableEditRow={formTableEditRow}
        selectedProduct={selectedProduct}
        handleCancel={handleCancel}
        // checkDuplicateData={cheackquantity}
      />
    </>
  );
};

export default AddProductRequest;
