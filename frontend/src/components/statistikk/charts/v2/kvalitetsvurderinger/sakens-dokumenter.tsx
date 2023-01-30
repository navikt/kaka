import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { GetAbsoluteValue, useBarTooltipText } from '../../../hooks/use-bar-tooltip-text';
import { BAR_THICKNESS, getSakensDokumenterDatasets } from './calculations/sakens-dokumenter';
import { HorizontalBars } from './horizontal-bars';
import { DataSet } from './types';

const useOptions = (getAbsoluteValue: GetAbsoluteValue): ChartOptions<'bar'> => {
  const { renderBarText, tooltipCallback } = useBarTooltipText(getAbsoluteValue);

  return {
    maintainAspectRatio: false,
    aspectRatio: 3,
    indexAxis: 'y',
    scales: {
      y: { stacked: true },
      x: {
        beginAtZero: true,
        stacked: true,
        ticks: { callback: (label) => `${label} %` },
        title: {
          display: true,
          text: 'Andel per mangelfull grunn',
        },
      },
    },
    animation: {
      onProgress() {
        renderBarText(this.ctx);
      },
      onComplete() {
        renderBarText(this.ctx);
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: tooltipCallback,
        },
      },
    },
  };
};

interface Props {
  stats: DataSet[];
}

export const SakensDokumenter = ({ stats }: Props) => {
  const data = useMemo(() => getSakensDokumenterDatasets(stats), [stats]);

  const getAbsoluteValue: GetAbsoluteValue = (datasetIndex, dataIndex) => {
    const count = data.datasets[datasetIndex]?.counts[dataIndex] ?? 0;
    const percent = data.datasets[datasetIndex]?.data[dataIndex] ?? 0;

    return [count, percent];
  };

  const options = useOptions(getAbsoluteValue);

  return (
    <HorizontalBars barCount={data.labels.length} barThickness={BAR_THICKNESS} chartOptions={options}>
      <Bar data={data} options={options} />
    </HorizontalBars>
  );
};
