import { useAppTheme } from '@app/app-theme';
import { EChart } from '@app/components/echarts/echarts';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import type { IKvalitetsvurderingBooleans } from '@app/types/kvalitetsvurdering/v1';
import type { IStatisticVurderingV1, RadiovalgField } from '@app/types/statistics/v1';
import type { CallbackDataParams } from 'echarts/types/src/util/types.js';
import { useMemo } from 'react';
import type { ReasonLabel } from '../../../kvalitetsvurdering/kvalitetsskjema/v1/reasons-labels';
import { useKvalitetsvurderingParam } from '../../hooks/use-kvalitetsvurdering-param';
import type { StatisticsPropsV1 } from '../../types';
import { KVALITETSVURDERING_OPTIONS } from './kvalitetsvurdering-options';

const COLLATOR = new Intl.Collator(undefined, { numeric: true });

interface Props extends StatisticsPropsV1 {
  title: string;
}

export const MangelfulltOverTime = ({ stats, title }: Props) => {
  const [field] = useKvalitetsvurderingParam();
  const theme = useAppTheme();

  const { relevantReasons } = KVALITETSVURDERING_OPTIONS[field];

  const mangelfulleSaker = useMangelfulleSaker(stats, field, relevantReasons);

  const { labels, series, datasets } = useMemo(() => {
    const labels = Array.from(mangelfulleSaker.keys());
    const periods = Array.from(mangelfulleSaker.values());

    const datasets = relevantReasons.map(({ id, label }, i) => {
      const color = getColorFromTheme(getColor(i) ?? ColorToken.Beige500, theme);

      return {
        name: label,
        data: periods.map((period) => period.get(id)?.percentage ?? null),
        quantities: periods.map((period) => period.get(id)?.quantity ?? 0),
        color,
      };
    });

    const series = datasets.map(({ name, data, color }) => ({
      name,
      type: 'line' as const,
      smooth: true,
      connectNulls: true,
      data,
      itemStyle: { color },
      lineStyle: { color, width: 2 },
    }));

    return { labels, series, datasets };
  }, [mangelfulleSaker, relevantReasons, theme]);

  return (
    <div className="h-100">
      <EChart
        title={title}
        option={{
          grid: { left: 280 },
          legend: { orient: 'vertical', left: 0, top: 'middle', textStyle: { width: 240, overflow: 'break' } },
          tooltip: {
            trigger: 'axis',
            formatter: (paramsInput: CallbackDataParams | CallbackDataParams[]) => {
              const list = Array.isArray(paramsInput) ? paramsInput : [paramsInput];

              return list
                .map((param) => {
                  const value = typeof param.value === 'number' ? param.value : null;

                  if (value === null) {
                    return `${param.marker ?? ''}${param.seriesName ?? 'Ukjent'}: Ukjent`;
                  }

                  const quantity = datasets[param.seriesIndex ?? -1]?.quantities[param.dataIndex ?? -1] ?? 0;

                  return `${param.marker ?? ''}${param.seriesName ?? 'Ukjent'}: ${Math.round(value * 100) / 100} % (${quantity})`;
                })
                .join('<br/>');
            },
          },
          xAxis: { type: 'category', data: labels },
          yAxis: { type: 'value', min: 0, max: 100, axisLabel: { formatter: '{value} %' } },
          series,
        }}
      />
    </div>
  );
};

const COLORS = [
  ColorToken.Accent500,
  ColorToken.Warning500,
  ColorToken.Lime500,
  ColorToken.Info500,
  ColorToken.Success500,
  ColorToken.Neutral500,
  ColorToken.Purple500,
];
const getColor = (index: number) => COLORS[index % COLORS.length];

const useMangelfulleSaker = (stats: IStatisticVurderingV1[], field: RadiovalgField, relevantReasons: ReasonLabel[]) => {
  const mangelfulleSaker = useMemo(() => {
    const unsorted = stats
      .filter(
        ({ avsluttetAvSaksbehandler, ...stat }) =>
          avsluttetAvSaksbehandler !== null && stat[field] === Radiovalg.MANGELFULLT,
      )
      .reduce((acc, sak) => {
        const { month, year } = sak.avsluttetAvSaksbehandler;
        const key = `${year}-${month}`;
        const existing = acc.get(key);

        if (typeof existing === 'undefined') {
          const reasonStats = relevantReasons.reduce((singleStat, { id: reasonId }) => {
            const quantity = sak[reasonId] === true ? 1 : 0;

            singleStat.set(reasonId, { quantity, percentage: 0 });

            return singleStat;
          }, new Map<keyof IKvalitetsvurderingBooleans, { quantity: number; percentage: number }>());

          acc.set(key, reasonStats);
        } else {
          const reasonStats = relevantReasons.reduce((singleStat, { id: reasonId }) => {
            const increment = sak[reasonId] === true ? 1 : 0;
            const oldValue = singleStat.get(reasonId)?.quantity ?? 0;

            singleStat.set(reasonId, { quantity: oldValue + increment, percentage: 0 });

            return singleStat;
          }, existing);

          acc.set(key, reasonStats);
        }

        return acc;
      }, new Map<string, Map<keyof IKvalitetsvurderingBooleans, { quantity: number; percentage: number }>>());

    const sorted = new Map([...unsorted.entries()].sort(([aKey], [bKey]) => COLLATOR.compare(aKey, bKey)));

    for (const period of sorted) {
      const periodTotal = Array.from(period[1].values()).reduce((acc, stat) => acc + stat.quantity, 0);

      if (periodTotal === 0) {
        continue;
      }

      for (const [key, stat] of period[1]) {
        if (typeof stat !== 'undefined') {
          period[1].set(key, { ...stat, percentage: (stat.quantity / periodTotal) * 100 });
        }
      }
    }

    return sorted;
  }, [stats, field, relevantReasons]);

  return mangelfulleSaker;
};
