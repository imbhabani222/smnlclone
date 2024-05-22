import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import styles from  '../DatePicker/index.module.scss'
import moment from 'moment';

interface DatepickerProps {
  defaultValue?: string;
  format?: string[];
}

const DateAndTimepicker = (props: any) => {
  dayjs.extend(customParseFormat);
  const dateFormatList = props.format || ['DD/MM/YYYY HH:mm:ss'];
  const handleChange = (value: string) => {
    props?.onChange(value);
  };

  const disableDate = (current:any) => {
    const currentDate = new Date();
    if(props.fieldData?.options && typeof props.fieldData?.options === "string") {
      if(props.fieldData?.options === "past") {
        return current && current > moment(currentDate, "YYYY-MM-DD HH:mm:ss")
      }
      if (props.fieldData?.options === 'future') {
        return current && current < moment(currentDate, "YYYY-MM-DD HH:mm:ss").startOf('day');
      }
      if (props.fieldData?.options === 'employee_dob') {
        const eighteenYearsAgo = moment().subtract(18, 'years');
        return current && current > eighteenYearsAgo;
      }
    }
    if( typeof props.fieldData?.options === "object") {
      const { type , value, startDate, endDate } = props.fieldData?.options
      let customDate = moment(value?.$d || value).format("YYYY-MM-DD HH:mm:ss");

    if(type === "past") {
      return current && current.isAfter(moment(customDate, "YYYY-MM-DD HH:mm:ss"), 'day')    }
    if(type === "future") {
      return current && current < moment(customDate, "YYYY-MM-DD HH:mm:ss")
    }
    if(type === "enable_only_two_custom_date"){

      const currentDate = current.startOf('day');
      // return !(currentDate >= moment(startDate?.$d || startDate, 'YYYY-MM-DD').subtract(1, 'day') && 
      //    currentDate <= moment((endDate?.$d || endDate) || moment().add(1, 'year'), 'YYYY-MM-DD'));

      return !(currentDate >= moment(startDate?.$d || startDate, 'YYYY-MM-DD').subtract(1, 'day') && currentDate <= moment(endDate?.$d || endDate , 'YYYY-MM-DD'))
      // const currentMoment = moment(current);
      // const currentDate = currentMoment.startOf('day');
      // const startTime = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
      // const endTime = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
      // return !(currentDate.isSameOrAfter(startTime, 'day') && currentDate.isSameOrBefore(endTime, 'day'));
    }
 
  }
  }
  return (
    <>
      <DatePicker
        className={styles.datepicker_field}
        defaultValue={
          props.defaultValue
            ? dayjs(props.defaultValue, dateFormatList[0])
            : undefined
        }
        showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
        format="DD-MM-YYYY HH:mm"
        {...props}
        onChange={handleChange}
        disabled={props?.fieldData?.disabled || props?.fieldData?.readonly || false}
        disabledDate={disableDate}
        showNow={props?.fieldData?.showNow ?? true}
      />
    </>
  );
};

export default DateAndTimepicker;
