import { Button, Form } from 'antd';
import React, { useState } from 'react';
//@ts-ignore
import SmnlForm from '../Form/SmnlForm';
//@ts-ignore
import style from '../Form/SmnlForm.module.scss';
import twoformTableStyle from './formTable.module.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  generateFormData,
  removeEmployeCodeFields,
  removeFields,
} from '../Form/FormHelper';
import SmnlFormDynamicLayout from '../Form/SmnlFormDynaminLayout';
const { Item } = Form;
type Props = {
  formData: any;
  handleFinish?: any;
  formValue: any;
  multiple?: boolean;
  mode?: string;
  reset?: boolean;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  removeEmployeeCode?: boolean;
  handleImageUpload?: any;
  dynamicLayout?: boolean;
  onChange?: any;
  removeFieldsLabel?: any;
  appname?: string;
  dependsData?: any;
  sameAddress?: any;
  handleFormValue?: any;
  isReject?: boolean;
  rejectButtonLabel?: string;
  selectboxValue?: any;
  disabledButton?: boolean;
  isError?: any;
  removeFooter?: Boolean;
  isformSelect?: Boolean;
};

const FormWrapper = (props: Props) => {
  const {
    formData = [],
    handleFinish,
    formValue,
    multiple,
    mode = 'edit',
    reset = false,
    cancelButtonLabel = 'Cancel',
    removeEmployeeCode = false,
    handleImageUpload,
    dynamicLayout = false,
    onChange = () => {},
    removeFieldsLabel,
    appname,
    dependsData,
    sameAddress,
  } = props;
  const [data, setData] = useState<any>([]);
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const navigate = useNavigate();
  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  useEffect(() => {
    let newdata = formData;
    if (removeEmployeeCode) {
      newdata = removeEmployeCodeFields(newdata);
    }
    if (removeFieldsLabel) {
      newdata = removeFields(newdata, removeFieldsLabel);
    }
    if (multiple) {
      newdata = generateFormData(newdata);
    }
    setData(newdata);
  }, [formData]);

  const handleReject = () => {
    if (form.getFieldValue('remarks')) {
      handleFinish({
        remarks: form.getFieldValue('remarks'),
        status: 'Rejected',
      });
      reset && form.resetFields();
    } else {
      form.setFields([
        {
          name: 'remarks',
          errors: ['Please enter the remarks'],
        },
      ]);
    }
  };
  const handleSubmit = (values: any) => {
    //  handleFinish(values);
    reset && form.resetFields();
  };
  useEffect(() => {
    if (formValue) {
      form.setFieldsValue({
        ...formValue,
      });
    }
  }, [formValue]);

  const getMultipleSections = (data: any) => {
    return (
      <>
        {data.map((sectionData: any, index: number) => {
          return (
            <div key={index} className="SNMLForm__section">
              {dynamicLayout ? (
                <SmnlFormDynamicLayout
                  sectionData={sectionData?.fields}
                  form={form}
                  {...props}
                />
              ) : (
                <SmnlForm
                  sectionData={sectionData?.fields}
                  form={form}
                  {...props}
                />
              )}
            </div>
          );
        })}
      </>
    );
  };
  const getSingleSection = (data: any) =>
    dynamicLayout ? (
      <SmnlFormDynamicLayout
        sectionData={data}
        form={form}
        handleImageUpload={handleImageUpload}
        onChange={onChange}
        appname={appname}
        dependsData={dependsData}
        {...props}
      />
    ) : (
      <SmnlForm
        sectionData={data}
        form={form}
        handleImageUpload={handleImageUpload}
        onChange={onChange}
        appname={appname}
        dependsData={dependsData}
        {...props}
      />
    );

  const handleChange = (e: any) => {
    if (sameAddress) {
      const d = form.getFieldValue('same_as_permanent_address');
      if (d) {
        const sameValues = form.getFieldsValue([
          'permanent_address_line_1',
          'permanent_address_line_2',
          'permanent_city',
          'permanent_state',
          'permanent_country',
          'permanent_pin_code',
        ]);
        form.setFieldsValue({
          address_line_1: sameValues?.permanent_address_line_1,
          address_line_2: sameValues?.permanent_address_line_2,
          city: sameValues?.permanent_city,
          state: sameValues?.permanent_state,
          country: sameValues?.permanent_country,
          pin_code: sameValues?.permanent_pin_code,
        });
      }
      if (e.target.type === 'checkbox' && !e.target.checked) {
        form.setFieldsValue({
          address_line_1: null,
          address_line_2: null,
          city: null,
          state: null,
          country: null,
          pin_code: null,
        });
      }
    }
  };

  return (
    <div className={`${style.SMNLForm__TwoFormWrapper}`}>
      <Form
        className={style.SNMLForm}
        //layout="vertical"
        onFinish={handleFinish}
        form={form}
        // name="forms"
        onChange={handleChange}
      >
        <div className={twoformTableStyle.twoFormContent}>
          {multiple ? getMultipleSections(data) : getSingleSection(data)}
        </div>
      </Form>
    </div>
  );
};

export default FormWrapper;
