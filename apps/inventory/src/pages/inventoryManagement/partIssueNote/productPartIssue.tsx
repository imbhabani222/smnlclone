import React, { useEffect, useState } from 'react';
import {
  getFields,
  getRecordById,
  getDocTypes,
  updateRecord,
  createRecord,
  getProductsList,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import Message from '../../../../../../libs/common/ui/Message/message';
/* @ts-ignore  */
import FormTable from '../../../../../../libs/common/ui/Form_Table/FormTable';
import { useSearchParams } from 'react-router-dom';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
type Props = { doc_id: any; url?: string; switchToNextTab?: any };
const Create = (props: Props) => {
  const { switchToNextTab = () => {}, doc_id } = props;
  const [searchParams] = useSearchParams();
  const mainId = searchParams.get('id') || '';
  const [formData, setformData] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [formValue, setformValue] = useState({
    name: '',
    data: '',
    tableData: [],
  });
  const [subid, setsubid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getFields('Inventory PIN Entries', 'htssuite').then((items) => {
      const newItems = items?.map((e: any) =>
        e?.name === 'part' ? { ...e, readonly: true } : { ...e }
      );
       newItems.forEach((item:any) => {
        if(item.name === "issued_qty") {
          item.description = {
            ...item.description,
            type: 'compare_two_values',
            label: 'Required Qty',
            depends: 'required_qty',
          }
        }
       })
      setformData(newItems);
    });
    getDocTypes('Inventory PIN Entries', false, 'htssuite').then((items) =>{
      setcolumns(items)

    }
    );

    // if (mainId) {
    //   const data = { name: mainId };
    //   getRecordById(
    //     'inventory_pin_entries',
    //     data,
    //     'inventory_management',
    //     'htsinventory'
    //   ).then((items) => {
    //     console.log(items, 'items');
    //     // setsubid(items?.[0]?.name || null);
    //     setformValue({
    //       ...formValue,
    //       data: items,
    //     });
    //   });
    // }

    const data = { name: mainId };

    getProductsList(
      'inventory_part_issue_note',
      data,
      'inventory_management',
      'htsinventory'
    ).then((items) => {
      setformValue({
        ...formValue,
        // data: {
        //   ...items?.products,
        //   part: items?.products?.part?.name,
        //   uom: items?.products?.uom?.name,
        // },
        tableData: items?.products.map((item: any) => ({
          ...item,
          issued_qty: item.issued_qty
        }))
      });
    });
  }, [mainId]);

  const handleFinish = (values: any) => {
    
    const record = {
      name: mainId,
      data: {
        products: values.map((e: any) => ({
          ...e,
          uom:  e?.uom?.id || e?.uom?.name || e?.uom,
          products: e?.part?.name,
          part: e?.part?.id ||e?.part
        })),
      },
    };
    updateRecord(
      'inventory_part_issue_note',
      record,
      'inventory_management',
      'htsinventory'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        // switchToNextTab('/part-issue-add-get-pass', items?.data?.id);
        navigate('/view-part-issue-note-register');
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };

  const formTableEditRow = (items: any) => {
    const cols: any = formData?.map((item: any) => {
      if (item?.name === 'issued_qty') {
        return {
          ...item,
          max: items?.required_qty,
        };
      }
      return item;
    });
    setformData(cols);
    setformValue({
      ...formValue,
      data: {
        ...items,
        uom: items?.uom?.id || items?.uom?.name || items?.uom ,
        rate: items?.mrp_price || items?.rate,
        pending_qty: items?.pending_order_qty,
        part: items?.part?.id || items?.part,
        parts: items?.part?.id ? items?.part : items?.parts,
        products: items?.products,
      },
    });
  };

  const handleSet = (e: any, data: any, value: any) => {
    e.igst = value?.igst;
    e.cgst = value?.cgst;
    e.sgst = value?.sgst;
    setformValue({
      ...value,
      tableData: [{ ...e, products: value?.products }, ...data],
    });
  };

  return (
    <div>
      <FormTable
        formValue={formValue?.data}
        formData={formData}
        columns={columns}
        module="inventory_management"
        doctype="Inventory PIN Entries"
        doc_id={mainId}
        handleFinish={handleFinish}
        appname="htsinventory"
        submitButtonLabel="Submit"
        formTableEditRow={formTableEditRow}
        tableData={formValue.tableData}
        isSetNew={true}
        handleSet={handleSet}
      />
    </div>
  );
};

export default Create;
