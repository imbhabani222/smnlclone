import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'antd';
import styles from '../empCategoryLeaveSetup/empCategory.module.scss';
import FormFields from '../../../../../../libs/common/ui/Form/FormFields';
import {
  createRecords,
  getFields,
  getTableDatasAndId,
  updateRecords,
} from '../../../../../../libs/common/api/doctype';
import InputNumbers from '../../../../../../libs/common/ui/InputNumber/inputNumber';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';

type Props = {};

const Create = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [data, setData] = useState<any>();
  const [updateRecord, setUpdateRecord] = useState<any>(null);

  useEffect(() => {
    if (selectedCategory?.emp_code) {
      getTableDatasAndId(
        'leave_setup',
        'leave_management',
        'htssuite',
        JSON.stringify(selectedCategory)
      ).then((items: any) => {
        if (items.status === 200) {
          setUpdateRecord(items?.id);
          setData(items?.data);
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      setData([]);
      setUpdateRecord(null);
    }
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
      title: 'Yearly Eligible Leave',
      dataIndex: 'value',
      key: 'value',
      width: '45%',
      align: 'center',
      render: (_: any, record: any, index: number) => (
        <InputNumbers
          width={'90px'}
          height={'36px'}
          value={record.value}
          onChange={(e: any) => {
            handleLeaveEligibleChange(record.name, e, index);
          }}
        />
      ),
    },
  ];
  const handleLeaveEligibleChange = (
    key: string,
    value: string,
    index: number
  ) => {
    const table = [...data];
    table.forEach((item: any, itemIndex: number) => {
      if (itemIndex == index) item.value = value;
    });
    setData([...table]);
  };
  const handleCategoryChange = (value: any, name: any) => {
    setSelectedCategory({ emp_code: value });
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
        'leave_setup',
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
      createRecords('leave_setup', values, 'leave_management', 'htssuite').then(
        (items: any) => {
          if (items?.status === 200) {
            isSuccess(items?.message, 'success');
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      );
    }
  };

  const handleCancel = (values: any) => {
    const table = [...data];
    table.forEach((item: any) => {
      item.value = 0;
    });
    setData([...table]);
  };
  return (
    <div>
      <Row className={styles.subHeader_row}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
          Leave Setup
        </Col>
        {/* <Col xs={24} sm={24} md={24} lg={8} xl={8}>
      <div className={styles.button_wrap}>
        <Button className={styles.primary_btn} onClick={onFilterClick}>
          Filter
        </Button>
      </div>
    </Col> */}
      </Row>
      <Panel>
        <div className={styles.panel_container}>
          <div className={styles.main_div}>
            <SmnlFormDynamicLayout
              sectionData ={
              [{
                datatype : 'TableSelect',
                name: 'employee_name',
                label: 'Employee Name',
                isReq: true,
                description: {
                  linkfield: 'full_name',
                  modulename: 'employee_management',
                  showActive: 'true',
                  colSpan: '2',
                  appname: 'htssuite',
                  search: 'employee_management.doctype.personal_details.api.search_personal_details?search='
                },
                options: 'Personal Details',
                columns: [
                  {
                    title: 'Employee Code',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: 'Employee Name',
                    dataIndex: 'full_name',
                    key: 'full_name',
                  },
                ],
                searchIndexes: []
              }
            ]}

              onChange={handleCategoryChange}
            />

            {selectedCategory && (
              <SmnlTable column={columns} dataSource={data} />
            )}

            <div className={styles.actions}>
              <Button onClick={handleCancel} className={styles.actions__cancel}>
                Clear
              </Button>
              <Button
                className="actions__submit"
                type="primary"
                onClick={handleSubmit}
                disabled={data?.length === 0}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default Create;
