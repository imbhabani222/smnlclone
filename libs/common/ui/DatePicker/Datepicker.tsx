import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import styles from './index.module.scss';
import moment from 'moment';

interface DatepickerProps {
  defaultValue?: string;
  format?: string[];
}

const Datepicker = (props: any) => {
  
  dayjs.extend(customParseFormat);
  const dateFormatList = props.format || props?.fieldData?.description?.format || ['DD/MM/YYYY'];
  const handleChange = (value: string) => {
    props?.onChange(value);
  };

  const disableDate = (current: any) => {
    const currentDate = new Date();
    if (
      props.fieldData?.options &&
      typeof props.fieldData?.options === 'string' || props?.disableDate
    ) {
      if (props.fieldData?.options === 'past' || props?.disableDate === 'past') {
        return current && current > moment(currentDate, 'YYYY-MM-DD');
      }
      if (props.fieldData?.options === 'future') {
        return (
          current && current < moment(currentDate, 'YYYY-MM-DD').startOf('day')
        );
      }
      if (props.fieldData?.options === 'employee_dob') {
        const minDate = moment().subtract(100, 'years');
        const maxDate = moment().subtract(18, 'years');
        return current && (current < minDate || current > maxDate);
      }
      if (props.fieldData?.options === 'family_dob') {
        const minDate = moment().subtract(100, 'years');
        return current && (current < minDate || current > currentDate);
      }
    }
    if (typeof props.fieldData?.options === 'object') {
      const { type, value, startDate, endDate } = props.fieldData?.options;
      let customDate = moment(value?.$d || value).format('YYYY-MM-DD');

      if (type === 'past') {
        return (
          current && current.isAfter(moment(customDate, 'YYYY-MM-DD'), 'day')
        );
      }
      if (type === 'future') {

        return current && current < moment(customDate, 'YYYY-MM-DD');
      }
      if (type === 'enable_only_two_custom_date') {
        const currentDate = current.startOf('day');
        return !(
          currentDate >=
            moment(startDate?.$d || startDate, 'YYYY-MM-DD') && currentDate <= moment(endDate?.$d || endDate, 'YYYY-MM-DD')
        );
      }
    }
  };
  return (
    <>
      <DatePicker
        className={styles.datepicker_field}
        defaultValue={
          props?.fieldData?.defaultValue
            ? dayjs(props?.fieldData?.defaultValue, dateFormatList[0])  : props?.defaultValue ? dayjs(props?.defaultValue)
            : undefined
        }
        format={props?.fieldData?.description?.format? props?.fieldData?.description?.format : props?.fieldData?.picker === 'month' ? "MMM" : props?.fieldData?.picker === 'year' ? 'YYYY' : 'DD-MM-YYYY'}
        {...props}
        onChange={handleChange}
        disabled={
          props?.fieldData?.disabled || props?.fieldData?.readonly || false
        }
        disabledDate={disableDate}
        placeholder={props?.fieldData?.placeholder ?? 'Select date'}
        picker={props.fieldData?.picker}
        multiple={false}
      />
    </>
  );
};

export default Datepicker;
