import React from 'react';
import { Button } from 'antd';
import styles from './formButton.module.scss';


const ButtonField = (props: any) => {
    console.log(props,"propss");

    function capitalizeFirstLetter(string:any) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
  return (
    <div className={styles.common_button} >
      <Button className={styles.Mainbutton} onClick={props.modalHandler} >
        {props.children || props?.fieldData?.name?.split('_').map(capitalizeFirstLetter).join(' ')}
      </Button>
    </div>
  );
};

export default ButtonField;
