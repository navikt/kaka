import type { ChartOptions } from 'chart.js';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { type GetAbsoluteValue, useBarTooltipText } from '../../../hooks/use-bar-tooltip-text';
import { BAR_THICKNESS, getIkkeKonkretBegrunnelseDatasets } from './calculations/ikke-konkret-begrunnelse';
import { HorizontalBars } from './horizontal-bars';
import type { DataSet } from './types';

const UNIT = 'avvik';

const useOptions = (getAbsoluteValue: GetAbsoluteValue): ChartOptions<'bar'> => {
  const { renderBarText, tooltipCallback } = useBarTooltipText(getAbsoluteValue, UNIT);

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
        xAlign: 'center',
        yAlign: 'top',
        caretPadding: 25,
      },
    },
    scales: {
      y: { stacked: true },
      x: {
        beginAtZero: true,
        stacked: true,
        ticks: { callback: (label) => label },
        title: {
          display: true,
          text: 'Antall',
        },
      },
    },
  };
};

interface Props {
  stats: DataSet[];
}

export const IkkeKonkretBegrunnelse = ({ stats }: Props) => {
  const data = useMemo(() => getIkkeKonkretBegrunnelseDatasets(stats, UNIT), [stats]);

  const getAbsoluteValue: GetAbsoluteValue = (datasetIndex, dataIndex) => {
    const count = data.datasets[datasetIndex]?.data[dataIndex] ?? 0;
    const percent = data.datasets[datasetIndex]?.percentages[dataIndex] ?? 0;

    return [count, percent];
  };

  const options = useOptions(getAbsoluteValue);

  return (
    <HorizontalBars barCount={data.labels.length} barThickness={BAR_THICKNESS} chartOptions={options}>
      <Bar data={data} options={options} />
    </HorizontalBars>
  );
};
