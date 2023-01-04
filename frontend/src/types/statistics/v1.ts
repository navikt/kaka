import { Radiovalg, RadiovalgExtended } from '../kvalitetsvurdering/radio';
import { ISaksdata, UUID } from './common';

export interface IStatisticVurderingV1 extends ISaksdata {
  readonly id: UUID; // Anonymized

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

export interface IFullStatisticVurderingV1 extends IStatisticVurderingV1 {
  // Saksdata
  readonly tilknyttetEnhet: string;
  readonly vedtaksinstansEnhet: string | null;
}

export interface IFullStatistics {
  readonly anonymizedFinishedVurderingList: IFullStatisticVurderingV1[];
}

export interface IStatistics {
  readonly anonymizedFinishedVurderingList: IStatisticVurderingV1[];
}

// Query types
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

export type RadiovalgField = keyof Pick<
  IFullStatisticVurderingV1,
  'utredningenRadioValg' | 'klageforberedelsenRadioValg' | 'vedtaketRadioValg' | 'brukAvRaadgivendeLegeRadioValg'
>;
