import { message } from 'antd';

export const generateFormData = (data = []) => {
  const formData: any = [];
  let items: any = { title: '', fields: [] };
  data.map((field: any, index) => {
    if (field.datatype === 'Section Break' || index === data.length - 1) {
      if (index === data.length - 1) {
        items.fields.push(field);
      }
      if (items.title?.length >= 0 && items.fields?.length) {
        formData.push({ title: items.title, fields: [...items.fields] });
      }
      items.title = field.label;
      items.fields = [];
    } else {
      items.fields.push(field);
    }
  });
  return formData;
};

export const addExtraFields = (data = [], fields: any) => {
  let newData = data.map((field: any) => {
    const filedData: any = fields.find((e: any) => e.name === field.name);
    if (field.datatype === 'Link' && filedData?.name) {
      return { ...field, module: filedData?.module };
    } else return field;
  });
  return newData;
};

export const removeEmployeCodeFields = (data = []) => {
  const newData = data.filter((item: any) => {
    if (item.label === 'Employee Code') {
      return false;
    }
    return true;
  });
  return newData;
};

export const disableAllFieldsHandler = (data: any = []) => {
  const newData = data.map((item: any) => {
    return { ...item, readonly: true };
  });
  return newData;
};

export const CustomiseData = (data: any, methods?: any) => {
  let newData = data;
  if (methods?.addCheckboxColSpan) {
    newData = addCheckboxColSpan(newData);
  }
  return newData;
};
const addCheckboxColSpan = (data: any) => {
  return data.map((field: any) => {
    if (field?.datatype === 'Check' || field?.datatype === 'Long Text') {
      if (
        field?.datatype === 'Check' ||
        field?.datatype === 'Long Text' ||
        field?.datatype === 'Attach Image'
      ) {
        field = { ...field, colSpan: 24 };
      }
    }
    return field;
  });
};

export const removeFields = (data = [], label: string) => {
  const newData = data.filter((item: any) => {
    if (item.label === label) {
      return false;
    }
    return true;
  });
  return newData;
};
export const defaultRequiredRule = (e: boolean, fieldData: any) => {
  const { label, datatype = '' } = fieldData;
  if (e) {
    if (
      datatype === 'Select' ||
      datatype === 'MultiSelect' ||
      datatype === 'Link' ||
      datatype === 'financial_year' ||
      datatype === 'Date'
    ) {
      return [
        {
          required: true,
          message: `Please select the ${label.toLowerCase()}`,
        },
      ];
    } else if (datatype === 'Attach Image') {
      return [
        {
          required: true,
          message: `Please ${label.toLowerCase()}`,
        },
      ];
    } else {
      return [
        {
          required: true,
          message: `Please enter the ${label.toLowerCase()}`,
        },
      ];
    }
  }
  return [{ required: false, message: '' }];
};

