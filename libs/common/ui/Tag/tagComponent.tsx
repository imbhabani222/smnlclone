import React from 'react';
import { Tag } from 'antd';
import styles from './tagcomponent.module.scss';

export enum Status {
  success = 'btnsuccess',
  error = 'btnerror',
  processing = 'btnpending',
  approve = 'btnapprove',
  warning = 'btnwarning',


}

/**
 * @param props <TagComponent status={Status.success}>Active</TagComponent>
 * @returns
 */

export const TagComponent = (props: any) => {
  return (
    <Tag
      className={`${styles.tag_component} ${styles[props.status]}`}
      {...props}
    >
      {props.children}
    </Tag>
  );
};
