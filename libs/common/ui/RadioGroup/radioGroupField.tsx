import React, { useState } from 'react';
import { Radio } from 'antd';
//@ts-ignore
import styles from './radiogroupfield.module.scss';
import RadioField from '../Radio/radioField';
import type { RadioChangeEvent } from 'antd';
type props = { options: any; onChange: Function; fieldData: any };
const RadioGroupField = (props: props) => {
  let { fieldData, onChange = () => {} } = props;
  const [value, setValue] = useState<any>('');
  const options = fieldData?.options?.split('\n');
  const disabled = fieldData?.disabled || false;
  const handleChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <div className={styles.common_radio_btn_group}>
      <Radio.Group
        disabled={disabled}
        value={value}
        {...props}
        onChange={handleChange}
      >
        {options &&
          options.map((radioprops: any) => {
            return <Radio value={radioprops}>{radioprops}</Radio>;
          })}
      </Radio.Group>
    </div>
  );
};

export default RadioGroupField;
