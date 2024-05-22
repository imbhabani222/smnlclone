import React, { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
//@ts-ignore
import styles from './inputNumber.module.scss';

interface InputNumbersProps {
  min: number;
  max: number;
  defaultValue?: number;
  error?: boolean;
  errorText?: string;
  onChange: (value: number | null) => void;
}

const InputNumbers = (props: any) => {
  const {
    min,
    max,
    defaultValue = min,
    error,
    errorText,
    onChange,
    width = '',
    height = '40px',
    readOnly,
    disabled = false,
  } = props;
  const [numberValue, setNumberValue] = useState<string>(
    defaultValue?.toString()
  );

  const handleNumberChange = (value: number | null) => {
    if (typeof value === 'number') {
      setNumberValue(value?.toString());
    } else {
      setNumberValue('');
    }

    onChange(value);
  };

  useEffect(() => {
    setNumberValue(props.value);
  }, [props.value]);
  const checkMin = (e: any) => {
    if (e?.description) {
      const desc = e?.description;
      return desc?.minValue || 0;
    }
    return 0;
  };

  const checkMax = (e: any) => {
    if (e?.description) {
      const desc = e?.description;
      return desc?.maxValue || undefined;
    }
    return max;
  };

  const checkKey = (e: any) => {
    if (!/^[0-9]*\.?[0-9]*$/i.test(e.key) && e !== 'Backspace') {
      return true;
    }
  };
  return (
    <div>
      <InputNumber
        min={checkMin(props?.fieldData) || 0}
        max={props?.fieldData?.description ? checkMax(props?.fieldData) : max}
        value={parseFloat(numberValue) || defaultValue || props.value}
        onChange={handleNumberChange}
        className={styles.inputNumber}
        style={{ width, height }}
        disabled={props?.fieldData?.disabled || disabled}
        placeholder={props?.fieldData?.label}
        onKeyPress={(event) => {
          if (checkKey(event)) {
            event.preventDefault();
          }
        }}
        readOnly={props?.fieldData?.readonly || readOnly || false}
        // {...props}
      />
      {/* {error && parseInt(numberValue) > 10 && <div>{errorText}</div>} */}
    </div>
  );
};

export default InputNumbers;
