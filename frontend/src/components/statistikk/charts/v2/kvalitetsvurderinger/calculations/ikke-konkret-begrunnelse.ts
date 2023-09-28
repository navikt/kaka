import { ChartData } from 'chart.js';
import { NAV_COLORS } from '@app/colors/colors';
import { toPercent } from '@app/domain/number';
import { IKKE_KONKRET_BEGRUNNELSE_REASONS, REASON_TO_SUBREASONS } from '@app/types/kvalitetsvurdering/texts/structures';
import { IKKE_KONKRET_BEGRUNNELSE_TEXTS } from '@app/types/kvalitetsvurdering/texts/texts';
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

export const getIkkeKonkretBegrunnelseDatasets = (stats: DataSet[], unit: string) => {
  const stacks = stats.flatMap(({ data, label }) => {
    const totalMangelfullFactor = calculateTotalMangelfullFactor(data);

    const { mainReasons, totalMainReasonsCount } = calculateMainReasons(data);

    const vedtaketMangelfullFactor = mainReasons[MainReason.Vedtaket] / totalMainReasonsCount;

    const reasonIds = REASON_TO_SUBREASONS[MainReason.Vedtaket];

    const { reasons, totalReasonsCount } = calculateReasons(data, reasonIds);

    const sakensDokumenterFactor = (reasons['vedtaketIkkeKonkretIndividuellBegrunnelse'] ?? 0) / totalReasonsCount;

    const {
      reasons: subReasons,
      reasonArray: subReasonArray,
      totalReasonsCount: totalIkkeKonkretBegrunnelseCount,
    } = calculateReasons(data, IKKE_KONKRET_BEGRUNNELSE_REASONS);

    const factor = totalMangelfullFactor * vedtaketMangelfullFactor * sakensDokumenterFactor;

    return {
      label,
      data: Object.fromEntries(
        subReasonArray.map(([id, count]) => [id, (count / totalIkkeKonkretBegrunnelseCount) * factor]),
      ),
      counts: subReasons,
    };
  });

  const datasets = IKKE_KONKRET_BEGRUNNELSE_REASONS.map<StackedBarPiece>((reasonId) => ({
    label: IKKE_KONKRET_BEGRUNNELSE_TEXTS[reasonId].label,
    data: stacks.map(({ data }) => (data[reasonId] ?? 0) * 100),
    counts: stacks.map(({ counts: count }) => count[reasonId] ?? 0),
    backgroundColor: IKKE_KONKRET_BEGRUNNELSE_TEXTS[reasonId].color ?? NAV_COLORS.green[500],
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
