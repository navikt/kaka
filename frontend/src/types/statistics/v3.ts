import type { ColorToken } from '@app/components/statistikk/colors/token-name';
import type { Vedtaksinstansgruppe } from '@app/components/statistikk/total/vedtaksinstansgruppe-filter';
import type { KvalitetsvurderingDataV3, KvalitetsvurderingStrings } from '@app/types/kvalitetsvurdering/v3';
import type { ISaksdata, UUID } from './common';

interface IKvalitetsvurderingV3 extends Omit<KvalitetsvurderingDataV3, keyof KvalitetsvurderingStrings> {}

export interface IStatisticVurderingV3 extends ISaksdata, IKvalitetsvurderingV3 {
  readonly id: UUID; // Anonymized
}

export interface IFullStatisticVurderingV3 extends IStatisticVurderingV3 {
  // Saksdata
  readonly tilknyttetEnhet: string;
  readonly vedtaksinstansEnhet: string | null;
  readonly vedtaksinstansgruppe: Vedtaksinstansgruppe;
}

// Query types
export interface IStatisticsQuery {
  fromDate?: string;
  toDate?: string;
}

export interface IVedtaksinstanslederQuery extends IStatisticsQuery {
  mangelfullt: string[];
}

export interface IManagerStatisticsQuery {
  enhetId: string;
  fromMonth?: string;
  toMonth?: string;
  saksbehandlere?: string[];
}

export interface IComparedFullStatisticVurderingV3 {
  color: ColorToken;
  vurderinger: IFullStatisticVurderingV3[];
  label: string;
}

// Response types

export interface IStatisticsResponseOpenV3 {
  readonly rest: IStatisticVurderingV3[]; // All saker
}

export interface IStatisticsResponseMyV3 {
  mine: IFullStatisticVurderingV3[]; // My saker
  rest: IFullStatisticVurderingV3[]; // Other saker from my enhet
}

export interface IStatisticsResponseManagerV3 {
  saksbehandlere: Record<string, IFullStatisticVurderingV3[]>;
  mine: IFullStatisticVurderingV3[]; // Klageinstansleders enhet
  rest: IFullStatisticVurderingV3[]; // Other klageenheter
}

export interface IStatisticsResponseTotalV3 {
  rest: IFullStatisticVurderingV3[]; // All saker
}

export interface IStatisticsResponseVedtaksinstanslederV3 {
  mine: IStatisticVurderingV3[]; // Vedtaksinstansleders enhet
  rest: IFullStatisticVurderingV3[]; // Other vedtaksenheter
}
