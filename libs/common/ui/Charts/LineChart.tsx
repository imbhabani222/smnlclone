import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

interface LineProps {
  type?: string;
  dataKey?: string;
  stroke?: string;
}

interface CartesianProps {
  showCartesian?:boolean;
  cartesianHorizontalAxis?: boolean;
  cartesianVerticalAxis?: boolean;
  strokeDasharray?: string;
}

interface AxisProps {
  showAxis?: boolean;
  showAxisLine?: boolean;
  showAxisTickLine?: boolean;
  dataKey?: string;
}

interface MarginProps {
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
}

interface LineChartProps {
  data: Array<object>;
  aspect?: number;
  margin?: MarginProps;
  cartesian?: CartesianProps;
  Xaxis?: AxisProps;
  Yaxis?: AxisProps;
  showTooltip?: boolean;
  showLegend?: boolean;
  lines: Array<LineProps>;
  isAnimationActive?: boolean;
}

const Defaultdata = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const LineChartTemplate = ({
  data,
  aspect = 2,
  margin,
  cartesian,
  Xaxis,
  Yaxis,
  showTooltip = true,
  showLegend = true,
  lines,
  isAnimationActive = true,
}: LineChartProps) => {
  const marginLeft = margin?.marginLeft ?? 20;
  const marginRight = margin?.marginRight ?? 30;
  const marginTop = margin?.marginTop ?? 5;
  const marginBottom = margin?.marginBottom ?? 5;

  const showCartesian=cartesian?.showCartesian ?? true;
  const cartesianHorizontalAxis = cartesian?.cartesianHorizontalAxis ?? true;
  const cartesianVerticalAxis = cartesian?.cartesianVerticalAxis ?? true;
  const strokeDasharray = cartesian?.strokeDasharray ?? '3 3';

  const showXAxis = Xaxis?.showAxis ?? true;
  const showXAxisLine = Xaxis?.showAxisLine ?? false;
  const showXAxisTickLine = Xaxis?.showAxisTickLine ?? false;
  const XDataKey = Xaxis?.dataKey ?? 'name';

  const showYAxis = Yaxis?.showAxis ?? true;
  const showYAxisLine = Yaxis?.showAxisLine ?? false;
  const showYAxisTickLine = Yaxis?.showAxisTickLine ?? false;
  const YDataKey = Yaxis?.dataKey ?? '';

  return (
    <ResponsiveContainer width="100%" aspect={aspect}>
      <LineChart
        data={data}
        margin={{
          top: marginTop,
          right: marginRight,
          left: marginLeft,
          bottom: marginBottom,
        }}
      >
        {showCartesian ?<CartesianGrid
          horizontal={cartesianHorizontalAxis}
          vertical={cartesianVerticalAxis}
          strokeDasharray={strokeDasharray}
        /> :null}

        {showXAxis ? (
          <XAxis
            dataKey={XDataKey}
            axisLine={showXAxisLine}
            tickLine={showXAxisTickLine}
          />
        ) : null}
        {showYAxis ? (
          <YAxis axisLine={showYAxisLine} tickLine={showYAxisTickLine} />
        ) : null}
        {showTooltip ? <Tooltip /> : null}
        {showLegend ? <Legend /> : null}
        {lines?.length > 0
          ? lines?.map(({ type = 'monotone', dataKey, stroke = '#8884d8' }) => {
              return dataKey ? (
                <Line
                  isAnimationActive={isAnimationActive}
                  type={type}
                  dataKey={dataKey}
                  stroke={stroke}
                  activeDot={{
                    stroke: stroke,
                    strokeWidth: 2,
                    r: 4,
                    fill: '#fff',
                  }}
                />
              ) : null;
            })
          : null}
        {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        <Line
          type="linear"
          dataKey="sales"
          stroke="#82ca9d"
          activeDot={{ stroke: '#82ca9d', strokeWidth: 2, r: 4, fill: '#fff' }}
        /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};
