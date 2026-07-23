import { EChart } from '@app/components/echarts/echarts';
import { useColorMap } from '@app/components/statistikk/colors/get-color';
import type { ColorToken } from '@app/components/statistikk/colors/token-name';
import type { IFullStatisticVurderingV2 } from '@app/types/statistics/v2';
import { UtfallEnum } from '@app/types/utfall';
import { getISOWeeksInYear } from 'date-fns';
import { useMemo } from 'react';

type MinimalVurdering = Pick<IFullStatisticVurderingV2, 'avsluttetAvSaksbehandler' | 'utfallId'>;

interface Stat {
  color: ColorToken;
  label: string;
  data: MinimalVurdering[];
}

interface Props {
  stats: Stat[];
  title: string;
}

const isOmjoering = (utfallId: UtfallEnum) =>
  utfallId === UtfallEnum.MEDHOLD || utfallId === UtfallEnum.DELVIS_MEDHOLD || utfallId === UtfallEnum.OPPHEVET;

const getYearAndWeekLabels = (stats: Stat[]): string[] => {
  const flatData = stats.flatMap(({ data }) => data).filter((d) => d.avsluttetAvSaksbehandler !== null);
  const [initial] = flatData;

  if (typeof initial === 'undefined' || initial.avsluttetAvSaksbehandler === null) {
    return [];
  }

  let minWeek = initial.avsluttetAvSaksbehandler.weekNumber;
  let minYear = initial.avsluttetAvSaksbehandler.year;
  let maxWeek = initial.avsluttetAvSaksbehandler.weekNumber;
  let maxYear = initial.avsluttetAvSaksbehandler.year;

  for (const { avsluttetAvSaksbehandler } of flatData) {
    if (avsluttetAvSaksbehandler === null) {
      continue;
    }

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
};

export const OmgjoeringsprosentOverTime = ({ stats, title }: Props) => {
  const colorMap = useColorMap();

  const labels = useMemo(() => getYearAndWeekLabels(stats), [stats]);

  const series = useMemo(
    () =>
      stats.map(({ label, color, data }) => {
        const weekTotals = data.reduce((acc, stat) => {
          if (stat.avsluttetAvSaksbehandler === null) {
            return acc;
          }

          const increment = isOmjoering(stat.utfallId) ? 1 : 0;
          const { weekNumber, year } = stat.avsluttetAvSaksbehandler;
          const key = `${year} uke ${weekNumber}`;
          const existing = acc.get(key);

          if (typeof existing === 'undefined') {
            acc.set(key, { count: increment, total: 1 });
          } else {
            acc.set(key, { count: existing.count + increment, total: existing.total + 1 });
          }

          return acc;
        }, new Map<string, { count: number; total: number }>());

        const c = colorMap[color];

        return {
          name: label,
          type: 'line' as const,
          smooth: true,
          connectNulls: true,
          data: labels.map((l) => {
            const entry = weekTotals.get(l);

            return typeof entry === 'undefined' ? null : (entry.count / entry.total) * 100;
          }),
          itemStyle: { color: c },
          lineStyle: { color: c, width: 2 },
        };
      }),
    [stats, labels, colorMap],
  );

  return (
    <div className="h-100">
      <EChart
        title={title}
        option={{
          grid: { bottom: 110 },
          tooltip: { trigger: 'axis' },
          legend: {},
          xAxis: { type: 'category', data: labels, axisLabel: { rotate: 45 } },
          yAxis: {
            type: 'value',
            name: 'Omgjøringsprosent',
            nameLocation: 'middle',
            nameGap: 40,
            axisLabel: { formatter: '{value} %' },
          },
          series,
        }}
      />
    </div>
  );
};
