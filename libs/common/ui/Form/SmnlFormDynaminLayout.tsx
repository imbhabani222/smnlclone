import React from 'react';
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
  mode?: any;
};
const spanmap: any = {
  1: 24,
  2: 12,
  3: 8,
  4: 6,
  5: 4,
  6: 3,
  7: 2,
  8: 18, // for 3/4 th width of input field
};
const SmnlFormDynamicLayout = (props: Props) => {
  const { sectionData = [], handleImageUpload: any, appname, mode } = props;
  return (
    <Row gutter={10}>
      {sectionData.map((field: any, index: number) => {
        return field?.datatype === 'Column Break' ? (
          <Col span={spanmap[field?.description?.colSpan] || 24} />
        ) : field?.datatype === 'Break' ? (
          <Col span={spanmap[field?.description?.colSpan] || 24}>
            <div style={{ marginBottom: '15px', fontWeight: '600' }}>
              {field?.label}
            </div>
          </Col>
        ) : (
          <>
            {field?.hidden === 1 ? null : (
              <Col
                span={
                  spanmap[field?.description?.colSpan] ||
                  spanmap[field?.colSpan] ||
                  6
                }
                key={index}
              >
                <div>
                  <FormFields
                    key={index}
                    fieldData={field}
                    mode={field?.mode}
                    {...props}
                    handleImageUpload={props?.handleImageUpload}
                    onChange={props?.onChange}
                    appname={appname}
                  />
                </div>
              </Col>
            )}
          </>
        );
      })}
    </Row>
  );
};

export default SmnlFormDynamicLayout;

/**
 * {sectionData?.title.length ? (
  <div className={style.SNMLForm__section__header}>
    {sectionData?.title}
    <Divider style={{ margin: " 10px 0 " }} />
  </div>
) : (
  ""
)}
 */
