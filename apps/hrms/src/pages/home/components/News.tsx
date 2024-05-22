import React, { useEffect, useState } from 'react';
import styles from '../home.module.scss';
import { Typography, Button } from 'antd';
import { getTableData } from '../../../../../../libs/common/api/doctype';
import dayjs from 'dayjs';
import ReportTable from '../../../../../../libs/common/ui/ReportTable/ReportTable';
const { Title, Paragraph } = Typography;
type Props = {
  noticeEmployeeData: any;
};

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

  const data = [
    {
      employeename: 'Test',
      firstLetter: '12/03/2023',
      secondLetter: '12/03/2023',
      thirdLetter: '12/03/2023',
    },
    {
      employeename: 'Test',
      firstLetter: '12/03/2023',
      secondLetter: '12/03/2023',
      thirdLetter: '12/03/2023',
    },
    {
      employeename: 'Test',
      firstLetter: '12/03/2023',
      secondLetter: '12/03/2023',
      thirdLetter: '12/03/2023',
    },
    {
      employeename: 'Test',
      firstLetter: '12/03/2023',
      secondLetter: '12/03/2023',
      thirdLetter: '12/03/2023',
    },
    {
      employeename: 'Test',
      firstLetter: '12/03/2023',
      secondLetter: '12/03/2023',
      thirdLetter: '12/03/2023',
    },
    {
      employeename: 'Test',
      firstLetter: '12/03/2023',
      secondLetter: '12/03/2023',
      thirdLetter: '12/03/2023',
    },
  ];

  return (
    <div className={`${styles.dashboard__announcements} ${styles.scroll}`}>
      <Title
        className={styles.dashboard__announcements__heading}
        style={{ margin: 0 }}
        level={4}
      >
        Employee Notice Status
      </Title>
      <ReportTable
        column={[
          {
            title: 'Employee Name',
            dataIndex: 'full_name',
          },
          {
            title: '1st Letter',
            dataIndex: 'first_letter_date',
          },
          {
            title: '2nd Letter',
            dataIndex: 'second_letter_date',
          },
          {
            title: '3rd Letter',
            dataIndex: 'third_letter_date',
          },
        ]}
        dataSource={props?.noticeEmployeeData || []}
      />
    </div>
  );
};

export default News;
