import { ChartOptions } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { MAIN_REASONS } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { HorizontalBars } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/horizontal-bars';
import { MainReasonDataset } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/types';
import { toPercent } from '@app/domain/number';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { GRAPH_COLOR } from '../../colors';

const BAR_THICKNESS = 50;

const useOptions = (): ChartOptions<'bar'> => ({
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  maintainAspectRatio: false,
  indexAxis: 'y',
  scales: {
    x: {
      beginAtZero: true,
      max: 1,
      ticks: { callback: (label) => (typeof label === 'number' ? `${label * 100} %` : label) },
    },
  },
});

interface Props {
  stats: MainReasonDataset[];
}

export const TotalMangelfull = ({ stats }: Props) => {
  const data = useDataSets(stats);
  const options = useOptions();

  return (
    <HorizontalBars barCount={data.labels.length} chartOptions={options} barThickness={BAR_THICKNESS}>
      <Bar data={data} options={options} />
    </HorizontalBars>
  );
};

const useDataSets = (stats: MainReasonDataset[]) => {
  const braBars = stats.flatMap(({ data, label }) => [
    { label: `${label} - Bra / godt nok`, data, radiovalg: Radiovalg.BRA, color: GRAPH_COLOR.DEEP_BLUE },
  ]);

  const mangefullBars = stats.flatMap(({ data, label }) => [
    { label: `${label} - Mangelfullt`, data, radiovalg: Radiovalg.MANGELFULLT, color: GRAPH_COLOR.PURPLE },
  ]);

  const bars = [...braBars, ...mangefullBars];

  const calculatedData = bars.map(({ data, radiovalg }) => {
    const mangelfulleSaker = data.filter((stat) => MAIN_REASONS.some((r) => stat[r] === Radiovalg.MANGELFULLT)).length;
    const braNokSaker = data.length - mangelfulleSaker;

    const mangelfulleSakerPercent = mangelfulleSaker / data.length;
    const braNokSakerPercent = braNokSaker / data.length;

    return radiovalg === Radiovalg.MANGELFULLT
      ? { percent: mangelfulleSakerPercent, count: mangelfulleSaker, length: data.length }
      : { percent: braNokSakerPercent, count: braNokSaker, length: data.length };
  });

  const labels = bars.map(({ label }, index) => {
    const data = calculatedData[index];
    const count = data?.count ?? 0;
    const percent = toPercent(data?.percent ?? 0);
    const length = data?.length ?? 0;
    const unit = length === 1 ? 'sak' : 'saker';

    return `${label} (${percent} | ${count} av ${length} ${unit})`;
  });

  const backgroundColor = bars.map(({ color }) => color);

  return {
    datasets: [{ data: calculatedData.map(({ percent }) => percent), backgroundColor, barThickness: BAR_THICKNESS }],
    labels,
  };
};
