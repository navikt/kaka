import { useAppTheme } from '@app/app-theme';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import type { IFullStatisticVurderingV1 } from '@app/types/statistics/v1';
import type { ChartOptions } from 'chart.js';
import { useMemo } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { styled } from 'styled-components';
import type { ReasonLabel } from '../../../kvalitetsvurdering/kvalitetsskjema/v1/reasons-labels';
import type { StatisticsPropsV1 } from '../../types';
import { percent, tickCallback } from '../formatting';
import { ChartContainer, ChartTitle } from '../styled-components';
import { HelpTexts } from './help-texts';
import { MangelfulltOverTime } from './mangelfullt-over-time';

const useDoughnutOptions = (): ChartOptions<'doughnut'> => ({
  aspectRatio: 1.5,
  plugins: {
    legend: { align: 'center' },
    tooltip: { callbacks: { label: ({ label }) => label } },
  },
});

const useBarOptions = (_: string[], __: number[], total = 1): ChartOptions<'bar'> => ({
  responsive: true,
  aspectRatio: 4,
  indexAxis: 'y',
  scales: {
    y: { beginAtZero: true, bounds: 'ticks', min: 0 },
    x: {
      ticks: { callback: (value) => tickCallback(value, total), stepSize: total / 10 },
      stacked: true,
    },
  },
  plugins: {
    legend: { display: false, position: 'top' as const },
    title: { display: false },
    tooltip: {
      callbacks: {
        label: ({ parsed: { x }, label }) => `${label}:  ${x === null ? 'Ukjent' : percent(x, total)}`,
      },
    },
  },
});

export interface KvalitetsvurderingProps extends StatisticsPropsV1 {
  field: keyof Pick<
    IFullStatisticVurderingV1,
    'utredningenRadioValg' | 'klageforberedelsenRadioValg' | 'vedtaketRadioValg' | 'brukAvRaadgivendeLegeRadioValg'
  >;
  title: string;
  relevantReasons: ReasonLabel[];
}

export const Kvalitetsvurdering = ({ field, title, relevantReasons, stats }: KvalitetsvurderingProps) => {
  const mangelfulleSaker = useMemo(() => stats.filter((stat) => stat[field] === Radiovalg.MANGELFULLT), [stats, field]);
  const braNokSaker = useMemo(() => stats.filter((stat) => stat[field] === Radiovalg.BRA), [stats, field]);
  const theme = useAppTheme();

  const numberOfMangelfulleSaker = mangelfulleSaker.length;

  const totalAmountSaker = numberOfMangelfulleSaker + braNokSaker.length;

  const doughnutData: [number, number] = [braNokSaker.length, numberOfMangelfulleSaker];

  const doughnutLabels = [
    `Bra / godt nok: ${percent(braNokSaker.length, totalAmountSaker)}`,
    `Mangelfullt: ${percent(numberOfMangelfulleSaker, totalAmountSaker)}`,
  ];
  const barLabels = relevantReasons.map(({ label }) => label);
  const barData: number[] = relevantReasons.map(
    ({ id }) => mangelfulleSaker.filter((stat) => stat[id] === true).length,
  );

  const doughnutOptions = useDoughnutOptions();

  return (
    <Container>
      <CategoryContainer>
        <ChartContainer $columns={1}>
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
                  backgroundColor: [
                    getColorFromTheme(ColorToken.Success500, theme),
                    getColorFromTheme(ColorToken.Danger600, theme),
                  ],
                },
              ],
            }}
          />
        </ChartContainer>

        <ChartContainer $columns={3}>
          <ChartTitle>Kvalitetsavviket i {title.toLowerCase()}</ChartTitle>
          <KvalitetsavvikChart
            barLabels={barLabels}
            barData={barData}
            numberOfMangelfulleSaker={numberOfMangelfulleSaker}
          />
        </ChartContainer>
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
  const theme = useAppTheme();

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
            backgroundColor: getColorFromTheme(ColorToken.Danger500, theme),
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
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 100%;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
