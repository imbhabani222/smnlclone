import React, { useContext } from 'react';
import styles from './headerpagebutton.module.scss';
import ButtonField from '../Button/buttonField';
import { Context } from '../../../common/context/context';
import { FilterContext } from '../../../common/context/filtercontext';
import { Button } from 'antd';
import {
  PlusOutlined,
  FileExcelOutlined,
  FilterOutlined,
} from '@ant-design/icons';

export const HeaderPageButton = ({
  title,
  buttonHandler,
  buttonText,
  icon,
  multipleButtons,
  isExport,
  isFilter,
}: any) => {
  // @ts-ignore
  const { updateExport, enButton } = useContext(Context);
  // @ts-ignore
  const { updateFilter } = useContext(FilterContext);
  return (
    <div className={styles.header_page_main}>
      <div className={styles.header_title_button}>
        <p className={styles.header_title}>Request</p>
        {isExport || buttonText || isFilter ? (
          <div className={styles.header_button}>
            {isExport ? (
              <ButtonField
                icon={icon}
                type="primary"
                // disabled
                onClick={() => updateExport(true)}
              >
                <FileExcelOutlined /> Export To Excel
              </ButtonField>
            ) : null}

            {isFilter ? (
              <ButtonField
                icon={icon}
                type="primary"
                // disabled
                onClick={() => updateFilter(true)}
              >
                <FilterOutlined />
                Filter
              </ButtonField>
            ) : null}

            {buttonText ? (
              <ButtonField
                icon={icon}
                type="primary"
                onClick={() => buttonHandler()}
              >
                <PlusOutlined />
                {buttonText}
              </ButtonField>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
