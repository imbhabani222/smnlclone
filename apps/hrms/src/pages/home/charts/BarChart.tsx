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

const BarCharts = ({ salaryData }: any) => {
  const DataFormater = (number: any) => {
    if (number > 100000000) {
      return (number / 100000000).toString() + 'CR';
    } else if (number > 100000) {
      return (number / 100000).toString() + 'L';
    } else if (number > 1000) {
      return (number / 1000).toString() + 'K';
    } else {
      return number.toString();
    }
  };
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={400}
        height={300}
        data={salaryData || []}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={DataFormater} />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="Net Salary" fill="#5076E1" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
