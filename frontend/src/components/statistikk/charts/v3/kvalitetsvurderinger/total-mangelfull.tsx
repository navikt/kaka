import { MAIN_REASONS } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/data';
import { HorizontalBars } from '@app/components/statistikk/charts/common/horizontal-bars';
import type { MainReasonV3Dataset } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/types';
import { useColorMap } from '@app/components/statistikk/colors/get-color';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { toPercent } from '@app/domain/number';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import type { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
  stats: MainReasonV3Dataset[];
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

const useDataSets = (stats: MainReasonV3Dataset[]) => {
  const colorMap = useColorMap();

  const braBars = stats.flatMap(({ data, label }) => [
    { label: `${label} - Riktig / ikke kvalitetsavvik`, data, radiovalg: Radiovalg.BRA, color: ColorToken.Success500 },
  ]);

  const mangefullBars = stats.flatMap(({ data, label }) => [
    {
      label: `${label} - Mangelfullt/kvalitetsavvik`,
      data,
      radiovalg: Radiovalg.MANGELFULLT,
      color: ColorToken.Danger500,
    },
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

  const backgroundColor = bars.map(({ color }) => colorMap[color]);

  return {
    datasets: [{ data: calculatedData.map(({ percent }) => percent), backgroundColor, barThickness: BAR_THICKNESS }],
    labels,
  };
};
