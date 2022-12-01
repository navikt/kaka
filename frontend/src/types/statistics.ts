import { Radiovalg, RadiovalgExtended } from './kvalitetsvurdering/radio';
import { SakstypeEnum } from './sakstype';
import { UtfallEnum } from './utfall';

type UUID = string;

interface Date {
  readonly weekNumber: number;
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly iso: string;
  readonly epochDay: number;
}

export interface IStatisticVurdering {
  readonly id: UUID; // Anonymized
  readonly createdDate: Date; // First of either: saksdataCreated or kvalitetsvurderingCreated.
  readonly modifiedDate: Date; // Last of either: saksdataModified or kvalitetsvurderingModified.

  // Saksdata
  readonly avsluttetAvSaksbehandler: Date;
  readonly kaBehandlingstidDays: number;
  readonly vedtaksinstansBehandlingstidDays: number;
  readonly totalBehandlingstidDays: number;
  readonly hjemmelIdList: string[];
  readonly mottattKlageinstans: Date | null;
  readonly mottattVedtaksinstans: Date | null;
  readonly sakstypeId: SakstypeEnum;
  readonly utfallId: UtfallEnum;
  readonly ytelseId: string;

  // Kvalitetsvurdering
  readonly arbeidsrettetBrukeroppfoelging: boolean;
  readonly arbeidsrettetBrukeroppfoelgingText: string | null;
  readonly begrunnelseForHvorforAvslagOpprettholdes: boolean;
  readonly begrunnelsenErIkkeKonkretOgIndividuell: boolean;
  readonly betydeligAvvik: boolean;
  readonly betydeligAvvikText: string | null;
  readonly brukAvRaadgivendeLegeRadioValg: RadiovalgExtended | null;
  readonly brukIOpplaering: boolean;
  readonly brukIOpplaeringText: string | null;
  readonly detErFeilIKonkretRettsanvendelse: boolean;
  readonly detErIkkeBruktRiktigHjemmel: boolean;
  readonly innholdetIRettsregleneErIkkeTilstrekkeligBeskrevet: boolean;
  readonly klageforberedelsenRadioValg: Radiovalg | null;
  readonly klagerensRelevanteAnfoerslerIkkeKommentert: boolean;
  readonly konklusjonen: boolean;
  readonly nyeOpplysningerMottatt: boolean;
  readonly oversendelsesbrevetsInnholdIkkeISamsvarMedTema: boolean;
  readonly oversittetKlagefristIkkeKommentert: boolean;
  readonly raadgivendeLegeErBruktFeilSpoersmaal: boolean;
  readonly raadgivendeLegeErBruktMangelfullDokumentasjon: boolean;
  readonly raadgivendeLegeErIkkeBrukt: boolean;
  readonly raadgivendeLegeHarUttaltSegUtoverTrygdemedisin: boolean;
  readonly rettsregelenErBenyttetFeil: boolean;
  readonly sakensDokumenter: boolean;
  readonly spraaketErIkkeTydelig: boolean;
  readonly utredningenAvAndreAktuelleForholdISaken: boolean;
  readonly utredningenAvAndreAktuelleForholdISakenText: string | null;
  readonly utredningenAvArbeid: boolean;
  readonly utredningenAvArbeidText: string | null;
  readonly utredningenAvEoesProblematikk: boolean;
  readonly utredningenAvEoesProblematikkText: string | null;
  readonly utredningenAvInntektsforhold: boolean;
  readonly utredningenAvInntektsforholdText: string | null;
  readonly utredningenAvMedisinskeForhold: boolean;
  readonly utredningenAvMedisinskeForholdText: string | null;
  readonly utredningenRadioValg: Radiovalg | null;
  readonly vedtaketRadioValg: Radiovalg | null;
  readonly veiledningFraNav: boolean;
  readonly veiledningFraNavText: string | null;
  readonly vurderingAvFaktumErMangelfull: boolean;
}

export interface IFullStatisticVurdering extends IStatisticVurdering {
  // Saksdata
  readonly tilknyttetEnhet: string;
  readonly vedtaksinstansEnhet: string | null;
}

export interface IFullStatistics {
  readonly anonymizedFinishedVurderingList: IFullStatisticVurdering[];
}

export interface IStatistics {
  readonly anonymizedFinishedVurderingList: IStatisticVurdering[];
}

export interface IStatisticsQuery {
  fromDate?: string;
  toDate?: string;
}

export interface IVedtaksinstanslederQuery extends IStatisticsQuery {
  mangelfullt: string[];
  kommentarer: string[];
}

export interface IManagerStatisticsQuery {
  enhetId: string;
  fromMonth?: string;
  toMonth?: string;
  saksbehandlere?: string[];
}

export interface ISaksbehandler {
  navIdent: string;
  navn: string;
}

export type RadiovalgField = keyof Pick<
  IFullStatisticVurdering,
  'utredningenRadioValg' | 'klageforberedelsenRadioValg' | 'vedtaketRadioValg' | 'brukAvRaadgivendeLegeRadioValg'
>;
