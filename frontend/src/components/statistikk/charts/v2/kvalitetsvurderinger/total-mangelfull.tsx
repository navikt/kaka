import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { round } from '../../../../../domain/number';
import { GetAbsoluteValue, useBarTooltipText } from '../../../hooks/use-bar-tooltip-text';
import { DataSet, getTotalMangelfullDatasets } from './calculations/total-mangelfull';

const useOptions = (getAbsoluteValue: GetAbsoluteValue): ChartOptions<'bar'> => {
  const { renderBarText, tooltipCallback } = useBarTooltipText(getAbsoluteValue);

  return {
    aspectRatio: 3,
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: { callback: (label) => `${label} %` },
        title: {
          display: true,
          text: 'Mangelfullt',
        },
      },
      x: { stacked: true },
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

export const TotalMangelfull = ({ stats }: Props) => {
  const datasets = useMemo(() => getTotalMangelfullDatasets(stats), [stats]);

  const getAbsoluteValue: GetAbsoluteValue = (datasetIndex, dataIndex) => {
    const count = datasets[datasetIndex]?.counts[dataIndex] ?? 0;
    const percent = datasets[datasetIndex]?.data[dataIndex] ?? 0;

    return [count, percent];
  };

  const options = useOptions(getAbsoluteValue);

  const labels = stats.map(({ label }, index) => {
    let count = 0;
    let percent = 0;

    for (const { counts, data } of datasets) {
      count += counts[index] ?? 0;
      percent += data[index] ?? 0;
    }

    const percentValue = Number.isNaN(percent) ? '-' : round(percent, 1);

    return `${label} (${percentValue} % | ${count} stk)`;
  });

  return <Bar data={{ labels, datasets }} options={options} />;
};
