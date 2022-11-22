import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useBehandlingstidField } from '../hooks/use-behandlingstid-param';
import { useBuckets } from '../hooks/use-buckets';
import { StatisticsProps } from '../types';
import { GRAPH_COLOR } from './colors';

const useOptions = (): ChartOptions<'bar'> => ({
  responsive: true,
  elements: {
    bar: {
      borderRadius: 4,
    },
  },
  aspectRatio: 3,
  animation: {
    duration: 200,
    easing: 'easeOutQuart',
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Antall',
        font: {
          weight: 'bold',
          size: 14,
        },
      },
      ticks: {
        font: {
          size: 14,
          family: '"Source Sans Pro", Arial, sans-serif',
        },
      },
      beginAtZero: true,
      bounds: 'ticks',
      grid: {
        display: false,
      },
    },
    x: {
      title: {
        display: true,
        text: 'Innen uke',
        font: {
          weight: 'bold',
          size: 14,
        },
      },
      ticks: {
        font: {
          size: 14,
          family: '"Source Sans Pro", Arial, sans-serif',
        },
      },
      grid: {
        display: false,
      },
      stacked: true,
    },
  },
  backgroundColor: (ctx) => {
    if (typeof ctx?.parsed === 'undefined') {
      return GRAPH_COLOR.BLUE;
    }

    const { x } = ctx.parsed;

    if (x < 12) {
      return GRAPH_COLOR.BLUE;
    }

    if (x > 15) {
      return GRAPH_COLOR.RED;
    }

    return GRAPH_COLOR.YELLOW;
  },
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
      labels: {
        font: {
          size: 16,
          family: '"Source Sans Pro", Arial, sans-serif',
        },
      },
    },
    title: {
      display: false,
      font: {
        size: 24,
        family: '"Source Sans Pro", Arial, sans-serif',
      },
    },
  },
});

export const BehandlingstidHistogram = ({ stats }: StatisticsProps) => {
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
