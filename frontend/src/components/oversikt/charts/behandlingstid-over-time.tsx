import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useFilteredFinishedStatistics } from '../../../hooks/use-statistics';
import { ChartContainer } from './styled-components';

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
  },
});

export const BehandlingstidOverTime = () => {
  const stats = useFilteredFinishedStatistics();

  const weekTotals = useMemo(
    () =>
      stats.reduce(
        (acc, stat) => {
          if (stat.avsluttetAvSaksbehandler !== null) {
            const { weekNumber } = stat.avsluttetAvSaksbehandler;
            const existing = acc.get(weekNumber);

            if (typeof existing === 'undefined') {
              acc.set(weekNumber, {
                count: 1,
                total: stat.totalBehandlingstidDays,
                ka: stat.behandlingstidDays,
                first: stat.totalBehandlingstidDays - stat.behandlingstidDays,
              });
            } else {
              acc.set(weekNumber, {
                count: existing.count + 1,
                total: existing.total + stat.totalBehandlingstidDays,
                ka: existing.ka + stat.behandlingstidDays,
                first: existing.first + stat.totalBehandlingstidDays - stat.behandlingstidDays,
              });
            }
          }

          return acc;
        },
        new Map<
          number,
          {
            count: number;
            total: number;
            ka: number;
            first: number;
          }
        >()
      ),
    [stats]
  );

  const sortedEntries = useMemo(() => [...weekTotals.entries()].sort((a, b) => a[0] - b[0]), [weekTotals]);

  const data = useMemo(() => {
    const labels = sortedEntries.map((entry) => `Uke ${entry[0]}`);
    const ka = sortedEntries.map((entry) => Math.round(entry[1].ka / entry[1].count));
    const first = sortedEntries.map((entry) => Math.round(entry[1].first / entry[1].count));
    const total = sortedEntries.map((entry) => Math.round(entry[1].total / entry[1].count));

    return {
      labels,
      datasets: [
        {
          label: 'Klageinstans',
          data: ka,
          backgroundColor: '#3386E0',
          borderColor: '#3386E0',
          borderWidth: 2,
        },
        {
          label: 'Førsteinstans',
          data: first,
          backgroundColor: '#FFAA33',
          borderColor: '#FFAA33',
          borderWidth: 2,
        },
        {
          label: 'Total',
          data: total,
          backgroundColor: '#D05C4A',
          borderColor: '#D05C4A',
          borderWidth: 2,
        },
      ],
    };
  }, [sortedEntries]);

  const options = useOptions();

  return (
    <ChartContainer>
      <Line options={options} data={data} />
    </ChartContainer>
  );
};
