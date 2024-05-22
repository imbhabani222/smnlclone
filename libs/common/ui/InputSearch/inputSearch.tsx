import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './inputSearch.module.scss';

interface InputSearchProps {
  placeholder: string;
  onChange: (value: string) => void;
}

const InputSearch = (props: any) => {
  const { placeholder, onChange } = props;
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <Input
        suffix={<SearchOutlined />}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className={styles.inputSearch}
        // {...props}
      />
    </div>
  );
};
export default InputSearch;
