import moment from 'moment';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import InputNumbers from '../../../../../../libs/common/ui/InputNumber/inputNumber';
import handleExport from '../../../../../../libs/common/ui/ExportToExcel/ExportToExcel';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { amountFormater } from '../../../../../../libs/common/utils/common';
export const columns: any = (handleChangeAmount: any) => [
  {
    title: 'Name',
    dataIndex: 'salary_parameter_name',
    key: 'salary_parameter_name',
  },
  {
    title: 'Type',
    dataIndex: 'addition_deduction',
    key: 'addition_deduction',
  },
  {
    title: 'Period',
    dataIndex: 'monthly_yearly',
    key: 'monthly_yearly',
  },
  {
    title: 'Monthly Amount',
    dataIndex: 'monthly_amount',
    key: 'monthly_amount',
    render: (_: any, record: any) => (
      <InputNumbers
        onPaste={(e: any) => handleChangeAmount(e)}
        disabled={record?.salary_parameter_name !== 'Basic'}
        value={record?.monthly_amount}
        defaultValue={0}
        onChange={(e: any) => handleChangeAmount(e, record, 'Basic')}
      />
    ),
  },
  {
    title: 'Yearly Amount',
    dataIndex: 'yearly_amount',
    key: 'yearly_amount',
    render: (_: any, record: any) => (
      <InputNumbers disabled={true} value={record?.yearly_amount} />
    ),
  },
];

export const fields = [
  {
    label: 'Branch',
    name: 'branch',
    datatype: 'Link',
    isReq: false,
    description: '{"linkfield": "branch_name", "modulename": "master_data"}',
    options: 'Branch Master',
    colSpan: 1,
  },
  {
    label: 'Department',
    name: 'department',
    datatype: 'Link',
    isReq: false,
    description:
      '{"linkfield": "department_name", "modulename": "master_data"}',
    options: 'Department',
    colSpan: 1,
  },
  {
    label: 'Work Location',
    name: 'work_location',
    datatype: 'Link',
    isReq: false,
    description: '{"linkfield": "location_name", "modulename": "master_data"}',
    options: 'Work Location',
    colSpan: 1,
  },
];

export const onExportXl = (data: any, name: any) => {
  if (data && data.length > 0) {
    handleExport(data, name);
  } else {
    isSuccess("Don't have data to export", 'error');
  }
};

export const checkKey = (e: any) => {
  if (!/^[0-9]*\.?[0-9]*$/i.test(e.key) && e !== 'Backspace') {
    return true;
  }
};

export const employeePayMasterFields = [
  {
    datatype: 'TableSelect',
    label: 'Employee',
    name: 'name',
    options: 'personal_details',
    isReq: true,
    description: {
      linkfield: 'full_name',
      modulename: 'employee_management',
      showActive: 'true',
      colSpan: '12',
      appname: 'htssuite',
      search: 'api.search_employees?search=',
    },
    searchIndexes: [],
    columns: [
      {
        title: 'Employee Code',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Employee Name',
        dataIndex: 'full_name',
        key: 'full_name',
      },
    ],
  },

  {
    label: 'Monthly Gross',
    name: 'CTC',
    datatype: 'Float',
    isReq: true,
    description: {
      type: 'float',
      maxlength: '7',
    },
    hidden: 0,
    readonly: false,
  },
  {
    label: 'Tax Regime',
    name: 'apply_new_regime',
    datatype: 'Switch',
    isReq: false,
    checkedChildren: 'New Regmie',
    unCheckedChildren: 'Old Regmie',
    description: {},
    default: false,
    hidden: 0,
    readonly: false,
  },
];

export const additonalAllowanceFields = [
  {
    datatype: 'Link',
    label: 'Additonal Allowance',
    name: 'all_type',
    options: 'salary_parameter_master',
    isReq: true,
    description: {
      linkfield: 'salary_parameter_name',
      modulename: 'master_data',
      filterName: 'additinalAllowence',
    },
  },
  {
    datatype: 'Select',
    label: 'Year',
    name: 'select_year',
    isReq: true,
    description: undefined,
    options: [
      {
        value: moment().format('YYYY'),
        label: moment().format('YYYY'),
      },
    ],
  },
  {
    datatype: 'Select',
    label: 'month',
    name: 'select_month',
    isReq: true,
    description: undefined,
    options: [
      {
        value: moment().subtract(1, 'month').startOf('month').format('MMMM'),
        label: moment().subtract(1, 'month').startOf('month').format('MMMM'),
      },
    ],
  },
];

