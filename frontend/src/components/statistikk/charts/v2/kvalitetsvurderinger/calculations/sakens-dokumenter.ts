import { ChartData } from 'chart.js';
import { NAV_COLORS } from '@app/colors/colors';
import { toPercent } from '@app/domain/number';
import { REASON_TO_SUBREASONS, SAKENS_DOKUMENTER_REASONS } from '@app/types/kvalitetsvurdering/texts/structures';
import { SAKENS_DOKUMENTER_TEXTS } from '@app/types/kvalitetsvurdering/texts/texts';
import { MainReason } from '@app/types/kvalitetsvurdering/v2';
import { DataSet } from '../types';
import { calculateMainReasons } from './helpers/main-reasons';
import { calculateReasons } from './helpers/reasons';
import { calculateTotalMangelfullFactor } from './helpers/total-mangelfull-factor';

type ReturnType = ChartData<'bar', number[], string>;

interface StackedBarPieceCount {
  label: string;
  counts: number[];
}

type StackedBarPiece = StackedBarPieceCount & ReturnType['datasets'][0];

export const getSakensDokumenterDatasets = (stats: DataSet[], unit: string) => {
  const stacks = stats.flatMap(({ data, label }) => {
    const totalMangelfullFactor = calculateTotalMangelfullFactor(data);

    const { mainReasons, totalMainReasonsCount } = calculateMainReasons(data);

    const klageforberedelsenMangelfullFactor = mainReasons[MainReason.Klageforberedelsen] / totalMainReasonsCount;

    const reasonIds = REASON_TO_SUBREASONS[MainReason.Klageforberedelsen];

    const { reasons, totalReasonsCount } = calculateReasons(data, reasonIds);

    const sakensDokumenterFactor = (reasons['klageforberedelsenSakensDokumenter'] ?? 0) / totalReasonsCount;

    const {
      reasons: subReasons,
      reasonArray: subReasonArray,
      totalReasonsCount: totalSakensDokumenterCount,
    } = calculateReasons(data, SAKENS_DOKUMENTER_REASONS);

    const factor = totalMangelfullFactor * klageforberedelsenMangelfullFactor * sakensDokumenterFactor;

    return {
      label,
      data: Object.fromEntries(
        subReasonArray.map(([id, count]) => [id, (count / totalSakensDokumenterCount) * factor]),
      ),
      count: subReasons,
    };
  });

  const datasets = SAKENS_DOKUMENTER_REASONS.map<StackedBarPiece>((reasonId) => ({
    label: SAKENS_DOKUMENTER_TEXTS[reasonId].label,
    data: stacks.map(({ data }) => (data[reasonId] ?? 0) * 100),
    counts: stacks.map(({ count }) => count[reasonId] ?? 0),
    backgroundColor: SAKENS_DOKUMENTER_TEXTS[reasonId].color ?? NAV_COLORS.blue[500],
    barThickness: BAR_THICKNESS,
  })).filter((dataset) => dataset.data.some((v) => v !== 0)); // Remove empty datasets.

  const labels = stacks.map(({ label }, index) => {
    let count = 0;
    let percent = 0;

    for (const { data, counts } of datasets) {
      count += counts[index] ?? 0;
      percent += data[index] ?? 0;
    }

    const percentValue = Number.isNaN(percent) ? '-' : toPercent(percent / 100);

    return `${label} (${percentValue} | ${count} ${unit})`;
  });

  return { labels, datasets };
};

export const BAR_THICKNESS = 50;
