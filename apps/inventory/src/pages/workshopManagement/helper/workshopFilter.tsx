import React from 'react';
import { Row, Col, Select, DatePicker, Divider, Tooltip ,Button} from 'antd';
import AutoCompleteSearch from '../../../../../../libs/common/ui/AutoComplete/autoComplete';
import InputSearch from '../../../../../../libs/common/ui/InputSearch/inputSearch';
import { datetoFrom } from '../../../../../../libs/common/utils/common';
import moment from 'moment';
const { RangePicker } = DatePicker;

export const Filter = ({
  handleChange,
  filterOptions,
  serachPlaceholder,
  hideFilter,
  isHideStatus,
  autoCompleteSearchOptions,
  showAutoComplete,
  onSelect,
  defaultDate
}: any) => {
  return (
    <div className="filters">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          // padding: '15px 20px',
        }}
      >
        <Row
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          Filter:
          {/* <Col span={3}>
            <Select style={{ width: '100%' }} placeholder="Select Employee" />
          </Col> */}
          {!isHideStatus && (
            <Col span={3}>
              <Select
                style={{ width: '100%' }}
                placeholder="Select Status"
                onChange={(e) => handleChange(e, 'status')}
                allowClear
                options={
                  filterOptions }
              />
            </Col>
          )}
          <Col span={4}>
            <RangePicker
            onChange={(e) => handleChange(e, 'date')}
             defaultValue={defaultDate}
             format={"DD/MM/YYYY"}
             disabledDate = { current => current && current > moment(new Date(), 'YYYY-MM-DD')}

            />
          </Col>
          {!hideFilter && !showAutoComplete && (
            <Col span={6}>
              <InputSearch
                onChange={(e: any) => handleChange(e, 'search')}
                placeholder={serachPlaceholder}
              />
            </Col>
          )}
          {showAutoComplete && (
            <Col span={6}>
              <AutoCompleteSearch
                options={autoCompleteSearchOptions}
                onChange={(e: any) => handleChange(e, 'search')}
                placeholder={serachPlaceholder}
                onSelect={(e: any) => onSelect(e)}
              />
            </Col>
          )}
        </Row>
      </div>
      <Divider style={{ margin: '10px 0 10px 0' }} />
    </div>
  );
};


export const JobCardFilterData = [

  {
    datatype: 'Filter',
    name: 'filter',
    isReq: false,
    width:"100%",
    padding:'3px',
    sidebarItems: [
      {
        label: 'Status',
        appname:'htssuite',
        singleselect: true,
        key: 'value',
        valuefield:'value',
        // id: 'id',
        name:'status',
        options: [
          { value: 'Closed', label: 'Closed' },
          { value: 'Approved', label: 'Approved' },
        ]
      },
      {
        label: 'Used For',
        appname:'htssuite',
        singleselect: true,
        key: 'option_name',
        valuefield:'option_name',
        // id: 'id',
        name:'used_for',
        options:   [
          {
              "label": "Vehicle Use",
              "option_name": "Vehicle Use"
          },
          {
              "label": "General Use",
              "option_name": "General Use"
          },
          {
              "label": "Thirdparty Use",
              "option_name": "Thirdparty Use"
          }
      ]
      },
    
      // {
      //   label: 'Supplier',
      //   appname:'htsinventory',
      //   module: 'inventory_general_setup',
      //   doctype: 'inventory_supplier_details',
      //   singleselect: true,
      //   key: 'supplier_name',
      //   valuefield: 'name',
      //   // id: 'name',
      //   name:'supplier',
      //   filter: JSON.stringify({'Active': '1'}),
      // },
      {
        label: 'Product',
        appname:'htsinventory',
        module: 'inventory_product_configuration',
        doctype: 'inventory_product_master',
        singleselect: true,
        loadMore: true,
        key: 'name',
        dataType: 'table',
        // id: 'name',
        name:'product',
        valuefield: 'name',
        filter: JSON.stringify({'Active': '1'}),
        search: 'inventory_product_configuration.doctype.inventory_product_master.api.search_product?search=',
              columns: [
          {
            title: 'Part',
            key: 'part',
            dataIndex:'part'
          },
          {
            title: 'part name',
            key: 'part_name',
            dataIndex:'part_name'
          }
        ]
      },
      // {
      //   label: 'Date Range',
      //   appname:'htssuite',
      //   singleselect: true,
      //   dataType: 'dateRange',
      //   key: 'date',
      //   // id: 'id',
      //   name:'date',
        
      // }
    ]
  }

];

// export default Filter;
