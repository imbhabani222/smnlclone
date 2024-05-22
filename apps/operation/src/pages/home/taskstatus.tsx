import {
  BarChart,
  Bar,
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
    completed: 2000,
    active: 100,
    overdue: 50,
    amt: 2400,
  },
  {
    name: 'Feb',
    completed: 3000,
    active: 2000,
    overdue: 1000,
    amt: 2210,
  },
  {
    name: 'Mar',
    completed: 2000,
    active: 4000,
    overdue: 500,
    amt: 2290,
  },
  {
    name: 'Apr',
    completed: 2780,
    active: 3000,
    overdue: 150,
    amt: 2000,
  },
  {
    name: 'Jun',
    completed: 1890,
    active: 2000,
    overdue: 500,
    amt: 2181,
  },
  {
    name: 'Jul',
    completed: 2390,
    active: 1000,
    overdue: 500,
    amt: 5000,
  },
];

const BarCharts = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        // width={1000}
        height={300}
        data={data}
        margin={{
          top: 0,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#375DD2" barSize={20} />
        <Bar dataKey="active" fill="#EB742D" barSize={20} />
        <Bar dataKey="overdue" fill="#FFCB25" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
