import { IStatisticVurdering } from '../../types/statistics/v1';

export interface StatisticsProps {
  stats: IStatisticVurdering[];
}

export enum BehandlingstidEnum {
  TOTAL = 'total',
  KA = 'ka',
  VEDTAKSINSTANS = 'vedtaksinstans',
}

const VALUES = Object.values(BehandlingstidEnum);

export const isBehandlingstidEnum = (key: string | null): key is BehandlingstidEnum =>
  key !== null && VALUES.some((v) => v === key);
