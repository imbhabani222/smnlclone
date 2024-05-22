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
    EMI: 2000,
    amt: 2400,
  },
  {
    name: 'Feb',
    EMI: 2000,
    amt: 2210,
  },
  {
    name: 'Mar',
    EMI: 2000,
    amt: 2290,
  },
  {
    name: 'Apr',
    EMI: 2780,
    amt: 2000,
  },
  {
    name: 'Jun',
    EMI: 1890,
    amt: 2181,
  },
  {
    name: 'Jul',
    EMI: 2390,
    amt: 500,
  },
  {
    name: 'Aug',
    EMI: 2000,
    amt: 2290,
  },
  {
    name: 'Sep',
    EMI: 2780,
    amt: 2000,
  },
  {
    name: 'Oct',
    EMI: 1890,
    amt: 2181,
  },
  {
    name: 'Nov',
    EMI: 2390,
    amt: 500,
  },
  {
    name: 'Dec',
    EMI: 2000,
    amt: 2290,
  },
];

const BarCharts = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={400}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="EMI" fill="#5076E1" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
