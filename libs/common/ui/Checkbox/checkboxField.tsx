import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import styles from './checkboxfield.module.scss';

const CheckboxField = (props: any) => {
  const { onChange = () => {}, checked, label, disabled } = props;
  const [chec, setChecked] = useState<any>(false);
  const handleChange = (e: any) => {
    onChange(e);
    setChecked(e?.target?.checked || e);
  };
  useEffect(() => {
    setChecked(checked);
  }, [checked]);
  return (
    <div className={styles.common_checkbox_btn}>
      <Checkbox
        defaultChecked={props?.fieldData?.defaultValue}
        {...props}
        onChange={handleChange}
        checked={chec}
        disabled={disabled || false}
      >
        {label}
      </Checkbox>
    </div>
  );
};

export default CheckboxField;
