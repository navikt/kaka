import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useBehandlingstidParam } from '../hooks/use-behandlingstid-param';
import { useBuckets } from '../hooks/use-buckets';
import { useFilteredStatistics } from '../hooks/use-statistics';
import { ChartContainer } from './styled-components';

const useOptions = (onClick?: ChartOptions<'bar'>['onClick']): ChartOptions<'bar'> => ({
  onClick,
  responsive: true,
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
        drawBorder: false,
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
        drawBorder: false,
        display: false,
      },
      stacked: true,
    },
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

export const RegistreringTimeDistribution = () => {
  const stats = useFilteredStatistics();
  const [field] = useBehandlingstidParam();
  const fieldStats = useMemo(() => stats.map((stat) => stat[field]), [stats, field]);
  const [labels, data] = useBuckets(fieldStats, 7);

  const options = useOptions();

  return (
    <ChartContainer>
      <Bar
        options={options}
        data={{
          labels,
          datasets: [
            {
              data,
              barPercentage: 0.95,
              categoryPercentage: 0.95,
              backgroundColor: '#3386E0',
            },
          ],
        }}
      />
    </ChartContainer>
  );
};
