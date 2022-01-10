import { RadioValg, RadioValgExtended } from './radio';
import { SakstypeEnum } from './sakstype';
import { UtfallEnum } from './utfall';

type UUID = string;

interface Date {
  weekNumber: number;
  year: number;
  month: number;
  day: number;
  iso: string;
  epochDay: number;
}

export interface IStatisticVurdering {
  // Saksdata
  readonly id: UUID; // Anonymized
  readonly saksdataCreated: Date;
  readonly saksdataModified: Date;
  readonly tilknyttetEnhet: string;
  readonly hjemmelIdList: string[];
  readonly avsluttetAvSaksbehandler: Date | null;
  readonly ytelseId: string | null;
  readonly utfallId: UtfallEnum | null;
  // sakenGjelder: string | null;
  readonly sakstypeId: SakstypeEnum;
  // kvalitetsvurderingId: string;
  readonly mottattVedtaksinstans: Date | null;
  readonly mottattKlageinstans: Date | null;
  readonly vedtaksinstansEnhet: string | null;
  // utfoerendeSaksbehandler: string;
  readonly behandlingstidDays: number;
  readonly totalBehandlingstidDays: number;

  // Kvalitetsvurdering
  readonly kvalitetsvurderingCreated: Date;
  readonly kvalitetsvurderingModified: Date;
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
  anonymizedVurderingList: IStatisticVurdering[];
}

export interface IStatisticsQuery {
  year?: string;
}
