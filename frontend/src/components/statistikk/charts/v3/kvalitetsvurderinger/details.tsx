import { useAppTheme } from '@app/app-theme';
import {
  BAR_THICKNESS,
  getDatasets,
  type ReasonIds,
  type ReasonTexts,
} from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/calculations/get-datasets';
import type { ChartOptions } from 'chart.js';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { type GetAbsoluteValue, useBarTooltipText } from '../../../hooks/use-bar-tooltip-text';
import { HorizontalBars } from '../../common/horizontal-bars';
import type { DataSetV3 } from './types';

const UNIT = 'avvik';

const useOptions = (getAbsoluteValue: GetAbsoluteValue): ChartOptions<'bar'> => {
  const { renderBarText, tooltipCallback } = useBarTooltipText(getAbsoluteValue, UNIT);

  return {
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      y: { stacked: true },
      x: {
        beginAtZero: true,
        stacked: true,
        ticks: { callback: (label) => label },
        title: { display: true, text: 'Antall' },
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
        xAlign: 'center',
        yAlign: 'top',
        caretPadding: 25,
      },
    },
  };
};

interface Props {
  stats: DataSetV3[];
  reasonIds: ReasonIds;
  reasonTexts: ReasonTexts;
}

export const Details = ({ stats, reasonIds, reasonTexts }: Props) => {
  const theme = useAppTheme();
  const { datasets, labels } = useMemo(
    () => getDatasets(stats, reasonIds, reasonTexts, UNIT, theme),
    [stats, theme, reasonIds, reasonTexts],
  );

  const getAbsoluteValue: GetAbsoluteValue = (datasetIndex, dataIndex) => {
    const count = datasets[datasetIndex]?.data[dataIndex] ?? 0;
    const percent = datasets[datasetIndex]?.percentages[dataIndex] ?? 0;

    return [count, percent];
  };
  const options = useOptions(getAbsoluteValue);

  return (
    <HorizontalBars barCount={labels.length} barThickness={BAR_THICKNESS} chartOptions={options}>
      <Bar data={{ datasets, labels }} options={options} />
    </HorizontalBars>
  );
};
