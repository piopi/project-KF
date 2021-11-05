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
  const gradient = ctx.createLinearGradient(0, 0, 0, 450);
  gradient.addColorStop(0, 'rgba(200,226,239, 0.7)');
  gradient.addColorStop(0.45, 'rgba(253,254,255, 0.2)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
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
  return <Line id="chart" options={option} width="110%" height="100%" data={output} />;
};

export default ChartLine;
