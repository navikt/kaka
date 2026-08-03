import type { AppTheme } from '@app/app-theme';
import { useAppTheme } from '@app/app-theme';
import { COMMON_BAR_CHART_PROPS } from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { BAR_WITHOUT_TEXT_HEIGHT, getBarChartHeight } from '@app/components/statistikk/charts/common/constants';
import type { MainReasonDataset } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/types';
import type { MainReasonV3Dataset } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/types';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { toPercent } from '@app/domain/number';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { type ReactNode, useMemo } from 'react';

type MainReasonDatasetCommon = MainReasonDataset | MainReasonV3Dataset;

interface Props {
  stats: MainReasonDatasetCommon[];
  title: string;
  helpText?: ReactNode;
  mainReasons: string[];
  braLabel: string;
  mangelfullLabel: string;
}

export const TotalMangelfullCommon = ({ stats, title, helpText, mainReasons, braLabel, mangelfullLabel }: Props) => {
  const theme = useAppTheme();
  const { values, labels } = useMemo(
    () => getTotalMangelfullDatasets(stats, mainReasons, braLabel, mangelfullLabel, theme),
    [stats, mainReasons, braLabel, mangelfullLabel, theme],
  );

  return (
    <EChart
      title={title}
      helpText={helpText}
      chartHeight={getBarChartHeight({ textInBar: false, barCount: values.length, xAxisLabel: false })}
      option={{
        ...COMMON_BAR_CHART_PROPS,
        tooltip: { show: false },
        yAxis: { type: 'category', data: labels },
        xAxis: { type: 'value', max: 1, axisLabel: { formatter: (value: number) => `${value * 100} %` } },
        series: [{ type: 'bar', data: values, barWidth: BAR_WITHOUT_TEXT_HEIGHT }],
      }}
    />
  );
};

const getTotalMangelfullDatasets = (
  stats: MainReasonDatasetCommon[],
  mainReasons: string[],
  braLabel: string,
  mangelfullLabel: string,
  theme: AppTheme,
) => {
  const bars = [
    ...stats.map(({ data, label }) => ({
      label: `${label} - ${braLabel}`,
      data,
      radiovalg: Radiovalg.BRA,
      color: getColorFromTheme(ColorToken.Success500, theme),
    })),
    ...stats.map(({ data, label }) => ({
      label: `${label} - ${mangelfullLabel}`,
      data,
      radiovalg: Radiovalg.MANGELFULLT,
      color: getColorFromTheme(ColorToken.Danger600, theme),
    })),
  ];

  const calculated = bars.map(({ data, radiovalg }) => {
    const mangelfulleSaker = data.filter((stat) => {
      const row = stat as unknown as Record<string, Radiovalg | undefined>;

      return mainReasons.some((reason) => row[reason] === Radiovalg.MANGELFULLT);
    }).length;
    const braNokSaker = data.length - mangelfulleSaker;

    const mangelfulleSakerPercent = data.length === 0 ? 0 : mangelfulleSaker / data.length;
    const braNokSakerPercent = data.length === 0 ? 0 : braNokSaker / data.length;

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

  return { values: values.toReversed(), labels: labels.toReversed() };
};
