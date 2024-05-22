import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  getFields,
  getRecordById,
  getDocTypes,
  updateRecord,
  createRecord,
} from '../../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import Message from '../../../../../../../libs/common/ui/Message/message';
/* @ts-ignore  */
import FormTable from '../../../../../../../libs/common/ui/Form_Table/FormTable';
import { useSearchParams } from 'react-router-dom';
import {
  dateFormat,
  datetoFrom,
  setFormData,
} from '../../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import SpinLoader from '../../../../../../../libs/common/ui/Loader/spinLoader';
type Props = { doc_id: any; url?: string; switchToNextTab?: any };


const Create = (props: Props) => {
  const { switchToNextTab = () => {}, doc_id } = props;
  const [searchParams] = useSearchParams();
  const mainId = searchParams.get('id') || '';
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>({});
  const [tableData, setTableData] = useState({});
   const [loading, setLoading] = useState(false)
  const [subid, setsubid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    getFields('Family details', 'htssuite').then((items) => {
      setformData(items);
      setLoading(false)
      const data: any = setFormData(items);
      !doc_id && setformValue(data);
    });

    if (mainId) {
      setLoading(true)
      const data = { name: mainId };
      getRecordById(
        'family_details',
        data,
        'employee_management',
        'htssuite'
      ).then((items) => {
        setsubid(items?.[0]?.name || null);
        setformValue({
          ...items?.[0],
        });
        setLoading(false)
        setTableData({ document: items?.[0]?.family });
      });
    }
  }, [mainId]);

  const handleFinish = (values: any) => {
    if (mainId && subid) {
      setLoading(true)
      const record = {
        doc_id: formValue?.name || mainId,
        data: {
          emp_code: mainId,
          family: JSON.stringify(values),
        },
      };
      updateRecord(
        'family_details',
        record,
        'employee_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-employee-details');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    } else {
      setLoading(true)
      const record = {
        emp_code: mainId,
        family: JSON.stringify(values),
      };
      createRecord(
        'family_details',
        record,
        'employee_management',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          navigate('/view-employee-details');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    }
  };

  let formDataFamilyRemoved = formData.filter((item: any) => {
    if (item.label === 'Family') {
      return false;
    }
    return true;
  });

  let values = [
    {
      label: 'Name',
      name: 'name1',
      datatype: 'Data',
      description: { type: 'onlychar', min: 3 },
      isReq: true,
    },
    {
      label: 'Date of Birth',
      name: 'dob',
      datatype: 'Date',
      isReq: true,
      options: 'family_dob',
    },
    {
      label: 'Age',
      name: 'age',
      datatype: 'Data',
      readonly:true,
      description: { type: 'int', maxlength: 3 },
    },
    {
      label: 'Gender',
      name: 'gender',
      datatype: 'Select',
      options: [
        {
          label: 'Male',
          value: 'Male',
        },
        {
          label: 'Female',
          value: 'Female',
        },
        {
          label: 'Other',
          value: 'Other',
        },
      ],
      isReq: true,
    },
    {
      label: 'Relation',
      name: 'relation',
      datatype: 'Data',
      description: { type: 'onlychar', min: 3 },
      isReq: true,
    },
    {
      label: 'Mobile number',
      name: 'contact',
      datatype: 'Data',
      description: { type: 'mobile', maxlength: 10 },
    },
  ];

  let columnsFamily = [
    {
      title: 'Name',
      dataIndex: 'name1',
      key: 'name1',
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
      render: (_: any, record: any) =>
        record?.dob ? moment(record?.dob).format('DD/MM/YYYY') : null,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Relation',
      dataIndex: 'relation',
      key: 'relation',
    },
    {
      title: 'Employee Code',
      dataIndex: 'emp_code',
      key: 'emp_code',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  // @ts-ignore
  let formDataValuesAdded = formDataFamilyRemoved.push(...values);
  const checkDuplicateData = (newData: any, oldData: any) => {
    for (let data of oldData) {
      if (data.name1 === newData.name1) {
        return null;
      }
    }
    return newData;
  };
  function calculateAge(dateOfBirth: any) {
    const dob: any = new Date(dateOfBirth);
    const currentDate: any = new Date();
    const timeDiff: any = currentDate - dob;
    const ageDate = new Date(timeDiff);

    // Extract the year component from the ageDate
    const age = ageDate.getUTCFullYear() - 1970;
    return age;
  }
  const handleChange = (val: any, name: any) => {
    if (name === 'dob' && val) {
      const date = dateFormat(val);
      const age = calculateAge(date);
      setformValue({
        ...formValue,
        age: age,
      });
    }
  };
  const handleCancel = () => {
    navigate('/view-employee-details');
  };
  return (
    <div>
      {/* @ts-ignore  */}
      <SpinLoader loading={loading}/>
      <FormTable
        formValue={formValue}
        formData={formDataFamilyRemoved}
        columns={columnsFamily}
        module="employee_management"
        doctype="family_details"
        doc_id={mainId}
        handleFinish={handleFinish}
        submitButtonLabel="Submit"
        checkDuplicateData={checkDuplicateData}
        onchangehandler={handleChange}
        tableData={tableData}
        handleCancel={handleCancel}
        goBack="/view-employee-details"
      />
    </div>
  );
};

export default Create;
