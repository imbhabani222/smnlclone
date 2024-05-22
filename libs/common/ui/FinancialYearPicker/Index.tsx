import React, { useState } from 'react';
import { DatePicker, Select } from 'antd';
import { PlaceHolder } from '../SelectBox/SelectBox';
const { RangePicker } = DatePicker;
const { Option } = Select;
const FinancialYearPicker = (props: any) => {
  const { width = '100%', height = '40px', on } = props;

  return (
    <div>
      <Select
        placeholder={<PlaceHolder text={'select year'} />}
        style={{ width, height }}
        size={'large'}
        {...props}
      >
        {Array.from({ length: 10 }, (_, i) => {
          const year = new Date().getFullYear() - i;
          return (
            <Option key={year} value={year}>
              {`${year}-${year + 1}`}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};
export default FinancialYearPicker;
