import { message } from 'antd';

export const isSuccess = (e: string, type: string) => {
  type === 'success'
    ? message.success(e)
    : type === 'error'
    ? message.error(e)
    : message.info(e);
};
