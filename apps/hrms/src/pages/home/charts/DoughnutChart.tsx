import React, { PureComponent } from 'react';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

const data = [
  { name: 'Present', value: 700 },
  { name: 'Absent', value: 300 },
  { name: 'Leave', value: 100 },
];

const COLORS = ['#9BE2EC', '#2F80ED', '#2FCBED', '#FF8042'];

const PieCharts = ({ attendanceData }: any) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={800} height={600}>
          <Pie
            data={attendanceData || []}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
           labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value:any) => `${(value / 1100 * 100).toFixed(1)}%`}
          contentStyle={{ background: 'rgba(255,255,255,0.8)', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}
          labelStyle={{ fontWeight: 'bold' }}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieCharts;
