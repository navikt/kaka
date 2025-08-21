import type { ColorToken } from '@app/components/statistikk/colors/token-name';
import type { Vedtaksinstansgruppe } from '@app/components/statistikk/total/vedtaksinstansgruppe-filter';
import type { IKvalitetsvurderingData, IKvalitetsvurderingStrings } from '@app/types/kvalitetsvurdering/v2';
import type { ISaksdata, UUID } from './common';

interface IKvalitetsvurderingV2 extends Omit<IKvalitetsvurderingData, keyof IKvalitetsvurderingStrings> {
  vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert: boolean;
  vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList: string[];
}

export interface IStatisticVurderingV2 extends ISaksdata, IKvalitetsvurderingV2 {
  readonly id: UUID; // Anonymized
}

export interface IFullStatisticVurderingV2 extends IStatisticVurderingV2 {
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

export interface IComparedFullStatisticVurderingV2 {
  color: ColorToken;
  vurderinger: IFullStatisticVurderingV2[];
  label: string;
}

// Response types

export interface IStatisticsResponseOpenV2 {
  readonly rest: IStatisticVurderingV2[]; // All saker
}

export interface IStatisticsResponseMyV2 {
  mine: IFullStatisticVurderingV2[]; // My saker
  rest: IFullStatisticVurderingV2[]; // Other saker from my enhet
}

export interface IStatisticsResponseManagerV2 {
  saksbehandlere: Record<string, IFullStatisticVurderingV2[]>;
  mine: IFullStatisticVurderingV2[]; // Klageinstansleders enhet
  rest: IFullStatisticVurderingV2[]; // Other klageenheter
}

export interface IStatisticsResponseTotalV2 {
  rest: IFullStatisticVurderingV2[]; // All saker
}

export interface IStatisticsResponseVedtaksinstanslederV2 {
  mine: IStatisticVurderingV2[]; // Vedtaksinstansleders enhet
  rest: IFullStatisticVurderingV2[]; // Other vedtaksenheter
}
