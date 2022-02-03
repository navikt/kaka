import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { REASON_NAMES, isReasonNameKey } from '../../../hooks/use-reason-name';
import { RadioValg } from '../../../types/radio';
import { useKvalitetsvurderingParam } from '../hooks/use-kvalitetsvurdering-param';
import { StatisticsProps } from '../types';
import { KVALITETSVURDERING_OPTIONS } from './kvalitetsvurdering-options';

const useOptions = (): ChartOptions<'line'> => ({
  responsive: true,
  aspectRatio: 5,
  scales: {
    y: {
      title: {
        display: true,
        text: 'Antall',
        font: {
          weight: 'bold',
          size: 14,
        },
      },
      ticks: {
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
          const reasonStats = relevantReasons.reduce((singleStat, reasonId) => {
            const value = sak[reasonId] === true ? 1 : 0;

            singleStat.set(reasonId, value);

            return singleStat;
          }, new Map<typeof relevantReasons[number], number>());

          acc.set(key, reasonStats);
        } else {
          const reasonStats = relevantReasons.reduce((singleStat, reasonId) => {
            const increment = sak[reasonId] === true ? 1 : 0;
            const oldValue = singleStat.get(reasonId) ?? 0;

            singleStat.set(reasonId, oldValue + increment);

            return singleStat;
          }, existing);

          acc.set(key, reasonStats);
        }

        return acc;
      }, new Map<string, Map<typeof relevantReasons[number], number>>());

    return new Map([...unsorted.entries()].sort(([aKey], [bKey]) => COLLATOR.compare(aKey, bKey)));
  }, [stats, field, relevantReasons]);

  const options = useOptions();

  const labels = Array.from(mangelfulleSaker.keys());
  const datasets = useMemo(
    () => [
      ...relevantReasons.map((reasonId, i) => ({
        label: isReasonNameKey(reasonId) ? REASON_NAMES[reasonId] : reasonId,
        data: Array.from(mangelfulleSaker.values()).map((dataValues) => dataValues.get(reasonId)),
        backgroundColor: getColor(i),
        borderColor: getColor(i),
        borderWidth: 2,
      })),
      {
        label: 'Totalt',
        data: Array.from(mangelfulleSaker.values()).map((singleStats) =>
          Array.from(singleStats.values()).reduce((acc, stat) => acc + stat, 0)
        ),
        backgroundColor: '#D05C4A',
        borderColor: '#D05C4A',
        borderWidth: 2,
      },
    ],
    [relevantReasons, mangelfulleSaker]
  );

  return <Line options={options} data={{ datasets, labels }} />;
};

const COLORS = ['#7CDAF8', '#FFAA33', '#C1CB33', '#3386E0', '#33AA5F', '#A0A0A0', '#8269A2'];
const getColor = (index: number) => COLORS[index % COLORS.length];
