import React from 'react';
import { TagComponent, Status } from '../../Tag/tagComponent';

import './tablecell.scss';

type Props = { columnItem: {}; text: string };

const EmailCell = (props: Props) => {
  const { columnItem, text } = props;

  return text ? (
    <span style={{ textTransform: 'lowercase' }}>{text}</span>
  ) : (
    '-'
  );
};

export default EmailCell;
