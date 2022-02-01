import { RadioValg, RadioValgExtended } from './radio';
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

export interface IBaseStatisticVurdering {
  readonly id: UUID; // Anonymized
  readonly tilknyttetEnhet: string;
  readonly createdDate: Date; // First of either: saksdataCreated or kvalitetsvurderingCreated.
  readonly modifiedDate: Date; // Last of either: saksdataModified or kvalitetsvurderingModified.
}

export interface IStatisticVurdering extends IBaseStatisticVurdering {
  // Saksdata
  readonly hjemmelIdList: string[];
  readonly avsluttetAvSaksbehandler: Date;
  readonly ytelseId: string;
  readonly utfallId: UtfallEnum;
  readonly sakstypeId: SakstypeEnum;
  readonly mottattVedtaksinstans: Date | null;
  readonly mottattKlageinstans: Date | null;
  readonly vedtaksinstansEnhet: string | null;
  readonly behandlingstidDays: number;
  readonly totalBehandlingstidDays: number;

  // Kvalitetsvurdering
  readonly arbeidsrettetBrukeroppfoelging: boolean;
  readonly begrunnelseForHvorforAvslagOpprettholdes: boolean;
  readonly begrunnelsenErIkkeKonkretOgIndividuell: boolean;
  readonly betydeligAvvik: boolean;
  readonly brukIOpplaering: boolean;
  readonly detErFeilIKonkretRettsanvendelse: boolean;
  readonly detErIkkeBruktRiktigHjemmel: boolean;
  readonly innholdetIRettsregleneErIkkeTilstrekkeligBeskrevet: boolean;
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
  readonly utredningenAvArbeid: boolean;
  readonly utredningenAvEoesProblematikk: boolean;
  readonly utredningenAvInntektsforhold: boolean;
  readonly utredningenAvMedisinskeForhold: boolean;
  readonly veiledningFraNav: boolean;
  readonly vurderingAvFaktumErMangelfull: boolean;
  readonly arbeidsrettetBrukeroppfoelgingText: string | null;
  readonly betydeligAvvikText: string | null;
  readonly brukIOpplaeringText: string | null;
  readonly utredningenAvAndreAktuelleForholdISakenText: string | null;
  readonly utredningenAvArbeidText: string | null;
  readonly utredningenAvEoesProblematikkText: string | null;
  readonly utredningenAvInntektsforholdText: string | null;
  readonly utredningenAvMedisinskeForholdText: string | null;
  readonly veiledningFraNavText: string | null;
  readonly klageforberedelsenRadioValg: RadioValg | null;
  readonly utredningenRadioValg: RadioValg | null;
  readonly vedtaketRadioValg: RadioValg | null;
  readonly brukAvRaadgivendeLegeRadioValg: RadioValgExtended | null;
}
export interface IStatistics {
  readonly anonymizedFinishedVurderingList: IStatisticVurdering[];
  readonly anonymizedUnfinishedVurderingList: IBaseStatisticVurdering[];
}

export interface IStatisticsQuery {
  fromDate?: string;
  toDate?: string;
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
