import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { isNotUndefined } from '../../../functions/is-not';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { UtfallEnum } from '../../../types/utfall';
import { StatisticsProps } from '../types';
import { percent, tickCallback } from './formatting';

const useOptions = (total = 1): ChartOptions<'bar'> => ({
  elements: {
    bar: {
      borderRadius: 4,
    },
  },
  responsive: true,
  animation: {
    duration: 200,
    easing: 'easeOutQuart',
  },
  indexAxis: 'y',
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
        callback: (value) => tickCallback(value, total),
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
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
      labels: {
        font: {
          size: 14,
          family: '"Source Sans Pro", Arial, sans-serif',
        },
      },
    },
    title: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: ({ parsed, label }) => `${label}: ${percent(parsed.x, total)}`,
      },
    },
  },
});

export const UtfallGraph = ({ stats: allStats }: StatisticsProps) => {
  const finishedStats = useMemo(
    () => allStats.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null),
    [allStats]
  );

  const utfall = useKodeverkValueDefault('utfall');

  const keys = Object.values(UtfallEnum);

  const stats = useMemo(
    () =>
      new Map<UtfallEnum, number>(
        keys.map((id) => [id, finishedStats.filter(({ utfallId }) => utfallId === id).length])
      ),
    [finishedStats, keys]
  );

  const labels: string[] = keys.map((key) => utfall.find(({ id }) => id === key)?.navn).filter(isNotUndefined);

  const backgroundColor: string[] = keys.map((key) => COLOR_MAP[key]);

  const values = Array.from(stats.values());

  const options = useOptions(allStats?.length);

  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            label: 'Utfall',
            data: values,
            backgroundColor,
            barPercentage: 0.95,
            categoryPercentage: 0.95,
          },
        ],
      }}
    />
  );
};

const COLOR_MAP: Record<UtfallEnum, string> = {
  [UtfallEnum.AVVIST]: '#B0B0B0',
  [UtfallEnum.DELVIS_MEDHOLD]: '#FFAA33',
  [UtfallEnum.MEDHOLD]: '#D05C4A',
  [UtfallEnum.OPPHEVET]: '#C1CB33',
  [UtfallEnum.RETUR]: '#3386E0',
  [UtfallEnum.STADFESTELSE]: '#33AA5F',
  [UtfallEnum.TRUKKET]: '#7CDAF8',
  [UtfallEnum.UGUNST]: '#8269A2',
  [UtfallEnum.INNSTILLING_STADFESTELSE]: '#005519',
  [UtfallEnum.INNSTILLING_AVVIST]: '#262626',
};
