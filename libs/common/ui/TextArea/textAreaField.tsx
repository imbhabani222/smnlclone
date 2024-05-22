import React, { useState } from 'react';
import { Input } from 'antd';
//@ts-ignore
import styles from './index.module.scss';

const { TextArea } = Input;
type props = { onChange?: any; fieldData?: any };

const TextAreaField = (props: props) => {
  const { onChange = () => {}, fieldData } = props;
  // const [inputValue, setInputValue] = useState<any>('' || fieldData?.default);

  const checkKey: any = (e: any) => {
    if (e?.target?.value === '' && e?.code === 'Space') {
      return true;
    } else {
      return false;
    }
  };
  return (
    <TextArea
      className={styles.textArea}
      placeholder={props?.fieldData?.label || ''}
      {...props}
      onKeyPress={(event) => {
        if (checkKey(event)) {
          event.preventDefault();
        }
      }}
    />
  );
};

export default TextAreaField;
