import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Jan',
    salary: 10000,
  },
  {
    name: 'Feb',
    salary: 12000,
  },
  {
    name: 'Mar',
    salary: 8000,
  },
  {
    name: 'Apr',
    salary: 9000,
  },

  {
    name: 'May',
    salary: 11000,
  },
  {
    name: 'Jun',
    salary: 14000,
  },
];

const Maintenace = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart width={1000} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="salary"
          stroke="#F86060"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Maintenace;
