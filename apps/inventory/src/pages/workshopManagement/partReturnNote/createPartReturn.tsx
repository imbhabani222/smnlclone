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
import moment from 'moment';

const Create = (props: any) => {
  const { doc_id, setDoc_id, switchToNextTab = () => {} } = props;
  const navigate = useNavigate();

  const [formData, setformData] = useState([]);

  const [reload, setReload] = useState(false);
  const [loading, setloading] = useState(true);
  const [searchParams, _] = useSearchParams();
  const [formValue, setformValue] = useState({});
  const term = searchParams.get('id');

  useEffect(() => {
    const currentDate = moment().format('YYYY/MM/DD');
    getFields('Workshop Part Return Note', 'htssuite').then((items) => {
      items.forEach((item: any) => {
        if (item.name === 'return_date') {
          item.options = 'past';
        }
        if(item.name === 'return_by') {
          item.readonly = true
        }
      });
      setformData(items);
      setformValue({
        return_date: datetoFrom(currentDate),
      });
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'workshop_part_return_note',
        data,
        'inventory_workshop_management',
        'htsinventory'
      ).then((item: any) => {
        setformValue({
          ...item,
          return_date: datetoFrom(currentDate),
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
          return_date: dateFormat(e?.return_date),
        },
      };

      updateRecord(
        'workshop_part_return_note',
        record,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items: any) => {
        if (items?.status === 200) {
          setDoc_id(items?.data?.id);
          isSuccess(items?.message, 'success');
          switchToNextTab('/add-part-return-product', items?.data?.id);
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        return_date: dateFormat(e?.return_date),
      };

      createRecord(
        'workshop_part_return_note',
        record,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items) => {
        if (items?.status === 200) {
          setDoc_id(items?.data?.id);
          isSuccess(items?.message, 'success');
          switchToNextTab('/add-part-return-product', items?.data?.id);
        } else {
          isSuccess(items?.message, 'error');
        }
        setReload((pre: any) => !pre);
      });
    }
  };


   const handleChangeData = (value:any, fieldName:any) => {
    if(fieldName === 'request_no') {
      const data = { name: value };
      getRecordById(
        'inventory_part_issue_note',
        data,
        'inventory_management',
        'htsinventory'
      ).then((item: any) => {
        setformValue({
         ...formValue,
         return_by:item.issue_to           
        });
      });
    }
   }

  // const formChangeHandler = useCallback(
  //   (e: any, fieldName: any) => {
  //     if (fieldName === 'supplier') {
  //       getSupplierLocation(e, 'htsinventory').then((response) => {
  //         const locationsOptions = response.map((item: any) => ({
  //           label: `${item.name}  ${item.city}`,
  //           value: item.name,
  //         }));

  //         const locationFieldIndex: any = formData.findIndex(
  //           (item: any) => item.name === 'location'
  //         );
  //         const locationField: any = formData.find(
  //           (item: any) => item.name === 'location'
  //         );

  //         const newLocationData = {
  //           ...locationField,
  //           datatype: 'Select',
  //           options: locationsOptions,
  //         };
  //         const updatedFormData: any = [...formData];
  //         updatedFormData[locationFieldIndex] = newLocationData;
  //         setformData(updatedFormData);
  //       });
  //     }
  //     if (fieldName === 'indent_no') {
  //       getPIRecordById(
  //         'inventory_purchase_indent',
  //         e,
  //         'inventory_purchase_management',
  //         'htsinventory'
  //       ).then((items) => {
  //         setProductDetails(items);
  //       });
  //     }
  //   },
  //   [formData]
  // );

  return (
    <>
      {/* <Spin loading={loading} /> */}
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        onChange={handleChangeData}
        dynamicLayout
      />
    </>
  );
};

export default Create;
