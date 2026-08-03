import { COMMON_BAR_CHART_PROPS } from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { NoData } from '@app/components/echarts/no-data';
import { useColor } from '@app/components/statistikk/colors/get-color';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { Card } from '@app/components/statistikk/wrappers/wrappers';
import { useMemo } from 'react';
import { useBehandlingstidField } from '../hooks/use-behandlingstid-param';
import { useBuckets } from '../hooks/use-buckets';

interface Stat {
  kaBehandlingstidDays: number;
  totalBehandlingstidDays: number;
  vedtaksinstansBehandlingstidDays: number;
}

interface Props {
  stats: Stat[];
  title: string;
  headerContent?: React.ReactNode;
}

export const BehandlingstidHistogram = ({ stats, title, headerContent }: Props) => {
  const field = useBehandlingstidField();
  const fieldStats = useMemo(() => stats.map((stat) => stat[field]), [stats, field]);
  const [labels, values] = useBuckets(fieldStats, 7, 104);

  const neutral = useColor(ColorToken.Info500);
  const warning = useColor(ColorToken.Warning500);
  const danger = useColor(ColorToken.Danger900);

  const data = useMemo(
    () =>
      values.map((value, index) => ({
        value,
        itemStyle: { color: index < 12 ? neutral : index > 15 ? danger : warning },
      })),
    [values, neutral, warning, danger],
  );

  if (stats.length === 0) {
    return (
      <Card rowSpan={2} colSpan={2}>
        <NoData title={title} />
      </Card>
    );
  }

  return (
    <Card rowSpan={2} colSpan={2}>
      <EChart
        title={title}
        headerContent={headerContent}
        option={{
          ...COMMON_BAR_CHART_PROPS,
          xAxis: { type: 'category', data: labels, name: 'Innen uke', nameLocation: 'middle', nameGap: 30 },
          yAxis: { type: 'value', name: 'Antall', nameLocation: 'middle', nameGap: 40 },
          series: [{ data, type: 'bar' }],
        }}
      />
    </Card>
  );
};
