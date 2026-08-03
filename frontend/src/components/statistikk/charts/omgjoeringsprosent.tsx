import type { AppTheme } from '@app/app-theme';
import { useAppTheme } from '@app/app-theme';
import { UTFALL_COLOR_MAP } from '@app/colors/colors';
import {
  COMMON_STACKED_BAR_CHART_PROPS,
  COMMON_STACKED_BAR_CHART_SERIES_PROPS,
} from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { BAR_WITH_TEXT_HEIGHT, getBarChartHeight } from '@app/components/statistikk/charts/common/constants';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import { getOmgjortutfall } from '@app/components/statistikk/get-omgjortutfall';
import { LOCALE } from '@app/domain/intl';
import { toPercent } from '@app/domain/number';
import { useUtfall } from '@app/simple-api-state/use-utfall';
import type { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { CallbackDataParams } from 'echarts/types/src/util/types.js';
import { type ReactNode, useMemo } from 'react';
import type { ComparisonProps } from '../types';

const UNIT = 'saker';

const getOmgjoeringsprosentData = (
  stats: ComparisonProps['stats'],
  version: KvalitetsvurderingVersion,
  utfallMap: { id: string; navn: string }[],
  theme: AppTheme,
) => {
  const utfall = getOmgjortutfall(version);

  const unreversedDatasets = utfall.map((utfallId) => {
    const { data, counts } = stats.reduce<{ data: number[]; counts: number[] }>(
      (acc, curr) => {
        const count = curr.data.filter(({ utfallId: id }) => id === utfallId).length;
        const percent = curr.data.length === 0 ? 0 : (count / curr.data.length) * 100;

        return {
          data: [...acc.data, percent],
          counts: [...acc.counts, count],
        };
      },
      { data: [], counts: [] },
    );

    return {
      name: utfallMap.find((u) => u.id === utfallId)?.navn ?? utfallId,
      data,
      counts,
      color: getColorFromTheme(UTFALL_COLOR_MAP[utfallId], theme),
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
    ...COMMON_STACKED_BAR_CHART_SERIES_PROPS,
    name,
    data,
    itemStyle: { color },
    barWidth: BAR_WITH_TEXT_HEIGHT,
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
  const theme = useAppTheme();
  const { data: utfallMap = [] } = useUtfall();
  const { series, labels, datasets } = useMemo(
    () => getOmgjoeringsprosentData(stats, version, utfallMap, theme),
    [stats, version, utfallMap, theme],
  );

  return (
    <EChart
      title={title}
      helpText={helpText}
      chartHeight={getBarChartHeight({ textInBar: true, barCount: labels.length, xAxisLabel: true }) + MARGIN_BOTTOM}
      option={{
        ...COMMON_STACKED_BAR_CHART_PROPS,
        grid: { bottom: MARGIN_BOTTOM },
        yAxis: { type: 'category', data: labels },
        xAxis: {
          type: 'value',
          name: 'Omgjøringsprosent',
          nameLocation: 'middle',
          axisLabel: { formatter: '{value} %' },
        },
        series,
        tooltip: {
          trigger: 'item',
          formatter: (params: CallbackDataParams) => {
            const percent = typeof params.value === 'number' ? params.value : 0;
            const count = datasets[params.seriesIndex ?? -1]?.counts[params.dataIndex] ?? 0;

            return `${params.marker ?? ''}${params.seriesName ?? 'Ukjent'}: ${toPercent(percent / 100)} (${count.toLocaleString(LOCALE)} ${UNIT})`;
          },
        },
      }}
    />
  );
};

const MARGIN_BOTTOM = 85;
