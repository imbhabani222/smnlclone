import React, { useEffect, useState } from 'react';
import styles from '../home.module.scss';
import { Typography, Button } from 'antd';
import { getTableData } from '../../../../../../libs/common/api/doctype';
import dayjs from 'dayjs';
const { Title, Paragraph } = Typography;
type Props = {};

const NewsContent = (props: any) => {
  const { title, content, date } = props;
  const d = dayjs(date).format('MMM D');

  return (
    <div className={`${styles.dashboard__announcements__content}`}>
      <div className={`${styles.dashboard__announcements__content__date}`}>
        {d}
      </div>
      <div className={styles.dashboard__announcements__content__tittle}>
        {title}
      </div>
      <Paragraph
        className={styles.dashboard__announcements__content__details}
        ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
      >
        {content}
      </Paragraph>
    </div>
  );
};

const News = (props: Props) => {
  const [newsData, setNewsData] = useState<any>();
  useEffect(() => {
    getTableData('news_entry', 'utilities', 'htssuite').then((items) => {
      setNewsData(items);
    });
  }, []);

  return (
    <div className={`${styles.dashboard__announcements} ${styles.scroll}`}>
      <Title
        className={styles.dashboard__announcements__heading}
        style={{ margin: 0 }}
        level={4}
      >
        News and Announcements
      </Title>
      {newsData &&
        newsData.map((item: any) => {
          return (
            <NewsContent
              content={item?.news_content}
              title={item?.subject}
              date={item?.date}
            />
          );
        })}
    </div>
  );
};

export default News;
