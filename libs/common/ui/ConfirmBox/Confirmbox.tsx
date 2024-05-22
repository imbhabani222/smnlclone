import { Button, Space, Modal } from "antd";
import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./Confirmbox.module.scss";

const { confirm } = Modal;

interface ConfirmboxProps {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
}

const Confirmbox: React.FC<ConfirmboxProps> = (props) => {
  const showConfirm = () => {
    confirm({
      title: props.title || "Do you Want to proceed?",
      icon: props.icon || <ExclamationCircleOutlined />,
      onOk: props.onOk,
      onCancel: props.onCancel,
    });
  };

  return (
    <div>
      <Space>
        <Button onClick={showConfirm} className={styles.confirm_button}>
          Confirm
        </Button>
      </Space>
    </div>
  );
};

export default Confirmbox;
