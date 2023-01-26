import { MAINREASON_COLOR_MAP } from '../../../../../../colors/colors';
import { MainReason } from '../../../../../../types/kvalitetsvurdering/v2';
import { KVALITETSVURDERING_V2_FIELD_NAMES } from '../../../../../kvalitetsvurdering/kvalitetsskjema/v2/common/use-field-name';
import { MangelfullVurdering } from '../types';
import { calculateMainReasons } from './helpers/main-reasons';
import { calculateTotalMangelfullFactor } from './helpers/total-mangelfull-factor';

export interface DataSet {
  label: string;
  data: MangelfullVurdering[];
}

interface StackedBarPiece {
  readonly label: string;
  readonly data: number[];
  readonly counts: number[];
  readonly backgroundColor: string;
}

type StackedBarData = [StackedBarPiece, StackedBarPiece, StackedBarPiece, StackedBarPiece];

export const getTotalMangelfullDatasets = (stats: DataSet[]): StackedBarData => {
  const results: Record<MainReason, [number, number]>[] = stats.map(({ data }) => {
    const totalMangelfullFactor = calculateTotalMangelfullFactor(data);

    const { mainReasons, totalMainReasonsCount } = calculateMainReasons(data);

    return {
      [MainReason.Klageforberedelsen]: [
        mainReasons[MainReason.Klageforberedelsen],
        (mainReasons[MainReason.Klageforberedelsen] / totalMainReasonsCount) * totalMangelfullFactor,
      ],
      [MainReason.Utredningen]: [
        mainReasons[MainReason.Utredningen],
        (mainReasons[MainReason.Utredningen] / totalMainReasonsCount) * totalMangelfullFactor,
      ],
      [MainReason.Vedtaket]: [
        mainReasons[MainReason.Vedtaket],
        (mainReasons[MainReason.Vedtaket] / totalMainReasonsCount) * totalMangelfullFactor,
      ],
      [MainReason.BrukAvRaadgivendeLege]: [
        mainReasons[MainReason.BrukAvRaadgivendeLege],
        (mainReasons[MainReason.BrukAvRaadgivendeLege] / totalMainReasonsCount) * totalMangelfullFactor,
      ],
    };
  });

  return [
    getResult(MainReason.Klageforberedelsen, results),
    getResult(MainReason.Utredningen, results),
    getResult(MainReason.Vedtaket, results),
    getResult(MainReason.BrukAvRaadgivendeLege, results),
  ];
};

const getResult = (reasonId: MainReason, results: Record<MainReason, [number, number]>[]): StackedBarPiece =>
  Object.freeze({
    label: KVALITETSVURDERING_V2_FIELD_NAMES[reasonId],
    data: results.map((data) => data[reasonId][1] * 100),
    counts: results.map((data) => data[reasonId][0]),
    backgroundColor: MAINREASON_COLOR_MAP[reasonId],
  });
