import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { toPercent } from '../../../../../domain/number';
import { GetAbsoluteValue, useBarTooltipText } from '../../../hooks/use-bar-tooltip-text';
import { BAR_THICKNESS, DataSet, getTotalMangelfullDatasets } from './calculations/total-mangelfull';
import { HorizontalBars } from './horizontal-bars';

const useOptions = (getAbsoluteValue: GetAbsoluteValue): ChartOptions<'bar'> => {
  const { renderBarText, tooltipCallback } = useBarTooltipText(getAbsoluteValue);

  return {
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      y: { stacked: true },
      x: {
        stacked: true,
        beginAtZero: true,
        ticks: { callback: (label) => `${label} %` },
        title: {
          display: true,
          text: 'Mangelfullt',
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

    const percentValue = Number.isNaN(percent) ? '-' : toPercent(percent / 100);

    return `${label} (${percentValue} | ${count} stk)`;
  });

  return (
    <HorizontalBars barCount={labels.length} chartOptions={options} barThickness={BAR_THICKNESS}>
      <Bar data={{ labels, datasets }} options={options} />
    </HorizontalBars>
  );
};
