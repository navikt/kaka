import { useAppTheme } from '@app/app-theme';
import {
  COMMON_STACKED_BAR_CHART_PROPS,
  COMMON_STACKED_BAR_CHART_SERIES_PROPS,
} from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { BAR_WITH_TEXT_HEIGHT, getBarChartHeight } from '@app/components/statistikk/charts/common/constants';
import {
  getDatasets,
  type ReasonIds,
  type ReasonTexts,
} from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/calculations/get-datasets';
import type { DataSetV3 } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/types';
import { LOCALE } from '@app/domain/intl';
import { toPercent } from '@app/domain/number';
import type { CallbackDataParams } from 'echarts/types/src/util/types.js';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

const UNIT = 'avvik';

interface Props {
  stats: DataSetV3[];
  reasonIds: ReasonIds;
  reasonTexts: ReasonTexts;
  title: string;
  helpText?: ReactNode;
}

export const Details = ({ stats, reasonIds, reasonTexts, title, helpText }: Props) => {
  const theme = useAppTheme();
  const { datasets, labels } = useMemo(
    () => getDatasets(stats, reasonIds, reasonTexts, UNIT, theme),
    [stats, theme, reasonIds, reasonTexts],
  );

  // Echarts renders category axis items bottom-to-top, so reverse the order here to match the top-to-bottom label order.
  const reversedLabels = labels.toReversed();
  const reversedDatasets = datasets.map((dataset) => ({
    ...dataset,
    data: dataset.data.toReversed(),
    percentages: dataset.percentages.toReversed(),
  }));

  const series = reversedDatasets.map(({ label, data, percentages, backgroundColor }) => ({
    ...COMMON_STACKED_BAR_CHART_SERIES_PROPS,
    name: label,
    data,
    barWidth: BAR_WITH_TEXT_HEIGHT,
    itemStyle: { color: backgroundColor },
    label: {
      show: true,
      formatter: (params: CallbackDataParams) => {
        const count = typeof params.value === 'number' ? params.value : 0;

        if (count === 0) {
          return '';
        }

        const percent = percentages[params.dataIndex] ?? 0;

        return `${toPercent(percent / 100)}\n${count.toLocaleString(LOCALE)} ${UNIT}`;
      },
    },
  }));

  return (
    <EChart
      title={title}
      helpText={helpText}
      chartHeight={getBarChartHeight({ textInBar: true, barCount: reversedLabels.length, xAxisLabel: true })}
      option={{
        ...COMMON_STACKED_BAR_CHART_PROPS,
        legend: { show: false },
        yAxis: { type: 'category', data: reversedLabels },
        xAxis: { type: 'value', name: 'Antall', nameLocation: 'middle', nameGap: 30 },
        series,
        tooltip: {
          trigger: 'item',
          formatter: (params: CallbackDataParams) => {
            const count = typeof params.value === 'number' ? params.value : 0;
            const percent = reversedDatasets[params.seriesIndex ?? -1]?.percentages[params.dataIndex] ?? 0;

            return `${params.marker ?? ''}${params.seriesName ?? 'Ukjent'}: ${toPercent(percent / 100)} (${count.toLocaleString(LOCALE)} ${UNIT})`;
          },
        },
      }}
    />
  );
};
