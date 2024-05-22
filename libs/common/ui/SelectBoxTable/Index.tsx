import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import SmnlTable from '../Table/SmnlTable';
import {
  getDesignationWiseEmployee,
  getTableData,
  getTableDataWithPagination,
  searchApi,
} from '../../../../libs/common/api/doctype';
import Spin from '../Loader/spinLoader';
//@ts-ignore
import { PlaceHolder } from '../SelectBox/SelectBox';
import { dateFormat, isObject } from '../../../../libs/common/utils/common';
import { globalModulesSearch, tableDataSearch } from '../globalSearch/helper';
import style from './selectTable.module.scss';
type Props = {};

const dataIndexKeyMap: any = {
  firm_type: 'firm_type_name',
};
const filterMap: any = {
  cashLedger: { group_name: 'CASH IN HAND', active: 1 },
  bankLedgers: { group_name: 'BANK ACCOUNTS', active: 1 },
  'bank&cashLedger': {
    group_name: ['in', ['CASH IN HAND', 'BANK ACCOUNTS']],
    active: 1,
  },
  'hideBank&cashLedger': {
    group_name: ['not in', ['CASH IN HAND', 'BANK ACCOUNTS']],
    active: 1,
  },
  jobCardPartRequest: {
    status: 'Approved'
  }
};
const SelectTable = (props: any) => {
  const {
    placeholder = props?.fieldData?.placeholder || 'Select',
    fieldData,
    onChange = () => {},
    formValue,
    id = '',
    form,
  } = props;

  const [tableData, setTableData] = useState<any>([]);
  const [filteredTableData, setFilteredTableData] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState<any>(false);
  const [value, setValue] = useState<any>();
  // const filter = filterMap[fieldData?.description?.filterName] || {};
  const getFilter: any = () => {
    let fil = {};
    if (props?.fieldData?.description?.showActive) {
      fil = { active: 1 };
    }
    if (filterMap[fieldData?.description?.filterName]) {
      fil = filterMap[fieldData?.description?.filterName];
    }
    return fil;
  };
  const filter = getFilter();

  useEffect(() => {
    const dataIndex = fieldData?.description?.linkfield;
    if (props?.value && filteredTableData) {
      let val = props?.value || formValue[id];
      if (isObject(val)) {
        val = val?.[id];
        setValue(val);
      } else {
        for (let i of filteredTableData) {
          if (
            i?.name === val ||
            i?.[fieldData?.description?.optionValueName] === val
          ) {
            val = i?.[dataIndex];
            setValue(val);
          }
        }
      }
      // setValue(val);
    }
  }, [props?.value, formValue]);
  useEffect(() => {
    setloading(true);
    if (Array.isArray(fieldData?.options)) {
      setFilteredTableData([...fieldData?.options]);
      setloading(false);

    } else if (
      (fieldData?.options === 'Inventory Product Master' ||
        fieldData?.options === 'vehicles') &&
      fieldData?.description?.search
    ) {
      getTableDataWithPagination(
        fieldData?.options.toLowerCase().split(' ').join('_'),
        fieldData?.description?.modulename,
        1,
        10,
        fieldData?.description?.appname,
        JSON.stringify(filter)
      ).then((items: any) => {
        const newData = items.data.map((item: any) => {
          Object.keys(item).forEach((key: any) => {
            if (item[key] && isObject(item[key])) {
              item[key] =
                item[key]?.[key] || item[key]?.[`${dataIndexKeyMap[key]}`];
            }
          });
          return item;
        });
        setTableData(newData);
        setFilteredTableData(newData.slice(0, 10));
        setloading(false);
      });
    } else if (
      fieldData?.description?.module === 'Job Card Designation Filter'
    ) {
      getDesignationWiseEmployee(
        fieldData?.description?.endPoint,
        fieldData?.description?.appname
      ).then((items: any) => {
        const newData = items?.data?.map((item: any) => {
          Object.keys(item).forEach((key: any) => {
            if (item[key] && isObject(item[key])) {
              item[key] =
                item[key]?.[key] || item[key]?.[`${dataIndexKeyMap[key]}`];
            }
          });
          return item;
        });
        setTableData(newData);
        setFilteredTableData(newData.slice(0, 100));
        setloading(false);
      });
    } else {
      getTableData(
        fieldData?.options.toLowerCase().split(' ').join('_'),
        fieldData?.description?.modulename,
        fieldData?.description?.appname,
        JSON.stringify(filter)
      ).then((items) => {
        const newData = items.map((item: any) => {
          Object.keys(item).forEach((key: any) => {
            if (item[key] && isObject(item[key])) {
              item[key] =
                item[key]?.[key] || item[key]?.[`${dataIndexKeyMap[key]}`];
            }
          });
          return item;
        });

        const newitemdata = newData.map((i: any): any => {
          return {
            ...i,
            creation: dateFormat(i?.creation),
          };
        });
        console.log(newitemdata);
        setTableData(newitemdata);
        setFilteredTableData(newitemdata.slice(0, 100));
        setloading(false);
      });
    }
  }, [props?.fieldData]);

  const handleRowSelection: any = (e: any, record: any, rowIndex: any) => {
    record[fieldData?.description?.linkfield] &&
      setValue(record[fieldData?.description?.linkfield]);
    setOpen(false);
    if (fieldData?.description?.optionValueName) {
      onChange(record?.[fieldData?.description?.optionValueName]);
    } else {
      onChange(record?.name);
    }
  };
  let timeout: any;
  let currentValue: string;

  const handleSearch: any = (e: any) => {
    const value = e;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    const fetch = () => {
      const d = tableDataSearch(value, tableData, fieldData?.searchIndexes);
      setFilteredTableData(d);
    };
    if (value && !fieldData?.description?.search) {
      timeout = setTimeout(fetch, 300);
    } else if (fieldData?.description?.search) {
      if (e) {
        const endPoint = `${fieldData?.description?.search}${e}`;
        searchApi(endPoint, fieldData?.description?.appname).then((items) => {
          setFilteredTableData([...items]);
        });
      } else {
        const data = tableData.slice(0, 100);
        setFilteredTableData([...data]);
      }
    } else {
      setFilteredTableData([...tableData]);
    }
  };

  const onLoadMoreData = () => {
    if (
      (fieldData?.options === 'Inventory Product Master' ||
        fieldData?.options === 'vehicles') &&
      fieldData?.description?.search
    ) {
      setloading(true);
      getTableDataWithPagination(
        fieldData?.options.toLowerCase().split(' ').join('_'),
        fieldData?.description?.modulename,
        1,
        filteredTableData?.length + 10,
        fieldData?.description?.appname,
        JSON.stringify(filter)
      ).then((items: any) => {
        const newData = items.data.map((item: any) => {
          Object.keys(item).forEach((key: any) => {
            if (item[key] && isObject(item[key])) {
              item[key] =
                item[key]?.[key] || item[key]?.[`${dataIndexKeyMap[key]}`];
            }
          });
          return item;
        });
        setTableData(newData);
        setFilteredTableData(newData);
        setloading(false);
      });
    } else {
      const tableDataLength = filteredTableData?.length;
      const lastIndex = tableDataLength + 50;
      const datas = tableData.slice(0, lastIndex);
      setFilteredTableData([...datas]);
    }
  };

  const handleChange = (data: any) => {
    if (data === undefined) {
      setValue(undefined);
    }
    if (fieldData?.callOnChange) {
      onChange(data);
    }
  };
  return (
    <div style={{ height: '100%' }}>
      <Select
        size="large"
        showSearch
        style={{ width: '100%', height: '40px' }}
        placeholder={<PlaceHolder text={placeholder} />}
        open={open}
        allowClear
        onChange={handleChange}
        onDropdownVisibleChange={(visible) => setOpen(visible)}
        value={value}
        loading={loading}
        key={id}
        //  {...props}
        onSearch={handleSearch}
        disabled={
          props?.fieldData?.disabled || props?.fieldData?.readonly || false
        }
        //  options={[]}
        dropdownRender={(menu) => (
          <div
            className="styledscroll"
            style={{ overflow: 'hidden', maxHeight: '300px' }}
          >
            <Spin loading={loading} />
            <SmnlTable
              dataSource={[...filteredTableData]}
              column={fieldData?.columns}
              onSearch={handleSearch}
              height={150}
              onRow={(record: any, rowIndex: any) => {
                return {
                  onClick: (event: any) => {
                    handleRowSelection(event, record, rowIndex);
                  }, // click row
                };
              }}
            />
            {(filteredTableData.length > 99 ||
              ((fieldData?.options === 'Inventory Product Master' ||
                fieldData?.options === 'vehicles') &&
                fieldData?.description?.search)) && (
              <p
                onClick={() => onLoadMoreData()}
                style={{
                  textAlign: 'right',
                  paddingRight: '20px',
                  color: '#1677ff',
                  cursor: 'pointer',
                }}
              >
                more
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default SelectTable;
