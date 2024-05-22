import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { employeeSelectDropDown } from '../../../../../../libs/common/utils/common'

const Create = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState({
    state_name: '',
    active: false,
    zone: '',
  });
  let [searchParams, setSearchParams] = useSearchParams();
  const [uploadDocument, setUploadDocument] = useState(null);
  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Investment Declaration', 'htssuite').then((items: any) => {
      const fields = items.filter((item: any) => {
        const reqfields: any = [
          'employee_name',
          'section_name',
          'section_item',
          'amount',
          'select_year',
          'upload_document',
        ];
        if (reqfields.includes(item.name)) {
          return true;
        } else {
          return false;
        }
      });
      const updatedFields = fields?.map((items:any)=>{
        if (items.name === 'employee_name') {
          return employeeSelectDropDown(items);
        }
        if (items?.name === 'upload_document') {
          return {
            ...items,
            description: {
              accept:
                'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              fileType: 'Only .pdf',
              type: 'application/pdf',
            },
          }
        }
        return items
      })
      setformData(updatedFields);
    });
    if (term) {
      const data = { name: term };

      getRecordById(
        'investment_declaration',
        data,
        'employee_management',
        'htssuite'
      ).then((items) => {
        setformValue({
          ...items,
          active: items?.active === 1 ? true : false,
        });
      });
    }
  }, [term]);

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        doc_id: term,
        data: {
          ...e,
          employee_name: e.employee_name.name,
          section_name: e.section_name.name,
          section_item: e.section_item.name,
          upload_document: uploadDocument,
        },
      };
      updateRecord(
        'investment_declaration',
        record,
        'employee_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-investment-declaration');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        section_name: e.section_name,
        section_item: e.section_item,
        upload_document: uploadDocument,
      };
      createRecord(
        'investment_declaration',
        record,
        'employee_management',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-investment-declaration');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };
  const onImageUpload = (value: any, key: any) => {
    const { file } = value;
    setUploadDocument(file);
  };
  return (
    <>
      <FormWrapper
        multiple={true}
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htssuite"
        dynamicLayout={true}
        handleImageUpload={onImageUpload}
      />
    </>
  );
};

export default Create;
