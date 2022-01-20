import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { isNotUndefined } from '../../../functions/is-not';
import { useKodeverkValue } from '../../../hooks/use-kodeverk-value';
import { UtfallEnum } from '../../../types/utfall';
import { useFilteredFinishedStatistics, useFilteredStatistics } from '../hooks/use-statistics';
import { percent, tickCallback } from './formatting';
import { ChartContainer } from './styled-components';

const useOptions = (total = 1): ChartOptions<'bar'> => ({
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
        drawBorder: false,
        display: false,
      },
    },
    x: {
      ticks: {
        callback: (value) => tickCallback(value, total),
        font: {
          size: 16,
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
    },
    tooltip: {
      callbacks: {
        label: ({ parsed, label }) => `${label}: ${percent(parsed.x, total)}`,
      },
    },
  },
});

export const UtfallGraph = () => {
  const allStats = useFilteredStatistics();
  const finishedStats = useFilteredFinishedStatistics();
  const utfall = useKodeverkValue('utfall');

  const stats = useMemo(
    () =>
      new Map<UtfallEnum, number>(
        Object.values(UtfallEnum).map((id) => [id, finishedStats.filter(({ utfallId }) => utfallId === id).length])
      ),
    [finishedStats]
  );

  const keys = Array.from(stats.keys());
  const labels: string[] = keys.map((key) => utfall?.find(({ id }) => id === key)?.navn).filter(isNotUndefined);

  const backgroundColor: string[] = keys.map((key) => COLOR_MAP[key]);

  const values = Array.from(stats.values());

  const options = useOptions(allStats?.length);

  return (
    <ChartContainer>
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
    </ChartContainer>
  );
};

const COLOR_MAP = {
  [UtfallEnum.AVVIST]: '#7CDAF8',
  [UtfallEnum.DELVIS_MEDHOLD]: '#FFAA33',
  [UtfallEnum.MEDHOLD]: '#D05C4A',
  [UtfallEnum.OPPHEVET]: '#C1CB33',
  [UtfallEnum.RETUR]: '#3386E0',
  [UtfallEnum.STADFESTELSE]: '#33AA5F',
  [UtfallEnum.TRUKKET]: '#A0A0A0',
  [UtfallEnum.UGUNST]: '#8269A2',
};
