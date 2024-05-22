// @ts-ignore
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import { ReactComponent as EditIcon } from '../../../assets/icons/Edit_icon.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/Delete.svg';

import Styles from '../ReportTable.module.scss';

type Props = {
  columnItem: {};
  text: string;
  otherRecords: any;
  editUrl?: String;
  viewUrl?: String;
  deletehandler?: Function;
  mode?: string;
};

const TagsCell = (props: Props) => {
  const navigate = useNavigate();
  const { otherRecords, editUrl, deletehandler, viewUrl, mode }: any = props;
  console.log(props, 'otherecodd');

  const handleClick = () => {
    navigate(`${editUrl}?id=${otherRecords?.name}`);
  };
  const handleDelete = () => {
    // @ts-ignore

    deletehandler(otherRecords?.name);
  };
  const handleView = () => {
    if (mode) {
      navigate(`${viewUrl}?id=${otherRecords?.name}&mode=view`);
    } else {
      navigate(`${viewUrl}?id=${otherRecords?.name}`);
    }
  };

  return (
    <div>
      <span className={Styles.editicon}>
        {
          viewUrl && (
            //   (otherRecords?.status === 'Pending' ? (

            <span
              style={{
                color: '#2180FF',
                cursor: 'pointer',
                fontSize: '12px',
              }}
              onClick={handleView}
            >
              {otherRecords?.name}
            </span>
          )

          //   ) : (

          //   )
          //   )
        }
      </span>
    </div>
  );
};

export default TagsCell;
