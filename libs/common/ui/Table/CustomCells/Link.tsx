import React from 'react';
import { TagComponent, Status } from '../../Tag/tagComponent';

import './tablecell.scss';

type Props = { columnItem: {}; text: string };

const LinkCell = (props: Props) => {
  const { columnItem, text } = props;

  return text ? (
    <a href={text} target="_blank">
      View
    </a>
  ) : (
    '-'
  );
};

export default LinkCell;
