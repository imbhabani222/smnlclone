import React from 'react';
import { Row, Col, Button, Divider, DatePicker } from 'antd';
import moment from 'moment';
import SmnlFormDynamicLayout from '../Form/SmnlFormDynaminLayout';
import AutoCompleteSearch from '../AutoComplete/autoComplete';
import FormFields from '../Form/FormFields';
import ReportsFilter from './ReportsFilter';
import InputSearch from '../../../../libs/common/ui/InputSearch/inputSearch';


const { RangePicker } = DatePicker;



const InventoryFilter = ({ formData, onHandleChangeFilter, appname, showAutoComplete =false , autoCompleteSearchOptions, onSelect, serachPlaceholder, handleChange, exportXl,showExportExcel, showDateFilter=false, defaultDate, showSearch=false }: any) => {
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
            gap:'20px'
          }}
        >
          <>
            {/* Filter: */}
         {
          showSearch &&
         
            <Col span={6}>
              <InputSearch
                onChange={(e: any) => handleChange(e, 'search')}
                placeholder={serachPlaceholder}
              />
            </Col>
}

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

            {
              showDateFilter&&(
                <Col span={5}>
                <RangePicker
                 onChange={(e) => handleChange(e, 'date')}
                 defaultValue={defaultDate}
                 format={"DD/MM/YYYY"}
                 disabledDate = { current => current && current > moment(new Date(), 'YYYY-MM-DD')}
    
                />
              </Col>
              )
            }
               <Col span={1}>
              {/* <SmnlFormDynamicLayout
                sectionData={formData}
                onChange={onHandleChangeFilter}
                appname={appname}
              /> */}
              <ReportsFilter onChange = {onHandleChangeFilter} fieldData = {formData?.[0]}/>
            </Col>
          </>
        </Row>
        {showExportExcel && (
          <div onClick={exportXl}>
            <Button type="primary" onClick={exportXl}>
              Export to Excel
            </Button>
            {/* <Tooltip placement="top" title="Export to excel">
            <ExcelIcon style={{ cursor: 'pointer' }} />
          </Tooltip> */}
            {/* <PdfIcon /> */}
          </div>
        )}
      </div>
      <Divider style={{ margin: '10px 0 10px 0' }} />
    </div>
  );
};

export default InventoryFilter;
