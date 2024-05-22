import React, { useEffect, useState, useCallback } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getPIRecordById,
  getSupplierLocation,
  getLinkValue,
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
  dataOfForm?: any;
};

const Create = (props: Props) => {
  const {
    doc_id,
    setDoc_id,
    switchToNextTab = () => {},
    dataOfForm = {},
  } = props;
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>({
    grade_name: '',
    active: false,
  });
  const [products, setProducts] = useState({});
  const [productsDetails, setProductDetails] = useState<any>([]);

  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    let formItems: any = [];
    const currentDate = moment().format('YYYY/MM/DD');
    getFields('Inventory Good Received Note', 'htssuite').then((items) => {
      const da: any = [];

      items.map((e: any) => {
        if (e?.name !== 'products' && e?.name !== 'gate_pass') {
          da.push(e);
        }
      });
      items.forEach((item: any) => {
        if (item.name === 'invoice_date') {
          item.options = 'past';
        }
      });
      items.forEach((item: any) => {
        if (item.name === 'dc_date') {
          item.options = 'past';
        }
      });
      formItems = da;
      if(term){
        const disableBooleanMap: any = {
          supplier: true,
          location: true,
          po_no: true,
        };
        da?.forEach((item: any) => {
          if (disableBooleanMap[item.name]) {
            item.disabled = true;
          }
        });
      }
      setformData(da);
    });
    if (term) {
      const data = { name: term };
      const disableBooleanMap: any = {
        supplier: true,
        location: true,
        po_no: true,
      };
      getRecordById(
        'inventory_good_received_note',
        data,
        'inventory_management',
        'htsinventory'
      ).then((items) => {
        setformValue({
          ...formValue,
          po_no: [],
          location: '',
        });

        if (items?.supplier) {
          getSupplierLocation(items?.supplier, 'htsinventory').then(
            (response) => {
              const locationsOptions = response?.map((item: any) => ({
                label: `${item.city}`,
                value: item.name,
              }));

              const locationFieldIndex: any = formItems.findIndex(
                (item: any) => item.name === 'location'
              );
              const locationField: any = formItems.find(
                (item: any) => item.name === 'location'
              );

              const newLocationData = {
                ...locationField,
                datatype: 'Select',
                options: locationsOptions,
                placeholder: 'Location',
              };
              const updatedFormData: any = [...formItems];
              updatedFormData[locationFieldIndex] = newLocationData;

              const filters = JSON.stringify({
                supplier: items?.supplier,
                status: ['in', ['Approved', 'Partial Supplied Order']],
              });

              const modulename = {
                modulename: 'inventory_purchase_management',
                linkfield: 'name',
              };
              getLinkValue(
                'inventory purchase order',
                modulename,
                'htsinventory',
                filters
              ).then((items: any) => {
                const locationFieldIndex: any = formItems.findIndex(
                  (item: any) => item.name === 'po_no'
                );
                const locationField: any = formItems.find(
                  (item: any) => item.name === 'po_no'
                );

                const newLocationData = {
                  ...locationField,
                  datatype: 'Select',
                  options: items,
                };
                const updatedForm: any = [...updatedFormData];
                updatedForm[locationFieldIndex] = newLocationData;
                setformData(updatedForm);
              });
            }
          );
        }

        let po_num: any = [];
        if (items.po_no) {
          po_num = JSON.parse(items.po_no);
        }
        setformValue({
          ...items,
          po_no: po_num,
          grn_date: datetoFrom(items?.grn_date),
          invoice_date: datetoFrom(items?.invoice_date),
          dc_date: datetoFrom(items?.dc_date),
          eway_bil_date: datetoFrom(items?.eway_bil_date),
          eway_bill_date: datetoFrom(items?.eway_bill_date),
          active: items?.active === 1 ? true : false,
        });
        console.log(formValue);
      });
    } else {
      setformValue({
        invoice_date: datetoFrom(currentDate),
        dc_date: datetoFrom(currentDate),
      });
    }
  }, [term]);

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          grn_date: dateFormat(e?.grn_date),
          invoice_date: dateFormat(e?.invoice_date),
          dc_date: dateFormat(e?.dc_date),
          eway_bill_date: dateFormat(e?.eway_bill_date),
          active: e?.active ? 1 : 0,
          po_no: JSON.stringify(e?.po_no),
        },
      };

      updateRecord(
        'inventory_good_received_note',
        record,
        'inventory_management',
        'htsinventory'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/add-grn-product', items?.data?.id);
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        grn_date: dateFormat(e?.grn_date),
        invoice_date: dateFormat(e?.invoice_date),
        dc_date: dateFormat(e?.dc_date),
        eway_bill_date: dateFormat(e?.eway_bill_date),
        active: e?.active ? 1 : 0,
        po_no: JSON.stringify(e?.po_no),
      };

      createRecord(
        'inventory_good_received_note',
        record,
        'inventory_management',
        'htsinventory'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/add-grn-product', items?.data?.id, record);
        } else {
          isSuccess(items?.message, 'erro');
        }
      });
    }
  };

  // const handleQuit = () => {
  //   setTimeout(() => {
  //     navigate('/view-purchase-indent-register');

  //   }, 1000);
  // };

  const handleAddProducts = () => {
    getFields('Inventory Good Received Note', 'htssuite').then((items) =>
      setformData(items)
    );
  };
  const formChangeHandler = (e: any, fieldName: any) => {
      if (fieldName === 'supplier') {
        setformValue((prevState:any) => ({
          ...prevState,
          po_no: [],
          location: [],
        }));
        getSupplierLocation(e, 'htsinventory').then((response) => {
          const locationsOptions = response?.map((item: any) => ({
            label: `${item.city}`,
            value: item.name,
          }));

          const locationFieldIndex: any = formData.findIndex(
            (item: any) => item.name === 'location'
          );
          const locationField: any = formData.find(
            (item: any) => item.name === 'location'
          );

          const newLocationData = {
            ...locationField,
            datatype: 'Select',
            options: locationsOptions,
            placeholder: 'Location',
          };
          const updatedFormData: any = [...formData];
          updatedFormData[locationFieldIndex] = newLocationData;

          const filters = JSON.stringify({
            supplier: e,
            status: ['in', ['Approved', 'Partial Supplied Order']],
          });

          const modulename = {
            modulename: 'inventory_purchase_management',
            linkfield: 'name',
          };
          getLinkValue(
            'inventory purchase order',
            modulename,
            'htsinventory',
            filters
          ).then((items: any) => {
            const locationFieldIndex: any = formData.findIndex(
              (item: any) => item.name === 'po_no'
            );
            const locationField: any = formData.find(
              (item: any) => item.name === 'po_no'
            );

            const newLocationData = {
              ...locationField,
              datatype: 'Select',
              options: items,
            };
            const updatedForm: any = [...updatedFormData];
            updatedForm[locationFieldIndex] = newLocationData;

            setformData(updatedForm);
          });
        });
      }
      if (fieldName === 'indent_no') {
        getPIRecordById(
          'inventory_purchase_indent',
          e,
          'inventory_purchase_management',
          'htsinventory'
        ).then((items) => {
          setProductDetails(items);
        });
      }
      // setformValue({
      //   ...formValue,
      //   [fieldName]: e
      // });
      setformValue((prevState:any) => ({
        ...prevState,
        [fieldName]: e

      }));
    }
    

  const onImageUpload = (file: any, ex: any) => {
    setformValue({ ...formValue, upload_document: file?.originalfile || null });
  };

  console.log(formValue, "***")
  return (
    <div>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        dynamicLayout
        submitButtonLabel="Save & Continue"
        onChange={formChangeHandler}
        handleImageUpload={onImageUpload}
      />
    </div>
  );
};

export default Create;
