import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { UTFALL_COLOR_MAP } from '@app/colors/colors';
import { isNotUndefined } from '@app/functions/is-not';
import { UTFALL_VALUES_FOR_STATS, useSortedUtfall } from '@app/simple-api-state/use-utfall';
import { StatsDate } from '@app/types/statistics/common';
import { UtfallEnum } from '@app/types/utfall';
import { percent, tickCallback } from './formatting';

const useOptions = (total = 1): ChartOptions<'bar'> => ({
  indexAxis: 'y',
  scales: {
    y: { beginAtZero: true, bounds: 'ticks', min: 0 },
    x: {
      ticks: { callback: (value) => tickCallback(value, total) },
      stacked: true,
    },
  },
  plugins: {
    legend: { display: false, position: 'top' as const },
    title: { display: false },
    tooltip: {
      callbacks: { label: ({ parsed, label }) => `${label}: ${percent(parsed.x, total)}` },
    },
  },
});

interface Stat {
  utfallId: UtfallEnum;
  avsluttetAvSaksbehandler: StatsDate;
}

interface Props {
  stats: Stat[];
}

export const UtfallGraph = ({ stats: allStats }: Props) => {
  const finishedStats = useMemo(
    () => allStats.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null),
    [allStats],
  );

  const { data: utfall = [] } = useSortedUtfall();

  const stats = useMemo(
    () =>
      new Map<UtfallEnum, number>(
        UTFALL_VALUES_FOR_STATS.map((id) => [id, finishedStats.filter(({ utfallId }) => utfallId === id).length]),
      ),
    [finishedStats],
  );

  const labels: string[] = UTFALL_VALUES_FOR_STATS.map((key) => utfall.find(({ id }) => id === key)?.navn).filter(
    isNotUndefined,
  );

  const backgroundColor: string[] = UTFALL_VALUES_FOR_STATS.map((key) => UTFALL_COLOR_MAP[key]);

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
