import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getSupplier,
} from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import {
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';
import moment from 'moment';

type Props = {
  doc_id: string | null;
  setDoc_id: any;
  switchToNextTab?: any;
  url?: string;
};

const Create = (props: Props) => {
  const { doc_id, setDoc_id, switchToNextTab = () => {} } = props;
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>();
  const [products, setProducts] = useState({});
  const [GRNDetails, setGRNDetails] = useState<any>([]);

  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Inventory GRN Return', 'htssuite').then((items) => {
      const da: any = [];
        
      items.map((e: any) => {
        if (e?.name !== 'products') {
          da.push(e);
        }
        if(e?.name === 'date'){
          e.readonly = true
        }
      });
      if(term){
        da.forEach((data:any)=>{
          data.readonly = true
        })
      }
      setformData(da);
      setformValue({...formValue, date: moment(new Date()) })
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'inventory_grn_return',
        data,
        'inventory_management',
        'htsinventory'
      ).then((items) => {
        setformValue({
          ...items,
          date: datetoFrom(items?.date),
          invoice_date: datetoFrom(items?.invoice_date),
          active: items?.active === 1 ? true : false,
        });
      });
    }
  }, [term]);



  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          date: dateFormat(e?.date),
          invoice_date: dateFormat(e?.invoice_date),
          // active: e?.active ? 1 : 0,
        },
      };

      updateRecord(
        'inventory_grn_return',
        record,
        'inventory_management',
        'htsinventory'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/add-alt-grn-product', items?.data?.id);
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        date: dateFormat(e?.date),
        invoice_date: dateFormat(e?.invoice_date),
        // active: e?.active ? 1 : 0,
      };

      createRecord(
        'inventory_grn_return',
        record,
        'inventory_management',
        'htsinventory'
      ).then((items) => {
        isSuccess(items?.message, 'success');
        switchToNextTab('/add-alt-grn-product', items?.data?.id);
      });
    }
  };

  // const handleQuit = () => { c
  //   setTimeout(() => {
  //     navigate('/view-purchase-indent-register');

  //   }, 1000);
  // };

  const handleAddProducts = () => {
    getFields('Inventory GRN Return', 'htssuite').then((items) =>
      setformData(items)
    );
  };

  // http://64.227.147.2:8000/api/method/htsinventory.inventory_management.doctype.inventory_good_received_note.api.get_records

  const handleChange = (value: string, fieldName: string) => {
    if (fieldName === 'supplier') {
      setformValue({...formValue, grn_no: []})
      getSupplier(
        value,
        'htsinventory',
        'inventory_good_received_note',
        'inventory_management'
      ).then((items) => {
        const grnNumbers = items?.map((item: any) => ({
          label: item?.name,
          value: item?.name,
        }));
        setGRNDetails(items)
        // if (grnNumbers?.length === 0 || !grnNumbers) {
        //   setformValue((prev:any) => ({ ...prev, grn_no: 'No Grn Found' }));
        // }
      

        const newFormdata:any = formData?.map((item: any) => {
          if (item.name === 'grn_no') {
            return {
              ...item,
              datatype: 'Select',
              description: null,
              options: grnNumbers?.length > 0 ? grnNumbers : [],
            };
          }
          return item;
        }, []);

        setformData(newFormdata);
      });
    }

    if(fieldName === 'grn_no') {
      setformValue({
        ...formValue,
        grn_no : value,
        invoice_date: datetoFrom(GRNDetails.filter((item:any) => item.name === value)?.[0]?.invoice_date),
        invoice: GRNDetails.filter((item:any) => item.name === value)?.[0]?.invoice_no,
        total_value: GRNDetails.filter((item:any) => item.name === value)?.[0]?.total_value
      })
    }
  };

  console.log('items', formData, formValue);

  return (
    <div>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        onChange={handleChange}
        dynamicLayout
      />
    </div>
  );
};

export default Create;
