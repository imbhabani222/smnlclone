import React, { useState } from 'react';
import { Form, Input } from 'antd';
import InputField from '../InputField/inputField';
import SelectBox from '../SelectBox/SelectBox';
import ImageUpload from '../ImageUpload/ImageUpload';
import CheckboxField from '../Checkbox/checkboxField';
import Datepicker from '../DatePicker/Datepicker';
import TimePicker from '../TimePicker/TImePicker';
import InputNumbers from '../InputNumber/inputNumber';
import InputPassword from '../InputPassword/inputPassword';
import InputSearch from '../InputSearch/inputSearch';
import TextAreaField from '../TextArea/textAreaField';
import DisplayText from '../DisplayText/DisplayText';
import ButtonField from '../Form/FormButton';
//@ts-ignore
import styles from './SmnlForm.module.scss';
import RadioGroupField from '../RadioGroup/radioGroupField';
import FinancialYearPicker from '../FinancialYearPicker/Index';
import { defaultPincodeRule, defaultRequiredRule } from './FormHelper';
import FormTable from './FormTable';
import SelectTable from '../SelectBoxTable/Index';
import DateAndTimePicker from '../DateandTimePicker/DateandTimePicker';
import DateRangepicker from '../DateRangePicker/DateRangePicker';
import Switch from '../switch/switch';
import Filter from '../Filter/ReportsFilter';

const { Item } = Form;
type Props = {
  fieldData: any;
  form?: any;
  mode?: string;
  width?: string;
  onChange?: any;
  handleImageUpload?: any;
  appname?: any;
  handleChange?: any;
  dependsData?: any;
  modalHandler?: any;
};

const fieldTypeMap: any = {
  Data: { component: InputField },
  Select: {
    component: SelectBox,
    allowClear: true,
  },
  Link: {
    component: SelectBox,
    allowClear: true,
  },
  LinkSearch: {
    component: SelectBox,
    allowClear: true,
    showSearch: true,
  },
  MultiSelect: { component: SelectBox, SelectMultiple: true, allowClear: true },
  'Attach Image': {
    component: ImageUpload,
  },
  Attach: {
    component: ImageUpload,
  },
  Check: { component: CheckboxField },
  Date: { component: Datepicker },
  Float: { component: InputField },
  Int: { component: InputField },
  Password: { component: InputPassword },
  Time: { component: TimePicker },
  Search: { component: InputSearch },
  'Long Text': {
    component: TextAreaField,
    autoSize: { minRows: 3, maxRows: 5 },
  },
  TextArea: { component: TextAreaField, autoSize: { minRows: 3, maxRows: 5 } },
  'Small Text': { component: RadioGroupField },
  financial_year: { component: SelectBox, allowClear: true },
  table: { component: FormTable },
  TableSelect: { component: SelectTable },
  Button: { component: ButtonField },
  Datetime: { component: DateAndTimePicker },
  DateRange: { component: DateRangepicker },
  Switch: { component: Switch },
  Filter: { component: Filter },
};
const dsplayTextProps = {
  component: DisplayText,
  style: {
    fontFamily: 'Lato',
    color: ' #344054',
    fontSize: '1.05rem',
    fontWeight: ' 500',
    lineHeight: '1em',
  },
};
const FormFields = (props: Props) => {
  const {
    fieldData = [],
    form,
    mode,
    onChange = () => {},
    handleChange,
    modalHandler,
  } = props;
  const [value, setValue] = useState<any>('');

  const handleValue = (e: any, selectBoxOptions: any) => {
    let val = e?.target?.value || e;
    if (fieldData?.datatype === 'Check') {
      val = e?.target?.checked;
    }
    setValue(val);
    onChange && onChange(val, fieldData?.name, e, selectBoxOptions, form);
  };
  const getValidators: any = () => {
    // console.log(fieldData?.description);
    const req: any = defaultRequiredRule(fieldData?.isReq, fieldData);
    const other = defaultPincodeRule(fieldData?.description, fieldData);
    return [...req, ...other];
  };
  const inputProps =
    mode === 'view'
      ? dsplayTextProps
      : fieldTypeMap[
          fieldData?.datatype === 'Long Text'
            ? 'TextArea'
            : fieldData?.datatype === 'Text Editor'
            ? 'Data'
            : fieldData?.description?.type === 'multiselect'
            ? 'MultiSelect'
            : fieldData?.datatype
        ];
  const Component = inputProps?.['component'];
  const name = fieldData?.name;
  return (
    <div
      className="SNMLForm-fields"
      style={{ visibility: fieldData?.visibility }}
    >
      {fieldData?.datatype === 'Check' ? (
        <>
          <Item label="" labelCol={{ span: 24 }}>
            <Item valuePropName="checked" colon={false} name={name} noStyle>
              {Component && (
                <Component
                  {...inputProps}
                  // {...props}
                  onChange={handleValue}
                  label={props?.fieldData?.label}
                  checked={value}
                  value={value}
                  disabled={props.fieldData.disabled || false}
                />
              )}
            </Item>
          </Item>
        </>
      ) : (
        <Item
          labelCol={{ span: 24 }}
          label={fieldData?.label}
          name={fieldData?.name}
          rules={
            //@ts-ignore
            [...getValidators()]
          }
          hidden={
            fieldData?.depends_on
              ? props?.dependsData
                ? props?.dependsData?.find(
                    (i: any) => i === fieldData?.depends_on
                  )
                  ? false
                  : true
                : true
              : false
          }
        >
          {Component && (
            <Component
              {...inputProps}
              {...props}
              disabled={fieldData.disabled}
              onChange={handleValue}
              value={value}
              modalHandler={modalHandler}
            />
          )}
        </Item>
      )}
    </div>
  );
};

export default FormFields;
