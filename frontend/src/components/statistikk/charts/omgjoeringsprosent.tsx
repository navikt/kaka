import { UTFALL_COLOR_MAP } from '@app/colors/colors';
import {
  COMMMON_STACKED_BAR_CHART_SERIES_PROPS,
  COMMON_STACKED_BAR_CHART_PROPS,
} from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { useColorMap } from '@app/components/statistikk/colors/get-color';
import { getOmgjortutfall } from '@app/components/statistikk/get-omgjortutfall';
import { LOCALE } from '@app/domain/intl';
import { toPercent } from '@app/domain/number';
import { useUtfall } from '@app/simple-api-state/use-utfall';
import type { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { CallbackDataParams } from 'echarts/types/src/util/types.js';
import type { ReactNode } from 'react';
import type { ComparisonProps } from '../types';

const UNIT = 'saker';

const useData = (stats: ComparisonProps['stats'], version: KvalitetsvurderingVersion) => {
  const colorMap = useColorMap();
  const { data: utfallMap = [] } = useUtfall();
  const utfall = getOmgjortutfall(version);

  const unreversedDatasets = utfall.map((utfallId) => {
    const { data, counts } = stats.reduce<{ data: number[]; counts: number[] }>(
      (acc, curr) => {
        const count = curr.data.filter(({ utfallId: id }) => id === utfallId).length;

        return {
          data: [...acc.data, (count / curr.data.length) * 100],
          counts: [...acc.counts, count],
        };
      },
      { data: [], counts: [] },
    );

    return {
      name: utfallMap.find((u) => u.id === utfallId)?.navn ?? utfallId,
      data,
      counts,
      color: colorMap[UTFALL_COLOR_MAP[utfallId]],
    };
  });

  const unreversedLabels = stats.map(({ label, data: relevantData }, index) => {
    let count = 0;
    let percent = 0;

    for (const { data, counts } of unreversedDatasets) {
      count += counts[index] ?? 0;
      percent += data[index] ?? 0;
    }

    return `${label} (${toPercent(percent / 100)} | ${count} av ${relevantData.length} ${UNIT})`;
  });

  // Echarts renders category axis items bottom-to-top, so reverse here to get the expected top-to-bottom order.
  const labels = unreversedLabels.toReversed();
  const datasets = unreversedDatasets.map((dataset) => ({
    ...dataset,
    data: dataset.data.toReversed(),
    counts: dataset.counts.toReversed(),
  }));

  const series = datasets.map(({ name, data, counts, color }) => ({
    ...COMMMON_STACKED_BAR_CHART_SERIES_PROPS,
    name,
    data,
    itemStyle: { color },
    label: {
      show: true,
      formatter: (params: CallbackDataParams) => {
        const percent = typeof params.value === 'number' ? params.value : 0;

        if (percent === 0) {
          return '';
        }

        const count = counts[params.dataIndex] ?? 0;

        return `${toPercent(percent / 100)}\n${count.toLocaleString(LOCALE)} ${UNIT}`;
      },
    },
  }));

  return { series, labels, datasets };
};

interface Props extends ComparisonProps {
  version: KvalitetsvurderingVersion;
  title: string;
  helpText?: ReactNode;
}

export const Omgjoeringsprosent = ({ stats, version, title, helpText }: Props) => {
  const { series, labels, datasets } = useData(stats, version);

  return (
    <EChart
      title={title}
      helpText={helpText}
      option={{
        ...COMMON_STACKED_BAR_CHART_PROPS,
        yAxis: { type: 'category', data: labels },
        xAxis: {
          type: 'value',
          name: 'Omgjøringsprosent',
          nameLocation: 'middle',
          nameGap: 30,
          axisLabel: { formatter: '{value} %' },
        },
        series,
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
            const list = Array.isArray(params) ? params : [params];

            return list
              .map((param) => {
                const percent = typeof param.value === 'number' ? param.value : 0;
                const count = datasets[param.seriesIndex ?? -1]?.counts[param.dataIndex] ?? 0;

                return `${param.marker ?? ''}${param.seriesName ?? 'Ukjent'}: ${toPercent(percent / 100)} (${count.toLocaleString(LOCALE)} ${UNIT})`;
              })
              .join('<br/>');
          },
        },
      }}
    />
  );
};
