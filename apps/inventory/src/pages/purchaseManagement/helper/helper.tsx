import moment from 'moment';
import { Button, Divider, Popover, Row, Col, Select,Input } from 'antd';
import FormFields from '../../../../../../libs/common/ui/Form/FormFields';





export const fields = [
  {
    datatype: 'Link',
    label: 'Supplier',
    name: 'supplier',
    options: 'Inventory Supplier Details',
    colSpan: 1,
    description: JSON.stringify({
        linkfield: 'supplier_name',
        modulename: 'inventory_general_setup',
      }),  },
 
];

export const Filter = ({
  handleSupplierChange,
  supplierList,
  handleOrderNoChange
}: any) => {
  return (
    <div>
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
            gap: '15px',
          }}
        >
          Supplier:
          <Col span={3}>
            <Select
              style={{ width: '100%' }}
              placeholder="Select Supplier"
              onChange={handleSupplierChange}
              allowClear
              options={supplierList}
            />
          </Col>
         
        </Row>
      </div>
      <Divider  />
    </div>
  );
};


export const purchaseIndentFilter = [
  // {
  //   datatype: 'Search',
  //   label: '',
  //   name: 'search',
  //   options: undefined,
  //   placeHolder: "Search by Indent no"
  // },
  {
    datatype: 'Filter',
    name: 'filter',
    isReq: false,
    // height:'31px',
    width:"100%",
    padding:'3px',
    sidebarItems: [
      {
        label: 'Status',
        appname:'htssuite',
        singleselect: true,
        key: 'value',
        // id: 'id',
        valuefield: 'value',
        name:'status',
        options: [
          { label: 'Pending', value: 'Pending' },
          { label: 'Active', value: 'Active' },
          { label: 'Partial Indent', value: 'Partial Indent' },
          { label: 'Closed', value: 'Closed' },
          { value: 'Approved', label: 'Approved' },

        ]
      },
      {
        label: 'Section',
        appname:'htsinventory',
        module: 'inventory_general_setup',
        doctype: 'inventory_section',
        singleselect: true,
        key: 'section_name',
        valuefield: 'name',
        // id: 'name',
        name:'section',
        filter: JSON.stringify({'Active': '1'}),
      },
      {
        label: 'Product',
        appname:'htsinventory',
        module: 'inventory_product_configuration',
        doctype: 'inventory_product_master',
        singleselect: true,
        loadMore: true,
        key: 'name',
        dataType: 'table',
        valuefield: 'name',

        // id: 'name',
        name:'product',
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

export const purchaseOrderFilter = [

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
          { value: 'Pending', label: 'Pending' },
          { value: 'Active', label: 'Active' },
          { value: 'Approved', label: 'Approved' },
          { value: 'Rejected', label: 'Rejected' },
          { value: 'Partial Supplied Order', label: 'Partial Supplied Order' },
          { value: 'Full Supplied Order', label: 'Full Supplied Order' },
          { value: 'Short Close', label: 'Short Close' },
          { value: 'Cancel', label: 'Cancel' },
        ]
      },
      {
        label: 'Supplier',
        appname:'htsinventory',
        module: 'inventory_general_setup',
        doctype: 'inventory_supplier_details',
        singleselect: true,
        key: 'supplier_name',
        valuefield: 'name',
        // id: 'name',
        name:'supplier',
        filter: JSON.stringify({'Active': '1'}),
      },
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