import { BrukAvRaadgivendeOverlegeFields } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/bruk-av-raadgivende-overlege/data';
import { AnnetFields, MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { KlageforberedelsenFields } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/klageforberedelsen/data';
import { UtredningenFields } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/utredningen/data';
import { VedtaketFields } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/vedtaket/data';
import { Radiovalg, RadiovalgExtended } from './radio';

interface SakensDokumenter {
  [KlageforberedelsenFields.klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert]: boolean;
  [KlageforberedelsenFields.klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn]: boolean;
  [KlageforberedelsenFields.klageforberedelsenSakensDokumenterManglerFysiskSaksmappe]: boolean;
}

interface UtredningenUnderKlageforberedelsen
  extends KlageforberedelsenUtredningenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger,
    KlageforberedelsenUtredningenKlageinstansenHarSelvInnhentetNyeOpplysninger {
  [KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger]: boolean;
  [KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger]: boolean;
}

interface KlageforberedelsenUtredningenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger {
  [KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst]:
    | string
    | null;
}

interface KlageforberedelsenUtredningenKlageinstansenHarSelvInnhentetNyeOpplysninger {
  [KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst]:
    | string
    | null;
}

interface IKlageforberedelsen extends SakensDokumenter, UtredningenUnderKlageforberedelsen {
  [MainReason.Klageforberedelsen]: Radiovalg | null;
  [KlageforberedelsenFields.klageforberedelsenSakensDokumenter]: boolean;
  [KlageforberedelsenFields.klageforberedelsenOversittetKlagefristIkkeKommentert]: boolean;
  [KlageforberedelsenFields.klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt]: boolean;
  [KlageforberedelsenFields.klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar]: boolean;
  [KlageforberedelsenFields.klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema]: boolean;
  [KlageforberedelsenFields.klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker]: boolean;
  [KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsen]: boolean;
}

interface IUtredningen {
  [MainReason.Utredningen]: Radiovalg | null;
  [UtredningenFields.utredningenAvMedisinskeForhold]: boolean;
  [UtredningenFields.utredningenAvInntektsforhold]: boolean;
  [UtredningenFields.utredningenAvArbeidsaktivitet]: boolean;
  [UtredningenFields.utredningenAvEoesUtenlandsproblematikk]: boolean;
  [UtredningenFields.utredningenAvSivilstandBoforhold]: boolean;
  [UtredningenFields.utredningenAvAndreAktuelleForholdISaken]: boolean;
}

interface BruktFeilHjemmel {
  [VedtaketFields.vedtaketBruktFeilHjemmel]: boolean;
  [VedtaketFields.vedtaketBruktFeilHjemmelHjemlerList]: string[];
}

interface AlleRelevanteHjemlerErIkkeVurdert {
  [VedtaketFields.vedtaketAlleRelevanteHjemlerErIkkeVurdert]: boolean;
  [VedtaketFields.vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList]: string[];
}

interface LovbestemmelsenTolketFeil {
  [VedtaketFields.vedtaketLovbestemmelsenTolketFeil]: boolean;
  [VedtaketFields.vedtaketLovbestemmelsenTolketFeilHjemlerList]: string[];
}

interface InnholdetIRettsreglene {
  [VedtaketFields.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet]: boolean;
  [VedtaketFields.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList]: string[];
}

interface FeilKonkretRettsanvendelse {
  [VedtaketFields.vedtaketFeilKonkretRettsanvendelse]: boolean;
  [VedtaketFields.vedtaketFeilKonkretRettsanvendelseHjemlerList]: string[];
}

interface KonkretIndividuellBegrunnelse {
  [VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelse]: boolean;
  [VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum]: boolean;
  [VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum]: boolean;
  [VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst]: boolean;
}

interface IVedtaket
  extends BruktFeilHjemmel,
    AlleRelevanteHjemlerErIkkeVurdert,
    LovbestemmelsenTolketFeil,
    InnholdetIRettsreglene,
    FeilKonkretRettsanvendelse,
    KonkretIndividuellBegrunnelse {
  [VedtaketFields.vedtaketAutomatiskVedtak]: boolean;
  [MainReason.Vedtaket]: Radiovalg | null;
  [VedtaketFields.vedtaketDetErLagtTilGrunnFeilFaktum]: boolean;
  [VedtaketFields.vedtaketSpraakOgFormidlingErIkkeTydelig]: boolean;
}

interface BrukAvRaadgivendeLegeMangelfullt {
  [BrukAvRaadgivendeOverlegeFields.raadgivendeLegeIkkebrukt]: boolean;
  [BrukAvRaadgivendeOverlegeFields.raadgivendeLegeMangelfullBrukAvRaadgivendeLege]: boolean;
  [BrukAvRaadgivendeOverlegeFields.raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin]: boolean;
  [BrukAvRaadgivendeOverlegeFields.raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert]: boolean;
}

interface BrukAvRaadgivendeLege extends BrukAvRaadgivendeLegeMangelfullt {
  [MainReason.BrukAvRaadgivendeLege]: RadiovalgExtended | null;
}

interface Annet {
  [AnnetFields.annetFritekst]: string | null;
}

export type IKvalitetsvurderingSaksdataHjemler = Pick<
  IVedtaket,
  | VedtaketFields.vedtaketLovbestemmelsenTolketFeilHjemlerList
  | VedtaketFields.vedtaketFeilKonkretRettsanvendelseHjemlerList
  | VedtaketFields.vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList
  | VedtaketFields.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList
>;

export type IKvalitetsvurderingAllRegistreringshjemler = Pick<
  IVedtaket,
  VedtaketFields.vedtaketBruktFeilHjemmelHjemlerList
>;

export type IKvalitetsvurderingStrings = Annet &
  Pick<
    IKlageforberedelsen,
    | KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst
    | KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst
  >;

export type IKvalitetsvurderingData = IKlageforberedelsen & IUtredningen & IVedtaket & BrukAvRaadgivendeLege & Annet;

export type IKvalitetsvurderingBooleans = Omit<
  IKvalitetsvurderingData,
  | MainReason.Klageforberedelsen
  | MainReason.Utredningen
  | MainReason.BrukAvRaadgivendeLege
  | MainReason.Vedtaket
  | keyof IKvalitetsvurderingAllRegistreringshjemler
  | keyof IKvalitetsvurderingSaksdataHjemler
  | keyof IKvalitetsvurderingStrings
>;
