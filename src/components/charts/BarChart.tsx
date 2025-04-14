// page.js this is the entry point of application

"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { ChartOptions } from 'chart.js';

import { getChartColors, ChartColors, linearGradient, exponentialGradient } from '../../lib/themeColours';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

type BarChartProps = {
  labels: string[];
  values: number[];
  title: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  id?: string;
};

const BarChart = ({ labels, values, title }: BarChartProps) => {
  const [chartColours, setChartColours] = useState<ChartColors>(getChartColors());

  useEffect(() => {
    const updateChartColours = () => {
      setChartColours(getChartColors());
    };
    // Update colors initially
    updateChartColours();
    // Observe changes to the 'dark' class on the <html> element
    const observer = new MutationObserver(() => updateChartColours());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);


  const CreateDataSet = (labels: string[], values: number[], title: string) => {
    return {
      labels: labels,
      data: values,
      title: title,
      label: title,
      backgroundColor: linearGradient(chartColours.slate800, chartColours.indigo, labels.length),
      borderColor: linearGradient(chartColours.slate800, chartColours.indigo, labels.length),
      borderWidth: 1,
      innerWidth: 1,
      outerWidth: 1,


    };
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: chartColours.foreground,
    color: 'white',
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return context.parsed.y.toString() || '';
          },
        },
      },
      title: {
        display: true,
        text: title,
        color: 'white',
        font: {
          size: 24,
          family: 'Serif',
        },
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        labels: labels,
        title: {
          display: true,
          text: 'Month',
          color: 'white',
          font: {
            size: 18,
            family: 'Serif',
          },
        },
        ticks: {
          color: 'white',
          font: {
            size: 14,
            family: 'Serif',
          },
        },
      },
      y: {
        title: {
          display: false,
          color: 'white',
          font: {
            size: 18,
            family: 'Serif',
          },
        },
        ticks: {
          color: 'white',
          font: {
            size: 14,
            family: 'Serif',
          },
        },
      },
    },
  };

  const chartData = {
    labels: labels,
    title: title,
    datasets: [
      CreateDataSet(labels, values, title),
    ],
  };

  return <div className="w-full min-h-[400px] max-h-full rounded-sm bg-slate-500 p-1"> <Bar data={chartData} options={options} /></div>;


};
export default BarChart;
