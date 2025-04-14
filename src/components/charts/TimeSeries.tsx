"use client";

import React, { useEffect, useState } from 'react';
import Chart, { TimeScale } from 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { ChartOptions } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getChartColors, ChartColors, colorNameToRgb, rgbToRgba } from '../../lib/themeColours';



Chart.register(
    TimeScale,
    ChartDataLabels
);

type TimeSeriesChartProps = {
    dates: string[],
    valueSet: number[][],
    chartName: string,
    titles: string[],
    onClick?: (e: React.MouseEvent<HTMLElement>) => void,
    id?: string,
};

const CreateDataSet = (dates: string[], values: number[], title: string, chartColour: any) => {
    const data = dates.map((date, index) => ({
        x: date,
        y: values[index],
    }));
    

    return {
        label: title,
        data: data,
        backgroundColor: rgbToRgba(colorNameToRgb(chartColour), 0.3), // Fill color
        borderColor: colorNameToRgb(chartColour), // Line color
        borderWidth: 2, // Line thickness
        tension: 0, // Controls line smoothness (0 for straight lines)
        showLine: true, // Connect points with a line
        fill: true,
        pointRadius: 4, // Point size
    };
};



const TimeSeriesChart = ({ dates, valueSet, titles, chartName }: TimeSeriesChartProps) => {
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

    const options: ChartOptions<'scatter'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: chartName,
                font: {
                    size: 24,
                    family: 'Serif',
                },
                color: 'white',
            },
            legend: {
                display: true,
                textDirection: 'ltr',
                labels: {
                    color: 'white',
                    font: {
                        size: 14,
                        family: 'Serif',
                    },
                },
            },
            datalabels: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        return `${label} ${context.parsed.y.toFixed(2)}`;
                    },
                    title: (context) => {
                        return `${new Date(context[0].parsed.x).toDateString()}`;
                    },
                },
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    parser: 'YYYY-MM-DD',
                    tooltipFormat: 'DD/MM/YYYY',
                    displayFormats: {
                        day: 'MM-DD'
                    },
                },
                title: {
                    display: true,
                    text: 'Date',
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
                    text: "",
                    color: 'white',
                },
                max: Math.max(...valueSet[0]) + 1,
                min: 0,

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
        datasets: [
            CreateDataSet(dates, valueSet[0], titles[0], 'indigo'),
            CreateDataSet(dates, valueSet[1], titles[1], 'teal'),
        ],
    };

    return dates ? <div className="w-full min-h-[400px] max-h-full bg-slate-500 rounded-sm p-1">  <Scatter data={chartData} options={options} /> </div> : "Loading...";
};

export default TimeSeriesChart;