export const stockAllowance = [
  {
    datatype: 'Select',
    label: 'Year',
    name: 'year',
    isReq: true,
    description: undefined,
    options: [
      {
        value: moment().format('YYYY'),
        label: moment().format('YYYY'),
      },
    ],
  },
  {
    datatype: 'Select',
    label: 'Month',
    name: 'month',
    isReq: true,
    description: undefined,
    options: [
      {
        value: moment().subtract(1, 'month').startOf('month').format('MMMM'),
        label: moment().subtract(1, 'month').startOf('month').format('MMMM'),
      },
    ],
  },
];

export const SalaryCalcuation = (data: any) => {
  const { tableData, ctc, value, key } = data;
  if (!key) {
    const table = [...tableData];
    const checkOverTime = table.find(
      (data: any) => data.salary_parameter_name === 'Over Time'
    );
    if (checkOverTime?.salary_parameter_name) {
      const result = onCheckOverTime(data);
      return result;
    } else {
      const result = onCheckOtherThanDriver(data);
      return result;
    }
  } else {
    if (key === 'Basic') {
      const table = [...tableData];
      const result = editBasic(table, value, ctc);
      return result;
    }
  }
};

const percentageToValue = (record: any, tableData: any, period?: string) => {
  const { percentage_of, percentage_value } = record;
  const findRecord = tableData.find(
    (data: any) => data.salary_parameter_name === percentage_of
  );
  const { monthly_amount } = findRecord;
  const cacluatedMonthlyAmount = Math.round(
    monthly_amount * (percentage_value / 100)
  );
  if (period === 'yearly') {
    return Number(cacluatedMonthlyAmount * 12);
  } else {
    return Number(cacluatedMonthlyAmount);
  }
};

const onCheckOverTime = (data: any) => {
  const { tableData, ctc } = data;
  let table = [...tableData];
  const monthly_gross: any = Number(ctc).toFixed();
  table = onGetBasic(table, null);
  const findRecord = table.find(
    (data: any) => data.salary_parameter_name === 'Basic'
  );
  const Basic_monthly_amount = findRecord?.monthly_amount;
  const difference = Math.abs(monthly_gross - Basic_monthly_amount);
  let special_incentive = 0;
  let overTime = 0;
  if (difference <= Basic_monthly_amount) {
    special_incentive = 0;
    overTime = difference;
  } else {
    overTime = Basic_monthly_amount;
    special_incentive = Number(difference) - Number(Basic_monthly_amount);
  }
  table.forEach((item: any) => {
    if (item.salary_parameter_name === 'Over Time') {
      item.monthly_amount = Number(overTime);
      item.yearly_amount = Number(overTime) * 12;
    }
    if (item.salary_parameter_name === 'Special Incentive') {
      item.monthly_amount = Number(special_incentive);
      item.yearly_amount = Number(special_incentive) * 12;
    }
  });
  return table;
};

const onCheckOtherThanDriver = (data: any) => {
  const { tableData, ctc } = data;
  let table = [...tableData];
  const monthly_gross: any = Number(ctc).toFixed();
  table = onGetBasic(table, null);
  let special_incentive = 0;
  const record = table.find(
    (data: any) => data.salary_parameter_name === 'Special Incentive'
  );
  const { monthly_amount } = record;
  const sumOfMonthlyAmount = table.reduce(
    (total, item) => total + parseFloat(item.monthly_amount),
    0
  );
  if (sumOfMonthlyAmount === Number(monthly_gross)) {
    special_incentive = monthly_amount || 0;
  } else if (Number(monthly_gross) > sumOfMonthlyAmount) {
    const difference = monthly_gross - (sumOfMonthlyAmount-monthly_amount);
    special_incentive = difference;
  }
  table.forEach((item: any) => {
    if (item.salary_parameter_name === 'Special Incentive') {
      item.monthly_amount = Number(special_incentive);
      item.yearly_amount = Number(special_incentive) * 12;
    }
  });

  return table;
};

