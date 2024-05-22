import React, { useEffect, useState } from 'react';
import FormWrapper from '../Form/FormWrapper';
import { uploadImage } from '../../api/doctype';
import Table from '../Table/SmnlTable';
//@ts-ignore
import styles from './formTable.module.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { isSuccess } from '../Message';
type FormTableProps = {
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
  isSetNew?: boolean;
  handleSet?: any;
  hideSelectData?: any;
  checkDuplicateData?: any;
  CheckProductQuantity?: any;
  goBack?: any;
  selectedProduct?: any;
  handleCancel?: any;
  productId?: any;
  handleFormCancel?: any;
  showProductlist?: any;
  showDelete?: any;
  editUrl?: any;
  onlyEditRow?:any;
  tableSummary?:any
  onhideCancelButton?:boolean
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
  formValue, // object with initial form values for formwrapper
  formData, // form Fields
  columns, // table column
  cancelButtonLabel = 'Cancel',
  submitButtonLabel = 'Save & Continue',
  doc_id,
  handleFinish,
  handleImageUpload,
  imageData,
  tableData, // initial table Data
  appname,
  onchangehandler=()=>{}, // form handle change func
  formTableEditRow, // onclick function on edit icon click
  expandable,
  isTax,
  isSetNew,
  handleSet,
  checkDuplicateData,
  CheckProductQuantity,
  goBack,
  handleCancel,
  productId,
  handleFormCancel,
  hideSelectData,
  showProductlist,
  showDelete = true,
  editUrl,
  onlyEditRow,
  tableSummary,
  onhideCancelButton=false
}: FormTableProps) => {
  const [table_Data, setTableData] = useState<any>([]); // table Data
  const navigate = useNavigate();
  // /let columnsTemp = [...columns];
  let columnsEmployeeCodeRemoved = columns.filter((column: any) => {
    if (column.title === 'Employee Code') {
      return false;
    }
    if (column?.fieldtype && column?.fieldtype === 'Section Break') {
      return false;
    }
    return true;
  });
  useEffect(() => {
    //custom code don,t set initial table data using formValue
    if (formValue && isJsonString(formValue)) {
      setTableData(JSON.parse(formValue));
    } else if (formValue && formValue?.length > 0) {
      // verify before uncomment the below line as it affects accounts.
      // setData([...formValue]);
    }
  }, [formValue]);
  useEffect(() => {
    // set initial table data using tableData prop
    if (tableData && isJsonString(tableData?.document)) {
      setTableData(JSON.parse(tableData?.document));
    } else if (tableData && tableData?.length > 0) {
      setTableData(tableData);
    }
  }, [tableData]);

  const addDatatoTable = (e: any) => {    
    if (imageData?.file) {
      const records = {
        file: imageData?.originalfile,
        filename: imageData?.filename,
      };
      uploadImage(
        'document_details',
        records,
        'employee_management',
        'htssuite'
      ).then((items) => {
        const da = {
          document: e?.document_type,
          upload_document: items?.data,
        };
        // @ts-ignore
        setTableData([...table_Data, { ...da, emp_code: doc_id }]);
      });
    } else {
      if (isTax) {
        e.igst = formValue?.igst;
        e.cgst = formValue?.cgst;
        e.sgst = formValue?.sgst;
        // @ts-ignore
        setTableData([...table_Data, { ...e, emp_code: doc_id }]);
      } else if (isSetNew) {
        handleSet(e, table_Data, formValue);
      } else {
        var newData = e;
        if (CheckProductQuantity) {
          newData = CheckProductQuantity(newData);
        }

        if (checkDuplicateData) {
          //avoid duplicate data in table by returning null or data object from checkDuplicate data
          newData = checkDuplicateData(newData, table_Data);
        }
        if (newData) {
          setTableData([...table_Data, { ...newData, emp_code: doc_id }]);
        } else {
          //  isSuccess('Duplicate Data Not Allowed', 'error');
        }
      }
    }
  };
  const deletehandler = (name: any, rowNumber: any) => {
    let tempData = [...table_Data];
    // @ts-ignore
    tempData.splice(rowNumber - 1, 1);
    //  if (!formValue?.si_no) {
    setTableData(tempData);
    //  }
  };
  
  const onCancel = () => {
    if (handleCancel) {
      handleCancel();

      return;
    }
    if (goBack) {
      // navigate to new url
      navigate(goBack);
    } else {
      // navigate to previous page
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    // its impacting in inventory please check and update correctly.
    // let newData = [...data];
    // if (selectedProduct?.length) {
    //   newData = data.map((product: any) => {
    //     return {
    //       ...product,
    //       products: selectedProduct?.name,
    //     };
    //   });
    // }
    // handleFinish(newData);
    // let newData = [...table_Data];

    // if (selectedProduct?.length) {
    //   newData = table_Data.map((product: any) => {
    //     return {
    //       ...product,
    //       products: selectedProduct?.name,
    //     };
    //   });
    // } else if (productId) {
    //   newData = tableData.map((product: any) => {
    //     return {
    //       ...product,
    //       part: productId?.product?.id,
    //     };
    //   });
    // }
    handleFinish(table_Data);
  };

  const handleChange = (e: any, val: any) => {
    
    onchangehandler(e, val);
  };

  return (
    <div className={styles.formtable_container}>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={addDatatoTable}
        reset={true}
        submitButtonLabel="Add"
        cancelButtonLabel={'Clear'}
        removeEmployeeCode={true}
        onhideCancelButton={onhideCancelButton ?? false}
        handleImageUpload={handleImageUpload}
        dynamicLayout
        appname={appname}
        onChange={handleChange}
        handleCancel={handleFormCancel}
        hideSelectData={hideSelectData}
        showProductlist={showProductlist}
      />
      {/* @ts-ignore */}
      <div className={styles.formtable_wrapper}>
        {/* @ts-ignore */}
        <Table
          column={columnsEmployeeCodeRemoved}
          dataSource={table_Data}
          deletehandler={deletehandler}
          expandable={expandable}
          editUrl={editUrl}
          showDelete={showDelete}
          formTableEditRow={formTableEditRow}
          tableSummary={tableSummary}
        />
      </div>
      <div className={styles.formtable_buttons}>
        <Button onClick={onCancel}>{cancelButtonLabel}</Button>
        <Button
          type="primary"
          disabled={table_Data?.length <= 0}
          // @ts-ignore
          onClick={handleSubmit}
        >
          {submitButtonLabel}
        </Button>
      </div>
    </div>
  );
};
export default FormTable;
