import React, { useEffect, useState } from 'react';
import { Switch,  Space} from 'antd';
import styles from '../Checkbox/checkboxfield.module.scss';

const CheckboxField = (props: any) => {
  const { onChange = () => {}, checked, label, disabled } = props;
  const [chec, setChecked] = useState<any>(false);
  const handleChange = (e: any) => {
    onChange(e);
    setChecked(e.target.checked || e);
  };
  useEffect(() => {
    setChecked(checked);
  }, [checked]);
  return (
    <div className={styles.common_checkbox_btn}>
      <Space direction="vertical">
      <Switch checkedChildren = 'New' unCheckedChildren = "Old" disabled={disabled || false} {...props} onChange={handleChange} defaultChecked checked={chec} />
    
    </Space>
    </div>
  );
};

export default CheckboxField;
