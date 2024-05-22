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
    name: '05/12',
    Scheduled: 10,
    Unscheduled: 20,
    Noshow: 0,
  },
  {
    name: '06/12',
    Scheduled: 50,
    Unscheduled: 20,
    Noshow: 0,
  },
  {
    name: '07/12',
    Scheduled: 20,
    Unscheduled: 40,
    Noshow: 20,
  },
  {
    name: '08/12',
    Scheduled: 50,
    Unscheduled: 20,
    Noshow: 0,
  },
  {
    name: '09/12',
    Scheduled: 20,
    Unscheduled: 40,
    Noshow: 20,
  },
  {
    name: '10/12',
    Scheduled: 50,
    Unscheduled: 20,
    Noshow: 0,
  },
  {
    name: '11/12',
    Scheduled: 20,
    Unscheduled: 40,
    Noshow: 20,
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
        <Legend />
        <Line
          type="monotone"
          dataKey="Unscheduled"
          stroke="#421D95"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Scheduled" stroke="#2F80ED" />
        <Line type="monotone" dataKey="Noshow" stroke="#EDA34D" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Maintenace;
