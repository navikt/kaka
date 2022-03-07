import { IStatisticVurdering } from '../../types/statistics';

export interface StatisticsProps {
  stats: IStatisticVurdering[];
}

export enum BehandlingsTidEnum {
  TOTAL,
  KA,
  VEDTAKSINSTANS,
}
