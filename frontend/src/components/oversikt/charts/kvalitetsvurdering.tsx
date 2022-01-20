import { ChartOptions } from 'chart.js';
import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';
import { REASON_NAMES } from '../../../hooks/use-reason-name';
import { RadioValg } from '../../../types/radio';
import { IStatisticVurdering } from '../../../types/statistics';
import { useFilteredFinishedStatistics } from '../hooks/use-statistics';
import { percent, tickCallback, truncateLabel } from './formatting';
import { ChartTitle, QuarterChartContainer, ThreeQuarterChartContainer } from './styled-components';

const useDoughnutOptions = (): ChartOptions<'doughnut'> => ({
  responsive: true,
  animation: {
    duration: 200,
    easing: 'easeOutQuart',
  },
  plugins: {
    legend: {
      align: 'start',
    },
  },
});

const useBarOptions = (labels: string[], data: number[], total = 1): ChartOptions<'bar'> => ({
  responsive: true,
  animation: {
    duration: 200,
    easing: 'easeOutQuart',
  },
  indexAxis: 'y',
  scales: {
    y: {
      ticks: {
        callback: (value) => truncateLabel(labels[value]),
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
        callback: (value) => tickCallback(value, total),
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
    },
    tooltip: {
      callbacks: {
        label: ({ parsed, label }) => `${label}: ${percent(parsed.x, total)}`,
      },
    },
  },
});

export interface KvalitetsvurderingProps {
  field: keyof Pick<
    IStatisticVurdering,
    'utredningenRadioValg' | 'klageforberedelsenRadioValg' | 'vedtaketRadioValg' | 'brukAvRaadgivendeLegeRadioValg'
  >;
  title: string;
  relevantReasons: string[];
}

export const Kvalitetsvurdering = ({ field, title, relevantReasons }: KvalitetsvurderingProps) => {
  const stats = useFilteredFinishedStatistics();

  const doughnutData = stats.reduce<[number, number]>(
    (acc, stat) => {
      if (stat[field] === RadioValg.BRA) {
        return [acc[0] + 1, acc[1]];
      }

      if (stat[field] === RadioValg.MANGELFULLT) {
        return [acc[0], acc[1] + 1];
      }

      return acc;
    },
    [0, 0]
  );

  const doughnutLabels = ['Bra / godt nok', 'Mangelfullt'];
  const barLabels = relevantReasons?.map((reasonId) => REASON_NAMES[reasonId]) ?? [];
  const barData: number[] = [];

  const doughnutOptions = useDoughnutOptions();
  const barOptions = useBarOptions(barLabels, barData, stats.length);

  if (typeof relevantReasons !== 'undefined') {
    relevantReasons.forEach((reasonId) => {
      barData.push(stats.filter((stat) => stat[reasonId] === true).length);
    });
  }

  return (
    <CategoryContainer>
      <QuarterChartContainer>
        <ChartTitle>{title}</ChartTitle>
        <Doughnut
          options={doughnutOptions}
          data={{
            labels: doughnutLabels,
            datasets: [
              {
                label: 'Kvalitetsavviket i vedtaket',
                hoverOffset: 4,
                data: doughnutData,
                backgroundColor: ['#3386E0', '#D05C4A'],
              },
            ],
          }}
        />
      </QuarterChartContainer>
      <ThreeQuarterChartContainer>
        <ChartTitle>Kvalitetsavviket i {title.toLowerCase()}</ChartTitle>
        <Bar
          options={barOptions}
          data={{
            labels: barLabels,
            datasets: [
              {
                data: barData,
                backgroundColor: '#D05C4A',
                barPercentage: 0.95,
                categoryPercentage: 0.95,
              },
            ],
          }}
        />
      </ThreeQuarterChartContainer>
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
