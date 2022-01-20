import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSearchParams } from 'react-router-dom';
import { useHjemmelTexts } from '../hooks/use-hjemmel-texts';
import { useFilteredStatistics } from '../hooks/use-statistics';
import { QueryParams } from '../types';

type TooltipCallback = (args: { parsed: { y: number }; label: string }) => string;

const useOptions = (tooltipCallback?: TooltipCallback): ChartOptions<'bar'> => ({
  animation: {
    duration: 200,
    easing: 'easeOutQuart',
  },
  scales: {
    y: {
      ticks: {
        font: {
          size: 14,
          family: '"Source Sans Pro", Arial, sans-serif',
        },
      },
      beginAtZero: true,
      bounds: 'ticks',
      min: 0,
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    x: {
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
    },
    tooltip: {
      callbacks: {
        label: tooltipCallback,
      },
    },
  },
});

const useFilteredYtelser = () => {
  const [searchParams] = useSearchParams();

  return searchParams.get(QueryParams.YTELSER)?.split(',') ?? [];
};

export const Hjemler = () => {
  const stats = useFilteredStatistics();
  const filteredYtelser = useFilteredYtelser();
  const hjemmelTexts = useHjemmelTexts(filteredYtelser);

  const tooltipCallback: TooltipCallback = ({ parsed, label }) =>
    `${hjemmelTexts.find((hjemmel) => hjemmel.label === label)?.tooltip ?? label}: ${parsed.y}`;

  const options = useOptions(tooltipCallback);

  const hjemmelStats = useMemo(
    () =>
      stats.reduce((acc, stat) => {
        stat.hjemmelIdList.forEach((hjemmelId) => {
          acc.set(hjemmelId, (acc.get(hjemmelId) ?? 0) + 1);
        });

        return acc;
      }, new Map<string, number>()),
    [stats]
  );

  const barData = useMemo(() => {
    const top20 = Array.from(hjemmelStats.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);

    const labels = Array.from(top20.map(([key]) => key)).map(
      (hjemmelId) => hjemmelTexts.find(({ id }) => hjemmelId === id)?.label ?? hjemmelId
    );

    const data = Array.from(top20.map(([, value]) => value));

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: '#3386E0',
          borderColor: '#3386E0',
        },
      ],
    };
  }, [hjemmelStats, hjemmelTexts]);

  return <Bar options={options} data={barData} />;
};
