import React, { useState } from 'react';
import axios from 'axios';

import { isSuccess } from '../../../../../../libs/common/ui/Message';

import Cookies from 'universal-cookie';
import styles from './loginform.module.scss';

import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });

  const onFinish = (values: any) => {
    //

    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}api/method/htssuite.api.login`,
        {
          ...values,
          userid: values?.username,
          user_belongs_to: ['hrms'],
        }
      )
      .then(function (response: any) {
        if (response?.data?.message?.status === 200) {
          isSuccess(response?.data.message?.message, 'success');
          const cookies = new Cookies();
          const token = `${response?.data.message?.data?.apikey}:${response?.data.message?.data?.apisecret}`;
          cookies.set('token', token);
          cookies.set('role', response?.data.message?.data?.role);
          cookies.set('userid', response?.data?.message?.data?.userid);
          cookies.set('username', response?.data?.message?.data?.username);
          cookies.set('useremail', response?.data?.message?.data?.useremail);
          navigate('/');
        } else {
          isSuccess(response?.data.message?.message, 'error');
        }
      })
      .catch(function (error) {
        isSuccess(error?.response?.data?.message?.message, 'error');
        return error;
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter username' }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter password' }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item className={styles.login_btn}>
          <Button
            type="primary"
            htmlType="submit"
            block
            className={styles.mainButton}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