const onGetBasic = (table: any, key: any) => {
  const result = [...table];
  if (!key) {
    result.forEach((item: any) => {
      if (item.monthly_yearly === 'Monthly') {
        if (item.type === 'Value') {
          item.monthly_amount = Number(item.percentage_value);
          item.yearly_amount = Number(item.percentage_value) * 12;
        } else {
          item.monthly_amount = percentageToValue(item, table, 'monthly');
          item.yearly_amount = percentageToValue(item, table, 'yearly');
        }
      }
    });
  } else {
    result.forEach((item: any) => {
      if (item.salary_parameter_name === key) {
        if (item.type === 'Value') {
          item.monthly_amount = Number(item.percentage_value);
          item.yearly_amount = Number(item.percentage_value) * 12;
        } else {
          item.monthly_amount = percentageToValue(item, table, 'monthly');
          item.yearly_amount = percentageToValue(item, table, 'yearly');
        }
      }
    });
  }
  return result;
};

const subTableColumns = [
  {
    title: 'EARNINGS',
    dataIndex: 'earnings',
    key: 'earnings',
  },
  {
    title: 'EARNING AMOUNT',
    dataIndex: 'earningsAmount',
    key: 'earningsAmount',
  },
  {
    title: 'DEDUCTIONS',
    dataIndex: 'deductions',
    key: 'deductions',
  },
  {
    title: 'DEDUCTION AMOUNT',
    dataIndex: 'deductionsAmount',
    key: 'deductionsAmount',
  },
];

export const expandedRowRender = (e: any) => {
  if (e?.payslip_data) {
    const { payslip_data } = e;
    const tableData = Object.entries(payslip_data.earnings).map(
      ([earnings, earningsAmount]) => ({
        earnings,
        earningsAmount: earningsAmount,
      })
    );

    const deductions = Object.keys(payslip_data.deductions);
    tableData.forEach((item: any, index: number) => {
      item.deductions = deductions[index] || '-';
      item.earningsAmount = amountFormater.format(item.earningsAmount);
      item.deductionsAmount = payslip_data.deductions[deductions[index]]
        ? amountFormater.format(payslip_data.deductions[deductions[index]])
        : '-';
    });

    return (
      <div style={{ margin: '15px', border: '1px solid #d1d1d1' }}>
        <Table column={subTableColumns} dataSource={tableData} />
      </div>
    );
  } else {
    return null;
  }
};

const editBasic = (tableData: any, value: any, ctc: any) => {
  const table = [...tableData];
  table.forEach((item: any) => {
    if (item.salary_parameter_name === 'Basic') {
      item.monthly_amount = Math.round(value);
      item.yearly_amount = Math.round(value * 12);
    }
  });
  const updated_table = onGetBasic(table, 'HRA');
  const exceptSumofSpecial = updated_table
    .filter((item: any) => item.salary_parameter_name !== 'Special Incentive')
    .reduce((total, item) => total + parseFloat(item.monthly_amount), 0);
  let special_incentive_monthly = ctc - exceptSumofSpecial;
  special_incentive_monthly =
    special_incentive_monthly <= 0 ? 0 : special_incentive_monthly;
  console.log(
    ctc,
    special_incentive_monthly,
    exceptSumofSpecial,
    'special_incentive  '
  );
  const special_incentive_yearly = special_incentive_monthly * 12;
  table.forEach((item: any) => {
    if (item.salary_parameter_name === 'Special Incentive') {
      item.monthly_amount = special_incentive_monthly;
      item.yearly_amount = special_incentive_yearly;
    }
  });
  return table;
};

export const fieldsData = (object: any) => {
  const formData = [];
  const {
    payslip_data: { earnings, deductions, earned_days },
  } = object;
  const payslip_data = { ...earnings, ...deductions, earned_days };
  for (const key in payslip_data) {
    formData.push({
      label: capitalizeFirstLetterOfWords(key.replace('_', ' ')),
      name: key,
      datatype: 'Int',
      readonly: true,
      default: object[key],
      isReq: false,
      hidden: 0,
      disabled: true,
    });
  }
  return { formData, payslip_data };
};

const capitalizeFirstLetterOfWords = (phrase: any) =>
  phrase.replace(/\b\w/g, (match: any) => match.toUpperCase());
