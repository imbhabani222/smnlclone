import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';
import styles from '../payrollConfiguration.module.scss';
import {
  getFields,
  createRecords,
  updateRecords,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import { Column } from './esiColumns';
import { isSuccess } from '../../../../../../libs/common/ui/Message';

const Create = () => {
  const [formData, setFormData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [formValue, setFormValue] = useState<any>({});
  const [updateId, setUpdateId] = useState<any>(null);

  useEffect(() => {
    getFields('ESI Slabs', 'htssuite').then((items) => {
      const filterFields = items.filter(
        (field: any) => field.name === 'financial_year'
      );

      setFormData(filterFields);
    });
  }, []);

  useEffect(() => {
    if (formValue?.financial_year) {
      getESISlabData(JSON.stringify(formValue));
    } else {
      setTableData([]);
    }
  }, [formValue]);

  const handleChange = (value: any, key: any) => {
    setFormValue({ [key]: value });
  };
  const getESISlabData = (e: any) => {
    getTableData('esi_slabs', 'payroll_configurations', 'htssuite', e).then(
      (items) => {
        if (items?.length > 0) {
          const [{ slabs, name }] = items;
          setUpdateId(name);
          setTableData([...slabs]);
        } else {
          setTableData([
            {
              from_month: null,
              to_month: null,
            },
          ]);
          setUpdateId(null);
        }
      }
    );
  };
  const handleCellEdit = (id: any, key: any, value: any) => {
    const table = [...tableData];
    table[id][key] = value;
    setTableData(table);
  };

  const handleFinish = () => {
    const payload = {
      ...formValue,
      slabs: tableData,
    };
    if (!updateId) {
      createRecords(
        'esi_slabs',
        payload,
        'payroll_configurations',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const updatePaylod = {
        doc_id: updateId,
        data: payload,
      };
      updateRecords(
        'esi_slabs',
        updatePaylod,
        'payroll_configurations',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };
  const resetFilters = () => {
    const table = [
      {
        from_month: null,
        to_month: null,
      },
    ];
    setTableData([...table]);
  };
  const addnewRow = () => {
    const table = [...tableData];
    const tableObject = {
      from_month: null,
      to_month: null,
    };
    table.push(tableObject);
    setTableData([...table]);
  };

  const onDeleteRecord = (name: any, rowNumber: number) => {
    const tempData = [...tableData];
    tempData.splice(rowNumber - 1, 1);
    setTableData(tempData);
  };
  return (
    <React.Fragment>
      <SmnlFormDynamicLayout sectionData={formData} onChange={handleChange} />
      {formValue.financial_year && (
        <div className={styles.add_row}>
          <Button onClick={addnewRow}>Add New</Button>
        </div>
      )}
      <SmnlTable
        column={Column(handleCellEdit)}
        dataSource={tableData}
        height={175}
        deletehandler={onDeleteRecord}
      />
      <div className={styles.actions}>
        <Button
          className={styles.actions__cancel}
          htmlType="button"
          onClick={resetFilters}
        >
          Cancel
        </Button>
        <Button
          className="SNMLForm__actions__submit"
          type="primary"
          onClick={handleFinish}
          disabled={
            !(
              formValue.financial_year &&
              tableData.length !== 0 &&
              tableData.every(
                (item: any) =>
                  item.from_month !== null && item.to_month !== null
              )
            )
          }
        >
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Create;
