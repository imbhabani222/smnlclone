import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './spinloader.module.scss';
import Loader from './Loader';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
type Props = {
  loading: boolean;
};

const SpinLoader = (props: Props) => {
  return props?.loading ? (
    <div className={styles.spinloader_parent}>
      <div className={styles.spinoverlay} />
      {/* <Loader /> */}
      <Spin />
    </div>
  ) : null;
};

export default SpinLoader;
