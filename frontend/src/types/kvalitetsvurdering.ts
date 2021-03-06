import { RadioValg, RadioValgExtended } from './radio';

export type IKvalitetsvurdering = IKvalitetsvurderingBase &
  IKvalitetsvurderingBooleans &
  IKvalitetsvurderingTexts &
  IKvalitetsvurderingRadio &
  IKvalitetsvurderingRadioExtended;

export interface IKvalitetsvurderingBase {
  readonly created: string; // LocalDateTime;
  readonly id: string;
  modified: string; // LocalDateTime;
}

export interface IKvalitetsvurderingBooleans {
  arbeidsrettetBrukeroppfoelging: boolean;
  begrunnelseForHvorforAvslagOpprettholdes: boolean;
  begrunnelsenErIkkeKonkretOgIndividuell: boolean;
  betydeligAvvik: boolean;
  brukIOpplaering: boolean;
  detErFeilIKonkretRettsanvendelse: boolean;
  detErIkkeBruktRiktigHjemmel: boolean;
  innholdetIRettsregleneErIkkeTilstrekkeligBeskrevet: boolean;
  klagerensRelevanteAnfoerslerIkkeKommentert: boolean;
  konklusjonen: boolean;
  nyeOpplysningerMottatt: boolean;
  oversendelsesbrevetsInnholdIkkeISamsvarMedTema: boolean;
  oversittetKlagefristIkkeKommentert: boolean;
  raadgivendeLegeErBruktFeilSpoersmaal: boolean;
  raadgivendeLegeErBruktMangelfullDokumentasjon: boolean;
  raadgivendeLegeErIkkeBrukt: boolean;
  raadgivendeLegeHarUttaltSegUtoverTrygdemedisin: boolean;
  rettsregelenErBenyttetFeil: boolean;
  sakensDokumenter: boolean;
  spraaketErIkkeTydelig: boolean;
  utredningenAvAndreAktuelleForholdISaken: boolean;
  utredningenAvArbeid: boolean;
  utredningenAvEoesProblematikk: boolean;
  utredningenAvInntektsforhold: boolean;
  utredningenAvMedisinskeForhold: boolean;
  veiledningFraNav: boolean;
  vurderingAvFaktumErMangelfull: boolean;
}

export interface IKvalitetsvurderingTexts {
  arbeidsrettetBrukeroppfoelgingText: string | null;
  betydeligAvvikText: string | null;
  brukIOpplaeringText: string | null;
  utredningenAvAndreAktuelleForholdISakenText: string | null;
  utredningenAvArbeidText: string | null;
  utredningenAvEoesProblematikkText: string | null;
  utredningenAvInntektsforholdText: string | null;
  utredningenAvMedisinskeForholdText: string | null;
  veiledningFraNavText: string | null;
}

export interface IKvalitetsvurderingRadio {
  klageforberedelsenRadioValg: RadioValg | null;
  utredningenRadioValg: RadioValg | null;
  vedtaketRadioValg: RadioValg | null;
}

export interface IKvalitetsvurderingRadioExtended {
  brukAvRaadgivendeLegeRadioValg: RadioValgExtended | null;
}
