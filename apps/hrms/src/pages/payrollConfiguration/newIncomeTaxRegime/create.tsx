import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecords,
  updateRecords,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import InputField from '../../../../../../libs/common/ui/InputField/inputField';
import { Button, Form, message } from 'antd';
import styles from '../payrollConfiguration.module.scss';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { regexMap } from '../../../../../../libs/common/ui/InputField/inputFieldHelper';
type Props = {};

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>([]);
  const [columnData, setColumnData] = useState<any>([]);
  const [filters, setFilters] = useState<any>({});
  const [doc_id, setDoc_id] = useState<any>(null);
  const [reset, setReset] = useState<any>(false);
  const [disableBtn, setDisableBtn] = useState<any>(false);
  const defaultColumnData = [
    {
      from_value: '',
      to_value: '',
      tax_percentage: '',
    },
  ];
  useEffect(() => {
    getFields('Income Tax Slabs New Regime', 'htssuite').then((items) => {
      const newData = items.map((item: any) => {
        if (item.name === 'category') {
          return item;
        } else if (item.name === 'year') {
          return {
            ...item,
            datatype: 'Select',
            label: 'Financial year',
          };
        }
        return {};
      });
      setFormData(newData);
    });
  }, []);
  useEffect(() => {
    if (filters.year) {
      getTableData(
        'income_tax_slabs_new_regime',
        'payroll_configurations',
        'htssuite',
        JSON.stringify(filters)
      ).then((items) => {
        if (items[0]) {
          setDoc_id(items[0].name);
          const slabs = items[0]?.slabs;
          setColumnData(slabs);
        } else {
          setColumnData(defaultColumnData);
          setDoc_id(null);
        }
      });
    } else {
      setColumnData([]);
    }
  }, [filters, reset]);

  const handleCellEdits = (e: any) => {
    e.preventDefault();
  };
  const Column = [
    {
      title: 'FROM VALUE',
      dataIndex: 'from_value',
      key: 'fromvalue',
      align: 'center',
      render: (_: any, record: any) => (
        <>
          <InputField
            style={{ width: '250px' }}
            value={record.from_value}
            onChange={(e: any) => {
              handleCellEdit(
                record?.si_no,
                'from_value',
                e?.target?.value || e
              );
            }}
            fieldData={{ description: { maxlength: 8 } }}
            onPaste={handleCellEdits}
          />
        </>
      ),
    },
    {
      title: 'TO VALUE',
      dataIndex: 'to_value',
      key: 'tovalue',
      align: 'center',
      render: (_: any, record: any) => (
        <>
          <InputField
            style={{ width: '250px' }}
            value={record.to_value}
            onChange={(e: any) => {
              handleCellEdit(record?.si_no, 'to_value', e?.target?.value || e);
            }}
            fieldData={{ description: { maxlength: 8 } }}
            onPaste={handleCellEdits}
          />
        </>
      ),
    },
    {
      title: 'TAX PERCENTAGE',
      dataIndex: 'tax_percentage',
      key: 'taxpercentage',
      align: 'center',
      render: (_: any, record: any) => {
        return (
          <>
            <InputField
              style={{ width: '250px' }}
              value={record.tax_percentage}
              onChange={(e: any) => {
                handleCellEdit(
                  record?.si_no,
                  'tax_percentage',
                  e?.target?.value || e
                );
              }}
              fieldData={{ description: { type: 'percentage', maxlength: 3 } }}
              onPaste={handleCellEdits}
            />
          </>
        );
      },
    },
    { title: 'Action', dataIndex: 'action', key: 'action', align: 'center' },
  ];
  const handleCellEdit = (si_no: any, key: any, val: any) => {
    if (key === 'tax_percentage') {
      if (Number(val) >= 0.1 && Number(val) <= 100) {
        setColumnData((pre: any) => {
          return pre?.map((item: any, index: any) => {
            if (si_no === index + 1) {
              return { ...item, [key]: val };
            } else {
              return item;
            }
          });
        });
        setDisableBtn(false);
      } else {
        setColumnData((pre: any) => {
          return pre?.map((item: any, index: any) => {
            if (si_no === index + 1) {
              return { ...item, [key]: val };
            } else {
              return item;
            }
          });
        });
        setDisableBtn(true);
      }
    } else {
      const reg = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
      if (reg.test(val))
        setColumnData((pre: any) => {
          return pre?.map((item: any, index: any) => {
            if (si_no === index + 1) {
              return { ...item, [key]: val };
            } else {
              return item;
            }
          });
        });
    }
  };
  const handleFinish = (values: any) => {
    if (doc_id) {
      const record = {
        doc_id: doc_id,
        data: {
          ...filters,
          slabs: columnData,
        },
      };
      updateRecords(
        'income_tax_slabs_new_regime',
        record,
        'payroll_configurations',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          // navigate('/view-investment-section');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...filters,
        slabs: columnData,
      };
      createRecords(
        'income_tax_slabs_new_regime',
        record,
        'payroll_configurations',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          // navigate('/view-investment-section');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };
  const resetFilters = () => {
    const data = [...columnData];
    data.forEach((item: any) => {
      item.from_value = null;
      item.to_value = null;
      item.tax_percentage = null;
    });
    setColumnData(data);
  };
  const handleChange = (val: any, name: any) => {
    let value = val;
    if (name === 'year') {
      value = val;
    }
    setFilters((pre: any) => {
      return { ...pre, [name]: value };
    });
  };
  const addnewRow = () => {
    const newRowData = {
      from_value: null,
      to_value: null,
      tax_percentage: null,
    };
    setColumnData([...columnData, newRowData]);
  };
  const deletehandler = (name: any, rowNumber: Number) => {
    let tempData = [...columnData];
    // @ts-ignore
    tempData.splice(rowNumber - 1, 1);
    setColumnData(tempData);
  };
  //professional_tax_slabs

  return (
    <>
      <SmnlFormDynamicLayout sectionData={formData} onChange={handleChange} />
      <div>
        {filters.year && (
          <div className={styles.add_row}>
            <Button onClick={addnewRow}>Add New</Button>
          </div>
        )}
        <SmnlTable
          column={Column}
          dataSource={columnData}
          height={175}
          deletehandler={deletehandler}
        />
      </div>

      <div className={styles.actions}>
        <Button
          className={styles.actions__cancel}
          htmlType="button"
          onClick={resetFilters}
        >
          Clear
        </Button>
        <Button
          className="SNMLForm__actions__submit"
          type="primary"
          onClick={handleFinish}
          disabled={
            !columnData.some(
              (item: any) =>
                item.from_value && item.tax_percentage && item.to_value
            ) || disableBtn
            ||
            !columnData?.every((item:any) => item.tax_percentage <= 100)
          }
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default Create;
