import React from 'react';
import {
  BarChart,
  XAxis,
  Bar,
  ResponsiveContainer,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface CartesianProps {
  showCartesian?:boolean;
  cartesianHorizontalAxis?: boolean;
  cartesianVerticalAxis?: boolean;
  strokeDasharray?: string;
}

interface BarProps {
  dataKey?: string;
  stackId?: string;
  fill?: string;
  barSize?: number;
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

interface BarGraphProps {
  height?: number;
  data: Array<object>;
  aspect?: number;
  margin?: MarginProps;
  cartesian?: CartesianProps;
  Xaxis?: AxisProps;
  Yaxis?: AxisProps;
  bars: Array<BarProps>;
  showTooltip?: boolean;
  showLegend?: boolean;
  isAnimationActive?: boolean;
}

const Defaultdata = [
  {
    month: 'J',
    sales: 1000,
    revenue: 2000,
  },
  {
    month: 'F',
    sales: 1900,
    revenue: 2000,
  },
  {
    month: 'M',
    sales: 3000,
    revenue: 2000,
  },
  {
    month: 'A',
    sales: 3800,
    revenue: 2000,
  },
  {
    month: 'M',
    sales: 5000,
    revenue: 2000,
  },
  {
    month: 'J',
    sales: 4500,
    revenue: 2000,
  },
  {
    month: 'J',
    sales: 4800,
    revenue: 2000,
  },
  {
    month: 'A',
    sales: 4000,
    revenue: 2000,
  },
  {
    month: 'S',
    sales: 5300,
    revenue: 2000,
  },
  {
    month: 'O',
    sales: 6000,
    revenue: 2000,
  },
  {
    month: 'N',
    sales: 6500,
    revenue: 2000,
  },
  {
    month: 'D',
    sales: 7000,
    revenue: 2000,
  },
];

export const BarGraphTemplate = ({
  aspect = 2,
  data,
  Xaxis,
  Yaxis,
  bars,
  cartesian,
  margin,
  showTooltip = true,
  showLegend = true,
  isAnimationActive = true,
}: BarGraphProps) => {
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
      <BarChart
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
        {showTooltip ? <Tooltip /> : null}
        {showLegend ? <Legend /> : null}
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
        {bars?.length > 0
          ? bars.map(({ dataKey, stackId, fill, barSize = 4 }: BarProps,index) => {
              return dataKey ? (
                <Bar
                  key={index}
                  isAnimationActive={isAnimationActive}
                  dataKey={dataKey}
                  stackId={stackId}
                  fill={fill}
                  barSize={barSize}
                />
              ) : null;
            })
          : null}
      </BarChart>
    </ResponsiveContainer>
  );
};
