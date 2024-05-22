import React from 'react';
import { isObject } from '../../../common/utils/common';
import styles from './styles.module.scss';

type Props = {
  value: string;
  style: {};
  text: string;
  fieldData?: any;
  formValue?: any;
};

const DisplayText = (props: Props) => {
  const { text = '', style, value = '', fieldData, formValue } = props;
  const getValue = (value: any) => {
    let displayText = value;
    if (isObject(value)) {
      displayText = value[fieldData?.name] ? value[fieldData?.name] : '';
    }
    return displayText;
  };
  return (
    <div style={style} className={styles.mainarea}>
      {fieldData?.name === 'active' ? (
        props?.formValue?.active === 1 ? (
          'Active'
        ) : (
          'Deactive'
        )
      ) : fieldData?.name === 'upload_photo' ? (
        <img src={getValue(value)} style={{ width: '130px' }} />
      ) : (
        getValue(value)
      )}
    </div>
  );
};

export default DisplayText;
