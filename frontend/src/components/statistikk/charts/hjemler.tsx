import { ChartOptions, TooltipItem, TooltipModel } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '../../filters/filter-query-params';
import { useHjemmelTexts } from '../../filters/hooks/use-hjemmel-texts';
import { StatisticsProps } from '../types';
import { GRAPH_COLOR } from './colors';

type TooltipCallback = ((this: TooltipModel<'bar'>, tooltipItem: TooltipItem<'bar'>) => string | string[]) | undefined;

const useOptions = (tooltipCallback?: TooltipCallback): ChartOptions<'bar'> => ({
  elements: {
    bar: {
      borderRadius: 4,
    },
  },
  animation: {
    duration: 200,
    easing: 'easeOutQuart',
  },
  indexAxis: 'y',
  aspectRatio: 1,
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
        display: false,
      },
    },
    x: {
      ticks: {
        stepSize: 1,
        font: {
          size: 14,
          family: '"Source Sans Pro", Arial, sans-serif',
        },
      },
      grid: {
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

export const Hjemler = ({ stats }: StatisticsProps) => {
  const filteredYtelser = useFilteredYtelser();
  const hjemmelTexts = useHjemmelTexts(filteredYtelser);

  const tooltipCallback: TooltipCallback = ({ parsed, label }) =>
    `${hjemmelTexts.find((hjemmel) => hjemmel.label === label)?.tooltip ?? label}: ${parsed.x}`;

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
          backgroundColor: GRAPH_COLOR.BLUE,
          borderColor: GRAPH_COLOR.BLUE,
        },
      ],
    };
  }, [hjemmelStats, hjemmelTexts]);

  return <Bar options={options} data={barData} />;
};
