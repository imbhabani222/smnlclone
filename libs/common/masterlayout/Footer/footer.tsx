import React from 'react';
import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer_container}>
      {/* <p className={styles.footer_text}>
        Copyright © {new Date().getFullYear()} Shree Marutinandan Logistics Pvt. Ltd.
      </p> */}
      {/* <p className={styles.footer_text}>|</p> */}
      <p className={styles.footer_text}>
        Powered by{' '}
        <a
          className={styles.footer_link}
          href="https://www.hutechsolutions.com"
          target="_blank"
        >
          Hutech Solutions
        </a>
      </p>
    </footer>
  );
};
