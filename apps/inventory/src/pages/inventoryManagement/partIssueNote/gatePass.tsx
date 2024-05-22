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
import Message from '../../../../../../libs/common/ui/Message/message';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import ButtonField from '../../../../../../libs/common/ui/Button/buttonField';
import { Button, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalField from '../../../../../../libs/common/ui/Modal/modal';
import { dateFormat } from '../../../../../../libs/common/utils/common';

const Create = () => {
  const navigate = useNavigate();

  const [formData, setformData] = useState([]);

  const [reload, setReload] = useState(false);
  const [loading, setloading] = useState(true);
  const [searchParams, _] = useSearchParams();
  const [formValue, setformValue] = useState({});
  const [productsDetails, setProductDetails] = useState<any>([]);
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Inventory GRN Gate Pass', 'htssuite').then((items) => {
      const indentNumberIdx = items?.findIndex(
        ({ name }: any) => name === 'indent_no'
      );
      const indentNumberItem = items?.filter(
        ({ name }: any) => name === 'indent_no'
      )[0];

      getTableData(
        'inventory_purchase_indent',
        'inventory_purchase_management',
        'htsinventory'
      ).then((response: any) => {
        const purchaseIndentOptions = response?.map((item: any) => ({
          label: item.name,
          value: item.name,
        }));

        const newIndetData = {
          ...indentNumberItem,
          datatype: 'MultiSelect',
          options: purchaseIndentOptions,
        };
        const updatedFormData: any = [...items];
        updatedFormData[indentNumberIdx] = newIndetData;
        setformData(updatedFormData);
      });

      setloading(false);
    });
  }, [term, reload]);

  const handleFinish = (e: any) => {
    const record = {
      name: term,
      data: {
        gate_pass: [
          {
            ...e,
            gate_pass_date: dateFormat(e?.gate_pass_date),
            lr_date: dateFormat(e?.lr_date),
          },
        ],
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
        navigate('/view-part-issue-note-register');
      } else {
        isSuccess(items?.message, 'error');
      }
      // setReload((pre: any) => !pre);
    });
  };

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
  //     console.log(fieldName, e, 'dsmkfsmkfmsdkf');
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
    <div>
      <Spin loading={loading} />
      <FormWrapper
        multiple={true}
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        reset={true}
        dynamicLayout={true}
        // onChange={formChangeHandler}
      />
    </div>
  );
};

export default Create;
