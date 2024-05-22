/**
 *All the requiered custom columns should be listed here, SmnlTable compound uses the listed cells to render in the table
 */
import React from 'react';
import { dateFormat, isObject } from '../../../utils/common';
export const DefaultCell: React.FC = (props: any) => {
  const { columnItem, text } = props;
  const getValue = (value: any) => {
    let displayText = value;
    if (isObject(value)) {
      if (columnItem?.key?.includes('date')) {
        displayText = dateFormat(value) || '-';
      } else if (value[columnItem?.dataIndex]) {
        displayText = value[columnItem?.dataIndex];
      } else {
        displayText = value?.name || '-';
      }
    }

    return displayText;
  };
  if (columnItem?.key === 'leave_code') {
    return <span style={{ textTransform: 'uppercase' }}>{getValue(text)}</span>;
  } else if (text) {
    return <>{getValue(text)}</>;
  } else if (columnItem?.key?.includes('colum')) {
    return <></>;
  } else if (text === 0) {
    return <>0</>;
  }
  return <>{'-'}</>;
};
