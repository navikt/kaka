/* eslint-disable import/no-unused-modules */
import { Radiovalg, RadiovalgExtended } from '../kvalitetsvurdering/radio';
import { ISaksdata, UUID } from './common';

export interface IStatisticVurderingV2 extends ISaksdata {
  readonly id: UUID; // Anonymized

  // Kvalitetsvurdering
  readonly sakensDokumenter: boolean;
  readonly sakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert: boolean;
  readonly sakensDokumenterJournalfoerteDokumenterFeilNavn: boolean;
  readonly sakensDokumenterManglerFysiskSaksmappe: boolean;
  readonly klageforberedelsen: Radiovalg;
  readonly klageforberedelsenUnderinstansIkkeSendtAlleRelevanteSaksdokumenterTilParten: boolean;
  readonly klageforberedelsenOversittetKlagefristIkkeKommentert: boolean;
  readonly klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligImotegatt: boolean;
  readonly klageforberedelsenMangelfullBegrunnelseForHvorforVedtaketOpprettholdes: boolean;
  readonly klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema: boolean;
  readonly klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker: boolean;
  readonly utredningen: Radiovalg;
  readonly utredningenAvMedisinskeForhold: boolean;
  readonly utredningenAvInntektsforhold: boolean;
  readonly utredningenAvArbeidsaktivitet: boolean;
  readonly utredningenAvEoesUtenlandsproblematikk: boolean;
  readonly utredningenAvAndreAktuelleForholdISaken: boolean;
  readonly vedtaketLovbestemmelsenTolketFeil: boolean;
  readonly vedtaketLovbestemmelsenTolketFeilHjemlerList: string[];
  readonly vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert: boolean;
  readonly vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList: string[];
  readonly vedtaketFeilKonkretRettsanvendelse: boolean;
  readonly vedtaketFeilKonkretRettsanvendelseHjemlerList: string[];
  readonly vedtaketIkkeKonkretIndividuellBegrunnelse: boolean;
  readonly vedtaketIkkeGodtNokFremFaktum: boolean;
  readonly vedtaketIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum: boolean;
  readonly vedtaketMyeStandardtekst: boolean;
  readonly vedtakAutomatiskVedtak: boolean;
  readonly vedtaket: Radiovalg;
  readonly vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet: boolean;
  readonly vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList: string[];
  readonly vedtaketDetErLagtTilGrunnFeilFaktum: boolean;
  readonly vedtaketSpraakOgFormidlingErIkkeTydelig: boolean;
  readonly raadgivendeLegeIkkebrukt: boolean;
  readonly raadgivendeLegeMangelfullBrukAvRaadgivendeLege: boolean;
  readonly raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin: boolean;
  readonly raadgivendeLegeBegrunnelseMangelfullEllerIkkeSkriftliggjort: boolean;
  readonly brukAvRaadgivendeLege: RadiovalgExtended | null;
  readonly annetFritekst: string | null;
  readonly kaBehandlingstidDays: number;
  readonly vedtaksinstansBehandlingstidDays: number;
  readonly totalBehandlingstidDays: number;
}

export interface IFullStatisticVurderingV2 extends IStatisticVurderingV2 {
  // Saksdata
  readonly tilknyttetEnhet: string;
  readonly vedtaksinstansEnhet: string | null;
}

export interface IFullStatistics {
  readonly rest: IFullStatisticVurderingV2[];
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
  color: string;
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