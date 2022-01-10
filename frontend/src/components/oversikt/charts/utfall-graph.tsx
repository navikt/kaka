import { ChartOptions } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { isNotUndefined } from '../../../functions/is-not';
import { useKodeverkValue } from '../../../hooks/use-kodeverk-value';
import { useFilteredStatistics } from '../../../hooks/use-statistics';
import { UtfallEnum } from '../../../types/utfall';

const options: ChartOptions<'bar'> = {
  responsive: true,
  animation: {
    duration: 200,
    easing: 'easeOutQuart',
  },
  animations: {},
  scales: {
    y: {
      ticks: {
        callback: (value) => `${value} %`,
        font: {
          size: 14,
          family: '"Source Sans Pro", Arial, sans-serif',
        },
      },
      beginAtZero: true,
      bounds: 'ticks',
      min: 0,
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    x: {
      ticks: {
        font: {
          size: 16,
          family: '"Source Sans Pro", Arial, sans-serif',
        },
      },
      grid: {
        drawBorder: false,
        display: false,
      },
      stacked: true,
    },
  },
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
      labels: {
        font: {
          size: 16,
          family: '"Source Sans Pro", Arial, sans-serif',
        },
      },
    },
    title: {
      display: false,
      font: {
        size: 24,
        family: '"Source Sans Pro", Arial, sans-serif',
      },
    },
    tooltip: {
      callbacks: {
        label: ({ parsed, label }) => `${label}: ${parsed.y} %`,
      },
    },
  },
};

export const UtfallGraph = () => {
  const statistics = useFilteredStatistics();
  const utfall = useKodeverkValue('utfall');

  const completeStats = statistics.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null);

  const stats = new Map<UtfallEnum, number>(
    Object.values(UtfallEnum).map((id) => [id, completeStats.filter(({ utfallId }) => utfallId === id).length])
  );

  const keys = Array.from(stats.keys());
  const labels: string[] = keys.map((key) => utfall?.find(({ id }) => id === key)?.navn).filter(isNotUndefined);

  const backgroundColor: string[] = keys.map((key) => COLOR_MAP[key]);

  const values = Array.from(stats.values()).map((v) => Math.round((v * 100) / (statistics?.length ?? 1)));

  return (
    <>
      <h1>Utfall</h1>
      <Bar
        options={options}
        data={{
          labels,
          datasets: [
            {
              label: 'Utfall',
              data: values,
              backgroundColor,
              barPercentage: 0.95,
              categoryPercentage: 0.95,
            },
          ],
        }}
      />
    </>
  );
};

const COLOR_MAP = {
  [UtfallEnum.AVVIST]: '#7CDAF8',
  [UtfallEnum.DELVIS_MEDHOLD]: '#FFAA33',
  [UtfallEnum.MEDHOLD]: '#D05C4A',
  [UtfallEnum.OPPHEVET]: '#C1CB33',
  [UtfallEnum.RETUR]: '#3386E0',
  [UtfallEnum.STADFESTELSE]: '#33AA5F',
  [UtfallEnum.TRUKKET]: '#A0A0A0',
  [UtfallEnum.UGUNST]: '#8269A2',
};
