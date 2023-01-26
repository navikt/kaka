import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { GetAbsoluteValue, useBarTooltipText } from '../../../hooks/use-bar-tooltip-text';
import { BAR_THICKNESS, getIkkeKonkretBegrunnelseDatasets } from './calculations/ikke-konkret-begrunnelse';
import { HorizontalBars } from './horizontal-bars';
import { DataSet } from './types';

const useOptions = (getAbsoluteValue: GetAbsoluteValue): ChartOptions<'bar'> => {
  const { renderBarText, tooltipCallback } = useBarTooltipText(getAbsoluteValue);

  return {
    maintainAspectRatio: false,
    aspectRatio: 3,
    indexAxis: 'y',

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
  };
};

interface Props {
  stats: DataSet[];
}

export const IkkeKonkretBegrunnelse = ({ stats }: Props) => {
  const data = useMemo(() => getIkkeKonkretBegrunnelseDatasets(stats), [stats]);

  const getAbsoluteValue: GetAbsoluteValue = (datasetIndex, dataIndex) => {
    const count = data.datasets[datasetIndex]?.counts[dataIndex] ?? 0;
    const percent = data.datasets[datasetIndex]?.data[dataIndex] ?? 0;

    return [count, percent];
  };

  const options = useOptions(getAbsoluteValue);

  return (
    <HorizontalBars barCount={stats.length} barThickness={BAR_THICKNESS}>
      <Bar data={data} options={options} />
    </HorizontalBars>
  );
};