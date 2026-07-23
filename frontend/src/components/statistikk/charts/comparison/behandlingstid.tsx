import {
  COMMMON_STACKED_BAR_CHART_SERIES_PROPS,
  COMMON_STACKED_BAR_CHART_PROPS,
} from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { useColor } from '@app/components/statistikk/colors/get-color';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import type { ISaksdata } from '@app/types/statistics/common';
import { useMemo } from 'react';

type Data = Pick<
  ISaksdata,
  'avsluttetAvSaksbehandler' | 'vedtaksinstansBehandlingstidDays' | 'kaBehandlingstidDays' | 'totalBehandlingstidDays'
>;

interface Stat {
  label: string;
  data: Data[];
  color: ColorToken;
}

interface Props {
  stats: Stat[];
  title: string;
}

export const BehandlingstidComparison = ({ stats, title }: Props) => {
  const vedtaksinstansColor = useColor(ColorToken.Info500);
  const klageinstansColor = useColor(ColorToken.Purple500);

  const { labels, vedtaksinstansData, klageinstansData } = useMemo(() => {
    const vedtaksinstans: number[] = [];
    const klageinstans: number[] = [];

    for (const { data } of stats) {
      let vedtakSum = 0;
      let klageSum = 0;

      for (const { vedtaksinstansBehandlingstidDays, kaBehandlingstidDays } of data) {
        vedtakSum += vedtaksinstansBehandlingstidDays;
        klageSum += kaBehandlingstidDays;
      }

      const noData = data.length === 0;
      const zeroVedtakSum = vedtakSum === 0;
      const zeroKlageSum = klageSum === 0;

      vedtaksinstans.push(noData || zeroVedtakSum ? 0 : Math.round(vedtakSum / data.length));
      klageinstans.push(noData || zeroKlageSum ? 0 : Math.round(klageSum / data.length));
    }

    const unreversedLabels = stats.map(
      (stat, i) => `${stat.label} (totalt ${(vedtaksinstans[i] ?? 0) + (klageinstans[i] ?? 0)})`,
    );

    // Echarts renders category axis items bottom-to-top, so reverse here to get the expected top-to-bottom order.
    return {
      labels: unreversedLabels.toReversed(),
      vedtaksinstansData: vedtaksinstans.toReversed(),
      klageinstansData: klageinstans.toReversed(),
    };
  }, [stats]);

  return (
    <div className="h-100">
      <EChart
        title={title}
        option={{
          ...COMMON_STACKED_BAR_CHART_PROPS,
          yAxis: { type: 'category', data: labels },
          xAxis: { type: 'value', name: 'Behandlingstid (dager)', nameLocation: 'middle', nameGap: 30 },
          series: [
            {
              ...COMMMON_STACKED_BAR_CHART_SERIES_PROPS,
              name: 'Vedtaksinstans',
              data: vedtaksinstansData,
              itemStyle: { color: vedtaksinstansColor },
            },
            {
              ...COMMMON_STACKED_BAR_CHART_SERIES_PROPS,
              name: 'Klageinstans',
              data: klageinstansData,
              itemStyle: { color: klageinstansColor },
            },
          ],
        }}
      />
    </div>
  );
};
