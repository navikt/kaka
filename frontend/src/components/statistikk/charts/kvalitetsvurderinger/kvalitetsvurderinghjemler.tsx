import { COMMON_BAR_CHART_PROPS } from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { useRegistreringshjemlerMap } from '@app/simple-api-state/use-kodeverk';
import type { CallbackDataParams } from 'echarts/types/src/util/types.js';
import { useMemo } from 'react';

interface Props {
  hjemlerCount: Record<string, number>;
  backgroundColor: string;
  title: string;
  hideTitle?: boolean;
}

export const Kvalitetsvurderinghjemler = ({ hjemlerCount, backgroundColor, title, hideTitle }: Props) => {
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

  return (
    <div className="h-100">
      <EChart
        title={title}
        hideTitle={hideTitle}
        option={{
          ...COMMON_BAR_CHART_PROPS,
          yAxis: { type: 'category', data: labels, axisLabel: { width: 120, overflow: 'truncate' } },
          series: [{ data, type: 'bar', itemStyle: { color: backgroundColor } }],
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
    </div>
  );
};
