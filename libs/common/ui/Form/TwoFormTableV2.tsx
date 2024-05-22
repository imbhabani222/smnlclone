import { Button, Divider, Form } from 'antd';
import React, { useState } from 'react';
//@ts-ignore
import SmnlForm from './SmnlForm';
//@ts-ignore
import style from './TworFormTable.module.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  generateFormData,
  removeEmployeCodeFields,
  removeFields,
} from './FormHelper';
import SmnlFormDynamicLayout from './SmnlFormDynaminLayout';
import { isSuccess } from '../Message';
import { error } from 'console';
import SmnlTable from '../Table/SmnlTable';
const { Item } = Form;

type Props = {};

const TwoFormTableV2 = (props: any) => {
  const {
    mainformvalue,
    mainformdata = [],
    detailsformvalue,
    detailsformdata = [],
    handleFinish,
    submitButtonLabel = 'Submit',
    cancelButtonLabel = 'Cancel',
    handleImageUpload,
    appname,
    dependsData,
    modalHandler,
    tablecolumn,
    tabledata,
    checkTableDataValidations,
    onchangehandler,
    formTableEditRow,
    voucherTittle = '',
    deleteSavedRecords,
    footer,
    getFooterValues = () => {},
  } = props;
  const [mainForm] = Form.useForm();
  const [detailsForm] = Form.useForm();
  const MAINFormvalues = Form.useWatch([], mainForm);
  const DETAILSFormValues = Form.useWatch([], detailsForm);
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [add, setadd] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);
  const navigate = useNavigate();
  useEffect(() => {
    mainForm.validateFields({ validateOnly: true }).then(
      (value: any) => {
        detailsForm.validateFields({ validateOnly: true }).then(
          (value: any) => {
            setadd(true);
          },
          (errorInfo: any) => {
            //alert(JSON.stringify(errorInfo));
            setadd(false);
          }
        );
      },
      (errorInfo: any) => {
        //alert(JSON.stringify(errorInfo));
        setadd(false);
      }
    );
  }, [MAINFormvalues, DETAILSFormValues]);
  useEffect(() => {
    if (mainformvalue) {
      mainForm.setFieldsValue({
        ...mainformvalue,
      });
    }
    if (detailsformvalue) {
      detailsForm.setFieldsValue({
        ...detailsformvalue,
      });
    }
  }, [mainformvalue, detailsformvalue]);
  useEffect(() => {
    tabledata && setTableData(tabledata);
  }, [tabledata]);
  useEffect(() => {
    getFooterValues(tableData);
  }, [tableData]);

  const handleMainFormChange = (
    e: any,
    fieldname: any,
    selectBoxOptions: any,
    form: any
  ) => {
    let val = e;
    onchangehandler(val, fieldname, true);
  };
  const handleDetailsFormChange = (
    e: any,
    fieldname: any,
    selectBoxOptions: any,
    form: any
  ) => {
    let val = e;
    onchangehandler(val, fieldname);
  };
  const handleSubmit = () => {
    
    const mainValues = mainForm.getFieldsValue();
    console.log(mainValues,"main",tableData)
    if(tableData?.length >0){
      handleFinish(tableData, mainValues);
    }else{
      isSuccess("Please add data in table",'error')
    }
    
  };
  const addDataToTable = () => {
    const mainValues = mainForm.getFieldsValue();
    const detailsValues = detailsForm.getFieldsValue();
    let valid: boolean = true;
    if (checkTableDataValidations) {
      valid = checkTableDataValidations(mainValues, detailsValues, tableData);
    }
    if (valid) {
      setTableData((pre: any) => [...pre, { ...mainValues, ...detailsValues }]);
      detailsForm.resetFields();
    }
  };
  const deletehandler = (
    name: any,
    rowNumber: Number,
    otherrecords: any,
    isEdit: boolean = false
  ) => {
    let tempData = [...tableData];
    // @ts-ignore
    tempData.splice(rowNumber - 1, 1);
    setTableData(tempData);
    if (name && !isEdit) {
      deleteSavedRecords && deleteSavedRecords(name);
    }
  };
  const handleClear = (e: any) => {
    detailsForm.resetFields();
  };
  const onCancel = () => {
    navigate(-1);
  };
  return (
    <>
      <div className={style.tittle}>
        <span> {voucherTittle}</span>
        <Divider style={{ margin: ' 10px 0 ', borderColor: '#DDDDDD' }} />
      </div>
      <Form
        className={style.SNMLForm}
        //layout="vertical"
        onFinish={handleSubmit}
        form={mainForm}
        // name="MainForm"
        // onChange={handleChange}
      >
        <div className={style.SNMLForm__content}>
          <SmnlFormDynamicLayout
            sectionData={mainformdata}
            formValues={mainformvalue}
            form={mainForm}
            handleImageUpload={handleImageUpload}
            onChange={handleMainFormChange}
            appname={appname}
            dependsData={dependsData}
            modalHandler={modalHandler}
            {...props}
          />
        </div>

        <div className={`${style.tittle} ${style.sideMargins}`}>
          <span>{'Details'}</span>
          <Divider style={{ margin: ' 10px 0 ', borderColor: '#DDDDDD' }} />
        </div>

        <Form
          className={style.SNMLForm__details}
          //layout="vertical"
          onFinish={addDataToTable}
          form={detailsForm}
        >
          <div className={style.SNMLForm__details__content}>
            <SmnlFormDynamicLayout
              sectionData={detailsformdata}
              formValues={detailsformvalue}
              form={detailsForm}
              handleImageUpload={handleImageUpload}
              onChange={handleDetailsFormChange}
              appname={appname}
              dependsData={dependsData}
              modalHandler={modalHandler}
              {...props}
            />
          </div>

          <Item className={style.SNMLForm__details__actions}>
            <Button
              className={style.SNMLForm__details__actions__cancel}
              //  htmlType="button"
              onClick={handleClear}
            >
              Clear
            </Button>

            <Button
              className={style.SNMLForm__details__actions__submit}
              //htmlType="submit"
              type="primary"
              onClick={addDataToTable}
              disabled={!add}
            >
              Add
            </Button>
          </Item>
          <div className={style.formtable}>
            <SmnlTable
              column={tablecolumn}
              dataSource={tableData}
              deletehandler={deletehandler}
              formTableEditRow={formTableEditRow}
              footer={footer}
              // expandable={expandable}
            />
          </div>
        </Form>
        <Item className={style.SNMLForm__actions}>
          <Button
            className={style.SNMLForm__actions__cancel}
            // htmlType="button"
            onClick={onCancel}
          >
            {cancelButtonLabel}
          </Button>

          <Button
            className={style.SNMLForm__actions__submit}
            // htmlType="submit"
            type="primary"
            onClick={handleSubmit}
            disabled = {tableData?.length ===  0}
            //    disabled={!submittable}
          >
            {submitButtonLabel}
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default TwoFormTableV2;
