import React from 'react';
import { Line } from 'react-chartjs-2';
import { createCanvas } from 'canvas';
import { useColorModeValue } from '@chakra-ui/react';

interface Props {
  data: number[];
}
const option = {
  layout: {
    padding: {
      right: 0,
      left: -15,
      bottom: -25,
    },
  },
  maintainAspectRatio: false,
  scales: {
    yAxes: {
      beginAtZero: true,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
    xAxes: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: { display: false },
  },
};
const ChartLine = ({ data }: Props) => {
  const bgColor = useColorModeValue('rgba(83,167,208, 1)', 'rgb(255, 255, 255)');
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 100);
  gradient.addColorStop(0, 'rgba(93, 213, 246, 0.3)');
  gradient.addColorStop(1, 'rgba(93, 213, 246, 0)');
  let labels: string[] = [];
  data.forEach((element, i) => {
    labels = [...labels, `${i}`];
  });
  const output = {
    labels,
    datasets: [
      {
        tension: 0.2,
        data,
        fill: true,
        backgroundColor: gradient,
        borderColor: bgColor,
      },
    ],
  };
  return <Line id="chart" options={option} width="100%" height="100%" data={output} />;
};

export default ChartLine;
