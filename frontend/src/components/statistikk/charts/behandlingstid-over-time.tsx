import { EChart } from '@app/components/echarts/echarts';
import { useColorMap } from '@app/components/statistikk/colors/get-color';
import type { ColorToken } from '@app/components/statistikk/colors/token-name';
import type { StatsDate } from '@app/types/statistics/common';
import { getISOWeeksInYear } from 'date-fns';
import { useMemo } from 'react';

interface Data {
  avsluttetAvSaksbehandler: StatsDate;
  behandlingstidDays: number;
}

interface Stat {
  label: string;
  data: Data[];
  color: ColorToken;
}

interface Dataset {
  count: number;
  behandlingstidDays: number;
  year: number;
  weekNumber: number;
}

interface Props {
  stats: Stat[];
  title: string;
  headerContent?: React.ReactNode;
}

export const BehandlingstidOverTime = ({ stats, title, headerContent }: Props) => {
  const colorMap = useColorMap();

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

  const series = useMemo(
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

        const dataByLabel: Record<string, number> = {};

        for (const [key, { behandlingstidDays, count }] of weekTotals) {
          dataByLabel[key] = Math.round(behandlingstidDays / count);
        }

        const c = colorMap[color];

        return {
          name: label,
          type: 'line' as const,
          smooth: true,
          connectNulls: true,
          data: labels.map((l) => dataByLabel[l] ?? null),
          itemStyle: { color: c },
          lineStyle: { color: c, width: 2 },
        };
      }),
    [stats, labels, colorMap],
  );

  return (
    <EChart
      title={title}
      headerContent={headerContent}
      option={{
        grid: { bottom: 110 },
        tooltip: { trigger: 'axis' },
        legend: {},
        xAxis: { type: 'category', data: labels, axisLabel: { rotate: 45 } },
        yAxis: { type: 'value', name: 'Behandlingstid (dager)', nameLocation: 'middle', nameGap: 40 },
        series,
      }}
    />
  );
};
