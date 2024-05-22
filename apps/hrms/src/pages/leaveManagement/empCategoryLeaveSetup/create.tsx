import React, { useState, useEffect } from 'react';
import styles from './empCategory.module.scss';
import FormFields from '../../../../../../libs/common/ui/Form/FormFields';
import {
  createRecords,
  getFields,
  getTableDatasAndId,
  updateRecords,
  getTableData,
} from '../../../../../../libs/common/api/doctype';
import InputNumbers from '../../../../../../libs/common/ui/InputNumber/inputNumber';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import { Button } from 'antd';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
type Props = {};

const Create = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [data, setData] = useState<any>();
  const [updateRecord, setUpdateRecord] = useState<string>('');

  useEffect(() => {
    getTableDatasAndId(
      'employee_category_wise_leave_setup',
      'leave_management',
      'htssuite',
      JSON.stringify(selectedCategory)
    ).then((items: any) => {
      if(items.status === 200) {
      setUpdateRecord(items?.id);
      setData(items?.data);
      }
      else {
        isSuccess(items?.message, 'error')
      }
    });
  }, [selectedCategory]);

  const columns: any = [
    {
      title: 'Leave Type',
      dataIndex: 'leave_name',
      key: 'leaveType',
      width: '45%',
      align: 'center',
    },
    {
      title: 'Leave Eligible',
      dataIndex: 'value',
      key: 'leaveEligible',
      width: '45%',
      align: 'center',
      render: (_: any, record: any) => (
        <InputNumbers
          defaultValue={record.value || null}
          width={'90px'}
          height={'36px'}
          onChange={(e: any) => {
            handleLeaveEligibleChange(record.name, e);
          }}
        />
      ),
    },
  ];
  const handleLeaveEligibleChange = (key: string, value: string) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      setData((prevData: any) =>
        prevData.map((item: any) =>
          item.name === key ? { ...item, value: numericValue } : item
        )
      );
    } else {
      console.error('Invalid number');
    }
  };
  const handleCategoryChange = (value: any, name: any) => {
    setSelectedCategory({ [name]: value });
  };
  const handleSubmit = (e: any) => {
    const values = {
      ...selectedCategory,
      leave_data: data,
    };
    if (updateRecord) {
      const payload = {
        doc_id: updateRecord,
        data: values,
      };
      updateRecords(
        'employee_category_wise_leave_setup',
        payload,
        'leave_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      createRecords(
        'employee_category_wise_leave_setup',
        values,
        'leave_management',
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
  return (
    <div className={styles.main_div}>
      <FormFields
        fieldData={{
          datatype: 'Link',
          name: 'categoryname',
          label: 'Employee Week off Category',
          isReq: true,
          description: {
            linkfield: 'category_name',
            modulename: 'master_data',
            showActive: true,
          },

          options: 'Employee Category',
        }}
        width={'350px'}
        onChange={handleCategoryChange}
        appname="htssuite"
      />

      {selectedCategory && <SmnlTable column={columns} dataSource={data} />}

      <div className={styles.actions}>
        <Button className={styles.actions__cancel}>Cancel</Button>
        <Button
          className="actions__submit"
          type="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Create;
