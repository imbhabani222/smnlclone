import { Row, Col, Button, Upload, Form, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import { Panel } from '../Panel/Panel';
import SmnlTable from '../Table/SmnlTable';
import styles from './reports.module.scss';
import Drawer from '../../context/filtercontext';
import Spin from '../Loader/spinLoader';
import SmnlFormDynamicLayout from '../Form/SmnlFormDynaminLayout';
import PayslipTemplate from '../../../../apps/hrms/src/pages/MISreports/payslipReports/payslipTemplate';
// import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer'

type Props = {
  formData?: any;
  columnsData?: any;
  loading?: any;
  tableData?: any;
  filter?: any;
  showTable?: any;
  updateSelectionHandler?: any;
  onHandleFilterHandler?: any;
  onHandleCloseHandler?: any;
  onFilterClickHandler?: any;
  onHandleChangeFilterHandler?: any;
  pageData: any;
  showDownloadPaySlip?: any;
  showExportToExcel?: any;
  showFilters?: any;
  downloadPdf?: any;
  downloadExcel?: any;
  appname?: string;
  expandable?: any;
  onChangePaginationFn?: any;
  totalRecords?: any;
  showScroll?: boolean;
  footer?: any;
  formValue?: any;
  showPagination?: boolean;
  disableExcel?: boolean;
  horizontalScroll?: boolean;
};

const View = (props: Props) => {
  const {
    formValue,
    formData,
    loading,
    columnsData,
    tableData,
    filter,
    updateSelectionHandler = () => {},
    onHandleFilterHandler = () => {},
    onFilterClickHandler = () => {},
    onHandleCloseHandler = () => {},
    onHandleChangeFilterHandler = () => {},
    showTable = true,
    pageData,
    showExportToExcel = true,
    showDownloadPaySlip = true,
    showFilters = true,
    downloadPdf = () => {},
    downloadExcel = () => {},
    appname,
    expandable,
    onChangePaginationFn = () => {},
    totalRecords,
    showScroll,
    footer,
    showPagination = true,
    disableExcel = false,
    horizontalScroll = false,
  } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (formValue) {
      form.setFieldsValue({
        ...formValue,
      });
    }
  }, [formValue]);
  const { pageTitle, exportToExcelLabel, downloadLabel, tableHeight } =
    pageData;

  const updateSelection = (Object: object) => {
    updateSelectionHandler(Object);
  };

  const onHandleClose = () => {
    onHandleCloseHandler();
  };

  const onHandleFilter = () => {
    onHandleFilterHandler();
  };

  const onFilterClick = () => {
    onFilterClickHandler();
  };

  const onHandleChangeFilter = (value: any, key: string) => {
    onHandleChangeFilterHandler(value, key);
  };

  const onHandlePagination = (current_page: number, page_length: number) => {
    onChangePaginationFn(current_page, page_length);
  };
  return (
    <>
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
          {pageTitle}
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <div className={styles.button_wrap}>
            {showExportToExcel ? (
              <Tooltip
                title={
                  disableExcel
                    ? 'Generating Excel Data please wait . . .'
                    : 'Excel Export'
                }
              >
                <Button
                  disabled={disableExcel}
                  className={disableExcel ? '' : styles.primary_btn}
                  onClick={downloadExcel}
                >
                  {exportToExcelLabel}
                </Button>
              </Tooltip>
            ) : null}
            {showDownloadPaySlip ? (
              <Button onClick={downloadPdf} className={styles.primary_btn}>
                {downloadLabel}
              </Button>
            ) : null}
          </div>
        </Col>
      </Row>
      <Panel>
        <div className={styles.panel_container}>
          <Spin loading={loading} />
          {showFilters ? (
            <Form
              className={styles.SNMLForm}
              //layout="vertical"
              // onFinish={handleSubmit}
              form={form}
              // name="forms"
              // onChange={handleChange}
            >
              <Row>
                <Col span={24}>
                  {/*  implement form here for intial values
                   */}
                  <SmnlFormDynamicLayout
                    sectionData={formData}
                    onChange={onHandleChangeFilter}
                    // appname="htssuite"
                    appname={appname || 'htssuite'}
                  />
                </Col>
              </Row>
            </Form>
          ) : null}
          <Drawer
            handleClose={onHandleClose}
            open={filter}
            appname="htssuite"
            handleFilter={onHandleFilter}
          />
          {showTable ? (
            <SmnlTable
              height={tableHeight}
              column={columnsData}
              dataSource={tableData}
              onChangePagination={onHandlePagination}
              expandable={expandable}
              totalNumberofRecords={totalRecords}
              showScroll={showScroll}
              footer={footer}
              horizontalScroll={horizontalScroll}
            />
          ) : null}
        </div>
      </Panel>
    </>
  );
};

export default View;
