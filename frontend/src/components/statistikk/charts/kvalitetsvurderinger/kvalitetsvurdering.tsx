import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';
import { RadioValg } from '../../../../types/radio';
import { IFullStatisticVurdering } from '../../../../types/statistics';
import { ReasonLabel } from '../../../kvalitetsvurdering/kvalitetsskjema/reasons-labels';
import { StatisticsProps } from '../../types';
import { GRAPH_COLOR } from '../colors';
import { percent, tickCallback } from '../formatting';
import { ChartContainer, ChartTitle, QuarterChartContainer, ThreeQuarterChartContainer } from '../styled-components';
import { HelpTexts } from './help-texts';
import { MangelfulltOverTime } from './mangelfullt-over-time';

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
      labels: {
        font: { size: 13 },
      },
    },
    tooltip: {
      callbacks: {
        label: ({ label }) => label,
      },
    },
  },
});

const useBarOptions = (labels: string[], data: number[], total = 1): ChartOptions<'bar'> => ({
  elements: {
    bar: {
      borderRadius: 4,
    },
  },
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

export interface KvalitetsvurderingProps extends StatisticsProps {
  field: keyof Pick<
    IFullStatisticVurdering,
    'utredningenRadioValg' | 'klageforberedelsenRadioValg' | 'vedtaketRadioValg' | 'brukAvRaadgivendeLegeRadioValg'
  >;
  title: string;
  relevantReasons: ReasonLabel[];
}

export const Kvalitetsvurdering = ({ field, title, relevantReasons, stats }: KvalitetsvurderingProps) => {
  const mangelfulleSaker = useMemo(() => stats.filter((stat) => stat[field] === RadioValg.MANGELFULLT), [stats, field]);
  const braNokSaker = useMemo(() => stats.filter((stat) => stat[field] === RadioValg.BRA), [stats, field]);

  const numberOfMangelfulleSaker = mangelfulleSaker.length;

  const totalAmountSaker = numberOfMangelfulleSaker + braNokSaker.length;

  const doughnutData: [number, number] = [braNokSaker.length, numberOfMangelfulleSaker];

  const doughnutLabels = [
    `Bra / godt nok: ${percent(braNokSaker.length, totalAmountSaker)}`,
    `Mangelfullt: ${percent(numberOfMangelfulleSaker, totalAmountSaker)}`,
  ];
  const barLabels = relevantReasons.map(({ label }) => label);
  const barData: number[] = relevantReasons.map(
    ({ id }) => mangelfulleSaker.filter((stat) => stat[id] === true).length
  );

  const doughnutOptions = useDoughnutOptions();

  return (
    <Container>
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
                  backgroundColor: [GRAPH_COLOR.BLUE, GRAPH_COLOR.RED],
                },
              ],
            }}
          />
        </QuarterChartContainer>
        <ThreeQuarterChartContainer>
          <ChartTitle>Kvalitetsavviket i {title.toLowerCase()}</ChartTitle>
          <KvalitetsavvikChart
            barLabels={barLabels}
            barData={barData}
            numberOfMangelfulleSaker={numberOfMangelfulleSaker}
          />
        </ThreeQuarterChartContainer>
      </CategoryContainer>
      <ChartContainer>
        <ChartTitle>Kvalitetsavviket i {title.toLowerCase()} per måned</ChartTitle>
        <MangelfulltOverTime stats={stats} />
      </ChartContainer>

      <HelpTexts relevantReasons={relevantReasons} />
    </Container>
  );
};

interface KvalitetsavvikChartProps {
  barLabels: string[];
  barData: number[];
  numberOfMangelfulleSaker: number;
}

const KvalitetsavvikChart = ({ barLabels, barData, numberOfMangelfulleSaker }: KvalitetsavvikChartProps) => {
  const barOptions = useBarOptions(barLabels, barData, numberOfMangelfulleSaker);

  if (barData.length === 0 || barData.every((value) => value === 0)) {
    return <TextChart>Ingen data</TextChart>;
  }

  return (
    <Bar
      options={barOptions}
      data={{
        labels: barLabels,
        datasets: [
          {
            data: barData,
            backgroundColor: GRAPH_COLOR.RED,
            barPercentage: 0.95,
            categoryPercentage: 0.95,
          },
        ],
      }}
    />
  );
};

const TextChart = styled.span`
  display: flex;
  width: 100%;
  height: 100%;
  font-size: 16px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  border: 1px solid #e6e6e6;
`;

const Container = styled.section`
  width: 100%;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
