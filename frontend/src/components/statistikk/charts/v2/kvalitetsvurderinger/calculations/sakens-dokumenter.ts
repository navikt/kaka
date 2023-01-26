import { ChartData } from 'chart.js';
import { NAV_COLORS, SAKENS_DOKUMENTER_COLOR_MAP } from '../../../../../../colors/colors';
import { round } from '../../../../../../domain/number';
import { MainReason } from '../../../../../../types/kvalitetsvurdering/v2';
import { KVALITETSVURDERING_V2_FIELD_NAMES } from '../../../../../kvalitetsvurdering/kvalitetsskjema/v2/common/use-field-name';
import { DataSet } from '../types';
import { REASON_TO_SUBREASONS, SAKENS_DOKUMENTER_REASONS } from './constants';
import { calculateMainReasons } from './helpers/main-reasons';
import { calculateReasons } from './helpers/reasons';
import { calculateTotalMangelfullFactor } from './helpers/total-mangelfull-factor';

type ReturnType = ChartData<'bar', number[], string>;

interface StackedBarPieceCount {
  label: string;
  counts: number[];
}

type StackedBarPiece = StackedBarPieceCount & ReturnType['datasets'][0];

export const getSakensDokumenterDatasets = (stats: DataSet[]) => {
  const stacks = stats.flatMap(({ data, label }) => {
    const totalMangelfullFactor = calculateTotalMangelfullFactor(data);

    const { mainReasons, totalMainReasonsCount } = calculateMainReasons(data);

    const klageforberedelsenMangelfullFactor = mainReasons[MainReason.Klageforberedelsen] / totalMainReasonsCount;

    const reasonIds = REASON_TO_SUBREASONS[MainReason.Klageforberedelsen];

    const { reasons, totalReasonsCount } = calculateReasons(data, reasonIds);

    const sakensDokumenterFactor = (reasons['klageforberedelsenSakensDokumenter'] ?? 0) / totalReasonsCount;

    const subReasons = data.reduce<Record<string, number>>((acc, sak) => {
      const mangelfulleIds = SAKENS_DOKUMENTER_REASONS.filter((id) => sak[id] === true);

      if (mangelfulleIds.length !== 0) {
        mangelfulleIds.forEach((id) => {
          acc[id] = (acc[id] ?? 0) + 1;
        });
      }

      return acc;
    }, {});

    const subReasonArray = Object.entries(subReasons);

    const totalSakensDokumenterCount = subReasonArray.reduce((total, [, count]) => total + count, 0);

    const factor = totalMangelfullFactor * klageforberedelsenMangelfullFactor * sakensDokumenterFactor;

    return {
      label,
      data: Object.fromEntries(
        subReasonArray.map(([id, count]) => [id, (count / totalSakensDokumenterCount) * factor])
      ),
      count: Object.fromEntries(subReasonArray),
    };
  });

  const datasets = SAKENS_DOKUMENTER_REASONS.map<StackedBarPiece>((reasonId) => ({
    label: KVALITETSVURDERING_V2_FIELD_NAMES[reasonId],
    data: stacks.map(({ data }) => (data[reasonId] ?? 0) * 100),
    counts: stacks.map(({ count }) => count[reasonId] ?? 0),
    backgroundColor: SAKENS_DOKUMENTER_COLOR_MAP[reasonId] ?? NAV_COLORS.blue[500],
    barThickness: BAR_THICKNESS,
  })).filter((dataset) => dataset.data.some((v) => v !== 0)); // Remove empty datasets.

  const labels = stacks.map(({ label }, index) => {
    let count = 0;
    let percent = 0;

    for (const { data, counts } of datasets) {
      count += counts[index] ?? 0;
      percent += data[index] ?? 0;
    }

    const percentValue = Number.isNaN(percent) ? '-' : round(percent, 1);

    return `${label} (${percentValue} % | ${count} stk)`;
  });

  return { labels, datasets };
};

export const BAR_THICKNESS = 50;
