import type { ISaksdata } from '@app/types/statistics/common';
import type { IStatisticVurderingV1 } from '@app/types/statistics/v1';

export interface StatisticsPropsV1 {
  stats: IStatisticVurderingV1[];
}

export enum BehandlingstidEnum {
  TOTAL = 'total',
  KA = 'ka',
  VEDTAKSINSTANS = 'vedtaksinstans',
}

const VALUES = Object.values(BehandlingstidEnum);

export const isBehandlingstidEnum = (key: string | null): key is BehandlingstidEnum =>
  key !== null && VALUES.some((v) => v === key);

interface DataSet {
  label: string;
  data: ISaksdata[];
}

export interface ComparisonPropsV2 {
  stats: DataSet[];
}
