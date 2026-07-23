import type { AppTheme } from '@app/app-theme';
import type { StackedBarPiece } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/calculations/mangelfull-details';
import type { DataSetV3 } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/types';
import { getColorMap } from '@app/components/statistikk/colors/get-color';
import type { ColorToken } from '@app/components/statistikk/colors/token-name';
import type { IStatisticVurderingV3 } from '@app/types/statistics/v3';
import { calculateReasons } from './helpers/reasons';

export type ReasonIds = (keyof IStatisticVurderingV3)[];
export type ReasonTexts = Partial<Record<keyof IStatisticVurderingV3, { label: string; color: ColorToken }>>;

export const getDatasets = (
  stats: DataSetV3[],
  reasonsIds: ReasonIds,
  reasonTexts: ReasonTexts,
  unit: string,
  theme: AppTheme,
) => {
  const colorMap = getColorMap(theme);

  const stacks = stats.flatMap(({ data, label }) => {
    const { reasons, reasonArray } = calculateReasons(data, reasonsIds);

    return {
      label,
      data: Object.fromEntries(reasonArray.map(([id, count]) => [id, count / data.length])),
      counts: reasons,
    };
  });

  const datasets = reasonsIds
    .map<StackedBarPiece>((reasonId) => {
      const reasonText = reasonTexts[reasonId];

      if (reasonText === undefined) {
        throw new Error(
          `Missing reasonText for reasonId: ${String(reasonId)}, reasonTexts: ${JSON.stringify(reasonTexts)}`,
        );
      }

      return {
        label: reasonText.label,
        percentages: stacks.map(({ data }) => (data[reasonId] ?? 0) * 100),
        data: stacks.map(({ counts: count }) => count[reasonId] ?? 0),
        backgroundColor: colorMap[reasonText.color],
      };
    })
    .filter((dataset) => dataset.data.some((v) => v !== 0)); // Remove empty datasets.

  const labels = stacks.map(({ label }, index) => {
    let count = 0;

    for (const { data } of datasets) {
      count += data[index] ?? 0;
    }

    return `${label} (${count} ${unit})`;
  });

  return { labels, datasets };
};
