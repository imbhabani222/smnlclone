import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);
const DoughnutChart = (props: any) => {
  const { width = '215px', height = '215px' } = props;
  const data = {
    datasets: [
      {
        data: [25, 75],
        backgroundColor: ['#14818A', '#7BE3EC'],
        borderWidth: 0,
      },
    ],
  };
  const options: any = {
    elements: { arc: { cutout: '20%' } },
    cutout: '80%',
  };
  return (
    <div style={{ width, height }}>
      <Doughnut options={options} data={data}></Doughnut>
    </div>
  );
};

export default DoughnutChart;
