import React, { useState } from 'react';
import { Button, Divider, Popover } from 'antd';
import { updateRecord } from '../../../../../libs/common/api/doctype';
import { isSuccess } from '../../Message';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import View from 'apps/hrms/src/pages/utility/newsEntry/view';
type Props = {
  otherRecords?: any;
  handlePageRelod?: any;
  columnItem: any;
  editUrl?: any;
};

const ApproveRejectCell = (props: Props) => {
  const { editUrl, otherRecords } = props;
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleClick = (e: any) => {
    // const params = createSearchParams({
    //   id: otherRecords?.name,
    //   mode: 'view',
    // });
    navigate(`${editUrl}?id=${otherRecords.name}&mode=view`);
  };
  return (
    <div>
      <Button onClick={handleClick}>Approve / Reject</Button>
    </div>
  );
};

export default ApproveRejectCell;
