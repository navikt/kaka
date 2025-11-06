import type { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { type GetAbsoluteValue, useBarTooltipText } from '../../hooks/use-bar-tooltip-text';
import { BAR_THICKNESS, type StackedBarPiece } from '../v2/kvalitetsvurderinger/calculations/mangelfull-details';
import { HorizontalBars } from './horizontal-bars';

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
  datasets: StackedBarPiece[];
  labels: string[];
}

export const MangelfullDetails = ({ datasets, labels }: Props) => {
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
