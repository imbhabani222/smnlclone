// const moment = require('moment');
// import * as moment from 'moment';
import moment from "moment";


export const getSortFunct = (desc: any, dataIndex: any) => {
  if (desc?.sortType === 'char') {
    return (a: any, b: any) => {
      if (!a?.[dataIndex]) {
        return -1;
      } else if (!b?.[dataIndex]) {
        return 1;
      }
      return a?.[dataIndex].localeCompare(b?.[dataIndex]);
    };
  } else if (desc?.sortType === 'int') {
    return (a: any, b: any) => {
      if (dataIndex === 'date') {
        return moment(a?.[dataIndex]).unix() - moment(b?.[dataIndex]).unix();
      }else{
        return a?.[dataIndex] - b?.[dataIndex];

      }
    };
  }
};
