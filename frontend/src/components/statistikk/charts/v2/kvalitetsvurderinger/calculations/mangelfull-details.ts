import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import {
  KVALITETSVURDERING_TEXTS,
  KVALITETSVURDERING_V2_TEXTS,
  MAIN_REASON_IDS,
  REASON_TO_SUBREASONS,
} from '@app/components/statistikk/types/kvalitetsvurdering';
import type { ChartData } from 'chart.js';
import type { DataSet } from '../types';
import { calculateReasons } from './helpers/reasons';

/* 
  This function calculates the stats given into one chart dataset ({ label: string, data: number[], backgroundColor: string }) per subreason.
  It will also extract the labels from the stats and return them as an array of strings.
  The data is calculated as a percentage of the total amount of data in the stats.
  
  Given the following stats:
  [
    {
      label: 'Min',
      data: [
        {
          vedtaket: Radiovalg.MANGELFULLT,
          feilFaktumLagtTilGrunn: true,
          ...
        },
        {
          vedtaket: Radiovalg.BRA,
          feilFaktumLagtTilGrunn: false,
          ...
        }
      ]
    },
    {
      label: 'Andres',
      data: [
        {
          vedtaket: Radiovalg.MANGELFULLT,
          feilFaktumLagtTilGrunn: true,
          ...
        },
        {
          vedtaket: Radiovalg.BRA,
          feilFaktumLagtTilGrunn: false,
          ...
        }
      ]
  ]

  Example return value:
  {
    labels: ['Vedtaket - Min', 'Vedtaket - Andres'],
    datasets: [
      {
        label: 'Feil faktum lagt til grunn',
        percentages: [50, 50],
        data: [1, 1],
        backgroundColor: '#ff44cc'
      },
    ]
  }
*/

const { Klageforberedelsen, BrukAvRaadgivendeLege, Utredningen, Vedtaket } = MainReason;

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
  stats: DataSet[],
  unit: string,
): { datasets: StackedBarPiece[]; labels: string[] } => {
  const unsortedBars = stats.flatMap(({ data, label }) =>
    [Klageforberedelsen, Utredningen, Vedtaket, BrukAvRaadgivendeLege].map((mainReason) => ({
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
      const text = KVALITETSVURDERING_V2_TEXTS[reasonId];
      const { label } = text;
      const backgroundColor = 'color' in text ? text.color : 'red';

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

export const BAR_THICKNESS = 50;
