import React, { useEffect, useState } from 'react';
import {
  getFields,
  getRecordById,
  createRecords,
  updateRecords,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import InputField from '../../../../../../libs/common/ui/InputField/inputField';
import { Button, Form } from 'antd';
import styles from '../payrollConfiguration.module.scss';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import PayrollForm from '../../payrollProcessing/helper/payrollForm';

type Props = {};
const Create = (props: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>([]);
  const [columnData, setColumnData] = useState<any>([]);
  const [filters, setFilters] = useState<any>({});
  const [doc_id, setDoc_id] = useState<any>(null);
  const defaultColumnData = [
    {
      from_value: null,
      to_value: null,
      tax_percentage: null,
    },
  ];
  useEffect(() => {
    getFields('Professional Tax Slabs', 'htssuite').then((items) => {
      const newItems = items.filter((item: any) => {
        const reqFields = ['year', 'state', 'sr_citizen_age', 'active'];
        if (reqFields.includes(item.name)) {
          return true;
        } else {
          return false;
        }
      });
      const newData = newItems.map((item: any) => {
        if (item.name === 'state' || item.name === 'sr_citizen_age') {
          return item;
        } else if (item.name === 'year') {
          return {
            ...item,
            datatype: 'Select',
            label: 'Financial year',
          };
        } else if (item.name === 'active') {
          return { ...item, defaultValue: true };
        }
        return {};
      });

      setFormData(newData);
    });
  }, []);
  useEffect(() => {
    if (filters.year && filters.state) {
      const fils = { year: filters?.year, state: filters?.state };
      getTableData(
        'professional_tax_slabs',
        'payroll_configurations',
        'htssuite',
        JSON.stringify(fils)
      ).then((items) => {
        if (items[0]) {
          setFilters({
            ...filters,
            sr_citizen_age: Number(items[0]?.sr_citizen_age),
          });
          setDoc_id(items[0].name);
          const slabs = items[0]?.slabs;
          setColumnData(slabs);
        } else {
          setColumnData(defaultColumnData);
          setDoc_id(null);
          setFilters({ ...filters, sr_citizen_age: null });
        }
      });
    } else {
      setColumnData([]);
    }
  }, [filters?.year, filters?.state]);

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
            placeholder="0.00"
            value={record.from_value}
            onChange={(e: any) => {
              handleCellEdit(record?.si_no, 'from_value', e);
            }}
            onPaste={handleCellEdits}
            fieldData={{ description: { maxlength: 8 } }}
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
            placeholder="0.00"
            value={record.to_value}
            onChange={(e: any) => {
              handleCellEdit(record?.si_no, 'to_value', e);
            }}
            fieldData={{ description: { maxlength: 8 } }}
            onPaste={handleCellEdits}
          />
        </>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'tax_percentage',
      key: 'taxpercentage',
      align: 'center',
      render: (_: any, record: any) => {
        return (
          <>
            <InputField
              placeholder="0"
              style={{ width: '250px' }}
              value={record.tax_percentage}
              onChange={(e: any) => {
                handleCellEdit(record?.si_no, 'tax_percentage', e);
              }}
              onPaste={handleCellEdits}
              fieldData={{ description: { maxlength: 5 } }}
            />
          </>
        );
      },
    },
    { title: 'Action', dataIndex: 'action', key: 'action' },
    // {
    //   title: 'SLAB DESCRIPTION',
    //   dataIndex: 'slab_description',
    //   key: 'slab_description',
    //   align: 'center',
    //   render: (_: any, record: any) => {
    //     return (
    //       <>
    //         <InputField
    //           placeholder="Description"
    //           style={{ width: '300px' }}
    //           value={record.slab_description}
    //           onChange={(e: any) => {
    //             handleCellEdit(
    //               record?.si_no,
    //               'slab_description',
    //               e?.target?.value
    //             );
    //           }}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];
  const handleCellEdit = (si_no: any, key: any, val: any) => {
    const reg = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    if (reg.test(val)) {
      setColumnData((pre: any) => {
        return pre?.map((item: any, index: any) => {
          if (si_no === index + 1) {
            return { ...item, [key]: val };
          } else {
            return item;
          }
        });
      });
    } else {
      setColumnData((pre: any) => {
        return pre?.map((item: any, index: any) => {
          if (si_no === index + 1) {
            return { ...item, [key]: '' };
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
        'professional_tax_slabs',
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
        'professional_tax_slabs',
        record,
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
    setFilters({
      sr_citizen_age: null,
      state: null,
      year: null,
      active: false,
    });
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
  const validateMyFields = columnData.every((item: any) =>
    Object.values(item).every(
      (value) => value !== null && value !== undefined && value !== ''
    )
  );
  console.log(columnData, validateMyFields, 'columnData');
  return (
    <>
      <PayrollForm
        payrollFormData={formData}
        handleChange={handleChange}
        formvalue={filters}
      />
      <div>
        <div className={styles.add_row}>
          <Button onClick={addnewRow}>Add New</Button>
        </div>

        <SmnlTable
          column={Column}
          dataSource={columnData}
          deletehandler={deletehandler}
        />
      </div>

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
              filters?.year &&
              filters.state &&
              filters.sr_citizen_age < 91 &&
              filters.sr_citizen_age > 59
            ) || !validateMyFields
          }
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default Create;
