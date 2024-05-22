import React, { useState, useEffect } from 'react';

import {
  getDocTypes,
  getRecordById,
  updateRecord,
  getPartReturnProduct,
  getProductsList,
} from '../../../../../../libs/common/api/doctype';

import FormTable from '../../../../../../libs/common/ui/Form_Table/FormTable';
import { getFields } from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';

const AddProductReturn = (props: any) => {
  const [formData, setformData] = useState<any>([]);
  const [formValue, setformValue] = useState<any>([]);
  const [columns, setcolumns] = useState<any>([]);
  const [searchParams] = useSearchParams();
  const [loading, setloading] = useState(true);
  const [reque_no, setReque] = useState<any>();

  const mainId = searchParams.get('id') || '';
  const navigate = useNavigate();

  const getItemNameAndIdx = (fieldName: any, items: any) => {
    const ItemNumberIdx = items?.findIndex(
      ({ name }: any) => name === fieldName
    );
    const ItemNumberItem = items?.filter(
      ({ name }: any) => name === fieldName
    )[0];
    return { ItemNumberIdx, ItemNumberItem };
  };

  const getIssueNo = (fieldName: any, items: any) => {
    const issueNumberidx = items?.findIndex(
      ({ name }: any) => name === fieldName
    );
    const issueNumberItem = items?.filter(
      ({ name }: any) => name === fieldName
    )[0];
    return { issueNumberidx, issueNumberItem };
  };

  useEffect(() => {
    if (mainId) {
      let formItems: any = [];
      getFields('Part Return Note Entries', 'htssuite').then((_items) => {
        setformData(_items);
        formItems = _items;
        const data = { name: mainId };
        formItems.forEach((record: any) => {
          if (record.name === 'return_qty') {
            record.description = {
              type: 'compare_two_values',
              depends: 'issued_qty',
              label: 'Issued Qty'
            };
          } 
        });
        getProductsList(
          'workshop_part_return_note',
          data,
          'inventory_workshop_management',
          'htsinventory'
        ).then((items) => {
          const newData = items.map((item: any, i: any) => {
            item.products = item?.part?.name;
            return item;
          });

          const locationsOptions = items.map((item: any) => ({
            label: item?.name,
            value: item?.id,
          }));

          const locationFieldIndex: any = formItems.findIndex(
            (item: any) => item.name === 'part'
          );
          const locationField: any = formItems.find(
            (item: any) => item.name === 'part'
          );

          const newLocationData = {
            ...locationField,
            datatype: 'Select',
            options: locationsOptions,
          };
          const updatedFormData: any = [...formItems];
          updatedFormData[locationFieldIndex] = newLocationData;

          console.log(updatedFormData);
          setformData(updatedFormData);
        });
      });
      getDocTypes('Part Return Note Entries', false, 'htssuite').then(
        (items) => {
          const nData = [
            {
              title: 'Product',
              key: 'products',
              dataIndex: 'products',
            },
          ];
          const newData: any = items.filter((item: any) => {
            const reqfields = [
              'products',
              'issue_no',
              'issued_qty',
              'return_qty',
              // 'rate',
              'action',
            ];
            if (reqfields.includes(item.dataIndex)) {
              return true;
            } else {
              return false;
            }
          });
          const ndata: any = [...nData, ...newData];
          setcolumns(ndata);
        }
      );
    }
  }, [mainId, reque_no]);

  // useEffect(() => {
  //   console.log(loading);
  // } , [loading])

  const onchangeHandler = (val: any, fieldName: any) => {
    const data = { request_no: mainId, product_id: val };

    if (fieldName === 'part') {
      getPartReturnProduct(
        'workshop_part_return_note',
        data,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items) => {
        setformValue({
          data: {
            ...items,
            godown: items?.godown?.id,
            issued_qty: items?.issued_qty,
            rate: items?.rate,
            products: items?.part?.name,
            part: items?.part?.id,
            product: items?.part,
          },
        });
        const cols: any = formData?.map((item: any) => {
          console.log(item);
          if (item?.name === 'return_qty') {
            return {
              ...item,
              max: items?.issued_qty,
            };
          }
          return item;
        });
        console.log(cols, 'ouwerwrweui');

        setformData(cols);
      });
    }
  };

  const handleFinish = (values: any) => {
    const record = {
      name: mainId,
      data: {
        products: values.map((item: any) => ({
          ...item,
          part: item?.part?.id,
        })),
      },
    };

    updateRecord(
      'workshop_part_return_note',
      record,
      'inventory_workshop_management',
      'htsinventory'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        navigate('/view-part-return-note');
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };

  const formTableEditRow = (items: any) => {
    setformValue({
      data: { ...items, active: items?.active === 1 ? true : false },
    });
  };

  const handleSet = (e: any, data: any, value: any) => {
    e.igst = value?.igst;
    e.cgst = value?.cgst;
    e.sgst = value?.sgst;
    console.log(e, data, value);

    setformValue({
      ...value,
      tabledata: [
        {
          ...e,
          products: value?.products,
          product: value?.product,
          part: { id: value?.product?.id, value: value?.products },
        },
        ...data,
      ],
    });
  };

  return (
    <>
      {/* <Spin loading={loading}/>    */}
      <FormTable
        formValue={formValue?.data}
        formData={formData}
        columns={columns}
        module="inventory_workshop_management"
        doctype="Part Return Note Entries"
        doc_id={mainId}
        handleFinish={handleFinish}
        appname="htsinventory"
        submitButtonLabel="Submit"
        onchangehandler={onchangeHandler}
        tableData={formValue?.tabledata}
        formTableEditRow={formTableEditRow}
        hideSelectData={formValue?.tabledata}
        isSetNew={true}
        handleSet={handleSet}
      />
    </>
  );
};

export default AddProductReturn;
