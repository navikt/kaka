import { ChartData } from 'chart.js';
import { IKKE_KONKRET_BEGRUNNELSE_COLOR_MAP, NAV_COLORS } from '../../../../../../colors/colors';
import { round } from '../../../../../../domain/number';
import { MainReason } from '../../../../../../types/kvalitetsvurdering/v2';
import { KVALITETSVURDERING_V2_FIELD_NAMES } from '../../../../../kvalitetsvurdering/kvalitetsskjema/v2/common/use-field-name';
import { DataSet } from '../types';
import { IKKE_KONKRET_BEGRUNNELSE_REASONS, REASON_TO_SUBREASONS } from './constants';
import { calculateMainReasons } from './helpers/main-reasons';
import { calculateReasons } from './helpers/reasons';
import { calculateTotalMangelfullFactor } from './helpers/total-mangelfull-factor';

type ReturnType = ChartData<'bar', number[], string>;

interface StackedBarPieceCount {
  label: string;
  counts: number[];
}

type StackedBarPiece = StackedBarPieceCount & ReturnType['datasets'][0];

export const getIkkeKonkretBegrunnelseDatasets = (stats: DataSet[]) => {
  const stacks = stats.flatMap(({ data, label }) => {
    const totalMangelfullFactor = calculateTotalMangelfullFactor(data);

    const { mainReasons, totalMainReasonsCount } = calculateMainReasons(data);

    const vedtaketMangelfullFactor = mainReasons[MainReason.Vedtaket] / totalMainReasonsCount;

    const reasonIds = REASON_TO_SUBREASONS[MainReason.Vedtaket];

    const { reasons, totalReasonsCount } = calculateReasons(data, reasonIds);

    const sakensDokumenterFactor = (reasons['vedtaketIkkeKonkretIndividuellBegrunnelse'] ?? 0) / totalReasonsCount;

    const subReasons = data.reduce<Record<string, number>>((acc, sak) => {
      const mangelfulleIds = IKKE_KONKRET_BEGRUNNELSE_REASONS.filter((id) => sak[id] === true);

      if (mangelfulleIds.length !== 0) {
        mangelfulleIds.forEach((id) => {
          acc[id] = (acc[id] ?? 0) + 1;
        });
      }

      return acc;
    }, {});

    const subReasonArray = Object.entries(subReasons);

    const totalIkkeKonkretBegrunnelseCount = subReasonArray.reduce((total, [, count]) => total + count, 0);

    const factor = totalMangelfullFactor * vedtaketMangelfullFactor * sakensDokumenterFactor;

    return {
      label,
      data: Object.fromEntries(
        subReasonArray.map(([id, count]) => [id, (count / totalIkkeKonkretBegrunnelseCount) * factor])
      ),
      counts: Object.fromEntries(subReasonArray),
    };
  });

  const datasets = IKKE_KONKRET_BEGRUNNELSE_REASONS.map<StackedBarPiece>((reasonId) => ({
    label: KVALITETSVURDERING_V2_FIELD_NAMES[reasonId],
    data: stacks.map(({ data }) => (data[reasonId] ?? 0) * 100),
    counts: stacks.map(({ counts: count }) => count[reasonId] ?? 0),
    backgroundColor: IKKE_KONKRET_BEGRUNNELSE_COLOR_MAP[reasonId] ?? NAV_COLORS.green[500],
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
