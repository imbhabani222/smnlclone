import React, { useEffect, useState } from 'react';
import { Radio, Divider, Modal, Checkbox, Tag, Input, Spin, Table, DatePicker  } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker



const FilterItem = (props: any) => {
  const {
    styles,
    searchItems = [],
    oncheckBoxChange,
    filterOption,
    onRadiChange,
    selectedFilters,
    onChangeData
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])

  
  useEffect(()=>{
    if(filterOption?.dataType === 'table'){
    const key_name = filterOption.name;
      if(!selectedFilters?.[key_name]) {
        setSelectedRowKeys([])
      }
    }

  },[selectedFilters])

  const getDefaultCheck = (item: any) => {
    let dc: any = false;
    dc =
      selectedFilters[filterOption?.name] &&
      Object.keys(selectedFilters[filterOption?.name])?.find((i: any) => {
        if (selectedFilters[filterOption?.name]?.[i]?.checked) {
          return i === item[filterOption?.id];
        } else {
          return false;
        }
      })
        ? true
        : false;
    return dc;
  };
const rowSelection = {
  selectedRowKeys,
  onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
    onChangeData(selectedRowKeys?.[0], 'product', selectedRows?.[0]?.part_name)
    setSelectedRowKeys(selectedRowKeys)
  },
}

  return (
    <div className={styles.filter__content__filterItems}>
      {filterOption?.dataType === 'table' ? (
        <Table
          columns={filterOption.columns}
          dataSource={searchItems}
          pagination={false}
          size={'small'}
          rowKey={ (rcd) => rcd ?.[filterOption?.key]}
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
        />
      )
      :
      filterOption?.dataType === 'dateRange' ? (
        <RangePicker
        format={"DD/MM/YYYY"}
        onChange={(e:any) =>onChangeData(e,'date')}
        defaultValue={selectedFilters?.date || undefined}
        disabledDate = { current => current && current > moment(new Date(), 'YYYY-MM-DD')}

        />

      )
      
      : filterOption?.singleselect ? (
        <>
          <Radio.Group  value={selectedFilters?.[filterOption?.name]}>
            {searchItems &&
              searchItems?.map((item: any, index: any) => {
                return (
                  <Radio
                    style={{ width: '100%' }}
                    onChange={(e: any) => {
                      onRadiChange(e, item);
                    }}
                    key={
                      filterOption?.id ? `${item?.[filterOption?.id]}` : index
                    }
                    value={item?.[filterOption?.valuefield] || item?.[filterOption?.key]}
                  >
                    { item?.[filterOption?.key]}
                  </Radio>
                );
              })}
          </Radio.Group>
        </>
      ) : (
        <>
          {searchItems &&
            searchItems?.map((item: any, index: any) => {
              return (
                <Checkbox
                  onChange={(e: any) => {
                    // setchecked((pre: any) => !pre);
                    oncheckBoxChange(e, item);
                  }}
                  //@ts-ignore
                  // defaultChecked={getDefaultCheck(item)}
                  checked={getDefaultCheck(item)}
                  key={`${item?.[filterOption?.id]}`}
                >
                  {item?.[filterOption?.key]}
                </Checkbox>
              );
            })}
        </>
      )}
    </div>
  );
};

export default FilterItem;
