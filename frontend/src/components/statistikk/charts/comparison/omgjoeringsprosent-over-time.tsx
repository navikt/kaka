import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { IFullStatisticVurderingV2 } from '../../../../types/statistics/v2';
import { UtfallEnum } from '../../../../types/utfall';

const useOptions = (): ChartOptions<'line'> => ({
  aspectRatio: 3,
  scales: {
    y: { title: { display: true, text: 'Omgjøringsprosent' } },
  },
});

type MinimalVurdering = Pick<IFullStatisticVurderingV2, 'avsluttetAvSaksbehandler' | 'utfallId'>;

interface Stat {
  color: string;
  label: string;
  vurderinger: MinimalVurdering[];
}

interface Props {
  stats: Stat[];
}

const isOmjoering = (utfallId: UtfallEnum) =>
  utfallId === UtfallEnum.MEDHOLD || utfallId === UtfallEnum.DELVIS_MEDHOLD || utfallId === UtfallEnum.OPPHEVET;

export const OmgjoeringsprosentOverTime = ({ stats }: Props) => {
  const options = useOptions();

  const datasets = useMemo(
    () =>
      stats.map((s) => {
        const weekTotals = s.vurderinger.reduce((acc, stat) => {
          if (stat.avsluttetAvSaksbehandler === null) {
            return acc;
          }

          const increment = isOmjoering(stat.utfallId) ? 1 : 0;

          const { weekNumber, year } = stat.avsluttetAvSaksbehandler;
          const key = `${year}-${weekNumber}`;
          const existing = acc.get(key);

          if (typeof existing === 'undefined') {
            acc.set(key, { count: increment, year, weekNumber, total: 1 });
          } else {
            acc.set(key, { count: existing.count + increment, year, weekNumber, total: existing.total + 1 });
          }

          return acc;
        }, new Map<string, { count: number; total: number; year: number; weekNumber: number }>());

        const sortedEntries = [...weekTotals.entries()].sort((a, b) => {
          const [, { year: aYear, weekNumber: aWeek }] = a;
          const [, { year: bYear, weekNumber: bWeek }] = b;

          if (aYear !== bYear) {
            return aYear - bYear;
          }

          return aWeek - bWeek;
        });

        const labels = sortedEntries.map(([, { year, weekNumber }]) => `${year} uke ${weekNumber}`);

        const data = sortedEntries.map((entry) => (entry[1].count / entry[1].total) * 100);

        return {
          label: s.label,
          labels,
          data,
          backgroundColor: s.color,
          borderColor: s.color,
        };
      }),
    [stats]
  );

  const [first] = datasets;
  const labels = typeof first === 'undefined' ? [] : first.labels;

  const data = { labels, datasets };

  return <Line options={options} data={data} />;
};
