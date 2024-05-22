import React, { useEffect, useState } from 'react';
import FormFields from './FormFields';
import { Row, Col, Divider } from 'antd';
import { motion } from 'framer-motion';
import { renderchildrensonebyone } from '../../../../libs/common/utils/animations/variants';
type Props = {
  sectionData: any;
  form?: any;
  key?: number;
  handleImageUpload?: any;
  onChange?: any;
  appname?: any;
  dependsData?: any;
  modalHandler?: any;
};

const SmnlForm = (props: Props) => {
  const {
    sectionData = [],
    handleImageUpload: any,
    appname,
    modalHandler,
  } = props;

  return (
    <Row>
      <Col span={12}>
        <Row gutter={[48, 2]}>
          {sectionData.map((field: any, index: number) => {
            return (
              <>
                {field?.hidden === 1 ? null : (
                  <Col span={field.colSpan || 12} key={index}>
                    <motion.div
                      custom={index}
                      // initial="initial"
                      // animate="animate"
                      // variants={renderchildrensonebyone}
                    >
                      <FormFields
                        modalHandler={modalHandler}
                        key={index}
                        fieldData={field}
                        {...props}
                        handleImageUpload={props?.handleImageUpload}
                        appname={appname}
                      />
                    </motion.div>
                  </Col>
                )}
              </>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default SmnlForm;
