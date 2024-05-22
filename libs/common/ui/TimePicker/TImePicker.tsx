import { TimePicker, Space } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import styles from './index.module.scss';

interface DatepickerProps {
  defaultValue?: string;
  format?: string[];
}
const Datepicker = (props: any) => {
  dayjs.extend(customParseFormat);
  const dateFormatList = props.format || ['DD/MM/YYYY'];

  const handleChange = (value: string) => {
    props?.onChange(dayjs(value, 'HH:mm'));
  };

  return (
    <>
      <TimePicker
        className={styles.datepicker_field}
        defaultValue={
          props.defaultValue
            ? dayjs(props.defaultValue, dateFormatList[0])
            : undefined
        }
        format="HH:mm"
        {...props}
        placeholder={props.placeholder ?? "Select Hr Min"}
        onOk={handleChange}
      />
    </>
  );
};

export default Datepicker;
