import { COMMON_BAR_CHART_PROPS } from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/data';
import type { MainReasonV3Dataset } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/types';
import { useColorMap } from '@app/components/statistikk/colors/get-color';
import { KVALITETSVURDERING_TEXTS, MAIN_REASON_IDS } from '@app/components/statistikk/types/v3/kvalitetsvurdering';
import { toPercent } from '@app/domain/number';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import type { ReactNode } from 'react';

const { Saksbehandlingsreglene, Særregelverket, Trygdemedisin } = MainReason;

interface Props {
  stats: MainReasonV3Dataset[];
  title: string;
  helpText?: ReactNode;
}

export const Mangelfull = ({ stats, title, helpText }: Props) => {
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

const useData = (stats: MainReasonV3Dataset[]) => {
  const colorMap = useColorMap();

  const unsortedBars = stats.flatMap(({ data, label }) =>
    [Saksbehandlingsreglene, Særregelverket, Trygdemedisin].map((field) => ({
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

  const values = calculatedData.map(({ percent, color }) => ({
    value: percent,
    itemStyle: { color: colorMap[color] },
  }));

  // Echarts renders category axis items bottom-to-top, so reverse here to get the expected top-to-bottom order.
  return { values: values.toReversed(), labels: labels.toReversed() };
};
