import { useAppTheme } from '@app/app-theme';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { isNotUndefined } from '@app/functions/is-not';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import type { IKvalitetsvurderingBooleans } from '@app/types/kvalitetsvurdering/v1';
import type { IStatisticVurderingV1, RadiovalgField } from '@app/types/statistics/v1';
import type { ChartOptions, TooltipCallbacks } from 'chart.js';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { getReasonLabel, type ReasonLabel } from '../../../kvalitetsvurdering/kvalitetsskjema/v1/reasons-labels';
import { useKvalitetsvurderingParam } from '../../hooks/use-kvalitetsvurdering-param';
import type { StatisticsPropsV1 } from '../../types';
import { KVALITETSVURDERING_OPTIONS } from './kvalitetsvurdering-options';

type TooltipCallback = TooltipCallbacks<'line'>['label'];

const useOptions = (tooltipCallback?: TooltipCallback): ChartOptions<'line'> => ({
  aspectRatio: 5,
  scales: {
    y: {
      min: 0,
      max: 100,
      title: { display: true, text: 'Antall' },
      ticks: {
        callback: (label) => `${label} %`,
        stepSize: 1,
      },
    },
  },
  plugins: {
    tooltip: { callbacks: { label: tooltipCallback } },
    legend: { position: 'left', maxWidth: 500 },
  },
});

const COLLATOR = new Intl.Collator(undefined, { numeric: true });

export const MangelfulltOverTime = ({ stats }: StatisticsPropsV1) => {
  const [field] = useKvalitetsvurderingParam();
  const theme = useAppTheme();

  const { relevantReasons } = KVALITETSVURDERING_OPTIONS[field];

  const mangelfulleSaker = useMangelfulleSaker(stats, field, relevantReasons);
  const mangelfulleSakerArray = useMemo(() => Array.from(mangelfulleSaker.values()), [mangelfulleSaker]);

  const tooltipCallback: TooltipCallback = ({ parsed: { y }, dataIndex, datasetIndex, label }) => {
    const data = mangelfulleSakerArray[dataIndex];

    if (y === null) {
      return `${label}: Ukjent`;
    }

    if (typeof data === 'undefined') {
      return `${label}: ${y}%`;
    }

    const dataSet = Array.from(data.entries())[datasetIndex];

    if (typeof dataSet === 'undefined') {
      return `${label}: ${y}%`;
    }

    const [reasonId, { quantity }] = dataSet;
    const reasonName = getReasonLabel(reasonId);

    return `${reasonName}: ${Math.round(y * 100) / 100} % (${quantity})`;
  };

  const options = useOptions(tooltipCallback);

  const labels = Array.from(mangelfulleSaker.keys());
  const datasets = useMemo(
    () => [
      ...relevantReasons.map(({ id, label }, i) => {
        const color = getColorFromTheme(getColor(i) ?? ColorToken.Beige500, theme);

        return {
          label,
          data: Array.from(mangelfulleSaker.values())
            .map((dataValues) => dataValues.get(id)?.percentage)
            .filter(isNotUndefined),
          backgroundColor: color,
          borderColor: color,
          borderWidth: 2,
        };
      }),
    ],
    [relevantReasons, mangelfulleSaker, theme],
  );

  return <Line options={options} data={{ datasets, labels }} />;
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
