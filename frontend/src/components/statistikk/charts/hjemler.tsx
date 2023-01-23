import { ChartOptions, TooltipCallbacks } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '../../filters/filter-query-params';
import { useHjemmelTexts } from '../../filters/hooks/use-hjemmel-texts';
import { GRAPH_COLOR } from './colors';

type TooltipCallback = TooltipCallbacks<'bar'>['label'];

const useOptions = (tooltipCallback?: TooltipCallback): ChartOptions<'bar'> => ({
  indexAxis: 'y',
  aspectRatio: 1,
  scales: {
    y: {
      beginAtZero: true,
      bounds: 'ticks',
      min: 0,
    },
    x: { ticks: { stepSize: 1 } },
  },
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: { display: false },
    tooltip: {
      callbacks: { label: tooltipCallback },
    },
  },
});

interface Stat {
  hjemmelIdList: string[];
}

interface Props {
  stats: Stat[];
}

const useFilteredYtelser = () => {
  const [searchParams] = useSearchParams();

  return searchParams.get(QueryParams.YTELSER)?.split(',') ?? [];
};

export const Hjemler = ({ stats }: Props) => {
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

    const labels = top20
      .map(([key]) => key)
      .map((hjemmelId) => hjemmelTexts.find(({ id }) => hjemmelId === id)?.label ?? hjemmelId);

    const data = top20.map(([, value]) => value);

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
