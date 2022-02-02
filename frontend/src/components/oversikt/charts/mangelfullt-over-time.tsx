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

export const MangelfulltOverTime = ({ stats: allStats }: StatisticsProps) => {
  const [field] = useKvalitetsvurderingParam();
  const stats = useMemo(
    () => allStats.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null),
    [allStats]
  );

  const mangelfulleSaker = useMemo(() => stats.filter((stat) => stat[field] === RadioValg.MANGELFULLT), [stats, field]);
  const options = useOptions();
  const { relevantReasons } = KVALITETSVURDERING_OPTIONS[field];

  const yearMonthSort = (yearAndMonth1: string, yearAndMonth2: string) => {
    const [year1, month1] = yearAndMonth1.split('-').map((n) => parseInt(n, 10));
    const [year2, month2] = yearAndMonth2.split('-').map((n) => parseInt(n, 10));

    if (year1 < year2) {
      return -1;
    }

    if (year1 > year2) {
      return 1;
    }

    if (month1 < month2) {
      return -1;
    }

    if (month1 > month2) {
      return 1;
    }

    return 0;
  };

  const data = useMemo(() => {
    const unsortedData = mangelfulleSaker.reduce((acc, sak) => {
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

    return new Map(
      [...unsortedData].sort((yearAndMonth1, yearAndMonth2) => yearMonthSort(yearAndMonth1[0], yearAndMonth2[0]))
    );
  }, [mangelfulleSaker, relevantReasons]);

  const labels = Array.from(data.keys());
  const datasets = useMemo(
    () => [
      ...relevantReasons.map((reasonId, i) => ({
        label: isReasonNameKey(reasonId) ? REASON_NAMES[reasonId] : reasonId,
        data: Array.from(data.values()).map((dataValues) => dataValues.get(reasonId)),
        backgroundColor: getColor(i),
        borderColor: getColor(i),
        borderWidth: 2,
      })),
      {
        label: 'Totalt',
        data: Array.from(data.values()).map((singleStats) =>
          Array.from(singleStats.values()).reduce((acc, stat) => acc + stat, 0)
        ),
        backgroundColor: '#D05C4A',
        borderColor: '#D05C4A',
        borderWidth: 2,
      },
    ],
    [relevantReasons, data]
  );

  return <Line options={options} data={{ datasets, labels }} />;
};

const COLORS = ['#7CDAF8', '#FFAA33', '#C1CB33', '#3386E0', '#33AA5F', '#A0A0A0', '#8269A2'];
const getColor = (index: number) => COLORS[index % COLORS.length];
