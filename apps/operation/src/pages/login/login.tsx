import React from 'react';

import { Row, Col } from 'antd';
import LoginForm from './LoginForm/loginform';
import Logo from 'libs/common/assets/logo.svg';
import LoginImg from 'libs/common/assets/images/Login_main_img.png';

import styles from './login.module.scss';

const Login = () => {
  return (
    <main className={styles.login_main}>
      <Row>
        <Col span={12}>
          <section className={styles.logo_loginimage}>
            <img className={styles.login_logo} src={Logo} alt="" />
            <div className={styles.login_main_img_box}>
              <div className={styles.img_box}>
                <img src={LoginImg} className={styles.login_main_img} alt="" />
              </div>
              <p className={styles.login_tagline}>
                One Stop Logistic Services.
              </p>
            </div>
          </section>
        </Col>
        <Col span={12}>
          <section className={styles.login_form_container}>
            <article className={styles.login_form_main}>
              <div className={styles.login_form}>
                <h1 className={styles.welcome_text}>Welcome back</h1>
                <p className={styles.login_caption}>Login to your account</p>
                <div>
                  <LoginForm></LoginForm>
                </div>
              </div>
            </article>
            <footer className={styles.login_footer}>
              <p className={styles.footer_text}>
                Powered by{' '}
                <a
                  className={styles.footer_link}
                  href="https://www.hutechsolutions.com"
                  target="_blank"
                >
                  Hutech Solutions Pvt. Ltd.
                </a>
              </p>
            </footer>
          </section>
        </Col>
      </Row>
    </main>
  );
};

export default Login;
