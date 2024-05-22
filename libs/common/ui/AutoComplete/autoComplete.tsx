import React, { useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './autoComplete.module.scss';

interface AutoCompleteProps {
  placeholder: string;
  onChange: (value: string) => void;
}

const AutoCompleteSearch = (props: any) => {
  const { placeholder, onChange, options, onSelect } = props;
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: any) => {
    const newValue = e;
    setInputValue(newValue);
    onChange(newValue);
  };

  const onHandleSelect = (data:any) => {
   onSelect(data)
  }
  return (
    <div>
    <AutoComplete
    //   popupMatchSelectWidth={252}
      style={{ width: 300 }}
      options={options}
      onSelect={onHandleSelect}
      onSearch={handleChange}
      allowClear
    >
      <Input
        suffix={<SearchOutlined />}
        placeholder={placeholder}
        // value={inputValue}
        className={styles.inputSearch}
        // {...props}
      />
      </AutoComplete>
    </div>
  );
};
export default AutoCompleteSearch;
