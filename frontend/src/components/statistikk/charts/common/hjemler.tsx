import { COMMON_BAR_CHART_PROPS } from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { NoData } from '@app/components/echarts/no-data';
import { BAR_WITHOUT_TEXT_HEIGHT, getBarChartHeight } from '@app/components/statistikk/charts/common/constants';
import { useRegistreringshjemlerMap } from '@app/simple-api-state/use-kodeverk';
import type { CallbackDataParams } from 'echarts/types/src/util/types.js';
import { useMemo } from 'react';

interface Props {
  hjemlerCount: Record<string, number>;
  backgroundColor: string;
  title: string;
  extraTitleContent?: React.ReactNode;
  headingHeight?: number;
}

export const Kvalitetsvurderinghjemler = ({
  hjemlerCount,
  backgroundColor,
  title,
  extraTitleContent,
  headingHeight,
}: Props) => {
  const { data: hjemler = {} } = useRegistreringshjemlerMap();

  const { data, labels, tooltips } = useMemo(() => {
    const top10 = Object.entries(hjemlerCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .toReversed();

    const labels: string[] = [];
    const tooltips: string[] = [];
    const values: number[] = [];

    for (const [id, count] of top10) {
      const hjemmel = hjemler[id];

      if (hjemmel === undefined) {
        labels.push(id);
        tooltips.push(id);
      } else {
        labels.push(`${hjemmel.lovkilde.beskrivelse} - ${hjemmel.hjemmelnavn}`);
        tooltips.push(`${hjemmel.lovkilde.navn} - ${hjemmel.hjemmelnavn}`);
      }

      values.push(count);
    }

    return { data: values, labels, tooltips };
  }, [hjemlerCount, hjemler]);

  if (labels.length === 0) {
    return <NoData title={title} />;
  }

  return (
    <EChart
      title={title}
      headingHeight={headingHeight}
      extraTitleContent={extraTitleContent}
      chartHeight={getBarChartHeight({ textInBar: false, barCount: labels.length, xAxisLabel: false })}
      option={{
        ...COMMON_BAR_CHART_PROPS,
        yAxis: { type: 'category', data: labels, axisLabel: { width: 120, overflow: 'truncate' } },
        series: [{ data, type: 'bar', itemStyle: { color: backgroundColor }, barWidth: BAR_WITHOUT_TEXT_HEIGHT }],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
            const [param] = Array.isArray(params) ? params : [params];

            if (param === undefined) {
              return '';
            }

            const tooltip = tooltips[param.dataIndex];

            return tooltip === undefined ? `${param.name}: ${param.value}` : `${tooltip}: ${param.value}`;
          },
        },
      }}
    />
  );
};
