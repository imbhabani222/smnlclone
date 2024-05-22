import React, { useState, useEffect } from 'react';
import { Divider, Select } from 'antd';
import { PlaceHolder } from '../SelectBox/SelectBox';
import { Account_Config_Sub_Menu } from '../../../../apps/account/src/pages/accountConfig/route';
import { Account_Management_Sub_Menu } from '../../../../apps/account/src/pages/accountManagement/route';
import { Accounts_Vocher_SubMenu } from '../../../../apps/account/src/pages/accountManagement/route';
import { globalModulesSearch } from './helper';
import { useNavigate } from 'react-router-dom';

import styles from './globalSearch.module.scss';
import { Account_Reports_Sub_Menu } from '../../../../apps/account/src/pages/accountReports/route';
// ../../../../apps/account/src
type Props = {};
const DropdownContent = (props: any) => {
  const { options = [], setOpen = () => {} } = props;
  const navigate = useNavigate();
  const handleClick = (opt: any) => {
    navigate(`${opt.value}`);
    setOpen(false);
  };
  return (
    <div className={styles.dropdown__content}>
      {options.map((item: any) => {
        return (
          <div
            className={styles.dropdown__content__item}
            onClick={() => {
              handleClick(item);
            }}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};
const GlobalSearch = (props: any) => {
  const {
    placeholder = 'Search',
    fieldData,
    onChange = () => {},
    formValue,
    id = '',
  } = props;
  const [open, setOpen] = useState<any>(false);
  const [value, setValue] = useState<any>();
  const [routes, setRoutes] = useState<any>([
    ...Account_Config_Sub_Menu,
    ...Account_Management_Sub_Menu,
    ...Accounts_Vocher_SubMenu,
    ...Account_Reports_Sub_Menu
  ]);
  const [options, setOptions] = useState<any>();
  let timeout: any;
  useEffect(() => {
    const optWithoutEdit = routes.filter((item: any) => {
      if( item?.key.includes("view") && item?.key.includes("product") ){
        return false
      }else if(item?.key.includes("view")){
        return true
      }
      return false
    });
    const opt = optWithoutEdit.map((item: any) => {
      return { label: item?.label, value: item?.key };
    });
    setOptions(opt);
  }, [routes]);

  const handleSearch: any = (e: any) => {
    const value = e;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    const fetch = () => {
      const d = globalModulesSearch(value, routes);

      const optWithoutEdit = d.filter((item: any) => {
        if( item?.key.includes("view") && item?.key.includes("product") ){
          return false
        }else if(item?.key.includes("view")){
          return true
        }
        return false
      });

      const opt = optWithoutEdit.map((item: any) => {
        return { label: item?.label, value: item?.key };
      });
      setOptions(opt);
    };
    if (value) {
      timeout = setTimeout(fetch, 300);
    } else {
      const optWithoutEdit = routes.filter((item: any) => {
        if( item?.key.includes("view") && item?.key.includes("product") ){
          return false
        }else if(item?.key.includes("view")){
          return true
        }
        return false
      });
      const opt = optWithoutEdit.map((item: any) => {
        return { label: item?.label, value: item?.key };
      });
      setOptions(opt);

    }
  };
  return (
    <div>
      <Select
        // size="large"
        showSearch={true}
        style={{ width: '350px' }}
        placeholder={<PlaceHolder text={placeholder} />}
        filterOption={false}
        allowClear
        defaultActiveFirstOption={true}
        open={open}
        onDropdownVisibleChange={(visible) => setOpen(visible)}
        value={value}
        onSearch={handleSearch}
        options={(options || []).map((item: any) => {
          return {
            value: item.value,
            label: item.label,
          };
        })}
        dropdownRender={(items) => {
          return (
            <>
              <DropdownContent options={options} setOpen={setOpen} />
            </>
          );
        }}
      />
    </div>
  );
};

export default GlobalSearch;
