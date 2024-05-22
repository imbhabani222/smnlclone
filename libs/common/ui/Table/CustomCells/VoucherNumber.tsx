// @ts-ignore
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import { ReactComponent as EditIcon } from '../../../assets/icons/Edit_icon.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/Delete.svg';

import Styles from '../SmnlTable.module.scss';

type Props = {
  columnItem: { title: "" };
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
  }: any = props;

  // const voucherUrl ={
  //   if (otherRecords?.name.includes === "CPVR") {
  //     return `edit-cash-receipt-voucher?id=${otherRecords?.name}`
  //   }
  // }

  const voucherUrl = () => {
    const vo_no = otherRecords?.name

    if (vo_no?.includes("CPVR")) {
      return "/edit-cash-receipt-voucher"
    }
    if (vo_no?.includes("CPV/")) {
      return "/edit-cash-payment-voucher"
    }
    if (vo_no?.includes("CV")) {
      return "/edit-contra-voucher"
    }
    if (vo_no?.includes("BPV")) {
      return "/edit-bank-payment-voucher"
    }
    if (vo_no?.includes("BRV")) {
      return "/edit-bank-receipt-voucher"
    } 
    if (vo_no?.includes("JV")) {
      return "/edit-journal-voucher-details"
    }
     if (vo_no?.includes("CNV")) {
      return "/edit-credit-note-voucher"
    }
    if (vo_no?.includes("DNV")) {
      return "/edit-debit-note-voucher"
    }
    if (vo_no?.includes("CN/")) {
      return "/create-credit-note-with-gst"
    }
    if (vo_no?.includes("DN/")) {
      return "/create-debit-note-with-gst"
    }
    if (vo_no?.includes("PIN")) {
      return "/create-purchase-invoice"
    }
    if (vo_no?.includes("SEI")) {
      return "/create-service-expense-invoice"
    }

  }





  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>

      <Link to={`${voucherUrl()}?id=${otherRecords?.name}`}>{otherRecords?.name}</Link>
    </div>
  );
};

export default TagsCell;
