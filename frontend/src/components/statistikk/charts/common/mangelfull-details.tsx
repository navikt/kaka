import {
  COMMON_STACKED_BAR_CHART_PROPS,
  COMMON_STACKED_BAR_CHART_SERIES_PROPS,
} from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { BAR_WITH_TEXT_HEIGHT, getBarChartHeight } from '@app/components/statistikk/charts/common/constants';
import type { StackedBarPiece } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/calculations/mangelfull-details';
import { LOCALE } from '@app/domain/intl';
import { toPercent } from '@app/domain/number';
import type { CallbackDataParams } from 'echarts/types/src/util/types.js';
import type { ReactNode } from 'react';

const UNIT = 'avvik';

interface Props {
  datasets: StackedBarPiece[];
  labels: string[];
  title: string;
  helpText?: ReactNode;
  extraTitleContent?: ReactNode;
  headingHeight?: number;
}

export const MangelfullDetails = ({ datasets, labels, title, helpText, extraTitleContent, headingHeight }: Props) => {
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
    itemStyle: { color: backgroundColor },
    barWidth: BAR_WITH_TEXT_HEIGHT,
    labelLayout: { hideOverlap: true },
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
      headingHeight={headingHeight}
      extraTitleContent={extraTitleContent}
      chartHeight={getBarChartHeight({ textInBar: true, barCount: reversedLabels.length, xAxisLabel: true })}
      option={{
        ...COMMON_STACKED_BAR_CHART_PROPS,
        legend: { show: false },
        yAxis: {
          type: 'category',
          data: reversedLabels,
          axisLabel: { width: 300, overflow: 'break' },
        },
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
