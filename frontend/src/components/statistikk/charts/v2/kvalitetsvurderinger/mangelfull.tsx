import type { AppTheme } from '@app/app-theme';
import { useAppTheme } from '@app/app-theme';
import { COMMON_BAR_CHART_PROPS } from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { BAR_WITHOUT_TEXT_HEIGHT, getBarChartHeight } from '@app/components/statistikk/charts/common/constants';
import type { MainReasonDataset } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/types';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import { KVALITETSVURDERING_TEXTS, MAIN_REASON_IDS } from '@app/components/statistikk/types/kvalitetsvurdering';
import { toPercent } from '@app/domain/number';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { type ReactNode, useMemo } from 'react';

const { Klageforberedelsen, Utredningen, Vedtaket, BrukAvRaadgivendeLege } = MainReason;

interface Props {
  stats: MainReasonDataset[];
  title: string;
  helpText?: ReactNode;
}

export const Mangelfull = ({ stats, title, helpText }: Props) => {
  const theme = useAppTheme();
  const { values, labels } = useMemo(() => getTotalMangelfullDatasets(stats, theme), [stats, theme]);

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

export const getTotalMangelfullDatasets = (stats: MainReasonDataset[], theme: AppTheme) => {
  const unsortedBars = stats.flatMap(({ data, label }) =>
    [Klageforberedelsen, Utredningen, Vedtaket, BrukAvRaadgivendeLege].map((field) => ({
      label:
        stats.length > 1
          ? `${label} - ${KVALITETSVURDERING_TEXTS[field].label}`
          : KVALITETSVURDERING_TEXTS[field].label,
      data,
      color: KVALITETSVURDERING_TEXTS[field].color,
      field,
    })),
  );

  const sortedBars = MAIN_REASON_IDS.flatMap((id) => unsortedBars.filter(({ field }) => field === id));

  const calculatedData = sortedBars.map(({ data, label, color, field }) => {
    const count = data.filter((stat) => stat[field] === Radiovalg.MANGELFULLT).length;
    const percent = count / data.length;

    return { label, count, percent, color, length: data.length };
  });

  const labels = calculatedData.map(({ label, count, percent, length }) => {
    const unit = length === 1 ? 'sak' : 'saker';

    return `${label} (${toPercent(percent)} | ${count} av ${length} ${unit})`;
  });

  const values = calculatedData.map(({ percent, count, length, color }) => ({
    value: percent,
    count,
    length,
    itemStyle: { color: getColorFromTheme(color, theme) },
  }));

  return { values: values.toReversed(), labels: labels.toReversed() };
};
