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
    name: 'Day Shift',
    day: 500,
    night: 0,
  },
  {
    name: 'Night Shift',
    day: 0,
    night: 400,
  },
];

const Maintenace = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={450} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="night"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="day" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Maintenace;
