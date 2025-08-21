import { useAppTheme } from '@app/app-theme';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import type { ColorToken } from '@app/components/statistikk/colors/token-name';
import { CardTitle } from '@app/styled-components/cards';
import type { StatsDate } from '@app/types/statistics/common';
import type { ChartOptions } from 'chart.js';
import { getISOWeeksInYear } from 'date-fns';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { CardSize, DynamicCard } from '../card/card';

const useOptions = (): ChartOptions<'line'> => ({
  aspectRatio: 3,
  scales: {
    y: {
      title: { display: true, text: 'Behandlingstid (dager)' },
    },
  },
});

interface Data {
  avsluttetAvSaksbehandler: StatsDate;
  behandlingstidDays: number;
}

interface Stat {
  label: string;
  data: Data[];
  color: ColorToken;
}

interface Props {
  stats: Stat[];
  children?: React.ReactNode;
}

interface Dataset {
  count: number;
  behandlingstidDays: number;
  year: number;
  weekNumber: number;
}

export const BehandlingstidOverTime = ({ stats, children }: Props) => {
  const theme = useAppTheme();
  const datasets = useMemo(
    () =>
      stats.map(({ label, color, data: rawData }) => {
        const weekTotals = rawData
          .sort((a, b) => {
            const { year: aYear, weekNumber: aWeek } = a.avsluttetAvSaksbehandler;
            const { year: bYear, weekNumber: bWeek } = b.avsluttetAvSaksbehandler;

            if (aYear !== bYear) {
              return aYear - bYear;
            }

            return aWeek - bWeek;
          })
          .reduce((acc, stat) => {
            if (stat.avsluttetAvSaksbehandler !== null) {
              const { weekNumber, year } = stat.avsluttetAvSaksbehandler;
              const key = `${year} uke ${weekNumber}`;
              const existing = acc.get(key);

              if (typeof existing === 'undefined') {
                acc.set(key, {
                  count: 1,
                  behandlingstidDays: stat.behandlingstidDays,
                  year,
                  weekNumber,
                });
              } else {
                acc.set(key, {
                  count: existing.count + 1,
                  behandlingstidDays: existing.behandlingstidDays + stat.behandlingstidDays,
                  year,
                  weekNumber,
                });
              }
            }

            return acc;
          }, new Map<string, Dataset>());

        const data: Record<string, number> = {};

        for (const [key, { behandlingstidDays, count }] of weekTotals) {
          data[key] = Math.round(behandlingstidDays / count);
        }

        const c = getColorFromTheme(color, theme);

        return {
          label,
          backgroundColor: c,
          borderColor: c,
          borderWidth: 2,
          data,
        };
      }),
    [stats, theme],
  );

  const options = useOptions();

  const labels = useMemo(() => {
    const flatStats = stats.flatMap(({ data }) => data);
    const [initial] = flatStats;

    if (typeof initial === 'undefined') {
      return [];
    }

    let minWeek = initial.avsluttetAvSaksbehandler.weekNumber;
    let minYear = initial.avsluttetAvSaksbehandler.year;
    let maxWeek = initial.avsluttetAvSaksbehandler.weekNumber;
    let maxYear = initial.avsluttetAvSaksbehandler.year;

    for (const { avsluttetAvSaksbehandler } of flatStats) {
      const { year, weekNumber } = avsluttetAvSaksbehandler;

      if (year < minYear || (year === minYear && weekNumber < minWeek)) {
        minYear = year;
        minWeek = weekNumber;
      }

      if (year > maxYear || (year === maxYear && weekNumber > maxWeek)) {
        maxYear = year;
        maxWeek = weekNumber;
      }
    }

    const yearAndWeekList: string[] = [];

    for (let y = minYear; y <= maxYear; y++) {
      const startWeek = y === minYear ? minWeek : 1;
      const numberOfWeeks = y === maxYear ? maxWeek : getISOWeeksInYear(new Date(y, 0, 1));

      for (let w = startWeek; w <= numberOfWeeks; w++) {
        yearAndWeekList.push(`${y} uke ${w}`);
      }
    }

    return yearAndWeekList;
  }, [stats]);

  const size = useMemo(() => {
    if (labels.length * datasets.length > 15) {
      return CardSize.LARGE;
    }

    return CardSize.MEDIUM;
  }, [datasets.length, labels.length]);

  return (
    <DynamicCard size={size}>
      <CardTitle>Behandlingstid</CardTitle>
      {children}
      <Line options={options} data={{ datasets, labels }} />
    </DynamicCard>
  );
};
