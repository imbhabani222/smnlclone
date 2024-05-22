import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  updateRecord,
  getTableData,
} from '../../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import {
  setFormData,
  dependOnData,
} from '../../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';
import Spin from '../../../../../../../libs/common/ui/Loader/spinLoader';
type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const [formData, setformData] = useState<any>({
    originalformData: [],
    dependsdata: [],
  });
  const [dependData, setdependData] = useState<any>([]);
  const [formValue, setFormValue] = useState<any>({});
  const [doc_id, setDoc_id] = useState<any>(null);
  const [imageData, setimageData] = useState<any>({});

  useEffect(() => {
    setloading(true);
    getFields('Company Setup', 'htssuite').then((items) => {
      // setformData(items);
      items.forEach((element: any) => {
        if (element.name === 'upload_photo') {
          element.description = {
            accept: 'image/jpeg, image/png',
            fileType: 'Only .jpeg',
            type: 'image/jpeg',
          };
        }
      });
      const data = setFormData(items);

      setformData({
        originalformData: items,
        dependsdata: items,
      });
      setFormValue(data);
      setloading(false);
    });
    getTableData('company_setup', 'master_data', 'htssuite').then((items) => {
      const data = items[0];
      setFormValue({ ...data, state_name: data.state_name.name });
      setDoc_id(data?.name);
    });
  }, []);

  

  const handleFinish = (e: any) => {
    setloading(true);
    if (doc_id) {
      const record = {
        doc_id: doc_id,
        data: {
          ...e,
          active: e?.active ? 1 : 0,
          upload_photo: imageData?.originalfile || formValue?.upload_photo || null,
        },
      };
      updateRecord('company_setup', record, 'master_data', 'htssuite').then(
        (items: any) => {
          setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-company-details');
          } else {
            isSuccess(
              `${items?.error?.fieldname
                .toString()
                ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
              'error'
            );
          }
        }
      );
    } else {
      const record = {
        ...e,
        active: e?.active ? 1 : 0,
        upload_photo: imageData?.originalfile || null,
      };
      createRecord('company_setup', record, 'master_data', 'htssuite').then(
        (items) => {
          setloading(false);
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
            navigate('/view-company-details');
          } else {
            isSuccess(
              `${items?.error?.fieldname
                .toString()
                ?.replace('_', '')} ${items?.error?.Entry.toLowerCase()}`,
              'error'
            );
          }
        }
      );
    }
  };
  const handleImageUpload = (e: any) => {
    
    setimageData({...e,
      originalfile : e ? 'data:image/png;base64,'+e?.file : null
    });
  };

  const handleChange = (e: any) => {
    const data: any = dependOnData(e, dependData);
    setdependData(data);
  };

  return (
    <div style={{ height: '100%' }}>
      <Spin loading={loading} />
      <FormWrapper
        formData={formData?.dependsdata}
        formValue={formValue}
        handleFinish={handleFinish}
        multiple={true}
        appname="htssuite"
        onChange={handleChange}
        handleImageUpload={handleImageUpload}
        dependsData={dependData}
        dynamicLayout
      />
    </div>
  );
};

export default Create;
