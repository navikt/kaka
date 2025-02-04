import { UTFALL_COLOR_MAP } from '@app/colors/colors';
import { useSakstypeFilter } from '@app/components/filters/hooks/use-query-filter';
import { isRelevantSakstype } from '@app/components/statistikk/filters/relevant';
import { useSakstypeToUtfall } from '@app/simple-api-state/use-kodeverk';
import { useSortedUtfall } from '@app/simple-api-state/use-utfall';
import type { SakstypeEnum } from '@app/types/sakstype';
import type { StatsDate } from '@app/types/statistics/common';
import type { UtfallEnum } from '@app/types/utfall';
import type { ChartOptions } from 'chart.js';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
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
  sakstypeId: SakstypeEnum;
  avsluttetAvSaksbehandler: StatsDate;
}

interface Props {
  stats: Stat[];
}

const useSelectedUtfall = () => {
  const selectedSakstyper = useSakstypeFilter();
  const { data: sakstypeToUtfall = [] } = useSakstypeToUtfall();
  const { data: sortedUtfallKodeverk = [] } = useSortedUtfall();

  return useMemo(() => {
    const relevantUtfall = sakstypeToUtfall
      .filter(({ id }) => selectedSakstyper.includes(id))
      .flatMap(({ utfall }) => utfall);

    return sortedUtfallKodeverk.filter(({ id }) => relevantUtfall.map((u) => u.id).includes(id));
  }, [selectedSakstyper, sakstypeToUtfall, sortedUtfallKodeverk]);
};

export const UtfallGraph = ({ stats: allStats }: Props) => {
  const selectedUtfall = useSelectedUtfall();

  const relevantStats = useMemo(
    () =>
      allStats.filter(
        ({ avsluttetAvSaksbehandler, sakstypeId }) =>
          avsluttetAvSaksbehandler !== null && isRelevantSakstype(sakstypeId),
      ),
    [allStats],
  );

  const stats = useMemo(
    () =>
      new Map<UtfallEnum, number>(
        selectedUtfall.map(({ id }) => [id, relevantStats.filter(({ utfallId }) => utfallId === id).length]),
      ),
    [relevantStats, selectedUtfall],
  );

  const labels: string[] = selectedUtfall.map(({ navn }) => navn);

  const backgroundColor: string[] = selectedUtfall.map(({ id }) => UTFALL_COLOR_MAP[id]);

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
