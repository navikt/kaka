import { useColor } from '@app/components/statistikk/colors/get-color';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import type { ChartOptions } from 'chart.js';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useBehandlingstidField } from '../hooks/use-behandlingstid-param';
import { useBuckets } from '../hooks/use-buckets';

const useOptions = (): ChartOptions<'bar'> => {
  const neutral = useColor(ColorToken.Info500);
  const warning = useColor(ColorToken.Warning500);
  const danger = useColor(ColorToken.Danger900);

  return {
    aspectRatio: 3,
    scales: {
      y: {
        title: { display: true, text: 'Antall' },
        beginAtZero: true,
        bounds: 'ticks',
      },
      x: {
        title: { display: true, text: 'Innen uke' },
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    backgroundColor: (ctx) => {
      if (typeof ctx?.parsed === 'undefined') {
        return neutral;
      }

      const { x } = ctx.parsed;

      if (x < 12) {
        return neutral;
      }

      if (x > 15) {
        return danger;
      }

      return warning;
    },
  };
};

interface Stat {
  kaBehandlingstidDays: number;
  totalBehandlingstidDays: number;
  vedtaksinstansBehandlingstidDays: number;
}

interface Props {
  stats: Stat[];
}

export const BehandlingstidHistogram = ({ stats }: Props) => {
  const field = useBehandlingstidField();
  const fieldStats = useMemo(() => stats.map((stat) => stat[field]), [stats, field]);
  const [labels, data] = useBuckets(fieldStats, 7, 104);

  const options = useOptions();

  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [{ data, barPercentage: 0.95, categoryPercentage: 0.95 }],
      }}
    />
  );
};