const ruleMap: any = {
  pincode: [
    //{ min: 6, message: 'Please Enter 6-digits ' },
    {
      pattern: new RegExp(/^[1-9][0-9]{5}$/),
      message: 'Please enter the valid PIN Code',
    },
  ],
  email: [
    {
      pattern : new RegExp(/^[a-zA-Z0-9]+([._][a-zA-Z0-9]+)?@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)?$/),
      // type: 'email',
      message: 'Please enter the valid email ID',
      required: false,
    },
  ],
  mobile: [
    { min: 10, max: 10, message: 'Please Enter 10-digits Mobile-no' },
    {
      pattern: new RegExp(/^[0-9]*$/),
      message: 'Enter Valid Mobile-no',
    },
  ],
  phoneno: [
    { min: 10, max: 10, message: 'Please Enter 10-digits Phone No' },
    {
      pattern: new RegExp(/^[0-9]*$/),
      message: 'Enter Valid Mobile-no',
    },
  ],
  gstno: [
    {
      min: 15,
      max: 15,
      // pattern: new RegExp(/^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/),
      pattern: new RegExp(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
      ),
      message: 'Enter Valid GST No.',
    },
  ],
  gst_no: [
    {
      min: 15,
      max: 15,
      // pattern: new RegExp(/^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/),
      pattern: new RegExp(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
      ),
      message: 'Enter Valid GST No.',
    },
  ],
  panno: [
    {
      pattern: new RegExp(/[A-Z]{5}[0-9]{4}[A-Z]{1}/),
      message: 'Enter Valid PAN No. ',
    },
  ],
  accountno: [
    {
      pattern: new RegExp(/^\d{8,18}$/),
      message: 'Enter Valid Account No',
    },
  ],
  esi: [
    {
      pattern: new RegExp(/^[0-9]+$/),
      message: 'Enter Valid ESI No',
    },
  ],
  uan: [
    {
      pattern: new RegExp(/^\d{12}$/),
      message: 'Enter Valid UAN No',
    },
  ],
  onlystring: [
    {
      pattern: new RegExp(/^[a-z A-Z]+$/),
      message: 'Symbols and Numbers are not allowed',
    },
  ],
  city: [
    { min: 3, message: 'Please Enter minimum 3 Characters' },
    {
      pattern: new RegExp(/^[a-z A-Z]+$/),
      message: 'Numbers and Symbols are not Allowed',
    },
  ],

  state_name: [
    { min: 3, message: 'Please Enter minimum 3 Characters' },
    {
      pattern: new RegExp(/^[a-z A-Z]+$/),
      message: 'Numbers and Symbols are not Allowed',
    },
  ],
  companyName: [
    { min: 2, message: 'Please Enter minimum 2 Characters' },
    {
      pattern: new RegExp(/^[a-zA-Z0-9\s]+$/),
      message: 'Symbols are not Allowed',
    },
  ],
  cin: [
    {
      pattern: new RegExp(/[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}/),
      message: 'Invalid CIN Number',
    },
  ],
  tan: [
    {
      pattern: new RegExp(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/),
      message: 'Invalid TAN Number',
    },
  ],
  cst: [
    { min: 11, message: 'Please Enter minimum 11 Characters' },
    {
      pattern: new RegExp(/^[a-zA-Z0-9]+$/),
      message: 'Invalid CST Number',
    },
  ],
  vat: [
    { min: 9, message: 'Please Enter minimum 9 Characters' },
    {
      pattern: new RegExp(/^[a-zA-Z0-9]+$/),
      message: 'Invalid VAT Number',
    },
  ],
  servicetax: [
    {
      pattern: new RegExp(/[A-Z]{5}[0-9]{4}[A-Z]{1}[S]{1}[DT]{1}[0-9]{3}/),
      message: 'Invalid servicetax Number',
    },
  ],
  password: [
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message:
        '8 characters long atleast 1 alphabetical character & 1 number & 1 special character',
    },
    ({ getFieldValue }: { getFieldValue: (field: string) => any }) => ({
      validator(_: any, value: any) {
        if (!value || getFieldValue('old_password') !== value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('The Old password cannot be new one'));
      },
    }),
  ],

  onlychar: [
    {
      pattern: new RegExp(/^[a-zA-Z&\s]+$/),
      message: 'Symbols and numbers are not allowed',
    },
  ],
  charandinteger: [
    {
      pattern: new RegExp(/^[a-zA-Z0-9&\s]+$/),
      message: 'Symbols are not allowed',
    },
  ],
  onlyCharIntegerUpCase: [
    {
      pattern: new RegExp(/^[A-Z0-9]+$/),
      message: 'Symbols are not allowed',
    },
  ],
  onlyCharIntegerLoCase: [
    {
      pattern: new RegExp(/^[a-z0-9]+$/),
      message: 'Symbols are not allowed',
    },
  ],
  ifsc: [
    {
      pattern: new RegExp(/^[A-Z]{4}0[A-Z0-9]{6}$/),
      message: 'Invalid IFSC code',
    },
  ],
  int: [
    {
      pattern: new RegExp(/^[0-9]+$/),
      message: 'Invalid entry',
    },
  ],
  leavecode: [
    {
      pattern: new RegExp(/^[a-zA-Z ]+$/),
      message: 'Symbols and numbers are not allowed',
    },
  ],
  seniorCitizen: [
    {
      pattern: new RegExp(/^([6-8][0-9]|90)$/),
      message: 'senior citizen should be 60 to 90',
    },
  ],
  passport: [
    {
      pattern: new RegExp(/^[A-Z]{1}[1-9]{1}[0-9]{6}$/),
      message: 'Invalid passport number',
    },
  ],
  float: [
    {
      pattern: new RegExp(/^\d+(\.\d+)?$/),
      message: 'Invalid entry',
    },
  ],
  encashBalance: [
    {
      pattern: new RegExp(/^[45-9]\d$/),
      message: 'Invalid',
    },
  ],
  claim: [
    ({}) => ({
      validator(_: any, value: any) {
        if (!value || (parseFloat(value) >= 1 && parseFloat(value) <= 100)) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error('Enter Percentage value between 1 to 100')
        );
      },
    }),
    {
      pattern: new RegExp(/^[\d]{0,2}[\.]{0,1}[\d]{0,2}$/),
      message: 'Invalid Percentage',
    },
  ],
  percentage: [
    ({}) => ({
      validator(_: any, value: any) {
        if (!value || (parseFloat(value) >= 0.0 && parseFloat(value) <= 100)) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error('Enter Percentage value between 0.0 to 100')
        );
      },
    }),
    {
      pattern: new RegExp(/^[\d]{0,2}[\.]{0,1}[\d]{0,2}$/),
      message: 'Invalid Percentage',
    },
  ],
  percentage1: [
    ({}) => ({
      validator(_: any, value: any) {
        if (!value || parseFloat(value) <= 100) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error('Enter Percentage value between 0 to 100')
        );
      },
    }),
    {
      pattern: new RegExp(/^[\d]{0,2}[\.]{0,1}[\d]{0,2}$/),
      message: 'Invalid Percentage',
    },
  ],
  pf: [
    {
      pattern: new RegExp(/^[a-zA-z]{5}[0-9]{17}$/),
      message: 'Invalid pf number',
    },
  ],
  price: [
    {
      pattern: new RegExp(/^[1-9][0-9]*(\.[0-9]+)?$/),
      message: 'Invalid Price',
    },
  ],
  amount: [
    {
      pattern: new RegExp(/^[1-9][0-9]*(\.[0-9]+)?$/),
      message: 'Invalid Amount',
    },
  ],
  confirmPassword: [
    ({ getFieldValue }: { getFieldValue: (field: string) => any }) => ({
      validator(_: any, value: any) {
        if (!value || getFieldValue('new_password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error('The new password that you entered do not match!')
        );
      },
    }),
  ],
  drivingLicense: [
    {
      pattern: new RegExp(/^[A-Z]{2}\d{2}\d{4}\d{7}$/),
      message: 'Invalid Driving License',
    },
  ],
  charandintegerandspace: [
    {
      pattern: new RegExp(/^[A-Za-z0-9 ]+$/),
      message: 'Symbols are not allowed',
    },
  ],
  aadhar: [
    {
      pattern: new RegExp(/^\d{12}$/),
      message: 'Invalid Aadhaar',
    },
  ],
  address: [
    {
      pattern: new RegExp(/^.{3,}$/),
      message: 'Please Enter minimum 3 Characters ',
    },
  ],
  alphaNumeric_StartwithChar: [
    {
      pattern: new RegExp(/^[a-zA-Z][a-zA-Z0-9\s]*$/),
      message:
        'Please start with an alphabetical character and use only letters and numbers',
    },
  ],
  alphabets_hyphens: [
    {
      pattern: new RegExp(/^[a-zA-Z\-]+$/),
      message: 'Input should only contain alphabets and hyphens',
    },
  ],
  chassis_no : [
    {
      pattern: new RegExp(/^[a-zA-Z0-9]{17}$/),
      message: 'Please enter 17 alphanumeric characters',
    }
  ],
  msme_no : [
    {
      pattern: new RegExp(/^[a-zA-Z]{2}\d{2}[a-zA-Z]\d{7}$/),
      message: 'Please enter valid MSME Number'
    }
  ],
  leave_type : [
    {
      pattern: /^(?:[1-9]\d?|[12]\d{2}|3[0-5]\d|36[0-6])$/,
    message: 'Invalid leave type, must be between 1 to 366',
    }
  ]

};

export const defaultPincodeRule = (desc: any, isReq?: any) => {
  if (desc?.minlength || desc?.min) {
    const minValidation = {
      min: parseInt(desc?.minlength || desc?.min),
      message: `Please Enter minimum ${
        desc?.minlength || desc?.min
      } Characters`,
    };
    let typeValidations = ruleMap[desc?.type] || [];
    typeValidations = [...typeValidations, minValidation];
    return typeValidations;
  } else if (ruleMap[desc?.type]) {
    return ruleMap[desc?.type];
  } else if (desc?.type === 'compare_two_values') {
    return [
      {
        pattern: new RegExp(/^[1-9][0-9]*$/),
        message: 'Invalid entry',
      },
      ({ getFieldValue }: { getFieldValue: (field: string) => any }) => ({
        validator(_: any, value: any) {
          if (!value) {
            return Promise.resolve();
          }
          const dependsValue = getFieldValue(desc.depends);
          if (Number(value) > Number(dependsValue)) {
            return Promise.reject(
              new Error(
                `Please enter a value less than or equal to ${
                  desc?.label || desc.depends.toString().replaceAll('_', ' ')
                }`
              )
            );
          }
          return Promise.resolve();
        },
      }),
    ];
  }
  return [{ type: 'text' }];
};
