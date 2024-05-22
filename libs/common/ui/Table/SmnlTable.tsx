import { Table } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { DefaultCell } from './CustomCells/DefaultCell';
import TagsCell from './CustomCells/TagsCell';
import ActionCell from './CustomCells/ActionCell';
import DisableTagCell from './CustomCells/DisableTagCell';
import LinkCell from './CustomCells/Link';
import EmailCell from './CustomCells/EmailCell';
import OrderCell from './CustomCells/OrderNoCell';
import ApproveRejectCell from './CustomCells/ApproveRejectCell';
import SupplierCell from './CustomCells/SupplierCell';
import ProductCell from './CustomCells/ProductCell';
import VoucherNumber from './CustomCells/VoucherNumber';
//@ts-ignore
import styles from './SmnlTable.module.scss';
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import { getSortFunct } from './helper';
import { AnimatePresence, motion } from 'framer-motion';
import {
  sorticonAnimation,
  tableAnimation,
} from '../../../../libs/common/utils/animations/variants';
import Cookies from 'universal-cookie';

type Props = {
  dataSource: any;
  column: any;
  rowSelection?: any;
  editUrl?: String;
  viewUrl?: String;
  deletehandler?: Function;
  removeFixedRight?: Boolean;
  handlePageRelod?: Function;
  onlyEditRow?: Function;
  mode?: string;
  height?: any;
  formTableEditRow?: any;
  rowId?: string;
  expandable?: any;
  blockEdit?: any;
  noBlockView?: string;
  showScroll?: any;
  onRow?: any;
  onSearch?: any;
  totalNumberofRecords?: any;
  onChangePagination?: any;
  currentPage?: any;
  supplierHistory?: boolean;
  productLink?: boolean;
  showDelete?: Boolean;
  footer?: any;
  isPrint?: Boolean;
  printPreview?: any;
  showPagination?: boolean;
  applySort?: any;
  deletehandlerOnStatus?: any;
  horizontalScroll?: any;
  isEditable?: any;
  tableSummary?: any;
};

const TableCellMap: any = {
  active: TagsCell,
  enabled: TagsCell,
  status: TagsCell,
  disabled: DisableTagCell,
  action: ActionCell,
  upload_document: LinkCell,
  upload_doc: LinkCell,
  upload_photo: LinkCell,
  approveAction: ApproveRejectCell,
  order_no: OrderCell,
  email: EmailCell,
  supplier: SupplierCell,
  part: ProductCell,
  voucher_no: VoucherNumber,
};

