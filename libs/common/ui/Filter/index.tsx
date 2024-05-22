import React from 'react';
import { Row, Col, Select, DatePicker, Divider, Tooltip ,Button} from 'antd';
import moment from 'moment';
import InputSearch from '../InputSearch/inputSearch';
//@ts-ignore
import { ReactComponent as PdfIcon } from '../../assets/iconss/pdf.svg';
//@ts-ignore
import { ReactComponent as ExcelIcon } from '../../assets/icons/excel.svg';
import AutoCompleteSearch from '../AutoComplete/autoComplete';

const { RangePicker } = DatePicker;

const Filter = ({
  handleChange,
  exportXl,
  filterOptions,
  serachPlaceholder,
  hideFilter,
  isHideStatus,
  autoCompleteSearchOptions,
  showAutoComplete,
  onSelect,
  hideExportExcel,
  SectionFilter,
  showDate,
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
          {/* <Col span={3}>
            <Select style={{ width: '100%' }} placeholder="Select Employee" />
          </Col> */}
          {!isHideStatus && (
            <>
              Filter:
              <Col span={3}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select Status"
                  onChange={(e) => handleChange(e, 'status')}
                  allowClear
                  options={
                    filterOptions || [
                      { value: 'Rejected', label: 'Rejected' },
                      { value: 'Approved', label: 'Approved' },
                      { value: 'Pending', label: 'Pending' },
                    ]
                  }
                />
              </Col>
              {SectionFilter && (
              <> 
              <Col span={3}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select Section"
                  onChange={(e) => handleChange(e, 'section')}
                  allowClear
                  options={
                    SectionFilter
                  }
                />
              </Col>
              </>
              )}
              {
              showDate &&   <Col span={5}>
              <RangePicker
              onChange={(e) => handleChange(e, 'date')}
              disabledDate = { current => current && current > moment(new Date(), 'YYYY-MM-DD')}
              defaultValue={defaultDate}
              format={"DD/MM/YYYY"}
              />
              </Col>
              }
              
            </>
          )}
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
          {/* <Col span={6}>
            <RangePicker />
          </Col> */}
        </Row>
        {!hideExportExcel && (
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

export default Filter;
