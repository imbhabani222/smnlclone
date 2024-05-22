import dayjs from 'dayjs';
import moment from 'moment';
export const isObject = (value: any) => {
  if (typeof value === 'object' && value !== null) {
    return true;
  }
  return false;
};

export const getSelectboxLabel = (item: any, fieldname: string) => {
  const labelfieldNameMap: any = {
    employee_name: `${item?.first_name} ${item?.middle_name} ${item?.last_name} ${item?.email}`,
    first_name_duplicate: ``,
  };
  let label = labelfieldNameMap[fieldname];
  if (label) {
    return label;
  }
  if (!item[fieldname]) {
    const duplicatefieldname = fieldname.replace('_duplicate', '');
    label = item[duplicatefieldname] ? item[duplicatefieldname] : '';
    return label;
  }

  return item[fieldname];
};

export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const setFormData = (data: []) => {
  const da: any = {};
  data.map((e: any) => {
    if (e?.default) {
      da[e?.name] =
        e?.default === '0' || e?.default === '1'
          ? e?.default === '1'
            ? true
            : false
          : e?.default;
    }
  });
  return da;
};

export const dependOnData = (e: any, data: any) => {
  if (e?.target?.checked && e?.target?.id) {
    const dpData: any = [];
    dpData.push(e.target.id);
    return [...data, ...dpData];
  } else {
    const ndData = data?.filter((i: any) => i !== e?.target?.id);
    return ndData;
  }
};

export const dateFormat = (e: any) => {
  if (e) return dayjs(new Date(e)).format('YYYY-MM-DD');
  return null;
};

export const dateTimetoFrom = (e: any) => {
  if (e) return dayjs(e, 'YYYY/MM/DD HH:mm');
  return null;
};

export const datetoFrom = (e: any) => {
  if (e) return dayjs(e, 'YYYY/MM/DD');
  return null;
};

export const dateTime = (e: any) => {
  if (e) return dayjs(e, 'HH:mm');
  return null;
};

export const datetoTime = (e: any) => {
  if (e) return dayjs(new Date(e)).format('HH:mm');
  return null;
};

export const datetoTimeNew = (e: any) => {
  if (e) return dayjs(e, 'HH:mm');
  return null;
};

export const updateDependOnData = (formdata: [], formvalue: any) => {
  const dependOnDatas: any = [];
  if (formdata?.length > 0) {
    const filterDependData = formdata.filter((item: any) => item.depends_on);
    filterDependData.forEach((item: any) => {
      for (let key in formvalue) {
        if (item.depends_on === key) {
          dependOnDatas.push(key);
        }
      }
    });
  }
  return dependOnDatas;
};

export const amountFormater = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
});

export const validJson = (e: any) => {
  try {
    return JSON.parse(e).toString();
  } catch (i) {
    return false;
  }
  return true;
};

export const employeeSelectDropDown = (items: any) => {
  return {
    ...items,
    datatype: 'TableSelect',
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
    searchIndexes: [],
    callOnChange: true,
  };
};
export const getDateRange = (type?: any, d?: any) => {
  const date = d || new Date();
  const fromDate = moment(
    new Date(date.getFullYear(), date.getMonth(), 1)
  ).format('YYYY/MM/DD');
  const toDate = moment().format('YYYY/MM/DD');
  if (type === 'rangePicker') {
    return {
      from_date: dateFormat(fromDate),
      to_date: dateFormat(toDate),
      daterange: [datetoFrom(fromDate), datetoFrom(toDate)],
    };
  }
  return { from_date: fromDate, to_date: toDate };
};

export const AddFooterToExcel = (data: Array<object>, totalObject: object) => {
  function getNulledKeysArray(data: any) {
    let newObj = {};
    for (const property in data) {
      newObj = { ...newObj, [property]: '' };
    }
    return newObj;
  }
  const NulledObject = getNulledKeysArray(data[0]);
  return [...data, NulledObject, NulledObject, totalObject];
};
