import React, { useCallback, useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getDocTypes,
  getTableData,
  getSupplierLocation,
  getPIRecordById,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import {
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';

const Create = (props: any) => {
  const { doc_id, setDoc_id, switchToNextTab = () => {} } = props;
  const navigate = useNavigate();

  const [formData, setformData] = useState([]);

  const [reload, setReload] = useState(false);
  const [loading, setloading] = useState(true);
  const [searchParams, _] = useSearchParams();
  const [formValue, setformValue] = useState({});
  const [supplierId, setSupplierId] = useState<any>([]);
  const [productsDetails, setProductDetails] = useState<any>([]);
  const term = searchParams.get('id');

  const getItemNameAndIdx = (fieldName: any, items: any) => {
    const ItemNumberIdx = items?.findIndex(
      ({ name }: any) => name === fieldName
    );
    const ItemNumberItem = items?.filter(
      ({ name }: any) => name === fieldName
    )[0];
    return { ItemNumberIdx, ItemNumberItem };
  };

  useEffect(() => {
    getFields('Inventory Purchase Order', 'htssuite').then((items) => {
      const {
        ItemNumberIdx: indentNumberIdx,
        ItemNumberItem: indentNumberItem,
      } = getItemNameAndIdx('indent_no', items);

      const newitems = items?.map(
        (e: any) => e?.name !== 'products' && { ...e }
      );
      newitems.forEach((item: any) => {
        if (item.name === 'supp_ref_dt') {
          item.options = 'past';
        }
        if(item.name === 'upload_doc'){
         item.description = { 
            accept:
            'application/pdf',
          fileType: 'Only .pdf',
          type: 'application/pdf',
          }
        }
      });
      setformData(newitems);

      // const purchaseIndentOptions = response?.map((item: any) => ({
      //       label: item.name,
      //       value: item.name,
      //     }));

      // const newIndetData = {
      //   ...indentNumberItem,
      //   datatype: 'Select',
      //   options: purchaseIndentOptions,
      // };
      // const updatedFormData: any = [...items];
      // updatedFormData[indentNumberIdx] = newIndetData;
      // const da: any = [];
      // updatedFormData?.map((e: any) => {
      //   if (e?.name !== 'products') {
      //     da.push(e);
      //   }
      // });
      // console.log(da, items);
      // setformData(da);
      // setformData(updatedFormData);

      // getTableData(
      //   'inventory_purchase_indent',
      //   'inventory_purchase_management',
      //   'htsinventory'
      // ).then((response: any) => {
      //   const purchaseIndentOptions = response?.map((item: any) => ({
      //     label: item.name,
      //     value: item.name,
      //   }));

      //   const newIndetData = {
      //     ...indentNumberItem,
      //     datatype: 'Select',
      //     options: purchaseIndentOptions,
      //   };
      //   const updatedFormData: any = [...items];
      //   updatedFormData[indentNumberIdx] = newIndetData;
      //   const da: any = [];
      //   updatedFormData?.map((e: any) => {
      //     if (e?.name !== 'products') {
      //       da.push(e);
      //     }
      //   });
      //   console.log(da, items);
      //   setformData(da);
      //   // setformData(updatedFormData);
      // });

      if (term) {
        const disableBooleanMap: any = {
          // supplier: true,
          // location: true,
          // indent_no: true,
          // suppref_no: true,
        };
        newitems?.forEach((item: any) => {
          if (disableBooleanMap[item.name]) {
            item.disabled = true;
          }
        });
        setformData(newitems);
      }
      setloading(false);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'inventory_purchase_order',
        data,
        'inventory_purchase_management',
        'htsinventory'
      ).then((item: any) => {
        setformValue({
          ...item,
          supp_ref_dt: datetoFrom(item?.supp_ref_dt),
          po_date: datetoFrom(item?.po_date),
          indent_no: JSON.parse(item.indent_no),
          location: item?.location?.name,
          supplier: item?.supplier?.name,
        });
        setSupplierId(item);
      });
    }
  }, [term, reload]);

  const handleFinish = (e: any) => {
    console.log(e, 'finish skfjsdkfjsdflsdfks');
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          supplier: supplierId?.supplier?.id,
          location: supplierId?.location?.id,
          // po_date: dateFormat(e?.po_date),
          indent_no: JSON.stringify(e.indent_no),
          supp_ref_dt: dateFormat(e?.supp_ref_dt),
        },
        products: e.products || [],
      };

      updateRecord(
        'inventory_purchase_order',
        record,
        'inventory_purchase_management',
        'htsinventory'
      ).then((items: any) => {
        if (items?.status === 200) {
          setDoc_id(items?.data?.id);
          isSuccess(items?.message, 'success');
          switchToNextTab('/order-product', items?.data?.id);
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      console.log(e);
      const record = {
        ...e,
        // po_date: dateFormat(e?.po_date),
        indent_no: JSON.stringify(e.indent_no),
        active: e?.active ? 1 : 0,
        supp_ref_dt: dateFormat(e?.supp_ref_dt),
      };
      createRecord(
        'inventory_purchase_order',
        record,
        'inventory_purchase_management',
        'htsinventory'
      ).then((items) => {
        if (items?.status === 200) {
          setDoc_id(items?.data?.id);
          isSuccess(items?.message, 'success');
          switchToNextTab('/order-product', items?.data?.id);
        } else {
          isSuccess(items?.message, 'error');
        }
        setReload((pre: any) => !pre);
      });
    }
  };

  const formChangeHandler = useCallback(
    (e: any, fieldName: any) => {
      if (fieldName === 'supplier') {
        getSupplierLocation(e, 'htsinventory').then((response) => {
          const locationsOptions = response.map((item: any) => ({
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
          };
          const updatedFormData: any = [...formData];
          updatedFormData[locationFieldIndex] = newLocationData;
          setformData(updatedFormData);
        });
      }
      if (fieldName === 'supplier') {
        getPIRecordById(
          'inventory_purchase_indent',
          e,
          'inventory_purchase_management',
          'htsinventory'
        ).then((items) => {
          setProductDetails(items);
        });
      }
    },
    [formData]
  );
  const  onImageUpload = (file:any,exs:any, name:any) => {
    setformValue({...formValue, [name]:file?.originalfile || null})
   }

  return (
    <>
      <Spin loading={loading} />
      <FormWrapper
        multiple={true}
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        submitButtonLabel="Save & Continue"
        reset={true}
        dynamicLayout={true}
        onChange={formChangeHandler}
        handleImageUpload={onImageUpload}
      />
    </>
  );
};

export default Create;
