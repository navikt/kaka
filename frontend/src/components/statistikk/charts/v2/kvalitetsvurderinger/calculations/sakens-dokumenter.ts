import type { AppTheme } from '@app/app-theme';
import { getColorMap } from '@app/components/statistikk/colors/get-color';
import {
  SAKENS_DOKUMENTER_REASONS,
  SAKENS_DOKUMENTER_TEXTS,
} from '@app/components/statistikk/types/klageforberedelsen';
import type { ChartData } from 'chart.js';
import type { DataSet } from '../types';
import { calculateReasons } from './helpers/reasons';

type ReturnType = ChartData<'bar', number[], string>;

interface StackedBarPieceCount {
  label: string;
  percentages: number[];
}

type StackedBarPiece = StackedBarPieceCount & ReturnType['datasets'][0];

export const getSakensDokumenterDatasets = (stats: DataSet[], unit: string, theme: AppTheme) => {
  const colorMap = getColorMap(theme);

  const stacks = stats.flatMap(({ data, label }) => {
    const { reasons, reasonArray } = calculateReasons(data, SAKENS_DOKUMENTER_REASONS);

    return {
      label,
      data: Object.fromEntries(reasonArray.map(([id, count]) => [id, count / data.length])),
      count: reasons,
    };
  });

  const datasets = SAKENS_DOKUMENTER_REASONS.map<StackedBarPiece>((reasonId) => ({
    label: SAKENS_DOKUMENTER_TEXTS[reasonId].label,
    percentages: stacks.map(({ data }) => (data[reasonId] ?? 0) * 100),
    data: stacks.map(({ count }) => count[reasonId] ?? 0),
    backgroundColor: colorMap[SAKENS_DOKUMENTER_TEXTS[reasonId].color],
    barThickness: BAR_THICKNESS,
  })).filter((dataset) => dataset.data.some((v) => v !== 0)); // Remove empty datasets.

  const labels = stacks.map(({ label }, index) => {
    let count = 0;

    for (const { data } of datasets) {
      count += data[index] ?? 0;
    }

    return `${label} (${count} ${unit})`;
  });

  return { labels, datasets };
};

export const BAR_THICKNESS = 50;
