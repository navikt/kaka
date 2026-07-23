import { COMMON_BAR_CHART_PROPS } from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { useRegistreringshjemlerMap } from '@app/simple-api-state/use-kodeverk';
import type { CallbackDataParams } from 'echarts/types/src/util/types.js';
import { useMemo } from 'react';

interface Stat {
  hjemmelIdList: string[];
}

interface Props {
  stats: Stat[];
  title: string;
}

export const Hjemler = ({ stats, title }: Props) => {
  const { data: hjemlerMap = {} } = useRegistreringshjemlerMap();

  const hjemmelStats = useMemo(
    () =>
      stats.reduce((acc, stat) => {
        for (const hjemmelId of stat.hjemmelIdList) {
          acc.set(hjemmelId, (acc.get(hjemmelId) ?? 0) + 1);
        }
        return acc;
      }, new Map<string, number>()),
    [stats],
  );

  const { data, labels, tooltips } = useMemo(() => {
    const top20 = Array.from(hjemmelStats.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .toReversed();

    const labels: string[] = [];
    const tooltips: string[] = [];
    const values: number[] = [];

    for (const [hjemmelId, count] of top20) {
      const found = hjemlerMap[hjemmelId];
      labels.push(found ? `${found.lovkilde.beskrivelse} - ${found.hjemmelnavn} - ` : hjemmelId);
      tooltips.push(found ? `${found.lovkilde.navn} - ${found.hjemmelnavn} - ` : hjemmelId);
      values.push(count);
    }

    // Echarts renders category axis items bottom-to-top, so reverse here to get the expected top-to-bottom order.
    return { data: values, labels: labels, tooltips: tooltips };
  }, [hjemmelStats, hjemlerMap]);

  return (
    <EChart
      title={title}
      option={{
        ...COMMON_BAR_CHART_PROPS,
        yAxis: { type: 'category', data: labels },
        series: [{ data, type: 'bar', name: 'Tildelte saker' }],
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
