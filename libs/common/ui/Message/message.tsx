import React, { useEffect, useCallback } from 'react';
import { message } from 'antd';
import styles from './checkboxfield.module.scss';
export type Iprops = {
  msg: String;
  isSuccess: boolean;
  isError: boolean;
  isWarning: boolean;
  handleQuit?: any;
};
const Message = (props: Iprops) => {
  const { msg, isSuccess, isError, isWarning, handleQuit } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const success = (e: String) => {
    if (isSuccess) {
      messageApi.open({
        type: 'success',
        content: e,
        duration: 5,
      });
      handleQuit();
    }
  };

  const error = (e: String) => {
    isError
      ? messageApi.open({
          type: 'error',
          content: e,
          duration: 5,
        })
      : null;
  };

  const warning = (e: String) => {
    messageApi.open({
      type: 'warning',
      content: e,
    });
    handleQuit();
  };

  const memoized = useCallback(
    () => {
      // the callback function to be memoized
      success(msg);
    },
    // dependencies array
    [isSuccess]
  );

  useEffect(() => {
    if (isSuccess) {
      success(msg);
    } else if (isError) {
      error(msg);
    }
  }, [isSuccess, isError, isWarning, msg]);
  return (
    <>
      {contextHolder}
      {memoized}
    </>
  );
};

export default Message;
