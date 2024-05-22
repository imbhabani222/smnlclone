import React, { FC, useState } from 'react';
import { Button, Drawer, Form } from 'antd';
import ButtonField from '../Button/buttonField';
import SmnlForm from '../Form/SmnlForm';
import SmnlFormDynamicLayout from '../Form/SmnlFormDynaminLayout';
import styles from './drawer.module.scss';

const DrawerField = ({
  handleClose,
  open,
  appname,
  handleFilter,
  fields,
}: any) => {
  const [forms] = Form.useForm();
  const handleSubmit = (e: any) => {
    handleFilter(e);
  };
  return (
    <>
      <Drawer
        title="Filters"
        // placement={placement}
        onClose={handleClose}
        open={open}
        footer={
          <div className={styles.btn}>
            <Button
              className={styles.cancel}
              htmlType="button"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className={styles.submit}
              type="primary"
              form="forms"
              key="submit"
              htmlType="submit"
            >
              Apply Filter
            </Button>
          </div>
        }
      >
        <Form
          form={forms}
          name="forms"
          // className={style.SNMLForm}
          // //layout="vertical"
          onFinish={handleSubmit}
          // form={form}
        >
          <SmnlFormDynamicLayout
            sectionData={fields}
            // onChange={onChange}
            appname={appname}
          />
        </Form>
      </Drawer>
    </>
  );
};

export default DrawerField;
