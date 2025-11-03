import type { AppTheme } from '@app/app-theme';
import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/data';
import { calculateReasons } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/calculations/helpers/reasons';
import type { DataSetV3 } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/types';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import {
  KVALITETSVURDERING_TEXTS,
  KVALITETSVURDERING_V3_TEXTS,
  MAIN_REASON_IDS,
  REASON_TO_SUBREASONS,
} from '@app/components/statistikk/types/v3/kvalitetsvurdering';
import type { ChartData } from 'chart.js';

const { Saksbehandlingsreglene, Særregelverket, Trygdemedisin } = MainReason;

type ReturnType = ChartData<'bar', number[], string>;

interface StackedBarPieceCount {
  label: string;
  percentages: number[];
}

interface Stack {
  mainReason: MainReason;
  data: Record<string, [number, number]>;
  label: string;
}

type StackedBarPiece = StackedBarPieceCount & ReturnType['datasets'][0];

export const getMangelfullDetailsDatasets = (
  stats: DataSetV3[],
  unit: string,
  theme: AppTheme,
): { datasets: StackedBarPiece[]; labels: string[] } => {
  const unsortedBars = stats.flatMap(({ data, label }) =>
    [Saksbehandlingsreglene, Særregelverket, Trygdemedisin].map((mainReason) => ({
      label:
        stats.length > 1
          ? `${label} - ${KVALITETSVURDERING_TEXTS[mainReason].label}`
          : KVALITETSVURDERING_TEXTS[mainReason].label,
      data,
      mainReason,
    })),
  );

  const sortedBars = MAIN_REASON_IDS.flatMap((id) => unsortedBars.filter(({ mainReason }) => mainReason === id));

  const stacks = sortedBars.map<Stack>(({ mainReason, data, label }) => {
    const { reasonArray } = calculateReasons(data, REASON_TO_SUBREASONS[mainReason]);

    return {
      mainReason,
      label,
      data: Object.fromEntries(reasonArray.map(([id, count]) => [id, [count, count / data.length]])),
    };
  });

  const datasets: StackedBarPiece[] = MAIN_REASON_IDS.flatMap<StackedBarPiece>((mainReason) =>
    REASON_TO_SUBREASONS[mainReason].map<StackedBarPiece>((reasonId) => {
      const text = KVALITETSVURDERING_V3_TEXTS[reasonId];
      const { label } = text;
      const backgroundColor = getColorFromTheme(text.color, theme);

      return {
        label,
        percentages: stacks.map(({ data }) => (data[reasonId]?.[1] ?? 0) * 100),
        data: stacks.map(({ data }) => data[reasonId]?.[0] ?? 0),
        backgroundColor,
        barThickness: BAR_THICKNESS,
      };
    }),
  ).filter((dataset) => dataset.data.some((v) => v !== 0)); // Remove empty datasets.

  const labels = stacks.map(({ label }, index) => {
    let count = 0;

    for (const { data } of datasets) {
      count += data[index] ?? 0;
    }

    return `${label} (${count} ${unit})`;
  });

  return { datasets, labels };
};

const BAR_THICKNESS = 50;
