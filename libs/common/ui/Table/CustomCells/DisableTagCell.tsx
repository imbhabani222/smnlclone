import React from "react";
import { TagComponent, Status } from "../../Tag/tagComponent";

import "./tablecell.scss";

type Props = { columnItem: {}; text: string };

const TagsCell = (props: Props) => {
  const { columnItem, text } = props;

  return (
    <TagComponent
      // className={`tags__${text}`}
      status={Number(text) === 0 ? Status.success : Status.error}
      children={Number(text) === 0 ? "Active" : "Inactive"}
    />
  );
};

export default TagsCell;
