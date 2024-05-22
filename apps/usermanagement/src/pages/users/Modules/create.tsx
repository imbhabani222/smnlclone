/* eslint-disable array-callback-return */
import { useState } from 'react';
import {
  createPermissions,
  getPermissionsByRoles,
  updatePermissions,
  getPermissionsDocTypes,
  getAllModules,
  getBlockedModulesFormUser,
} from '../../../../../../libs/common/api/doctype';

import { Select } from 'antd';

import SelectBox from '../../../../../../libs/common/ui/SelectBox/SelectBox';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { Checkbox, Row, Col } from 'antd';
import style from './state.module.scss';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';

const fileds = [
  {
    datatype: 'Link',
    label: 'Employee',
    name: 'employee_name',
    options: 'personal_details',
    description: { linkfield: 'full_name', modulename: 'employee_management' },
    isReq: true,
  },
  {
    datatype: 'Link',
    label: 'App Name',
    name: 'app_name',
    options: 'app_name',
  },
];

const Create = () => {
  const [formValue, setformValue] = useState({
    role_name: '',
  });

  const [employee, setemployee] = useState<any>(null);
  const [appname, setappname] = useState('');
  const [formData, setformData] = useState([]);

  const getModules = (emp: any, e: string) => {
    const data = { name: emp, appname: e };
    getAllModules(e).then((items: any) => {
      const newFormData: any = [];
      items.map((e: any) => {
        newFormData.push({
          datatype: 'Check',
          label: e,
          name: e,
          options: undefined,
        });
      });
      console.log(newFormData);
      // const fData = [...editFields, ...newFormData];
      setformData(newFormData);

      getBlockedModulesFormUser(emp, 'htssuite').then((e: any) => {
        console.log(e, 'ssf');
      });

      // getBlockedModulesFormUser(term, 'htssuite').then((e: any) => {
      //   if (e && e?.length > 0) {
      //     const newformValues: any = {};
      //     items.map((d: any) => {
      //       const fd = e?.find((i: any) => i === d);
      //       if (fd) {
      //         newformValues[d] = 0;
      //       } else {
      //         newformValues[d] = true;
      //       }
      //     });

      //     // getUsersById(data, 'htssuite').then((items) => {
      //     //   const forms = {
      //     //     role_name: items?.roles?.[0]?.role,
      //     //     user_id: items?.userid,
      //     //     active: items?.enabled === 1,
      //     //     username: items?.username,
      //     //     ...newformValues,
      //     //   };
      //     //   setformValue(forms);
      //     // });
      //   } else {
      //     const newformValues: any = {};
      //     items.map((d: any) => {
      //       const fd = e?.find((i: any) => i === d);
      //       if (fd) {
      //         newformValues[d] = 0;
      //       } else {
      //         newformValues[d] = true;
      //       }
      //     });

      //     // getUsersById(data, 'htssuite').then((items) => {
      //     //   const forms = {
      //     //     ...items,
      //     //     role_name: items?.roles?.[0]?.role,
      //     //     user_id: items?.userid,

      //     //     active: items?.enabled === 1,
      //     //     username: items?.username,
      //     //     ...newformValues,
      //     //   };
      //     //   setformValue(forms);
      //     // });
      //   }
      // });
    });
  };
  const handleChange = (e: any) => {
    console.log(e);

    // const rols: any = {
    //   role_name: role,
    // };

    // setRolePermissions(rols);
    // if (appname) {
    //   // getPermissions(rols, appname);
    // }
  };

  const handleChangeApp = (e: any) => {
    console.log(e);
    setappname(e);
    getModules(employee, e);
    // getPermissions(rolpermissions, e);
  };

  const handleFinish = (e: any) => {
    console.log(e);
  };

  return (
    <div className={style.permission}>
      <div
        className={style.content}
        style={{ position: 'relative', height: '100%' }}
      >
        <Row>
          <Col lg={10}>
            <div style={{ marginBottom: '10px' }}>Select Roles</div>
            <SelectBox
              fieldData={fileds?.[0]}
              handleChange={handleChange}
              appname="htssuite"
            />
          </Col>
          <Col lg={1} />
          <Col lg={10}>
            <div style={{ marginBottom: '10px' }}>Select App</div>
            <Select
              size={'large'}
              onChange={handleChangeApp}
              style={{ width: '100%' }}
              // style={{ width, height }}
              showSearch={true}
              options={[
                { label: 'Hrms', value: 'htssuite' },
                { label: 'Inventory', value: 'htsinventory' },
                { label: 'Account', value: 'htsaccount' },
                { label: 'Opeartion', value: 'htsoperation' },
              ]}
              // {...props}
              // value={value}
              placeholder="Select App"
              // mode={mode}
              // filterOption={dec?.filter ? filterOption : filterOptionData}
              // disabled={
              //   props?.fieldData?.disabled || props?.fieldData?.readonly || false
              // }
              // maxTagCount={'responsive'}
              allowClear
              // onClear={handleClear}
            />
            {/* <SelectBox
              fieldData={fileds?.[1]}
              handleChange={handleChange}
              appname="htssuite"
            /> */}
          </Col>
        </Row>
        {/* {formData && formData?.length > 0 ? ( */}
        <Row>
          <Col lg={24}>
            <div style={{ margin: '25px 0' }}>Allow Modules</div>
          </Col>
          <FormWrapper
            formValue={formValue}
            formData={formData}
            handleFinish={handleFinish}
            appname="htssuite"
            dynamicLayout
          />
        </Row>
        {/* ) : null} */}
      </div>
    </div>
  );
};

export default Create;
