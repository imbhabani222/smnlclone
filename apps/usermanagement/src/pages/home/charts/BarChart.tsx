import React from 'react';
import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement);
type Props = {};

const BarChart = (props: Props) => {
  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: [
          300000000, 340000000, 370000000, 360000000, 420000000, 390000000,
          460000000,
        ],
        backgroundColor: ['#4D73BE'],
        barThickness: 10,
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#595959' } },
      y: { border: { display: false }, ticks: { color: '#595959' } },
    },
  };
  return <Bar options={options} data={data} {...props} />;
};

export default BarChart;
