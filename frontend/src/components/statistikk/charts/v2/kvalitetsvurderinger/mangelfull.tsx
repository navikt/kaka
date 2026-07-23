import { COMMON_BAR_CHART_PROPS } from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import type { MainReasonDataset } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/types';
import { useColorMap } from '@app/components/statistikk/colors/get-color';
import { KVALITETSVURDERING_TEXTS, MAIN_REASON_IDS } from '@app/components/statistikk/types/kvalitetsvurdering';
import { toPercent } from '@app/domain/number';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import type { ReactNode } from 'react';

const { Klageforberedelsen, Utredningen, Vedtaket, BrukAvRaadgivendeLege } = MainReason;

interface Props {
  stats: MainReasonDataset[];
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
          // Echarts renders category axis items bottom-to-top, so reverse here to get the expected top-to-bottom order.
          yAxis: { type: 'category', data: labels.toReversed() },
          xAxis: { type: 'value', max: 1, axisLabel: { formatter: (value: number) => `${value * 100} %` } },
          series: [{ type: 'bar', data: values.toReversed() }],
        }}
      />
    </div>
  );
};

export const useData = (stats: MainReasonDataset[]) => {
  const colorMap = useColorMap();

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
    itemStyle: { color: colorMap[color] },
  }));

  return { values, labels };
};
