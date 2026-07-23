import { COMMON_BAR_CHART_PROPS } from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { MAIN_REASONS } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import type { MainReasonDataset } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/types';
import { useColorMap } from '@app/components/statistikk/colors/get-color';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { toPercent } from '@app/domain/number';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import type { ReactNode } from 'react';

interface Props {
  stats: MainReasonDataset[];
  title: string;
  helpText?: ReactNode;
}

export const TotalMangelfull = ({ stats, title, helpText }: Props) => {
  const { values, labels } = useData(stats);

  return (
    <div className="h-75">
      <EChart
        title={title}
        helpText={helpText}
        option={{
          ...COMMON_BAR_CHART_PROPS,
          tooltip: { show: false },
          yAxis: { type: 'category', data: labels },
          xAxis: { type: 'value', max: 1, axisLabel: { formatter: (value: number) => `${value * 100} %` } },
          series: [{ type: 'bar', data: values }],
        }}
      />
    </div>
  );
};

const useData = (stats: MainReasonDataset[]) => {
  const colorMap = useColorMap();

  const bars = [
    ...stats.map(({ data, label }) => ({
      label: `${label} - Bra / godt nok`,
      data,
      radiovalg: Radiovalg.BRA,
      color: colorMap[ColorToken.Success500],
    })),
    ...stats.map(({ data, label }) => ({
      label: `${label} - Mangelfullt`,
      data,
      radiovalg: Radiovalg.MANGELFULLT,
      color: colorMap[ColorToken.Danger600],
    })),
  ];

  const calculated = bars.map(({ data, radiovalg }) => {
    const mangelfulleSaker = data.filter((stat) => MAIN_REASONS.some((r) => stat[r] === Radiovalg.MANGELFULLT)).length;
    const braNokSaker = data.length - mangelfulleSaker;

    const mangelfulleSakerPercent = mangelfulleSaker / data.length;
    const braNokSakerPercent = braNokSaker / data.length;

    return radiovalg === Radiovalg.MANGELFULLT
      ? { percent: mangelfulleSakerPercent, count: mangelfulleSaker, length: data.length }
      : { percent: braNokSakerPercent, count: braNokSaker, length: data.length };
  });

  const labels = bars.map(({ label }, index) => {
    const { count = 0, percent = 0, length = 0 } = calculated[index] ?? {};
    const unit = length === 1 ? 'sak' : 'saker';

    return `${label} (${toPercent(percent)} | ${count} av ${length} ${unit})`;
  });

  const values = bars.map(({ color }, index) => ({
    value: calculated[index]?.percent ?? 0,
    itemStyle: { color },
  }));

  // Echarts renders category axis items bottom-to-top, so reverse here to get the expected top-to-bottom order.
  return { values: values.toReversed(), labels: labels.toReversed() };
};
