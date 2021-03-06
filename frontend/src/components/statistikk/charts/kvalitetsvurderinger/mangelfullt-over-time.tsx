import { ChartOptions, TooltipItem, TooltipModel } from 'chart.js';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { isNotUndefined } from '../../../../functions/is-not';
import { IKvalitetsvurderingBooleans } from '../../../../types/kvalitetsvurdering';
import { RadioValg } from '../../../../types/radio';
import { IStatisticVurdering } from '../../../../types/statistics';
import { ReasonLabel, getReasonLabel } from '../../../kvalitetsvurdering/kvalitetsskjema/reasons-labels';
import { useKvalitetsvurderingParam } from '../../hooks/use-kvalitetsvurdering-param';
import { StatisticsProps } from '../../types';
import { KVALITETSVURDERING_OPTIONS } from './kvalitetsvurdering-options';

type TooltipCallback =
  | ((this: TooltipModel<'line'>, tooltipItem: TooltipItem<'line'>) => string | string[])
  | undefined;

const useOptions = (tooltipCallback?: TooltipCallback): ChartOptions<'line'> => ({
  responsive: true,
  aspectRatio: 5,
  scales: {
    y: {
      min: 0,
      max: 100,
      title: {
        display: true,
        text: 'Antall',
        font: {
          weight: 'bold',
          size: 14,
        },
      },
      ticks: {
        callback: (label) => `${label} %`,
        stepSize: 1,
        font: {
          size: 14,
        },
      },
    },
    x: {
      ticks: {
        font: {
          size: 14,
        },
      },
    },
  },
  elements: {
    line: {
      tension: 0.3,
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: tooltipCallback,
      },
    },
    legend: {
      position: 'left',
      maxWidth: 500,
      labels: {
        font: { size: 13 },
      },
    },
  },
});

const COLLATOR = new Intl.Collator(undefined, { numeric: true });

export const MangelfulltOverTime = ({ stats }: StatisticsProps) => {
  const [field] = useKvalitetsvurderingParam();

  const { relevantReasons } = KVALITETSVURDERING_OPTIONS[field];

  const mangelfulleSaker = useMangelfulleSaker(stats, field, relevantReasons);
  const mangelfulleSakerArray = useMemo(() => Array.from(mangelfulleSaker.values()), [mangelfulleSaker]);

  const tooltipCallback: TooltipCallback = ({ parsed, dataIndex, datasetIndex }) => {
    const data = mangelfulleSakerArray[dataIndex];
    const [reasonId, { quantity }] = Array.from(data.entries())[datasetIndex];
    const reasonName = getReasonLabel(reasonId);

    return `${reasonName}: ${Math.round(parsed.y * 100) / 100} % (${quantity})`;
  };

  const options = useOptions(tooltipCallback);

  const labels = Array.from(mangelfulleSaker.keys());
  const datasets = useMemo(
    () => [
      ...relevantReasons.map(({ id, label }, i) => ({
        label,
        data: Array.from(mangelfulleSaker.values())
          .map((dataValues) => dataValues.get(id)?.percentage)
          .filter(isNotUndefined),
        backgroundColor: getColor(i),
        borderColor: getColor(i),
        borderWidth: 2,
      })),
    ],
    [relevantReasons, mangelfulleSaker]
  );

  return <Line options={options} data={{ datasets, labels }} />;
};

const COLORS = ['#7CDAF8', '#FFAA33', '#C1CB33', '#3386E0', '#33AA5F', '#A0A0A0', '#8269A2'];
const getColor = (index: number) => COLORS[index % COLORS.length];

const useMangelfulleSaker = (stats: IStatisticVurdering[], field: string, relevantReasons: ReasonLabel[]) => {
  const mangelfulleSaker = useMemo(() => {
    const unsorted = stats
      .filter(
        ({ avsluttetAvSaksbehandler, ...stat }) =>
          avsluttetAvSaksbehandler !== null && stat[field] === RadioValg.MANGELFULLT
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

    sorted.forEach((period) => {
      const periodTotal = Array.from(period.values()).reduce((acc, stat) => acc + stat.quantity, 0);

      if (periodTotal === 0) {
        return;
      }

      period.forEach((_, key) => {
        const stat = period.get(key);

        if (typeof stat !== 'undefined') {
          period.set(key, { ...stat, percentage: (stat.quantity / periodTotal) * 100 });
        }
      });
    });

    return sorted;
  }, [stats, field, relevantReasons]);

  return mangelfulleSaker;
};
