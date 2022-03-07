import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { CardTitle } from '../../../styled-components/cards';
import { CardSize, DynamicCard } from '../card/card';
import { StyledCharts } from '../styled-components';
import { StatisticsProps } from '../types';

const useOptions = (): ChartOptions<'line'> => ({
  responsive: true,
  scales: {
    y: {
      title: {
        display: true,
        text: 'Behandlingstid (dager)',
        font: {
          weight: 'bold',
          size: 14,
        },
      },
    },
    x: {
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
  elements: {
    line: {
      tension: 0.3,
    },
  },
});

export const BehandlingstidOverTime = ({ stats: allStats }: StatisticsProps) => {
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
                ka: stat.behandlingstidDays,
                first: stat.totalBehandlingstidDays - stat.behandlingstidDays,
                year,
                weekNumber,
              });
            } else {
              acc.set(key, {
                count: existing.count + 1,
                total: existing.total + stat.totalBehandlingstidDays,
                ka: existing.ka + stat.behandlingstidDays,
                first: existing.first + stat.totalBehandlingstidDays - stat.behandlingstidDays,
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
            first: number;
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
    const ka = sortedEntries.map((entry) => Math.round(entry[1].ka / entry[1].count));
    const first = sortedEntries.map((entry) => Math.round(entry[1].first / entry[1].count));
    const total = sortedEntries.map((entry) => Math.round(entry[1].total / entry[1].count));

    return {
      labels,
      datasets: [
        {
          label: 'Klageinstans',
          data: ka,
          backgroundColor: '#8269A2',
          borderColor: '#8269A2',
          borderWidth: 2,
        },
        {
          label: 'Vedtaksinstans',
          data: first,
          backgroundColor: '#7CDAF8',
          borderColor: '#7CDAF8',
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
      <StyledCharts>
        <Line options={options} data={data} />
      </StyledCharts>
    </DynamicCard>
  );
};
