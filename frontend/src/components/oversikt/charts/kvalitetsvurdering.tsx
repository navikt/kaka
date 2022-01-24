import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
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
  aspectRatio: 1.5,
  animation: {
    duration: 200,
    easing: 'easeOutQuart',
  },
  plugins: {
    legend: {
      align: 'center',
    },
  },
});

const useBarOptions = (labels: string[], data: number[], total = 1): ChartOptions<'bar'> => ({
  responsive: true,
  aspectRatio: 4,
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
        stepSize: total / 10,
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
  const mangelfulleSaker = useMemo(() => stats.filter((stat) => stat[field] === RadioValg.MANGELFULLT), [stats, field]);
  const braNokSaker = useMemo(() => stats.filter((stat) => stat[field] === RadioValg.BRA), [stats, field]);

  const numberOfMangelfulleSaker = mangelfulleSaker.length;

  const doughnutData: [number, number] = [braNokSaker.length, numberOfMangelfulleSaker];

  const doughnutLabels = ['Bra / godt nok', 'Mangelfullt'];
  const barLabels = relevantReasons.map((reasonId) => REASON_NAMES[reasonId]);
  const barData: number[] = relevantReasons.map(
    (reasonId) => mangelfulleSaker.filter((stat) => stat[reasonId] === true).length
  );

  const doughnutOptions = useDoughnutOptions();
  const barOptions = useBarOptions(barLabels, barData, numberOfMangelfulleSaker);

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
