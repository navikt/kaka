import { ChartData } from 'chart.js';
import { toPercent } from '@app/domain/number';
import {
  KVALITETSVURDERING_V2_TEXTS,
  MAIN_REASON_IDS,
  REASON_TO_SUBREASONS,
} from '@app/types/kvalitetsvurdering/texts/structures';
import { MainReason } from '@app/types/kvalitetsvurdering/v2';
import { DataSet } from '../types';
import { calculateMainReasons } from './helpers/main-reasons';
import { calculateReasons } from './helpers/reasons';
import { calculateTotalMangelfullFactor } from './helpers/total-mangelfull-factor';

/* 
  This function calculates the stats given into one chart dataset ({ label: string, data: number[], backgroundColor: string }) per subreason.
  It will also extract the labels from the stats and return them as an array of strings.
  The data is calculated by first calculating the total mangelfull factor for the given stats.

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
        data: [0.5, 0.5],
        backgroundColor: '#ff44cc'
      },
    ]
  }
*/

const { Klageforberedelsen, BrukAvRaadgivendeLege, Utredningen, Vedtaket } = MainReason;

type ReturnType = ChartData<'bar', number[], string>;

interface StackedBarPieceCount {
  label: string;
  counts: number[];
}

type StackedBarPiece = StackedBarPieceCount & ReturnType['datasets'][0];

export const getMangelfullDetailsDatasets = (
  stats: DataSet[],
  unit: string
): { datasets: StackedBarPiece[]; labels: string[] } => {
  const unsortedBars = stats.flatMap(({ label, data }) => [
    { label: `${label} - Klageforberedelsen`, data, mainReason: Klageforberedelsen },
    { label: `${label} - Utredningen`, data, mainReason: Utredningen },
    { label: `${label} - Vedtaket`, data, mainReason: Vedtaket },
    { label: `${label} - Bruk av rådgivende lege`, data, mainReason: BrukAvRaadgivendeLege },
  ]);

  const sortedBars = MAIN_REASON_IDS.flatMap((mainReasonId) =>
    unsortedBars.filter(({ mainReason }) => mainReason === mainReasonId)
  );

  interface Stack {
    mainReason: MainReason;
    data: Record<string, [number, number]>;
    label: string;
  }

  const stacks = sortedBars.map<Stack>(({ mainReason, data, label }) => {
    const totalMangelfullFactor = calculateTotalMangelfullFactor(data);

    const { mainReasons, totalMainReasonsCount } = calculateMainReasons(data);

    const mainReasonMangelfullFactor = (mainReasons[mainReason] / totalMainReasonsCount) * totalMangelfullFactor;

    const reasonIds = REASON_TO_SUBREASONS[mainReason];

    const { reasonArray, totalReasonsCount } = calculateReasons(data, reasonIds);

    return {
      mainReason,
      label,
      data: Object.fromEntries(
        reasonArray.map(([id, count]) => [id, [count, (count / totalReasonsCount) * mainReasonMangelfullFactor]])
      ),
    };
  });

  const datasets: StackedBarPiece[] = MAIN_REASON_IDS.flatMap<StackedBarPiece>((mainReason) =>
    REASON_TO_SUBREASONS[mainReason].map<StackedBarPiece>((reasonId) => ({
      label: KVALITETSVURDERING_V2_TEXTS[reasonId].label,
      data: stacks.map(({ data }) => (data[reasonId]?.[1] ?? 0) * 100),
      counts: stacks.map(({ data }) => data[reasonId]?.[0] ?? 0),
      backgroundColor: KVALITETSVURDERING_V2_TEXTS[reasonId].color ?? 'red',
      barThickness: BAR_THICKNESS,
    }))
  ).filter((dataset) => dataset.data.some((v) => v !== 0)); // Remove empty datasets.

  const labels = stacks.map(({ label }, index) => {
    let count = 0;
    let percent = 0;

    for (const { counts, data } of datasets) {
      count += counts[index] ?? 0;
      percent += data[index] ?? 0;
    }

    const percentValue = Number.isNaN(percent) ? '-' : toPercent(percent / 100);

    return `${label} (${percentValue} | ${count} ${unit})`;
  });

  return { datasets, labels };
};

export const BAR_THICKNESS = 50;
