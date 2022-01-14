import { ChartOptions } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useFilteredFinishedStatistics } from '../../../hooks/use-statistics';
import { RadioValg } from '../../../types/radio';
import { IStatisticVurdering } from '../../../types/statistics';
import { ChartTitle, QuarterChartContainer } from './styled-components';

const useOptions = (): ChartOptions<'doughnut'> => ({
  responsive: true,
  animation: {
    duration: 200,
    easing: 'easeOutQuart',
  },
});

export const Kvalitetsvurderinger = () => (
  <>
    <Kvalitetsvurdering field="klageforberedelsenRadioValg" title="Klageforberedelsen" />
    <Kvalitetsvurdering field="utredningenRadioValg" title="Utredningen" />
    <Kvalitetsvurdering field="brukAvRaadgivendeLegeRadioValg" title="Bruk av rådgivende lege" />
    <Kvalitetsvurdering field="vedtaketRadioValg" title="Vedtaket" />
  </>
);

interface Props {
  field: keyof Pick<
    IStatisticVurdering,
    'utredningenRadioValg' | 'klageforberedelsenRadioValg' | 'vedtaketRadioValg' | 'brukAvRaadgivendeLegeRadioValg'
  >;
  title: string;
}

const Kvalitetsvurdering = ({ field, title }: Props) => {
  const stats = useFilteredFinishedStatistics();

  const data = stats.reduce<[number, number]>(
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

  const labels = ['Bra / godt nok', 'Mangelfullt'];

  const options = useOptions();

  return (
    <QuarterChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <Doughnut
        options={options}
        data={{
          labels,
          datasets: [
            {
              hoverOffset: 4,
              data,
              backgroundColor: ['#3386E0', '#D05C4A'],
            },
          ],
        }}
      />
    </QuarterChartContainer>
  );
};
