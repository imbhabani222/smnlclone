import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Tooltip ,Button} from "antd";
import {
  getDocTypes,
  getTableDataWithPagination,
  getTableData,
  getEmployeeData
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import { Context } from '../../../../../../libs/common/context/context';
import { FilterContext } from '../../../../../../libs/common/context/filtercontext';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import Drawer from '../../../../../../libs/common/ui/Drawer/drawer';
import InputSearch from '../../../../../../libs/common/ui/InputSearch/inputSearch';
import {ReactComponent as ExcelIcon} from '../../../../../../libs/common/assets/icons/excel.svg'
import { handleExportforEmployeeList } from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import Cookies from 'universal-cookie';
// import Button from '../../../../../../libs/common/ui/Form/FormButton';


type Props = {};

const fields = [
  {
    datatype: 'Link',
    label: 'Employee',
    name: 'name',
    options: 'personal_details',
    colSpan: 1,
    isReq: true,
    description: { linkfield: 'full_name', modulename: 'employee_management' },
  },
];

const EmployeeSetup = (props: Props) => {
  const cookies = new Cookies();
  const pageSize = cookies.get('pageSize');
  const [columns, setcolumns] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [paginationData, setPaginationData] = useState<any>({page_length:pageSize|| 10, current_page: 1})
  const [searchItem, setSearchItem] = useState(null);
  const [exportDisabled, setExportDisabled] = useState(false)
  // @ts-ignore
  const { filter, updateFilter } = useContext(FilterContext);

  const tableData = (e: any, current_page:number, page_length:number, search:any) => {
    setloading(true)
    getTableDataWithPagination('personal_details', 'employee_management', current_page, page_length, 'htssuite', JSON.stringify(e), search).then(
      (items: any) => {
        const data = items?.data?.map((record:any)=>({
          ...record,
          employee_id : record?.name,
          date_of_birth : new Date(record?.date_of_birth).toLocaleDateString('en-GB')

        }))
        setdata(data);
        setPaginationData({total_records:items?.total_records,page_length:items?.page_length, current_page: items?.current_page })
        setloading(false);
      }
    );
  };

  useEffect(() => {
    setloading(true);
    getDocTypes('Personal Details', false, 'htssuite').then((items: any) => {
      let newData = items.filter((item: any) => {
        const reqfields = [
          'employee_id',
          'full_name',
          'date_of_birth',
          'mobile_no',
          'gender',
          'blood_group',
          'action',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      setcolumns(newData);
      setloading(false)
    });
    tableData({active:1}, paginationData?.current_page, paginationData?.page_length, null);
   
  }, []);
  



  const handleClose = () => {
    updateFilter(false);
  };

  const handleFilter = (e: any) => {
    updateFilter(false);
    setloading(true);
    tableData(
      e,
      paginationData?.current_page,
      paginationData?.page_length,
      null
    );
  };
  const onHandleChangePagination = (
    current_page: number,
    page_length: number
  ) => {
    tableData({ active: 1 }, current_page, page_length, searchItem);
    setPaginationData({ ...paginationData, current_page, page_length });
  };
  const handleChange = (e: any) => {
    const current_page = 1;
    const page_length = 10;    
    tableData({ active: 1 }, current_page, page_length, e);
    setSearchItem(e);
  }
  

const exportXl = ()=>{
  setExportDisabled(true)
  getEmployeeData('personal_details','employee_management','htssuite').then((items:any)=>{
    const data = items?.map((record:any)=>({
      ...record,
      employee_id : record?.name,

    }))

    // setExcelData(data)
    if (data && data?.length > 0) {
    
      const its :any = []
      data.map((e:any,index:any)=>{
        its.push({
          'Sl No.' : `${index+1}`,
          'Old Employee Code' : e?.old_emp_code,
          'Employee Id': e?.employee_id,
          'Full Name' : e?.full_name,
            'Date of Birth' : e?.date_of_birth,
            'Mobile No.': e?.mobile_no,
            'Gender': e?.gender,
            'Blood Group': e?.blood_group,
            'Aadhar Card' : e?.aadhar_no,
            'Email Id' : e?.email,
            "Father's Name" : e?.fathershusbands_name,
            "Mother's Name" : e?.mothers_name,
            'Spouse Name' : e?.spouse_name,
            'PAN No.' : e?.pan_no,
            'Qualifications' : e?.qualification_name,
            'Marital Status' : e?.maritial_status,
            'Wedding Date' : e?.wedding_date,
            'Remarks' : e?.remarks,
            'Upload Photo' : e?.upload_photo,
            'Designation' : e?.designation,
            'Department' : e?.department_name,
            'Section' : e?.section_name,
            'Branch' : e?.branch_name,
            'Employee Grade' : e?.grade_name,
            'Employment Type' : e?.employment_type,
             'Employee Category' : e?.category_name,
             'Default Shift' : '',
             'Applicable Shift' : '',
             'Reporting manager': e?.repo_manager,
             'Date of Joining' : e?.date_of_joining,
             'Confirmation Date' : e?.confirmation_date,
             'Work Location' : e?.location_name,
             'Account Number' : '',
             'Bank Name' : e?.bank_name,
             'Branch Name' : e?.branch_name,
             'Account Holder Name' : e?.account_holder_name,
             'IFSC Code' : e?.bank_ifsc_code,
             'PF Number' : e?.pf_number,
             'UAN Number' : e?.uan_number,
             'ESI Number' : e?.esi_number,
            'Passport Number' : e?.passport_no,
            'Valid Upto' : e?.valid_upto,
            'Driving License No.' :e?.driving_license_no,
            'Validity Upto' : e?.validity_upto,
        })
      })
  
      handleExportforEmployeeList(its,'Employee List','Employee List')
      setExportDisabled(false)
      
    }
     
  })  
  
}

  return (
    <div>
     
      {/* <Drawer
        handleClose={handleClose}
        open={filter}
        appname="htssuite"
        fields={fields}
        handleFilter={handleFilter}
      /> */}
      <div
        className="filters"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        <Row
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <Col span={6}>
            <InputSearch
              onChange={(e: any) => handleChange(e)}
              placeholder={'Search by Employee Name'}
            />
          </Col>
          <Col span={16}></Col>
          <Col span={2}>
           
            <Button  style={{background:"#fff", color:"#272083", border:"1px solid #272083"}} 
            onClick={exportXl}
           disabled= {exportDisabled}
            >
              {exportDisabled? "Genrating excel file ..." :"Export to Excel" }
              
              </Button>
             
            {/* <Tooltip placement='top' title='Export to excel'>
            <ExcelIcon style={{cursor:"pointer"}} onClick={exportXl}/>
            </Tooltip> */}
            </Col>
        </Row>
      </div>
      <Spin loading={loading} />
      <Table
        column={columns}
        dataSource={data}
        totalNumberofRecords={paginationData?.total_records}
        currentPage={paginationData?.current_page}
        onChangePagination={onHandleChangePagination}
        editUrl="/add-employee-details"
      />
    </div>
  );
};

export default EmployeeSetup;