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
import { dateFormat, datetoFrom } from '../../../../../../libs/common/utils/common';
import moment from 'moment';
type Props = { doc_id: any; url?: string; switchToNextTab?: any };

const Create = (props: Props) => {
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
      items.forEach((item: any) => {
        if (item.name === 'gate_pass_date' || item.name === 'gate_pass_no') {
          item.isReq = true;
        }
      });
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

      items.forEach((item: any) => {
        if (item.name === 'gate_pass_date') {
          item.options = 'past';
        }
      });
      items.forEach((item: any) => {
        if (item.name === 'lr_date') {
          item.options = 'past';
        }
      });

      setloading(false);
    });

    if(term) {
      const data = { name: term };

      getRecordById(
        'inventory_good_received_note',
        data,
        'inventory_management',
        'htsinventory'
      ).then((items:any) => {
        setformValue({
          ...formValue,
          ...items?.gate_pass?.[0],
          gate_pass_date: datetoFrom(items?.gate_pass?.[0]?.gate_pass_date),
          lr_date: datetoFrom(items?.gate_pass?.[0]?.lr_date)
        });
      })
    }
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
      'inventory_good_received_note',
      record,
      'inventory_management',
      'htsinventory'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        navigate('/view-grn-register');
      } else {
        isSuccess(items?.message, 'error');
      }
      setReload((pre: any) => !pre);
    });
  };

  const formChangeHandler = useCallback(
    (e: any, fieldName: any) => {
      if (fieldName === 'supplier') {
        getSupplierLocation(e, 'htsinventory').then((response) => {
          const locationsOptions = response.map((item: any) => ({
            label: `${item.name}  ${item.city}`,
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
      if(fieldName === 'gate_pass_date'){
        const formDatas = [...formData];
        formDatas.forEach((item:any)=>{
          if(item.name === "lr_date"){
            item.options = {
              type : 'past',
              value : e || moment(new Date())
            }
          }
        })
        setformValue({...formValue, gate_pass_date: e, lr_date: undefined})
        setformData(formDatas)
      }
      if(fieldName === 'lr_date'){
        const formDatas = [...formData];
        formDatas.forEach((item:any)=>{
          if(item.name === "gate_pass_date"){
            item.options = {
              type : 'past',
              value : e || moment(new Date())
            }
          }
        })
        setformData(formDatas)
        setformValue({...formValue, lr_date: e,})

      }

    },
    [formData]
  );

  console.log(formValue, "***"
  )
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
        onChange={formChangeHandler}
      />
    </div>
  );
};

export default Create;