function capitalize(string: any) {
  return (
    string &&
    string
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
}
const SortIcon = ({ sortOrder }: any) => {
  return (
    <>
      {sortOrder === 'ascend' ? (
        <motion.svg
          // onMouseEnter={() => setHovered(true)}
          // onMouseLeave={() => setHovered(false)}
          whileHover={{
            scale: 1.2,
          }}
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            // custom={isHovered}
            variants={sorticonAnimation}
            whileHover={'hover'}
            opacity="0.2"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.98771 0.000244141C4.72255 0.000244141 4.46824 0.10556 4.28071 0.293031L0.280712 4.29303C0.0985536 4.48163 -0.00224076 4.73423 3.78075e-05 4.99643C0.00231614 5.25863 0.107485 5.50944 0.292893 5.69485C0.478301 5.88026 0.729113 5.98543 0.99131 5.9877C1.25351 5.98998 1.50611 5.88919 1.69471 5.70703L3.98771 3.41403V15C3.98771 15.2652 4.09307 15.5196 4.28061 15.7071C4.46814 15.8947 4.7225 16 4.98771 16C5.25293 16 5.50728 15.8947 5.69482 15.7071C5.88235 15.5196 5.98771 15.2652 5.98771 15V3.41403L8.28071 5.70703C8.46931 5.88919 8.72192 5.98998 8.98411 5.9877C9.24631 5.98543 9.49712 5.88026 9.68253 5.69485C9.86794 5.50944 9.97311 5.25863 9.97539 4.99643C9.97766 4.73423 9.87687 4.48163 9.69471 4.29303L5.69471 0.293031C5.50718 0.10556 5.25288 0.000244141 4.98771 0.000244141Z"
            fill="#545454"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.9879 15.9998C15.253 15.9998 15.5073 15.8944 15.6949 15.707L19.6949 11.707C19.877 11.5184 19.9778 11.2658 19.9755 11.0036C19.9733 10.7414 19.8681 10.4906 19.6827 10.3052C19.4973 10.1197 19.2465 10.0146 18.9843 10.0123C18.7221 10.01 18.4695 10.1108 18.2809 10.293L15.9879 12.586L15.9879 0.999969C15.9879 0.734753 15.8825 0.480398 15.695 0.292862C15.5074 0.105326 15.2531 -3.05176e-05 14.9879 -3.05176e-05C14.7227 -3.05176e-05 14.4683 0.105326 14.2808 0.292862C14.0932 0.480398 13.9879 0.734753 13.9879 0.999969L13.9879 12.586L11.6949 10.293C11.5063 10.1108 11.2537 10.01 10.9915 10.0123C10.7293 10.0146 10.4785 10.1197 10.2931 10.3052C10.1076 10.4906 10.0025 10.7414 10.0002 11.0036C9.99792 11.2658 10.0987 11.5184 10.2809 11.707L14.2809 15.707C14.4684 15.8944 14.7227 15.9998 14.9879 15.9998Z"
            fill="#545454"
          />
        </motion.svg>
      ) : (
        <motion.svg
          //  onMouseEnter={() => setHovered(true)}
          //  onMouseLeave={() => setHovered(false)}
          whileHover={{
            scale: 1.2,
          }}
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.98771 0.000244141C4.72255 0.000244141 4.46824 0.10556 4.28071 0.293031L0.280712 4.29303C0.0985537 4.48163 -0.00224062 4.73423 3.78026e-05 4.99643C0.00231622 5.25863 0.107485 5.50944 0.292893 5.69485C0.478301 5.88026 0.729114 5.98543 0.99131 5.9877C1.25351 5.98998 1.50611 5.88919 1.69471 5.70703L3.98771 3.41403V15C3.98771 15.2652 4.09307 15.5196 4.28061 15.7071C4.46814 15.8947 4.7225 16 4.98771 16C5.25293 16 5.50728 15.8947 5.69482 15.7071C5.88235 15.5196 5.98771 15.2652 5.98771 15V3.41403L8.28071 5.70703C8.46931 5.88919 8.72192 5.98998 8.98411 5.9877C9.24631 5.98543 9.49712 5.88026 9.68253 5.69485C9.86794 5.50944 9.97311 5.25863 9.97539 4.99643C9.97766 4.73423 9.87687 4.48163 9.69471 4.29303L5.69471 0.293031C5.50718 0.10556 5.25288 0.000244141 4.98771 0.000244141Z"
            fill="#545454"
          />
          <motion.path
            animate="hover"
            //custom={isHovered}
            variants={sorticonAnimation}
            opacity="0.2"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.9879 15.9998C15.253 15.9998 15.5073 15.8944 15.6949 15.707L19.6949 11.707C19.877 11.5184 19.9778 11.2658 19.9755 11.0036C19.9733 10.7414 19.8681 10.4906 19.6827 10.3052C19.4973 10.1197 19.2465 10.0146 18.9843 10.0123C18.7221 10.01 18.4695 10.1108 18.2809 10.293L15.9879 12.586L15.9879 0.999969C15.9879 0.734753 15.8825 0.480398 15.695 0.292862C15.5074 0.105326 15.2531 -3.05176e-05 14.9879 -3.05176e-05C14.7227 -3.05176e-05 14.4683 0.105326 14.2808 0.292862C14.0932 0.480398 13.9879 0.734753 13.9879 0.999969L13.9879 12.586L11.6949 10.293C11.5063 10.1108 11.2537 10.01 10.9915 10.0123C10.7293 10.0146 10.4785 10.1197 10.2931 10.3052C10.1076 10.4906 10.0025 10.7414 10.0002 11.0036C9.99792 11.2658 10.0987 11.5184 10.2809 11.707L14.2809 15.707C14.4684 15.8944 14.7227 15.9998 14.9879 15.9998Z"
            fill="#545454"
          />
        </motion.svg>
      )}
    </>
  );
};
const SmnlTable = (props: Props) => {
  const {
    dataSource = [{}],
    column = [{}],
    editUrl,
    viewUrl,
    isEditable,
    deletehandler,
    removeFixedRight,
    handlePageRelod = () => {},
    mode,
    height,
    rowSelection,
    formTableEditRow,
    rowId,
    expandable,
    blockEdit,
    noBlockView,
    showScroll = true,
    onRow,
    onSearch,
    totalNumberofRecords,
    onChangePagination = () => {},
    currentPage,
    onlyEditRow,
    supplierHistory,
    productLink,
    showDelete,
    footer,
    isPrint,
    printPreview,
    showPagination = true,
    applySort,
    deletehandlerOnStatus,
    horizontalScroll = false,
    tableSummary = [],
  } = props;
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [numberOfRowsInAPage, setNumberOfRowsInAPage] = useState(10);
  const [tableHeaderHeightDynamic, setTableHeaderHeightDynamic] = useState(45);
  const [rowHeightDynamic, setRowHeightDynamic] = useState(50);
  const [pageLength, setPageLengthSize] = useState(pageSize || 10);
  const [currentPageNo, setCurrentPage] = useState(1);
  const [tableHeight, setTableHeight] = useState<any>(height);
  const [tablewidth, setTablewidth] = useState<any>();

  let columnDataSINumber = [...column];
  columnDataSINumber.unshift({
    title: 'Sl No.',
    dataIndex: 'si_no',
    key: 'si_no',
    width: '80px',
    fixed: 'left',
  });

  const columnData = columnDataSINumber.map((item: any, index) => {
    let newItem = { ...item };
    if (item.dataIndex === 'action') {
      newItem.width = '100px';
      newItem.align = 'center';
    } else if (item.dataIndex === 'status' || item.title === 'Status') {
      newItem.width = '200px';
      newItem.align = 'center';
    } else if (newItem?.description?.width) {
      newItem.width = parseInt(newItem?.description?.width);
    }
    if (item?.filters?.length > 0) {
      newItem.onFilter = (value: string, record: any) => {
        return record?.name.indexOf(value) === 0;
      };
    }
    const RenderComp = TableCellMap[item.dataIndex] || DefaultCell;

    return {
      render: (text: any, record: any) => {
        return (
          <RenderComp
            columnItem={item}
            text={text}
            otherRecords={record}
            editUrl={editUrl}
            viewUrl={viewUrl}
            deletehandler={deletehandler}
            deletehandlerOnStatus={deletehandlerOnStatus}
            handlePageRelod={handlePageRelod}
            mode={mode}
            onlyEditRow={onlyEditRow}
            formTableEditRow={formTableEditRow}
            showDelete={showDelete}
            blockEdit={blockEdit}
            noBlockView={noBlockView}
            supplierHistory={supplierHistory}
            productLink={productLink}
            isPrint={isPrint}
            printPreview={printPreview}
            isEditable={isEditable}
          />
        );
      },
      ...newItem,
      title: capitalize(item?.title),
      sortIcon: SortIcon,
      sorter: applySort
        ? newItem?.description?.sortType
        : getSortFunct(newItem?.description, newItem.dataIndex),
      sortDirections: ['ascend', 'descend', 'ascend'],
      showSorterTooltip: true,
    };
  });

  const startSerialNumber = (currentPageNo - 1) * pageLength + 1;

  let dataSourceSiNumberAdded: any =
    Array.isArray(dataSource) &&
    dataSource.map((item: any, index: any) => {
      return {
        ...item,
        si_no: totalNumberofRecords ? startSerialNumber + index : index + 1,
      };
    });

  useLayoutEffect(() => {
    const tableWrapperElement = document.querySelector(
      '#panelMain'
    ) as HTMLElement;
    const SNMLFormFields = document.querySelector(
      '#panelMain .SNMLForm-fields'
    ) as HTMLElement;
    const filters = document.querySelector(
      '#panelMain .filters'
    ) as HTMLElement;
    const tableHeaderElement = document.querySelector(
      '#panelMain thead.ant-table-thead'
    ) as HTMLElement;
    const rowHeightElements: NodeListOf<HTMLElement> =
      document.querySelectorAll('#panelMain tr.ant-table-row');
    const rowHeightArray = Array.from(rowHeightElements)?.map(
      (value, index) => {
        return value?.offsetHeight;
      }
    );
    const totalrowHeight = rowHeightArray.reduce(
      (accumulator, current) => accumulator + current,
      0
    );

    const rowHeightMean = Math.floor(totalrowHeight / rowHeightArray?.length);
    setTableHeaderHeightDynamic(tableHeaderElement?.offsetHeight);
    setRowHeightDynamic(rowHeightMean);

    const paginationHeight = 64; //

    const bufferHeight = 40;

    let tableheight =
      tableWrapperElement?.clientHeight -
      tableHeaderHeightDynamic -
      paginationHeight -
      bufferHeight;

    if (SNMLFormFields?.clientHeight) {
      tableheight -= SNMLFormFields?.offsetHeight + 30;
    }
    if (filters?.clientHeight) {
      tableheight -= filters?.offsetHeight;
    }
    horizontalScroll && setTablewidth(tableWrapperElement?.offsetWidth - 60);
    setTableHeight(tableheight);
    setNumberOfRowsInAPage(Math.floor(tableheight / rowHeightDynamic));
  }, [dataSource, tableHeaderHeightDynamic, rowHeightDynamic]);

  return (
    <motion.div className={styles.table_main}>
      {dataSourceSiNumberAdded && (
        <Table
          id="smnlTable"
          dataSource={dataSourceSiNumberAdded}
          columns={columnData}
          loading={columnData?.length <= 0}
          //@ts-ignore
          pagination={
            showPagination
              ? dataSourceSiNumberAdded?.length < totalNumberofRecords
                ? {
                    position: ['bottomCenter'],
                    pageSizeOptions: ['5', '10', '20', '50', '100'],
                    pageSize: pageLength, // Set your desired page size
                    showSizeChanger: true,
                    total: totalNumberofRecords || null,
                    showTotal: (total, range) =>
                      `${range[0]} - ${range[1]} of ${total} items`,
                    onChange: (page, pageSize) => {
                      document.cookie = `pageSize=${pageSize}`;
                      setPageLengthSize(pageSize);
                      setCurrentPage(page);

                      totalNumberofRecords &&
                        onChangePagination(page, pageSize);
                    },
                  }
                : false
              : false
          }
          scroll={{ y: showScroll ? height || tableHeight : null }}
          className={styles.table_data}
          rowSelection={rowSelection}
          rowKey={rowId ? (rcd) => rcd?.[rowId] : (rcd) => rcd?.['si_no']}
          expandable={expandable}
          onRow={onRow}
          footer={footer}
          onChange={(pagination, filters, sorter: any, otherDetails) => {
            if (otherDetails?.action === 'sort') {
              applySort &&
                applySort(sorter?.column?.description, sorter?.order);
            }
          }}
          summary={
            tableSummary?.length > 0
              ? () => (
                  <Table.Summary>
                    <Table.Summary.Row>
                      {tableSummary?.map((item: any) => (
                        <Table.Summary.Cell
                          className={styles.summary_cell}
                          key={item?.index}
                          index={item?.index}
                        >
                          {item?.data}
                        </Table.Summary.Cell>
                      ))}
                    </Table.Summary.Row>
                  </Table.Summary>
                )
              : undefined
          }
        />
      )}
    </motion.div>
  );
};

export default SmnlTable;
