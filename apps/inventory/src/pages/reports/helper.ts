const monthNames = [
  {
    label: 'January',
    value: 'January',
  },
  {
    label: 'February',
    value: 'February',
  },
  {
    label: 'March',
    value: 'March',
  },
  {
    label: 'April',
    value: 'April',
  },
  {
    label: 'May',
    value: 'May',
  },
  {
    label: 'June',
    value: 'June',
  },
  {
    label: 'July',
    value: 'July',
  },
  {
    label: 'August',
    value: 'August',
  },
  {
    label: 'September',
    value: 'September',
  },
  {
    label: 'October',
    value: 'October',
  },
  {
    label: 'November',
    value: 'November',
  },
  {
    label: 'December',
    value: 'December',
  },
];

const currentYear = new Date().getFullYear();
const years: any = [];

for (let year = currentYear; year >= currentYear - 5; year--) {
  years.push({
    label: year,
    value: String(year),
  });
}
export const getPreviousYear = (m: any = 'string') => {
  let year: any = new Date().getFullYear();
  let month: any = new Date().getMonth();
  const currentmonth: any = monthNames[new Date().getMonth()];
  if (currentmonth?.value === 'January') {
    year = year - 1;
    month = 'December';
    if (m === 'integer') {
      month = 12;
    } else {
      year = year.toString();
    }
  } else {
    month = MonthMap[new Date().getMonth()];
    if (m === 'integer') {
      month = new Date().getMonth();
    } else if (m === 'payslip') {
      //do nothing
    } else {
      year = year.toString();
    }
  }
  return { year, month };
};
const MonthMap: any = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};
export { years, monthNames };
