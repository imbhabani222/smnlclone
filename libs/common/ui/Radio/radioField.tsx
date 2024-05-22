import React from "react";
import { Radio } from "antd";
import styles from "./radiofield.module.scss";

const RadioField: React.FC = (props: any) => {
  return (
    <div className={styles.common_radio_btn}>
      <Radio {...props}>{props.children}</Radio>
    </div>
  );
};

export default RadioField;
