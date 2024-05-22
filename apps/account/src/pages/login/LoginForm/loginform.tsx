import React, { useState } from 'react';
import axios from 'axios';
import Message from '../../../../../../libs/common/ui/Message/message';
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
        }
      )
      .then(function (response: any) {
        // handle success
        if (response?.data.message?.status === 'success') {
          const cookies = new Cookies();
          const token = `${response?.data.message?.apikey}:${response?.data.message?.apisecret}`;
          cookies.set('token', token);
          cookies.set('role', response?.data.message?.role);
          cookies.set('userid', response?.data?.message?.userid);
          navigate('/view-state');
        } else {
          setmsg({
            ...msg,
            isError: true,
            desc: response?.data.message?.message,
          });
        }
        // data = response?.data?.message;
        // response?.data?.message?.fields?.map((items: any) =>
        //   data.push({
        //     label: items?.label,
        //     name: items?.fieldname,
        //     datatype: items?.datatype,
        //     options: null,
        //   })
        // );
      })
      .catch(function (error) {
        // handle error

        return error;
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Message
        msg={msg?.desc}
        isSuccess={msg.isSuccess}
        isError={msg.isError}
        isWarning={msg.isWarning}
        // handleQuit={handleQuit}
      />
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
          rules={[{ required: true, message: '' }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: '' }]}
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
