import { ChartData } from 'chart.js';
import { NAV_COLORS } from '@app/colors/colors';
import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import {
  UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_REASONS,
  UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_TEXTS,
} from '@app/components/statistikk/types/klageforberedelsen';
import { REASON_TO_SUBREASONS } from '@app/components/statistikk/types/kvalitetsvurdering';
import { toPercent } from '@app/domain/number';
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

export const getUtredningenUnderKlageforberedelsenDatasets = (stats: DataSet[], unit: string) => {
  const stacks = stats.flatMap(({ data, label }) => {
    const totalMangelfullFactor = calculateTotalMangelfullFactor(data);

    const { mainReasons, totalMainReasonsCount } = calculateMainReasons(data);

    const klageforberedelsenMangelfullFactor = mainReasons[MainReason.Klageforberedelsen] / totalMainReasonsCount;

    const reasonIds = REASON_TO_SUBREASONS[MainReason.Klageforberedelsen];

    const { reasons, totalReasonsCount } = calculateReasons(data, reasonIds);

    const utredningenFactor =
      (reasons['klageforberedelsenUtredningenUnderKlageforberedelsen'] ?? 0) / totalReasonsCount;

    const {
      reasons: subReasons,
      reasonArray: subReasonArray,
      totalReasonsCount: totalUtredningenCount,
    } = calculateReasons(data, UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_REASONS);

    const factor = totalMangelfullFactor * klageforberedelsenMangelfullFactor * utredningenFactor;

    return {
      label,
      data: Object.fromEntries(subReasonArray.map(([id, count]) => [id, (count / totalUtredningenCount) * factor])),
      count: subReasons,
    };
  });

  const datasets = UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_REASONS.map<StackedBarPiece>((reasonId) => ({
    label: UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_TEXTS[reasonId].label,
    data: stacks.map(({ data }) => (data[reasonId] ?? 0) * 100),
    counts: stacks.map(({ count }) => count[reasonId] ?? 0),
    backgroundColor: UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_TEXTS[reasonId].color ?? NAV_COLORS.blue[500],
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
