import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { CardTitle } from '../../../styled-components/cards';
import { StatsDate } from '../../../types/statistics/common';
import { CardSize, DynamicCard } from '../card/card';

const useOptions = (): ChartOptions<'line'> => ({
  aspectRatio: 3,
  scales: {
    y: {
      title: { display: true, text: 'Behandlingstid (dager)' },
    },
  },
});

interface Stat {
  avsluttetAvSaksbehandler: StatsDate;
  kaBehandlingstidDays: number;
  totalBehandlingstidDays: number;
  vedtaksinstansBehandlingstidDays: number;
}

interface Props {
  stats: Stat[];
}

export const BehandlingstidOverTime = ({ stats: allStats }: Props) => {
  const stats = useMemo(
    () => allStats.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null),
    [allStats]
  );

  const weekTotals = useMemo(
    () =>
      stats.reduce(
        (acc, stat) => {
          if (stat.avsluttetAvSaksbehandler !== null) {
            const { weekNumber, year } = stat.avsluttetAvSaksbehandler;
            const key = `${year}-${weekNumber}`;
            const existing = acc.get(key);

            if (typeof existing === 'undefined') {
              acc.set(key, {
                count: 1,
                total: stat.totalBehandlingstidDays,
                ka: stat.kaBehandlingstidDays,
                vedtak: stat.vedtaksinstansBehandlingstidDays,
                year,
                weekNumber,
              });
            } else {
              acc.set(key, {
                count: existing.count + 1,
                total: existing.total + stat.totalBehandlingstidDays,
                ka: existing.ka + stat.kaBehandlingstidDays,
                vedtak: existing.vedtak + stat.vedtaksinstansBehandlingstidDays,
                year,
                weekNumber,
              });
            }
          }

          return acc;
        },
        new Map<
          string,
          {
            count: number;
            total: number;
            ka: number;
            vedtak: number;
            year: number;
            weekNumber: number;
          }
        >()
      ),
    [stats]
  );

  const sortedEntries = useMemo(
    () =>
      [...weekTotals.entries()].sort((a, b) => {
        const [, { year: aYear, weekNumber: aWeek }] = a;
        const [, { year: bYear, weekNumber: bWeek }] = b;

        if (aYear !== bYear) {
          return aYear - bYear;
        }

        return aWeek - bWeek;
      }),
    [weekTotals]
  );

  const data = useMemo(() => {
    const labels = sortedEntries.map(([, { year, weekNumber }]) => `${year} uke ${weekNumber}`);
    const vedtak = sortedEntries.map((entry) => Math.round(entry[1].vedtak / entry[1].count));
    const ka = sortedEntries.map((entry) => Math.round(entry[1].ka / entry[1].count));
    const total = sortedEntries.map((entry) => Math.round(entry[1].total / entry[1].count));

    return {
      labels,
      datasets: [
        {
          label: 'Vedtaksinstans',
          data: vedtak,
          backgroundColor: '#7CDAF8',
          borderColor: '#7CDAF8',
          borderWidth: 2,
        },
        {
          label: 'Klageinstans',
          data: ka,
          backgroundColor: '#8269A2',
          borderColor: '#8269A2',
          borderWidth: 2,
        },
        {
          label: 'Total',
          data: total,
          backgroundColor: '#33AA5F',
          borderColor: '#33AA5F',
          borderWidth: 2,
        },
      ],
    };
  }, [sortedEntries]);

  const options = useOptions();

  const size = useMemo(() => {
    if (data.labels.length > 15) {
      return CardSize.LARGE;
    }

    return CardSize.MEDIUM;
  }, [data.labels]);

  return (
    <DynamicCard size={size}>
      <CardTitle>Behandlingstid</CardTitle>
      <Line options={options} data={data} />
    </DynamicCard>
  );
};
