import React, { useState, useEffect } from 'react';
import { Typography, Button, Avatar } from 'antd';
import styles from '../home.module.scss';
import { getTableData } from '../../../../../../libs/common/api/doctype';
import dayjs from 'dayjs';
import { it } from 'node:test';
const { Title } = Typography;

type Props = {};
const HolidayItems = (props: any) => {
  const { date, type, name } = props;
  const d = dayjs(date).format('D MMM, YYYY');
  const avatarDate = dayjs(date).format('D');
  const avatarStyle =
    type === 'Optional Holiday'
      ? { backgroundColor: '#FFB199', color: '#D74B2C' }
      : { backgroundColor: '#CFCCFF', color: '#272083' };
  return (
    <div className={`${styles.dashboard__holidayCalender__content}`}>
      <Avatar
        className={styles.dashboard__holidayCalender__content__avatar}
        size={'large'}
        style={avatarStyle}
        shape="square"
      >
        <span className={styles.avatarDate}>{avatarDate}</span>
      </Avatar>
      <div className={styles.dashboard__holidayCalender__content__flexDisplay}>
        <div className={styles.dashboard__holidayCalender__content__date}>
          {d}
        </div>
        <div className={styles.dashboard__holidayCalender__content__holiday}>
          <span>{name}</span> | <span>{type}</span>
        </div>
      </div>
    </div>
  );
};
const Holiday = (props: Props) => {
  const [holidaysData, setData] = useState<any>();
  useEffect(() => {
    getTableData('public_holiday_list', 'utilities', 'htssuite').then(
      (items) => {
        setData(items);
      }
    );
  }, []);
  return (
    <div className={`${styles.dashboard__holidayCalender} ${styles.scroll}`}>
      <Title
        className={styles.dashboard__holidayCalender__heading}
        style={{ margin: 0 }}
        level={4}
      >
        Holiday Calendar
      </Title>
      {holidaysData &&
        holidaysData.map((item: any) => {
          return (
            <HolidayItems
              name={item?.holiday_name}
              type={item?.holiday_type}
              date={item?.date}
            />
          );
        })}
    </div>
  );
};

export default Holiday;
