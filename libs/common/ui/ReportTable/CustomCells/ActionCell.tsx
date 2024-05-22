// @ts-ignore
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import { ReactComponent as EditIcon } from '../../../assets/icons/Edit_icon.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/Delete.svg';
import { PrinterOutlined } from '@ant-design/icons';

import Styles from '../ReportTable.module.scss';
import { motion } from 'framer-motion';

type Props = {
  columnItem: {};
  text: string;
  otherRecords: { name: '' };
  editUrl?: String;
  viewUrl?: String;
  deletehandler?: Function;
  mode?: string;
  formTableEditRow?: Function;
  blockEdit?: string;
  noBlockView?: string;
  onlyEditRow?: Function;
  isPrint?: Boolean;
  printPreview?: any;
};

const TagsCell = (props: Props) => {
  const navigate = useNavigate();
  const {
    otherRecords,
    editUrl,
    deletehandler,
    viewUrl,
    mode,
    formTableEditRow,
    blockEdit,
    noBlockView,
    onlyEditRow,
    isPrint,
    printPreview,
  }: any = props;

  const handleClick = () => {
    navigate(`${editUrl}?id=${otherRecords?.name || otherRecords?.id}`);
  };
  const handleDelete = () => {
    // @ts-ignore
    deletehandler(otherRecords?.name, otherRecords?.si_no, otherRecords);
  };
  const handleFromTable = () => {
    formTableEditRow(otherRecords);
    deletehandler(otherRecords?.name, otherRecords?.si_no, otherRecords, true);
  };

  const handleEditTable = () => {
    onlyEditRow(otherRecords);
  };

  const handleView = () => {
    if (mode) {
      navigate(`${viewUrl}?id=${otherRecords?.name}&mode=view`);
    } else {
      navigate(`${viewUrl}?id=${otherRecords?.name}`);
    }
  };
  const handlePrintPerview = () => {
    printPreview(otherRecords);
  };

  console.log(otherRecords, 'otherRecords', viewUrl);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <span className={Styles.editicon}>
        {editUrl ? (
          blockEdit &&
          Array.isArray(blockEdit) &&
          !blockEdit
            .toLocaleString()
            .toLowerCase()
            .split(',')
            .includes(otherRecords?.status?.toLowerCase()) ? (
            <motion.div whileHover={{ scale: 1.5 }}>
              <EditIcon style={{ cursor: 'not-allowed' }} />
            </motion.div>
          ) : editUrl &&
            !blockEdit &&
            (otherRecords?.status === 'Approved' ||
              otherRecords?.status === 'Closed' ||
              otherRecords?.status === 'Rejected' ||
              otherRecords?.status === 'Partial Unbilled Order' ||
              otherRecords?.status === 'Full Billed Order' ||
              otherRecords?.status === 'Full Supplied Order' ||
              otherRecords?.status === 'Short Close' ||
              otherRecords?.status === 'Cancelled') ? (
            <EditIcon style={{ cursor: 'not-allowed' }} />
          ) : (
            <Tooltip placement="top" title="Edit">
              <motion.div whileHover={{ scale: 1.3 }}>
                <EditIcon onClick={handleClick} />
              </motion.div>
            </Tooltip>
          )
        ) : null}
        {viewUrl &&
          (otherRecords?.status === 'Pending' ||
          otherRecords?.status === 'Partial Supplied Order' ||
          (noBlockView && noBlockView === otherRecords?.status) ? (
            <Tooltip placement="top" title="View">
              <span
                style={{
                  color: '#2180FF',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
                onClick={handleView}
              >
                View
              </span>
            </Tooltip>
          ) : (
            <span
              style={{
                color: '#8b8989',
                cursor: 'not-allowed',
                fontSize: '12px',
              }}
            >
              View
            </span>
          ))}
        {formTableEditRow && (
          <Tooltip placement="top" title="Edit">
            <EditIcon style={{ textAlign: 'end' }} onClick={handleFromTable} />
          </Tooltip>
        )}

        {onlyEditRow && (
          <Tooltip placement="top" title="Edit">
            <EditIcon style={{ textAlign: 'end' }} onClick={handleEditTable} />
          </Tooltip>
        )}

        {/* @ts-ignore */}
        {deletehandler && (
          <Tooltip placement="top" title="Delete">
            <DeleteIcon onClick={handleDelete} />
          </Tooltip>
        )}
        {isPrint && (
          <Tooltip placement="top" title="Print">
            <PrinterOutlined
              style={{ fontSize: '18px' }}
              onClick={handlePrintPerview}
            />
          </Tooltip>
        )}
      </span>
    </div>
  );
};

export default TagsCell;
