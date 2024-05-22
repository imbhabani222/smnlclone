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
    Opeartion: 2000,
    amt: 2400,
  },
  {
    name: 'Feb',
    Opeartion: 3000,
    amt: 2210,
  },
  {
    name: 'Mar',
    Opeartion: 2000,
    amt: 2290,
  },
  {
    name: 'Apr',
    Opeartion: 2780,
    amt: 2000,
  },
  {
    name: 'Jun',
    Opeartion: 1890,
    amt: 2181,
  },
  {
    name: 'Jul',
    Opeartion: 2390,
    amt: 500,
  },
  {
    name: 'Aug',
    Opeartion: 2000,
    amt: 2400,
  },
  {
    name: 'Sep',
    Opeartion: 3000,
    amt: 2210,
  },
  {
    name: 'Oct',
    Opeartion: 2000,
    amt: 2290,
  },
  {
    name: 'Nov',
    Opeartion: 2780,
    amt: 2000,
  },
  {
    name: 'Dec',
    Opeartion: 1890,
    amt: 2181,
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
        <Bar dataKey="Opeartion" fill="#F7781C" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
