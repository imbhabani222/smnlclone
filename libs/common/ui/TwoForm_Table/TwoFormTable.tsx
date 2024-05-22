import React, { useCallback, useEffect, useState } from 'react';
import FormWrapper from '../Form/FormWrapper';
import TwoFormWrapper from './TwoFormWrapper';
import { uploadImage } from '../../api/doctype';
import Table from '../Table/SmnlTable';
//@ts-ignore
import styles from './formTable.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Divider } from 'antd';
import moment from 'moment';
import { datetoFrom, dateFormat } from '../../../../libs/common/utils/common';
import { useSearchParams } from 'react-router-dom';
import { isSuccess } from '../Message';
type FormTableProps = {
  formDataMain: any;
  formValueMain: any;
  formData: any;
  formValue: any;
  columns: Array<{}>;
  cancelButtonLabel?: String;
  submitButtonLabel?: String;
  module?: string;
  doctype?: string;
  setMsgHandler?: Function;
  msg?: any;
  doc_id?: string;
  handleFinish: any;
  handleImageUpload?: any;
  imageData?: any;
  tableData?: any;
  appname?: string;
  onchangehandler?: any;
  formTableEditRow?: any;
  expandable?: any;
  isTax?: boolean;
  isError?: any;
  requiredFields?: any;
  fieldsToAddToDetails?: any;
  ledgerKeys?: any;
  groupName1?: any;
  groupName2?: any;
  closingBalanceKeys?: any;
};

