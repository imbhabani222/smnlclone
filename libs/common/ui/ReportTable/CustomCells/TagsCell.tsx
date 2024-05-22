import React from 'react';
import { TagComponent, Status } from '../../Tag/tagComponent';

import './tablecell.scss';

type Props = { columnItem: {}; text: string };

const TagsCell = (props: Props) => {
  const { columnItem, text } = props;

  // console.log(text);
  return (
    <TagComponent
      // className={`tags__${text}`}
      style={{ width: '160px' }}
      status={
        text === 'Allocated' || text === "In Progress"
          ? Status?.processing
          : text === 'Available'
          ? Status.success
          : text === 'Unavailable'
          ? Status?.warning
          : Number(text) === 1
          ? Status.success
          : text === 'Pending'
          ? Status?.processing
          : text === 'Active' || text === 'Accepted' || text === "Completed"
          ? Status?.success
          : text === 'Approved' || text === 'Normal'
          ? Status?.approve
          : text === 'Rejected'
          ? Status?.error
          : Status.error
      }
      children={
        Number(text) === 1 ? 'Active' : Number(text) === 0 ? 'Inactive' : text
      }
    />
  );
};

export default TagsCell;
