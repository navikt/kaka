import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { GetAbsoluteValue, useBarTooltipText } from '../../../hooks/use-bar-tooltip-text';
import { MAIN_REASON_IDS } from './calculations/constants';
import { BAR_THICKNESS, getMangelfullDetailsDatasets } from './calculations/mangelfull-details';
import { HorizontalBars } from './horizontal-bars';
import { DataSet } from './types';

const useOptions = (getAbsoluteValue: GetAbsoluteValue): ChartOptions<'bar'> => {
  const { renderBarText, tooltipCallback } = useBarTooltipText(getAbsoluteValue);

  return {
    maintainAspectRatio: false,
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

export const MangelfullDetails = ({ stats }: Props) => {
  const { datasets, labels } = useMemo(() => getMangelfullDetailsDatasets(stats), [stats]);

  const getAbsoluteValue: GetAbsoluteValue = (datasetIndex, dataIndex) => {
    const count = datasets[datasetIndex]?.counts[dataIndex] ?? 0;
    const percent = datasets[datasetIndex]?.data[dataIndex] ?? 0;

    return [count, percent];
  };
  const options = useOptions(getAbsoluteValue);

  return (
    <HorizontalBars barCount={stats.length * MAIN_REASON_IDS.length} barThickness={BAR_THICKNESS}>
      <Bar data={{ datasets, labels }} options={options} />
    </HorizontalBars>
  );
};