function isJsonString(str: any) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const FormTable = ({
  formValueMain,
  formDataMain,
  formValue,
  formData,
  columns,
  cancelButtonLabel = 'Cancel',
  submitButtonLabel = 'Save & Continue',
  module = 'master_data',
  doctype = 'states',
  setMsgHandler,
  msg,
  doc_id,
  handleFinish,
  handleImageUpload,
  imageData,
  tableData,
  appname,
  onchangehandler,
  formTableEditRow,
  expandable,
  isTax,
  isError,
  requiredFields,
  fieldsToAddToDetails,
  ledgerKeys,
  groupName1,
  groupName2,
  closingBalanceKeys,
}: FormTableProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [maindata, setMainData] = useState<any>({});
  const [formValues, setFormValue] = useState<any>({ main: {}, details: {} });
  const [disableSubmit, setDisableSubmit] = useState(false);
  let fieldsToAdd = {};
  const currentDate = moment().format('YYYY-MM-DD');
  const [searchParams, _] = useSearchParams();
  const term = searchParams.get('id');
  useEffect(() => {
    if (requiredFields.length === 0) {
      setDisableSubmit(true);
    }
  }, []);
  useEffect(() => {
    formValue && setFormValue((pre: any) => ({ ...pre, details: formValue }));
    formValueMain &&
      setFormValue((pre: any) => ({ ...pre, main: formValueMain }));
  }, [formValue, formValueMain]);
  useEffect(() => {
    if (formValueMain) {
      setMainData((pre: any) => {
        return { ...pre, ...formValueMain };
      });
    }
    if (formValueMain && term) {
      let fields = {};
      for (let datamain in formValueMain) {
        if (fieldsToAddToDetails.includes(datamain)) {
          if (datamain?.includes('date')) {
            fields = {
              ...fields,
              [datamain]: formatDate(formValueMain[datamain]),
            };
          } else {
            fields = { ...fields, [datamain]: formValueMain[datamain] };
          }
        }
      }
      let detailsArray = formValueMain?.details?.map((formValue: any) => {
        return { ...formValue, ...fields };
      });
      setData((prev) => detailsArray || prev);
    }
  }, [formValueMain]);

  // setMainData;

  useEffect(() => {
    if (formValue && isJsonString(formValue)) {
      setData(JSON.parse(formValue));
    } else if (formValue && formValue?.length > 0) {
      setData(formValue);
    }

    if (data?.length > 0) {
      setDisableSubmit(false);
    }
  }, [formValue, data]);

  useEffect(() => {
    if (tableData && isJsonString(tableData?.document)) {
      setData(JSON.parse(tableData?.document));
    }
  }, [tableData]);

  useEffect(() => {
    requiredFields?.map((field: any) => {
      if (maindata.hasOwnProperty(field)) {
        setDisableSubmit(false);
      } else {
        setDisableSubmit(true);
      }
    });
  }, [maindata]);
  const deletehandler = (name: any, rowNumber: Number) => {
    let tempData = [...data];
    // @ts-ignore
    tempData.splice(rowNumber - 1, 1);
    setData(tempData);
  };

  const onCancel = () => {
    navigate(-1);
  };

  let columnsTemp = [...columns];
  let columnsEmployeeCodeRemoved = columnsTemp.filter((column: any) => {
    if (column.title === 'Employee Code') {
      return false;
    }
    if (column?.fieldtype && column?.fieldtype === 'Section Break') {
      return false;
    }
    return true;
  });
  function formatDate(date: any) {
    return [date?.$y, date?.$M + 1, date?.$D].join('-');
  }
  const handleChangeMain = useCallback(
    (e: any, val: any) => {
      if (e) {
        if (val?.includes('date')) {
          setMainData((prev: any) => ({
            ...prev,
            [val]: formatDate(currentDate),
          }));
        } else {
          setMainData((prev: any) => ({ ...prev, [val]: e, ...formValueMain }));
        }
      } else {
        setMainData((prev: any) => {
          const newMainData = { ...prev };
          // @ts-ignore
          delete newMainData[val];
          return newMainData;
        });
      }
      onchangehandler(e, val);
    },
    [formValueMain]
  );

  const handleChange = (e: any, val: any) => {
    for (let datamain in maindata) {
      if (fieldsToAddToDetails.includes(datamain)) {
        if (datamain?.includes('date')) {
          fieldsToAdd = {
            ...fieldsToAdd,
            [datamain]: formatDate(maindata[datamain]),
          };
        } else {
          fieldsToAdd = { ...fieldsToAdd, [datamain]: maindata[datamain] };
        }
      }
    }
    onchangehandler(e, val);
  };
  const handleSubmit = () => {
    let formDetailsData = data.map((detail: any) => {
      let newObj: any = {};
      for (let key in detail) {
        if (!fieldsToAddToDetails.includes(key) && key !== 'emp_code') {
          newObj[key] = detail[key];
        }
        if (key.includes('date')) {
          newObj[key] = dateFormat(currentDate);
        }
      }
      return newObj;
    });
    let formMainData: any = {};

    for (let key in maindata) {
      if (key.includes('date')) {
        formMainData[key] = dateFormat(currentDate);
      } else {
        formMainData[key] = maindata[key];
      }
    }
    handleFinish(formDetailsData, formMainData);
  };
  const handleFormFinish = (e: any) => {
    const val = { ...e, ...fieldsToAdd };
    if (closingBalanceKeys) {
      if (val?.amount > formValue?.closing_balance) {
        isSuccess(
          'Amount should not be greater than closing balance ',
          'error'
        );
        return;
      } else {
      }
    }
    if (
      val[`${ledgerKeys?.key1}`] &&
      val[`${ledgerKeys?.key2}`] &&
      val[`${ledgerKeys?.key1}`] === val[`${ledgerKeys?.key2}`]
    ) {
      isSuccess(
        `${ledgerKeys?.name1} and ${ledgerKeys?.name2} should not be same`,
        'error'
      );
      return;
    }

    if (!val[`${ledgerKeys?.key1}`]) {
      isSuccess(`Please select ${ledgerKeys?.name1} `, 'error');
      return;
    }

    if (imageData?.file) {
      const records = {
        file: imageData?.file,
        filename: imageData?.filename,
      };

      uploadImage(doctype, records, module, appname).then((items) => {
        const da = {
          document: e?.document_type,
          upload_document: items?.data,
        };
        // @ts-ignore
        setData([...data, { ...da, emp_code: doc_id, ...fieldsToAdd }]);
      });
    } else {
      if (isTax) {
        e.igst = formValue?.igst;
        e.cgst = formValue?.cgst;
        e.sgst = formValue?.sgst;
        // @ts-ignore
        setData([...data, { ...e, emp_code: doc_id, ...fieldsToAdd }]);
      } else {
        // @ts-ignore
        setData([...data, { ...e, emp_code: doc_id, ...fieldsToAdd }]);
      }
    }
  };
  const handleMainFormFinish = (formValues: any) => {
    formValues && setFormValue((pre: any) => ({ ...pre, main: formValues }));
  };
  const handleDetailsFormFinish = (formValues: any) => {};
  return (
    <div className={styles.formtable_container}>
      <TwoFormWrapper
        formValue={formValue}
        formData={formDataMain}
        handleFinish={handleFormFinish}
        reset={true}
        dynamicLayout
        appname={appname}
        onChange={handleChangeMain}
        //  selectboxValue={data}
        isError={isError}
      />
      <Divider style={{ margin: ' 10px 0 ' }} />
      <p className={styles.formHeading}>Details</p>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFormFinish}
        reset={true}
        submitButtonLabel="Add"
        cancelButtonLabel="Clear"
        handleImageUpload={handleImageUpload}
        dynamicLayout
        appname={appname}
        onChange={handleChange}
        //  selectboxValue={data}
        //  isError={isError}
        removeFieldsLabel={'emp_code'}
      />
      <div className={styles.formtable_wrapper}>
        <Table
          column={columnsEmployeeCodeRemoved}
          dataSource={data}
          deletehandler={deletehandler}
          formTableEditRow={formTableEditRow}
          expandable={expandable}
        />
      </div>
      <div className={styles.formtable_buttons}>
        <Button onClick={onCancel}>{cancelButtonLabel}</Button>
        <Button type="primary" onClick={handleSubmit} disabled={disableSubmit}>
          {submitButtonLabel}
        </Button>
      </div>
    </div>
  );
};

export default FormTable;
