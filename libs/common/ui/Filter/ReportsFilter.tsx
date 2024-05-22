import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  FilterOutlined,
  LoadingOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Divider, Modal, Checkbox, Tag, Input, Spin, Tooltip } from 'antd';
import Sidebar from './component/Sidebar';
//@ts-ignore
import styles from './filter.module.scss';
import { getTableData, getTableDataWithPagination, searchApi } from '../../../../libs/common/api/doctype';
import { tableDataSearch } from '../globalSearch/helper';
import { FilterContext } from '../../../../libs/common/context/filtercontext';
import FilterItem from './component/FilterItem';
type Props = {};
const { Search } = Input;
export const FilterItemsContext = React.createContext({});
/**
 * {department_name:'abc',department_id:'HR\Ab\CD\001'}
 * @param key --> fieldName identifier for displaying filter items, department_name is the key
 * @param id--> Id of the selected filter items , department_id is the id
 * @param name ---> filter key (api?filter={department:'HR\Ab\CD\001'}), department is the name, filter identifier inside payload
 */
const ReportsFilter = (props: any) => {
  const { onChange } = props;
  const [openModal, setOpenModal] = useState<any>(false);
  //selcted doctype from sidebar
  const [filterOption, setFiletrOption] = useState<any>(
    props?.fieldData?.sidebarItems?.[0]
  );
  const [filterItems, setFilterItems] = useState<any>();
  const [searchItems, setSearchItems] = useState<any>();
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const [selectedRadioFilter, setSelectedRadioFilter] = useState<any>({});
  let timeout: any;
  // const { filter, updateFilter } = useContext<any>(FilterContext);
  useEffect(() => {
    if(Array.isArray(filterOption?.options)){
      setFilterItems(filterOption?.options);
      setSearchItems(filterOption?.options);
    }
    else if(filterOption?.loadMore) {
      getTableDataWithPagination(filterOption?.doctype,
        filterOption?.module,
        1, 20,
        filterOption?.appname,
        JSON.stringify({active: 1})
        ).then((items:any) => {
          setFilterItems(items?.data);
          setSearchItems(items?.data);
        })
    }
    else{
      if(filterOption?.doctype){
        getTableData(
          filterOption?.doctype,
          filterOption?.module,
          filterOption?.appname,
          JSON.stringify({ active: 1 })
        ).then((items: any) => {
          setFilterItems(items);
          setSearchItems(items);
        });
      }
    }
  
  }, [filterOption]);
  useEffect(() => {
    setSearchItems(filterItems);
  }, [openModal]);
  const handleClick = () => {
    setOpenModal(true);
  };
  const oncheckBoxChange = (e: any, item: any) => {
    setSelectedFilters((pre: any) => {
      let newfil = {
        ...pre?.[filterOption?.name],
        [item[filterOption?.id]]: {
          label: item[filterOption?.key],
          id: item[filterOption?.id],
          checked: e?.target?.checked,
        },
      };
      return { ...pre, [filterOption?.name]: newfil };
    });
  };

  const onRadiChange = (e: any, item: any) => {
    setSelectedRadioFilter((pre: any) => {
      let newfil = {
        ...pre?.[filterOption?.name],
        [filterOption?.name]: {
          label: item[filterOption?.key],
          id: item[filterOption?.id || filterOption?.valuefield],
          checked: e?.target?.checked,
          name: filterOption?.name
        },
      };
      return { ...pre, [filterOption?.name]: newfil };
    });
    setSelectedFilters((pre: any) => {
      return {
        ...pre,
        [filterOption?.name]:  e?.target?.checked ? e?.target?.value : '',
      };
    });
  };

  const onselectionchange = (e:any, item:string, data:any) => {
    setSelectedFilters((pre:any) => {
      return {
        ...pre,
        [item]: e
      }
    })
    setSelectedRadioFilter((pre: any) => {
      let newfil = {
        ...pre?.[filterOption?.name],
        [filterOption?.name]: {
          label: item[filterOption?.key] || data,
          id: item[filterOption?.id || filterOption?.valuefield] || data,
          checked: true,
          name: filterOption?.name
        },
      };
      return { ...pre, [filterOption?.name]: newfil };
    });
  }

  const handletagClose = (item: any) => {
    setSelectedFilters((prev: any) => {
      let newFilter: any;
  
      if (filterOption?.singleselect) {
        newFilter = {
          ...prev,
          [item?.name]: ""
        };
      } else {
        newFilter = {
          ...prev,
          [filterOption?.name]: {
            ...prev[filterOption?.name],
            [item.id]: false
          }
        };
      }
  
      return newFilter;
    });
  };
  const getSelectedFilters = () => {
    let selectedfil: any = [];
    const filters = {
      ...selectedFilters,
      ...selectedRadioFilter
    }
    Object.keys(filters).map((item) => {
      Object.keys(filters?.[item]).map((i: any) => {
        if (filters?.[item]?.[i]?.checked) {
          selectedfil.unshift({ ...filters?.[item]?.[i] });
        }
      });
    });
    return selectedfil.map((item: any) => {
      return (
        <div>
          <Tag
            color="purple"
            key={item?.id}
            closeIcon
            onClose={() => handletagClose(item)}
          >
            {item?.label}
          </Tag>
        </div>
      );
    });
  };
  const applyFilter = () => {
    let resultfil = { ...selectedFilters };
    Object.keys(resultfil).map((item: any) => {
      let selectedfil: any = [];
      if (typeof resultfil[item] === 'string') {
        selectedfil = resultfil[item];
      } else {
        if(item !== 'date') {
          Object.keys(resultfil[item]).map((i: any) => {
            if (resultfil[item][i]?.checked) {
              selectedfil.unshift(i);
            }
          });
        }
        else{
          selectedfil = resultfil[item]
        }
      }
      resultfil[item] = selectedfil;
    });

    onChange(resultfil);
    setOpenModal(false);
    // clearAll()
  };
  const onSearch = (e: any = '') => {
    let searchtext = e?.target?.value || e;
    if (e?.target?.value === '') {
      searchtext = '';
    }
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    const fetch = () => {
      const d = tableDataSearch(searchtext, filterItems, [filterOption?.key]);
      setSearchItems(d);
    };
    if (searchtext && !filterOption?.search) {
      timeout = setTimeout(fetch, 300);
    }
    else if(filterOption?.search){
      if(searchtext){
        const endPoint = `${filterOption?.search}${searchtext}`;
        searchApi(endPoint, filterOption?.appname).then((items) => {
          setSearchItems([...items]);
        });
      }
      else{
        // getTableDataWithPagination(filterOption?.doctype,
        //   filterOption?.module,
        //   1, 20,
        //   filterOption?.appname,
        //   JSON.stringify({active: 1})
        //   ).then((items:any) => {
        //     setFilterItems(items?.data);
        //     setSearchItems(items?.data);
        //   })
        setSearchItems(filterItems);
      }
    }
    else {
      setSearchItems(filterItems);
    }
  };
  const clearAll = () => {
    let fil = {};
    props?.fieldData?.sidebarItems?.map((item: any) => {
      fil = { ...fil, [item?.name]: '' };
    });
    setSelectedFilters(fil);
    setSelectedRadioFilter({});
    onChange(fil);
    //setOpenModal(false);
  };

  const handleCancel = ()=>{
    setOpenModal(false)
    clearAll()
  }

  return (
    <div>
      {/* <Button
        onClick={handleClick}
        style={{
          height: props?.fieldData?.height || '40px',
          color: 'rgb(0 0 0 / 25%)',
          fontSize: '0.8125rem',
          width: props?.fieldData?.width || 'auto'
        }}
      >
        {true ? (
          <>
            <span style={{ marginRight: '8px' }}>Apply Filter</span>
            <FilterOutlined />
          </>
        ) : (
          <>
            <span style={{ marginRight: '8px' }}>loading</span>

            <Spin
              size="small"
              indicator={
                <LoadingOutlined
                  color="rgb(0 0 0 / 25%)"
                  style={{ fontSize: '0.8125rem' }}
                  spin
                />
              }
            />
          </>
        )}
      </Button> */}
      <div
        style={{
          padding: props?.fieldData?.padding || '6px',
          border: '1px solid #d9d9d9',
          borderRadius:'5px',
          fontSize: '15px',
          textAlign:'center',
          width: props?.fieldData?.width ||  '30%',
          cursor: "pointer"
        }}
        onClick={handleClick}
      >
        <Tooltip title="Filter">
          <FilterOutlined  />
        </Tooltip>
      </div>

      <Modal
        title="Additional Filters"
        open={openModal}
        onCancel={handleCancel}
        // onOk={handleSave}
        width={800}
        style={{ height: '70vh' }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              clearAll();
              //setSelectedFilters({});
              // setViewFilters({});
            }}
          >
            Clear All Filters
          </Button>,
          <Button key="submit" type="primary" onClick={applyFilter}>
            Apply Filters
          </Button>,
        ]}
      >
        <Divider style={{ margin: ' 10px 0 ' }} />
       
        <div className={styles.filter__selected}>
          <span
            style={{ fontSize: '12px', lineHeight: '20px', color: '#707070' }}
          >
            Applied Filters :
          </span>
          {selectedFilters && getSelectedFilters()}
        </div>
        <Divider style={{ margin: ' 10px 0 ' }} />
        <div className={styles.filter__content}>
          <Sidebar
            setFiletrOption={setFiletrOption}
            setFilterItems={setSearchItems}
            filterOption={filterOption}
            sidebarItems={props?.fieldData?.sidebarItems}
          />
          <div className={styles.filter__content__main}>
            <div className={styles.filter__content__main_tittle}>
              {filterOption?.label}
            </div>
            <Divider style={{ margin: ' 10px 0 ' }} />
            {filterOption?.dataType !== 'dateRange' && (
              <div className={styles.filter__content__filterSearch}>
                <Input
                  addonBefore={<SearchOutlined />}
                  placeholder="Search filters"
                  // onSearch={onSearch}
                  onChange={onSearch}
                  style={{ width: '100%' }}
                />
              </div>
            )}
            <div className={styles.filter__content__filterwrapper}>
              <FilterItem
                styles={styles}
                searchItems={searchItems}
                oncheckBoxChange={oncheckBoxChange}
                filterOption={filterOption}
                onRadiChange={onRadiChange}
                selectedFilters={selectedFilters}
                onChangeData={onselectionchange}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReportsFilter;