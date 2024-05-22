import { Button, Form } from 'antd';
import React, { useState } from 'react';
//@ts-ignore
import SmnlForm from './SmnlForm';
//@ts-ignore
import style from './SmnlForm.module.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  generateFormData,
  removeEmployeCodeFields,
  removeFields,
} from './FormHelper';
import SmnlFormDynamicLayout from './SmnlFormDynaminLayout';
import { isSuccess } from '../Message';
import { error } from 'console';
import { motion } from 'framer-motion';
import { ButtonClickAnimation } from '../../../../libs/common/utils/animations/variants';
const { Item } = Form;
type Props = {
  formData: any;
  handleFinish?: any;
  formValue: any;
  multiple?: boolean;
  mode?: string;
  reset?: boolean;
  submitButtonLabel?: string;
  cancelButtonLabel?: any;
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
  hideSelectData?: any;
  rejectedReq?: string;
  modalHandler?: any;
  handleCancel?: any;
  showProductlist?: any;
  markasComplete?: boolean;
  markasCompleteButtonLabel?: string;
  onhideCancelButton?: boolean;
  // isSubmitted?: any;
};

const FormWrapper = (props: Props) => {
  const {
    formData = [],
    handleFinish,
    formValue,
    multiple,
    mode = 'edit',
    reset = false,
    submitButtonLabel = 'Submit',
    cancelButtonLabel = 'Cancel',
    removeEmployeeCode = false,
    handleImageUpload,
    dynamicLayout = false,
    onChange = () => {},
    removeFieldsLabel,
    appname,
    dependsData,
    sameAddress,
    handleFormValue,
    isReject,
    rejectButtonLabel = 'Reject',
    disabledButton,
    selectboxValue,
    isError,
    hideSelectData,
    rejectedReq,
    modalHandler,
    handleCancel,
    showProductlist,
    markasCompleteButtonLabel,
    markasComplete,
    onhideCancelButton,
    // isSubmitted,
  } = props;
  const [data, setData] = useState<any>([]);
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const navigate = useNavigate();

  // useEffect(() => {
  //   form.validateFields({ validateOnly: true }).then(
  //     (value) => {
  //       setSubmittable(true);
  //     },
  //     (errorInfo: any) => {
  //       //alert(JSON.stringify(errorInfo));
  //       setSubmittable(false);
  //     }
  //   );
  // }, [values]);

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
    if (form.getFieldValue(rejectedReq)) {
      handleFinish({
        approval_remarks: form.getFieldValue(rejectedReq),
        status: 'Rejected',
      });
      reset && form.resetFields();
    } else {
      isSuccess('Please enter the remarks', 'error');
      form.setFields([
        {
          name: rejectedReq,
          errors: ['Please enter the remarks'],
        },
      ]);
    }
  };
  const markasCompleteFn = () => {
    handleFinish({
      values: form.getFieldsValue(),
      status: 'marksAsComponent',
    });
    reset && form.resetFields();
  };

  const handleSubmit = (values: any) => {
    handleFinish(values);
    reset && form.resetFields();
  };
  const onCancel = () => {
    if (handleCancel) {
      // form.resetFields();
      handleCancel();
      form.resetFields();
      return;
    }
    if (cancelButtonLabel === 'Clear') {
      form.resetFields();
    } else {
      navigate(-1);
    }
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
        modalHandler={modalHandler}
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
        modalHandler={modalHandler}
        {...props}
      />
    );

  const handleChange = (e: any) => {
    // if (sameAddress) {
    const d = form.getFieldValue('same_as_permanent_address');
    if (d) {
      const sameValues = form.getFieldsValue([
        'permanent_street',
        'permanent_door_no',
        'permanent_town_village',
        'permanent_district',
        'permanent__post_office_branch',
        'permanent_mandal',
        'permanent_mobile_no',
        'permanent_state',
        'permanent_country',
        'permanent_pin_code',
      ]);
      form.setFieldsValue({
        // address_line_1: sameValues?.permanent_address_line_1,
        // address_line_2: sameValues?.permanent_address_line_2,
        street: sameValues?.permanent_street,
        post_office_branch: sameValues?.permanent__post_office_branch,
        town_village: sameValues?.permanent_town_village,
        district: sameValues?.permanent_district,
        mandal: sameValues?.permanent_mandal,
        door_no: sameValues?.permanent_door_no,
        mobile_no: sameValues?.permanent_mobile_no,
        // city: sameValues?.permanent_city,
        state: sameValues?.permanent_state,
        country: sameValues?.permanent_country,
        pin_code: sameValues?.permanent_pin_code,
      });
    }
    if (e.target.type === 'checkbox' && !e.target.checked) {
      form.setFieldsValue({
        // address_line_1: null,
        // address_line_2: null,
        // city: null,
        state: null,
        country: null,
        pin_code: null,
        town_village: null,
        door_no: null,
        mobile_no: null,
        mandal: null,
        district: null,
        post_office_branch: null,
        street: null,
      });
    }
    // }

    // if (form)
  };

  // if (isError?.isError) {
  //   console.log(isError);
  //   form.setFields([
  //     {
  //       name: 'order_qty',
  //       errors: ['Please enter the remarks'],
  //     },
  //   ]);
  // }

  return (
    <div className={style.SNMLForm__wrapper}>
      <Form
        className={style.SNMLForm}
        //layout="vertical"
        onFinish={handleSubmit}
        form={form}
        // name="forms"
        onChange={sameAddress && handleChange}
      >
        <div id="formContent" className={style.SNMLForm__content}>
          {multiple ? getMultipleSections(data) : getSingleSection(data)}
        </div>
        {mode !== 'view' && (
          <Item className={style.SNMLForm__actions}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {markasComplete && (
                <motion.div
                  whileHover={'hover'}
                  whileTap={'tap'}
                  variants={ButtonClickAnimation}
                >
                  <Button
                    className={style.SNMLForm__actions__reject}
                    type="default"
                    onClick={() => markasCompleteFn()}
                  >
                    {markasCompleteButtonLabel}
                  </Button>
                </motion.div>
              )}
              {!onhideCancelButton && (
                <motion.div
                  whileHover={'hover'}
                  whileTap={'tap'}
                  variants={ButtonClickAnimation}
                >
                  <Button
                    className={style.SNMLForm__actions__cancel}
                    htmlType="button"
                    onClick={onCancel}
                  >
                    {cancelButtonLabel}
                  </Button>
                </motion.div>
              )}
              {isReject ? (
                <motion.div
                  whileHover={'hover'}
                  whileTap={'tap'}
                  variants={ButtonClickAnimation}
                >
                  <Button
                    className={style.SNMLForm__actions__reject}
                    type="default"
                    value="reject"
                    name="reject"
                    onClick={() => handleReject()}
                  >
                    {rejectButtonLabel}
                  </Button>
                </motion.div>
              ) : null}
              {/* {(isSubmitted?.create || isSubmitted?.write) && ( */}
              <motion.div
                whileHover={'hover'}
                whileTap={'tap'}
                variants={ButtonClickAnimation}
              >
                <Button
                  className={style.SNMLForm__actions__submit}
                  htmlType="submit"
                  type="primary"
                  // disabled={!submittable}
                >
                  {submitButtonLabel}
                </Button>
              </motion.div>
              {/* )} */}
            </div>
          </Item>
        )}
      </Form>
    </div>
  );
};
export default FormWrapper;
