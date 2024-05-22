import React from 'react';
import {
  Legend,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface LineProps {
  type?: string;
  dataKey?: string;
  stroke?: string;
  color?:string;
}

interface MarginProps {
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
}

interface LineChartProps {
  data: Array<object>;
  dataKey?: string;
  isAnimationActive?: boolean;
  aspect?: number;
  cx?: string;
  cy?: string;
  outerRadius?: number;
  innerRadius?: number;
  margin?: MarginProps;
  showTooltip?: boolean;
  showLegend?: boolean;
  lines: Array<LineProps>;
}

const Defaultdata = [
  { name: 'Group A', value: 400, color: '#0088FE' },
  { name: 'Group B', value: 300, color: '#00C49F' },
  { name: 'Group C', value: 300, color: '#FFBB28' },
  { name: 'Group D', value: 200, color: '#FF8042' },
  { name: 'Group E', value: 278, color: '#FF8322' },
  { name: 'Group F', value: 189, color: '#FF8232' },
];

export const PieChartTemplate = ({
  dataKey = 'value',
  isAnimationActive = true,
  cx = '50%',
  cy = '50%',
  outerRadius,
  innerRadius = 0,
  data = Defaultdata,
  aspect = 2,
  margin,
  showTooltip = true,
  showLegend = true,
}: LineChartProps) => {
  const marginLeft = margin?.marginLeft ?? 20;
  const marginRight = margin?.marginRight ?? 30;
  const marginTop = margin?.marginTop ?? 5;
  const marginBottom = margin?.marginBottom ?? 5;

  return (
    <ResponsiveContainer width="100%" aspect={aspect}>
      <PieChart
        margin={{
          top: marginTop,
          right: marginRight,
          left: marginLeft,
          bottom: marginBottom,
        }}
      >
        {showTooltip ? <Tooltip /> : null}
        {showLegend ? <Legend /> : null}
        {data?.length > 0 ? (
          <Pie
            dataKey={dataKey}
            isAnimationActive={isAnimationActive}
            data={data}
            cx={cx}
            cy={cy}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            labelLine={false}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry?.color} />
            ))}
          </Pie>
        ) : null}
      </PieChart>
    </ResponsiveContainer>
  );
};
