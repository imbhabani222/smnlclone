import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
//@ts-ignore
import styles from './inputcsss.module.scss';
import { regexMap } from './inputFieldHelper';

function capitalize(string: any) {
  return string
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
interface DynamicInputFields {
  label: string;
  placeholder: string;
  error?: boolean;
  errorText?: string;
  onChange?: (value: string) => void;
}

const InputField = (props: any) => {
  const { label, placeholder, error, errorText, onChange, fieldData } = props;
  const [inputValue, setInputValue] = useState<String>(
    '' || fieldData?.default
  );
  const customStyle = fieldData?.style || {};
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue[0] === ' ') {
      return; // Don't update the state
    } else if (
      props?.fieldData?.description?.type === 'price' &&
      newValue[0] === '0'
    ) {
      return;
    }
    setInputValue(newValue);
    onChange && onChange(newValue);
  };

  const isType = (e: any, value: any) => {
    if (e) {
      const desc = e;
      if (
        desc?.type === 'gst' ||
        desc?.type === 'gstno' ||
        desc?.type === 'panno' ||
        desc?.type === 'leavecode' ||
        desc?.type === 'pf' ||
        desc.type === 'tan' ||
        desc.type === 'drivingLicense'
      ) {
        return value.toUpperCase();
      } else if (desc?.type === 'email') {
        return value.toLowerCase();
      } else if (desc?.capitalize) {
        return value.toUpperCase();
      }

      if (desc?.type === 'price' && value[0] == '0') {
        return '';
      }
      return capitalize(value);
    }
    return capitalize(value);
  };

  const checkKey = (e: any) => {
    if (e?.target?.value === '' && e?.code === 'Space') {
      return true;
    } else if (props?.fieldData?.description) {
      const desc = props?.fieldData?.description;
      if (regexMap[desc?.type]) {
        if (props?.fieldData?.max && regexMap[desc?.type].test(e.key)) {
          const inputv = inputValue + `${e.key}`;
          if (parseInt(props?.fieldData?.max) < parseInt(inputv)) {
            return true;
          } else {
            return false;
          }
        } else if (!regexMap[desc?.type].test(e.key) && e !== 'Backspace') {
          return true;
        }
      } else if (desc?.type === 'onlychar') {
        if (!/^[a-zA-Z ]*$/i.test(e.key) && e !== 'Backspace') {
          return true;
        }
      } else if (desc?.type === 'leavecode') {
        if (!/^[a-zA-Z ]*$/i.test(e.key) && e !== 'Backspace') {
          return true;
        }
      } else if (desc?.type === 'pf') {
        if (!/^[A-Za-z]{5}\d{17}$/ && e !== 'Backspace') {
          return true;
        }
      } else if (
        desc?.type === 'integer' ||
        desc?.type === 'float' ||
        desc?.type === 'int' ||
        desc?.type === 'Int' ||
        desc?.type === 'pincode' ||
        desc?.type === 'mobile' ||
        desc?.type === 'accountno' ||
        desc?.type === 'esi'
      ) {
        if (props?.fieldData?.max && /^[0-9]*\.?[0-9]*$/i.test(e.key)) {
          const inputv = inputValue + `${e.key}`;
          // @ts-ignore
          // @ts-ignore
          if (parseInt(props?.fieldData?.max) < parseInt(inputv)) {
            return true;
          } else {
            return false;
          }
        } else if (!/^[0-9]*\.?[0-9]*$/i.test(e.key) && e !== 'Backspace') {
          return true;
        }
      } else if (
        desc?.type === 'charandinteger' ||
        desc?.type === 'ifsc' ||
        desc?.type === 'pt' ||
        desc?.type === 'panno' ||
        desc?.type === 'tan' ||
        desc?.type === 'gst' ||
        desc?.type === 'gstno'
      ) {
        if (!/^[A-Za-z0-9 ]+$/i.test(e.key) && e !== 'Backspace') {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  const maxLength = () => {
    if (props?.fieldData?.description) {
      const desc = props?.fieldData?.description;
      return desc?.maxlength || desc?.maxLength || null;
    }
    return null;
  };

  useEffect(() => {
    if (props?.fieldData?.name === 'order_qty') {
      setInputValue(props?.formValue?.order_qty);
    }
  }, [props?.formValue?.order_qty]);
  return (
    <div>
      <Input
        defaultValue={fieldData?.default}
        className={styles.inputField}
        placeholder={
          props?.fieldData?.label ||
          props?.fieldData?.placeholder ||
          placeholder
        }
        value={inputValue}
        {...props}
        onChange={handleInputChange}
        onInput={(e: any) =>
          (e.target.value = isType(
            props.fieldData?.description,
            e.target.value
          ))
        }
        onKeyPress={(event) => {
          if (checkKey(event)) {
            event.preventDefault();
          }
        }}
        disabled={
          props?.fieldData?.disabled || props?.fieldData?.readonly || false
        }
        maxLength={maxLength()}
        max={props?.fieldData?.max}
        style={customStyle}
      />
      {error && inputValue === '' && <div>{errorText}</div>}
    </div>
  );
};

export default InputField;
