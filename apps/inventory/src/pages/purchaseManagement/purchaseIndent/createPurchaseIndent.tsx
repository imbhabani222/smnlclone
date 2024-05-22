import { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams } from 'react-router-dom';

import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import {
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';

type Props = {
  doc_id: string | null;
  setDoc_id: any;
  switchToNextTab?: any;
  url?: string;
};

const Create = (props: Props) => {
  const { switchToNextTab = () => {} } = props;

  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    upload_doc: '',
  });
  const [imageData, setimageData] = useState<any>({});

  const [searchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Inventory Purchase Indent', 'htssuite').then((items) => {
      const da: any = [];

      items.map((e: any) => {
        if (e?.name !== 'products' && e?.name !== 'upload_doc') {
          da.push(e);
        } else if (e?.name === 'upload_doc') {
          da.push({
            ...e,
            description: { 
              accept:
              'application/pdf',
            fileType: 'Only .pdf',
            type: 'application/pdf',
            },
          });
        }
      });

      setformData(da);
    });
    if (term) {
      const data = { name: term };
      getRecordById(
        'inventory_purchase_indent',
        data,
        'inventory_purchase_management',
        'htsinventory'
      ).then((items) => {
        setformValue({
          ...items,
          // indent_date: datetoFrom(items?.indent_date),
          active: items?.active === 1 ? true : false,
        });
      });
    }
  }, [term]);

  const handleFinish = (e: any) => {
    console.log(e,"finish")
    let values={...e,upload_doc:undefined}
    if(e?.upload_doc?.length > 0){
      values ={...e,upload_doc:e?.upload_doc}
    }
    if (term) {
      const record = {
        name: term,
        data: {
          ...values,
          // indent_date: dateFormat(e?.indent_date),
          // active: values?.active ? 1 : 0,
          upload_doc: values?.upload_doc,
        },
      };

      updateRecord(
        'inventory_purchase_indent',
        record,
        'inventory_purchase_management',
        'htsinventory'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/indent-product', items?.data?.id);
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...values,
        // indent_date: dateFormat(values?.indent_date),
        // active: values?.active ? 1 : 0,
        upload_doc: values?.upload_doc,
      };

      createRecord(
        'inventory_purchase_indent',
        record,
        'inventory_purchase_management',
        'htsinventory'
      ).then((items) => {
        isSuccess(items?.message, 'success');
        switchToNextTab('/indent-product', items?.data?.id);
      });
    }
  };

  const handleImageUpload = (e: any) => {
    setimageData(e);
    setformValue({
      ...formValue,
      upload_doc: e?.originalfile || null,
    });
  };

  return (
    <div>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        dynamicLayout
        submitButtonLabel="Save & Continue"
        handleImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default Create;
