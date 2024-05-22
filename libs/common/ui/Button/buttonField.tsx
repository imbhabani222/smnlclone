import React from 'react';
import { Button } from 'antd';
import styles from './buttonfield.module.scss';

const ButtonField = (props: any) => {
  return (
    <div className={styles.common_button}>
      <Button {...props} className={styles.Mainbutton}>
        {props.children}
      </Button>
    </div>
  );
};

export default ButtonField;
